# 🎯 Reaction Time Test - Multi-Language Gaming Platform

A professional-grade reaction speed testing game with advanced internationalization and SEO optimization.

## 🌍 **Multi-Language Support**

- **🇺🇸 English** - `/en` - Global audience
- **🇰🇷 한국어** - `/ko` - Korean users  
- **🇪🇸 Español** - `/es` - Spanish-speaking countries
- **🇨🇳 中文** - `/zh` - Chinese users
- **🇯🇵 日本語** - `/ja` - Japanese users

## 🚀 **Features**

- **Automatic Language Detection**: Detects user's country and redirects to appropriate language
- **SEO Optimized**: Individual meta tags, sitemap, and hreflang for each language
- **Responsive Design**: Works perfectly on all devices
- **Performance Optimized**: Fast loading with modern React patterns
- **AdSense Ready**: Optimized for monetization across all language versions

## 🔧 **Tech Stack**

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Routing**: React Router DOM v6 with language-based routes
- **Build Tool**: Vite
- **Deployment**: GitHub Pages with automated CI/CD
- **SEO**: Dynamic meta tags, structured data, multilingual sitemap

## 🏗️ **Project Structure**

```
├── src/
│   ├── components/
│   │   ├── GamePage.tsx         # Main game component
│   │   ├── SEOHead.tsx          # Dynamic SEO meta tags
│   │   └── LanguageRedirect.tsx # Auto language detection
│   ├── utils/
│   │   └── languageDetector.ts  # Language/country detection logic
│   ├── types.ts                 # TypeScript definitions
│   └── translations.ts          # Multi-language content
├── public/
│   ├── sitemap.xml             # Multi-language sitemap
│   ├── robots.txt              # SEO configuration
│   └── ads.txt                 # AdSense verification
└── .github/workflows/
    └── deploy.yml              # Automated deployment
```

## 🌐 **URL Structure**

- `https://dreamurl.github.io/` → Auto-detects language and redirects
- `https://dreamurl.github.io/en` → English version
- `https://dreamurl.github.io/ko` → Korean version  
- `https://dreamurl.github.io/es` → Spanish version
- `https://dreamurl.github.io/zh` → Chinese version
- `https://dreamurl.github.io/ja` → Japanese version

## 💻 **Development**

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

