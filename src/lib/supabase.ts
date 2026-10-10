// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Next.js 환경에서 Supabase 서버와 통신하기 위한 전역 클라이언트 인스턴스
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
