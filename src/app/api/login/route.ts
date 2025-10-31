import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));

  // Simulated checking
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  // mock token
  const token = `mock-${crypto.randomUUID()}`;

  const res = NextResponse.json({ ok: true });
  res.cookies.set('auth', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 дней
  });
  return res;
}
