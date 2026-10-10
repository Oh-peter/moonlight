'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('moonlight_drafts');
    if (saved) {
      const drafts = JSON.parse(saved);
      const target = drafts.find((item: any) => item.id === id);
      if (target) {
        setTitle(target.title);
        setContent(target.content || '');
      }
    }
  }, [id]);

  const handleSave = () => {
    const saved = localStorage.getItem('moonlight_drafts');
    if (saved) {
      const drafts = JSON.parse(saved);
      const updated = drafts.map((item: any) =>
        item.id === id ? { ...item, title, content } : item
      );
      localStorage.setItem('moonlight_drafts', JSON.stringify(updated));
      alert('성공적으로 저장되었습니다!');
      router.push('/author');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 relative z-10">
      <div className="max-w-3xl w-full mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Link href="/author" className="text-slate-300 hover:text-white text-sm">
            ← 작가방으로 돌아가기
          </Link>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-amber-300 text-slate-900 font-bold text-sm hover:bg-amber-200"
          >
            저장하기
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-bold bg-transparent text-amber-200 border-b border-slate-700 py-2 focus:outline-none"
          placeholder="제목"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
          className="w-full p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 focus:outline-none"
          placeholder="글 내용을 자유롭게 작성해 보세요..."
        />
      </div>
    </div>
  );
}