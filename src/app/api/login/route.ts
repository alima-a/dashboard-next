import { NextResponse } from 'next/server';
export async function POST(req: Request) {
    const { email, password } = await req.json();
    if (email === 'a@a.com' && password === '123456') {
        const res = NextResponse.json({ token: 'ok' }, { status: 200 });
        res.cookies.set('token', 'ok', { httpOnly: true, sameSite: 'lax', path: '/' });
        return res;
    }
    return NextResponse.json({ message: 'invalid' }, { status: 401 });
}