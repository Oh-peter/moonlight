import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const responseData = {
      success: true,
      message: '출판 정보 조회 성공',
      data: [],
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('API Server Error:', error);

    return NextResponse.json(
      { success: false, message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}