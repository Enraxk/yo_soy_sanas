import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

// ── Validation schema ──────────────────────────────────────────────────────
const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100),
  email: z.string().email('Email inválido'),
  telefono: z.string().max(30).optional().or(z.literal('')),
  descripcion: z
    .string()
    .min(10, 'Describe tu obra con al menos 10 caracteres')
    .max(2000),
});

// ── Resend client (lazy — only instantiated on first request) ──────────────
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY no configurada');
  return new Resend(apiKey);
}

// ── POST /api/contact ──────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // 1. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Cuerpo de la petición inválido' },
      { status: 400 },
    );
  }

  // 2. Validate
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { nombre, email, telefono, descripcion } = parsed.data;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!contactEmail) {
    console.error('[contact] CONTACT_EMAIL no configurada');
    return NextResponse.json(
      { error: 'Error de configuración del servidor' },
      { status: 500 },
    );
  }

  // 3. Send email via Resend
  try {
    const resend = getResend();

    await resend.emails.send({
      from: 'Sanas <noreply@noreply.yosoysanas.com>',
      to: contactEmail,
      replyTo: email,
      subject: `Nueva encomienda de obra — ${nombre}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fafafa; border-radius: 12px;">
          <h1 style="color: #7d18cc; font-size: 1.6rem; margin-bottom: 8px;">
            Nueva solicitud de encomienda
          </h1>
          <p style="color: #666; margin-bottom: 32px; font-size: 0.95rem;">
            Recibida desde <strong>yosoysanas.com</strong>
          </p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; width: 130px;">
                Nombre
              </td>
              <td style="padding: 10px 0; color: #1a1a2e; font-size: 1rem;">
                ${escapeHtml(nombre)}
              </td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 10px 0; color: #888; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em;">
                Email
              </td>
              <td style="padding: 10px 0;">
                <a href="mailto:${escapeHtml(email)}" style="color: #7d18cc;">
                  ${escapeHtml(email)}
                </a>
              </td>
            </tr>
            ${
              telefono
                ? `<tr style="border-top: 1px solid #eee;">
              <td style="padding: 10px 0; color: #888; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em;">
                Teléfono
              </td>
              <td style="padding: 10px 0; color: #1a1a2e;">
                ${escapeHtml(telefono)}
              </td>
            </tr>`
                : ''
            }
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 10px 0; color: #888; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top;">
                Obra
              </td>
              <td style="padding: 10px 0; color: #1a1a2e; line-height: 1.6; white-space: pre-wrap;">
                ${escapeHtml(descripcion)}
              </td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; color: #aaa; font-size: 0.8rem; text-align: center;">
            yosoysanas.com · Arte ritual · Santuarios de luz
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] Error al enviar email:', err);
    return NextResponse.json(
      { error: 'No se pudo enviar el mensaje. Inténtalo de nuevo.' },
      { status: 500 },
    );
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
