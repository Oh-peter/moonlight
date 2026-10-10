// src/app/library/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  author_id: string;
  content: string;
  category: string;
  likes_count: number;
  created_at: string;
}

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // 📡 Supabase DB 연동 데이터 로드
  useEffect(() => {
    async function loadLibraryBooks() {
      try {
        const response = await fetch('/api/library');
        if (!response.ok) throw new Error('데이터를 가져오는데 실패했습니다.');
        
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('도서관 로딩 에러:', error);
      } finally {
        setLoading(false);
      }
    }
    loadLibraryBooks();
  }, []);

  // ❤️ 좋아요 및 배지 연동 함수
  const handleLike = async (bookId: number) => {
    setBooks(prevBooks =>
      prevBooks.map(book => book.id === bookId ? { ...book, likes_count: book.likes_count + 1 } : book)
    );
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook((prev: any) => ({ ...prev, likes_count: prev.likes_count + 1 }));
    }

    try {
      const response = await fetch('/api/badges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badgeName: '기억의 보석' })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.alreadyOwn) {
          alert('마음을 전했습니다! ❤️ (이미 수집한 배지입니다)');
        } else {
          alert('🔔 축하합니다! 책가방에 [✨ 기억의 보석] 배지가 수집되었습니다!');
        }
      }
    } catch (error) {
      console.error('좋아요 통신 에러:', error);
    }
  };

  // 🔍 [수정 핵심] 카테고리 7개 확장 및 '책 내용' 기반 검색 필터링 엔진
  const filteredBooks = books.filter(book => {
    const dbCategory = book.category ? book.category.trim() : '일반';
    
    // 1. 카테고리 필터 검사
    const matchesCategory = selectedCategory === '전체' || dbCategory === selectedCategory;
    
    // 2. 검색어 필터 검사: 책 제목(title) 또는 책 내용(content)에 검색어가 포함되어 있는지 확인
    const matchesSearch = 
      (book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (book.content && book.content.toLowerCase().includes(searchTerm.toLowerCase()));
      
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto 0 auto', color: '#ffffff', padding: '0 10px' }}>
      
      {/* 상단 헤더 타이틀 구역 */}
      <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#fefae0', fontWeight: '800' }}>📚 달빛 도서관</h2>
      <p style={{ color: '#e2b4bd', marginBottom: '30px', fontSize: '1rem', fontWeight: '600' }}>
        Supabase 데이터베이스에서 실시간으로 불러온 여행자들의 따뜻한 이야기입니다.
      </p>

      {/* 서치 컨트롤러 바 */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '35px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link href="/" style={{
          background: 'rgba(255, 255, 255, 0.08)',
          color: '#e2b4bd',
          padding: '14px 20px',
          borderRadius: '8px',
          border: '1px solid rgba(226, 180, 189, 0.4)',
          textDecoration: 'none',
          fontSize: '0.95rem',
          fontWeight: 'bold',
          textAlign: 'center',
          transition: 'all 0.2s'
        }}>
          ⬅ 홈으로
        </Link>

        {/* 🔍 [기능 수정] 안내 문구 변경 */}
        <input 
          type="text" 
          placeholder="책 제목 또는 '책 내용'을 입력하여 검색하세요..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, minWidth: '200px', padding: '14px', borderRadius: '8px', border: '2px solid #e2b4bd', fontSize: '1rem', color: '#000', background: '#fff' }}
        />

        {/* 🌌 [기능 수정] 전체 카테고리 7개로 대폭 확장 선택창 */}
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '14px', borderRadius: '8px', border: '2px solid #e2b4bd', background: '#1a1a2e', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', color: '#fefae0' }}
        >
          <option value="전체">🌐 전체 카테고리</option>
          <option value="힐링">🔮 힐링</option>
          <option value="에세이">✍️ 에세이</option>
          <option value="추억">⏳ 추억</option>
          <option value="위로">🩹 위로</option>
          <option value="새벽">🌙 새벽 감성</option>
          <option value="고민">💬 익명 고민</option>
          <option value="낭만">🌹 서툰 낭만</option>
        </select>
      </div>

      {/* 조건부 렌더링 본문 구역 */}
      {loading ? (
        <p style={{ textAlign: 'center', color: '#e2b4bd', fontSize: '1.2rem', padding: '40px 0' }}>
          🌙 밤하늘 서가에서 책들을 꺼내오는 중입니다...
        </p>
      ) : filteredBooks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(226,180,189,0.3)' }}>
          <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '20px' }}>
            아직 선택하신 필터나 검색 내용과 일치하는 책이 서가에 꽂혀있지 않습니다.
          </p>
          <button 
            onClick={() => { setSelectedCategory('전체'); setSearchTerm(''); }}
            style={{
              background: '#fefae0', color: '#1a1a2e', border: 'none', padding: '12px 24px', borderRadius: '6px',
              fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(254, 250, 224, 0.2)'
            }}
          >
            🌐 전체 목록 보기
          </button>
        </div>
      ) : (
        /* 📖 도서 카드 격자 배열 구역 */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '25px' }}>
          {filteredBooks.map(book => (
            <div key={book.id} style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              border: '2px solid #e2b4bd', 
              borderRadius: '12px', 
              padding: '22px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', background: '#e2b4bd', color: '#1a1a2e', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>
                  {book.category}
                </span>
                <h4 style={{ fontSize: '1.25rem', margin: '14px 0 6px 0', color: '#fefae0', fontWeight: '700' }}>
                  {book.title}
                </h4>
                {/* 🔍 검색 편의를 위해 카드 내부에도 미리보기 내용 표시 (최대 45자) */}
                <p style={{ fontSize: '0.9rem', color: '#b0b0c0', margin: '0 0 15px 0', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {book.content}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#777', margin: 0 }}>
                  발행일: {new Date(book.created_at).toLocaleDateString('ko-KR')}
                </p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ color: '#e63946', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }} onClick={() => handleLike(book.id)}>
                  ❤️ {book.likes_count}
                </span>
                <button onClick={() => setSelectedBook(book)} style={{ background: '#fefae0', color: '#1a1a2e', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  읽기
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 독서 모달 팝업 구조 */}
      {selectedBook && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#1a1a2e', padding: '35px', borderRadius: '16px', border: '2px solid #e2b4bd', maxWidth: '500px', width: '90%' }}>
            <span style={{ fontSize: '0.85rem', background: '#e2b4bd', color: '#1a1a2e', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>{selectedBook.category}</span>
            <h3 style={{ fontSize: '1.6rem', marginTop: '15px', marginBottom: '15px', color: '#fefae0', fontWeight: '700' }}>{selectedBook.title}</h3>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(226,180,189,0.3)', lineHeight: '1.7', color: '#ffffff', fontSize: '1.05rem', minHeight: '150px', whiteSpace: 'pre-wrap' }}>{selectedBook.content}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px' }}>
              <button onClick={() => handleLike(selectedBook.id)} style={{ background: 'none', border: '2px solid #e63946', color: '#e63946', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>❤️ 이 글에 공감하기 ({selectedBook.likes_count})</button>
              <button onClick={() => setSelectedBook(null)} style={{ background: '#e2b4bd', color: '#1a1a2e', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>책 덮기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
