'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PublishingPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/publishing');

        // 1. HTTP 응답 상태 확인
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // 2. 응답 텍스트 확인 후 파싱하여 Unexpected end of JSON input 방지
        const text = await res.text();
        const json = text ? JSON.parse(text) : null;
        
        setData(json);
      } catch (error) {
        console.error('Data fetching error:', error);
      }
    }

    fetchData();
  }, []);

  const platforms = [
    {
      name: '📚 부크크 (BOOKK)',
      badge: '종이책 POD / 전자책',
      description: '초기 비용 0원으로 종이책 POD 출판 및 주요 온/오프라인 서점(교보문고, 알라딘, 예스24) 유통을 지원합니다.',
      link: 'https://bookk.co.kr',
    },
    {
      name: '📖 교보문고 퍼플 (PUBPLE)',
      badge: '교보문고 정식 유통',
      description: '국내 최대 서점 교보문고의 POD 자가출판 플랫폼으로, 교보문고 온/오프라인 채널에 직접 유통할 수 있습니다.',
      link: 'https://pubple.kyobobook.co.kr',
    },
    {
      name: '🎨 알라딘 자가출판 (투비)',
      badge: '전자책 / POD',
      description: '알라딘의 독자층과 직접 연결되는 출판 서비스로, 간단한 원고 등록만으로 전자책과 종이책을 무료 출판합니다.',
      link: 'https://tobe.aladin.co.kr',
    },
    {
      name: '📱 유페이퍼 (uPaper)',
      badge: '전 서점 전자책 유통',
      description: 'ePub 전자책 자가출판 대표 플랫폼으로, 리디북스, Yes24, 알라딘, 교보문고 등 국내 주요 전자책 서점에 한 번에 유통합니다.',
      link: 'https://www.upaper.net',
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 relative z-10">
      <div className="max-w-3xl w-full mx-auto flex flex-col">
        
        {/* 상단 홈 이동 네비게이션 헤더 */}
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

        {/* 페이지 타이틀 및 설명 */}
        <section className="mb-8 text-left">
          <h1 className="text-3xl font-bold text-amber-200 flex items-center gap-2 mb-3">
            <span>🚀</span> 무료 출판 센터
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            달빛 우체통에서 적어 내려간 당신의 소중한 글을 자급형 무료 출판 플랫폼을 통해 진짜 종이책과 전자책(ePub)으로 세상에 선보여 보세요.
          </p>
        </section>

        {/* 4대 무료 자가출판 플랫폼 카드 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {platforms.map((platform, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/70 backdrop-blur-md rounded-2xl p-6 border border-amber-200/20 text-slate-200 shadow-xl flex flex-col justify-between hover:border-amber-300/40 transition duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-amber-300 font-bold text-base sm:text-lg">{platform.name}</h3>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-amber-300/10 border border-amber-300/30 text-amber-200 whitespace-nowrap">
                    {platform.badge}
                  </span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {platform.description}
                </p>
              </div>

              <a
                href={platform.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-center py-2.5 px-4 rounded-xl bg-amber-300/10 border border-amber-300/30 text-amber-200 text-xs sm:text-sm font-medium hover:bg-amber-300/20 hover:text-amber-100 transition"
              >
                플랫폼 방문하기 ↗
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}