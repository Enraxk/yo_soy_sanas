import { NextRequest, NextResponse } from "next/server";

// Import shared storage
import { getVerificationData, clearVerificationData } from '@/lib/temp-storage';

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();
  
  if (!email || !code) {
    return NextResponse.json({ error: "Email y código son requeridos" }, { status: 400 });
  }
  
  const verificationData = getVerificationData();
  
  if (email !== verificationData.email || code !== verificationData.code) {
    return NextResponse.json({ error: "Código incorrecto" }, { status: 401 });
  }
  
  if (!verificationData.expires || Date.now() > verificationData.expires) {
    return NextResponse.json({ error: "Código expirado" }, { status: 401 });
  }
  
  // Clear verification data after successful verification
  clearVerificationData();
  
  return NextResponse.json({ ok: true });
}

