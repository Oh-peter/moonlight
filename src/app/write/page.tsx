'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const EMOJI_OPTIONS = ['🌙', '⭐', '🧸', '🦄', '🚀', '🐱', '🏰', '🎈'];

export default function WritePage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌙');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // 1. 현재 로그인된 유저 확인
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('로그인이 필요한 서비스입니다!');
      router.push('/login');
      return;
    }

    // 2. Supabase DB에 저장
    const { data, error } = await supabase
      .from('stories')
      .insert([
        {
          title,
          content,
          author_id: user.id,
          author_nickname: user.user_metadata?.nickname || '꼬마 작가',
        },
      ]);

    if (error) throw error;

    alert('달빛 우체통으로 이야기가 성공적으로 날아갔어요! 🌙');
    router.push('/library');
  } catch (error: any) {
    console.error('글 저장 중 오류 상세:', JSON.stringify(error, null, 2));
    alert(`이야기를 전송하지 못했어요: ${error?.message || '다시 시도해주세요!'}`);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 px-2">
      <div className="text-center mb-8">
        <span className="text-4xl animate-pulse inline-block mb-2">✍️</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-moon-yellow text-glow mb-2">
          꼬마 작가님의 동화 창작실
        </h1>
        <p className="text-slate-300 text-sm sm:text-base">
          마음속에 상상해 둔 멋진 이야기를 달빛 우체통에 담아 전해보세요.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
      >
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-3">
            🎨 동화책 대표 표지 고르기
          </label>
          <div className="flex flex-wrap gap-3 justify-center bg-slate-950/50 p-4 rounded-2xl border border-white/5">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedEmoji(emoji)}
                className={`text-3xl p-3 rounded-2xl transition-all transform hover:scale-110 ${
                  selectedEmoji === emoji
                    ? 'bg-magic-purple/40 border-2 border-moon-yellow scale-110 shadow-lg shadow-moon-yellow/20'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-slate-200 mb-2">
            📖 동화 제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 별빛 마을의 아기 곰"
            className="w-full px-4 py-3 bg-slate-950/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-moon-yellow focus:ring-1 focus:ring-moon-yellow transition-all"
            maxLength={40}
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-semibold text-slate-200 mb-2">
            👤 작가 이름 (별명)
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="예: 꿈꾸는 토끼"
            className="w-full px-4 py-3 bg-slate-950/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-moon-yellow focus:ring-1 focus:ring-moon-yellow transition-all"
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-slate-200 mb-2">
            📝 동화 이야기 내용
          </label>
          <textarea
            id="content"
            rows={7}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="옛날 옛적 먼 은하수 너머에 작은 아기 곰이 살고 있었어요..."
            className="w-full px-4 py-3 bg-slate-950/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-moon-yellow focus:ring-1 focus:ring-moon-yellow transition-all resize-none leading-relaxed"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-cute bg-gradient-to-r from-moon-yellow via-amber-400 to-magic-pink text-slate-950 font-extrabold text-lg shadow-xl hover:opacity-95 transition-all disabled:opacity-50"
          >
            {isSubmitting ? '달빛 우체통으로 보내는 중... 🚀' : '📮 달빛 우체통에 편지 넣기'}
          </button>
        </div>
      </form>
    </div>
  );
}