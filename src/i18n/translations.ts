import { Language } from "../types";

export interface I18nContent {
  // Navigation
  tabs: {
    home: string;
    chat: string;
    knowledge: string;
    practice: string;
    agent: string;
    rewards: string;
  };
  // Onboarding Screen
  onboarding: {
    step: string;
    skip: string;
    badge: string;
    title: string;
    subtitle: string;
    tutorQuote: string;
    bilingualTitle: string;
    bilingualDesc: string;
    previewLabel: string;
    syncText: string;
    continueBtn: string;
    footerNote: string;
    selectedBadge: string;
    langKzDesc: string;
    langRuDesc: string;
    langEnDesc: string;
    subjectsHeader: string;
    subjects: string[];
  };
  // Home Screen
  home: {
    systemBadge: string;
    greeting: string;
    studentName: string;
    courseTrack: string;
    streakPill: string;
    xpPill: string;
    dailyGoalPill: string;
    gapBadge: string;
    gapRisk: string;
    gapTitle: string;
    gapDesc: string;
    gapAction: string;
    tutorPromoTitle: string;
    tutorPromoSubtitle: string;
    askBtn: string;
    routeTitle: string;
    routeSubtitle: string;
    routeStepsBadge: string;
    routeStep1Title: string;
    routeStep1Desc: string;
    routeStep2Title: string;
    routeStep2Desc: string;
    routeStep3Title: string;
    routeStep3Desc: string;
    masteryTitle: string;
    masterySubtitle: string;
    detailsBtn: string;
    gradeSelectorTitle?: string;
    unlocksAtGrade?: string;
    toTasksAndGuide?: string;
    subjects: {
      algebra: string;
      physics: string;
      geometry: string;
      english: string;
      biology?: string;
      chemistry?: string;
      cs?: string;
    };
  };
  // Chat Screen
  chat: {
    title: string;
    onlineStatus: string;
    subjectSelector: string;
    explanationStyleTitle: string;
    adaptiveNote: string;
    styles: {
      analogy: string;
      algorithm: string;
      theory: string;
    };
    todayTime: string;
    studentLabel: string;
    tutorName: string;
    modePizzaBadge: string;
    initialStudentMessage: string;
    initialTutorIntro: string;
    warningWhyNotDirectAdd: string;
    magicDenomTitle: string;
    magicDenomDesc: string;
    pizza1Label: string;
    pizza1Val: string;
    pizza1Note: string;
    pizza2Label: string;
    pizza2Val: string;
    pizza2Note: string;
    sumResult: string;
    miniTrainerTitle: string;
    miniTrainerQuestion: string;
    quizSuccess: string;
    quizSuccessXP: string;
    chips: {
      subtract: string;
      showOnPizza: string;
      similarProblem: string;
    };
    inputPlaceholder: string;
    photoTooltip: string;
    formulaTooltip: string;
    sendTooltip: string;
    aiThinking: string;
    askTutorTip: string;
  };
  // Knowledge Map
  knowledge: {
    category: string;
    screenTitle: string;
    filters: {
      all: string;
      gaps: string;
      inProgress: string;
      mastered: string;
    };
    masteryGaugeTitle: string;
    masteryGaugeSubtitle: string;
    masteryGaugeBlockers: string;
    totalScore: string;
    treeTitle: string;
    treeSubtitle: string;
    chainBadge: string;
    nodes: {
      node1Title: string;
      node1Desc: string;
      node1Prereq: string;
      node1Status: string;
      node2Title: string;
      node2Desc: string;
      node2GapBadge: string;
      node2Risk: string;
      node2Blocks: string;
      node2Accuracy: string;
      node3Title: string;
      node3Desc: string;
      node3Status: string;
      node3BlockedWarning: string;
      node4Title: string;
      node4Desc: string;
      node4Status: string;
      node4LockedNote: string;
    };
    diagnosticCard: {
      title: string;
      badge: string;
      errorObservation: string;
      missedBaseTitle: string;
      missedBaseConcept: string;
      impactTitle: string;
      impactDesc: string;
      startSprintBtn: string;
      sprintSubtitle: string;
    };
  };
  // Practice Trainer
  practice: {
    headerTitle: string;
    headerSubject: string;
    questionCounter: string;
    progressStatus: string;
    adaptiveLevel: string;
    adaptiveDesc: string;
    topicTag1: string;
    topicTag2: string;
    taskHeader: string;
    taskPrompt: string;
    simplifyTitle: string;
    chooseAnswerHeader: string;
    hintTitle: string;
    hintBody: string;
    stepByStepBtn: string;
    afterAnswerBtn: string;
    confirmBtn: string;
    correctAlert: string;
    wrongAlert: string;
    nextQuestionBtn: string;
    aiHelpBtn: string;
    modalTitle: string;
    howToSolveBtn?: string;
    howToSolveTitle?: string;
    givenGoalTitle?: string;
    ruleFormulaTitle?: string;
    algorithmStepsTitle?: string;
    commonTrapTitle?: string;
  };
  // Agent Calibration
  agent: {
    syncHeader: string;
    companionName: string;
    centerTitle: string;
    calibrationBadge: string;
    companionHeroTitle: string;
    companionHeroDesc: string;
    cognitiveStyleLabel: string;
    styles: {
      analogies: string;
      algorithm: string;
      blitz: string;
    };
    mentorshipLabel: string;
    mentorshipCurrent: string;
    directHints: string;
    socraticQuestions: string;
    gentlePaceTitle: string;
    gentlePaceSubtitle: string;
    interestsLabel: string;
    interestsSubtitle: string;
    interests: {
      football: string;
      videogames: string;
      space: string;
    };
    agentSwarmTitle: string;
    agentSwarmSubtitle: string;
    agentCount: string;
    agents: {
      empathyTitle: string;
      empathyTime: string;
      empathyDesc: string;
      gapTitle: string;
      gapTime: string;
      gapDesc: string;
      socraticTitle: string;
      socraticTime: string;
      socraticDesc: string;
      plannerTitle: string;
      plannerTime: string;
      plannerDesc: string;
    };
    demoTitle: string;
    demoBadge: string;
    demoNote: string;
    demoQuote: string;
    saveSyncBtn: string;
    syncSuccessToast: string;
  };
  // Rewards & Store
  rewards: {
    studentTitle: string;
    studentTrack: string;
    streakBadge: string;
    heroBannerBadge: string;
    heroMultiplier: string;
    heroCategory: string;
    heroTitle: string;
    heroDesc: string;
    rewardAccrued: string;
    guideUpdated: string;
    dailyStepsTitle: string;
    dailyStepsRemaining: string;
    continueWithNewton: string;
    challengesTitle: string;
    challengesSubtitle: string;
    activeCount: string;
    challenges: {
      challenge1Title: string;
      challenge1Status: string;
      challenge1Desc: string;
      claimBtn: string;
      challenge2Title: string;
      challenge2Desc: string;
      stepRemaining: string;
      challenge3Title: string;
      challenge3Desc: string;
      untilSun: string;
    };
    storeTitle: string;
    storeSubtitle: string;
    balanceLabel: string;
    buyBtn: string;
    boughtBtn: string;
    notEnoughCoins: string;
    items: {
      item1Title: string;
      item1Desc: string;
      item1Badge: string;
      item2Title: string;
      item2Desc: string;
      item2Badge: string;
      item3Title: string;
      item3Desc: string;
      item3Badge: string;
      item4Title: string;
      item4Desc: string;
      item4Badge: string;
      featuredTitle: string;
      featuredDesc: string;
      featuredBadge: string;
      featuredProgress: string;
      featuredAccumulated: string;
    };
    historyTitle: string;
  };
}

export const translations: Record<Language, I18nContent> = {
  kz: {
    tabs: {
      home: "Басты",
      chat: "ИИ Чат",
      knowledge: "Карта",
      practice: "Тренажер",
      agent: "AI Напарник",
      rewards: "Марапаттар",
    },
    onboarding: {
      step: "1 / 3 қадам",
      skip: "Өткізу",
      badge: "Жеке ыңғайлылық",
      title: "Қай тілде оқыған сізге ыңғайлырақ?",
      subtitle:
        "Негізгі оқу тілін таңдаңыз. ИИ-тьютордың барлық түсіндірмелері, формулалары мен бағдарлама интерфейсі сізге бейімделеді. Тілді кез келген уақытта өзгертуге болады.",
      tutorQuote:
        "«Мен бейімделуге дайынмын! Кез келген күрделі тақырыпты қарапайым сөздермен, пицца/спорт мысалдарымен және түсінікті қадамдармен жеткіземін.»",
      bilingualTitle: "STEM билингвалды режимі",
      bilingualDesc: "Ғылыми терминдер мен формулаларды ағылшын тілінде қатар көрсету",
      previewLabel: "Интерфейсті алдын ала қарау",
      syncText: "Синхрондалды",
      continueBtn: "Жалғастыру",
      footerNote: "Оқу тілін кез келген уақытта жеке кабинетте өзгертуге болады",
      selectedBadge: "Таңдалды",
      langKzDesc: "Барлық беттер мен тапсырмалар қазақ тілінде болады",
      langRuDesc: "Интерфейс пен барлық материалдар орыс тілінде",
      langEnDesc: "Интерфейс пен барлық материалдар ағылшын тілінде",
      subjectsHeader: "Қолжетімді пәндер",
      subjects: ["📐 Алгебра & Геометрия", "⚡ Физика", "🧪 Химия", "💻 Информатика"],
    },
    home: {
      systemBadge: "Зияткерлік жүйе",
      greeting: "Қайта оралуыңмен! 🚀",
      studentName: "Әлішер Смирнов",
      courseTrack: "Мектеп бағдарламасы бойынша оқу",
      streakPill: "🔥 7 күн",
      xpPill: "⚡ 1,420 XP",
      dailyGoalPill: "🎯 85% Мақсат",
      gapBadge: "Ақылды ИИ диагностикасы",
      gapRisk: "Тәуекел 68%",
      gapTitle: "Пробел табылды: Жай бөлшектерді қосу",
      gapDesc:
        "Алгебрадағы «Рационал теңдеулер» тақырыбын меңгеруге кедергі келтіреді. 15 минутта жойыңыз.",
      gapAction: "Пробелді ИИ-мен жою →",
      tutorPromoTitle: "ИИ-тәлімгер көмекке дайын!",
      tutorPromoSubtitle: "Кез келген сұрақ қой немесе есептің суретін жібер",
      askBtn: "Сұрау",
      routeTitle: "Дербес бағыт",
      routeSubtitle: "Бүгінге нейрожелі ұсынған қадамдар",
      routeStepsBadge: "3 қадам",
      routeStep1Title: "Алгебра: Квадрат теңдеулер",
      routeStep1Desc: "Бейімделген тест • 15 мин • +50 XP",
      routeStep2Title: "Физика: Ньютон заңдары",
      routeStep2Desc: "ИИ-мен талдау • 10 мин • +35 XP",
      routeStep3Title: "Ағылшын: Conditionals",
      routeStep3Desc: "Диалог практикасы • 10 мин • +30 XP",
      masteryTitle: "Пәндерді меңгеру",
      masterySubtitle: "Курстың ағымдағы прогресі",
      detailsBtn: "Толығырақ",
      gradeSelectorTitle: "Сыныпты таңдау",
      unlocksAtGrade: "-сыныпта ашылады",
      toTasksAndGuide: "Тапсырмаларға және қалай шығаруға ➔",
      subjects: {
        algebra: "Алгебра",
        physics: "Физика",
        geometry: "Геометрия",
        english: "Ағылшын тілі",
        biology: "Биология",
        chemistry: "Химия",
        cs: "Информатика",
      },
    },
    chat: {
      title: "ИИ-Репетитор Newton",
      onlineStatus: "Онлайн • Бейімделген түсіндіру режимі",
      subjectSelector: "📐 Алгебра: Бөлшектер және теңдеулер (6-сынып)",
      explanationStyleTitle: "ИИ ТҮСІНДІРУ СТИЛІ:",
      adaptiveNote: "Сұраққа қарай бейімделеді",
      styles: {
        analogy: "🍕 Қарапайым мысалдармен (Пицца/Өмір)",
        algorithm: "🪜 Қадамдық талдау (Шаг за шагом)",
        theory: "🔬 Қатаң теория",
      },
      todayTime: "Бүгін, 14:24",
      studentLabel: "Оқушы",
      tutorName: "ИИ-Репетитор Newton",
      modePizzaBadge: "Режим: Пицца 🍕",
      initialStudentMessage:
        "Мен бөлімдері әртүрлі бөлшектерді қалай қосу керектігін үнемі шатастырамын, мысалы 2/3 + 1/4. Неге жай ғана үсті мен астын қоса салуға болмайды?",
      initialTutorIntro:
        "Керемет әрі өте орынды сұрақ! Пиццаны елестетіп көрші 🍕: 2/3 — бұл 3 бөлікке бөлінген пиццаның 2 үлкен тілімі. Ал 1/4 — 4 бөлікке бөлінген пиццаның 1 кішкентай тілімі.",
      warningWhyNotDirectAdd:
        "⚠️ Неге қоса салуға болмайды: Егер оларды жай ғана (2+1)/(3+4) = 3/7 деп қоссақ, әртүрлі калибрдегі тілімдер араласып, нақты шамасы мүлде бұзылады!",
      magicDenomTitle: "Фокусқа қара: ортақ бөлім 12",
      magicDenomDesc: "Екі пиццаны да бірдей тең тілімдерге кесеміз (ортақ бөлім 12):",
      pizza1Label: "Бірінші пицца:",
      pizza1Val: "2/3 = 8/12",
      pizza1Note: "8 тең тілім",
      pizza2Label: "Екінші пицца:",
      pizza2Val: "1/4 = 3/12",
      pizza2Note: "3 тең тілім",
      sumResult: "Енді бірдей бөліктерді қосамыз: 8/12 + 3/12 = 11/12! Бүтін пицца дерлік 🎉",
      miniTrainerTitle: "Шағын тренажер: білімді бекітейік!",
      miniTrainerQuestion: "Өзің байқап көр: 1/2 + 1/3 неше болады?",
      quizSuccess: "✨ Дұрыс! 3/6 + 2/6 = 5/6",
      quizSuccessXP: "+15 XP",
      chips: {
        subtract: "✨ Ал бөлшектерді қалай азайтады?",
        showOnPizza: "🍕 Пиццада 3/4 - 1/2 көрсетші",
        similarProblem: "📝 Осыған ұқсас есеп берші",
      },
      inputPlaceholder: "ИИ-ден сұраңыз немесе формула суретін жіберіңіз...",
      photoTooltip: "Дәптердегі есепті суретке түсіру",
      formulaTooltip: "Формулалар пернетақтасы ∑",
      sendTooltip: "Жіберу",
      aiThinking: "Newton есепті талдап жатыр...",
      askTutorTip: "Кез келген есеп немесе сұрақ жазыңыз",
    },
    knowledge: {
      category: "AI БІЛІМ КАРТОГРАФИЯСЫ",
      screenTitle: "Математика & Алгебра",
      filters: {
        all: "Барлық тақырыптар",
        gaps: "Пробелдер (2)",
        inProgress: "Оқылуда (4)",
        mastered: "Меңгерілді (18)",
      },
      masteryGaugeTitle: "Курс шеберлігі",
      masteryGaugeSubtitle: "8–9 сынып бағдарламасының 74%-ы меңгерілді",
      masteryGaugeBlockers: "2 сыни бөгеуіш бар",
      totalScore: "жалпы ұпай",
      treeTitle: "Тәуелділіктер мен пререквизиттер ағашы",
      treeSubtitle: "Білім байланысын интерактивті талдау",
      chainBadge: "Тізбек",
      nodes: {
        node1Title: "Базалық арифметика",
        node1Desc: "Бүтін сандарды қосу, азайту, көбейту, бөлу",
        node1Prereq: "Пререквизит 01",
        node1Status: "Меңгерілді",
        node2Title: "Бөлшектер және пропорциялар",
        node2Desc: "Ортақ бөлімге келтіру, айнымалылары бар бөлшектер",
        node2GapBadge: "КРИТИКАЛЫҚ ПРОБЕЛ 42%",
        node2Risk: "Қауіп деңгейі: Жоғары",
        node2Blocks: "Төмендегі 2 тақырыпты бұғаттап тұр",
        node2Accuracy: "Дәлдік: 42%",
        node3Title: "Сызықтық теңдеулер",
        node3Desc: "Жақшалары және бөлшек коэффициенттері бар теңдеулер",
        node3Status: "Жартылай меңгерілді",
        node3BlockedWarning: "Пробелмен бұғатталған: Бөлшек теңдеулер қатеге әкелуде",
        node4Title: "Квадрат теңдеулер және дискриминант",
        node4Desc: "Түбірлер формуласы, Виет теоремасы, көбейткіштерге жіктеу",
        node4Status: "Бұғатталған",
        node4LockedNote: "Бастамас бұрын Бөлшектердегі пробелді жоюды талап етеді",
      },
      diagnosticCard: {
        title: "ИИ диагностикасы: Түпкі себепті талдау",
        badge: "НЕЙРО-АУДИТ",
        errorObservation: "Қатарынан 4 тесттегі қате ортақ бөлімге келтіру кезеңінде орын алуда.",
        missedBaseTitle: "ӨТКІЗІП АЛҒАН БАЗА:",
        missedBaseConcept: "ЕКОЕ (Ең кіші ортақ еселік) және сандарды жай көбейткіштерге жіктеу.",
        impactTitle: "Оқу жоспарына әсері:",
        impactDesc:
          "Алгебрадағы 3 аралас тақырыпқа (рационал бөлшектер, жүйелер) және Физикадағы 1 тақырыпқа (Ом заңы мен параллель қосу) әсер етеді.",
        startSprintBtn: "Пробелді жоюдың 10 минуттық мини-спринтін бастау 🚀",
        sprintSubtitle: "Дербес жинақ: 3 шағын түсіндіру + 5 есеп",
      },
    },
    practice: {
      headerTitle: "Диагностикалық тренажер",
      headerSubject: "Алгебра • 9-сынып",
      questionCounter: "4 / 10 сұрақ",
      progressStatus: "40% орындалды",
      adaptiveLevel: "Деңгей: Бейімделген (Орташа)",
      adaptiveDesc: "ИИ күрделілікті сіздің қарқыныңызға бейімдеді: қысқартуларды сенімді меңгеру.",
      topicTag1: "Алгебралық бөлшектер",
      topicTag2: "Рационализация",
      taskHeader: "Тапсырма:",
      taskPrompt: "x ≠ 2 болғанда өрнектің мәні нешеге тең? Өрнекті ықшамдаңыз:",
      simplifyTitle: "ӨРНЕКТІ ЫҚШАМДАҢЫЗ",
      chooseAnswerHeader: "ДҰРЫС ЖАУАПТЫ ТАҢДАҢЫЗ:",
      hintTitle: "AI-тьютордың көмекші кеңесі",
      hintBody:
        "Ортақ бөлімге (x - 2) назар аударыңыз. Өрнекті ортақ сызық астына жазыңыз: (3x - 6) / (x - 2). Алымынан 3 санын жақша сыртына шығаруға бола ма?",
      stepByStepBtn: "ИИ-мен қадам бойынша шешу",
      afterAnswerBtn: "Жауаптан соң талдау",
      confirmBtn: "Жауапты растау →",
      correctAlert: "🎉 Дұрыс! Бөлшек қысқарып, 3 қалды. +25 XP берілді!",
      wrongAlert: "Қайта ойланып көр: алымынан 3-ті жақша сыртына шығар: 3(x-2)/(x-2)!",
      nextQuestionBtn: "Келесі есепке өту →",
      aiHelpBtn: "ИИ-ден көмек сұрау",
      modalTitle: "Newton AI: Қадамдық шешім",
      howToSolveBtn: "Қалай шығару керек?",
      howToSolveTitle: "Есепті қалай орындау керек? (Толық нұсқаулық)",
      givenGoalTitle: "🎯 Берілгені және Мақсат",
      ruleFormulaTitle: "📐 Ереже немесе Формула",
      algorithmStepsTitle: "📋 Қадамдық алгоритм",
      commonTrapTitle: "⚠️ Жиі кездесетін қателік (Тұзақ)",
    },
    agent: {
      syncHeader: "АГЕНТТІ БАПТАУ ОРТАЛЫҒЫ",
      companionName: "AI-Серіктес Newton",
      centerTitle: "Агентті баптау орталығы",
      calibrationBadge: "БАПТАУ",
      companionHeroTitle: "Сенің жеке ИИ-серіктесің: Newton",
      companionHeroDesc:
        "ИИ-дің материалды қалай түсіндіретінін және траекторияны қалай дербестендіретінін бапта.",
      cognitiveStyleLabel: "Түсіндірудің когнитивтік стилі",
      styles: {
        analogies: "Аналогиялар",
        algorithm: "Алгоритм",
        blitz: "Блиц",
      },
      mentorshipLabel: "Тәлімгерлік деңгейі",
      mentorshipCurrent: "Сократтық (85%)",
      directHints: "Тікелей кеңестер",
      socraticQuestions: "Жетелеуші сұрақтар",
      gentlePaceTitle: "Жұмсақ жүктеме қарқыны",
      gentlePaceSubtitle: "Шаршаудан қорғау • 15 мин/күн",
      interestsLabel: "Есептердегі мысалдар үшін қызығушылықтар",
      interestsSubtitle: "ИИ сюжеттерді өзі құрастырады",
      interests: {
        football: "Футбол & Спорт",
        videogames: "Видеоойындар & IT",
        space: "Ғарыш & Ғылым",
      },
      agentSwarmTitle: "ИИ-агенттер байланысы іс жүзінде",
      agentSwarmSubtitle: "Агенттер нақты уақытта жүйені сен үшін қалай бейімдейді",
      agentCount: "4 агент",
      agents: {
        empathyTitle: "Бейімделу және эмпатия агенті",
        empathyTime: "2 мин бұрын",
        empathyDesc: "Қатарынан 3 қатені байқады: стресс деңгейін түсіріп, тапсырманы 2 жеңіл микро-қадамға бөлді.",
        gapTitle: "Пробелдерді анықтау агенті",
        gapTime: "Бүгін, 14:20",
        gapDesc: "Себепті бөлшектердің ЕКОЕ-нен тапты. Күрделі алгебра алдында 10-мин спринт қосты.",
        socraticTitle: "Сократтық репетитор",
        socraticTime: "Қазір белсенді",
        socraticDesc: "Графтар теориясын ойындардағы кейіпкер прокачкасы механикасына аударды.",
        plannerTitle: "Бағыт сәулетшісі",
        plannerTime: "Жаңартылды",
        plannerDesc: "Дайындық траекториясын қайта есептеді: 88% мақсаты 4 күнге ертерек орындалады.",
      },
      demoTitle: "Стильді қазір экспресс-тестілеу",
      demoBadge: "ДЕМО",
      demoNote: "Ньютон заңын түсіндіру үлгісі (пицца мен спорт арқылы):",
      demoQuote:
        "«Елестетші, бос қақпа бұрышына допты пас бердің — ол шөптің үйкелісі тоқтатқанша өзі домалай береді. Міне осы бірінші заң!»",
      saveSyncBtn: "Агентті сақтау және синхрондау",
      syncSuccessToast: "Newton агентінің параметрлері сәтті жаңартылды!",
    },
    rewards: {
      studentTitle: "Әлішер",
      studentTrack: "Бағыт: Алгебра & Физика",
      streakBadge: "7 күн",
      heroBannerBadge: "NEWTON ИИ-ГАЙДЫ",
      heroMultiplier: "Көбейткіш x1.5 XP",
      heroCategory: "КРИТИКАЛЫҚ ПРОБЕЛ ЖОЙЫЛДЫ",
      heroTitle: "Тақырып: Ондық және Жай бөлшектер!",
      heroDesc:
        "Сен тәлімгердің тікелей көмегінсіз қатарынан 8 күрделендірілген теңдеуді қатесіз шештің.",
      rewardAccrued: "Марапат есептелді: +250 NC • +500 XP",
      guideUpdated: "Гайд жаңартылды: келесі фокус — Пайыздар",
      dailyStepsTitle: "Бүгінгі жеке жоспар қадамдары",
      dailyStepsRemaining: "Күннің супер-сыйлығына дейін 1 блиц-тест қалды!",
      continueWithNewton: "Newton-мен бағытты жалғастыру →",
      challengesTitle: "Бағыт сынақтары",
      challengesSubtitle: "ИИ-серіктестің тапсырмаларын орындап, NC жина",
      activeCount: "2 белсенді",
      challenges: {
        challenge1Title: "Тәлімгермен синхрондалу",
        challenge1Status: "Дайын",
        challenge1Desc: "Тәлімгердің тікелей көмегінсіз 3 сократтық диалогтан өту.",
        claimBtn: "Марапатты алу",
        challenge2Title: "Қатесіз спринт",
        challenge2Desc: "Бейімделген формулалар тренажерінде қатарынан 5 есеп шығару.",
        stepRemaining: "1 қадам қалды",
        challenge3Title: "Пробелдерді жоюшы",
        challenge3Desc: "Білім картасындағы 1 тар орынды осы аптада жою.",
        untilSun: "Жексенбіге дейін",
      },
      storeTitle: "Марапаттар дүкені",
      storeSubtitle: "Монеталарды дамуға және нақты бонустарға жұмса",
      balanceLabel: "Баланс:",
      buyBtn: "Сатып алу",
      boughtBtn: "Сатып алынды",
      notEnoughCoins: "NC монеталары жеткіліксіз!",
      items: {
        item1Title: "Кибер-Ньютон 2.0",
        item1Desc: "Барлық чаттардағы ИИ-серіктеске арналған кастом скин.",
        item1Badge: "Скин",
        item2Title: "Қарқынды мұздату",
        item2Desc: "Кездейсоқ күнді өткізіп алсаң, 7 күндік стрикті сақтайды.",
        item2Badge: "Қорғаныс",
        item3Title: "XP-ді 24 сағ екі еселеу",
        item3Desc: "Толық бір тәулік бойы кез келген шешімге екі есе тәжірибе.",
        item3Badge: "Буст",
        item4Title: "Мерч & iPad билеті",
        item4Desc: "AI Tutor толстовкасын немесе айдың планшетін ұтып алу мүмкіндігі.",
        item4Badge: "Ұтыс",
        featuredTitle: "Үздік оқытушымен 1 сағат",
        featuredDesc: "Күрделі тақырыпты жеке бейнеталдау немесе олимпиадаға дайындық.",
        featuredBadge: "Нақты сыйлық",
        featuredProgress: "Жинақталу прогресі",
        featuredAccumulated: "Жинақталғаны",
      },
      historyTitle: "Марапаттар тарихы",
    },
  },
  ru: {
    tabs: {
      home: "Главная",
      chat: "ИИ Чат",
      knowledge: "Карта",
      practice: "Тренажер",
      agent: "AI Тьютор",
      rewards: "Награды",
    },
    onboarding: {
      step: "1 из 3",
      skip: "Пропустить",
      badge: "Индивидуальный комфорт",
      title: "На каком языке вам удобнее учиться?",
      subtitle:
        "Выберите основной язык. Все объяснения ИИ-тьютора, формулы и интерфейс подстроятся под ваш выбор. Язык можно сменить в любой момент.",
      tutorQuote:
        "«Я готов подстроиться! Буду объяснять любые сложные темы простыми словами, наглядными примерами и в вашем ритме.»",
      bilingualTitle: "Билингвальный режим STEM",
      bilingualDesc: "Дублировать научные термины и формулы на английском",
      previewLabel: "Предосмотр интерфейса",
      syncText: "Синхронизировано",
      continueBtn: "Продолжить",
      footerNote: "Язык интерфейса можно изменить в любое время в настройках профиля",
      selectedBadge: "Выбран",
      langKzDesc: "Интерфейс и материалы на казахском языке",
      langRuDesc: "Все страницы и объяснения будут на русском языке",
      langEnDesc: "Интерфейс и материалы на английском языке",
      subjectsHeader: "Доступные дисциплины",
      subjects: ["📐 Алгебра & Геометрия", "⚡ Физика", "🧪 Химия", "💻 Информатика"],
    },
    home: {
      systemBadge: "Интеллектуальная система",
      greeting: "С возвращением! 🚀",
      studentName: "Алексей Смирнов",
      courseTrack: "Индивидуальная школьная программа",
      streakPill: "🔥 7 дней",
      xpPill: "⚡ 1,420 XP",
      dailyGoalPill: "🎯 85% Дневная цель",
      gapBadge: "Умная диагностика ИИ",
      gapRisk: "Риск 68%",
      gapTitle: "Обнаружен пробел: Сложение обыкновенных дробей",
      gapDesc:
        "Мешает освоению темы «Рациональные уравнения» в Алгебре. Закройте за 15 минут.",
      gapAction: "Устранить пробел с ИИ →",
      tutorPromoTitle: "ИИ-наставник готов помочь!",
      tutorPromoSubtitle: "Задай любой вопрос или пришли фото задачи",
      askBtn: "Спросить",
      routeTitle: "Персональный маршрут",
      routeSubtitle: "Рекомендовано нейросетью на сегодня",
      routeStepsBadge: "3 шага",
      routeStep1Title: "Алгебра: Квадратные уравнения",
      routeStep1Desc: "Адаптивный тест • 15 мин • +50 XP",
      routeStep2Title: "Физика: Законы Ньютона",
      routeStep2Desc: "Разбор с ИИ • 10 мин • +35 XP",
      routeStep3Title: "Английский: Conditionals",
      routeStep3Desc: "Практика диалога • 10 мин • +30 XP",
      masteryTitle: "Освоение предметов",
      masterySubtitle: "Текущий прогресс курса",
      detailsBtn: "Подробнее",
      gradeSelectorTitle: "Выбор класса",
      unlocksAtGrade: "класс (откроется)",
      toTasksAndGuide: "К заданиям и как выполнить ➔",
      subjects: {
        algebra: "Алгебра",
        physics: "Физика",
        geometry: "Геометрия",
        english: "Английский",
        biology: "Биология",
        chemistry: "Химия",
        cs: "Информатика",
      },
    },
    chat: {
      title: "ИИ-Репетитор Newton",
      onlineStatus: "Онлайн • Режим адаптивного объяснения",
      subjectSelector: "📐 Алгебра: Дроби и уравнения (6 класс)",
      explanationStyleTitle: "СТИЛЬ ОБЪЯСНЕНИЯ ИИ:",
      adaptiveNote: "Адаптируется под вопрос",
      styles: {
        analogy: "🍕 На простых примерах (Пицца/Жизнь)",
        algorithm: "🪜 Пошаговый разбор (Шаг за шагом)",
        theory: "🔬 Строгая теория",
      },
      todayTime: "Сегодня, 14:24",
      studentLabel: "Ученик",
      tutorName: "ИИ-Репетитор Newton",
      modePizzaBadge: "Режим: Пицца 🍕",
      initialStudentMessage:
        "Я постоянно путаюсь, как складывать дроби с разными знаменателями, например 2/3 + 1/4. Почему нельзя просто сложить верх и низ?",
      initialTutorIntro:
        "Отличный и очень естественный вопрос! Представь пиццу 🍕: 2/3 — это 2 больших куска от пиццы, разрезанной на 3 части. А 1/4 — это 1 маленький кусок от пиццы на 4 части.",
      warningWhyNotDirectAdd:
        "⚠️ Почему нельзя сложить: Если их просто сложить как (2+1)/(3+4) = 3/7, куски разного калибра перемешаются и общий размер абсолютно исказится!",
      magicDenomTitle: "Смотри фокус: общий знаменатель 12",
      magicDenomDesc: "Нарежем обе пиццы на одинаковые равные кусочки (общий знаменатель 12):",
      pizza1Label: "Первая пицца:",
      pizza1Val: "2/3 = 8/12",
      pizza1Note: "8 ровных кусочков",
      pizza2Label: "Вторая пицца:",
      pizza2Val: "1/4 = 3/12",
      pizza2Note: "3 ровных кусочка",
      sumResult: "Теперь складываем одинаковые: 8/12 + 3/12 = 11/12! Почти целая пицца 🎉",
      miniTrainerTitle: "Мини-тренажёр: закрепим успех!",
      miniTrainerQuestion: "Попробуй сам: сколько будет 1/2 + 1/3?",
      quizSuccess: "✨ Правильно! 3/6 + 2/6 = 5/6",
      quizSuccessXP: "+15 XP",
      chips: {
        subtract: "✨ А как вычитать дроби?",
        showOnPizza: "🍕 Покажи на пицце 3/4 - 1/2",
        similarProblem: "📝 Дай похожую задачу",
      },
      inputPlaceholder: "Спроси ИИ или отправь фото формулы...",
      photoTooltip: "Сфотографировать задачу из тетради",
      formulaTooltip: "Клавиатура формул ∑",
      sendTooltip: "Отправить вопрос",
      aiThinking: "Newton анализирует задачу...",
      askTutorTip: "Задайте любой вопрос или выберите подсказку",
    },
    knowledge: {
      category: "AI КАРТОГРАФИЯ ЗНАНИЙ",
      screenTitle: "Математика & Алгебра",
      filters: {
        all: "Все темы",
        gaps: "Пробелы (2)",
        inProgress: "В процессе (4)",
        mastered: "Освоено (18)",
      },
      masteryGaugeTitle: "Мастерство курса",
      masteryGaugeSubtitle: "74% программы 8–9 классов освоено",
      masteryGaugeBlockers: "2 критических блокера",
      totalScore: "общий балл",
      treeTitle: "Дерево зависимостей и пререквизитов",
      treeSubtitle: "Интерактивный анализ связности знаний",
      chainBadge: "Цепочка",
      nodes: {
        node1Title: "Базовая арифметика",
        node1Desc: "Сложение, вычитание, умножение, деление целых чисел",
        node1Prereq: "Пререквизит 01",
        node1Status: "Освоено",
        node2Title: "Дроби и пропорции",
        node2Desc: "Приведение к общему знаменателю, дроби с переменными",
        node2GapBadge: "КРИТИЧЕСКИЙ ПРОБЕЛ 42%",
        node2Risk: "Уровень риска: Высокий",
        node2Blocks: "Блокирует 2 темы ниже",
        node2Accuracy: "Точность: 42%",
        node3Title: "Линейные уравнения",
        node3Desc: "Уравнения со скобками и дробными коэффициентами",
        node3Status: "Частично освоено",
        node3BlockedWarning: "Блокируется пробелом: Дробные уравнения вызывают ошибки",
        node4Title: "Квадратные уравнения и дискриминант",
        node4Desc: "Формула корней, теорема Виета, разложение на множители",
        node4Status: "Заблокировано",
        node4LockedNote: "Требует устранения пробела в Дробях перед стартом",
      },
      diagnosticCard: {
        title: "Диагностика ИИ: Анализ первопричины",
        badge: "НЕЙРО-АУДИТ",
        errorObservation: "Ошибки в 4 тестах подряд происходят на этапе приведения к общему знаменателю.",
        missedBaseTitle: "ПРОПУЩЕННАЯ БАЗА:",
        missedBaseConcept: "НОК (Наименьшее общее кратное) и разложение чисел на простые сомножители.",
        impactTitle: "Влияние на учебный план:",
        impactDesc:
          "Влияет на 3 смежные темы в Алгебре (рациональные дроби, системы уравнений) и 1 тему в Физике (законы Ома и параллельные цепи).",
        startSprintBtn: "Запустить 10-минутный мини-спринт ликвидации пробела 🚀",
        sprintSubtitle: "Персонализированная подборка: 3 микро-объяснения + 5 задач",
      },
    },
    practice: {
      headerTitle: "Диагностический тренажер",
      headerSubject: "Алгебра • 9 класс",
      questionCounter: "Вопрос 4 из 10",
      progressStatus: "40% пройдено",
      adaptiveLevel: "Уровень: Адаптивный (Средний)",
      adaptiveDesc: "ИИ подобрал сложность под ваш темп: уверенное владение базовыми сокращениями.",
      topicTag1: "Алгебраические дроби",
      topicTag2: "Рационализация",
      taskHeader: "Задание:",
      taskPrompt: "Чему равно значение выражения при x ≠ 2? Упростите выражение:",
      simplifyTitle: "УПРОСТИТЕ ВЫРАЖЕНИЕ",
      chooseAnswerHeader: "ВЫБЕРИТЕ ВЕРНЫЙ ОТВЕТ:",
      hintTitle: "Подсказка от AI-тьютора",
      hintBody:
        "Обрати внимание на общий знаменатель (x - 2). Запиши выражение под одну черту: (3x - 6) / (x - 2). Можно ли вынести множитель 3 за скобки в числителе?",
      stepByStepBtn: "Шаг за шагом ИИ",
      afterAnswerBtn: "Разбор после ответа",
      confirmBtn: "Подтвердить ответ →",
      correctAlert: "🎉 Правильно! 3(x-2)/(x-2) сокращается до 3. Начислено +25 XP!",
      wrongAlert: "Подумай ещё: вынеси 3 за скобки: 3(x - 2) / (x - 2) = 3!",
      nextQuestionBtn: "Следующий вопрос →",
      aiHelpBtn: "Помощь от ИИ",
      modalTitle: "Newton AI: Пошаговый разбор",
      howToSolveBtn: "Как выполнить?",
      howToSolveTitle: "Как решить задачу? (Пошаговый гайд)",
      givenGoalTitle: "🎯 Дано и цель",
      ruleFormulaTitle: "📐 Правило и формула",
      algorithmStepsTitle: "📋 Алгоритм решения",
      commonTrapTitle: "⚠️ Частая ловушка / ошибка",
    },
    agent: {
      syncHeader: "ЦЕНТР КАЛИБРОВКИ АГЕНТА",
      companionName: "AI-Компаньон Newton",
      centerTitle: "Центр калибровки агента",
      calibrationBadge: "КАЛИБРОВКА",
      companionHeroTitle: "Твой личный ИИ-напарник: Newton",
      companionHeroDesc: "Настрой, как ИИ объясняет материал и персонализирует траекторию.",
      cognitiveStyleLabel: "Когнитивный стиль объяснений",
      styles: {
        analogies: "Аналогии",
        algorithm: "Алгоритм",
        blitz: "Блиц",
      },
      mentorshipLabel: "Уровень наставничества",
      mentorshipCurrent: "Сократический (85%)",
      directHints: "Прямые подсказки",
      socraticQuestions: "Наводящие вопросы",
      gentlePaceTitle: "Щадящий темп нагрузки",
      gentlePaceSubtitle: "Защита от выгорания • 15 мин/день",
      interestsLabel: "Интересы для примеров в задачах",
      interestsSubtitle: "ИИ генерирует сюжеты",
      interests: {
        football: "Футбол & Спорт",
        videogames: "Видеоигры & IT",
        space: "Космос & Наука",
      },
      agentSwarmTitle: "Связка ИИ-агентов в действии",
      agentSwarmSubtitle: "Как агенты перестраивают систему под тебя в реальном времени",
      agentCount: "4 агента",
      agents: {
        empathyTitle: "Агент адаптации и эмпатии",
        empathyTime: "2 мин назад",
        empathyDesc: "Заметил 3 ошибки подряд: снизил уровень стресса, разбил задачу на 2 простых микро-шага.",
        gapTitle: "Агент детекции пробелов",
        gapTime: "Сегодня, 14:20",
        gapDesc: "Выявил причину в НОК дробей. Автоматически включил 10-мин спринт перед сложной алгеброй.",
        socraticTitle: "Сократический репетитор",
        socraticTime: "Активен сейчас",
        socraticDesc: "Перевел объяснение теории графов в плоскость механики прокачки веток в играх.",
        plannerTitle: "Архитектор маршрута",
        plannerTime: "Обновлено",
        plannerDesc: "Пересчитал траекторию подготовки: итоговая цель 88% баллов будет достигнута на 4 дня раньше.",
      },
      demoTitle: "Экспресс-тест стиля прямо сейчас",
      demoBadge: "ДЕМО",
      demoNote: "Пример объяснения теоремы Ньютона (через пиццу и спорт):",
      demoQuote:
        "«Представь, что ты пасуешь мяч в пустой угол ворот — он катится дальше сам, пока его не остановит трение травы. Вот это и есть первый закон!»",
      saveSyncBtn: "Сохранить и синхронизировать агента",
      syncSuccessToast: "Параметры агента Newton успешно сохранены!",
    },
    rewards: {
      studentTitle: "Алексей",
      studentTrack: "Маршрут: Алгебра & Физика",
      streakBadge: "7 дней",
      heroBannerBadge: "ИИ-ГАЙД NEWTON",
      heroMultiplier: "Множитель x1.5 XP",
      heroCategory: "КРИТИЧЕСКИЙ ПРОБЕЛ ЛИКВИДИРОВАН",
      heroTitle: "Тема: Десятичные и Обыкновенные дроби!",
      heroDesc:
        "Ты безошибочно решил 8 усложненных уравнений подряд без прямой подсказки наставника.",
      rewardAccrued: "Награда начислена: +250 NC • +500 XP",
      guideUpdated: "Гайд обновлен: следующий фокус — Проценты",
      dailyStepsTitle: "Шаги персонального плана на сегодня",
      dailyStepsRemaining: "Осталось решить 1 блиц-тест до сундука супер-награды дня!",
      continueWithNewton: "Продолжить маршрут с Newton →",
      challengesTitle: "Испытания маршрута",
      challengesSubtitle: "Выполняй задачи ИИ-напарника и забирай NC",
      activeCount: "2 активно",
      challenges: {
        challenge1Title: "Синхронизация с наставником",
        challenge1Status: "Готово",
        challenge1Desc: "Пройти 3 сократических диалога без прямых подсказок наставника.",
        claimBtn: "Забрать награду",
        challenge2Title: "Спринт без единой ошибки",
        challenge2Desc: "Выполнить 5 задач подряд в адаптивном тренажере формул.",
        stepRemaining: "1 шаг остался",
        challenge3Title: "Уничтожитель пробелов",
        challenge3Desc: "Ликвидировать 1 узкое горлышко в Карте знаний за текущую неделю.",
        untilSun: "До вс",
      },
      storeTitle: "Магазин наград",
      storeSubtitle: "Трать монеты на прокачку и реальные бонусы",
      balanceLabel: "Баланс:",
      buyBtn: "Купить",
      boughtBtn: "Куплено",
      notEnoughCoins: "Недостаточно монет NC!",
      items: {
        item1Title: "Кибер-Ньютон 2.0",
        item1Desc: "Кастомный скин для ИИ-напарника во всех чатах.",
        item1Badge: "Скин",
        item2Title: "Заморозка темпа",
        item2Desc: "Защитит стрик 7 дней, если случайно пропустишь день.",
        item2Badge: "Защита",
        item3Title: "Удвоитель XP 24ч",
        item3Desc: "Двойной опыт за любые решения на целые сутки.",
        item3Badge: "Буст",
        item4Title: "Билет на мерч & iPad",
        item4Desc: "Шанс выиграть толстовку AI Tutor или планшет месяца.",
        item4Badge: "Розыгрыш",
        featuredTitle: "1 час с топ-преподавателем",
        featuredDesc: "Индивидуальный видеоразбор сложной темы или подготовка к олимпиаде с методистом МГУ/ВШЭ.",
        featuredBadge: "Реальный приз",
        featuredProgress: "Прогресс накопления",
        featuredAccumulated: "Накоплено",
      },
      historyTitle: "История наград",
    },
  },
  en: {
    tabs: {
      home: "Home",
      chat: "AI Tutor",
      knowledge: "Knowledge",
      practice: "Practice",
      agent: "AI Companion",
      rewards: "Rewards",
    },
    onboarding: {
      step: "Step 1 of 3",
      skip: "Skip",
      badge: "Personal Comfort",
      title: "Which language is most comfortable for learning?",
      subtitle:
        "Choose your primary language. All AI-tutor explanations, formulas, and interface elements will adapt seamlessly. You can change this anytime.",
      tutorQuote:
        "“I’m ready to adapt! I’ll break down complex concepts into crystal-clear steps and interactive examples at your own pace.”",
      bilingualTitle: "STEM Bilingual Mode",
      bilingualDesc: "Provide auxiliary bilingual glossaries for scientific terms",
      previewLabel: "Interface Live Preview",
      syncText: "Synchronized",
      continueBtn: "Continue",
      footerNote: "You can change your learning language anytime in settings",
      selectedBadge: "Selected",
      langKzDesc: "All pages and learning materials in Kazakh",
      langRuDesc: "All pages and learning materials in Russian",
      langEnDesc: "All pages and learning materials in English",
      subjectsHeader: "Available STEM tracks",
      subjects: ["📐 Algebra & Geometry", "⚡ Physics", "🧪 Chemistry", "💻 Computer Science"],
    },
    home: {
      systemBadge: "Intelligent System",
      greeting: "Welcome back! 🚀",
      studentName: "Alex Smirnov",
      courseTrack: "Personalized School Curriculum",
      streakPill: "🔥 7 days",
      xpPill: "⚡ 1,420 XP",
      dailyGoalPill: "🎯 85% Daily Goal",
      gapBadge: "Smart AI Diagnostics",
      gapRisk: "Risk 68%",
      gapTitle: "Gap Detected: Adding Simple Fractions",
      gapDesc:
        "Blocks mastering 'Rational Equations' in Algebra. Remedy this gap in 15 minutes.",
      gapAction: "Fix Gap with AI →",
      tutorPromoTitle: "AI Mentor is ready to help!",
      tutorPromoSubtitle: "Ask any question or submit a photo of your homework",
      askBtn: "Ask Tutor",
      routeTitle: "Personalized Daily Route",
      routeSubtitle: "Recommended by neural network for today",
      routeStepsBadge: "3 steps",
      routeStep1Title: "Algebra: Quadratic Equations",
      routeStep1Desc: "Adaptive Quiz • 15 min • +50 XP",
      routeStep2Title: "Physics: Newton's Laws",
      routeStep2Desc: "AI Breakdown • 10 min • +35 XP",
      routeStep3Title: "English: Conditionals",
      routeStep3Desc: "Dialogue Practice • 10 min • +30 XP",
      masteryTitle: "Subject Mastery",
      masterySubtitle: "Current course progress",
      detailsBtn: "Details",
      gradeSelectorTitle: "Select Grade",
      unlocksAtGrade: "grade (unlocks)",
      toTasksAndGuide: "To Assignments & How to Solve ➔",
      subjects: {
        algebra: "Algebra",
        physics: "Physics",
        geometry: "Geometry",
        english: "English",
        biology: "Biology",
        chemistry: "Chemistry",
        cs: "Computer Science",
      },
    },
    chat: {
      title: "AI Tutor Newton",
      onlineStatus: "Online • Adaptive Explanation Mode",
      subjectSelector: "📐 Algebra: Fractions & Equations (Grade 6)",
      explanationStyleTitle: "AI EXPLANATION STYLE:",
      adaptiveNote: "Adapts to each query",
      styles: {
        analogy: "🍕 Simple Analogies (Pizza/Life)",
        algorithm: "🪜 Step-by-Step Breakdown",
        theory: "🔬 Strict Theory",
      },
      todayTime: "Today, 14:24",
      studentLabel: "Student",
      tutorName: "AI Tutor Newton",
      modePizzaBadge: "Mode: Pizza 🍕",
      initialStudentMessage:
        "I always get confused about adding fractions with different denominators, like 2/3 + 1/4. Why can't we just add top and bottom directly?",
      initialTutorIntro:
        "Awesome and very natural question! Picture a pizza 🍕: 2/3 represents 2 big slices from a pizza cut into 3 pieces. And 1/4 is 1 smaller slice from a pizza cut into 4.",
      warningWhyNotDirectAdd:
        "⚠️ Why you can't just add across: If you combine (2+1)/(3+4) = 3/7, slices of different sizes get mixed together and the real proportion is completely distorted!",
      magicDenomTitle: "Watch this magic: common denominator 12",
      magicDenomDesc: "Let's slice both pizzas into identical equal pieces (common base 12):",
      pizza1Label: "First pizza:",
      pizza1Val: "2/3 = 8/12",
      pizza1Note: "8 equal slices",
      pizza2Label: "Second pizza:",
      pizza2Val: "1/4 = 3/12",
      pizza2Note: "3 equal slices",
      sumResult: "Now add identical parts: 8/12 + 3/12 = 11/12! Almost a whole pizza 🎉",
      miniTrainerTitle: "Mini-Practice: Cement your understanding!",
      miniTrainerQuestion: "Try it yourself: what is 1/2 + 1/3?",
      quizSuccess: "✨ Correct! 3/6 + 2/6 = 5/6",
      quizSuccessXP: "+15 XP",
      chips: {
        subtract: "✨ How do we subtract fractions?",
        showOnPizza: "🍕 Show 3/4 - 1/2 on a pizza",
        similarProblem: "📝 Give me a similar problem",
      },
      inputPlaceholder: "Ask AI or send a photo of your math formula...",
      photoTooltip: "Take photo of homework",
      formulaTooltip: "Math formula keyboard ∑",
      sendTooltip: "Send question",
      aiThinking: "Newton is analyzing the problem...",
      askTutorTip: "Type any question or tap a suggestion chip",
    },
    knowledge: {
      category: "AI KNOWLEDGE GRAPH",
      screenTitle: "Mathematics & Algebra",
      filters: {
        all: "All Topics",
        gaps: "Gaps (2)",
        inProgress: "In Progress (4)",
        mastered: "Mastered (18)",
      },
      masteryGaugeTitle: "Course Mastery",
      masteryGaugeSubtitle: "74% of Grade 8–9 curriculum completed",
      masteryGaugeBlockers: "2 critical blockers",
      totalScore: "total score",
      treeTitle: "Dependency & Prerequisite Tree",
      treeSubtitle: "Interactive knowledge connection analysis",
      chainBadge: "Chain",
      nodes: {
        node1Title: "Basic Arithmetic",
        node1Desc: "Addition, subtraction, multiplication, and division of integers",
        node1Prereq: "Prerequisite 01",
        node1Status: "Mastered",
        node2Title: "Fractions & Proportions",
        node2Desc: "Common denominators, fractions with variables",
        node2GapBadge: "CRITICAL GAP 42%",
        node2Risk: "Risk Level: High",
        node2Blocks: "Blocks 2 subsequent topics",
        node2Accuracy: "Accuracy: 42%",
        node3Title: "Linear Equations",
        node3Desc: "Equations with brackets and fractional coefficients",
        node3Status: "Partially Mastered",
        node3BlockedWarning: "Blocked by gap: Fractional equations cause repeated errors",
        node4Title: "Quadratic Equations & Discriminant",
        node4Desc: "Roots formula, Vieta's theorem, polynomial factorization",
        node4Status: "Locked",
        node4LockedNote: "Requires fixing Fractions gap before starting",
      },
      diagnosticCard: {
        title: "AI Diagnostics: Root-Cause Analysis",
        badge: "NEURO-AUDIT",
        errorObservation: "Errors across 4 consecutive tests happen during finding the common denominator.",
        missedBaseTitle: "MISSED FOUNDATION:",
        missedBaseConcept: "LCM (Least Common Multiple) and prime factorization of integers.",
        impactTitle: "Curriculum Impact:",
        impactDesc:
          "Affects 3 related topics in Algebra (rational fractions, systems of equations) and 1 topic in Physics (Ohm's Law and parallel circuits).",
        startSprintBtn: "Launch 10-Minute Gap Elimination Sprint 🚀",
        sprintSubtitle: "Personalized set: 3 micro-lessons + 5 practice problems",
      },
    },
    practice: {
      headerTitle: "Diagnostic Trainer",
      headerSubject: "Algebra • Grade 9",
      questionCounter: "Question 4 of 10",
      progressStatus: "40% completed",
      adaptiveLevel: "Level: Adaptive (Medium)",
      adaptiveDesc: "AI adjusted difficulty to your learning pace: confident grasp of algebraic cancellations.",
      topicTag1: "Algebraic Fractions",
      topicTag2: "Rationalization",
      taskHeader: "Task:",
      taskPrompt: "What is the value of the expression when x ≠ 2? Simplify the expression:",
      simplifyTitle: "SIMPLIFY THE EXPRESSION",
      chooseAnswerHeader: "SELECT THE CORRECT ANSWER:",
      hintTitle: "Hint from AI Tutor",
      hintBody:
        "Notice the common denominator (x - 2). Combine under a single fraction bar: (3x - 6) / (x - 2). Can you factor out 3 in the numerator?",
      stepByStepBtn: "Step-by-Step AI",
      afterAnswerBtn: "Review after answer",
      confirmBtn: "Confirm Answer →",
      correctAlert: "🎉 Correct! 3(x-2)/(x-2) cancels out to 3. Earned +25 XP!",
      wrongAlert: "Think again: factor out 3: 3(x - 2) / (x - 2) = 3!",
      nextQuestionBtn: "Next Problem →",
      aiHelpBtn: "Ask AI for Help",
      modalTitle: "Newton AI: Step-by-Step Solution",
      howToSolveBtn: "How to solve?",
      howToSolveTitle: "How to Solve This Task? (Full Guide)",
      givenGoalTitle: "🎯 Given & Goal",
      ruleFormulaTitle: "📐 Rule & Formula",
      algorithmStepsTitle: "📋 Step-by-step Algorithm",
      commonTrapTitle: "⚠️ Common Pitfall & Trap",
    },
    agent: {
      syncHeader: "AGENT CALIBRATION CENTER",
      companionName: "AI Companion Newton",
      centerTitle: "Agent Calibration Center",
      calibrationBadge: "CALIBRATION",
      companionHeroTitle: "Your Personal AI Partner: Newton",
      companionHeroDesc: "Customize how AI explains material and personalizes your learning trajectory.",
      cognitiveStyleLabel: "Cognitive Explanation Style",
      styles: {
        analogies: "Analogies",
        algorithm: "Algorithm",
        blitz: "Blitz",
      },
      mentorshipLabel: "Mentorship Guidance Level",
      mentorshipCurrent: "Socratic (85%)",
      directHints: "Direct Hints",
      socraticQuestions: "Guiding Questions",
      gentlePaceTitle: "Gentle Workload Pace",
      gentlePaceSubtitle: "Burnout protection • 15 min/day",
      interestsLabel: "Interests for Custom Problem Storylines",
      interestsSubtitle: "AI generates personalized themes",
      interests: {
        football: "Football & Sports",
        videogames: "Video Games & IT",
        space: "Space & Science",
      },
      agentSwarmTitle: "Multi-Agent System in Action",
      agentSwarmSubtitle: "How AI agents collaborate in real-time to tailor your experience",
      agentCount: "4 agents",
      agents: {
        empathyTitle: "Empathy & Pace Agent",
        empathyTime: "2 min ago",
        empathyDesc: "Noticed 3 consecutive mistakes: lowered stress level, divided task into 2 simple micro-steps.",
        gapTitle: "Gap Detection Agent",
        gapTime: "Today, 14:20",
        gapDesc: "Identified root cause in fraction LCM. Automatically scheduled 10-min sprint before advanced algebra.",
        socraticTitle: "Socratic Tutor Agent",
        socraticTime: "Active Now",
        socraticDesc: "Adapted graph theory explanation using gaming skill tree mechanics.",
        plannerTitle: "Curriculum Architect",
        plannerTime: "Updated",
        plannerDesc: "Recalculated preparation trajectory: target score of 88% will be achieved 4 days earlier.",
      },
      demoTitle: "Live Style Preview Right Now",
      demoBadge: "DEMO",
      demoNote: "Newton's First Law explanation example (via pizza & sports):",
      demoQuote:
        "“Imagine passing a football toward an empty corner — it keeps rolling until grass friction slows it down. That's Newton's First Law!”",
      saveSyncBtn: "Save and Synchronize Agent",
      syncSuccessToast: "Newton Agent settings synchronized successfully!",
    },
    rewards: {
      studentTitle: "Alex",
      studentTrack: "Track: Algebra & Physics",
      streakBadge: "7 days",
      heroBannerBadge: "NEWTON AI GUIDE",
      heroMultiplier: "Multiplier x1.5 XP",
      heroCategory: "CRITICAL GAP REMEDIATED",
      heroTitle: "Topic: Decimal & Common Fractions!",
      heroDesc:
        "You correctly solved 8 advanced equations in a row without direct tutor hints.",
      rewardAccrued: "Reward accrued: +250 NC • +500 XP",
      guideUpdated: "Guide updated: next focus area — Percentages",
      dailyStepsTitle: "Today's Personal Plan Steps",
      dailyStepsRemaining: "Solve 1 more blitz quiz to unlock today's super chest!",
      continueWithNewton: "Continue route with Newton →",
      challengesTitle: "Route Challenges",
      challengesSubtitle: "Complete AI companion tasks and collect NC",
      activeCount: "2 active",
      challenges: {
        challenge1Title: "Mentor Synchronization",
        challenge1Status: "Ready",
        challenge1Desc: "Complete 3 Socratic dialogues without direct tutor hints.",
        claimBtn: "Claim Reward",
        challenge2Title: "Zero-Error Sprint",
        challenge2Desc: "Complete 5 problems in a row in the adaptive formula trainer.",
        stepRemaining: "1 step left",
        challenge3Title: "Gap Eliminator",
        challenge3Desc: "Remediate 1 knowledge bottleneck in the Knowledge Map this week.",
        untilSun: "Due Sun",
      },
      storeTitle: "Reward Store",
      storeSubtitle: "Spend coins on upgrades and tangible rewards",
      balanceLabel: "Balance:",
      buyBtn: "Buy",
      boughtBtn: "Purchased",
      notEnoughCoins: "Not enough Newton Coins!",
      items: {
        item1Title: "Cyber-Newton 2.0",
        item1Desc: "Custom hologram skin for AI companion in all chats.",
        item1Badge: "Skin",
        item2Title: "Streak Freeze",
        item2Desc: "Protects your 7-day streak if you happen to miss a day.",
        item2Badge: "Protection",
        item3Title: "24h XP Doubler",
        item3Desc: "Double experience for all problem solving for 24 hours.",
        item3Badge: "Boost",
        item4Title: "Merch & iPad Raffle Ticket",
        item4Desc: "Chance to win an official AI Tutor hoodie or iPad of the month.",
        item4Badge: "Raffle",
        featuredTitle: "1 Hour with Top Instructor",
        featuredDesc: "1-on-1 video deep-dive on challenging topics or Olympiad preparation.",
        featuredBadge: "Real Reward",
        featuredProgress: "Savings Progress",
        featuredAccumulated: "Accumulated",
      },
      historyTitle: "Rewards History",
    },
  },
};
