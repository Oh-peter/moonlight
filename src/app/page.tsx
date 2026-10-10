'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { user, signOut } = useAuth();

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#ffffff',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* ✨ 전역 애니메이션 효과 스타일 정의 (달 둥둥 & 별빛 반짝임 효과) */}
      <style jsx global>{`
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes shootingStar {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 0; }
          10% { opacity: 1; }
          30% { transform: translateX(-300px) translateY(300px) rotate(-45deg); opacity: 0; }
          100% { transform: translateX(-300px) translateY(300px) rotate(-45deg); opacity: 0; }
        }
      `}</style>

      {/* 🌌 밤하늘의 흐르는 별빛 배경 연출 요소 */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        {/* 반짝이는 고정 별들 */}
        <div style={{ position: 'absolute', top: '15%', left: '20%', fontSize: '1rem', animation: 'twinkle 2s infinite ease-in-out' }}>⭐</div>
        <div style={{ position: 'absolute', top: '40%', left: '85%', fontSize: '0.8rem', animation: 'twinkle 3s infinite ease-in-out 1s' }}>⭐</div>
        <div style={{ position: 'absolute', top: '75%', left: '15%', fontSize: '1.2rem', animation: 'twinkle 2.5s infinite ease-in-out 0.5s' }}>⭐</div>
        <div style={{ position: 'absolute', top: '25%', left: '70%', fontSize: '0.9rem', animation: 'twinkle 3.5s infinite ease-in-out 1.5s' }}>⭐</div>
        
        {/* 스쳐 지나가는 별빛 (유성우 효과) */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '4px',
          height: '4px',
          background: 'linear-gradient(to left, rgba(255,255,255,0), rgba(254,250,224,1))',
          borderRadius: '50%',
          boxShadow: '0 0 10px #fefae0',
          animation: 'shootingStar 6s infinite ease-in-out'
        }} />
      </div>

      {/* 0️⃣ 상단 인증 세션 정보 상태 바 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 10,
        fontSize: '0.9rem'
      }}>
        {user ? (
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(254, 250, 224, 0.3)',
            borderRadius: '20px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ color: '#fefae0', fontWeight: '600' }}>
              ✨ {user.user_metadata?.nickname || '새벽 작가'} 님
            </span>
            <button
              onClick={signOut}
              style={{
                background: 'none',
                border: 'none',
                color: '#e2b4bd',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '0.8rem'
              }}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <Link href="/login" style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid #fefae0',
            borderRadius: '20px',
            padding: '8px 16px',
            color: '#fefae0',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            🔑 로그인 / 회원가입
          </Link>
        )}
      </div>

      {/* 1️⃣ 감성적인 상단 인트로 구역 */}
      <div style={{ marginBottom: '40px', zIndex: 1 }}>
        <div style={{ 
          fontSize: '4.5rem', 
          marginBottom: '15px',
          display: 'inline-block',
          animation: 'floating 3s ease-in-out infinite' 
        }}>
          🌙
        </div>
        
        <h1 style={{ 
          fontSize: '2.8rem', 
          fontWeight: '800', 
          color: '#fefae0', 
          textShadow: '0 0 15px rgba(254, 250, 224, 0.5)',
          margin: '0 0 15px 0'
        }}>
          달빛 우체통에 오신 것을 환영합니다!
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#e2b4bd', 
          fontWeight: '600',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          익명의 바다를 지나 찾아온 따뜻한 편지들, <br />
          마음을 담은 글과 소중한 추억들이 머무는 낭만적인 공간입니다.
        </p>
      </div>

      {/* 2️⃣ 핵심 메뉴 바로가기 카드 섹션 (작가방, 달빛 도서관, 마이 책가방, 무료 출판 센터) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1000px',
        marginTop: '20px',
        zIndex: 1
      }}>
        
        {/* 카드 1: 작가방 */}
        <Link href="/author" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '2px solid #e2b4bd',
            borderRadius: '16px',
            padding: '30px 15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <span style={{ fontSize: '2.8rem', marginBottom: '15px' }}>🎨</span>
            <h3 style={{ fontSize: '1.25rem', color: '#fefae0', margin: '0 0 10px 0', fontWeight: '700' }}>작가방</h3>
            <p style={{ fontSize: '0.9rem', color: '#dddddd', margin: 0, lineHeight: '1.4', fontWeight: '500' }}>
              나만의 이야기와 집필 중인 <br />비밀 편지들을 기록하는 방입니다.
            </p>
          </div>
        </Link>

        {/* 카드 2: 달빛 도서관 */}
        <Link href="/library" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '2px solid #fefae0',
            borderRadius: '16px',
            padding: '30px 15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <span style={{ fontSize: '2.8rem', marginBottom: '15px' }}>📚</span>
            <h3 style={{ fontSize: '1.25rem', color: '#fefae0', margin: '0 0 10px 0', fontWeight: '700' }}>달빛 도서관</h3>
            <p style={{ fontSize: '0.9rem', color: '#dddddd', margin: 0, lineHeight: '1.4', fontWeight: '500' }}>
              다른 여행자들이 남겨놓은 <br />수많은 감성 글을 읽어보세요.
            </p>
          </div>
        </Link>

        {/* 카드 3: 마이 책가방 */}
        <Link href="/backpack" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '2px solid #e9d8a6',
            borderRadius: '16px',
            padding: '30px 15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <span style={{ fontSize: '2.8rem', marginBottom: '15px' }}>🎒</span>
            <h3 style={{ fontSize: '1.25rem', color: '#fefae0', margin: '0 0 10px 0', fontWeight: '700' }}>마이 책가방</h3>
            <p style={{ fontSize: '0.9rem', color: '#dddddd', margin: 0, lineHeight: '1.4', fontWeight: '500' }}>
              소중하게 수집한 편지들과 <br />특별한 아이템들을 꺼내봅니다.
            </p>
          </div>
        </Link>

        {/* 카드 4: 무료 출판 센터 */}
        <Link href="/publishing" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.12)',
            border: '2px solid #fefae0',
            borderRadius: '16px',
            padding: '30px 15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 4px 25px rgba(254, 250, 224, 0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(254, 250, 224, 0.18)';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <span style={{ fontSize: '2.8rem', marginBottom: '15px' }}>🚀</span>
            <h3 style={{ fontSize: '1.25rem', color: '#fefae0', margin: '0 0 10px 0', fontWeight: '700' }}>무료 출판 센터</h3>
            <p style={{ fontSize: '0.9rem', color: '#ffffff', margin: 0, lineHeight: '1.4', fontWeight: '600' }}>
              부크크 외 3곳의 플랫폼에서 <br />내 글을 진짜 책으로 만들어보세요!
            </p>
          </div>
        </Link>

      </div>

      {/* 3️⃣ 하단 풋터 감성 문구 */}
      <div style={{ marginTop: '70px', fontSize: '0.9rem', color: '#a0a0b0', fontWeight: '500', zIndex: 1 }}>
        오늘 밤 당신의 마음 속 이야기는 어디로 흘러가고 있나요?
      </div>
    </div>
  );
}