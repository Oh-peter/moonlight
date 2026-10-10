// src/app/auth/page.tsx
'current client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false); // 로그인 / 회원가입 모드 스위치
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState(''); // 회원가입 시 사용할 감성 닉네임
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 🔐 로그인 및 회원가입 처리 핸들러
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        // 1. 회원가입 진행 (메타데이터에 닉네임을 실어서 전송)
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nickname: nickname || '익명의 나그네',
            },
          },
        });
        if (error) throw error;
        
        setMessage('✨ 밤하늘에 계정이 등록되었습니다! 이메일 인증 링크를 확인하거나 즉시 로그인해 보세요.');
        setIsSignUp(false);
      } else {
        // 2. 로그인 진행
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
          });
        if (error) throw error;

        setMessage('🌙 달빛 우체통에 입장하는 중입니다...');
        router.push('/'); // 로그인 성공 시 메인 홈으로 리다이렉트
        router.refresh();
      }
    } catch (error: any) {
      setMessage(`❌ 오류가 발생했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '30px', background: 'rgba(255, 255, 255, 0.04)', border: '2px solid #e2b4bd', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
      <h3 style={{ fontSize: '1.8rem', color: '#fefae0', marginBottom: '10px', fontWeight: '800', textAlign: 'center' }}>
        {isSignUp ? '✨ 우체통 주소 만들기' : '🌙 달빛 우체통 로그인'}
      </h3>
      <p style={{ textAlign: 'center', color: '#e2b4bd', fontSize: '0.9rem', marginBottom: '25px' }}>
        {isSignUp ? '나만의 익명 편지통과 작가방을 개설합니다.' : '다시 돌아오신 여행자님을 환영합니다.'}
      </p>

      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {isSignUp && (
          <div>
            <label style={{ display: 'block', color: '#fefae0', fontSize: '0.85rem', marginBottom: '5px', fontWeight: 'bold' }}>필명 (닉네임)</label>
            <input 
              type="text" 
              placeholder="예: 새벽별, 익명의 나그네" 
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(226, 180, 189, 0.5)', background: '#1a1a2e', color: '#fff' }}
            />
          </div>
        )}

        <div>
          <label style={{ display: 'block', color: '#fefae0', fontSize: '0.85rem', marginBottom: '5px', fontWeight: 'bold' }}>이메일 주소</label>
          <input 
            type="email" 
            placeholder="your-email@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(226, 180, 189, 0.5)', background: '#1a1a2e', color: '#fff' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', color: '#fefae0', fontSize: '0.85rem', marginBottom: '5px', fontWeight: 'bold' }}>비밀번호</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(226, 180, 189, 0.5)', background: '#1a1a2e', color: '#fff' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ background: '#fefae0', color: '#1a1a2e', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 12px rgba(254, 250, 224, 0.2)' }}
        >
          {loading ? '모래시계 돌리는 중...' : isSignUp ? '우체통 주소 개설하기' : '달빛 우체통 입장하기'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '20px', padding: '10px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', fontSize: '0.9rem', color: '#fff', textAlign: 'center', lineHeight: '1.4' }}>
          {message}
        </p>
      )}

      <div style={{ marginTop: '25px', textAlign: 'center', fontSize: '0.85rem', color: '#aaa' }}>
        {isSignUp ? '이미 주소가 있으신가요?' : '처음 방문하셨나요?'} 
        <button 
          onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }}
          style={{ background: 'none', border: 'none', color: '#e2b4bd', fontWeight: 'bold', marginLeft: '5px', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isSignUp ? '로그인하러 가기' : '회원가입하러 가기'}
        </button>
      </div>
    </div>
  );
}
