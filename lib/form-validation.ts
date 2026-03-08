/**
 * Form validation utilities for the commission contact form (Phase 6).
 *
 * Anti-spam strategy - 3 layers:
 *   1. Honeypot field   - bots fill hidden inputs; humans don't
 *   2. Min time delay   - bots submit instantly; require ≥2 s after page load
 *   3. Rate limiting    - localStorage caps attempts to 3 per 10 minutes
 */

// ─── Field validation rules ──────────────────────────────────────────────────

export type ContactField = "name" | "email" | "phone" | "message";

export interface FieldRule {
  required: boolean;
  minLength: number;
  maxLength: number;
  pattern: RegExp;
  errorMessages: {
    required: string;
    minLength: string;
    maxLength: string;
    pattern: string;
  };
}

export const FIELD_RULES: Record<ContactField, FieldRule> = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 80,
    pattern: /^[\p{L}\p{M}][\p{L}\p{M}' -]*$/u,
    errorMessages: {
      required: "El nombre es obligatorio.",
      minLength: "El nombre debe tener al menos 2 caracteres.",
      maxLength: "El nombre no puede superar los 80 caracteres.",
      pattern: "El nombre solo puede contener letras.",
    },
  },
  email: {
    required: true,
    minLength: 6,
    maxLength: 254,
    pattern: /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/,
    errorMessages: {
      required: "El email es obligatorio.",
      minLength: "El email no es válido.",
      maxLength: "El email es demasiado largo.",
      pattern: "Introduce un email válido.",
    },
  },
  phone: {
    required: false,
    minLength: 4,
    maxLength: 20,
    pattern: /^[+\d\s\-().]{4,20}$/,
    errorMessages: {
      required: "",
      minLength: "El teléfono debe tener al menos 4 dígitos.",
      maxLength: "El teléfono no puede superar los 20 caracteres.",
      pattern: "Introduce un teléfono válido.",
    },
  },
  message: {
    required: true,
    minLength: 20,
    maxLength: 2000,
    pattern: /[\s\S]+/,
    errorMessages: {
      required: "Describe la obra que deseas encargar.",
      minLength: "La descripción debe tener al menos 20 caracteres.",
      maxLength: "La descripción no puede superar los 2000 caracteres.",
      pattern: "",
    },
  },
};

// ─── Field sanitizers ────────────────────────────────────────────────────────

export function sanitizeText(value: string): string {
  return value.normalize("NFKC").trim().replace(/\s+/g, " ");
}

export function sanitizeEmail(value: string): string {
  const [local, domain] = value.split("@");
  if (!domain) return value.trim().toLowerCase();
  return `${local}@${domain.toLowerCase()}`;
}

// ─── Single field validator ──────────────────────────────────────────────────

export function validateField(
  field: ContactField,
  rawValue: string
): string | null {
  const rule = FIELD_RULES[field];
  const value = sanitizeText(rawValue);

  if (!value && rule.required) return rule.errorMessages.required;
  if (!value && !rule.required) return null; // optional + empty → OK

  if (value.length < rule.minLength) return rule.errorMessages.minLength;
  if (value.length > rule.maxLength) return rule.errorMessages.maxLength;
  if (rule.pattern && !rule.pattern.test(value)) return rule.errorMessages.pattern;

  return null;
}

// ─── Anti-spam layer 2: minimum time delay ───────────────────────────────────

const LOAD_TIME = Date.now();
const MIN_DELAY_MS = 2_000; // bots submit in < 1 s

export function isSubmittingTooFast(): boolean {
  return Date.now() - LOAD_TIME < MIN_DELAY_MS;
}

// ─── Anti-spam layer 3: rate limiting via localStorage ───────────────────────

const LS_KEY = "sanas_contact_attempts";
const MAX_ATTEMPTS = 3;
const WINDOW_MS = 10 * 60 * 1_000; // 10 minutes

interface RateLimitState {
  attempts: number[];
}

function loadRateState(): RateLimitState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { attempts: [] };
    return JSON.parse(raw) as RateLimitState;
  } catch {
    return { attempts: [] };
  }
}

function saveRateState(state: RateLimitState): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable - fail open (allow submission)
  }
}

/** Returns true if the user has exceeded the rate limit. */
export function isRateLimited(): boolean {
  const now = Date.now();
  const state = loadRateState();
  const recent = state.attempts.filter((t) => now - t < WINDOW_MS);
  return recent.length >= MAX_ATTEMPTS;
}

/** Call this after a successful submission to record the attempt. */
export function recordAttempt(): void {
  const now = Date.now();
  const state = loadRateState();
  const recent = state.attempts.filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  saveRateState({ attempts: recent });
}

/** How many seconds until the oldest attempt expires (for UI feedback). */
export function secondsUntilReset(): number {
  const now = Date.now();
  const state = loadRateState();
  const recent = state.attempts.filter((t) => now - t < WINDOW_MS);
  if (recent.length < MAX_ATTEMPTS) return 0;
  const oldest = Math.min(...recent);
  return Math.ceil((oldest + WINDOW_MS - now) / 1_000);
}

// ─── Honeypot helper ─────────────────────────────────────────────────────────

/**
 * Returns true if the honeypot field was filled (bot detected).
 * Usage: <input name="website" data-contact-honeypot style={{ display: 'none' }} />
 */
export function isHoneypotFilled(honeypotValue: string): boolean {
  return honeypotValue.trim().length > 0;
}

// ─── Full form validator ─────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string; // hidden field - must be empty
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<ContactField, string>>;
  spamReason?: "honeypot" | "too_fast" | "rate_limited";
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  // Spam checks first
  if (isHoneypotFilled(data.honeypot)) {
    return { valid: false, errors: {}, spamReason: "honeypot" };
  }
  if (isSubmittingTooFast()) {
    return { valid: false, errors: {}, spamReason: "too_fast" };
  }
  if (isRateLimited()) {
    return { valid: false, errors: {}, spamReason: "rate_limited" };
  }

  // Field validation
  const errors: Partial<Record<ContactField, string>> = {};
  (["name", "email", "phone", "message"] as ContactField[]).forEach((field) => {
    const error = validateField(field, data[field]);
    if (error) errors[field] = error;
  });

  return { valid: Object.keys(errors).length === 0, errors };
}
