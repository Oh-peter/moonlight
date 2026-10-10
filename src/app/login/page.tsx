'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false); // 로그인/회원가입 모드 전환
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 📍 회원가입 / 로그인 제출 핸들러
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isSignUp) {
        // ==========================================
        // ⭐️ [Next.js 회원가입 연동 코드 삽입 위치]
        // ==========================================
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nickname: nickname || '새벽 우체부', // profiles 트리거로 전달될 닉네임
            },
          },
        });

        if (error) throw error;

        alert('회원가입이 완료되었습니다! 로그인해 주세요.');
        setIsSignUp(false); // 가입 성공 후 로그인 폼으로 전환
      } else {
        // 🔑 로그인 처리
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        alert('달빛 우체통에 오신 것을 환영합니다! 🌙');
        router.push('/');
        router.refresh();
      }
    } catch (err: any) {
      console.error('인증 에러 상세:', err);
      setErrorMsg(err.message || '인증 처리에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <div className="bg-slate-900/70 backdrop-blur-xl border border-white/15 rounded-3xl p-8 sm:p-10 w-full max-w-md shadow-2xl relative overflow-hidden">
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-300 text-center mb-6 font-noto">
          {isSignUp ? '✨ 달빛 우체통 회원가입' : '🔑 달빛 우체통 로그인'}
        </h2>

        {errorMsg && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-xl mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          {/* 회원가입일 때만 닉네임 입력란 표시 */}
          {isSignUp && (
            <div>
              <label className="block text-sm text-slate-300 mb-1">작가 닉네임</label>
              <input
                type="text"
                placeholder="새벽 우체부"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/80 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-300"
                required={isSignUp}
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-slate-300 mb-1">이메일</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/80 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">비밀번호</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/80 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 btn-cute bg-gradient-to-r from-amber-300 to-pink-400 text-slate-950 font-bold py-3.5 text-lg w-full"
          >
            {loading ? '처리 중...' : isSignUp ? '가입하기' : '로그인하기'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          {isSignUp ? '이미 계정이 있으신가요?' : '아직 계정이 없으신가요?'}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
            }}
            className="ml-2 text-amber-300 underline font-semibold hover:text-amber-200"
          >
            {isSignUp ? '로그인하러 가기' : '회원가입하러 가기'}
          </button>
        </div>
      </div>
    </div>
  );
}