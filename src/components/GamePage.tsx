import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import type { GameState, Language } from '../types';
import { translations } from '../translations';
import SEOHead from './SEOHead';

const TOTAL_ROUNDS = 5;
const DOT_SIZE = 28; // in pixels
const MIN_DELAY = 500; // 0.5 second
const MAX_DELAY = 3500; // 3.5 seconds
const TARGET_AVERAGE_DELAY = 1300; // in milliseconds
const DECOY_CHANCE = 0.7; // 70% chance for a decoy in applicable rounds

const REACTION_GRADES_CONFIG = [
  { min: 0, max: 150, color: 'border-purple-500' },
  { min: 151, max: 250, color: 'border-sky-400' },
  { min: 251, max: 350, color: 'border-yellow-400' },
  { min: 351, max: 450, color: 'border-slate-400' },
  { min: 451, max: 600, color: 'border-orange-900' }, 
  { min: 601, max: Infinity, color: 'border-red-500' },
];

const SUPPORTED_LANGUAGES: Language[] = ['en', 'ko', 'es', 'zh', 'ja'];

const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

/**
 * Generates a random number following an exponential distribution.
 */
const randomExponential = (rate: number): number => {
  let u = 0;
  while (u === 0) u = Math.random();
  return -Math.log(u) / rate;
};

export const GamePage = () => {
  const { lang } = useParams<{ lang: string }>();
  const language = lang as Language;

  // 지원하지 않는 언어일 경우 영어로 리다이렉트
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return <Navigate to="/en" replace />;
  }

  const [gameState, setGameState] = useState<GameState>('idle');
  const [round, setRound] = useState<number>(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [targetPosition, setTargetPosition] = useState<{ top: number; left: number }>({ top: -100, left: -100 });
  const [decoyPosition, setDecoyPosition] = useState<{ top: number; left: number }>({ top: -100, left: -100 });
  const [showDecoy, setShowDecoy] = useState<boolean>(false);
  const [finishReason, setFinishReason] = useState<'success' | 'decoy' | null>(null);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);

  const t = translations[language];

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const showTarget = useCallback(() => {
    if (!gameAreaRef.current) return;

    const { clientWidth, clientHeight } = gameAreaRef.current;
    
    const generatePosition = () => ({
        top: Math.random() * (clientHeight - DOT_SIZE),
        left: Math.random() * (clientWidth - DOT_SIZE)
    });

    const pos1 = generatePosition();
    let pos2 = generatePosition();

    const areOverlapping = (p1: { top: number, left: number }, p2: { top: number, left: number }) => {
        const dx = p1.left - p2.left;
        const dy = p1.top - p2.top;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < DOT_SIZE * 2;
    };

    const shouldShowDecoy = round >= 3 && Math.random() < DECOY_CHANCE;
    setShowDecoy(shouldShowDecoy);

    if (shouldShowDecoy) {
        while (areOverlapping(pos1, pos2)) {
            pos2 = generatePosition();
        }
        setDecoyPosition(pos2);
    }
    
    setTargetPosition(pos1);
    setGameState('playing');
    startTimeRef.current = Date.now();
  }, [round]);

  const scheduleNextTarget = useCallback(() => {
    clearTimer();
    setTargetPosition({ top: -100, left: -100 });
    setDecoyPosition({ top: -100, left: -100 });
    setShowDecoy(false);

    const rate = 1 / TARGET_AVERAGE_DELAY;
    let delay = randomExponential(rate);
    delay = Math.max(MIN_DELAY, Math.min(delay, MAX_DELAY));

    timerRef.current = setTimeout(showTarget, Math.round(delay));
  }, [clearTimer, showTarget]);

  const startGame = useCallback(() => {
    setReactionTimes([]);
    setRound(1);
    setShowDecoy(false);
    setFinishReason(null);
    setGameState('waiting');
    scheduleNextTarget();
  }, [scheduleNextTarget]);

  const handleNormalTargetClick = useCallback(() => {
    if (gameState !== 'playing') return;

    clearTimer();

    const endTime = Date.now();
    const time = endTime - startTimeRef.current;
    setReactionTimes(currentTimes => [...currentTimes, time]);

    if (round < TOTAL_ROUNDS) {
      setRound(prev => prev + 1);
      setGameState('waiting');
      scheduleNextTarget();
    } else {
      setGameState('finished');
      setFinishReason('success');
    }
  }, [gameState, round, clearTimer, scheduleNextTarget]);

  const handleDecoyClick = useCallback(() => {
      if (gameState !== 'playing') return;
      clearTimer();
      setGameState('finished');
      setFinishReason('decoy');
  }, [gameState, clearTimer]);

  const averageTime = reactionTimes.length > 0
    ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
    : 0;
    
  const getStatusMessage = () => {
    switch (gameState) {
      case 'idle':
        return t.statusIdle;
      case 'waiting':
        return t.statusWaiting.replace('{round}', String(round)).replace('{totalRounds}', String(TOTAL_ROUNDS));
      case 'playing':
        return t.statusPlaying.replace('{round}', String(round)).replace('{totalRounds}', String(TOTAL_ROUNDS));
      case 'finished':
        return finishReason === 'decoy' ? t.gameOverDecoy : t.statusFinished;
      default:
        return '';
    }
  };
  
  const reactionGrades = REACTION_GRADES_CONFIG.map((config, index) => ({
      ...config,
      ...t.grades[index],
  }));

  const userGrade = gameState === 'finished' && finishReason === 'success'
    ? reactionGrades.find(g => averageTime >= g.min && averageTime <= g.max) 
    : null;

  const handleLanguageChange = (newLang: Language) => {
    window.location.href = `/${newLang}`;
  };

  return (
    <>
      <SEOHead language={language} />
      <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-3xl flex justify-center mb-6 space-x-2">
          {LANGUAGES.map(({ code, name, flag }) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 flex items-center gap-2 ${
                language === code
                  ? 'bg-gray-900 text-white font-bold shadow-sm'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{flag}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>

        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 flex flex-col items-center">
          <header className="w-full text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{t.title}</h1>
            <p className="text-gray-500 mt-2 min-h-[24px]">{getStatusMessage()}</p>
          </header>

          <div className="w-full max-w-2xl text-center text-gray-600 mb-6 text-sm md:text-base px-2">
            <p>{t.introduction}</p>
          </div>

          <div 
            ref={gameAreaRef}
            className="relative w-full h-64 md:h-96 bg-gray-100 rounded-lg border border-gray-200 cursor-crosshair overflow-hidden"
          >
            {gameState === 'playing' && (
              <>
                <div
                  className="absolute rounded-full bg-black"
                  style={{
                    top: `${targetPosition.top}px`,
                    left: `${targetPosition.left}px`,
                    width: `${DOT_SIZE}px`,
                    height: `${DOT_SIZE}px`,
                  }}
                  onClick={handleNormalTargetClick}
                  role="button"
                  aria-label="target"
                />
                {showDecoy && (
                   <div
                      className="absolute rounded-full bg-red-500"
                      style={{
                        top: `${decoyPosition.top}px`,
                        left: `${decoyPosition.left}px`,
                        width: `${DOT_SIZE}px`,
                        height: `${DOT_SIZE}px`,
                      }}
                      onClick={handleDecoyClick}
                      role="button"
                      aria-label="decoy target"
                  />
                )}
              </>
            )}
          </div>

          <footer className="w-full mt-6 text-center min-h-[124px] flex items-center justify-center">
            {gameState === 'idle' && (
              <button
                onClick={startGame}
                className="px-8 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                {t.startGame}
              </button>
            )}

            {gameState === 'finished' && (
              <div className="flex flex-col items-center gap-4">
                {finishReason === 'success' ? (
                  <div className="text-center">
                    <p className="text-gray-600">{t.avgReactionTime}</p>
                    <p className="text-5xl font-bold text-gray-900">{averageTime}ms</p>
                  </div>
                ) : (
                   <p className="text-3xl font-bold text-red-500">{t.gameOverDecoy}</p>
                )}
                <button
                  onClick={startGame}
                  className="px-8 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  {t.playAgain}
                </button>
              </div>
            )}
          </footer>
          
          <div className="w-full mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">{t.gradesTitle}</h2>
            <div className="flex flex-col gap-4">
              {reactionGrades.map(({ min, max, grade, description, color }) => (
                <div 
                  key={grade} 
                  className={`p-4 rounded-lg bg-white border border-gray-200 border-l-4 ${color} transition-all duration-300 ${userGrade?.grade === grade ? 'ring-2 ring-offset-2 ring-offset-white ring-gray-900 scale-105 shadow-md' : 'shadow-sm'}`}
                >
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-lg">{grade}</h3>
                    <span className="text-sm font-mono text-gray-500">
                      {max === Infinity ? `> ${min - 1}ms` : `${min}-${max}ms`}
                    </span>
                  </div>
                  <div className="text-gray-600 text-base mt-3 space-y-3">
                    <p>{description.general}</p>
                    <div className="font-medium text-gray-800 space-y-1">
                        <p><span className="font-bold text-sky-500">Overwatch:</span> {description.overwatch}</p>
                        <p><span className="font-bold text-violet-500">LoL:</span> {description.lol}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>Created by a world-class senior frontend React engineer.</p>
        </div>
      </div>
    </>
  );
};

export default GamePage;