import { currentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return new NextResponse('Permission Denied!', {
      status: 403,
    });
  }

  return NextResponse.json({
    data: 'Hello World',
  });
}
