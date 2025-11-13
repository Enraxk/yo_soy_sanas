import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Leer la cookie `token` si existe
    const token = req.cookies?.get ? req.cookies.get('token')?.value : null;
    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    // Aquí puedes validar el token si tienes logic adicional (JWT/verificación)
    return NextResponse.json({ authenticated: true });
  } catch (err) {
    return NextResponse.json({ authenticated: false, error: 'server_error' }, { status: 500 });
  }
}
