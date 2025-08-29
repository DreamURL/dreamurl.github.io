import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { detectUserLanguage } from '../utils/languageDetector';
import type { Language } from '../types';

export const LanguageRedirect = () => {
  const [detectedLanguage, setDetectedLanguage] = useState<Language | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectAndRedirect = async () => {
      try {
        const language = await detectUserLanguage();
        setDetectedLanguage(language);
      } catch (error) {
        // 에러 시 기본값으로 영어 설정
        setDetectedLanguage('en');
      } finally {
        setIsLoading(false);
      }
    };

    detectAndRedirect();
  }, []);

  // 로딩 중일 때 표시할 컴포넌트
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
        <p className="text-gray-600 text-lg">Detecting your language...</p>
        <p className="text-gray-400 text-sm mt-2">언어를 감지하는 중...</p>
      </div>
    );
  }

  // 감지된 언어로 리다이렉트
  if (detectedLanguage) {
    return <Navigate to={`/${detectedLanguage}`} replace />;
  }

  // 예외 상황에서 영어로 리다이렉트
  return <Navigate to="/en" replace />;
};

export default LanguageRedirect;