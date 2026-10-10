// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link"; 
import "./globals.css";

export const metadata: Metadata = {
  title: "달빛 우체통",
  description: "나만의 창작 글과 익명 편지를 담은 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#1a1a2e', color: '#ffffff', fontFamily: 'sans-serif' }}>
        
        {/* 🌙 달빛 우체통 공통 상단 메뉴 바 */}
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '0 30px', 
          height: '70px', 
          background: '#1a1a2e', 
          borderBottom: '1px solid rgba(226, 180, 189, 0.2)',
          position: 'sticky', /* 고정 위치 안정화 */
          top: 0,
          zIndex: 1000
        }}>
          {/* 로고 */}
          <Link href="/" style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#e2b4bd', textDecoration: 'none' }}>
            🌙 달빛 우체통
          </Link>
          
          {/* 네비게이션 메뉴 단추 (prefetch 속성 추가로 라우팅 교착 예방) */}
          <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            <Link href="/author" prefetch={false} style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>
              🎨 작가방
            </Link>
            <Link href="/library" prefetch={false} style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>
              📚 도서관
            </Link>
            <Link href="/backpack" prefetch={false} style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>
              🎒 책가방
            </Link>
            <Link href="/publishing" prefetch={false} style={{ color: '#fefae0', textDecoration: 'none', fontSize: '1rem', fontWeight: '700' }}>
              🚀 출판 센터
            </Link>
          </nav>
        </header>

        {/* 📦 메인 서브 페이지 렌더링 구역 */}
        <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </main>

      </body>
    </html>
  );
}
