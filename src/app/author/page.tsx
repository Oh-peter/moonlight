'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Draft {
  id: string;
  title: string;
  content?: string;
  date: string;
}

export default function AuthorPage() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const router = useRouter();

  // 1. 저장된 집필 목록 불러오기 (LocalStorage 기준)
  useEffect(() => {
    const saved = localStorage.getItem('moonlight_drafts');
    if (saved) {
      try {
        setDrafts(JSON.parse(saved));
      } catch (e) {
        console.error('Drafts parse error:', e);
      }
    } else {
      // 기본 샘플 데이터
      const initialDrafts: Draft[] = [
        { id: '1', title: '첫 번째 달빛 편지', content: '달빛 아래 적어보는 이야기...', date: '2026-10-01' },
        { id: '2', title: '가을 밤의 기록', content: '바람이 차가워지는 밤이다.', date: '2026-09-28' },
      ];
      setDrafts(initialDrafts);
      localStorage.setItem('moonlight_drafts', JSON.stringify(initialDrafts));
    }
  }, []);

  // 2. LocalStorage 업데이트 헬퍼
  const saveDraftsToStorage = (updatedDrafts: Draft[]) => {
    setDrafts(updatedDrafts);
    localStorage.setItem('moonlight_drafts', JSON.stringify(updatedDrafts));
  };

  // 3. '집필 시작' 클릭 처리
  const handleStartWriting = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('이야기 제목을 입력해 주세요!');
      return;
    }

    setLoading(true);

    const newDraft: Draft = {
      id: String(Date.now()),
      title: title.trim(),
      content: '',
      date: new Date().toISOString().split('T')[0],
    };

    const updated = [newDraft, ...drafts];
    saveDraftsToStorage(updated);
    setTitle('');
    setLoading(false);

    // 작성 페이지(에디터)로 바로 이동
    router.push(`/author/editor/${newDraft.id}`);
  };

  // 4. 항목 클릭 시 집필 에디터로 이동
  const handleOpenDraft = (id: string) => {
    router.push(`/author/editor/${id}`);
  };

  // 5. 집필 항목 삭제
  const handleDeleteDraft = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // 카드 클릭 이벤트(에디터 이동) 중지
    if (confirm('이 집필 원고를 삭제하시겠습니까?')) {
      const updated = drafts.filter((item) => item.id !== id);
      saveDraftsToStorage(updated);
    }
  };

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

        {/* 페이지 타이틀 */}
        <section className="mb-8 text-left">
          <h1 className="text-3xl font-bold text-indigo-200 flex items-center gap-2 mb-3">
            <span>🎨</span> 작가방
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            나만의 창작 글과 집필 중인 편지들을 안전하게 관리하고 실시간으로 기록하는 공간입니다.
          </p>
        </section>

        {/* 집필 시작 입력 폼 */}
        <form onSubmit={handleStartWriting} className="flex gap-3 mb-10">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="새로운 이야기 제목을 입력하세요..."
            className="flex-1 px-4 py-3 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base shadow-sm"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white font-semibold hover:bg-slate-800 active:scale-95 transition text-sm sm:text-base whitespace-nowrap shadow-md disabled:opacity-50"
          >
            {loading ? '생성 중...' : '집필 시작'}
          </button>
        </form>

        {/* 내 집필 목록 */}
        <section className="w-full">
          <h2 className="text-lg font-bold text-amber-200 flex items-center gap-2 mb-4">
            <span>✍️</span> 내 집필 목록 ({drafts.length})
          </h2>

          {drafts.length === 0 ? (
            <div className="bg-slate-900/50 rounded-lg p-8 text-center text-slate-400 border border-slate-800">
              작성 중인 집필 목록이 없습니다. 위에서 새 이야기를 시작해 보세요!
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200 text-slate-800 divide-y divide-slate-100">
              {drafts.map((draft) => (
                <div 
                  key={draft.id}
                  onClick={() => handleOpenDraft(draft.id)}
                  className="flex justify-between items-center p-4 hover:bg-amber-50/50 transition cursor-pointer group"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-sm sm:text-base text-slate-800 group-hover:text-indigo-600 transition">
                      {draft.title}
                    </span>
                    <span className="text-xs text-slate-400">{draft.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 font-medium group-hover:bg-indigo-100 transition">
                      이어서 쓰기 ✎
                    </span>
                    <button
                      onClick={(e) => handleDeleteDraft(e, draft.id)}
                      className="text-xs text-red-400 hover:text-red-600 p-1 transition"
                      title="삭제"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}