// src/app/write/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // ⬅️ 기존 홈 화면과 동일한 인증 컨텍스트 사용
import { supabase } from '@/lib/supabase'; // ⬅️ 설정해두신 Supabase 클라이언트 파일 경로 확인 필수
import Link from 'next/link';

export default function WritePage() {
  const { user } = useAuth(); // 로그인된 사용자 정보 가져오기
  const router = useRouter();

  // 입력 폼 상태 관리
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🚨 비로그인 유저 차단막
  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#ffffff' }}>
        <h2 style={{ color: '#e2b4bd', marginBottom: '20px' }}>🔒 로그인이 필요한 공간입니다</h2>
        <p style={{ color: '#a0a0b0', marginBottom: '30px' }}>달빛 우체통에 글을 남기려면 먼저 새벽 작가로 등록해 주세요.</p>
        <Link href="/login" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid #fefae0',
          borderRadius: '20px',
          padding: '10px 24px',
          color: '#fefae0',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          🔑 로그인 하러 가기
        </Link>
      </div>
    );
  }

  // 🚀 Supabase DB에 글귀 저장 기능
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 채워주세요. 📝');
      return;
    }

    setIsSubmitting(true);

    try {
      // Supabase 'posts' 테이블에 값 집어넣기
      const { error } = await supabase
        .from('posts') // ⚠️ 내 Supabase 테이블 이름과 일치하는지 꼭 확인하세요!
        .insert([
          {
            title: title,
            content: content,
            user_id: user.id, // 현재 로그인한 유저의 고유 식별값 매칭 (매우 중요)
          },
        ]);

      if (error) throw error;

      alert('🌙 당신의 소중한 이야기가 밤하늘 서가에 안전하게 저장되었습니다!');
      
      // 저장 성공 후 메인 화면이나 도서관 화면으로 부드럽게 튕겨주기
      router.push('/');
      router.refresh();
    } catch (error: any) {
      console.error('글 저장 실패:', error.message);
      alert(`저장 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px', color: '#ffffff' }}>
      
      {/* 뒤로가기 링크 */}
      <Link href="/" style={{ color: '#e2b4bd', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block', marginBottom: '20px' }}>
        ⬅️ 메인 홈으로 돌아가기
      </Link>

      <h1 style={{ fontSize: '2.2rem', color: '#fefae0', marginBottom: '10px', fontWeight: '800' }}>
        ✍️ 동화 작가방
      </h1>
      <p style={{ color: '#a0a0b0', marginBottom: '40px', fontSize: '1rem' }}>
        새벽의 숨결을 빌려 마음속 깊은 곳에 숨겨둔 문장들을 하나씩 꺼내어 보세요.
      </p>

      {/* 글쓰기 입력 폼 박스 */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ① 제목 입력란 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ color: '#e2b4bd', fontWeight: '600' }}>이야기 제목</label>
          <input
            type="text"
            placeholder="마음을 대변하는 따뜻한 제목을 달아주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            style={{
              padding: '14px',
              borderRadius: '8px',
              border: '1px solid rgba(254, 250, 224, 0.3)',
              background: 'rgba(0, 0, 0, 0.3)',
              color: '#ffffff',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>

        {/* ② 내용 입력란 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ color: '#e2b4bd', fontWeight: '600' }}>비밀 편지 내용</label>
          <textarea
            rows={10}
            placeholder="오늘 밤, 어떤 감정이 당신의 마음을 스쳐 지나갔나요? 자유롭게 적어보세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid rgba(254, 250, 224, 0.3)',
              background: 'rgba(0, 0, 0, 0.3)',
              color: '#ffffff',
              fontSize: '1rem',
              lineHeight: '1.6',
              outline: 'none',
              resize: 'vertical'
            }}
          />
        </div>

        {/* ③ 저장 전송 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: '10px',
            padding: '16px',
            borderRadius: '8px',
            border: 'none',
            background: isSubmitting ? '#555555' : '#fefae0',
            color: '#1a1a2e',
            fontSize: '1.1rem',
            fontWeight: '700',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(254, 250, 224, 0.2)',
            transition: 'all 0.2s'
          }}
        >
          {isSubmitting ? '달빛 집집으로 전달 중...' : '🌙 밤하늘 서가에 저장하기'}
        </button>

      </form>
    </div>
  );
}
