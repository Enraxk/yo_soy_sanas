import { NextResponse } from "next/server";

export async function POST() {
  // Aquí podrías limpiar la sesión si usas cookies o tokens
  return NextResponse.json({ ok: true });
}
