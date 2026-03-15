import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL!,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN!,
});
const KEY = 'page_views';

export async function POST() {
  try {
    const views = await redis.incr(KEY);
    return NextResponse.json({ views });
  } catch {
    return NextResponse.json({ views: null }, { status: 500 });
  }
}

export async function GET() {
  try {
    const views = (await redis.get<number>(KEY)) ?? 0;
    return NextResponse.json({ views });
  } catch {
    return NextResponse.json({ views: null }, { status: 500 });
  }
}
