import React, { useState } from "react";
import { Language, NavTab } from "../types";
import { translations } from "../i18n/translations";

interface HomeScreenProps {
  language: Language;
  onNavigate: (
    tab: NavTab,
    context?: { subject?: string; topic?: string; prompt?: string; grade?: number; autoOpenGuide?: boolean }
  ) => void;
  coins: number;
  xp: number;
  streak: number;
  level: number;
}

interface SubjectItem {
  id: string;
  name: { kz: string; ru: string; en: string };
  icon: string;
  minGrade: number;
  score: number;
  color: string;
  bgLight: string;
}

interface SubjectCaseDetail {
  badge: Record<Language, string>;
  badgeColor: string;
  riskText: Record<Language, string>;
  title: Record<Language, string>;
  desc: Record<Language, string>;
  formulaBox: {
    label: Record<Language, string>;
    code: string;
  };
  sampleTask: {
    question: Record<Language, string>;
    correctAnswer: Record<Language, string>;
  };
  primaryBtnText: Record<Language, string>;
  tutorBtnText: Record<Language, string>;
  tutorPrompt: string;
  practiceSubject: string;
  practiceTopic: string;
}

interface RouteStep {
  subjectId: string;
  topic?: string;
  title: Record<Language, string>;
  desc: Record<Language, string>;
  icon: string;
  color: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onNavigate,
  coins,
  xp,
  streak,
  level,
}) => {
  const t = translations[language];
  const [selectedGrade, setSelectedGrade] = useState<number>(9);
  // Default to biology so the user's request is directly highlighted and visible immediately
  const [activeSubject, setActiveSubject] = useState<string>("biology");

  // Complete subject catalogue with minimum grade unlock thresholds
  const allSubjects: SubjectItem[] = [
    {
      id: "biology",
      name: { kz: "Биология", ru: "Биология", en: "Biology" },
      icon: "psychology",
      minGrade: 7,
      score: 65,
      color: "#0d9488",
      bgLight: "#f0fdfa",
    },
    {
      id: "english",
      name: { kz: "Ағылшын тілі", ru: "Английский язык", en: "English Language" },
      icon: "translate",
      minGrade: 5,
      score: 82,
      color: "#059669",
      bgLight: "#ecfdf5",
    },
    {
      id: "algebra",
      name: { kz: "Алгебра / Математика", ru: "Алгебра / Математика", en: "Algebra / Math" },
      icon: "calculate",
      minGrade: 5,
      score: 74,
      color: "#004ac6",
      bgLight: "#eaedff",
    },
    {
      id: "geometry",
      name: { kz: "Геометрия", ru: "Геометрия", en: "Geometry" },
      icon: "square_foot",
      minGrade: 7,
      score: 48,
      color: "#d97706",
      bgLight: "#fffbeb",
    },
    {
      id: "physics",
      name: { kz: "Физика", ru: "Физика", en: "Physics" },
      icon: "bolt",
      minGrade: 8,
      score: 62,
      color: "#7c3aed",
      bgLight: "#f5f3ff",
    },
    {
      id: "chemistry",
      name: { kz: "Химия", ru: "Химия", en: "Chemistry" },
      icon: "science",
      minGrade: 8,
      score: 58,
      color: "#db2777",
      bgLight: "#fdf2f8",
    },
    {
      id: "cs",
      name: { kz: "Информатика", ru: "Информатика", en: "Computer Science" },
      icon: "terminal",
      minGrade: 9,
      score: 85,
      color: "#2563eb",
      bgLight: "#eff6ff",
    },
  ];

  const unlockedCount = allSubjects.filter((s) => selectedGrade >= s.minGrade).length;

  // Subject-specific featured assignments and critical gap profiles
  const subjectCases: Record<string, SubjectCaseDetail> = {
    biology: {
      badge: {
        kz: "БИОЛОГИЯ: БАСЫМ ОҚЫТУ",
        ru: "БИОЛОГИЯ: ВЫСОКИЙ ПРИОРИТЕТ",
        en: "BIOLOGY: HIGH PRIORITY",
      },
      badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
      riskText: {
        kz: "БЖБ/ТЖБ: 84% қауіп",
        ru: "СОР/СОЧ: Риск 84%",
        en: "Exam Risk: 84%",
      },
      title: {
        kz: "Фотосинтез: Жарық және қараңғы сатылары, хлоропласттар",
        ru: "Фотосинтез: Световая и темновая фазы, хлоропласты",
        en: "Photosynthesis: Light & Dark Reactions, Chloroplasts",
      },
      desc: {
        kz: "Критикалық олқылық: Оқушылар жарық фазасында тилакоидтарда су фотолизі жүріп, атмосфераға оттек (O₂) бөлінетінін, ал қараңғы сатысында стромада CO₂ сіңіріліп глюкоза түзілетінін жиі шатастырады.",
        ru: "Критический пробел: Путаница между световой фазой (тилакоиды: фотолиз воды 2H₂O, синтез АТФ и выделение свободного O₂) и темновой фазой (строма: фиксация CO₂, цикл Кальвина и синтез глюкозы C₆H₁₂O₆).",
        en: "Critical Gap: Confusion between light reactions in thylakoids (water photolysis, ATP production, O₂ release) and dark Calvin cycle in stroma (CO₂ fixation into glucose).",
      },
      formulaBox: {
        label: {
          kz: "Судың фотолизі мен қорытынды реакция:",
          ru: "Фотолиз воды и суммарное уравнение:",
          en: "Water photolysis & reaction:",
        },
        code: "2H₂O + hν (жарық) ⟶ 4H⁺ + 4e⁻ + O₂ ↑  |  6CO₂ + 6H₂O ⟶ C₆H₁₂O₆ + 6O₂",
      },
      sampleTask: {
        question: {
          kz: "«Судың фотолизі кезінде атмосфераға бөлінетін жанама газ қайсы?»",
          ru: "«Какой побочный газ выделяется в атмосферу при фотолизе воды на мембранах тилакоидов?»",
          en: "«Which byproduct gas is released during water photolysis on thylakoid membranes?»",
        },
        correctAnswer: {
          kz: "Дұрыс жауап: Молекулалық оттек (O₂)",
          ru: "Верный ответ: Молекулярный кислород (O₂)",
          en: "Correct answer: Molecular oxygen (O₂)",
        },
      },
      primaryBtnText: {
        kz: "Биология тапсырмаларына өту және қалай шығаруды көру ➔",
        ru: "К заданиям по биологии и как выполнить ➔",
        en: "Go to Biology Tasks & View Guide ➔",
      },
      tutorBtnText: {
        kz: "ИИ-талдау: Фотосинтез",
        ru: "Объяснить с ИИ: Фотосинтез",
        en: "Explain with AI: Photosynthesis",
      },
      tutorPrompt: "Объясни мне световую и темновую фазу фотосинтеза простыми словами, чем они отличаются и почему выделяется кислород.",
      practiceSubject: "biology",
      practiceTopic: "photosynthesis",
    },

    english: {
      badge: {
        kz: "АҒЫЛШЫН ТІЛІ: БАСЫМ ДАҒДЫ",
        ru: "АНГЛИЙСКИЙ ЯЗЫК: ВЫСОКИЙ ПРИОРИТЕТ",
        en: "ENGLISH: PRIORITY SKILL",
      },
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      riskText: {
        kz: "БЖБ/ТЖБ: 82% қауіп",
        ru: "СОР/СОЧ: Риск 82%",
        en: "Exam Risk: 82%",
      },
      title: {
        kz: "Present Perfect vs Past Simple & Уақыт маркерлері",
        ru: "Present Perfect vs Past Simple & Маркеры времени",
        en: "Present Perfect vs Past Simple & Time Markers",
      },
      desc: {
        kz: "Критикалық олқылық: \"since 2019\" немесе \"for 5 years\" маркерлері бар сөйлемдерде Past Simple қою қатесі. Созылған әрекетке have/has + V3 қажет!",
        ru: "Критический пробел: Ошибочный выбор Past Simple ('lived') вместо Present Perfect ('has lived') при маркерах длительности 'since 2019' и 'for 5 years'. Задания и правила на английском!",
        en: "Critical Gap: Mistakenly choosing Past Simple ('lived') instead of Present Perfect ('has lived') when sentences include continuing duration markers ('since 2019', 'for 5 years').",
      },
      formulaBox: {
        label: {
          kz: "Present Perfect құрылымы:",
          ru: "Формула Present Perfect:",
          en: "Present Perfect Structure:",
        },
        code: "Subject + have / has + V3 (Past Participle) + since 2019 / for 5 years",
      },
      sampleTask: {
        question: {
          kz: "«She _____ here since 2019. (lived / has lived / is living)»",
          ru: "«She _____ here since 2019. (lived / has lived / is living)»",
          en: "«She _____ here since 2019. (lived / has lived / is living)»",
        },
        correctAnswer: {
          kz: "Дұрыс жауап: has lived (себебі She + маркер since)",
          ru: "Верный ответ: has lived (так как She + маркер since)",
          en: "Correct answer: has lived (because She + 'since' marker)",
        },
      },
      primaryBtnText: {
        kz: "Ағылшын тапсырмаларына өту және қалай шығаруды көру ➔",
        ru: "К заданиям по английскому и как выполнить ➔",
        en: "Solve English Tasks & View Guide ➔",
      },
      tutorBtnText: {
        kz: "ИИ-талдау: English Tenses",
        ru: "Объяснить с ИИ: English Tenses",
        en: "Explain with AI: English Tenses",
      },
      tutorPrompt: "Explain Present Perfect vs Past Simple in English with clear examples and rules for since and for.",
      practiceSubject: "english",
      practiceTopic: "tenses",
    },

    cs: {
      badge: {
        kz: "ИНФОРМАТИКА: БАСЫМ БАҒЫТ",
        ru: "ИНФОРМАТИКА: ВЫСОКИЙ ПРИОРИТЕТ",
        en: "COMPUTER SCIENCE: HIGH PRIORITY",
      },
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      riskText: {
        kz: "БЖБ/ТЖБ: 78% қауіп",
        ru: "СОР/СОЧ: Риск 78%",
        en: "Exam Risk: 78%",
      },
      title: {
        kz: "Санау жүйелері және Python циклдері (for/while)",
        ru: "Двоичная система счисления и циклы в Python",
        en: "Binary Number Systems & Python Loops (for/while)",
      },
      desc: {
        kz: "Критикалық олқылық: Екілік жүйедегі сандарды ондық жүйеге аудару кезінде 2⁰=1 разрядын ұмыту (1101₂ = 8 + 4 + 0 + 1 = 13) және Python-да range(n) шектерін шатастыру.",
        ru: "Критический пробел: Ошибки при переводе двоичного числа в десятичное (забывают, что 2⁰ = 1: 1101₂ = 13) и определение числа итераций в циклах for i in range(1, n).",
        en: "Critical Gap: Mistakes when converting binary numbers to decimal (forgetting that 2⁰ = 1, e.g., 1101₂ = 13) and off-by-one errors in Python range(1, n).",
      },
      formulaBox: {
        label: {
          kz: "Екіліктен ондыққа аудару:",
          ru: "Перевод двоичного числа в десятичное:",
          en: "Binary to Decimal Conversion:",
        },
        code: "1101₂ = 1·2³ + 1·2² + 0·2¹ + 1·2⁰ = 8 + 4 + 0 + 1 = 13₁₀",
      },
      sampleTask: {
        question: {
          kz: "«1101₂ санын ондық санау жүйесіне көшіріңіз»",
          ru: "«Переведите двоичное число 1101₂ в десятичную систему счисления»",
          en: "«Convert the binary number 1101₂ into decimal system»",
        },
        correctAnswer: {
          kz: "Дұрыс жауап: 13",
          ru: "Верный ответ: 13",
          en: "Correct answer: 13",
        },
      },
      primaryBtnText: {
        kz: "Информатика тапсырмаларына өту және қалай шығаруды көру ➔",
        ru: "К заданиям по информатике и как выполнить ➔",
        en: "Go to CS Tasks & View Guide ➔",
      },
      tutorBtnText: {
        kz: "ИИ-талдау: Двоичные числа",
        ru: "Объяснить с ИИ: Двоичные числа",
        en: "Explain with AI: Binary Systems",
      },
      tutorPrompt: "Объясни мне, как легко переводить числа из двоичной системы в десятичную и как работают циклы for в Python.",
      practiceSubject: "cs",
      practiceTopic: "binary",
    },

    chemistry: {
      badge: {
        kz: "ХИМИЯ: БАСЫМ БАҒЫТ",
        ru: "ХИМИЯ: ВЫСОКИЙ ПРИОРИТЕТ",
        en: "CHEMISTRY: HIGH PRIORITY",
      },
      badgeColor: "bg-pink-100 text-pink-800 border-pink-200",
      riskText: {
        kz: "БЖБ/ТЖБ: 80% қауіп",
        ru: "СОР/СОЧ: Риск 80%",
        en: "Exam Risk: 80%",
      },
      title: {
        kz: "Химиялық теңдеулерді теңестіру және жану реакциялары",
        ru: "Расстановка коэффициентов и реакции горения",
        en: "Chemical Equations & Combustion Reaction Balancing",
      },
      desc: {
        kz: "Критикалық олқылық: Органикалық заттардың жану реакциясында оң жақтағы барлық оттек атомдарын (CO₂ және H₂O) қосып есептеуді ұмытып, қате коэффициент қою.",
        ru: "Критический пробел: При уравнивании реакций горения забывают учесть кислород в воде H₂O и делят неполное число атомов на индекс 2 молекулы O₂.",
        en: "Critical Gap: Overlooking oxygen in water (H₂O) when balancing combustion equations, resulting in wrong coefficients before O₂.",
      },
      formulaBox: {
        label: {
          kz: "Метанның жану теңдеуі:",
          ru: "Уравнение горения метана:",
          en: "Methane Combustion Equation:",
        },
        code: "CH₄ + 2 O₂ ⟶ CO₂ + 2 H₂O  (Оң жақта 4 оттек, сол жақта 2·2 = 4)",
      },
      sampleTask: {
        question: {
          kz: "«CH₄ + ? O₂ ⟶ CO₂ + 2 H₂O теңдеуіндегі оттек коэффициентін табыңыз»",
          ru: "«Найдите коэффициент перед O₂ в уравнении CH₄ + ? O₂ ⟶ CO₂ + 2 H₂O»",
          en: "«Find coefficient before O₂ in CH₄ + ? O₂ ⟶ CO₂ + 2 H₂O»",
        },
        correctAnswer: {
          kz: "Дұрыс жауап: 2",
          ru: "Верный ответ: 2",
          en: "Correct answer: 2",
        },
      },
      primaryBtnText: {
        kz: "Химия тапсырмаларына өту және қалай шығаруды көру ➔",
        ru: "К заданиям по химии и как выполнить ➔",
        en: "Go to Chemistry Tasks & View Guide ➔",
      },
      tutorBtnText: {
        kz: "ИИ-талдау: Химиялық реакциялар",
        ru: "Объяснить с ИИ: Реакции горения",
        en: "Explain with AI: Chemical Reactions",
      },
      tutorPrompt: "Объясни мне пошагово, как быстро расставлять коэффициенты в химических реакциях и уравнениях горения.",
      practiceSubject: "chemistry",
      practiceTopic: "balancing",
    },

    physics: {
      badge: {
        kz: "ФИЗИКА: БАСЫМ БАҒЫТ",
        ru: "ФИЗИКА: ВЫСОКИЙ ПРИОРИТЕТ",
        en: "PHYSICS: HIGH PRIORITY",
      },
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      riskText: {
        kz: "БЖБ/ТЖБ: 76% қауіп",
        ru: "СОР/СОЧ: Риск 76%",
        en: "Exam Risk: 76%",
      },
      title: {
        kz: "Ньютонның екінші заңы (F = ma) және кинематика",
        ru: "Второй закон Ньютона (F = ma) и кинематика",
        en: "Newton's Second Law (F = ma) & Kinematics",
      },
      desc: {
        kz: "Критикалық олқылық: Күштердің теңәрекеттісін (F = m·a) табуда үйкеліс күшін және орташа жылдамдық формуласындағы өлшем бірліктерін (км/сағ ↔ м/с) шатастыру.",
        ru: "Критический пробел: Трудности с проекциями сил ускорения F = ma и переводом единиц измерения скорости (км/ч в м/с делением на 3.6).",
        en: "Critical Gap: Difficulties with net force projections F = ma and unit conversions between km/h and m/s.",
      },
      formulaBox: {
        label: {
          kz: "Қозғалыс пен күш формулалары:",
          ru: "Формулы движения и динамики:",
          en: "Kinematics & Dynamics Formulas:",
        },
        code: "F = m · a  |  v = S / t  (180 км / 2.5 сағ = 72 км/сағ = 20 м/с)",
      },
      sampleTask: {
        question: {
          kz: "«Автомобиль 2.5 сағатта 180 км жол жүрді. Орташа жылдамдығы қандай?»",
          ru: "«Автомобиль проехал 180 км за 2.5 часа. Какова его средняя скорость?»",
          en: "«A car traveled 180 km in 2.5 hours. What is its average speed?»",
        },
        correctAnswer: {
          kz: "Дұрыс жауап: 72 км/сағ",
          ru: "Верный ответ: 72 км/ч",
          en: "Correct answer: 72 km/h",
        },
      },
      primaryBtnText: {
        kz: "Физика тапсырмаларына өту және қалай шығаруды көру ➔",
        ru: "К заданиям по физике и как выполнить ➔",
        en: "Go to Physics Tasks & View Guide ➔",
      },
      tutorBtnText: {
        kz: "ИИ-талдау: Ньютон заңдары",
        ru: "Объяснить с ИИ: Законы Ньютона",
        en: "Explain with AI: Newton's Laws",
      },
      tutorPrompt: "Объясни мне второй закон Ньютона и как правильно решать задачи на среднюю скорость.",
      practiceSubject: "physics",
      practiceTopic: "speed",
    },

    geometry: {
      badge: {
        kz: "ГЕОМЕТРИЯ: БАСЫМ БАҒЫТ",
        ru: "ГЕОМЕТРИЯ: ВЫСОКИЙ ПРИОРИТЕТ",
        en: "GEOMETRY: HIGH PRIORITY",
      },
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      riskText: {
        kz: "БЖБ/ТЖБ: 75% қауіп",
        ru: "СОР/СОЧ: Риск 75%",
        en: "Exam Risk: 75%",
      },
      title: {
        kz: "Пифагор теоремасы және үшбұрыш бұрыштарының қосындысы",
        ru: "Теорема Пифагора и сумма углов треугольника",
        en: "Pythagorean Theorem & Triangle Angle Sum",
      },
      desc: {
        kz: "Критикалық олқылық: Тікбұрышты үшбұрышта гипотенуза квадраты катеттердің квадраттарының қосындысына тең (c² = a² + b²), ал катетті тапқанда азайту керек екенін ұмыту.",
        ru: "Критический пробел: При вычислении катета b² = c² - a² ошибочно складывают квадраты вместо вычитания, а также путают теорему о сумме углов (180°).",
        en: "Critical Gap: Adding squares instead of subtracting when solving for a leg b² = c² - a², and miscalculating interior triangle angles sum (180°).",
      },
      formulaBox: {
        label: {
          kz: "Пифагор теоремасы мен бұрыштар:",
          ru: "Теорема Пифагора и углы:",
          en: "Pythagorean Theorem & Angles:",
        },
        code: "c² = a² + b²  ⇒  b = √(c² — a²)  |  ∠A + ∠B + ∠C = 180°",
      },
      sampleTask: {
        question: {
          kz: "«Тікбұрышты үшбұрыштың гипотенузасы 10 см, бір катеті 6 см. Екінші катетті табыңыз»",
          ru: "«В прямоугольном треугольнике гипотенуза равна 10 см, один катет 6 см. Найдите второй катет»",
          en: "«In a right triangle, hypotenuse is 10 cm, one leg is 6 cm. Find the other leg»",
        },
        correctAnswer: {
          kz: "Дұрыс жауап: 8 см (b² = 100 - 36 = 64)",
          ru: "Верный ответ: 8 см (b² = 100 - 36 = 64)",
          en: "Correct answer: 8 cm (b² = 100 - 36 = 64)",
        },
      },
      primaryBtnText: {
        kz: "Геометрия тапсырмаларына өту және қалай шығаруды көру ➔",
        ru: "К заданиям по геометрии и как выполнить ➔",
        en: "Go to Geometry Tasks & View Guide ➔",
      },
      tutorBtnText: {
        kz: "ИИ-талдау: Пифагор теоремасы",
        ru: "Объяснить с ИИ: Пифагор",
        en: "Explain with AI: Pythagoras",
      },
      tutorPrompt: "Объясни мне теорему Пифагора на простых примерах и как находить неизвестные стороны и углы.",
      practiceSubject: "geometry",
      practiceTopic: "pythagoras",
    },

    algebra: {
      badge: {
        kz: "АЛГЕБРА: БАСЫМ БАҒЫТ",
        ru: "АЛГЕБРА: ВЫСОКИЙ ПРИОРИТЕТ",
        en: "ALGEBRA: HIGH PRIORITY",
      },
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      riskText: {
        kz: "БЖБ/ТЖБ: 79% қауіп",
        ru: "СОР/СОЧ: Риск 79%",
        en: "Exam Risk: 79%",
      },
      title: {
        kz: "Алгебралық бөлшектерді қысқарту: 3x/(x-2) - 6/(x-2)",
        ru: "Алгебраические дроби и вынесение множителя: 3x/(x-2) - 6/(x-2)",
        en: "Algebraic Fractions & Factoring: 3x/(x-2) - 6/(x-2)",
      },
      desc: {
        kz: "Критикалық олқылық: Бөлімдері бірдей бөлшектерді азайтқанда алымынан ортақ 3 санын жақша сыртына шығару және (x - 2) өрнегін дұрыс қысқарту дағдысының жетіспеуі.",
        ru: "Критический пробел: Вычитание дробей с одинаковым знаменателем, вынесение общего множителя 3·(x-2) и сокращение скобок с учетом ОДЗ (x ≠ 2).",
        en: "Critical Gap: Subtracting rational fractions with common denominators, factoring out 3(x-2), and cancelling terms while respecting domain x ≠ 2.",
      },
      formulaBox: {
        label: {
          kz: "Бөлшектерді азайту және ықшамдау:",
          ru: "Вычитание дробей и сокращение:",
          en: "Fraction Subtraction & Reduction:",
        },
        code: "3x / (x — 2) — 6 / (x — 2) = 3(x — 2) / (x — 2) = 3  (x ≠ 2)",
      },
      sampleTask: {
        question: {
          kz: "«x ≠ 2 болғанда: 3x/(x-2) - 6/(x-2) өрнегін ықшамдаңыз»",
          ru: "«Чему равно значение выражения 3x/(x-2) - 6/(x-2) при x ≠ 2?»",
          en: "«Simplify the expression 3x/(x-2) - 6/(x-2) for x ≠ 2»",
        },
        correctAnswer: {
          kz: "Дұрыс жауап: 3",
          ru: "Верный ответ: 3",
          en: "Correct answer: 3",
        },
      },
      primaryBtnText: {
        kz: "Алгебра тапсырмаларына өту және қалай шығаруды көру ➔",
        ru: "К заданиям по алгебре и как выполнить ➔",
        en: "Go to Algebra Tasks & View Guide ➔",
      },
      tutorBtnText: {
        kz: "ИИ-талдау: Алгебралық бөлшектер",
        ru: "Объяснить с ИИ: Дроби",
        en: "Explain with AI: Fractions",
      },
      tutorPrompt: "Объясни мне, как правильно сокращать алгебраические дроби и не попадаться в ловушки со знаменателями.",
      practiceSubject: "math",
      practiceTopic: "fractions",
    },
  };

  const currentCase = subjectCases[activeSubject] || subjectCases.biology;

  // Subject & Grade adaptive route steps
  const getSubjectRouteSteps = (subjId: string, grade: number): RouteStep[] => {
    if (subjId === "biology") {
      return [
        {
          subjectId: "biology",
          topic: "photosynthesis",
          title: {
            kz: "Биология: Фотосинтез (жарық және қараңғы сатылары)",
            ru: "Биология: Фотосинтез (световая и темновая фазы)",
            en: "Biology: Photosynthesis (Light & Dark Reactions)",
          },
          desc: {
            kz: "Бейімделген тест • 10 мин • +40 XP",
            ru: "Адаптивный тест • 10 мин • +40 XP",
            en: "Adaptive Quiz • 10 min • +40 XP",
          },
          icon: "psychology",
          color: "bg-teal-100 text-teal-700",
        },
        {
          subjectId: "biology",
          topic: "mitochondria",
          title: {
            kz: "Биология: Жасуша құрылысы және митохондриялар (АТФ)",
            ru: "Биология: Строение клетки и митохондрии (АТФ)",
            en: "Biology: Cell Structure & Mitochondria (ATP)",
          },
          desc: {
            kz: "ИИ-тәлімгермен талдау • 10 мин • +35 XP",
            ru: "Разбор с ИИ • 10 мин • +35 XP",
            en: "AI Dialogue • 10 min • +35 XP",
          },
          icon: "biotech",
          color: "bg-emerald-100 text-emerald-700",
        },
        {
          subjectId: "biology",
          topic: "genetics",
          title: {
            kz: "Биология: Молекулалық генетика және ДНҚ (А=Т, G≡C)",
            ru: "Биология: Молекулярная генетика и ДНК (А=Т, Г≡Ц)",
            en: "Biology: Molecular Genetics & DNA (A=T, G≡C)",
          },
          desc: {
            kz: "Қадамдық алгоритм • 15 мин • +50 XP",
            ru: "Пошаговый тренинг • 15 мин • +50 XP",
            en: "Step-by-step • 15 min • +50 XP",
          },
          icon: "dna",
          color: "bg-cyan-100 text-cyan-700",
        },
      ];
    }

    if (subjId === "english") {
      return [
        {
          subjectId: "english",
          topic: "tenses",
          title: {
            kz: "English: Present Perfect vs Past Simple (since/for/ago)",
            ru: "English: Present Perfect vs Past Simple (since/for/ago)",
            en: "English: Present Perfect vs Past Simple (since/for/ago)",
          },
          desc: {
            kz: "Бейімделген тест • 10 мин • +40 XP",
            ru: "Адаптивный тест • 10 мин • +40 XP",
            en: "Adaptive Quiz • 10 min • +40 XP",
          },
          icon: "translate",
          color: "bg-emerald-100 text-emerald-700",
        },
        {
          subjectId: "english",
          topic: "conditionals",
          title: {
            kz: "English: Conditionals (Zero, First, Second)",
            ru: "English: Conditionals (Zero, First, Second)",
            en: "English: Conditionals (Zero, First, Second)",
          },
          desc: {
            kz: "ИИ-диалог • 10 мин • +35 XP",
            ru: "Диалог с ИИ • 10 мин • +35 XP",
            en: "AI Dialogue • 10 min • +35 XP",
          },
          icon: "school",
          color: "bg-teal-100 text-teal-700",
        },
        {
          subjectId: "english",
          topic: "verbs",
          title: {
            kz: "English: Бұрыс етістіктер және сөздік қоры",
            ru: "English: Неправильные глаголы и контекст",
            en: "English: Irregular Verbs & Phrasal Verbs",
          },
          desc: {
            kz: "Қадамдық алгоритм • 15 мин • +50 XP",
            ru: "Пошаговый тренинг • 15 мин • +50 XP",
            en: "Step-by-step • 15 min • +50 XP",
          },
          icon: "spellcheck",
          color: "bg-green-100 text-green-700",
        },
      ];
    }

    if (subjId === "cs") {
      return [
        {
          subjectId: "cs",
          topic: "binary",
          title: {
            kz: "Информатика: Екілік сандарды ондыққа аудару (1101₂ = 13)",
            ru: "Информатика: Перевод чисел из 2-ичной в 10-ичную систему",
            en: "Computer Science: Binary to Decimal (1101₂ = 13)",
          },
          desc: {
            kz: "Бейімделген тест • 10 мин • +40 XP",
            ru: "Адаптивный тест • 10 мин • +40 XP",
            en: "Adaptive Quiz • 10 min • +40 XP",
          },
          icon: "terminal",
          color: "bg-blue-100 text-blue-700",
        },
        {
          subjectId: "cs",
          topic: "loops",
          title: {
            kz: "Информатика: Python циклдері (for i in range, while)",
            ru: "Информатика: Трассировка циклов Python (for/while)",
            en: "Computer Science: Python Loops & Iterations",
          },
          desc: {
            kz: "Кодты талдау • 10 мин • +35 XP",
            ru: "Разбор кода • 10 мин • +35 XP",
            en: "Code Analysis • 10 min • +35 XP",
          },
          icon: "code",
          color: "bg-indigo-100 text-indigo-700",
        },
        {
          subjectId: "cs",
          topic: "logic",
          title: {
            kz: "Информатика: Логикалық амалдар (AND, OR, NOT)",
            ru: "Информатика: Логические операции AND, OR, NOT",
            en: "Computer Science: Boolean Logic (AND, OR, NOT)",
          },
          desc: {
            kz: "Қадамдық алгоритм • 15 мин • +50 XP",
            ru: "Пошаговый тренинг • 15 мин • +50 XP",
            en: "Step-by-step • 15 min • +50 XP",
          },
          icon: "memory",
          color: "bg-sky-100 text-sky-700",
        },
      ];
    }

    if (subjId === "chemistry") {
      return [
        {
          subjectId: "chemistry",
          topic: "balancing",
          title: {
            kz: "Химия: Жану реакцияларында коэффициент қою (CH₄ + 2O₂)",
            ru: "Химия: Коэффициенты в реакциях горения (CH₄ + 2O₂)",
            en: "Chemistry: Balancing Combustion Equations",
          },
          desc: {
            kz: "Бейімделген тест • 10 мин • +40 XP",
            ru: "Адаптивный тест • 10 мин • +40 XP",
            en: "Adaptive Quiz • 10 min • +40 XP",
          },
          icon: "science",
          color: "bg-pink-100 text-pink-700",
        },
        {
          subjectId: "chemistry",
          topic: "valence",
          title: {
            kz: "Химия: Элементтердің валенттілігі мен формула құру",
            ru: "Химия: Валентность элементов и составление формул",
            en: "Chemistry: Valence & Chemical Formulas",
          },
          desc: {
            kz: "ИИ-талдау • 10 мин • +35 XP",
            ru: "Разбор с ИИ • 10 мин • +35 XP",
            en: "AI Review • 10 min • +35 XP",
          },
          icon: "bubble_chart",
          color: "bg-rose-100 text-rose-700",
        },
        {
          subjectId: "chemistry",
          topic: "redox",
          title: {
            kz: "Химия: Тотығу-тотықсыздану реакциялары (ТТР)",
            ru: "Химия: Окислительно-восстановительные реакции (ОВР)",
            en: "Chemistry: Redox Reactions",
          },
          desc: {
            kz: "Қадамдық алгоритм • 15 мин • +50 XP",
            ru: "Пошаговый тренинг • 15 мин • +50 XP",
            en: "Step-by-step • 15 min • +50 XP",
          },
          icon: "experiments",
          color: "bg-fuchsia-100 text-fuchsia-700",
        },
      ];
    }

    if (subjId === "physics") {
      return [
        {
          subjectId: "physics",
          topic: "speed",
          title: {
            kz: "Физика: Қозғалыс жылдамдығын есептеу: v = S / t",
            ru: "Физика: Расчет средней скорости: v = S / t",
            en: "Physics: Average Speed Calculation: v = S / t",
          },
          desc: {
            kz: "Бейімделген тест • 10 мин • +40 XP",
            ru: "Адаптивный тест • 10 мин • +40 XP",
            en: "Adaptive Quiz • 10 min • +40 XP",
          },
          icon: "bolt",
          color: "bg-purple-100 text-purple-700",
        },
        {
          subjectId: "physics",
          topic: "newton",
          title: {
            kz: "Физика: Ньютонның 2-заңы (F = ma) және үйкеліс",
            ru: "Физика: Второй закон Ньютона (F = ma) и сила трения",
            en: "Physics: Newton's Second Law & Friction",
          },
          desc: {
            kz: "ИИ-талдау • 10 мин • +35 XP",
            ru: "Разбор с ИИ • 10 мин • +35 XP",
            en: "AI Review • 10 min • +35 XP",
          },
          icon: "speed",
          color: "bg-violet-100 text-violet-700",
        },
        {
          subjectId: "physics",
          topic: "energy",
          title: {
            kz: "Физика: Кинетикалық және потенциалдық энергия (Eк = mv²/2)",
            ru: "Физика: Кинетическая и потенциальная энергия",
            en: "Physics: Kinetic & Potential Energy",
          },
          desc: {
            kz: "Қадамдық алгоритм • 15 мин • +50 XP",
            ru: "Пошаговый тренинг • 15 мин • +50 XP",
            en: "Step-by-step • 15 min • +50 XP",
          },
          icon: "electric_bolt",
          color: "bg-indigo-100 text-indigo-700",
        },
      ];
    }

    if (subjId === "geometry") {
      return [
        {
          subjectId: "geometry",
          topic: "pythagoras",
          title: {
            kz: "Геометрия: Пифагор теоремасы (c² = a² + b²)",
            ru: "Геометрия: Теорема Пифагора (c² = a² + b²)",
            en: "Geometry: Pythagorean Theorem (c² = a² + b²)",
          },
          desc: {
            kz: "Сызбамен талдау • 10 мин • +35 XP",
            ru: "Разбор по чертежам • 10 мин • +35 XP",
            en: "Diagram Study • 10 min • +35 XP",
          },
          icon: "square_foot",
          color: "bg-amber-100 text-amber-700",
        },
        {
          subjectId: "geometry",
          topic: "angles",
          title: {
            kz: "Геометрия: Үшбұрыш бұрыштарының қосындысы (180°)",
            ru: "Геометрия: Сумма внутренних углов треугольника (180°)",
            en: "Geometry: Triangle Interior Angles Sum (180°)",
          },
          desc: {
            kz: "Бейімделген тест • 10 мин • +40 XP",
            ru: "Адаптивный тест • 10 мин • +40 XP",
            en: "Adaptive Quiz • 10 min • +40 XP",
          },
          icon: "architecture",
          color: "bg-yellow-100 text-yellow-700",
        },
        {
          subjectId: "geometry",
          topic: "congruence",
          title: {
            kz: "Геометрия: Үшбұрыштардың теңдік белгілері",
            ru: "Геометрия: Признаки равенства треугольников",
            en: "Geometry: Triangle Congruence Criteria",
          },
          desc: {
            kz: "Қадамдық алгоритм • 15 мин • +50 XP",
            ru: "Пошаговый алгоритм • 15 мин • +50 XP",
            en: "Step-by-step • 15 min • +50 XP",
          },
          icon: "change_history",
          color: "bg-orange-100 text-orange-700",
        },
      ];
    }

    // Default: Algebra / Math
    return [
      {
        subjectId: "math",
        topic: "fractions",
        title: {
          kz: "Алгебра: Алгебралық бөлшектерді қысқарту 3(x-2)/(x-2)",
          ru: "Алгебра: Алгебраические дроби и вынесение множителя",
          en: "Algebra: Rational Fractions & Factoring",
        },
        desc: {
          kz: "Бейімделген тест • 15 мин • +50 XP",
          ru: "Адаптивный тест • 15 мин • +50 XP",
          en: "Adaptive Quiz • 15 min • +50 XP",
        },
        icon: "calculate",
        color: "bg-blue-100 text-blue-700",
      },
      {
        subjectId: "math",
        topic: "quadratics",
        title: {
          kz: "Алгебра: Квадрат теңдеулер және Виет теоремасы",
          ru: "Алгебра: Квадратные уравнения и теорема Виета",
          en: "Algebra: Quadratic Equations & Vieta's Formula",
        },
        desc: {
          kz: "Қадамдық алгоритм • 15 мин • +50 XP",
          ru: "Пошаговый алгоритм • 15 мин • +50 XP",
          en: "Step-by-step • 15 min • +50 XP",
        },
        icon: "functions",
        color: "bg-indigo-100 text-indigo-700",
      },
      {
        subjectId: "math",
        topic: "systems",
        title: {
          kz: "Алгебра: Сызықтық теңдеулер жүйесі",
          ru: "Алгебра: Системы линейных уравнений",
          en: "Algebra: Systems of Linear Equations",
        },
        desc: {
          kz: "ИИ-тәлімгермен талдау • 10 мин • +35 XP",
          ru: "Разбор с ИИ • 10 мин • +35 XP",
          en: "AI Review • 10 min • +35 XP",
        },
        icon: "balance",
        color: "bg-teal-100 text-teal-700",
      },
    ];
  };

  const currentRouteSteps = getSubjectRouteSteps(activeSubject, selectedGrade);

  return (
    <div className="flex flex-col gap-5 pb-8">
      {/* Top Bar / Profile Greeting */}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="size-12 rounded-2xl bg-linear-to-tr from-[#004ac6] to-[#0066ff] flex items-center justify-center text-white font-black text-lg shadow-md shadow-[#004ac6]/20">
              {streak > 0 ? "🔥" : "🎓"}
            </div>
            <span className="absolute -bottom-1 -right-1 size-5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
              {level}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#737686]">{t.home.greeting}</span>
              <span className="px-1.5 py-0.5 rounded-md bg-[#eaedff] text-[#004ac6] text-[10px] font-bold">
                Level {level}
              </span>
            </div>
            <h2 className="text-base font-extrabold text-[#131b2e] leading-tight">
              {t.home.studentName}
            </h2>
          </div>
        </div>

        {/* Currency & Streak status */}
        <div className="flex items-center gap-2">
          <div
            onClick={() => onNavigate("rewards")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#fff8e5] border border-[#fef3c7] text-[#92400e] text-xs font-black cursor-pointer hover:scale-102 transition-transform"
            title="Очки Наурызкойн"
          >
            <span className="text-sm">🪙</span>
            <span>{coins}</span>
          </div>
          <div
            onClick={() => onNavigate("rewards")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#eff6ff] border border-[#dbeafe] text-[#1e40af] text-xs font-black cursor-pointer hover:scale-102 transition-transform"
            title="Опыт XP"
          >
            <span className="text-sm">⚡</span>
            <span>{xp}</span>
          </div>
          <div
            onClick={() => onNavigate("rewards")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#fff1f2] border border-[#ffe4e6] text-[#be123c] text-xs font-black cursor-pointer hover:scale-102 transition-transform"
            title="Серия ударных дней"
          >
            <span className="text-sm">🔥</span>
            <span>{streak}d</span>
          </div>
        </div>
      </section>

      {/* Leaderboard Teaser Card (Лидерборд школы и класса) */}
      <section
        onClick={() => onNavigate("rewards")}
        className="rounded-2xl border border-amber-300 bg-linear-to-r from-amber-500/10 via-amber-50 to-orange-50 p-3 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-10 rounded-xl bg-linear-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform shrink-0">
            <span className="material-symbols-outlined text-[22px]">trophy</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 uppercase tracking-wider">
                {language === "kz" ? "Лидерборд" : language === "en" ? "Leaderboard" : "Лидерборд"}
              </span>
              <span className="text-[10px] font-bold text-amber-800">
                {language === "kz" ? "Алтын лига" : language === "en" ? "Gold League" : "Золотая лига"}
              </span>
            </div>
            <h4 className="text-xs font-black text-slate-800 truncate mt-0.5 group-hover:text-amber-700 transition-colors">
              {language === "kz"
                ? "Сіз 3-орындасыз! Бірінші орынға жету үшін +70 XP жинаңыз"
                : language === "en"
                ? "You rank #3! Earn +70 XP to claim #1"
                : "Вы на 3-м месте! До 1-го места осталось всего 70 XP"}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-black text-amber-700 shrink-0 ml-2">
          <span className="hidden sm:inline">
            {language === "kz" ? "Рейтинг" : language === "en" ? "Ranks" : "Топ"}
          </span>
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </div>
      </section>

      {/* Grade Selector Strip (5 - 11 сынып / класс) */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#131b2e] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#004ac6]">school</span>
            {language === "kz"
              ? "Оқу сыныбы (ҚР стандарты):"
              : language === "en"
              ? "Grade Level (KZ Standard):"
              : "Класс обучения (Стандарт РК):"}
          </span>
          <span className="font-bold text-[#004ac6] bg-[#eaedff] px-2 py-0.5 rounded-md text-[11px]">
            {selectedGrade} {language === "kz" ? "сынып" : language === "en" ? "Grade" : "класс"} • {unlockedCount} {language === "kz" ? "пән ашық" : language === "en" ? "subjects active" : "предметов доступно"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[5, 6, 7, 8, 9, 10, 11].map((gr) => {
            const isActive = selectedGrade === gr;
            return (
              <button
                key={gr}
                onClick={() => {
                  setSelectedGrade(gr);
                  // If current active subject requires higher grade, adjust
                  const currentSubObj = allSubjects.find((s) => s.id === activeSubject);
                  if (currentSubObj && gr < currentSubObj.minGrade) {
                    setActiveSubject("biology");
                  }
                }}
                className={`flex-1 min-w-[42px] py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer text-center ${
                  isActive
                    ? "bg-[#004ac6] text-white shadow-md scale-105"
                    : "bg-[#f2f3ff] text-[#434655] hover:bg-[#e2e7ff]"
                }`}
              >
                {gr} {language === "kz" ? "сын." : language === "en" ? "gr." : "кл."}
              </button>
            );
          })}
        </div>
      </section>

      {/* Subject Filter Bar - Instant Switcher with Active Highlighting */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs font-black text-[#131b2e]">
            <span className="material-symbols-outlined text-[16px] text-[#004ac6]">auto_awesome</span>
            <span>
              {language === "kz"
                ? "Басты экранның белсенді пәні:"
                : language === "en"
                ? "Active Dashboard Subject:"
                : "Активный предмет на главном экране:"}
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#737686]">
            {language === "kz" ? "Басып таңдаңыз" : language === "en" ? "Click to switch" : "Нажмите для смены"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {allSubjects.map((sub) => {
            const isUnlocked = selectedGrade >= sub.minGrade;
            const isActive = activeSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  if (!isUnlocked) {
                    setSelectedGrade(sub.minGrade);
                  }
                  setActiveSubject(sub.id);
                }}
                className={`flex-shrink-0 px-3 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#004ac6] border-[#004ac6] text-white shadow-md scale-102 ring-2 ring-[#004ac6]/30"
                    : isUnlocked
                    ? "bg-white border-[#c3c6d7]/40 text-[#434655] hover:bg-[#f2f3ff]"
                    : "bg-[#f8f9fe] border-dashed border-[#c3c6d7]/50 text-[#737686] hover:border-[#004ac6]/40"
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">
                  {!isUnlocked ? "lock" : sub.icon}
                </span>
                <span>{sub.name[language]}</span>
                {isActive && (
                  <span className="size-2 rounded-full bg-white animate-pulse"></span>
                )}
                {!isUnlocked && (
                  <span className="text-[9px] px-1 py-0.2 bg-[#eaedff] text-[#004ac6] rounded-md font-bold">
                    {sub.minGrade} {language === "kz" ? "сын." : "кл."}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Subject-Specific Featured Assignment / Critical Gap Card */}
      <section className="rounded-3xl border-2 border-[#ffdad6] bg-linear-to-br from-[#fff8f7] via-[#ffffff] to-[#fff5f4] p-4.5 shadow-sm relative overflow-hidden transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/40 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>

        {/* Top Badges & Subject Header */}
        <div className="flex items-center justify-between mb-2.5">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-black uppercase tracking-wider border ${currentCase.badgeColor}`}>
            <span className="material-symbols-outlined text-[15px]">priority_high</span>
            <span>{currentCase.badge[language]}</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black shadow-xs">
            {currentCase.riskText[language]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-black text-[#410002] leading-snug">
          {currentCase.title[language]}
        </h3>

        {/* Description of the critical gap */}
        <p className="text-xs text-[#5c3f3f] mt-1.5 leading-relaxed font-medium">
          {currentCase.desc[language]}
        </p>

        {/* Visual Formula / Graphic Box */}
        <div className="my-3 p-3 rounded-2xl bg-[#fff0ee] border border-[#ffdad6] text-xs">
          <div className="text-[10px] font-black uppercase tracking-wider text-[#ba1a1a] mb-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">science</span>
            <span>{currentCase.formulaBox.label[language]}</span>
          </div>
          <code className="block font-mono font-black text-[#ba1a1a] text-xs bg-white/80 p-2 rounded-xl border border-red-200/60 overflow-x-auto whitespace-pre-wrap">
            {currentCase.formulaBox.code}
          </code>
        </div>

        {/* Mini Preview of the Question */}
        <div className="p-3 rounded-2xl bg-white border border-[#ffdad6]/80 mb-3 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-[#737686] uppercase">
              {language === "kz" ? "Мысал сұрақ" : language === "en" ? "Sample Task" : "Пример задания"}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {currentCase.sampleTask.correctAnswer[language]}
            </span>
          </div>
          <p className="text-xs font-bold text-[#131b2e] leading-snug">
            {currentCase.sampleTask.question[language]}
          </p>
        </div>

        {/* Primary Action Button: Takes student directly to tasks for this subject and topic! */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() =>
              onNavigate("practice", {
                subject: currentCase.practiceSubject,
                topic: currentCase.practiceTopic,
                grade: selectedGrade,
                autoOpenGuide: true,
              })
            }
            className="w-full rounded-2xl bg-linear-to-r from-[#ba1a1a] to-[#d32f2f] hover:from-[#93000a] hover:to-[#ba1a1a] text-white py-3 px-4 text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-red-600/20 transition-all active:scale-98 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            <span>{currentCase.primaryBtnText[language]}</span>
          </button>

          {/* Secondary AI Tutor & Map buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onNavigate("chat", {
                  subject: currentCase.practiceSubject,
                  prompt: currentCase.tutorPrompt,
                })
              }
              className="flex-1 rounded-xl bg-white border border-[#ffdad6] text-[#ba1a1a] py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#fff0ee] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">forum</span>
              <span>{currentCase.tutorBtnText[language]}</span>
            </button>
            <button
              onClick={() => onNavigate("knowledge")}
              className="rounded-xl border border-[#ffdad6] bg-white text-[#410002] py-2 px-3.5 text-xs font-bold hover:bg-[#fff0ee] transition-colors flex items-center gap-1 cursor-pointer"
              title="Посмотреть на карте знаний"
            >
              <span className="material-symbols-outlined text-[16px]">account_tree</span>
              <span>{language === "kz" ? "Карта" : language === "en" ? "Map" : "Карта"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* AI Tutor Newton Quick Promo Box */}
      <section className="rounded-2xl bg-linear-to-r from-[#004ac6] to-[#2563eb] p-4 text-white shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">smart_toy</span>
          </div>
          <div>
            <h4 className="text-sm font-bold leading-tight">
              {t.home.tutorPromoTitle}
            </h4>
            <p className="text-[11px] text-white/80 mt-0.5">
              {t.home.tutorPromoSubtitle}
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate("chat")}
          className="rounded-xl bg-white text-[#004ac6] px-3.5 py-2 text-xs font-black hover:bg-[#eaedff] transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
        >
          {t.home.askBtn}
        </button>
      </section>

      {/* Subject-Adaptive Personalized Route (Персональный маршрут по выбранному предмету) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-black text-[#131b2e]">
              {t.home.routeTitle}
            </h3>
            <span className="text-xs font-bold text-[#004ac6]">
              ({allSubjects.find((s) => s.id === activeSubject)?.name[language] || "Предмет"})
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#eaedff] text-[#004ac6]">
            {currentRouteSteps.length} {language === "kz" ? "қадам" : language === "en" ? "steps" : "шага"}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {currentRouteSteps.map((step, idx) => (
            <div
              key={idx}
              onClick={() =>
                onNavigate("practice", {
                  subject: step.subjectId,
                  topic: step.topic,
                  grade: selectedGrade,
                  autoOpenGuide: true,
                })
              }
              className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#c3c6d7]/30 shadow-xs hover:border-[#004ac6]/40 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`flex size-9 items-center justify-center rounded-xl ${step.color} group-hover:scale-105 transition-transform shrink-0`}>
                  <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
                </div>
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-[#131b2e] group-hover:text-[#004ac6] transition-colors truncate">
                    {step.title[language]}
                  </h5>
                  <p className="text-[11px] text-[#737686]">
                    {step.desc[language]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#004ac6] shrink-0 ml-2">
                <span className="hidden sm:inline">
                  {language === "kz" ? "Орындау" : language === "en" ? "Solve" : "Решать"}
                </span>
                <span className="material-symbols-outlined text-[18px]">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subject Mastery Grid (Матрица предметов - Нажатие сразу переключает предмет на главном экране!) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#131b2e]">
              {t.home.masteryTitle}
            </h3>
            <p className="text-[11px] text-[#737686]">
              {language === "kz"
                ? `${selectedGrade}-сыныптағы пәндер және таңдау`
                : language === "en"
                ? `Subjects in Grade ${selectedGrade} (tap to select)`
                : `Предметы для ${selectedGrade} класса (нажмите для выбора)`}
            </p>
          </div>
          <button
            onClick={() => onNavigate("knowledge")}
            className="text-xs font-bold text-[#004ac6] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>{t.home.detailsBtn}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {allSubjects.map((sub) => {
            const isUnlocked = selectedGrade >= sub.minGrade;
            const isActive = activeSubject === sub.id;

            return (
              <div
                key={sub.id}
                onClick={() => {
                  if (isUnlocked) {
                    setActiveSubject(sub.id);
                  } else {
                    // Switch to the grade that unlocks this subject!
                    setSelectedGrade(sub.minGrade);
                    setActiveSubject(sub.id);
                  }
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                  isActive
                    ? "bg-[#f2f3ff] border-[#004ac6] shadow-md ring-2 ring-[#004ac6]/30"
                    : isUnlocked
                    ? "bg-white border-[#c3c6d7]/30 shadow-xs hover:border-[#004ac6]/50 hover:shadow-sm"
                    : "bg-[#f8f9fe] border-dashed border-[#c3c6d7]/60 opacity-80 hover:opacity-100"
                }`}
              >
                {isActive && (
                  <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-[#004ac6] text-white text-[9px] font-black shadow-xs">
                    {language === "kz" ? "✓ Белсенді" : language === "en" ? "✓ Active" : "✓ Выбран"}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ color: isUnlocked ? sub.color : "#737686" }}
                      >
                        {sub.icon}
                      </span>
                      <span className="text-xs font-bold text-[#131b2e] truncate">
                        {sub.name[language]}
                      </span>
                    </div>
                    {isUnlocked ? (
                      <span className="text-xs font-extrabold" style={{ color: sub.color }}>
                        {sub.score}%
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-[16px] text-[#737686]">
                        lock
                      </span>
                    )}
                  </div>

                  {isUnlocked ? (
                    <div className="w-full bg-[#f0f2f8] h-1.5 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${sub.score}%`, backgroundColor: sub.color }}
                      ></div>
                    </div>
                  ) : (
                    <div className="text-[10px] text-[#737686] font-semibold py-1">
                      {language === "kz"
                        ? `🔒 ${sub.minGrade}-сыныпта ашылады`
                        : language === "en"
                        ? `🔒 Unlocks in Grade ${sub.minGrade}`
                        : `🔒 Откроется в ${sub.minGrade} классе`}
                    </div>
                  )}
                </div>

                <div className="mt-1 flex items-center justify-between pt-1 border-t border-[#c3c6d7]/20 text-[10px] font-bold">
                  {isUnlocked ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSubject(sub.id);
                        onNavigate("practice", {
                          subject: sub.id === "algebra" ? "math" : sub.id,
                          grade: selectedGrade,
                          autoOpenGuide: true,
                        });
                      }}
                      className="text-[#004ac6] hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>{language === "kz" ? "Тапсырмалар ➔" : language === "en" ? "Tasks ➔" : "Решать ➔"}</span>
                    </button>
                  ) : (
                    <span className="text-[#737686] hover:text-[#004ac6]">
                      {language === "kz" ? `${sub.minGrade}-сыныпқа өту` : language === "en" ? `Switch to Grade ${sub.minGrade}` : `Перейти в ${sub.minGrade} кл.`}
                    </span>
                  )}
                  {isActive && (
                    <span className="text-[10px] text-teal-700 font-extrabold">
                      {language === "kz" ? "Экранда көрсетілді" : language === "en" ? "Shown above" : "Показан выше"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
