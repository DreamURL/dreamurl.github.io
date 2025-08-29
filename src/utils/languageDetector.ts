import type { Language } from '../types';

// 국가별 언어 매핑
const COUNTRY_TO_LANGUAGE: Record<string, Language> = {
  'KR': 'ko', // 한국
  'US': 'en', // 미국
  'GB': 'en', // 영국
  'CA': 'en', // 캐나다
  'AU': 'en', // 호주
  'ES': 'es', // 스페인
  'MX': 'es', // 멕시코
  'AR': 'es', // 아르헨티나
  'CO': 'es', // 콜롬비아
  'CN': 'zh', // 중국
  'TW': 'zh', // 대만
  'HK': 'zh', // 홍콩
  'SG': 'zh', // 싱가포르
  'JP': 'ja', // 일본
};

// 브라우저 언어 코드에서 언어 추출
export const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  switch (langCode) {
    case 'ko': return 'ko';
    case 'es': return 'es';
    case 'zh': return 'zh';
    case 'ja': return 'ja';
    default: return 'en';
  }
};

// URL에서 언어 코드 추출
export const getLanguageFromPath = (): Language | null => {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  const validLanguages: Language[] = ['en', 'ko', 'es', 'zh', 'ja'];
  
  if (validLanguages.includes(firstSegment as Language)) {
    return firstSegment as Language;
  }
  
  return null;
};

// 지역 기반 언어 감지 (Geolocation API)
export const detectLocationLanguage = (): Promise<Language> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(detectBrowserLanguage());
      return;
    }
    
    // 타임아웃 설정 (3초)
    const timeout = setTimeout(() => {
      resolve(detectBrowserLanguage());
    }, 3000);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(timeout);
        try {
          // IP 기반 국가 감지 API 호출 (무료 서비스)
          const response = await fetch(`https://api.country.is/`);
          const data = await response.json();
          const countryCode = data.country;
          
          const language = COUNTRY_TO_LANGUAGE[countryCode] || detectBrowserLanguage();
          resolve(language);
        } catch (error) {
          resolve(detectBrowserLanguage());
        }
      },
      () => {
        clearTimeout(timeout);
        resolve(detectBrowserLanguage());
      },
      { timeout: 2000 }
    );
  });
};

// 종합 언어 감지
export const detectUserLanguage = async (): Promise<Language> => {
  // 1. URL에서 언어가 명시되어 있으면 우선 사용
  const pathLanguage = getLanguageFromPath();
  if (pathLanguage) {
    return pathLanguage;
  }
  
  // 2. 지역/브라우저 기반 감지
  try {
    return await detectLocationLanguage();
  } catch (error) {
    return detectBrowserLanguage();
  }
};

// 언어별 국가 정보
export const getLanguageInfo = (language: Language) => {
  const info = {
    en: { name: 'English', countries: ['US', 'GB', 'CA', 'AU'], flag: '🇺🇸' },
    ko: { name: '한국어', countries: ['KR'], flag: '🇰🇷' },
    es: { name: 'Español', countries: ['ES', 'MX', 'AR', 'CO'], flag: '🇪🇸' },
    zh: { name: '中文', countries: ['CN', 'TW', 'HK', 'SG'], flag: '🇨🇳' },
    ja: { name: '日本語', countries: ['JP'], flag: '🇯🇵' }
  };
  
  return info[language] || info.en;
};