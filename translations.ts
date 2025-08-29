import type { Language } from './types';

type GradeTranslation = {
  grade: string;
  description: {
    general: string;
    overwatch: string;
    lol: string;
  };
};

type TranslationSet = {
  title: string;
  introduction: string;
  statusIdle: string;
  statusWaiting: string;
  statusPlaying: string;
  statusFinished: string;
  gameOverDecoy: string;
  avgReactionTime: string;
  startGame: string;
  playAgain: string;
  gradesTitle: string;
  grades: GradeTranslation[];
};

export const translations: Record<Language, TranslationSet> = {
  en: {
    title: 'Reaction Time Test',
    introduction: 'A simple test to measure your reaction time to a visual stimulus. Rules are simple: click the black dot as soon as it appears. In later rounds, avoid the red decoy dots! The average human reaction time is ~250ms. With practice, many can reach 200ms. Feel free to test as many times as you like.',
    statusIdle: 'Click "Start" to begin.',
    statusWaiting: 'Round {round}/{totalRounds}. Get ready...',
    statusPlaying: 'Round {round}/{totalRounds}. Click the BLACK dot!',
    statusFinished: 'Game Over!',
    gameOverDecoy: 'Game Over! You clicked the red dot.',
    avgReactionTime: 'Your average reaction time is:',
    startGame: 'Start Game',
    playAgain: 'Play Again',
    gradesTitle: 'Reaction Time Grades',
    grades: [
      { grade: 'God Tier', description: { general: 'Are you human? Unbelievable reaction speed.', overwatch: 'Perfect for a Tracer/Genji main, dominating the backline.', lol: 'You belong in the mid lane playing assassins like Zed or Akali.' } },
      { grade: 'Diamond', description: { general: 'Pro-level speed. You can react to anything.', overwatch: 'Excel as a hitscan DPS like Cassidy or Ashe.', lol: 'A perfect fit for an ADC like Kai\'Sa or Vayne who needs to dodge everything.' } },
      { grade: 'Gold', description: { general: 'Excellent! Faster than most players.', overwatch: 'You\'d be a great playmaking support like Ana or Kiriko.', lol: 'Try a versatile Jungler like Lee Sin to make plays across the map.' } },
      { grade: 'Silver', description: { general: 'Solid and reliable. A dependable teammate.', overwatch: 'A reliable Tank like Reinhardt or D.Va would suit you well.', lol: 'You\'d do well in Top lane with a strong frontliner like Garen or Ornn.' } },
      { grade: 'Bronze', description: { general: 'Perfectly normal human reaction time.', overwatch: 'Try a support with consistent value that doesn\'t require flick shots, like Mercy.', lol: 'A scaling mage like Lux or Veigar would be a good fit.' } },
      { grade: 'Needs Practice', description: { general: 'A bit on the slower side, but practice makes perfect!', overwatch: 'Start with a straightforward tank like Winston to learn the game sense.', lol: 'Learn the ropes with a simple and effective support like Janna or Soraka.' } },
    ],
  },
  ko: {
    title: '반응 속도 테스트',
    introduction: '시각적 자극에 대한 당신의 반응 속도를 측정하는 간단한 테스트입니다. 규칙은 간단합니다: 검은 점이 나타나면 최대한 빨리 클릭하세요. 후반 라운드에서는 미끼인 빨간 점을 피해야 합니다! 평균적인 사람의 반응 속도는 약 250ms입니다. 훈련을 통해 많은 사람들이 200ms에 도달할 수 있습니다. 얼마든지 여러 번 테스트해보세요.',
    statusIdle: '시작 버튼을 눌러 게임을 시작하세요.',
    statusWaiting: '라운드 {round}/{totalRounds}. 준비하세요...',
    statusPlaying: '라운드 {round}/{totalRounds}. 검은 점을 클릭하세요!',
    statusFinished: '게임 종료!',
    gameOverDecoy: '게임 오버! 빨간 점을 클릭했습니다.',
    avgReactionTime: '평균 반응 속도:',
    startGame: '게임 시작',
    playAgain: '다시하기',
    gradesTitle: '반응 속도 등급',
    grades: [
      { grade: '신', description: { general: '혹시 사람이 아니신가요? 믿을 수 없는 반응 속도입니다.', overwatch: '트레이서/겐지 주력 플레이어에게 완벽하며, 적의 후방을 지배할 수 있습니다.', lol: '제드나 아칼리 같은 암살자로 미드 라인을 지배할 운명입니다.' } },
      { grade: '다이아몬드', description: { general: '프로 수준의 속도. 어떤 상황에도 반응할 수 있습니다.', overwatch: '캐서디나 애쉬 같은 히트스캔 DPS로 뛰어난 활약을 펼칠 수 있습니다.', lol: '모든 것을 피해야 하는 카이사나 베인 같은 원거리 딜러에게 안성맞춤입니다.' } },
      { grade: '골드', description: { general: '훌륭합니다! 대부분의 플레이어보다 빠릅니다.', overwatch: '아나나 키리코처럼 플레이를 만드는 서포터가 되면 훌륭할 것입니다.', lol: '맵 전체에서 활약할 수 있는 리 신 같은 다재다능한 정글러를 시도해보세요.' } },
      { grade: '실버', description: { general: '견고하고 신뢰할 수 있습니다. 믿음직한 팀원입니다.', overwatch: '라인하르트나 D.Va 같은 든든한 탱커가 잘 어울립니다.', lol: '가렌이나 오른 같은 강력한 선봉장으로 탑 라인에서 좋은 성과를 낼 것입니다.' } },
      { grade: '브론즈', description: { general: '완벽하게 평범한 인간의 반응 속도입니다.', overwatch: '메르시처럼 순간적인 조준이 필요 없는 꾸준한 가치를 지닌 서포터를 해보세요.', lol: '럭스나 베이가 같은 성장형 마법사가 좋은 선택이 될 것입니다.' } },
      { grade: '연습 필요', description: { general: '조금 느린 편이지만, 연습이 완벽을 만듭니다!', overwatch: '게임 감각을 익히기 위해 윈스턴 같은 직관적인 탱커로 시작해보세요.', lol: '잔나나 소라카처럼 간단하고 효과적인 서포터로 기본기를 다져보세요.' } },
    ],
  },
  es: {
    title: 'Prueba de Tiempo de Reacción',
    introduction: 'Esta es una prueba simple para medir tu tiempo de reacción a un estímulo visual. Las reglas son sencillas: haz clic en el punto negro tan pronto como aparezca. ¡En rondas posteriores, evita los puntos rojos de señuelo! El tiempo de reacción humano promedio es de alrededor de 250ms. Con práctica, muchos pueden alcanzar los 200ms. Siéntete libre de probar tantas veces como quieras.',
    statusIdle: 'Haz clic en "Iniciar" para comenzar.',
    statusWaiting: 'Ronda {round}/{totalRounds}. Prepárate...',
    statusPlaying: 'Ronda {round}/{totalRounds}. ¡Haz clic en el punto NEGRO!',
    statusFinished: '¡Juego Terminado!',
    gameOverDecoy: '¡Juego Terminado! Hiciste clic en el punto rojo.',
    avgReactionTime: 'Tu tiempo de reacción promedio es:',
    startGame: 'Iniciar Juego',
    playAgain: 'Jugar de Nuevo',
    gradesTitle: 'Niveles de Tiempo de Reacción',
    grades: [
      { grade: 'Nivel Dios', description: { general: '¿Eres humano? Velocidad de reacción increíble.', overwatch: 'Perfecto para un main Tracer/Genji, dominando la retaguardia.', lol: 'Perteneces al carril central jugando asesinos como Zed o Akali.' } },
      { grade: 'Diamante', description: { general: 'Velocidad de nivel profesional. Puedes reaccionar a cualquier cosa.', overwatch: 'Destaca como un DPS de hitscan como Cassidy o Ashe.', lol: 'Ideal para un ADC como Kai\'Sa o Vayne que necesita esquivarlo todo.' } },
      { grade: 'Oro', description: { general: '¡Excelente! Más rápido que la mayoría de los jugadores.', overwatch: 'Serías un gran soporte creador de jugadas como Ana o Kiriko.', lol: 'Prueba un jungla versátil como Lee Sin para hacer jugadas por todo el mapa.' } },
      { grade: 'Plata', description: { general: 'Sólido y confiable. Un compañero de equipo dependable.', overwatch: 'Un tanque confiable como Reinhardt o D.Va te iría bien.', lol: 'Te iría bien en el carril superior con un vanguardia fuerte como Garen u Ornn.' } },
      { grade: 'Bronce', description: { general: 'Tiempo de reacción humano perfectamente normal.', overwatch: 'Prueba un soporte con valor constante que no requiera disparos rápidos, como Mercy.', lol: 'Un mago de escalado como Lux o Veigar sería una buena opción.' } },
      { grade: 'Necesita Práctica', description: { general: 'Un poco lento, ¡pero la práctica hace al maestro!', overwatch: 'Comienza con un tanque sencillo como Winston para aprender la percepción del juego.', lol: 'Aprende con un soporte simple y efectivo como Janna o Soraka.' } },
    ],
  },
  zh: {
    title: '反应速度测试',
    introduction: '这是一个简单的测试，用于测量您对视觉刺激的反应时间。规则很简单：黑点出现时，请尽快点击。在后面的回合中，请避开红色的诱饵点！人类的平均反应时间约为250毫秒。通过练习，许多人可以达到200毫高。欢迎您随时进行多次测试。',
    statusIdle: '点击“开始”以开始游戏。',
    statusWaiting: '第 {round}/{totalRounds} 回合。准备...',
    statusPlaying: '第 {round}/{totalRounds} 回合。点击黑点！',
    statusFinished: '游戏结束！',
    gameOverDecoy: '游戏结束！你点击了红点。',
    avgReactionTime: '你的平均反应时间是：',
    startGame: '开始游戏',
    playAgain: '再玩一次',
    gradesTitle: '反应速度等级',
    grades: [
      { grade: '神级', description: { general: '你是人类吗？难以置信的反应速度。', overwatch: '完美适合猎空/源氏玩家，主宰后排。', lol: '你属于中路，玩劫或阿卡丽这样的刺客。' } },
      { grade: '钻石', description: { general: '职业级速度。你能对任何事情做出反应。', overwatch: '作为像卡西迪或艾什这样的即时命中DPS表现出色。', lol: '非常适合需要躲避一切的ADC，如卡莎或薇恩。' } },
      { grade: '黄金', description: { general: '优秀！比大多数玩家都快。', overwatch: '你会成为一个出色的 playmaker 辅助，比如安娜或雾子。', lol: '尝试像李青这样多才多艺的打野，在地图上创造机会。' } },
      { grade: '白银', description: { general: '稳定可靠。一个可靠的队友。', overwatch: '一个可靠的坦克，如莱因哈特或D.Va，会很适合你。', lol: '你会在上路表现出色，使用像盖伦或奥恩这样的强大前排。' } },
      { grade: '青铜', description: { general: '完全正常的人类反应时间。', overwatch: '尝试一个不需要甩枪的稳定型辅助，比如天使。', lol: '像拉克丝或维迦这样的发育型法师会是一个不错的选择。' } },
      { grade: '需要练习', description: { general: '有点慢，但熟能生巧！', overwatch: '从像温斯顿这样直观的坦克开始，学习游戏意识。', lol: '用像迦娜或索拉卡这样简单有效的辅助来学习基础。' } },
    ],
  },
  ja: {
    title: '反応速度テスト',
    introduction: 'これは視覚刺激に対するあなたの反応速度を測定するための簡単なテストです。ルールは簡単です：黒い点が表示されたら、できるだけ早くクリックしてください。後のラウンドでは、おとりの赤い点を避けてください！人間の平均反応時間は約250msです。練習すれば、多くの人が200msに到達できます。何度でも自由にテストしてください。',
    statusIdle: '「開始」をクリックしてゲームを始めます。',
    statusWaiting: 'ラウンド {round}/{totalRounds}。準備してください...',
    statusPlaying: 'ラウンド {round}/{totalRounds}。黒い点をクリック！',
    statusFinished: 'ゲーム終了！',
    gameOverDecoy: 'ゲームオーバー！赤い点をクリックしました。',
    avgReactionTime: '平均反応時間：',
    startGame: 'ゲーム開始',
    playAgain: 'もう一度プレイ',
    gradesTitle: '反応速度グレード',
    grades: [
      { grade: '神ティア', description: { general: 'あなたは人間ですか？信じられないほどの反応速度です。', overwatch: 'トレーサー/ゲンジのメインに最適で、バックラインを支配します。', lol: 'あなたはミッドレーンに属し、ゼドやアカリのようなアサシンをプレイします。' } },
      { grade: 'ダイヤモンド', description: { general: 'プロレベルのスピード。何にでも反応できます。', overwatch: 'キャスディやアッシュのようなヒットスキャンDPSとして優れています。', lol: 'すべてを避ける必要があるカイ＝サやヴェインのようなADCに最適です。' } },
      { grade: 'ゴールド', description: { general: '素晴らしい！ほとんどのプレイヤーよりも速いです。', overwatch: 'アナやキリコのようなプレイメイキングサポートとして素晴らしいでしょう。', lol: 'マップ全体でプレイを作るために、リー・シンのような多才なジャングラーを試してみてください。' } },
      { grade: 'シルバー', description: { general: '堅実で信頼できます。頼りになるチームメイトです。', overwatch: 'ラインハルトやD.Vaのような信頼できるタンクがあなたに合っています。', lol: 'ガレンやオーンのような強力なフロントライナーでトップレーンでうまくやるでしょう。' } },
      { grade: 'ブロンズ', description: { general: '完全に正常な人間の反応時間です。', overwatch: 'マーシーのようにフリックショットを必要としない一貫した価値を持つサポートを試してみてください。', lol: 'ラックスやベイガーのようなスケーリングメイジが良い選択でしょう。' } },
      { grade: '要練習', description: { general: '少し遅いですが、練習すれば完璧になります！', overwatch: 'ゲームセンスを学ぶために、ウィンストンのような分かりやすいタンクから始めましょう。', lol: 'ジャンナやソラカのようなシンプルで効果的なサポートで基本を学びましょう。' } },
    ],
  },
};
