// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';

// 💾 임시 데이터베이스 (실제 DB 연동 전까지 서버 메모리에 실시간 기록됨)
// 실제 운영 환경에서는 Supabase나 Prisma(PostgreSQL) 등으로 대체되는 영역입니다.
let globalPosts = [
  { id: 1, title: '첫 번째 달빛 편지', date: '2026-10-01' },
  { id: 2, title: '가을 밤의 기록', date: '2026-09-28' }
];

// ⏳ 1. 내 집필 목록 전체 불러오기 (GET)
export async function GET() {
  return NextResponse.json(globalPosts, { status: 200 });
}

// ⏳ 2. 새로운 글 실시간 기록하기 (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: '제목을 입력해주세요.' }, { status: 400 });
    }

    // 새 데이터 객체 생성
    const newPost = {
      id: Date.now(),
      title: title.trim(),
      date: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) + ' ' + new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
    };

    // 최신 글이 맨 위로 오도록 배열 가장 앞에 삽입 (실시간 DB 기록)
    globalPosts = [newPost, ...globalPosts];

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
  }
}
