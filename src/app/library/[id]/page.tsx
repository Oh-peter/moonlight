'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Letter } from '@/types';

export default function LetterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [letter, setLetter] = useState<Letter | null>(null);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLetterDetail = async () => {
      try {
        const { data, error } = await supabase
          .from('letters')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data) {
          setLetter(data);
          setLikes(data.likes || 0);
        }
      } catch (err) {
        console.error('동화 세부 내용 로드 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetterDetail();
  }, [id]);

  const handleLike = async () => {
    if (!letter) return;

    const newLikes = hasLiked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setHasLiked(!hasLiked);

    try {
      await supabase
        .from('letters')
        .update({ likes: newLikes })
        .eq('id', id);
    } catch (err) {
      console.error('좋아요 업데이트 실패:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-slate-400">
        <span className="text-3xl animate-spin inline-block mb-2">🌙</span>
        <p>동화책을 펼치는 중...</p>
      </div>
    );
  }

  if (!letter) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-slate-300">동화책을 찾을 수 없어요 😢</p>
        <Link href="/library" className="mt-4 inline-block text-moon-yellow underline">
          도서관으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10 px-2">
      <div className="mb-6">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-moon-yellow transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          ⬅️ 달빛 도서관으로 돌아가기
        </Link>
      </div>

      <article className="bg-slate-900/90 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-moon-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center pb-8 border-b border-white/10 mb-8">
          <div className="text-7xl mb-4 animate-bounce duration-1000 inline-block">
            {letter.cover_emoji || '📖'}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-moon-yellow text-glow mb-3 leading-tight">
            {letter.title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm text-slate-300">
            <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">
              ✍️ <strong>{letter.author}</strong> 작가님
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">📮 {new Date(letter.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-slate-200 text-base sm:text-lg leading-relaxed whitespace-pre-line mb-10 min-h-[200px]">
          {letter.content}
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            ✨ 이 동화책이 마음에 들었다면 하트를 눌러 마음을 표현해 주세요!
          </p>

          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all transform active:scale-95 ${
              hasLiked
                ? 'bg-magic-pink text-slate-950 shadow-lg shadow-magic-pink/30'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <span>{hasLiked ? '💖' : '🤍'}</span>
            <span>좋아요 {likes}</span>
          </button>
        </div>
      </article>
    </div>
  );
}