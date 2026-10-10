// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 윈도우 파일 잠금(Locking) 에러를 우회하기 위해 빌드 임시 폴더명을 변경합니다 */
  distDir: '_moonlight_build',
};

export default nextConfig;
