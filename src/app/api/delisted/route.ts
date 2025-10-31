import { NextResponse } from 'next/server';
import { getDelisted } from '@/src/app/lib/fmp';

export const revalidate = 1800;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') ?? 0);
  const limit = Math.min(Number(searchParams.get('limit') ?? 100), 100); // макс 100
  const data = await getDelisted(page, limit, revalidate);
  return NextResponse.json({ page, limit, items: data }, { status: 200 });
}
