import { Language } from "../types";

export type TopicStatus = "mastered" | "critical_gap" | "in_progress" | "locked";

export interface KnowledgeQuiz {
  question: Record<Language, string>;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: Record<Language, string>;
  hint: Record<Language, string>;
}

export interface KnowledgeTopic {
  id: string;
  subjectId: "algebra" | "geometry" | "physics" | "cs" | "english" | "biology" | "chemistry";
  grade: number;
  title: Record<Language, string>;
  desc: Record<Language, string>;
  status: TopicStatus;
  score: number;
  prereqNumber?: string;
  blocksCount?: number;
  warningNote?: Record<Language, string>;
  accuracy?: number;
  theory: {
    ruleTitle: Record<Language, string>;
    formula: string;
    explanation: Record<Language, string>;
    commonTrap: Record<Language, string>;
  };
  dependencies: {
    prerequisites: Record<Language, string[]>;
    unlocks: Record<Language, string[]>;
    crossSubjectImpact?: Record<Language, string>;
  };
  aiExplanation: {
    analogyTitle: Record<Language, string>;
    analogyBody: Record<Language, string>;
    keyTakeaway: Record<Language, string>;
  };
  quiz: KnowledgeQuiz;
}

export interface SubjectKnowledge {
  id: "algebra" | "geometry" | "physics" | "cs" | "english" | "biology" | "chemistry";
  name: Record<Language, string>;
  icon: string;
  categoryTag: Record<Language, string>;
  masteryScore: number;
  masterySubtitle: Record<Language, string>;
  blockerCount: number;
  minGrade?: number;
  diagnostic: {
    title: Record<Language, string>;
    badge: Record<Language, string>;
    errorObservation: Record<Language, string>;
    missedBaseTitle: Record<Language, string>;
    missedBaseConcept: Record<Language, string>;
    impactTitle: Record<Language, string>;
    impactDesc: Record<Language, string>;
    startSprintBtn: Record<Language, string>;
    sprintSubtitle: Record<Language, string>;
    sprintLessonTitle: Record<Language, string>;
    sprintLessonContent: Record<Language, string>;
  };
  topics: KnowledgeTopic[];
}

export const knowledgeMapSubjects: SubjectKnowledge[] = [
  {
    id: "algebra",
    minGrade: 5,
    name: {
      kz: "Алгебра",
      ru: "Алгебра",
      en: "Algebra",
    },
    icon: "calculate",
    categoryTag: {
      kz: "AI БІЛІМ КАРТОГРАФИЯСЫ",
      ru: "AI КАРТОГРАФИЯ ЗНАНИЙ",
      en: "AI KNOWLEDGE CARTOGRAPHY",
    },
    masteryScore: 74,
    masterySubtitle: {
      kz: "8–9 сынып бағдарламасының 74%-ы меңгерілді",
      ru: "74% программы 8–9 классов освоено",
      en: "74% of Grades 8–9 curriculum mastered",
    },
    blockerCount: 2,
    diagnostic: {
      title: {
        kz: "ИИ диагностикасы: Түпкі себепті талдау",
        ru: "Диагностика ИИ: Анализ первопричины",
        en: "AI Diagnostics: Root-Cause Analysis",
      },
      badge: {
        kz: "НЕЙРО-АУДИТ",
        ru: "НЕЙРО-АУДИТ",
        en: "NEURO-AUDIT",
      },
      errorObservation: {
        kz: "Қатарынан 4 тексеру жұмысында қателер ортақ бөлімге келтіру және НОК кезінде орын алды.",
        ru: "Ошибки в 4 тестах подряд происходят на этапе приведения к общему знаменателю и НОК.",
        en: "Errors across 4 consecutive tests happen during finding the common denominator and LCM.",
      },
      missedBaseTitle: {
        kz: "ПРОПУЩЕННАЯ БАЗА:",
        ru: "ПРОПУЩЕННАЯ БАЗА:",
        en: "MISSED FOUNDATION:",
      },
      missedBaseConcept: {
        kz: "ЕКОҮ (Ең кіші ортақ еселік) және сандарды жай көбейткіштерге жіктеу.",
        ru: "НОК (Наименьшее общее кратное) и разложение чисел на простые сомножители.",
        en: "LCM (Least Common Multiple) and prime factorization of integers.",
      },
      impactTitle: {
        kz: "Оқу жоспарына әсері:",
        ru: "Влияние на учебный план:",
        en: "Curriculum Impact:",
      },
      impactDesc: {
        kz: "Алгебрадағы 3 сабақтас тақырыпқа (рационал бөлшектер, теңдеулер жүйесі) және Физикадағы 1 тақырыпқа әсер етеді.",
        ru: "Влияет на 3 смежные темы в Алгебре (рациональные дроби, системы уравнений) и 1 тему в Физике (закон Ома).",
        en: "Affects 3 related topics in Algebra (rational fractions, systems) and 1 in Physics (Ohm's Law).",
      },
      startSprintBtn: {
        kz: "10 минуттық мини-спринтті іске қосу 🚀",
        ru: "Запустить 10-минутный мини-спринт ликвидации пробела 🚀",
        en: "Launch 10-Minute Gap Elimination Sprint 🚀",
      },
      sprintSubtitle: {
        kz: "Жеке бағдарлама: 1 микро-сабақ + 3 жаттығу есебі",
        ru: "Персонализированная подборка: 1 микро-разбор + 3 экспресс-задачи",
        en: "Personalized set: 1 micro-lesson + 3 express practice questions",
      },
      sprintLessonTitle: {
        kz: "Бөлшектердің ортақ бөлімін қалай оңай табуға болады?",
        ru: "Как безошибочно находить общий знаменатель?",
        en: "How to find common denominators without errors?",
      },
      sprintLessonContent: {
        kz: "Екі бөлшекті қосқанда немесе азайтқанда (мысалы 1/6 + 2/9), ең алдымен бөлімдердің ЕКОҮ табамыз: 6 = 2·3, 9 = 3·3. ЕКОҮ = 2·3·3 = 18. Сондықтан қосымша көбейткіштер: біріншісіне 3, екіншісіне 2!",
        ru: "При сложении или вычитании дробей с разными знаменателями (например 1/6 + 2/9) разложи знаменатели: 6 = 2·3, 9 = 3·3. НОК = 2·3·3 = 18. Дополнительный множитель для первой дроби 3, для второй 2. Итог: 3/18 + 4/18 = 7/18.",
        en: "When adding fractions with different denominators (e.g. 1/6 + 2/9), factor denominators: 6 = 2·3, 9 = 3·3. LCM = 2·3·3 = 18. Multiply numerator 1 by 3, numerator 2 by 2: 3/18 + 4/18 = 7/18.",
      },
    },
    topics: [
      {
        id: "alg-1",
        subjectId: "algebra",
        grade: 7,
        title: {
          kz: "Базалық арифметика және бүтін сандар",
          ru: "Базовая арифметика и целые числа",
          en: "Basic Arithmetic & Integers",
        },
        desc: {
          kz: "Бүтін сандарды қосу, азайту, көбейту, бөлу және таңбалар ережесі",
          ru: "Сложение, вычитание, умножение, деление целых чисел и правило знаков",
          en: "Addition, subtraction, multiplication, division of integers & sign rules",
        },
        status: "mastered",
        score: 100,
        prereqNumber: "01",
        accuracy: 98,
        theory: {
          ruleTitle: {
            kz: "Таңбалар ережесі және модуль",
            ru: "Правило знаков при умножении и делении",
            en: "Rules of Signs & Absolute Values",
          },
          formula: "(+) · (+) = (+),  (+) · (—) = (—),  (—) · (—) = (+)",
          explanation: {
            kz: "Бірдей таңбалы екі санды көбейткенде нәтиже әрқашан оң (+) болады. Әртүрлі таңбалы болса — теріс (—).",
            ru: "При умножении или делении чисел с одинаковыми знаками результат всегда положителен. С разными знаками — отрицателен.",
            en: "Multiplying or dividing numbers with the same signs yields positive. Opposite signs yield negative.",
          },
          commonTrap: {
            kz: "— (—5) = +5 екенін ұмытып, жақша ашқанда қателесу.",
            ru: "Потеря минуса при раскрытии скобок: —(—x) = +x.",
            en: "Losing negative signs when expanding brackets: —(—x) = +x.",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Бастауыш математика", "Сан сәулесі"],
            ru: ["Начальная математика", "Числовая прямая"],
            en: ["Elementary Math", "Number Line"],
          },
          unlocks: {
            kz: ["Бөлшектер және пропорциялар", "Алгебралық өрнектер"],
            ru: ["Дроби и пропорции", "Алгебраические выражения"],
            en: ["Fractions & Proportions", "Algebraic Expressions"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Банк шоты және қарыз",
            ru: "Банковский баланс и долги",
            en: "Bank Balance & Debts",
          },
          analogyBody: {
            kz: "Оң сандар — сіздің балансыңыздағы ақша (+500). Теріс сандар — қарыз (—200). Қарыздан құтылу (—(—200)) шотқа +200 теңге қосылғанмен тең!",
            ru: "Положительные числа — это деньги на карте (+1000 ₽). Отрицательные — долг (—500 ₽). Списание долга (вычитание отрицательного) равносильно зачислению денег на баланс!",
            en: "Positive numbers represent money in your account (+100). Negative numbers are debts (—50). Canceling a debt (—(—50)) equals gaining +50!",
          },
          keyTakeaway: {
            kz: "Минус пен минус әрқашан плюс береді!",
            ru: "Минус на минус всегда дает плюс!",
            en: "Two negatives make a positive!",
          },
        },
        quiz: {
          question: {
            kz: "Есептеңіз: —12 — (—18) + (—4)",
            ru: "Вычислите значение: —12 — (—18) + (—4)",
            en: "Calculate: —12 — (—18) + (—4)",
          },
          options: [
            { id: "A", text: "2", isCorrect: true },
            { id: "B", text: "—34", isCorrect: false },
            { id: "C", text: "—10", isCorrect: false },
            { id: "D", text: "10", isCorrect: false },
          ],
          explanation: {
            kz: "—12 — (—18) = —12 + 18 = 6. Одан кейін 6 + (—4) = 2.",
            ru: "—12 — (—18) = —12 + 18 = 6. Затем 6 + (—4) = 2.",
            en: "—12 — (—18) = —12 + 18 = 6. Then 6 + (—4) = 2.",
          },
          hint: {
            kz: "Алдымен —(—18) өрнегін +18 деп жазып алыңыз.",
            ru: "Преобразуй —(—18) в +18, а затем складывай слева направо.",
            en: "Convert —(—18) to +18, then evaluate from left to right.",
          },
        },
      },
      {
        id: "alg-2",
        subjectId: "algebra",
        grade: 8,
        title: {
          kz: "Бөлшектер және пропорциялар (НОК)",
          ru: "Дроби и пропорции (НОК)",
          en: "Fractions, LCM & Proportions",
        },
        desc: {
          kz: "Ортақ бөлімге келтіру, айнымалылары бар бөлшектер және НОК табу",
          ru: "Приведение к общему знаменателю, дроби с переменными и нахождение НОК",
          en: "Finding common denominators, algebraic fractions and finding LCM",
        },
        status: "critical_gap",
        score: 42,
        blocksCount: 2,
        warningNote: {
          kz: "Төмендегі 2 тақырыпты және физикадағы есептерді бұғаттап тұр",
          ru: "Блокирует 2 темы ниже и формулы параллельных цепей в Физике",
          en: "Blocks 2 subsequent topics and parallel circuit formulas in Physics",
        },
        accuracy: 42,
        theory: {
          ruleTitle: {
            kz: "Ортақ бөлімге келтіру алгоритмі",
            ru: "Алгоритм приведения дробей к общему знаменателю",
            en: "Algorithm for Finding Common Denominator",
          },
          formula: "a/b ± c/d = (a·d ± c·b) / (b·d)",
          explanation: {
            kz: "Бөлшектерді қосқанда алдымен бөлімдердің ЕКОҮ (НОК) табылады. Әр бөлшектің алымы мен бөлімі қосымша көбейткішке көбейтіледі.",
            ru: "Чтобы сложить или вычесть дроби с разными знаменателями, сначала найди их НОК. Затем умножь числитель каждой дроби на дополнительный множитель.",
            en: "To add or subtract fractions with distinct denominators, find their LCM first. Then multiply each numerator by its cofactor.",
          },
          commonTrap: {
            kz: "Алым мен бөлімін жай ғана қоса салу: (a+c)/(b+d) — бұл өрескел қате!",
            ru: "Грубая ошибка: складывать числители и знаменатели напрямую: (a+c)/(b+d).",
            en: "Critical trap: directly adding numerators and denominators (a+c)/(b+d).",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Базалық арифметика", "Жай көбейткіштерге жіктеу"],
            ru: ["Базовая арифметика", "Разложение на простые множители"],
            en: ["Basic Arithmetic", "Prime Factorization"],
          },
          unlocks: {
            kz: ["Сызықтық теңдеулер", "Квадрат теңдеулер", "Физика: Ом заңы"],
            ru: ["Линейные уравнения", "Квадратные уравнения", "Физика: Закон Ома"],
            en: ["Linear Equations", "Quadratic Equations", "Physics: Ohm's Law"],
          },
          crossSubjectImpact: {
            kz: "Физикадағы 1/R = 1/R₁ + 1/R₂ формуласы толық осы ережеге негізделген.",
            ru: "В Физике формула параллельного соединения 1/R = 1/R₁ + 1/R₂ основана именно на этом!",
            en: "In Physics, the parallel resistance formula 1/R = 1/R₁ + 1/R₂ directly relies on this!",
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Пиццаның тең тілімдері 🍕",
            ru: "Нарезка пиццы на равные кусочки 🍕",
            en: "Slicing Pizza into Equal Slices 🍕",
          },
          analogyBody: {
            kz: "Егер бір пицца 3 үлкен бөлікке, ал екіншісі 4 кішкентай бөлікке бөлінсе, оларды салыстыру үшін екеуін де 12 тең тілімге кесу керек!",
            ru: "Если одна пицца разрезана на 3 больших куска, а вторая на 4 меньших — нельзя просто сложить куски. Нужно нарезать обе на 12 равных кусочков! Тогда 2/3 = 8/12, а 1/4 = 3/12.",
            en: "If one pizza is sliced into 3 big slices and another into 4 smaller ones, slice both into 12 equal pieces! 2/3 = 8/12 and 1/4 = 3/12.",
          },
          keyTakeaway: {
            kz: "Бөлімдері бірдей болмайынша қосуға болмайды!",
            ru: "Нельзя складывать доли разного калибра без общего делителя!",
            en: "You cannot add fractions without matching denominator slices!",
          },
        },
        quiz: {
          question: {
            kz: "Есептеңіз: 3/4 — 2/5",
            ru: "Чему равно значение выражения: 3/4 — 2/5?",
            en: "Evaluate: 3/4 — 2/5",
          },
          options: [
            { id: "A", text: "7/20", isCorrect: true },
            { id: "B", text: "1/1", isCorrect: false },
            { id: "C", text: "1/20", isCorrect: false },
            { id: "D", text: "5/9", isCorrect: false },
          ],
          explanation: {
            kz: "Ортақ бөлім 20. 3·5/20 — 2·4/20 = 15/20 — 8/20 = 7/20.",
            ru: "Общий знаменатель НОК(4, 5) = 20. Дополнительные множители 5 и 4: (15 — 8) / 20 = 7/20.",
            en: "Common denominator LCM(4, 5) = 20. Multiply cofactors: (15 — 8) / 20 = 7/20.",
          },
          hint: {
            kz: "4 пен 5 сандарының ортақ еселігі — 20.",
            ru: "Найди наименьшее общее кратное для 4 и 5 (это 20).",
            en: "Find the least common multiple of 4 and 5 (it is 20).",
          },
        },
      },
      {
        id: "alg-3",
        subjectId: "algebra",
        grade: 8,
        title: {
          kz: "Сызықтық теңдеулер мен теңсіздіктер",
          ru: "Линейные уравнения и неравенства",
          en: "Linear Equations & Inequalities",
        },
        desc: {
          kz: "Жақшалары және бөлшек коэффициенттері бар теңдеулерді шешу",
          ru: "Уравнения со скобками, дробными коэффициентами и перенос слагаемых",
          en: "Solving equations with parentheses and fractional coefficients",
        },
        status: "in_progress",
        score: 65,
        accuracy: 65,
        warningNote: {
          kz: "Бөлшек теңдеулерде қателер жиілеп тұр",
          ru: "Уравнения с дробями вызывают систематические ошибки",
          en: "Equations containing fractions produce repeated errors",
        },
        theory: {
          ruleTitle: {
            kz: "Мүшелерді таңбасын ауыстырып көшіру",
            ru: "Перенос слагаемых с противоположным знаком",
            en: "Transposing Terms Across the Equals Sign",
          },
          formula: "ax + b = c  =>  ax = c — b  =>  x = (c — b) / a",
          explanation: {
            kz: "Белгісіздерді сол жаққа, сандарды оң жаққа таңбасын қарама-қарсыға өзгертіп көшіреміз.",
            ru: "Переносим слагаемые с переменной влево, без переменной — вправо, обязательно меняя знак на противоположный.",
            en: "Move variable terms to the left, constant terms to the right, inverting their signs.",
          },
          commonTrap: {
            kz: "Теңдіктің арғы бетіне өткізгенде таңбасын өзгертуді ұмытып кету.",
            ru: "Забыть сменить плюс на минус при переносе слагаемого через знак равенства.",
            en: "Forgetting to flip the sign when moving a term across '='.",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Базалық арифметика", "Бөлшектермен амалдар"],
            ru: ["Базовая арифметика", "Действия с дробями"],
            en: ["Basic Arithmetic", "Fractions"],
          },
          unlocks: {
            kz: ["Квадрат теңдеулер", "Теңдеулер жүйесі"],
            ru: ["Квадратные уравнения", "Системы уравнений"],
            en: ["Quadratic Equations", "Systems of Equations"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Таразының екі табағы ⚖️",
            ru: "Аптекарские весы в равновесии ⚖️",
            en: "Balancing Scales ⚖️",
          },
          analogyBody: {
            kz: "Теңдеу — бұл тепе-тең тұрған таразы. Егер сол жағынан 5 кг алсаңыз, оң жағынан да 5 кг алу керек, әйтпесе тепе-теңдік бұзылады!",
            ru: "Знак равенства — это стрелка весов. Любая операция (вычитание, умножение, деление) должна выполняться строго над ОБЕИМИ сторонами уравнения!",
            en: "The equal sign is a balanced scale. Whatever operation you apply to one side must be identically applied to the other!",
          },
          keyTakeaway: {
            kz: "Екі жағына бірдей амал қолданыңыз!",
            ru: "Делай с обеими сторонами одно и то же действие!",
            en: "Always apply operations symmetrically to both sides!",
          },
        },
        quiz: {
          question: {
            kz: "Теңдеуді шешіңіз: 4x — 7 = 2x + 9",
            ru: "Решите уравнение: 4x — 7 = 2x + 9",
            en: "Solve for x: 4x — 7 = 2x + 9",
          },
          options: [
            { id: "A", text: "x = 8", isCorrect: true },
            { id: "B", text: "x = 1", isCorrect: false },
            { id: "C", text: "x = 16", isCorrect: false },
            { id: "D", text: "x = —8", isCorrect: false },
          ],
          explanation: {
            kz: "4x — 2x = 9 + 7  =>  2x = 16  =>  x = 8.",
            ru: "4x — 2x = 9 + 7  =>  2x = 16  =>  x = 8.",
            en: "4x — 2x = 9 + 7  =>  2x = 16  =>  x = 8.",
          },
          hint: {
            kz: "2x-ті солға —2x қылып, ал —7-ні оңға +7 қылып өткізіңіз.",
            ru: "Собери 2x влево с минусом, а —7 вправо с плюсом.",
            en: "Move 2x to the left with minus, and —7 to the right with plus.",
          },
        },
      },
      {
        id: "alg-4",
        subjectId: "algebra",
        grade: 9,
        title: {
          kz: "Квадрат теңдеулер және дискриминант",
          ru: "Квадратные уравнения и дискриминант",
          en: "Quadratic Equations & Discriminant",
        },
        desc: {
          kz: "Түбірлер формуласы, D = b² — 4ac, Виет теоремасы",
          ru: "Формула корней через дискриминант D = b² — 4ac, теорема Виета",
          en: "Roots formula via discriminant D = b² — 4ac, Vieta's theorem",
        },
        status: "locked",
        score: 0,
        warningNote: {
          kz: "Бастамас бұрын Бөлшектер мен Сызықтық теңдеулердегі пробелді жою қажет",
          ru: "Требует устранения пробела в Дробях перед стартом темы",
          en: "Requires resolving the Fractions gap before unlocking",
        },
        theory: {
          ruleTitle: {
            kz: "Дискриминант формуласы",
            ru: "Формула корней квадратного уравнения",
            en: "Quadratic Formula & Discriminant",
          },
          formula: "D = b² — 4ac,   x₁,₂ = (—b ± √D) / (2a)",
          explanation: {
            kz: "Егер D > 0 — 2 әртүрлі түбір; D = 0 — 1 түбір; D < 0 — нақты түбірлері жоқ.",
            ru: "Если D > 0 — два различных корня; если D = 0 — один корень; если D < 0 — действительных корней нет.",
            en: "If D > 0: two distinct real roots; if D = 0: one double root; if D < 0: no real roots.",
          },
          commonTrap: {
            kz: "—4ac есептегенде c теріс сан болғанда таңбадан шатасу.",
            ru: "Ошибки со знаками в —4ac: если c отрицательное, минус на минус дает плюс!",
            en: "Sign trap in —4ac: when c is negative, it turns into +4a|c|.",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Дроби и пропорции", "Сызықтық теңдеулер"],
            ru: ["Дроби и пропорции", "Линейные уравнения"],
            en: ["Fractions & Proportions", "Linear Equations"],
          },
          unlocks: {
            kz: ["Параболалар және функциялар", "Квадраттық теңсіздіктер"],
            ru: ["Квадратичные неравенства", "Графики парабол"],
            en: ["Quadratic Inequalities", "Parabola Graphing"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Футболдағы доптың ұшу траекториясы ⚽",
            ru: "Траектория футбольного мяча ⚽",
            en: "Flight Path of a Soccer Ball ⚽",
          },
          analogyBody: {
            kz: "Допты тепкенде ол парабола бойымен ұшып барып жерге түседі. Түбірлер (x₁ және x₂) — доптың ұшып шыққан және жерге түскен нүктелері!",
            ru: "Когда ты бьёшь по мячу, он взлетает и падает по параболе. Корни квадратного уравнения — это моменты, когда мяч касается земли (высота y = 0)!",
            en: "When you kick a ball, it arcs along a parabola. The roots (x₁, x₂) are the exact points where the ball touches the ground (height = 0)!",
          },
          keyTakeaway: {
            kz: "Дискриминант доптың жерге қанша рет тиетінін көрсетеді!",
            ru: "Дискриминант показывает, касается ли парабола оси земли!",
            en: "The discriminant determines whether the trajectory touches the ground!",
          },
        },
        quiz: {
          question: {
            kz: "x² — 5x + 6 = 0 теңдеуінің түбірлерін табыңыз:",
            ru: "Найдите корни уравнения x² — 5x + 6 = 0:",
            en: "Find the roots of x² — 5x + 6 = 0:",
          },
          options: [
            { id: "A", text: "x₁ = 2, x₂ = 3", isCorrect: true },
            { id: "B", text: "x₁ = —2, x₂ = —3", isCorrect: false },
            { id: "C", text: "x₁ = 1, x₂ = 6", isCorrect: false },
            { id: "D", text: "x₁ = —1, x₂ = —6", isCorrect: false },
          ],
          explanation: {
            kz: "Виет теоремасы бойынша: 2 + 3 = 5, 2 · 3 = 6. Түбірлері: 2 және 3.",
            ru: "По теореме Виета x₁ + x₂ = 5, x₁ · x₂ = 6. Подходят числа 2 и 3.",
            en: "By Vieta's theorem: x₁ + x₂ = 5, x₁ · x₂ = 6. The numbers are 2 and 3.",
          },
          hint: {
            kz: "Қосындысы 5, ал көбейтіндісі 6 болатын сандарды ойлаңыз.",
            ru: "Какие два числа в сумме дают 5, а при умножении 6?",
            en: "Which two numbers sum to 5 and multiply to 6?",
          },
        },
      },
    ],
  },
  {
    id: "geometry",
    minGrade: 7,
    name: {
      kz: "Геометрия",
      ru: "Геометрия",
      en: "Geometry",
    },
    icon: "architecture",
    categoryTag: {
      kz: "КЕҢІСТІК ЖӘНЕ ПІШІНДЕР КАРТАСЫ",
      ru: "КАРТА ПРОСТРАНСТВА И ФИГУР",
      en: "SPATIAL & SHAPE CARTOGRAPHY",
    },
    masteryScore: 48,
    masterySubtitle: {
      kz: "Планиметрия курсының 48%-ы меңгерілді",
      ru: "48% курса планиметрии освоено",
      en: "48% of planimetry syllabus mastered",
    },
    blockerCount: 3,
    diagnostic: {
      title: {
        kz: "ИИ диагностикасы: Пифагор теоремасы мен синустар",
        ru: "Диагностика ИИ: Теорема Пифагора и проекции",
        en: "AI Diagnostics: Pythagorean Theorem & Projections",
      },
      badge: {
        kz: "ГЕО-АУДИТ",
        ru: "ГЕО-АУДИТ",
        en: "GEO-AUDIT",
      },
      errorObservation: {
        kz: "Тікбұрышты үшбұрышта гипотенуза мен катеттерді анықтауда жиі қателіктер байқалды.",
        ru: "Студент часто путает гипотенузу с катетом при произвольном развороте треугольника.",
        en: "Student frequently confuses hypotenuse and legs when triangles are rotated.",
      },
      missedBaseTitle: {
        kz: "СЫНИ ТҮСІНІК:",
        ru: "КЛЮЧЕВОЕ ПРАВИЛО:",
        en: "KEY PRINCIPLE:",
      },
      missedBaseConcept: {
        kz: "Гипотенуза — әрқашан 90° тік бұрышқа қарама-қарсы жатқан ең ұзын қабырға.",
        ru: "Гипотенуза ВСЕГДА лежит строго напротив прямого угла (90°) и является самой длинной.",
        en: "Hypotenuse is ALWAYS strictly opposite the 90° right angle and is the longest side.",
      },
      impactTitle: {
        kz: "Салдары:",
        ru: "Влияние на темы:",
        en: "Impact on Modules:",
      },
      impactDesc: {
        kz: "Фигуралар ауданын табуға, стереометрияға және физикадағы күш векторларына тікелей әсер етеді.",
        ru: "Блокирует задачи на площади, трапеции, координатный метод и векторные проекции сил.",
        en: "Blocks polygon areas, trapezoids, coordinate method and force vector projections in Physics.",
      },
      startSprintBtn: {
        kz: "Пифагор теоремасы спринтін бастау 📐",
        ru: "Запустить экспресс-спринт по Теореме Пифагора 📐",
        en: "Launch Pythagorean Sprint 📐",
      },
      sprintSubtitle: {
        kz: "3 интерактивті есеп + тікбұрышты үшбұрыш лайфхагі",
        ru: "3 задачи на распознавание гипотенузы + египетский треугольник (3-4-5)",
        en: "3 identification challenges + 3-4-5 triangle cheat-sheet",
      },
      sprintLessonTitle: {
        kz: "Египет үшбұрышы және c² = a² + b²",
        ru: "Египетский треугольник и формула c² = a² + b²",
        en: "Egyptian Triangle and c² = a² + b²",
      },
      sprintLessonContent: {
        kz: "Тікбұрышты үшбұрышта: c² = a² + b². Егер катеттері 3 пен 4 болса, гипотенуза: √(9+16) = √25 = 5. Егер катеттері 6 мен 8 болса — гипотенуза 10!",
        ru: "В прямоугольном треугольнике квадрат гипотенузы равен сумме квадратов катетов: c² = a² + b². Если катеты 3 и 4, то гипотенуза √(9+16) = √25 = 5. Пропорция 3:4:5 спасает время на экзаменах!",
        en: "In a right triangle, hypotenuse squared equals sum of squares of legs: c² = a² + b². If legs are 3 and 4, hypotenuse is 5. Knowing the 3:4:5 ratio saves immense exam time!",
      },
    },
    topics: [
      {
        id: "geo-1",
        subjectId: "geometry",
        grade: 7,
        title: {
          kz: "Бұрыштар және үшбұрыштар қасиеттері",
          ru: "Углы и свойства треугольников",
          en: "Angles & Triangle Properties",
        },
        desc: {
          kz: "Ішкі бұрыштар қосындысы 180°, сыртқы бұрыштар, сыбайлас бұрыштар",
          ru: "Сумма углов треугольника 180°, вертикальные и смежные углы",
          en: "Sum of interior angles 180°, vertical & adjacent angles",
        },
        status: "mastered",
        score: 100,
        prereqNumber: "01",
        accuracy: 94,
        theory: {
          ruleTitle: {
            kz: "Үшбұрыштың ішкі бұрыштарының қосындысы",
            ru: "Сумма внутренних углов треугольника",
            en: "Triangle Angle Sum Theorem",
          },
          formula: "∠A + ∠B + ∠C = 180°",
          explanation: {
            kz: "Кез келген үшбұрыштың барлық үш ішкі бұрышының қосындысы әрқашан 180 градусқа тең.",
            ru: "Для абсолютно любого треугольника на плоскости сумма трех внутренних углов равна строго 180°.",
            en: "For any planar triangle, the sum of all three interior angles is always exactly 180°.",
          },
          commonTrap: {
            kz: "Тікбұрышты үшбұрышта сүйір бұрыштар қосындысы 90° екенін ұмыту.",
            ru: "Считать сумму углов четырехугольника как 180° вместо 360°.",
            en: "Confusing triangle angle sum (180°) with quadrilateral sum (360°).",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Нүкте, түзу және сәуле"],
            ru: ["Точки, прямые и отрезки"],
            en: ["Points, lines and rays"],
          },
          unlocks: {
            kz: ["Теорема Пифагора", "Төртбұрыштар"],
            ru: ["Теорема Пифагора", "Четырехугольники"],
            en: ["Pythagorean Theorem", "Quadrilaterals"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Компас және толық жарты шеңбер 🧭",
            ru: "Стрелка компаса и развернутый угол 🧭",
            en: "Compass & Straight Line 🧭",
          },
          analogyBody: {
            kz: "Үшбұрыштың барлық үш бұрышын қиып алып бір нүктеге біріктірсеңіз, олар дәл түзу сызықты (180°) құрайды!",
            ru: "Оторви три угла бумажного треугольника и сложи их вершинами в одной точке — получится идеальная прямая линия в 180°!",
            en: "Tear off the three corners of any paper triangle and line them up — they form a perfect straight angle of 180°!",
          },
          keyTakeaway: {
            kz: "Үш бұрыш = 180°!",
            ru: "Три угла всегда дают 180°!",
            en: "Three angles always make 180°!",
          },
        },
        quiz: {
          question: {
            kz: "Үшбұрыштың екі бұрышы 45° және 65°. Үшінші бұрышы нешеге тең?",
            ru: "Два угла треугольника равны 45° и 65°. Чему равен третий угол?",
            en: "Two angles of a triangle are 45° and 65°. Find the third angle:",
          },
          options: [
            { id: "A", text: "70°", isCorrect: true },
            { id: "B", text: "80°", isCorrect: false },
            { id: "C", text: "60°", isCorrect: false },
            { id: "D", text: "90°", isCorrect: false },
          ],
          explanation: {
            kz: "180° — (45° + 65°) = 180° — 110° = 70°.",
            ru: "180° — (45° + 65°) = 180° — 110° = 70°.",
            en: "180° — (45° + 65°) = 180° — 110° = 70°.",
          },
          hint: {
            kz: "180-нен белгілі екі бұрыштың қосындысын азайтыңыз.",
            ru: "Вычти из 180 сумму двух известных углов.",
            en: "Subtract the sum of the two known angles from 180.",
          },
        },
      },
      {
        id: "geo-2",
        subjectId: "geometry",
        grade: 8,
        title: {
          kz: "Теорема Пифагора және тригонометрия",
          ru: "Теорема Пифагора и тригонометрия",
          en: "Pythagorean Theorem & Trigonometry",
        },
        desc: {
          kz: "Тікбұрышты үшбұрыш, c² = a² + b², sin, cos, tg қатынастары",
          ru: "Квадрат гипотенузы, тригонометрические функции синус и косинус",
          en: "Right triangle hypotenuse, c² = a² + b², sine and cosine ratios",
        },
        status: "critical_gap",
        score: 38,
        blocksCount: 3,
        warningNote: {
          kz: "Гипотенуза мен катеттерді анықтауда 62% қателік бар",
          ru: "62% ошибок при нахождении катетов в перевернутых фигурах",
          en: "62% failure rate when identifying legs in rotated figures",
        },
        accuracy: 38,
        theory: {
          ruleTitle: {
            kz: "Пифагор формуласы",
            ru: "Теорема Пифагора для прямоугольного треугольника",
            en: "Pythagorean Theorem",
          },
          formula: "c² = a² + b²   =>   c = √(a² + b²),   a = √(c² — b²)",
          explanation: {
            kz: "Тікбұрышты үшбұрышта гипотенузаның квадраты катеттердің квадраттарының қосындысына тең.",
            ru: "В прямоугольном треугольнике квадрат гипотенузы равен сумме квадратов катетов.",
            en: "In a right triangle, the square of the hypotenuse equals the sum of squares of the legs.",
          },
          commonTrap: {
            kz: "Катетті тапқанда қосу амалын қолдану: a² = c² + b² деу қате!",
            ru: "Катет всегда ищется через ВЫЧИТАНИЕ: a² = c² — b², а не сложение!",
            en: "Legs are always found by SUBTRACTING: a² = c² — b², not addition!",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Үшбұрыштар қасиеттері", "Квадрат түбірлер"],
            ru: ["Свойства треугольников", "Квадратные корни"],
            en: ["Triangle Properties", "Square Roots"],
          },
          unlocks: {
            kz: ["Трапеция және көпбұрыштар ауданы", "Векторлар"],
            ru: ["Площади фигур", "Векторы и проекции"],
            en: ["Area of Polygons", "Vectors & Projections"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Ғимарат қабырғасына сүйелген саты 🪜",
            ru: "Приставная лестница у стены 🪜",
            en: "Ladder Leaning Against a Wall 🪜",
          },
          analogyBody: {
            kz: "Қабырға — бірінші катет (a), жер — екінші катет (b), ал сатының өзі — гипотенуза (c). Саты әрқашан екі катеттен де ұзын!",
            ru: "Стена дома — это вертикальный катет. Земля под ногами — горизонтальный катет. Лестница, соединяющая их — гипотенуза. Длина лестницы всегда больше любой из стен!",
            en: "The wall is the vertical leg, the ground is the horizontal leg, and the ladder is the hypotenuse. The ladder is always longer than either leg!",
          },
          keyTakeaway: {
            kz: "Гипотенуза әрқашан ең ұзын қабырға!",
            ru: "Гипотенуза всегда самая длинная сторона!",
            en: "The hypotenuse is strictly the longest side!",
          },
        },
        quiz: {
          question: {
            kz: "Тікбұрышты үшбұрыштың гипотенузасы 10 см, бір катеті 6 см. Екінші катеті нешеге тең?",
            ru: "Гипотенуза равна 10 см, а один из катетов равен 6 см. Найдите второй катет:",
            en: "A right triangle has hypotenuse 10 cm and one leg 6 cm. Find the other leg:",
          },
          options: [
            { id: "A", text: "8 см", isCorrect: true },
            { id: "B", text: "4 см", isCorrect: false },
            { id: "C", text: "16 см", isCorrect: false },
            { id: "D", text: "12 см", isCorrect: false },
          ],
          explanation: {
            kz: "b = √(10² — 6²) = √(100 — 36) = √64 = 8 см.",
            ru: "b = √(10² — 6²) = √(100 — 36) = √64 = 8 см.",
            en: "b = √(10² — 6²) = √(100 — 36) = √64 = 8 cm.",
          },
          hint: {
            kz: "Катетті табу үшін гипотенузаның квадратынан белгілі катеттің квадратын азайтыңыз.",
            ru: "Вычти 6² из 10² и извлеки корень.",
            en: "Subtract 6² from 10² and take the square root.",
          },
        },
      },
      {
        id: "geo-3",
        subjectId: "geometry",
        grade: 8,
        title: {
          kz: "Фигуралар ауданы (Трапеция, Параллелограмм)",
          ru: "Площади фигур (Трапеция, Параллелограмм)",
          en: "Area of Polygons (Trapezoid, Parallelogram)",
        },
        desc: {
          kz: "S = a·h, S = (a+b)/2 · h, ромб және үшбұрыш ауданы",
          ru: "Формулы площадей параллелограмма, треугольника и трапеции",
          en: "Formulas for areas of parallelogram, triangle and trapezoid",
        },
        status: "in_progress",
        score: 60,
        accuracy: 60,
        theory: {
          ruleTitle: {
            kz: "Трапеция ауданы",
            ru: "Площадь трапеции",
            en: "Area of a Trapezoid",
          },
          formula: "S = (a + b) / 2 · h",
          explanation: {
            kz: "Трапеция ауданы оның табандарының қосындысының жартысы мен биіктігінің көбейтіндісіне тең.",
            ru: "Площадь трапеции равна произведению полусуммы оснований на высоту.",
            en: "The area of a trapezoid equals the average of the bases multiplied by height.",
          },
          commonTrap: {
            kz: "Биіктіктің орнына бүйір қабырғасын көбейтіп жіберу.",
            ru: "Умножение на наклонную боковую сторону вместо перпендикулярной высоты!",
            en: "Multiplying by the slanted side instead of perpendicular height!",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Теорема Пифагора", "Төртбұрыштар"],
            ru: ["Теорема Пифагора", "Четырехугольники"],
            en: ["Pythagorean Theorem", "Quadrilaterals"],
          },
          unlocks: {
            kz: ["Стереометрия және көлемдер"],
            ru: ["Стереометрия и объемы многогранников"],
            en: ["Solid Geometry & Volumes"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Екі трапециядан параллелограмм құрастыру 🧩",
            ru: "Параллелограмм из двух одинаковых трапеций 🧩",
            en: "Parallelogram from Two Identical Trapezoids 🧩",
          },
          analogyBody: {
            kz: "Екі бірдей трапецияны біріктірсеңіз, табаны (a+b) болатын үлкен параллелограмм шығады. Бір трапеция оның дәл жартысы!",
            ru: "Сложи две одинаковые трапеции валетом — получится параллелограмм с основанием (a + b) и высотой h. Значит одна трапеция ровно половина: (a+b)/2 · h!",
            en: "Glue two identical trapezoids together upside down — they form a parallelogram of base (a+b) and height h. One trapezoid is exactly half!",
          },
          keyTakeaway: {
            kz: "Орта сызық · биіктік!",
            ru: "Средняя линия умножить на высоту!",
            en: "Midsegment times height!",
          },
        },
        quiz: {
          question: {
            kz: "Трапеция табандары 4 см және 10 см, биіктігі 5 см. Ауданы нешеге тең?",
            ru: "Основания трапеции равны 4 см и 10 см, высота 5 см. Найдите её площадь:",
            en: "Bases of a trapezoid are 4 cm and 10 cm, height is 5 cm. Find its area:",
          },
          options: [
            { id: "A", text: "35 см²", isCorrect: true },
            { id: "B", text: "70 см²", isCorrect: false },
            { id: "C", text: "28 см²", isCorrect: false },
            { id: "D", text: "45 см²", isCorrect: false },
          ],
          explanation: {
            kz: "S = (4 + 10) / 2 · 5 = 14 / 2 · 5 = 7 · 5 = 35 см².",
            ru: "S = (4 + 10) / 2 · 5 = 7 · 5 = 35 см².",
            en: "S = (4 + 10) / 2 · 5 = 7 · 5 = 35 cm².",
          },
          hint: {
            kz: "Табандарын қосып (14), 2-ге бөліңіз, содан соң биіктікке көбейтіңіз.",
            ru: "Сложи основания (14), раздели на 2 (получишь 7) и умножь на высоту.",
            en: "Add the bases (14), divide by 2 (gets 7), multiply by height.",
          },
        },
      },
    ],
  },
  {
    id: "physics",
    minGrade: 8,
    name: {
      kz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    icon: "bolt",
    categoryTag: {
      kz: "ТАБИҒАТ ЖӘНЕ ҚОЗҒАЛЫС ЗАҢДАРЫ",
      ru: "ЗАКОНЫ ПРИРОДЫ И ДВИЖЕНИЯ",
      en: "LAWS OF NATURE & MOTION",
    },
    masteryScore: 62,
    masterySubtitle: {
      kz: "7–8 сынып физикасының 62%-ы меңгерілді",
      ru: "62% программы физики 7–8 классов освоено",
      en: "62% of Grades 7–8 physics syllabus mastered",
    },
    blockerCount: 1,
    diagnostic: {
      title: {
        kz: "ИИ диагностикасы: Тізбектер және Ом заңы",
        ru: "Диагностика ИИ: Закон Ома и параллельные цепи",
        en: "AI Diagnostics: Ohm's Law & Parallel Circuits",
      },
      badge: {
        kz: "ФИЗ-АУДИТ",
        ru: "ФИЗ-АУДИТ",
        en: "PHYS-AUDIT",
      },
      errorObservation: {
        kz: "Параллель жалғауда жалпы кедергіні 1/R = 1/R₁ + 1/R₂ есептеуде бөлшектерді қосудан қателер кездеседі.",
        ru: "Ошибки при расчете параллельного сопротивления возникают из-за сложения дробей в знаменателе.",
        en: "Errors in parallel resistance calculation stem from algebraic fractions addition in the denominator.",
      },
      missedBaseTitle: {
        kz: "САБАҚТАС ПРОБЕЛ:",
        ru: "МЕЖПРЕДМЕТНЫЙ ПРОБЕЛ:",
        en: "INTERDISCIPLINARY GAP:",
      },
      missedBaseConcept: {
        kz: "Алгебрадағы бөлшектерді ортақ бөлімге келтіру (НОК).",
        ru: "Приведение алгебраических дробей к общему знаменателю из курса Алгебры.",
        en: "Finding common denominators in algebraic fractions from Algebra.",
      },
      impactTitle: {
        kz: "Физикалық маңызы:",
        ru: "Физическое значение:",
        en: "Physical Significance:",
      },
      impactDesc: {
        kz: "Электр тізбектерін, ток күшін және қуатты есептеуге тікелей байланысты.",
        ru: "Блокирует расчет электрических цепей, теплового действия тока и мощности потребителей.",
        en: "Blocks electrical circuit analysis, Joule heating and consumer wattage calculations.",
      },
      startSprintBtn: {
        kz: "Электр тізбектері спринтін бастау ⚡",
        ru: "Запустить спринт по электрическим цепям ⚡",
        en: "Launch Circuit Sprint ⚡",
      },
      sprintSubtitle: {
        kz: "Ом заңы + параллель жалғаудың жылдам формуласы: R = (R₁·R₂)/(R₁+R₂)",
        ru: "Ом заңы + формула быстрого счета R = (R₁·R₂)/(R₁+R₂)",
        en: "Ohm's Law + quick calculation formula R = (R₁·R₂)/(R₁+R₂)",
      },
      sprintLessonTitle: {
        kz: "Параллель тізбектің құпиясы",
        ru: "Секрет параллельного сопротивления",
        en: "Secret of Parallel Resistance",
      },
      sprintLessonContent: {
        kz: "Екі кедергі параллель қосылғанда, олардың жалпы кедергісі әрқашан ең кішісінен де кіші болады! Жылдам формула: R = (R₁ · R₂) / (R₁ + R₂). Мысалы 6 Ом және 3 Ом: (6·3)/(6+3) = 18/9 = 2 Ом!",
        ru: "При параллельном соединении двух резисторов их эквивалентное сопротивление всегда МЕНЬШЕ наименьшего! Удобная формула: R = (R₁ · R₂) / (R₁ + R₂). Для 6 Ом и 3 Ом: (18)/9 = 2 Ом!",
        en: "When two resistors are parallel, the total resistance is strictly LESS than the smallest one! Fast formula: R = (R₁ · R₂) / (R₁ + R₂). For 6Ω and 3Ω: (18)/9 = 2Ω!",
      },
    },
    topics: [
      {
        id: "phys-1",
        subjectId: "physics",
        grade: 7,
        title: {
          kz: "Бірқалыпты түзусызықты қозғалыс",
          ru: "Равномерное прямолинейное движение",
          en: "Uniform Linear Motion",
        },
        desc: {
          kz: "Жылдамдық v = s/t, орын ауыстыру, графиктерден жылдамдықты табу",
          ru: "Скорость v = s/t, перемещение, путь и чтение графиков движения",
          en: "Velocity v = s/t, displacement, and interpreting motion graphs",
        },
        status: "mastered",
        score: 100,
        prereqNumber: "01",
        accuracy: 96,
        theory: {
          ruleTitle: {
            kz: "Жылдамдық формуласы",
            ru: "Формула скорости равномерного движения",
            en: "Uniform Motion Velocity Formula",
          },
          formula: "v = s / t,   s = v · t,   t = s / v",
          explanation: {
            kz: "Жылдамдық — уақыт бірлігінде жүріп өткен жол.",
            ru: "Скорость показывает, какое расстояние проходит тело за единицу времени.",
            en: "Velocity indicates how much distance an object traverses per unit time.",
          },
          commonTrap: {
            kz: "км/сағ бірлігін м/с бірлігіне аударуды ұмыту (3.6-ға бөлу керек).",
            ru: "Забыть перевести км/ч в м/с: нужно разделить значение на 3,6!",
            en: "Forgetting to convert km/h to m/s by dividing by 3.6!",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Базалық арифметика"],
            ru: ["Базовая арифметика"],
            en: ["Basic Arithmetic"],
          },
          unlocks: {
            kz: ["Ньютон заңдары", "Импульс"],
            ru: ["Законы Ньютона", "Импульс тела"],
            en: ["Newton's Laws", "Momentum"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Автомобильдің круиз-бақылауы 🚗",
            ru: "Круиз-контроль на трассе 🚗",
            en: "Highway Cruise Control 🚗",
          },
          analogyBody: {
            kz: "Егер автокөлік 90 км/сағ жылдамдықпен круизде кетіп бара жатса, ол әр сағатта дәл 90 км жүріп өтеді.",
            ru: "На круиз-контроле стрелка спидометра застыла на 90 км/ч. Каждую минуту автомобиль проезжает абсолютно равные отрезки дороги!",
            en: "With cruise control locked at 90 km/h, the car covers identical distance increments every single minute!",
          },
          keyTakeaway: {
            kz: "Жылдамдық тұрақты, үдеу жоқ!",
            ru: "Скорость постоянна, ускорение равно нулю!",
            en: "Velocity is constant, acceleration is zero!",
          },
        },
        quiz: {
          question: {
            kz: "Автомобиль 72 км/сағ жылдамдықпен 10 секунд жүрді. Ол қанша метр жол жүрді?",
            ru: "Автомобиль движется со скоростью 72 км/ч. Какой путь в метрах он пройдет за 10 секунд?",
            en: "A car moves at 72 km/h. How many meters will it travel in 10 seconds?",
          },
          options: [
            { id: "A", text: "200 м", isCorrect: true },
            { id: "B", text: "720 м", isCorrect: false },
            { id: "C", text: "120 м", isCorrect: false },
            { id: "D", text: "500 м", isCorrect: false },
          ],
          explanation: {
            kz: "72 км/сағ = 72 / 3.6 = 20 м/с. s = 20 · 10 = 200 м.",
            ru: "72 км/ч = 72 / 3,6 = 20 м/с. Путь s = 20 м/с · 10 с = 200 м.",
            en: "72 km/h = 72 / 3.6 = 20 m/s. Distance s = 20 m/s · 10 s = 200 m.",
          },
          hint: {
            kz: "Алдымен 72-ні 3.6-ға бөліп м/с-қа аударыңыз.",
            ru: "Сначала переведи 72 км/ч в м/с (раздели на 3,6).",
            en: "First convert 72 km/h to m/s (divide by 3.6).",
          },
        },
      },
      {
        id: "phys-2",
        subjectId: "physics",
        grade: 8,
        title: {
          kz: "Ом заңы және өткізгіштерді параллель жалғау",
          ru: "Закон Ома и параллельное соединение",
          en: "Ohm's Law & Parallel Circuit Analysis",
        },
        desc: {
          kz: "I = U / R, параллель жалғауда 1/R = 1/R₁ + 1/R₂, кернеу тұрақты",
          ru: "Сила тока, напряжение, эквивалентное сопротивление цепи",
          en: "Current, voltage, equivalent resistance in electrical circuits",
        },
        status: "critical_gap",
        score: 35,
        blocksCount: 1,
        warningNote: {
          kz: "Алгебрадағы бөлшектерді қосу қатесінен туындаған пробел",
          ru: "Пробел вызван ошибками сложения дробей из курса Алгебры",
          en: "Gap rooted in fraction summation difficulties from Algebra",
        },
        accuracy: 35,
        theory: {
          ruleTitle: {
            kz: "Тізбек бөлігі үшін Ом заңы",
            ru: "Закон Ома для участка цепи",
            en: "Ohm's Law for a Circuit Section",
          },
          formula: "I = U / R,   R_пар = (R₁ · R₂) / (R₁ + R₂)",
          explanation: {
            kz: "Ток күші кернеуге тура пропорционал, ал кедергіге кері пропорционал.",
            ru: "Сила тока прямо пропорциональна напряжению и обратно пропорциональна сопротивлению.",
            en: "Current is directly proportional to voltage and inversely proportional to resistance.",
          },
          commonTrap: {
            kz: "Параллель жалғауда кедергілерді жай қосып R = R₁ + R₂ деу (бұл тек тізбектей жалғауға арналған!).",
            ru: "Складывать сопротивления напрямую при параллельном соединении!",
            en: "Adding resistances directly in a parallel circuit!",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Алгебра: Бөлшектер мен НОК", "Электр заряды"],
            ru: ["Алгебра: Дроби и НОК", "Электрический заряд"],
            en: ["Algebra: Fractions & LCM", "Electric Charge"],
          },
          unlocks: {
            kz: ["Электр тогының жұмысы мен қуаты", "Джоуль-Ленц заңы"],
            ru: ["Работа и мощность тока", "Закон Джоуля-Ленца"],
            en: ["Electrical Work & Power", "Joule-Lenz Law"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Су құбырлары және крандар 🚰",
            ru: "Водопроводные трубы и краны 🚰",
            en: "Water Pipes & Valves 🚰",
          },
          analogyBody: {
            kz: "Кернеу (U) — су қысымы. Ток (I) — ағып жатқан судың көлемі. Кедергі (R) — құбырдың жіңішкелігі. Екі құбырды қатар ашсаңыз (параллель), су әлдеқайда оңай ағады, кедергі азаяды!",
            ru: "Напряжение — напор воды. Ток — поток воды в литрах. Сопротивление — сужение трубы. Если открыть вторую параллельную трубу — воде станет легче течь, общее сопротивление УПАДЕТ!",
            en: "Voltage is water pressure, current is water flow rate, resistance is pipe constriction. Opening a parallel pipe lets water flow easier, lowering overall resistance!",
          },
          keyTakeaway: {
            kz: "Параллель қосқанда жалпы кедергі кемиді!",
            ru: "При параллельном включении сопротивление уменьшается!",
            en: "Parallel connection reduces total resistance!",
          },
        },
        quiz: {
          question: {
            kz: "6 Ом және 12 Ом екі резистор параллель қосылған. Жалпы кедергі нешеге тең?",
            ru: "Два резистора по 6 Ом и 12 Ом соединены параллельно. Чему равно общее сопротивление?",
            en: "Two resistors of 6Ω and 12Ω are connected in parallel. What is the total resistance?",
          },
          options: [
            { id: "A", text: "4 Ом", isCorrect: true },
            { id: "B", text: "18 Ом", isCorrect: false },
            { id: "C", text: "9 Ом", isCorrect: false },
            { id: "D", text: "3 Ом", isCorrect: false },
          ],
          explanation: {
            kz: "R = (6 · 12) / (6 + 12) = 72 / 18 = 4 Ом.",
            ru: "R = (6 · 12) / (6 + 12) = 72 / 18 = 4 Ом.",
            en: "R = (6 · 12) / (6 + 12) = 72 / 18 = 4 Ω.",
          },
          hint: {
            kz: "Көбейтіндісін қосындысына бөліңіз: (6·12) / (6+12).",
            ru: "Используй формулу: (R₁ · R₂) / (R₁ + R₂).",
            en: "Use the formula: (R₁ · R₂) / (R₁ + R₂).",
          },
        },
      },
    ],
  },
  {
    id: "cs",
    minGrade: 9,
    name: {
      kz: "Информатика",
      ru: "Информатика",
      en: "Computer Science",
    },
    icon: "terminal",
    categoryTag: {
      kz: "АЛГОРИТМДЕР МЕН PYTHON",
      ru: "АЛГОРИТМЫ И PYTHON",
      en: "ALGORITHMS & PYTHON",
    },
    masteryScore: 85,
    masterySubtitle: {
      kz: "Python бағдарламалау курсының 85%-ы меңгерілді",
      ru: "85% курса программирования на Python освоено",
      en: "85% of Python programming syllabus mastered",
    },
    blockerCount: 0,
    diagnostic: {
      title: {
        kz: "ИИ диагностикасы: Тамаша нәтиже!",
        ru: "Диагностика ИИ: Отличный прогресс!",
        en: "AI Diagnostics: Excellent Progress!",
      },
      badge: {
        kz: "IT-АУДИТ",
        ru: "IT-АУДИТ",
        en: "IT-AUDIT",
      },
      errorObservation: {
        kz: "Негізгі алгоритмдер мен циклдерде сыни қателер жоқ. Тек рекурсия тереңдігіне назар аудару ұсынылады.",
        ru: "Критических пробелов нет! Логика ветвлений и циклов for/while усвоена уверенно. Рекомендуется практиковать рекурсию.",
        en: "No critical blockers! Logic gates, branches and loops mastered confidently. Next recommended focus is recursion.",
      },
      missedBaseTitle: {
        kz: "КЕЛЕСІ ДЕҢГЕЙ:",
        ru: "СЛЕДУЮЩИЙ УРОВЕНЬ:",
        en: "NEXT LEVEL:",
      },
      missedBaseConcept: {
        kz: "Деректер құрылымдары: стек, кезек және екілік ағаштар.",
        ru: "Структуры данных: стек, очередь и бинарные деревья поиска.",
        en: "Data structures: stack, queue and binary search trees.",
      },
      impactTitle: {
        kz: "Олимпиадалық дайындық:",
        ru: "Олимпиадная подготовка:",
        en: "Competitive Programming:",
      },
      impactDesc: {
        kz: "Алгоритмдік күрделілік O(N log N) тақырыбына өтуге толық дайынсыз.",
        ru: "Открывает путь к алгоритмам сложности O(N log N) и графовым задачам.",
        en: "Unlocks transition to O(N log N) algorithms and graph challenges.",
      },
      startSprintBtn: {
        kz: "Python алгоритмдер блицін бастау 💻",
        ru: "Запустить блиц по алгоритмам Python 💻",
        en: "Launch Python Algorithms Blitz 💻",
      },
      sprintSubtitle: {
        kz: "3 практикалық сұрақ: циклдер және тізімдер (list comprehension)",
        ru: "3 практические задачи: циклы, срезы и list comprehension",
        en: "3 practical challenges: loops, slices and list comprehensions",
      },
      sprintLessonTitle: {
        kz: "Python тізімдері және инверсия",
        ru: "Срезы списков в Python и генераторы",
        en: "Python List Slices & Comprehensions",
      },
      sprintLessonContent: {
        kz: "Python-да тізімді кері төңкеру үшін my_list[::-1] синтаксисі қолданылады. Ал жұп сандарды сүзу: [x for x in nums if x % 2 == 0]!",
        ru: "В Python разворот строки или списка делается через срез arr[::-1]. А отфильтровать четные элементы можно компактно: [x for x in nums if x % 2 == 0]!",
        en: "In Python, reverse any list with slice arr[::-1]. Filter even numbers cleanly: [x for x in nums if x % 2 == 0]!",
      },
    },
    topics: [
      {
        id: "cs-1",
        subjectId: "cs",
        grade: 8,
        title: {
          kz: "Екілік жүйе және логикалық амалдар",
          ru: "Двоичная система и логические операции",
          en: "Binary System & Boolean Logic",
        },
        desc: {
          kz: "AND, OR, NOT логикалық қақпалары, шындық кестелері, 2-лік санау",
          ru: "Логические операции И, ИЛИ, НЕ, таблицы истинности, перевод систем счисления",
          en: "Logic gates AND, OR, NOT, truth tables, binary conversions",
        },
        status: "mastered",
        score: 100,
        prereqNumber: "01",
        accuracy: 98,
        theory: {
          ruleTitle: {
            kz: "Логикалық И және ИЛИ",
            ru: "Таблица истинности для AND и OR",
            en: "Truth Tables for AND and OR",
          },
          formula: "A AND B = 1 (тек екеуі де 1 болғанда),  A OR B = 1 (кем дегенде біреуі 1 болғанда)",
          explanation: {
            kz: "AND амалы көбейту сияқты, ал OR амалы логикалық қосу сияқты жұмыс істейді.",
            ru: "Операция И истинна ТОЛЬКО когда оба операнда истинны. Операция ИЛИ истинна, если хотя бы один операнд истинен.",
            en: "AND is true ONLY when both operands are true. OR is true if at least one operand is true.",
          },
          commonTrap: {
            kz: "NOT амалы бүкіл өрнектің мәнін қарама-қарсыға аударатынын ұмыту.",
            ru: "Забывать приоритет: отрицание NOT выполняется раньше, чем AND, а AND раньше, чем OR.",
            en: "Forgetting precedence: NOT binds tighter than AND, and AND binds tighter than OR.",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Базалық арифметика"],
            ru: ["Базовая арифметика"],
            en: ["Basic Arithmetic"],
          },
          unlocks: {
            kz: ["Python-дағы шартты операторлар if-else"],
            ru: ["Ветвления if-else в Python"],
            en: ["Conditionals if-else in Python"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Үйдегі жарық қосқыштары 💡",
            ru: "Выключатели света в коридоре 💡",
            en: "Hallway Light Switches 💡",
          },
          analogyBody: {
            kz: "Екі қосқыш тізбектей жалғанса (AND) — жарық тек екеуін бірдей қосқанда жанады. Егер қатар жалғанса (OR) — кез келген біреуін қосу жеткілікті!",
            ru: "Последовательные выключатели (AND) зажгут лампочку, только если включены ОБА. Параллельные (OR) зажгут лампу, если нажат хотя бы ОДИН!",
            en: "Two switches in series (AND) turn on the lamp only if BOTH are ON. In parallel (OR), EITHER switch turns it ON!",
          },
          keyTakeaway: {
            kz: "AND — екеуі де, OR — тым болмаса біреуі!",
            ru: "AND — строго оба, OR — хотя бы один!",
            en: "AND requires both, OR requires at least one!",
          },
        },
        quiz: {
          question: {
            kz: "1011 екілік санын ондық санау жүйесіне аударыңыз:",
            ru: "Переведите двоичное число 1011 в десятичную систему счисления:",
            en: "Convert the binary number 1011 to decimal:",
          },
          options: [
            { id: "A", text: "11", isCorrect: true },
            { id: "B", text: "13", isCorrect: false },
            { id: "C", text: "9", isCorrect: false },
            { id: "D", text: "15", isCorrect: false },
          ],
          explanation: {
            kz: "1·2³ + 0·2² + 1·2¹ + 1·2⁰ = 8 + 0 + 2 + 1 = 11.",
            ru: "1·8 + 0·4 + 1·2 + 1·1 = 8 + 2 + 1 = 11.",
            en: "1·8 + 0·4 + 1·2 + 1·1 = 8 + 2 + 1 = 11.",
          },
          hint: {
            kz: "Разрядтары: оңнан солға 1, 2, 4, 8 дәрежелері.",
            ru: "Сложи веса разрядов с единицами: 8 + 2 + 1.",
            en: "Add the active place values: 8 + 2 + 1.",
          },
        },
      },
      {
        id: "cs-2",
        subjectId: "cs",
        grade: 9,
        title: {
          kz: "Циклдер және тізімдерді өңдеу (Python)",
          ru: "Циклы for/while и обработка списков",
          en: "Loops for/while & List Processing in Python",
        },
        desc: {
          kz: "range(), break, continue, тізімдерді сұрыптау және сүзгілеу",
          ru: "Итерации for, условия while, генераторы списков, срезы [::]",
          en: "for iterations, while conditions, list comprehensions, slicing",
        },
        status: "in_progress",
        score: 72,
        accuracy: 72,
        theory: {
          ruleTitle: {
            kz: "range(start, stop, step) қадамы",
            ru: "Функция range(start, stop, step)",
            en: "Function range(start, stop, step)",
          },
          formula: "for i in range(2, 10, 2):  # [2, 4, 6, 8]",
          explanation: {
            kz: "range() функциясының үшінші параметрі — қадам (step). Соңғы stop мәні нәтижеге кірмейді!",
            ru: "Помни: правая граница stop НЕ включается в диапазон. Третий аргумент задает шаг.",
            en: "Remember: the stop bound is exclusive. The third argument specifies step size.",
          },
          commonTrap: {
            kz: "range(1, 5) ішінде 5 саны бар деп ойлау (шын мәнінде ол 1, 2, 3, 4).",
            ru: "Думать, что range(1, 5) дойдет до 5 (на самом деле он остановится на 4).",
            en: "Assuming range(1, 5) includes 5 (it stops at 4).",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Айнымалылар және if-else"],
            ru: ["Переменные и ветвления if"],
            en: ["Variables & Conditionals"],
          },
          unlocks: {
            kz: ["Функциялар және алгоритмдік күрделілік"],
            ru: ["Функции и алгоритмическая сложность"],
            en: ["Functions and Big-O Complexity"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Зауыттың конвейер таспасы 🏭",
            ru: "Конвейерная лента на заводе 🏭",
            en: "Factory Conveyor Belt 🏭",
          },
          analogyBody: {
            kz: "Цикл for — бұл конвейермен келе жатқан әрбір бұйымға бірдей әрекет жасау (мысалы бояу немесе тексеру).",
            ru: "Цикл for по списку — это как робот над конвейером: берет каждую деталь по очереди, делает операцию и переходит к следующей!",
            en: "A for loop is like an assembly robot: it inspects each incoming part in sequence, applies an action, and moves forward!",
          },
          keyTakeaway: {
            kz: "Цикл қайталанатын жұмысты автоматтандырады!",
            ru: "Цикл берет рутину перебора на себя!",
            en: "Loops automate iterative sequences cleanly!",
          },
        },
        quiz: {
          question: {
            kz: "Код орындалған соң s нешеге тең болады?  s = 0; for i in range(1, 4): s += i",
            ru: "Чему равно значение s после выполнения кода?  s = 0; for i in range(1, 4): s += i",
            en: "What is the value of s after execution?  s = 0; for i in range(1, 4): s += i",
          },
          options: [
            { id: "A", text: "6", isCorrect: true },
            { id: "B", text: "10", isCorrect: false },
            { id: "C", text: "3", isCorrect: false },
            { id: "D", text: "4", isCorrect: false },
          ],
          explanation: {
            kz: "range(1, 4) — бұл 1, 2, 3 сандары. s = 0 + 1 + 2 + 3 = 6.",
            ru: "range(1, 4) генерирует числа 1, 2, 3. Сумма: 1 + 2 + 3 = 6.",
            en: "range(1, 4) produces 1, 2, 3. The sum is 1 + 2 + 3 = 6.",
          },
          hint: {
            kz: "range(1, 4) тізіміндегі сандарды қосыңыз (4 кірмейді).",
            ru: "Сложи числа 1, 2 и 3 (число 4 не входит).",
            en: "Add the integers 1, 2, and 3 (4 is excluded).",
          },
        },
      },
    ],
  },

  // 5. English Language
  {
    id: "english",
    minGrade: 5,
    name: {
      kz: "Ағылшын тілі",
      ru: "Английский язык",
      en: "English",
    },
    icon: "translate",
    categoryTag: {
      kz: "ТІЛДІК КОМПЕТЕНЦИЯ ЖӘНЕ ГРАММАТИКА",
      ru: "ЯЗЫКОВАЯ КОМПЕТЕНЦИЯ И ГРАММАТИКА",
      en: "LANGUAGE MASTERY & GRAMMAR",
    },
    masteryScore: 82,
    masterySubtitle: {
      kz: "Грамматика мен лексиканың 82%-ы меңгерілді",
      ru: "82% грамматических конструкций освоено",
      en: "82% of core grammar structures mastered",
    },
    blockerCount: 1,
    diagnostic: {
      title: {
        kz: "ИИ диагностикасы: Шақтардың сәйкестігі",
        ru: "Диагностика ИИ: Согласование времен и маркеры",
        en: "AI Diagnostics: Tense Agreement & Markers",
      },
      badge: {
        kz: "ЛИНГВО-АУДИТ",
        ru: "ЛИНГВО-АУДИТ",
        en: "LINGUO-AUDIT",
      },
      errorObservation: {
        kz: "Present Perfect пен Past Simple арасындағы айырмашылықтарда қателер байқалады.",
        ru: "Зафиксированы неточности в различении Present Perfect и Past Simple при наличии маркеров времени.",
        en: "Inconsistencies detected when differentiating Present Perfect and Past Simple.",
      },
      missedBaseTitle: {
        kz: "Базалық маркерлер",
        ru: "Базовые маркеры времени",
        en: "Core Time Markers",
      },
      missedBaseConcept: {
        kz: "since / for / already vs yesterday / in 2020",
        ru: "since / for / already против yesterday / in 2020",
        en: "since / for / already vs yesterday / in 2020",
      },
      impactTitle: {
        kz: "Бұл неге әсер етеді?",
        ru: "На что это влияет?",
        en: "What does this impact?",
      },
      impactDesc: {
        kz: "Академиялық эссе жазу және халықаралық емтихандарда (IELTS/SAT) сөйлем құрылымына әсер етеді.",
        ru: "Влияет на грамотность письменной речи, эссе и результаты международных тестов (IELTS/SAT).",
        en: "Affects essay writing clarity and performance in English exams.",
      },
      startSprintBtn: {
        kz: "Ағылшын спринтін бастау (3 мин)",
        ru: "Запустить экспресс-спринт (3 мин)",
        en: "Start Express Sprint (3 min)",
      },
      sprintSubtitle: {
        kz: "Present Perfect пен Past Simple ережелерін бекіту",
        ru: "Закрепление Present Perfect и маркеров времени",
        en: "Mastering Present Perfect and time markers",
      },
      sprintLessonTitle: {
        kz: "Ереже: Нәтиже vs Өткен нақты уақыт",
        ru: "Правило: Результат сейчас vs Законченное прошлое",
        en: "Rule: Present Result vs Finished Past",
      },
      sprintLessonContent: {
        kz: "Егер нақты уақыт көрсетілсе (yesterday, in 2018, 5 days ago) ⟶ Past Simple (V2). Егер нәтиже қазір маңызды болса немесе since/already/ever болса ⟶ have/has + V3.",
        ru: "Если указано точное завершенное время (yesterday, in 2018, ago) ⟶ Past Simple (V2). Если важен результат к настоящему моменту или есть маркеры since/already ⟶ have/has + V3.",
        en: "Use Past Simple (V2) for finished past times (yesterday, ago). Use Present Perfect (have/has + V3) for experiences and actions connected to the present.",
      },
    },
    topics: [
      {
        id: "eng_tenses",
        subjectId: "english",
        grade: 8,
        title: {
          kz: "Present Perfect vs Past Simple",
          ru: "Present Perfect vs Past Simple",
          en: "Present Perfect vs Past Simple",
        },
        desc: {
          kz: "Қазіргі нәтиже мен өткен нақты уақытты ажырату ережелері",
          ru: "Различие результата к настоящему моменту и завершенного прошлого действия",
          en: "Distinguishing present relevance from finished past actions",
        },
        status: "critical_gap",
        score: 64,
        prereqNumber: "E-1",
        blocksCount: 3,
        accuracy: 64,
        warningNote: {
          kz: "Маркерлерді (since, yesterday) шатастыру қаупі бар",
          ru: "Частая путаница с маркерами времени since и yesterday",
          en: "Frequent confusion with since vs yesterday",
        },
        theory: {
          ruleTitle: {
            kz: "have/has + V3 формуласы",
            ru: "Формула have/has + V3 и маркеры времени",
            en: "Formula have/has + V3 & Time Markers",
          },
          formula: "Present Perfect: have/has + V3  |  Past Simple: V2 / -ed",
          explanation: {
            kz: "Present Perfect іс-әрекеттің қашан болғанын емес, оның қазіргі нәтижесін көрсетеді.",
            ru: "Present Perfect подчеркивает факт совершения действия или его результат к текущему моменту.",
            en: "Present Perfect emphasizes current connection or completion by now.",
          },
          commonTrap: {
            kz: "yesterday, ago сөздерімен have + V3 қолдану (қате: I have seen him yesterday)!",
            ru: "Употреблять have + V3 со словами точного времени: 'I have seen him yesterday' — грубая ошибка!",
            en: "Using have + V3 with specific past markers like 'yesterday' or 'in 2015'!",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Present Simple", "Past Simple дұрыс емес етістіктер"],
            ru: ["Present Simple", "Неправильные глаголы Past Simple"],
            en: ["Present Simple", "Irregular Verbs in Past Simple"],
          },
          unlocks: {
            kz: ["Past Perfect", "Шақтардың қиысуы (Reported Speech)"],
            ru: ["Past Perfect", "Согласование времен в косвенной речи"],
            en: ["Past Perfect", "Reported Speech Sequence of Tenses"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Смартфонның хабарламасы (Notification) 📱",
            ru: "Уведомление на телефоне 📱",
            en: "Phone Notification 📱",
          },
          analogyBody: {
            kz: "Present Perfect — бұл экрандағы белсенді хабарлама: оқиға өткенде басталса да, нәтижесі дәл қазір экранда көрініп тұр!",
            ru: "Present Perfect — как пуш-уведомление на экране: действие произошло чуть раньше, но результат прямо перед глазами сейчас!",
            en: "Present Perfect is like an active push notification: action happened earlier, but its impact is live right now!",
          },
          keyTakeaway: {
            kz: "Нәтиже қазір бар ма? ⟶ have/has + V3!",
            ru: "Важен текущий результат? ⟶ have/has + V3!",
            en: "Relevant to now? ⟶ have/has + V3!",
          },
        },
        quiz: {
          question: {
            kz: "Сөйлемді аяқтаңыз: \"I _____ this movie three times already.\"",
            ru: "Заполните пропуск: \"I _____ this movie three times already.\"",
            en: "Complete the sentence: \"I _____ this movie three times already.\"",
          },
          options: [
            { id: "A", text: "have seen", isCorrect: true },
            { id: "B", text: "saw", isCorrect: false },
            { id: "C", text: "am seeing", isCorrect: false },
            { id: "D", text: "had seen", isCorrect: false },
          ],
          explanation: {
            kz: "\"already\" маркері Present Perfect шағын талап етеді: I have seen.",
            ru: "Маркер 'already' (уже) указывает на личный опыт к настоящему моменту -> have seen.",
            en: "'already' marks experience up to now -> have seen.",
          },
          hint: {
            kz: "\"already\" маркеріне қараңыз.",
            ru: "Обратите внимание на слово 'already'.",
            en: "Notice the keyword 'already'.",
          },
        },
      },
      {
        id: "eng_conditionals",
        subjectId: "english",
        grade: 9,
        title: {
          kz: "Conditionals (Шартты сөйлемдер)",
          ru: "First & Second Conditionals",
          en: "First & Second Conditionals",
        },
        desc: {
          kz: "Шынайы болашақ және қиялдағы жағдайларды сипаттау",
          ru: "Реальные условия будущего и гипотетические ситуации",
          en: "Real future possibilities vs hypothetical situations",
        },
        status: "in_progress",
        score: 78,
        prereqNumber: "E-2",
        blocksCount: 2,
        accuracy: 78,
        theory: {
          ruleTitle: {
            kz: "If + Present Simple, will + V1",
            ru: "First Conditional: If + Present, will + V",
            en: "First Conditional: If + Present, will + V",
          },
          formula: "If + Present Simple, will + Base Verb",
          explanation: {
            kz: "Шынайы шартты сөйлемде If бөлігінде will қойылмайды!",
            ru: "В придаточном предложении условия (после if) будущее время will НИКОГДА не ставится!",
            en: "Never use 'will' in the 'if' clause for real future conditions.",
          },
          commonTrap: {
            kz: "If-тен кейін бірден will қою (қате: If it will rain...)!",
            ru: "Поставить will сразу после if: 'If it will rain' — типичная ошибка!",
            en: "Writing 'If it will rain' instead of 'If it rains'!",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Present Simple", "Future Simple"],
            ru: ["Present Simple", "Future Simple"],
            en: ["Present Simple", "Future Simple"],
          },
          unlocks: {
            kz: ["Third Conditional", "Mixed Conditionals"],
            ru: ["Third Conditional", "Смешанные типы условий"],
            en: ["Third Conditional", "Mixed Conditionals"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Егер күн ашық болса... ☀️",
            ru: "Договор с погодой ☀️",
            en: "Weather Contract ☀️",
          },
          analogyBody: {
            kz: "Шарт — бұл ереже: 'Егер емтихан тапсырсам (Present), серуенге барамын (will)'.",
            ru: "Условие — как условие контракта: если выполнено действие в настоящем, то наступит следствие в будущем!",
            en: "An if-condition is a promise: fulfill premise in Present, get reward in Future!",
          },
          keyTakeaway: {
            kz: "If кейін will болмайды!",
            ru: "После If — только настоящее время!",
            en: "No 'will' directly after 'if'!",
          },
        },
        quiz: {
          question: {
            kz: "Дұрыс нұсқаны таңдаңыз: \"If it _____ tomorrow, we will stay at home.\"",
            ru: "Выберите верный вариант: \"If it _____ tomorrow, we will stay at home.\"",
            en: "Choose the correct form: \"If it _____ tomorrow, we will stay at home.\"",
          },
          options: [
            { id: "A", text: "rains", isCorrect: true },
            { id: "B", text: "will rain", isCorrect: false },
            { id: "C", text: "rained", isCorrect: false },
            { id: "D", text: "is raining", isCorrect: false },
          ],
          explanation: {
            kz: "If бөлігінде Present Simple: it rains.",
            ru: "После if в 1-м типе условий ставится Present Simple: it rains (с окончанием -s).",
            en: "Use Present Simple after 'if': it rains.",
          },
          hint: {
            kz: "If-тен кейін will болмайтынын ұмытпаңыз.",
            ru: "Помните: will после if не ставится.",
            en: "Remember: no 'will' right after 'if'.",
          },
        },
      },
    ],
  },

  // 6. Biology
  {
    id: "biology",
    minGrade: 7,
    name: {
      kz: "Биология",
      ru: "Биология",
      en: "Biology",
    },
    icon: "psychology",
    categoryTag: {
      kz: "ЖАРАТЫЛЫСТАНУ ЖӘНЕ ЖАНДЫ ЖҮЙЕЛЕР",
      ru: "ЕСТЕСТВОЗНАНИЕ И ЖИВЫЕ СИСТЕМЫ",
      en: "LIFE SCIENCES & CELL BIOLOGY",
    },
    masteryScore: 79,
    masterySubtitle: {
      kz: "7–9 сынып бағдарламасының 79%-ы меңгерілді",
      ru: "79% тем цитологии и генетики освоено",
      en: "79% of cell biology and genetics mastered",
    },
    blockerCount: 1,
    diagnostic: {
      title: {
        kz: "ИИ диагностикасы: Цитология және органоидтар",
        ru: "Диагностика ИИ: Строение клетки и ДНК",
        en: "AI Diagnostics: Cell Organelles & Genetics",
      },
      badge: {
        kz: "БИО-СКАН",
        ru: "БИО-СКАН",
        en: "BIO-SCAN",
      },
      errorObservation: {
        kz: "Митохондрия (АТФ) мен хлоропласттың қызметтерін ажыратуда қиындықтар кездеседі.",
        ru: "Зафиксирована путаница между клеточным дыханием (митохондрии) и фотосинтезом (хлоропласты).",
        en: "Confusion noted between cellular respiration (mitochondria) and photosynthesis (chloroplasts).",
      },
      missedBaseTitle: {
        kz: "Энергетикалық органоидтар",
        ru: "Энергетические органоиды",
        en: "Energetic Organelles",
      },
      missedBaseConcept: {
        kz: "Митохондрия (АТФ) vs Хлоропласт (глюкоза)",
        ru: "Митохондрия (АТФ) vs Хлоропласт (глюкоза)",
        en: "Mitochondria (ATP) vs Chloroplast (glucose)",
      },
      impactTitle: {
        kz: "Бұл неге әсер етеді?",
        ru: "На что это влияет?",
        en: "What does this impact?",
      },
      impactDesc: {
        kz: "Жасушалық метаболизм мен тыныс алу жүйесін түсінуге тікелей байланысты.",
        ru: "Критично для понимания метаболизма, дыхания и генетических механизмов клетки.",
        en: "Fundamental for cell metabolism, respiration, and genetics.",
      },
      startSprintBtn: {
        kz: "Биология спринтін бастау (3 мин)",
        ru: "Запустить био-спринт (3 мин)",
        en: "Start Bio Sprint (3 min)",
      },
      sprintSubtitle: {
        kz: "Органоидтар мен олардың міндеттері",
        ru: "Органоиды клетки и их специализация",
        en: "Organelles and functional pathways",
      },
      sprintLessonTitle: {
        kz: "Ереже: Әр органоид — белгілі цех",
        ru: "Принцип: Каждый органоид — отдельный цех клетки",
        en: "Principle: Each organelle is a specialized workshop",
      },
      sprintLessonContent: {
        kz: "Митохондрия — АТФ энергиясын жинайтын станция. Рибосома — ақуыз құрастырушы цех. Ядро — ДНҚ кітапханасы. Хлоропласт — өсімдіктердегі күн фабрикасы.",
        ru: "Митохондрии синтезируют АТФ (энергию). Рибосомы строят белки. Ядро хранит ДНК. Хлоропласты у растений фотосинтезируют глюкозу.",
        en: "Mitochondria produce ATP. Ribosomes synthesize proteins. Nucleus houses DNA. Chloroplasts run photosynthesis in plants.",
      },
    },
    topics: [
      {
        id: "bio_cells",
        subjectId: "biology",
        grade: 8,
        title: {
          kz: "Жасуша органоидтары және АТФ",
          ru: "Органоиды клетки и синтез АТФ",
          en: "Cell Organelles & ATP Synthesis",
        },
        desc: {
          kz: "Митохондрия, рибосома, хлоропласттардың жасушадағы қызметі",
          ru: "Строение и биохимические функции ключевых органоидов клетки",
          en: "Structure and biochemical functions of core organelles",
        },
        status: "critical_gap",
        score: 61,
        prereqNumber: "B-1",
        blocksCount: 2,
        accuracy: 61,
        warningNote: {
          kz: "Митохондрия мен рибосоманы шатастырмаңыз",
          ru: "Не путайте синтез энергии (АТФ) с синтезом белка",
          en: "Do not confuse ATP synthesis with protein synthesis",
        },
        theory: {
          ruleTitle: {
            kz: "Митохондрия: АТФ өндіруші станция",
            ru: "Митохондрия — энергетическая станция клетки",
            en: "Mitochondria — Powerhouse of the Cell",
          },
          formula: "Глюкоза + O₂ ⟶ CO₂ + H₂O + ~36–38 АТФ",
          explanation: {
            kz: "Митохондриялар қос жарғақшалы болып келеді және жасушаны энергиямен (АТФ) толық қамтамасыз етеді.",
            ru: "Митохондрии осуществляют кислородный этап клеточного дыхания с выделением макроэргов АТФ.",
            en: "Mitochondria carry out aerobic respiration, producing high-yield ATP.",
          },
          commonTrap: {
            kz: "Рибосоманы АТФ өндіреді деп ойлау (рибосома тек ақуыз синтездейді)!",
            ru: "Считать, что рибосомы вырабатывают энергию (рибосомы синтезируют исключительно белки)!",
            en: "Assuming ribosomes produce ATP (ribosomes only synthesize proteins)!",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Жасуша құрылысы", "Органикалық заттар (ақуыз, көмірсу)"],
            ru: ["Строение клетки", "Органические вещества (белки, углеводы)"],
            en: ["Cell Structure", "Macromolecules (proteins, carbs)"],
          },
          unlocks: {
            kz: ["Жасушалық тыныс алу", "Энергетикалық алмасу"],
            ru: ["Клеточное дыхание", "Энергетический метаболизм"],
            en: ["Cell Respiration", "Bioenergetics"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Қаланың жылу электр станциясы (ЖЭО) ⚡",
            ru: "Городская электростанция ⚡",
            en: "City Power Plant ⚡",
          },
          analogyBody: {
            kz: "Митохондрия — бұл қалаға жарық беретін станция сияқты: отынды (глюкозаны) жағып, бүкіл жасушаға әмбебап батарейкалар (АТФ) таратады!",
            ru: "Митохондрия — как электростанция: сжигает топливо (глюкозу) с кислородом и заряжает портативные батарейки клетки — молекулы АТФ!",
            en: "Mitochondria act like power stations: burning glucose fuel with oxygen to recharge universal batteries (ATP)!",
          },
          keyTakeaway: {
            kz: "АТФ энергиясы = Митохондрия!",
            ru: "Энергия АТФ = Митохондрия!",
            en: "ATP Energy = Mitochondria!",
          },
        },
        quiz: {
          question: {
            kz: "Жасушада ақуыздарды синтездеуге жауапты органоидты атаңыз:",
            ru: "Какой органоид клетки отвечает за биосинтез молекул белка?",
            en: "Which organelle is responsible for protein biosynthesis?",
          },
          options: [
            { id: "A", text: "Рибосома", isCorrect: true },
            { id: "B", text: "Митохондрия", isCorrect: false },
            { id: "C", text: "Вакуоль", isCorrect: false },
            { id: "D", text: "Лизосома", isCorrect: false },
          ],
          explanation: {
            kz: "Рибосомалар аминқышқылдарынан ақуыз тізбегін жинайды (трансляция).",
            ru: "Рибосомы считывают мРНК и синтезируют полипептидные цепочки белков.",
            en: "Ribosomes translate mRNA into polypeptide protein chains.",
          },
          hint: {
            kz: "Бұл органоид рибонуклеопротеидтерден тұрады.",
            ru: "Этот органоид не имеет мембраны и состоит из двух субъединиц.",
            en: "This organelle consists of RNA and protein subunits.",
          },
        },
      },
    ],
  },

  // 7. Chemistry
  {
    id: "chemistry",
    minGrade: 8,
    name: {
      kz: "Химия",
      ru: "Химия",
      en: "Chemistry",
    },
    icon: "science",
    categoryTag: {
      kz: "ЗАТТАР ЖӘНЕ ХИМИЯЛЫҚ РЕАКЦИЯЛАР",
      ru: "ВЕЩЕСТВА И ХИМИЧЕСКИЕ РЕАКЦИИ",
      en: "MATTER & CHEMICAL REACTIONS",
    },
    masteryScore: 71,
    masterySubtitle: {
      kz: "8–9 сынып бағдарламасының 71%-ы меңгерілді",
      ru: "71% тем стехиометрии и уравнений освоено",
      en: "71% of stoichiometry and reactions mastered",
    },
    blockerCount: 2,
    diagnostic: {
      title: {
        kz: "ИИ диагностикасы: Химиялық теңдеулер",
        ru: "Диагностика ИИ: Расстановка коэффициентов",
        en: "AI Diagnostics: Balancing Chemical Equations",
      },
      badge: {
        kz: "ХИМ-БАЛАНС",
        ru: "ХИМ-БАЛАНС",
        en: "CHEM-BALANCE",
      },
      errorObservation: {
        kz: "Реакция теңдеулеріндегі оттек пен сутекті теңестіру кезінде қателіктер орын алады.",
        ru: "Зафиксированы ошибки при нахождении НОК для кислорода в реакциях горения и окисления.",
        en: "Errors detected when balancing oxygen and finding LCM in combustion equations.",
      },
      missedBaseTitle: {
        kz: "Стехиометрия негіздері",
        ru: "Основы стехиометрии",
        en: "Stoichiometric Basics",
      },
      missedBaseConcept: {
        kz: "Зат массасының сақталу заңы (Ломоносов-Лавуазье)",
        ru: "Закон сохранения массы веществ",
        en: "Law of Conservation of Mass",
      },
      impactTitle: {
        kz: "Бұл неге әсер етеді?",
        ru: "На что это влияет?",
        en: "What does this impact?",
      },
      impactDesc: {
        kz: "Молярлық масса, ерітінділер және есептер шығару кезіндегі дәлдікке әсер етеді.",
        ru: "Прямо влияет на расчет массы продуктов, молей и задач на выход реакции.",
        en: "Directly affects molar calculations and chemical yield problems.",
      },
      startSprintBtn: {
        kz: "Химия спринтін бастау (3 мин)",
        ru: "Запустить хим-спринт (3 мин)",
        en: "Start Chemistry Sprint (3 min)",
      },
      sprintSubtitle: {
        kz: "Теңдеулерді коэффициентпен теңестіру тәсілі",
        ru: "Алгоритм балансировки химических реакций",
        en: "Balancing algorithm for reactions",
      },
      sprintLessonTitle: {
        kz: "Ереже: Индекстерді өзгертпейміз!",
        ru: "Золотое правило: Меняем только коэффициенты!",
        en: "Golden Rule: Never change subscripts!",
      },
      sprintLessonContent: {
        kz: "Молекула ішіндегі индекс заттың табиғатын білдіреді (H₂O). Теңестіру үшін тек формула алдына үлкен коэффициент қойылады: 2 H₂ + O₂ ⟶ 2 H₂O.",
        ru: "Индексы менять запрещено! Коэффициент ставится ПЕРЕД молекулой и умножает все входящие в нее атомы: 2 H₂ + O₂ ⟶ 2 H₂O.",
        en: "Subscripts define molecular identity. Only modify leading stoichiometric coefficients: 2 H₂ + O₂ ⟶ 2 H₂O.",
      },
    },
    topics: [
      {
        id: "chem_balance",
        subjectId: "chemistry",
        grade: 8,
        title: {
          kz: "Химиялық теңдеулерді теңестіру",
          ru: "Коэффициенты в химических реакциях",
          en: "Balancing Chemical Equations",
        },
        desc: {
          kz: "Атомдар санын сақтау және коэффициенттерді дұрыс таңдау",
          ru: "Закон сохранения массы атомов и расстановка коэффициентов",
          en: "Conservation of mass and calculating stoichiometric coefficients",
        },
        status: "critical_gap",
        score: 58,
        prereqNumber: "C-1",
        blocksCount: 3,
        accuracy: 58,
        warningNote: {
          kz: "Индекстерді өзгертпеңіз, тек коэффициент қойыңыз",
          ru: "Не путайте нижний индекс с коэффициентом перед молекулой",
          en: "Never confuse subscripts with leading coefficients",
        },
        theory: {
          ruleTitle: {
            kz: "Зат массасының сақталу заңы",
            ru: "Закон сохранения массы веществ",
            en: "Conservation of Mass",
          },
          formula: "∑ Атомдар (сол жақ) = ∑ Атомдар (оң жақ)",
          explanation: {
            kz: "Реакцияға қатысқан әрбір элемент атомдарының саны реакция өнімдеріндегі санмен дәлме-дәл тең болуы керек.",
            ru: "Количество атомов каждого химического элемента до реакции должно строго равняться количеству атомов после реакции.",
            en: "The count of atoms of each element on the reactant side must equal the product side.",
          },
          commonTrap: {
            kz: "Индексті өзгерту (мысалы Al₂O₃ орнына AlO деп жазу қате)!",
            ru: "Попытка изменить нижний индекс химического соединения вместо расстановки коэффициента!",
            en: "Attempting to change chemical formula subscripts instead of leading multipliers!",
          },
        },
        dependencies: {
          prerequisites: {
            kz: ["Валенттілік", "Химиялық формулалар"],
            ru: ["Валентность", "Химические формулы"],
            en: ["Valence", "Chemical Formulas"],
          },
          unlocks: {
            kz: ["Зат мөлшері (n=m/M)", "Реакция теңдеуі бойынша есептер"],
            ru: ["Расчет количества вещества (n = m/M)", "Стехиометрические расчеты"],
            en: ["Molar calculations (n = m/M)", "Reaction Stoichiometry"],
          },
        },
        aiExplanation: {
          analogyTitle: {
            kz: "Конструктор LEGO бөлшектері 🧱",
            ru: "Детали конструктора LEGO 🧱",
            en: "LEGO Building Blocks 🧱",
          },
          analogyBody: {
            kz: "Химиялық реакция — бұл жай ғана лего-кірпіштерді қайта жинау: ешбір кірпіш жоғалмайды және жоқтан пайда болмайды!",
            ru: "Химическая реакция — это пересборка кубиков LEGO: сколько красных и синих кубиков было в начале, ровно столько же должно остаться в собранной фигуре!",
            en: "Chemical reactions are like rearranging LEGO bricks: no bricks vanish and none appear out of nowhere!",
          },
          keyTakeaway: {
            kz: "Сол жақтағы атомдар саны = Оң жақтағы атомдар саны!",
            ru: "Число атомов слева всегда равно числу атомов справа!",
            en: "Atoms on the left strictly equal atoms on the right!",
          },
        },
        quiz: {
          question: {
            kz: "Теңдеудегі оттектің (O₂) алдындағы коэффициентті көрсетіңіз: 4 P + ? O₂ ⟶ 2 P₂O₅",
            ru: "Определите коэффициент перед кислородом (O₂): 4 P + ? O₂ ⟶ 2 P₂O₅",
            en: "Find the coefficient before oxygen (O₂): 4 P + ? O₂ ⟶ 2 P₂O₅",
          },
          options: [
            { id: "A", text: "5", isCorrect: true },
            { id: "B", text: "2", isCorrect: false },
            { id: "C", text: "10", isCorrect: false },
            { id: "D", text: "3", isCorrect: false },
          ],
          explanation: {
            kz: "Оң жақта 2 · 5 = 10 оттек атомы бар. Сол жақта 10 / 2 = 5 болады (5 O₂).",
            ru: "Справа в 2 P₂O₅ содержится 2 × 5 = 10 атомов кислорода. Слева перед молекулой O₂ нужен коэффициент 10 / 2 = 5.",
            en: "Right side has 2 * 5 = 10 oxygen atoms. Divide by 2: coefficient is 5.",
          },
          hint: {
            kz: "Оң жақтағы оттектер санын есептеңіз: 2 · 5 = 10.",
            ru: "Посчитайте кислород справа: 2 умножить на 5 = 10.",
            en: "Calculate right oxygens: 2 * 5 = 10.",
          },
        },
      },
    ],
  },
];
