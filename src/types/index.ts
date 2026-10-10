export interface Letter {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  cover_emoji?: string; // 동화책 표지 아이콘
  likes?: number;
}