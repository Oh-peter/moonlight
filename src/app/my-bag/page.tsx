'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Letter } from '@/types';

// 내 책가방에 담긴 내가 쓴 글 (MOCK 데이터)
const MY_MOCK_LETTERS: Letter[] = [
  {
    id: '1',
    title: '별빛 마을의 아기 곰',
    author: '꿈꾸는 토끼',
    content: '옛날 옛적 먼 은하수 너머에 작은 아기 곰이 살고 있었어요. 밤마다 달님에게 편지를 썼답니다...',
    cover_emoji: '🧸',
    created_at: '2026-09-28',
    likes: 12,
  },
];

export default function MyBagPage() {
  const [myLetters, setMyLetters] = useState<Letter[]>(MY_MOCK_LETTERS);
  const [activeTab, setActiveTab] = useState<'stories' | 'drafts'>('stories');

  const handleDelete = (id: string) => {
    if (confirm('정말로 이 동화책을 책가방에서 지울까요? 😢')) {
      setMyLetters((prev) => prev.filter((item) => item.id !== id));
      alert('동화책이 지워졌어요.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-2">
      {/* 🎒 헤더 프로필 영역 */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6 shadow-xl">
        <div className="text-6xl p-4 bg-magic-purple/20 border border-magic-purple/30 rounded-3xl animate-pulse">
          🎒
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-moon-yellow text-glow">
              꿈꾸는 토끼 작가님의 책가방
            </h1>
          </div>
          <p className="text-slate-300 text-sm sm:text-base">
            달빛 우체통으로 날려 보낸 소중한 이야기들이 차곡차곡 보관되어 있어요.
          </p>
          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
            <span className="bg-white/5 border border-white/10 text-xs text-slate-300 px-3 py-1.5 rounded-full">
              📚 내가 쓴 동화 <strong>{myLetters.length}</strong>권
            </span>
            <span className="bg-white/5 border border-white/10 text-xs text-slate-300 px-3 py-1.5 rounded-full">
              💖 받은 좋아요 <strong>12</strong>개
            </span>
          </div>
        </div>

        <Link
          href="/write"
          className="btn-cute bg-gradient-to-r from-moon-yellow to-amber-400 text-slate-950 font-bold text-sm whitespace-nowrap"
        >
          ✍️ 새 동화 쓰기
        </Link>
      </div>

      {/* 📌 탭 메뉴 */}
      <div className="flex border-b border-white/10 mb-6 gap-4">
        <button
          onClick={() => setActiveTab('stories')}
          className={`pb-3 font-semibold text-base transition-colors relative ${
            activeTab === 'stories'
              ? 'text-moon-yellow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          📖 내가 보낸 동화책 ({myLetters.length})
          {activeTab === 'stories' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-moon-yellow rounded-full" />
          )}
        </button>
      </div>

      {/* 📚 동화책 리스트 영역 */}
      {activeTab === 'stories' && (
        <>
          {myLetters.length > 0 ? (
            <div className="space-y-4">
              {myLetters.map((letter) => (
                <div
                  key={letter.id}
                  className="bg-slate-900/50 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-4xl p-3 bg-white/5 rounded-2xl shrink-0">
                      {letter.cover_emoji || '📖'}
                    </span>
                    <div>
                      <Link
                        href={`/library/${letter.id}`}
                        className="font-bold text-lg text-white hover:text-moon-yellow transition-colors line-clamp-1"
                      >
                        {letter.title}
                      </Link>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <span>📅 {letter.created_at}</span>
                        <span>•</span>
                        <span className="text-magic-pink">❤️ 좋아요 {letter.likes}</span>
                      </p>
                    </div>
                  </div>

                  {/* 관리 버튼 그룹 */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Link
                      href={`/library/${letter.id}`}
                      className="text-xs px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-200 transition-colors"
                    >
                      📖 펼쳐보기
                    </Link>
                    <button
                      onClick={() => handleDelete(letter.id)}
                      className="text-xs px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 transition-colors"
                    >
                      🗑️ 삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-white/5">
              <p className="text-4xl mb-3">🎒</p>
              <p className="text-slate-300 font-medium">아직 책가방에 담긴 동화가 없어요!</p>
              <p className="text-slate-500 text-sm mt-1 mb-6">
                첫 번째 상상 속 이야기를 달빛 우체통으로 보내보세요.
              </p>
              <Link
                href="/write"
                className="btn-cute bg-moon-yellow text-slate-950 font-bold text-sm inline-block"
              >
                ✍️ 첫 동화 작성하러 가기
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}