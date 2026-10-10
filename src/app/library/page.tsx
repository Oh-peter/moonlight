// src/app/library/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // ⬅️ 내 Supabase 클라이언트 파일 경로 확인
import Link from 'next/link';

// 📋 데이터 구조 정의
interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function LibraryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🌌 Supabase에서 전체 글귀 피드 실시간으로 읽어오기
  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        
        // posts 테이블에서 최신순(desc)으로 데이터 정렬해서 가져오기
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, content, created_at')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setPosts(data);
      } catch (error: any) {
        console.error('도서관 서가 로딩 실패:', error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', color: '#ffffff' }}>
      
      {/* 🧭 상단 네비게이션 */}
      <Link href="/" style={{ color: '#e2b4bd', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block', marginBottom: '20px' }}>
        ⬅️ 메인 홈으로 돌아가기
      </Link>

      <h1 style={{ fontSize: '2.5rem', color: '#fefae0', marginBottom: '10px', fontWeight: '800' }}>
        📚 달빛 도서관
      </h1>
      <p style={{ color: '#a0a0b0', marginBottom: '40px', fontSize: '1.05rem', lineHeight: '1.6' }}>
        낯선 나그네들이 밤하늘 아래 조용히 흩뿌려놓은 마음 조각들입니다.<br />
        가만히 귀를 기울여 타인의 온기를 읽어보세요.
      </p>

      {/* ⏳ 1. 로딩 상태 연출 */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '100px 0', color: '#fefae0', fontSize: '1.2rem', fontWeight: '600' }}>
          🌙 밤하늘의 서가에서 편지들을 꺼내오는 중입니다...
        </div>
      ) : posts.length === 0 ? (
        // 📭 2. 데이터가 텅 비었을 때의 화면
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px dashed rgba(254, 250, 224, 0.2)',
          borderRadius: '16px'
        }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '15px' }}>📭</span>
          <p style={{ color: '#e2b4bd', fontSize: '1.1rem', fontWeight: '600', margin: '0 0 10px 0' }}> 아직 서가에 도착한 비밀 편지가 없습니다.</p>
          <p style={{ color: '#808090', fontSize: '0.9rem', margin: '0 0 25px 0' }}>당신이 첫 번째 따뜻한 문장의 주인공이 되어보세요.</p>
          <Link href="/write" style={{
            background: '#fefae0',
            color: '#1a1a2e',
            borderRadius: '20px',
            padding: '10px 20px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.95rem'
          }}>
            ✍️ 첫 편지 쓰러 가기
          </Link>
        </div>
      ) : (
        // 🌌 3. 감성 카드 피드 리스트 구역
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(226, 180, 189, 0.3)',
                borderRadius: '14px',
                padding: '25px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s, border-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = '#fefae0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(226, 180, 189, 0.3)';
              }}
            >
              <div>
                {/* 카드 제목 */}
                <h3 style={{ fontSize: '1.25rem', color: '#fefae0', margin: '0 0 15px 0', fontWeight: '700', lineHeight: '1.4' }}>
                  {post.title}
                </h3>
                {/* 카드 본문 (글이 길면 줄바꿈 유지하며 자연스럽게 노출) */}
                <p style={{
                  fontSize: '0.95rem',
                  color: '#dddddd',
                  margin: '0 0 20px 0',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all'
                }}>
                  {post.content}
                </p>
              </div>

              {/* 하단 작성 시간 꼬리표 */}
              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '12px',
                fontSize: '0.8rem',
                color: '#888899',
                textAlign: 'right'
              }}>
                🌙 {new Date(post.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
