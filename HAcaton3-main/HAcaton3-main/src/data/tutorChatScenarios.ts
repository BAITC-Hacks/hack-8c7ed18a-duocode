import { Language, ChatMessage } from "../types";

export interface SubjectChatScenario {
  studentMessage: Record<Language, string>;
  tutorIntro: Record<Language, string>;
  modeBadge: Record<Language, string>;
  analogyBox: {
    title: Record<Language, string>;
    description: Record<Language, string>;
    warning?: Record<Language, string>;
    leftLabel: Record<Language, string>;
    leftValue: string;
    leftNote: Record<Language, string>;
    rightLabel: Record<Language, string>;
    rightValue: string;
    rightNote: Record<Language, string>;
    result: Record<Language, string>;
  };
  quizChallenge: {
    id: string;
    question: Record<Language, string>;
    formula?: string;
    options: { id: string; text: string; correct: boolean }[];
    grade: Record<Language, string>;
    subject: Record<Language, string>;
    topic: Record<Language, string>;
    xpReward: number;
  };
}

export const subjectScenarios: Record<string, SubjectChatScenario[]> = {
  biology: [
    {
      studentMessage: {
        kz: "Маған фотосинтез процесін және су фотолизін қарапайым мысалмен түсіндіріп берші: неге оттек бөлінеді?",
        ru: "Объясни мне фотосинтез и световую фазу простыми словами: почему выделяется кислород и где образуется глюкоза?",
        en: "Explain photosynthesis and light reactions simply: why is oxygen released and where is glucose synthesized?",
      },
      tutorIntro: {
        kz: "Керемет тақырып! 🧬 Хлоропластты күн сәулесінен қуат алатын микроскопиялық «жасыл зауыт» деп елестет. Жарық фазасында ол суды фотолизге ұшыратып (ыдыратып), бізге тыныс алатын оттекті (O₂) ауаға бөледі, ал қараңғы фазасында стромада глюкоза құрастырады!",
        ru: "Прекрасная тема! 🧬 Представь хлоропласт как солнечную фабрику. В световой фазе на мембранах тилакоидов свет расщепляет воду (фотолиз), даря нам кислород (O₂), а в строме строит глюкозу (C₆H₁₂O₆)!",
        en: "Awesome topic! 🧬 Imagine chloroplasts as solar-powered bio-factories. Thylakoid light reactions split water (photolysis), releasing oxygen (O₂) into the atmosphere, while stroma reactions synthesize glucose!",
      },
      modeBadge: {
        kz: "🧬 Биология • Фотосинтез",
        ru: "🧬 Биология • Фотосинтез",
        en: "🧬 Biology • Photosynthesis",
      },
      analogyBox: {
        title: {
          kz: "Фотосинтездің екі фазасының сиқыры",
          ru: "Две фазы природной фабрики хлоропласта",
          en: "Two phases of the chloroplast factory",
        },
        description: {
          kz: "Жарық фазасы тилакоидта (судың фотолизі), ал қараңғы фазасы стромада жүреді",
          ru: "Световая фаза протекает на тилакоидах (фотолиз воды), а темновая — в строме хлоропласта",
          en: "Light reactions happen on thylakoids; dark reactions occur in stroma",
        },
        warning: {
          kz: "⚠️ Оттек көмірқышқыл газынан емес, тікелей СУ молекуласының (H₂O) ыдырауынан бөлінеді!",
          ru: "⚠️ Кислород образуется из расщепления ВОДЫ (H₂O), а не из углекислого газа!",
          en: "⚠️ Oxygen is released from splitting WATER (H2O), not from CO2!",
        },
        leftLabel: { kz: "Жарық фазасы (Тилакоид)", ru: "Световая фаза (Тилакоиды)", en: "Light Phase (Thylakoids)" },
        leftValue: "O₂ ↑ (Оттек)",
        leftNote: { kz: "Су фотолизі + АТФ", ru: "Фотолиз воды + АТФ", en: "Water photolysis + ATP" },
        rightLabel: { kz: "Қараңғы фазасы (Строма)", ru: "Темновая фаза (Строма)", en: "Dark Phase (Stroma)" },
        rightValue: "C₆H₁₂O₆ (Глюкоза)",
        rightNote: { kz: "CO₂ бекітілуі (Кальвин)", ru: "Фиксация CO₂ (цикл Кальвина)", en: "CO2 fixation (Calvin)" },
        result: {
          kz: "6 CO₂ + 6 H₂O + жарық ⟶ C₆H₁₂O₆ + 6 O₂ ↑",
          ru: "6 CO₂ + 6 H₂O + свет ⟶ C₆H₁₂O₆ + 6 O₂ ↑",
          en: "6 CO2 + 6 H2O + light -> C6H12O6 + 6 O2",
        },
      },
      quizChallenge: {
        id: "quiz_bio_intro_1",
        question: {
          kz: "Фотосинтездің жарық фазасында судың фотолизі нәтижесінде ауаға қандай газ бөлінеді?",
          ru: "Какой побочный газ выделяется в атмосферу в световой фазе фотосинтеза при фотолизе воды?",
          en: "Which byproduct gas is released during the light phase as a result of water photolysis?",
        },
        formula: "2H₂O + hν ⟶ 4H⁺ + 4e⁻ + O₂ ↑",
        options: [
          { id: "A", text: "Оттек (O₂)", correct: true },
          { id: "B", text: "Көмірқышқыл газы (CO₂)", correct: false },
          { id: "C", text: "Азот (N₂)", correct: false },
          { id: "D", text: "Метан (CH₄)", correct: false },
        ],
        grade: { kz: "8-сынып", ru: "8 класс", en: "Grade 8" },
        subject: { kz: "Биология", ru: "Биология", en: "Biology" },
        topic: { kz: "Фотосинтез", ru: "Фотосинтез", en: "Photosynthesis" },
        xpReward: 20,
      },
    },
    {
      studentMessage: {
        kz: "Жасушадағы митохондрия мен рибосоманың айырмашылығы қандай? Неге митохондрияны электр станциясы дейді?",
        ru: "В чем разница между митохондриями и рибосомами? Почему митохондрию называют электростанцией?",
        en: "What is the difference between mitochondria and ribosomes? Why are mitochondria called powerhouses?",
      },
      tutorIntro: {
        kz: "Өте қызықты сұрақ! ⚡ Клетканы үлкен қала деп елестет: Митохондриялар — қаланы энергиямен (АТФ валютасымен) қамтамасыз ететін электр станциялары, ал Рибосомалар — қаланың барлық құрылыс материалын (ақуыздарды) жасайтын 3D-принтерлер!",
        ru: "Очень наглядный вопрос! ⚡ Представь клетку как умный мегаполис: Митохондрии — это электростанции, генерирующие главную валюту энергии (АТФ), а Рибосомы — это 3D-принтеры, собирающие строительные белки по чертежам иРНК!",
        en: "Great question! ⚡ Think of the cell as a metropolis: Mitochondria are the power plants producing energy currency (ATP), while Ribosomes are 3D printers assembling structural proteins!",
      },
      modeBadge: {
        kz: "🧬 Биология • Цитология",
        ru: "🧬 Биология • Цитология",
        en: "🧬 Biology • Cytology",
      },
      analogyBox: {
        title: {
          kz: "Жасуша органоидтарының мамандануы",
          ru: "Специализация ключевых органоидов клетки",
          en: "Specialization of cell organelles",
        },
        description: {
          kz: "Әр органоид жасуша тіршілігінде өзіне тән нақты процеске жауапты",
          ru: "Каждый органоид отвечает за строго закрепленный сектор клеточного метаболизма",
          en: "Each organelle is responsible for a dedicated metabolic sector",
        },
        warning: {
          kz: "⚠️ Рибосома мембранасыз органоид, ал митохондрия — қос мембраналы күрделі органоид!",
          ru: "⚠️ Рибосома не имеет мембраны, а митохондрия защищена двойной мембраной со складками (кристами)!",
          en: "⚠️ Ribosomes are non-membrane organelles, while mitochondria have double membranes!",
        },
        leftLabel: { kz: "Митохондрия", ru: "Митохондрия", en: "Mitochondria" },
        leftValue: "АТФ (Энергия)",
        leftNote: { kz: "Тыныс алу және кристалар", ru: "Клеточное дыхание на кристах", en: "Cell respiration on cristae" },
        rightLabel: { kz: "Рибосома", ru: "Рибосома", en: "Ribosome" },
        rightValue: "Ақуыз (Белок)",
        rightNote: { kz: "Трансляция және аминқышқылдары", ru: "Трансляция и синтез пептидов", en: "Translation of mRNA" },
        result: {
          kz: "Митохондрия = АТФ қуаты  |  Рибосома = Ақуыз биосинтезі",
          ru: "Митохондрия = Энергия АТФ  |  Рибосома = Синтез белка",
          en: "Mitochondria = ATP energy  |  Ribosome = Protein synthesis",
        },
      },
      quizChallenge: {
        id: "quiz_bio_intro_2",
        question: {
          kz: "«Жасушаның энергетикалық станциясы» деп аталатын және АТФ синтездейтін органоид:",
          ru: "Органоид клетки, синтезирующий АТФ и называемый «энергетической станцией»:",
          en: "The organelle synthesizing ATP known as the 'powerhouse of the cell':",
        },
        options: [
          { id: "A", text: "Митохондрия", correct: true },
          { id: "B", text: "Рибосома", correct: false },
          { id: "C", text: "Лизосома", correct: false },
          { id: "D", text: "Аппарат Гольджи", correct: false },
        ],
        grade: { kz: "8-сынып", ru: "8 класс", en: "Grade 8" },
        subject: { kz: "Биология", ru: "Биология", en: "Biology" },
        topic: { kz: "Цитология", ru: "Органоиды клетки", en: "Cell Organelles" },
        xpReward: 20,
      },
    },
  ],

  english: [
    {
      studentMessage: {
        kz: "Present Perfect пен Past Simple-ді қалай оңай ажыратуға болады? Неге 'I lived here since 2019' деу қате?",
        ru: "Как легко отличать Present Perfect и Past Simple? Почему нельзя сказать 'I lived here since 2019'?",
        en: "How do I easily distinguish Present Perfect from Past Simple? Why is 'I lived here since 2019' wrong?",
      },
      tutorIntro: {
        kz: "Өте тамаша сұрақ! 🇬🇧 Мұны көпір ретінде елестет: Past Simple — өткен шақтағы жабық арал ('in 2019', 'yesterday'), әрекет аяқталды және сол жақта қалды. Ал Present Perfect — өткен мен дәл ҚАЗІРГІ сәтті байланыстыратын көпір ('since 2019', 'already')!",
        ru: "Классический и очень важный вопрос! 🇬🇧 Представь разницу как мост: Past Simple — это закрытый остров в прошлом («in 2019», «yesterday»), действие закончилось и осталось там. А Present Perfect — это действующий мост из прошлого прямо в настоящее («since 2019», «already»)!",
        en: "Essential grammar question! 🇬🇧 Think of it as a bridge: Past Simple is an isolated island in the past ('yesterday', 'in 2019') — done and dusted. Present Perfect is a bridge connecting that past experience to right NOW ('since 2019', 'already')!",
      },
      modeBadge: {
        kz: "🇬🇧 Ағылшын • Шақтар",
        ru: "🇬🇧 English • Tenses",
        en: "🇬🇧 English • Tenses",
      },
      analogyBox: {
        title: {
          kz: "Past Simple vs Present Perfect айырмашылығы",
          ru: "Мост времени: Past Simple vs Present Perfect",
          en: "Time Bridge: Past Simple vs Present Perfect",
        },
        description: {
          kz: "Өткен шақтың нақты уақыты (Past Simple) немесе нәтиженің қазірге әсері (Present Perfect)",
          ru: "Завершенное прошлое (Past Simple) против связи с моментом речи (Present Perfect)",
          en: "Completed past anchor vs live connection to present",
        },
        warning: {
          kz: "⚠️ Егер сөйлемде 'since' немесе 'for' болса және іс жалғасып жатса — тек Present Perfect!",
          ru: "⚠️ С маркерами 'since' и 'for' (если действие еще длится) употребляется только Present Perfect!",
          en: "⚠️ With markers 'since' and 'for' continuing now, always use Present Perfect!",
        },
        leftLabel: { kz: "Past Simple (Арал)", ru: "Past Simple (Остров)", en: "Past Simple (Island)" },
        leftValue: "in 2019 / ago",
        leftNote: { kz: "Аяқталған уақыт: V2", ru: "Завершенное время: V2", en: "Completed past: V2" },
        rightLabel: { kz: "Present Perfect (Көпір)", ru: "Present Perfect (Мост)", en: "Present Perfect (Bridge)" },
        rightValue: "since / for",
        rightNote: { kz: "Қазірге дейін: have/has + V3", ru: "Связь с сейчас: have/has + V3", en: "Connected to now: have/has + V3" },
        result: {
          kz: "Дұрыс: I have lived here since 2019. (Әлі тұрамын)",
          ru: "Верно: I have lived here since 2019. (Живу до сих пор)",
          en: "Correct: I have lived here since 2019. (Still living here)",
        },
      },
      quizChallenge: {
        id: "quiz_eng_intro_1",
        question: {
          kz: "Сөйлемді дұрыс шақпен толықтырыңыз: \"She _____ in Almaty since 2020.\"",
          ru: "Вставьте правильную глагольную форму: \"She _____ in Almaty since 2020.\"",
          en: "Complete with the correct tense: \"She _____ in Almaty since 2020.\"",
        },
        formula: "has + V3 (lived) with 'since 2020'",
        options: [
          { id: "A", text: "has lived", correct: true },
          { id: "B", text: "lived", correct: false },
          { id: "C", text: "is living", correct: false },
          { id: "D", text: "will live", correct: false },
        ],
        grade: { kz: "9-сынып", ru: "9 класс", en: "Grade 9" },
        subject: { kz: "Ағылшын тілі", ru: "Английский язык", en: "English" },
        topic: { kz: "Present Perfect", ru: "Present Perfect vs Past Simple", en: "Present Perfect" },
        xpReward: 20,
      },
    },
  ],

  chemistry: [
    {
      studentMessage: {
        kz: "Химиялық теңдеулердегі коэффициенттерді қалай тез және қатесіз теңестіруге болады?",
        ru: "Как быстро и без ошибок расставлять коэффициенты в уравнениях химических реакций?",
        en: "How can I quickly and accurately balance coefficients in chemical reaction equations?",
      },
      tutorIntro: {
        kz: "Керемет сұрақ! 🧪 Химиялық теңдеуді екі табақты таразы деп елестет: реакцияға дейінгі атомдар саны реакциядан кейінгі атомдар санына дәлме-дәл тең болуы керек (зат массасының сақталу заңы)! Ешбір атом із-түссіз жоғалып кетпейді немесе жоқтан пайда болмайды.",
        ru: "Прекрасный вопрос! 🧪 Представь химическое уравнение как весы с двумя чашами: число атомов каждого элемента до стрелки обязано в точности равняться числу атомов после стрелки (закон сохранения массы)! Атомы никуда не исчезают, они лишь меняются партнёрами.",
        en: "Great question! 🧪 Think of a chemical equation as a two-pan scale: the number of atoms of each element on the left MUST balance the atoms on the right (conservation of mass)! Atoms never disappear, they just rearrange.",
      },
      modeBadge: {
        kz: "🧪 Химия • Теңдеулер",
        ru: "🧪 Химия • Уравнения",
        en: "🧪 Chemistry • Equations",
      },
      analogyBox: {
        title: {
          kz: "Таразы тепе-теңдігі заңы",
          ru: "Принцип химических весов (Ломоносов-Лавуазье)",
          en: "Chemical Balance Principle",
        },
        description: {
          kz: "Әр элементтің реакцияға дейінгі және кейінгі атомдар саны бірдей болуы шарт",
          ru: "Число атомов каждого химического элемента слева и справа должно быть строго одинаковым",
          en: "Atom counts of each element must match on both sides",
        },
        warning: {
          kz: "⚠️ Ешқашан индекстерді (Al₂O₃) өзгертпеңіз, тек алдындағы үлкен коэффициенттерді қойыңыз!",
          ru: "⚠️ Никогда не меняйте маленькие индексы внутри формулы (Al₂O₃) — ставьте только большие коэффициенты перед молекулами!",
          en: "⚠️ Never change formula subscripts! Only modify the large leading coefficients!",
        },
        leftLabel: { kz: "Реагенттер (Бастапқы)", ru: "Реагенты (До стрелки)", en: "Reactants (Left)" },
        leftValue: "4 Al + 3 O₂",
        leftNote: { kz: "4 Al атомы, 6 O атомы", ru: "4 атома Al, 6 атомов O", en: "4 Al atoms, 6 O atoms" },
        rightLabel: { kz: "Өнімдер (Нәтижесі)", ru: "Продукты (После стрелки)", en: "Products (Right)" },
        rightValue: "2 Al₂O₃",
        rightNote: { kz: "4 Al атомы, 6 O атомы", ru: "4 атома Al, 6 атомов O", en: "4 Al atoms, 6 O atoms" },
        result: {
          kz: "4 Al + 3 O₂ ⟶ 2 Al₂O₃ (Коэффициенттер қосындысы: 4 + 3 + 2 = 9)",
          ru: "4 Al + 3 O₂ ⟶ 2 Al₂O₃ (Сумма коэффициентов: 4 + 3 + 2 = 9)",
          en: "4 Al + 3 O2 -> 2 Al2O3 (Sum of coefficients: 4 + 3 + 2 = 9)",
        },
      },
      quizChallenge: {
        id: "quiz_chem_intro_1",
        question: {
          kz: "Al + O₂ ⟶ Al₂O₃ теңдеуін теңестіргендегі барлық коэффициенттердің қосындысы нешеге тең?",
          ru: "Чему равна сумма всех коэффициентов в уравнении реакции: Al + O₂ ⟶ Al₂O₃?",
          en: "What is the sum of all coefficients in the balanced equation: Al + O₂ ⟶ Al₂O₃?",
        },
        formula: "4Al + 3O₂ ⟶ 2Al₂O₃  ⟹  4 + 3 + 2 = ?",
        options: [
          { id: "A", text: "9 (4 Al + 3 O₂ ⟶ 2 Al₂O₃)", correct: true },
          { id: "B", text: "6", correct: false },
          { id: "C", text: "7", correct: false },
          { id: "D", text: "5", correct: false },
        ],
        grade: { kz: "8-сынып", ru: "8 класс", en: "Grade 8" },
        subject: { kz: "Химия", ru: "Химия", en: "Chemistry" },
        topic: { kz: "Химиялық теңдеулер", ru: "Коэффициенты реакций", en: "Balancing Equations" },
        xpReward: 20,
      },
    },
  ],

  cs: [
    {
      studentMessage: {
        kz: "Сандарды екілік санау жүйесінен ондық жүйеге қалай тез ауыстыруға болады?",
        ru: "Как легко переводить числа из двоичной системы в десятичную и обратно?",
        en: "How do I easily convert numbers between binary and decimal formats?",
      },
      tutorIntro: {
        kz: "Өте керемет тақырып! 💻 Компьютерде екілік сан — бұл қатар тұрған шамдар: 1 болса шам жанған, 0 болса өшкен! Оңнан солға қарай әр шамның салмағы 2-нің дәрежесі: 1, 2, 4, 8, 16, 32, 64, 128. Жанған (1) шамдардың салмағын қоса салсаң болғаны!",
        ru: "Отличная тема! 💻 В компьютере двоичное число — это ряд выключателей: 1 означает лампочка включена, 0 — выключена! Справа налево вес каждой лампочки удваивается: 1, 2, 4, 8, 16, 32... Просто сложи числа там, где стоит единица!",
        en: "Awesome topic! 💻 In computer systems, binary numbers are rows of light switches: 1 is on, 0 is off! Right to left, switch values double: 1, 2, 4, 8, 16, 32... Just add up the values where you see 1!",
      },
      modeBadge: {
        kz: "💻 CS • Екілік жүйе",
        ru: "💻 CS • Двоичная система",
        en: "💻 CS • Binary System",
      },
      analogyBox: {
        title: {
          kz: "Шамдар (2-нің дәрежелері) әдісі",
          ru: "Метод удвоения лампочек (степени двойки)",
          en: "Powers of Two Switchboard",
        },
        description: {
          kz: "Разрядтар салмағы: 8, 4, 2, 1. Бірліктер тұрған сандарды қосамыз",
          ru: "Веса позиций: 8, 4, 2, 1. Складываем только те числа, над которыми стоит 1",
          en: "Bit weights: 8, 4, 2, 1. Sum values under active 1 bits",
        },
        warning: {
          kz: "⚠️ 0-ге сәйкес келетін дәрежені қоспаймыз, тек 1-ге сәйкестерін ғана қосамыз!",
          ru: "⚠️ Позиции с нулями (0) просто пропускаем, они не добавляют значение!",
          en: "⚠️ Zero bits are skipped; only active 1 bits contribute to the sum!",
        },
        leftLabel: { kz: "Екілік сан (Биты)", ru: "Двоичный код", en: "Binary Bits" },
        leftValue: "1 1 0 1 ₂",
        leftNote: { kz: "8, 4, (0), 1", ru: "8 включено, 4 включено, 1 включено", en: "8 on, 4 on, 1 on" },
        rightLabel: { kz: "Ондық есептеу", ru: "Десятичный расчет", en: "Decimal Sum" },
        rightValue: "8 + 4 + 1 = 13",
        rightNote: { kz: "2³·1 + 2²·1 + 2¹·0 + 2⁰·1", ru: "Сумма активных степеней", en: "Sum of active weights" },
        result: {
          kz: "1101₂ = 13 ондық жүйеде!",
          ru: "1101₂ = 13 в десятичной системе!",
          en: "1101₂ = 13 in decimal system!",
        },
      },
      quizChallenge: {
        id: "quiz_cs_intro_1",
        question: {
          kz: "Екілік 1101₂ саны ондық санау жүйесінде нешеге тең болады?",
          ru: "Чему равно двоичное число 1101₂ в десятичной системе счисления?",
          en: "What is the decimal equivalent of the binary number 1101₂?",
        },
        formula: "1·2³ + 1·2² + 0·2¹ + 1·2⁰ = 8 + 4 + 0 + 1 = ?",
        options: [
          { id: "A", text: "13", correct: true },
          { id: "B", text: "11", correct: false },
          { id: "C", text: "15", correct: false },
          { id: "D", text: "9", correct: false },
        ],
        grade: { kz: "9-сынып", ru: "9 класс", en: "Grade 9" },
        subject: { kz: "Информатика", ru: "Информатика", en: "Computer Science" },
        topic: { kz: "Санау жүйелері", ru: "Двоичная система", en: "Binary System" },
        xpReward: 20,
      },
    },
  ],

  physics: [
    {
      studentMessage: {
        kz: "Ньютонның екінші заңын (F = ma) өмірлік мысалмен түсіндіріп берші: неге ауыр затты тездету қиын?",
        ru: "Объясни второй закон Ньютона (F = ma) на жизненном примере: почему тяжелое тело сложнее разогнать?",
        en: "Explain Newton's second law (F = ma) with a real example: why is it harder to accelerate a heavy body?",
      },
      tutorIntro: {
        kz: "Керемет сұрақ! ⚡ Сауда орталығындағы арбаны елестет: бос арбаны (кішкентай масса m) бір итеріп-ақ тездетесің (үлкен үдеу a). Ал егер арба толы ауыр жүк болса (үлкен масса m), оны дәл сондай жылдамдықпен тездету үшін әлдеқайда көп күш (F) керек!",
        ru: "Отличный физический вопрос! ⚡ Представь тележку в супермаркете: пустую тележку (маленькая масса m) легко разогнать одним толчком (большое ускорение a). Но если тележка набита тяжелыми покупками (большая масса m), для такого же разгона потребуется огромная сила (F)!",
        en: "Great physics question! ⚡ Picture a supermarket cart: an empty cart (small mass m) accelerates instantly with a light push (high acceleration a). But fill it with heavy groceries (large mass m), and you need huge force (F) to achieve the same acceleration!",
      },
      modeBadge: {
        kz: "⚡ Физика • Динамика",
        ru: "⚡ Физика • Динамика",
        en: "⚡ Physics • Dynamics",
      },
      analogyBox: {
        title: {
          kz: "Арба және күш (F = ma) заңы",
          ru: "Аналогия тележки и ускорения (F = ma)",
          en: "Cart and Force Analogy (F = ma)",
        },
        description: {
          kz: "Үдеу әсер етуші күшке тура пропорционал, ал массаға кері пропорционал",
          ru: "Ускорение прямо пропорционально силе и обратно пропорционально массе тела",
          en: "Acceleration is directly proportional to net force and inversely to mass",
        },
        warning: {
          kz: "⚠️ Масса неғұрлым үлкен болса — үдеу соғұрлым азаяды (кері қатынас a = F / m)!",
          ru: "⚠️ Чем больше масса тела при той же силе, тем меньше ускорение (a = F / m)!",
          en: "⚠️ Greater mass results in smaller acceleration under the same force!",
        },
        leftLabel: { kz: "Формула", ru: "Формула Ньютона", en: "Newton's Formula" },
        leftValue: "F = m · a",
        leftNote: { kz: "Күш = Масса × Үдеу", ru: "Ньютоны = кг × м/с²", en: "Newtons = kg × m/s²" },
        rightLabel: { kz: "Үдеуді табу", ru: "Выражение ускорения", en: "Acceleration" },
        rightValue: "a = F / m",
        rightNote: { kz: "Күшті массаға бөлеміз", ru: "Силу делим на массу", en: "Force divided by mass" },
        result: {
          kz: "F = 20 Н, m = 4 кг  ⟹  a = 20 / 4 = 5 м/с²",
          ru: "F = 20 Н, m = 4 кг  ⟹  a = 20 / 4 = 5 м/с²",
          en: "F = 20 N, m = 4 kg  ->  a = 20 / 4 = 5 m/s²",
        },
      },
      quizChallenge: {
        id: "quiz_phys_intro_1",
        question: {
          kz: "Массасы 4 кг денеге 20 Н тұрақты күш әсер етсе, дененің үдеуі (a) қандай болады?",
          ru: "На тело массой 4 кг действует постоянная сила 20 Н. Чему равно ускорение тела?",
          en: "A constant force of 20 N acts on a 4 kg mass. What is the acceleration?",
        },
        formula: "a = F / m = 20 Н / 4 кг = ?",
        options: [
          { id: "A", text: "5 м/с²", correct: true },
          { id: "B", text: "80 м/с²", correct: false },
          { id: "C", text: "16 м/с²", correct: false },
          { id: "D", text: "2.5 м/с²", correct: false },
        ],
        grade: { kz: "9-сынып", ru: "9 класс", en: "Grade 9" },
        subject: { kz: "Физика", ru: "Физика", en: "Physics" },
        topic: { kz: "Ньютон заңдары", ru: "Законы Ньютона", en: "Newton's Laws" },
        xpReward: 20,
      },
    },
  ],

  geometry: [
    {
      studentMessage: {
        kz: "Пифагор теоремасын (a² + b² = c²) қалай оңай есте сақтап, есепте шатаспай қолдануға болады?",
        ru: "Как наглядно понять и применять теорему Пифагора (a² + b² = c²)?",
        en: "How can I visually understand and apply the Pythagorean theorem (a² + b² = c²)?",
      },
      tutorIntro: {
        kz: "Өте керемет геометриялық сұрақ! 📐 Мұны шаршы плиткалар ретінде елестет: катеттердің үстіне салынған екі кіші шаршының ауданын қоссаң, ол дәл гипотенузаның үстіндегі үлкен шаршының ауданына тең болады! Ең танымал мысал — Мысыр үшбұрышы: катеттері 3 және 4, ал гипотенузасы 5 (9 + 16 = 25)!",
        ru: "Отличный вопрос! 📐 Представь плитки на полу: если построить квадраты на катетах, то их площади в сумме в точности покроют квадрат, построенный на самой длинной стороне — гипотенузе! Самый знаменитый пример — Египетский треугольник со сторонами 3, 4 и 5: 3² + 4² = 9 + 16 = 25 = 5²!",
        en: "Classic geometry! 📐 Picture floor tiles: square tiles built on the two shorter legs add up exactly to the square built on the longest hypotenuse side! The legendary Egyptian triangle has sides 3, 4, 5: 3² + 4² = 9 + 16 = 25 = 5²!",
      },
      modeBadge: {
        kz: "📐 Геометрия • Пифагор",
        ru: "📐 Геометрия • Пифагор",
        en: "📐 Geometry • Pythagoras",
      },
      analogyBox: {
        title: {
          kz: "Шаршылар ауданының сиқыры (Пифагор)",
          ru: "Магия площадей квадратов Пифагора",
          en: "Pythagorean Tile Area Magic",
        },
        description: {
          kz: "Тікбұрышты үшбұрышта: екі кіші шаршы ауданы = гипотенуза шаршысының ауданы",
          ru: "В прямоугольном треугольнике сумма площадей квадратов на катетах равна квадрату гипотенузы",
          en: "In a right triangle, the sum of leg square areas equals the hypotenuse square",
        },
        warning: {
          kz: "⚠️ Теорема ТЕК қана 90° тік бұрышы бар үшбұрыштарға қолданылады!",
          ru: "⚠️ Теорема работает ИСКЛЮЧИТЕЛЬНО для прямоугольных треугольников (угол 90°)!",
          en: "⚠️ The theorem ONLY applies to right-angled triangles (90° angle)!",
        },
        leftLabel: { kz: "Катеттер шаршылары", ru: "Квадраты катетов", en: "Leg Squares" },
        leftValue: "3² + 4² = 25",
        leftNote: { kz: "9 + 16 = 25", ru: "Площади двух малых квадратов", en: "Sum of leg square areas" },
        rightLabel: { kz: "Гипотенуза шаршысы", ru: "Квадрат гипотенузы", en: "Hypotenuse Square" },
        rightValue: "c² = 25",
        rightNote: { kz: "c = √25 = 5", ru: "Длина самой большой стороны", en: "Longest side length" },
        result: {
          kz: "a² + b² = c²  |  Мысыр үшбұрышы: 3 - 4 - 5",
          ru: "a² + b² = c²  |  Египетский треугольник: 3 - 4 - 5",
          en: "a² + b² = c²  |  Egyptian triangle: 3 - 4 - 5",
        },
      },
      quizChallenge: {
        id: "quiz_geom_intro_1",
        question: {
          kz: "Катеттері 6 см және 8 см болатын тікбұрышты үшбұрыштың гипотенузасын табыңыз:",
          ru: "Найдите гипотенузу прямоугольного треугольника с катетами 6 см и 8 см:",
          en: "Find the hypotenuse of a right triangle with legs of 6 cm and 8 cm:",
        },
        formula: "c = √(6² + 8²) = √(36 + 64) = √100 = ?",
        options: [
          { id: "A", text: "10 см", correct: true },
          { id: "B", text: "14 см", correct: false },
          { id: "C", text: "12 см", correct: false },
          { id: "D", text: "48 см", correct: false },
        ],
        grade: { kz: "8-сынып", ru: "8 класс", en: "Grade 8" },
        subject: { kz: "Геометрия", ru: "Геометрия", en: "Geometry" },
        topic: { kz: "Пифагор теоремасы", ru: "Теорема Пифагора", en: "Pythagorean Theorem" },
        xpReward: 20,
      },
    },
  ],

  algebra: [
    {
      studentMessage: {
        kz: "Түсіндірші, неге бөлшектерді қосқанда жай ғана жоғарғысы мен төменгісін қоса салуға болмайды?",
        ru: "Объясни мне, почему при сложении дробей нельзя просто сложить верх и низ?",
        en: "Explain to me why we cannot simply add the top and bottom when adding fractions?",
      },
      tutorIntro: {
        kz: "Өте жақсы сұрақ! 🍕 Мұны пицца арқылы елестет: жарты пицца (1/2) мен үшінші бөлік пиццаны (1/3) жай қоса салсаң, олар әртүрлі көлемде болғандықтан қате болады. Алдымен оларды бірдей 6 кішкентай тілімге бөліп (ортақ бөлім), сосын ғана қосамыз!",
        ru: "Отличный и естественный вопрос! 🍕 Представь пиццу: половина пиццы (1/2) и треть пиццы (1/3) — разного размера. Их нельзя просто сложить как (1+1)/(2+3)=2/5! Сначала их нарезают на одинаковые шестые дольки (приводят к общему знаменателю), и получается 3/6 + 2/6 = 5/6!",
        en: "Great question! 🍕 Picture pizza slices: half a pizza (1/2) and a third of a pizza (1/3) have different sizes. You cannot just add them as 2/5! First cut both into equal sixths (common denominator), giving 3/6 + 2/6 = 5/6!",
      },
      modeBadge: {
        kz: "📐 Алгебра • Бөлшектер",
        ru: "📐 Алгебра • Дроби",
        en: "📐 Algebra • Fractions",
      },
      analogyBox: {
        title: {
          kz: "Ортақ бөлімнің сиқыры",
          ru: "Магия общего знаменателя",
          en: "Common Denominator Magic",
        },
        description: {
          kz: "Әртүрлі көлемдегі тілімдерді қосу үшін оларды бірдей өлшемге келтіреміз",
          ru: "Кусочки разного размера приводятся к единым равным долькам",
          en: "Different slice sizes are standardized to equal parts",
        },
        warning: {
          kz: "⚠️ Неге жай қосуға болмайды: (1+1)/(2+3) = 2/5 шығады, бұл нақты шаманы кемітіп тастайды!",
          ru: "⚠️ Ловушка: если сложить (1+1)/(2+3) = 2/5, куски разного размера перемешаются и значение исказится!",
          en: "⚠️ Trap: (1+1)/(2+3) yields 2/5, losing true proportion!",
        },
        leftLabel: { kz: "1/2 тілімі", ru: "Доля 1/2", en: "1/2 Slice" },
        leftValue: "3/6",
        leftNote: { kz: "3 кішкентай тілім", ru: "3 маленьких кусочка", en: "3 small slices" },
        rightLabel: { kz: "1/3 тілімі", ru: "Доля 1/3", en: "1/3 Slice" },
        rightValue: "2/6",
        rightNote: { kz: "2 кішкентай тілім", ru: "2 маленьких кусочка", en: "2 small slices" },
        result: {
          kz: "3/6 + 2/6 = 5/6 пицца!",
          ru: "3/6 + 2/6 = 5/6 пиццы! 🎉",
          en: "3/6 + 2/6 = 5/6 pizza! 🎉",
        },
      },
      quizChallenge: {
        id: "quiz_alg_intro_1",
        question: {
          kz: "Бөлшектерді қосыңыз: 1/4 + 2/4 = ?",
          ru: "Сложите дроби с одинаковым знаменателем: 1/4 + 2/4 = ?",
          en: "Add the fractions: 1/4 + 2/4 = ?",
        },
        formula: "1/4 + 2/4 = (1 + 2) / 4 = ?",
        options: [
          { id: "A", text: "3/4", correct: true },
          { id: "B", text: "3/8", correct: false },
          { id: "C", text: "1/2", correct: false },
          { id: "D", text: "2/8", correct: false },
        ],
        grade: { kz: "7-сынып", ru: "7 класс", en: "Grade 7" },
        subject: { kz: "Алгебра", ru: "Алгебра", en: "Algebra" },
        topic: { kz: "Жай бөлшектер", ru: "Сложение дробей", en: "Fractions Addition" },
        xpReward: 15,
      },
    },
  ],
};

// Function to get initial messages tailored to the given subject
export function getInitialChatMessages(
  selectedSubject: string = "algebra",
  lang: Language = "ru"
): ChatMessage[] {
  const norm = (selectedSubject || "").toLowerCase().trim();
  let key = "algebra";
  if (norm.includes("bio") || norm.includes("биолог")) key = "biology";
  else if (norm.includes("eng") || norm.includes("англ") || norm.includes("ағылш")) key = "english";
  else if (norm.includes("chem") || norm.includes("хим")) key = "chemistry";
  else if (norm.includes("cs") || norm.includes("информ") || norm.includes("компьют")) key = "cs";
  else if (norm.includes("phys") || norm.includes("физик")) key = "physics";
  else if (norm.includes("geom") || norm.includes("геомет")) key = "geometry";

  const list = subjectScenarios[key] || subjectScenarios.algebra;
  // Pick random scenario from pool so subsequent visits have variety
  const item = list[Math.floor(Math.random() * list.length)];

  const timeStr = "14:24";
  const tutorTimeStr = "14:25";

  const userMsg: ChatMessage = {
    id: `init_user_${Date.now()}`,
    sender: "user",
    text: item.studentMessage[lang] || item.studentMessage.ru,
    time: timeStr,
  };

  const tutorMsg: ChatMessage = {
    id: `init_tutor_${Date.now()}`,
    sender: "tutor",
    text: item.tutorIntro[lang] || item.tutorIntro.ru,
    time: tutorTimeStr,
    modeBadge: item.modeBadge[lang] || item.modeBadge.ru,
    analogyBox: {
      title: item.analogyBox.title[lang] || item.analogyBox.title.ru,
      description: item.analogyBox.description[lang] || item.analogyBox.description.ru,
      warning: item.analogyBox.warning?.[lang] || item.analogyBox.warning?.ru,
      leftLabel: item.analogyBox.leftLabel[lang] || item.analogyBox.leftLabel.ru,
      leftValue: item.analogyBox.leftValue,
      leftNote: item.analogyBox.leftNote[lang] || item.analogyBox.leftNote.ru,
      rightLabel: item.analogyBox.rightLabel[lang] || item.analogyBox.rightLabel.ru,
      rightValue: item.analogyBox.rightValue,
      rightNote: item.analogyBox.rightNote[lang] || item.analogyBox.rightNote.ru,
      result: item.analogyBox.result[lang] || item.analogyBox.result.ru,
    },
    quizChallenge: {
      id: item.quizChallenge.id,
      question: item.quizChallenge.question[lang] || item.quizChallenge.question.ru,
      formula: item.quizChallenge.formula,
      options: item.quizChallenge.options,
      grade: item.quizChallenge.grade[lang] || item.quizChallenge.grade.ru,
      subject: item.quizChallenge.subject[lang] || item.quizChallenge.subject.ru,
      topic: item.quizChallenge.topic[lang] || item.quizChallenge.topic.ru,
      xpReward: item.quizChallenge.xpReward,
    },
  };

  return [userMsg, tutorMsg];
}
