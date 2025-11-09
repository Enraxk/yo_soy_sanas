/**
 * Almacén temporal de datos de verificación
 * En producción, esto debería ser reemplazado por una base de datos o Redis
 * Este es solo un workaround para el desarrollo
 */

export interface VerificationData {
  code: string | null;
  email: string | null;
  expires: number | null;
}

// Almacén temporal en memoria
export const verificationStore: VerificationData = {
  code: null,
  email: null,
  expires: null,
};

/**
 * Actualiza los datos de verificación
 */
export function setVerificationData(code: string, email: string, expires: number) {
  verificationStore.code = code;
  verificationStore.email = email;
  verificationStore.expires = expires;
}

/**
 * Obtiene los datos de verificación
 */
export function getVerificationData(): VerificationData {
  return { ...verificationStore };
}

/**
 * Limpia los datos de verificación
 */
export function clearVerificationData() {
  verificationStore.code = null;
  verificationStore.email = null;
  verificationStore.expires = null;
}
