'use client';

import Link from 'next/link';

export default function BackpackPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 relative z-10">
      <div className="max-w-3xl w-full mx-auto flex flex-col">
        
        {/* 🆕 상단 홈 이동 네비게이션 헤더 */}
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800/60">
          <Link 
            href="/" 
            className="text-xl sm:text-2xl font-bold text-amber-200 hover:text-amber-100 transition duration-300 flex items-center gap-2"
          >
            🌙 달빛 우체통
          </Link>
          <Link 
            href="/" 
            className="px-4 py-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-amber-200/30 text-amber-200 text-xs sm:text-sm font-medium transition duration-300 flex items-center gap-1.5 shadow-md"
          >
            <span>🏠</span> 홈으로
          </Link>
        </header>

        {/* 페이지 타이틀 */}
        <section className="mb-8 text-left">
          <h1 className="text-3xl font-bold text-amber-300 flex items-center gap-2 mb-3">
            <span>🎒</span> 마이 책가방
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            소중하게 수집한 편지들과 달빛 우체통에서 모은 특별한 아이템들을 꺼내보는 공간입니다.
          </p>
        </section>

        {/* 아이템 보관함 공간 */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-amber-200/20 text-slate-200 shadow-xl">
          <p className="text-center text-slate-400 py-12 text-sm sm:text-base">
            ✨ 보관된 아이템 및 수집한 편지 목록이 들어올 자리입니다.
          </p>
        </div>

      </div>
    </div>
  );
}