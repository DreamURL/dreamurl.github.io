import { useEffect } from 'react';
import type { Language } from '../types';

interface SEOHeadProps {
  language: Language;
}

const SEO_CONFIG = {
  en: {
    title: 'Reaction Time Test - Measure Your Reflexes | DreamURL',
    description: 'Test your reaction speed with our online reaction time game. Measure your reflexes, compete with friends, and improve your gaming performance. Free browser-based reflex testing.',
    keywords: 'reaction time, reflex test, speed test, gaming performance, reaction speed, online game, browser game, reflex training',
    lang: 'en',
    hreflang: 'en'
  },
  ko: {
    title: '반응속도 테스트 - 반사신경 측정 게임 | DreamURL',
    description: '온라인 반응속도 테스트로 당신의 반사신경을 측정하세요. 무료 브라우저 게임으로 반응속도 향상과 게이밍 실력을 키워보세요.',
    keywords: '반응속도, 반사신경, 속도측정, 게임실력, 반응테스트, 온라인게임, 브라우저게임, 반사신경훈련',
    lang: 'ko',
    hreflang: 'ko'
  },
  es: {
    title: 'Test de Tiempo de Reacción - Mide tus Reflejos | DreamURL',
    description: 'Prueba tu velocidad de reacción con nuestro juego online. Mide tus reflejos, compite con amigos y mejora tu rendimiento gaming. Entrenamiento gratuito de reflejos.',
    keywords: 'tiempo de reacción, test de reflejos, prueba de velocidad, rendimiento gaming, velocidad de reacción, juego online, juego navegador',
    lang: 'es',
    hreflang: 'es'
  },
  zh: {
    title: '反应速度测试 - 测量反射能力 | DreamURL',
    description: '通过我们的在线反应时间游戏测试您的反应速度。测量反射能力，与朋友竞争，提高游戏表现。免费的浏览器反射训练。',
    keywords: '反应时间, 反射测试, 速度测试, 游戏表现, 反应速度, 在线游戏, 浏览器游戏, 反射训练',
    lang: 'zh-CN',
    hreflang: 'zh'
  },
  ja: {
    title: '反応速度テスト - 反射神経測定ゲーム | DreamURL',
    description: 'オンライン反応速度テストで反射神経を測定しましょう。友達と競い合い、ゲームパフォーマンスを向上させる無料ブラウザゲーム。',
    keywords: '反応時間, 反射テスト, スピードテスト, ゲームパフォーマンス, 反応速度, オンラインゲーム, ブラウザゲーム, 反射トレーニング',
    lang: 'ja',
    hreflang: 'ja'
  }
};

const SUPPORTED_LANGUAGES: Language[] = ['en', 'ko', 'es', 'zh', 'ja'];

export const SEOHead = ({ language }: SEOHeadProps) => {
  const seoData = SEO_CONFIG[language];
  const baseUrl = 'https://dreamurl.github.io';

  useEffect(() => {
    // 동적으로 메타태그 업데이트
    const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // 기본 SEO 메타태그
    document.title = seoData.title;
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords);
    updateMetaTag('robots', 'index, follow');
    document.documentElement.lang = seoData.lang;

    // Open Graph 메타태그
    updateMetaTag('og:title', seoData.title, 'property');
    updateMetaTag('og:description', seoData.description, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:url', `${baseUrl}/${language}`, 'property');
    updateMetaTag('og:site_name', 'DreamURL - Reaction Time Test', 'property');
    updateMetaTag('og:locale', seoData.lang, 'property');

    // Twitter Card 메타태그
    updateMetaTag('twitter:card', 'summary');
    updateMetaTag('twitter:title', seoData.title);
    updateMetaTag('twitter:description', seoData.description);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${baseUrl}/${language}`;

    // hreflang 태그 설정
    // 기존 hreflang 태그 제거
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"]');
    existingHreflangs.forEach(link => link.remove());

    // 새로운 hreflang 태그 추가
    SUPPORTED_LANGUAGES.forEach(lang => {
      const hrefLangLink = document.createElement('link');
      hrefLangLink.rel = 'alternate';
      hrefLangLink.hrefLang = SEO_CONFIG[lang].hreflang;
      hrefLangLink.href = `${baseUrl}/${lang}`;
      document.head.appendChild(hrefLangLink);
    });

    // x-default hreflang (영어로 설정)
    const defaultHrefLang = document.createElement('link');
    defaultHrefLang.rel = 'alternate';
    defaultHrefLang.hrefLang = 'x-default';
    defaultHrefLang.href = `${baseUrl}/en`;
    document.head.appendChild(defaultHrefLang);

    // 구조화된 데이터 (JSON-LD)
    const updateJsonLd = () => {
      let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": seoData.title,
        "description": seoData.description,
        "url": `${baseUrl}/${language}`,
        "applicationCategory": "Game",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "inLanguage": seoData.lang,
        "creator": {
          "@type": "Organization",
          "name": "DreamURL"
        }
      };

      jsonLdScript.textContent = JSON.stringify(structuredData);
    };

    updateJsonLd();

  }, [language, seoData, baseUrl]);

  return null; // 이 컴포넌트는 side effect만 처리
};

export default SEOHead;