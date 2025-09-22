import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Import shared storage
import { setVerificationData } from '@/lib/temp-storage';

// Set your admin credentials here (for demo)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Configure nodemailer (use your SMTP credentials)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }
  // Generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 5 * 60 * 1000; // 5 min
  setVerificationData(code, email, expires);

  // Send code by email
  try {
    await transporter.sendMail({
      from: `No-Reply <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Tu código de acceso (Yo Soy Sanas)",
      text: `Tu código de acceso es: ${code}`,
      html: `<p>Tu código de acceso es: <b>${code}</b></p>`
    });
  } catch {
    return NextResponse.json({ error: "Error enviando el email" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

