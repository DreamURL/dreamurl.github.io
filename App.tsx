import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './src/index.css';
import GamePage from './src/components/GamePage';
import LanguageRedirect from './src/components/LanguageRedirect';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 루트 경로: 언어 감지 후 자동 리다이렉트 */}
        <Route path="/" element={<LanguageRedirect />} />
        
        {/* 각 언어별 라우트 */}
        <Route path="/en" element={<GamePage />} />
        <Route path="/ko" element={<GamePage />} />
        <Route path="/es" element={<GamePage />} />
        <Route path="/zh" element={<GamePage />} />
        <Route path="/ja" element={<GamePage />} />
        
        {/* 지원하지 않는 경로는 영어로 리다이렉트 */}
        <Route path="*" element={<LanguageRedirect />} />
      </Routes>
    </Router>
  );
};

export default App;
