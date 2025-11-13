// Se exporta un handler POST para que Next.js trate este archivo como un módulo
// Invalida la cookie de sesión llamada `token` (ajusta el nombre si usas otro)
export async function POST() {
  const headers = new Headers();
  // Ajusta Path, SameSite y Secure según tus necesidades de despliegue
  headers.append(
    'Set-Cookie',
    'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax; Secure'
  );

  return new Response(JSON.stringify({ ok: true, message: 'Logged out' }), {
    status: 200,
    headers,
  });
}

