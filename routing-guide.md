# 달빛 우체통 (Moonlight Mailbox) - 화면 전환 가이드

본 가이드는 **작가방**, **도서관**, **책가방** 버튼을 클릭했을 때 각각의 화면으로 올바르게 연결(라우팅)되도록 코드를 구현하는 방법을 안내합니다. 
`localhost:3000` 환경에서 React 또는 Next.js를 사용하고 있다고 가정하여 작성된 가이드라인입니다.

---

## 1. Next.js (App Router) 기반 파일 기반 라우팅 방식
프로젝트가 Next.js 기반이라면 `Link` 컴포넌트를 사용하여 버튼 클릭 시 해당 주소로 페이지를 이동시킵니다.

### 📥 네비게이션 바 / 메인 화면 컴포넌트 (`Navigation.jsx`)
```jsx
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex space-x-4 p-4 bg-slate-900 text-white justify-center">
      {/* 1. 작가방 버튼 */}
      <Link href="/author-room" className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition">
        🎨 작가방
      </Link>

      {/* 2. 도서관 버튼 */}
      <Link href="/library" className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition">
        📚 도서관
      </Link>

      {/* 3. 책가방 버튼 */}
      <Link href="/backpack" className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition">
        🎒 책가방
      </Link>
    </nav>
  );
}
```

### 📂 폴더 구조 설정
위 `Link`가 정상적으로 작동하려면 `app/` 폴더 내에 다음과 같이 폴더와 `page.jsx` 파일이 생성되어 있어야 합니다.
```text
src/app/
├── page.jsx             # 메인 화면
├── author-room/
│   └── page.jsx         # 작가방 화면
├── library/
│   └── page.jsx         # 도서관 화면
└── backpack/
    └── page.jsx         # 책가방 화면
```

---

## 2. React (SPA 상태 관리) 기반 화면 연결 방식
페이지 이동(URL 변경) 없이, 단일 페이지(SPA) 내에서 버튼 클릭 시 상태(`state`)를 변경하여 화면을 전환하는 방식입니다.

### 💻 상태 기반 메인 컴포넌트 (`App.jsx`)
```jsx
import React, { useState } from 'react';
// 각 화면 컴포넌트 임포트 (예시)
import AuthorRoom from './components/AuthorRoom';
import Library from './components/Library';
import Backpack from './components/Backpack';
import MainDashboard from './components/MainDashboard';

export default function App() {
  // 현재 활성화된 화면 상태 관리 ('main', 'author', 'library', 'backpack')
  const [currentScreen, setCurrentScreen] = useState('main');

  // 화면 렌더링 함수
  const renderScreen = () => {
    switch (currentScreen) {
      case 'author':
        return <AuthorRoom goBack={() => setCurrentScreen('main')} />;
      case 'library':
        return <Library goBack={() => setCurrentScreen('main')} />;
      case 'backpack':
        return <Backpack goBack={() => setCurrentScreen('main')} />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 네비게이션 바 */}
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => setCurrentScreen('main')}>
          🌙 달빛 우체통
        </h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentScreen('author')}
            className={`px-3 py-1.5 rounded ${currentScreen === 'author' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            🎨 작가방
          </button>
          <button 
            onClick={() => setCurrentScreen('library')}
            className={`px-3 py-1.5 rounded ${currentScreen === 'library' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            📚 도서관
          </button>
          <button 
            onClick={() => setCurrentScreen('backpack')}
            className={`px-3 py-1.5 rounded ${currentScreen === 'backpack' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            🎒 책가방
          </button>
        </div>
      </header>

      {/* 동적 화면 출력 영역 */}
      <main className="p-6">
        {renderScreen()}
      </main>
    </div>
  );
}
```

---

## 3. 각 화면별 구성 추천 요소

* **🎨 작가방 (`author-room`):** 사용자가 직접 편지를 쓰거나 시/에세이를 창작하는 공간입니다. 텍스트 에디터, 임시 저장 버튼, 감정 태그 선택기가 배치됩니다.
* **📚 도서관 (`library`):** 다른 사용자들이 작성하고 공개한 익명 편지나 작품들을 열람하고 검색할 수 있는 피드(Feed) 공간입니다.
* **🎒 책가방 (`backpack`):** 내가 쓴 글, 임시 저장된 글, 혹은 다른 사람에게 받은 편지나 보관하고 싶은 작품들을 모아보는 마이페이지 성격의 공간입니다.
