import { Language } from "../types";

export interface HowToSolveGuide {
  givenAndGoal: Record<Language, string>;
  ruleOrFormula: Record<Language, string>;
  steps?: Record<Language, string[]>;
  algorithmSteps?: Record<Language, string[]>;
  commonTrap: Record<Language, string>;
}

export interface LocalizedQuestion {
  id: string;
  subject: Record<Language, string>;
  grade: Record<Language, string>;
  topic: Record<Language, string>;
  subtopic: Record<Language, string>;
  questionText: Record<Language, string>;
  formulaDisplay: {
    type?: "fraction" | "expression";
    expressionText?: string;
    expressionTextLocalized?: Record<Language, string>;
    numeratorLeft?: string;
    denominatorLeft?: string;
    operator?: string;
    numeratorRight?: string;
    denominatorRight?: string;
  };
  options: {
    id: string;
    text: string;
    textLocalized?: Record<Language, string>;
    isCorrect: boolean;
  }[];
  hint: Record<Language, string>;
  stepByStepSolution: Record<Language, string[]>;
  howToSolveGuide?: HowToSolveGuide;
  xpReward: number;
}

export const sampleQuestions: LocalizedQuestion[] = [
  // 1. Algebra - Algebraic Fractions
  {
    id: "q1",
    subject: {
      kz: "Алгебра",
      ru: "Алгебра",
      en: "Algebra",
    },
    grade: {
      kz: "9-сынып",
      ru: "9 класс",
      en: "Grade 9",
    },
    topic: {
      kz: "Алгебралық бөлшектер",
      ru: "Алгебраические дроби",
      en: "Algebraic Fractions",
    },
    subtopic: {
      kz: "Рационализация",
      ru: "Рационализация",
      en: "Rationalization",
    },
    questionText: {
      kz: "x ≠ 2 болғанда өрнектің мәні нешеге тең? Өрнекті ықшамдаңыз:",
      ru: "Чему равно значение выражения при x ≠ 2? Упростите выражение:",
      en: "What is the value of the expression when x ≠ 2? Simplify the expression:",
    },
    formulaDisplay: {
      type: "fraction",
      numeratorLeft: "3x",
      denominatorLeft: "x — 2",
      operator: "—",
      numeratorRight: "6",
      denominatorRight: "x — 2",
    },
    options: [
      { id: "A", text: "(3x — 6) / 2", isCorrect: false },
      { id: "B", text: "3 / (x — 2)", isCorrect: false },
      { id: "C", text: "3", isCorrect: true },
      { id: "D", text: "x + 3", isCorrect: false },
    ],
    hint: {
      kz: "Ортақ бөлімге (x - 2) назар аударыңыз. Өрнекті ортақ сызық астына жазыңыз: (3x - 6) / (x - 2). Алымынан 3 санын жақша сыртына шығарыңыз: 3(x - 2) / (x - 2).",
      ru: "Обрати внимание на общий знаменатель (x - 2). Запиши выражение под одну черту: (3x - 6) / (x - 2). Вынеси множитель 3 за скобки в числителе: 3(x - 2) / (x - 2).",
      en: "Notice the common denominator (x - 2). Write under a single fraction bar: (3x - 6) / (x - 2). Factor out 3 in the numerator to get 3(x - 2) / (x - 2).",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Бөлшектердің бөлімі бірдей: (x - 2).",
        "2-қадам: Алымдарын біріктіреміз: (3x - 6) / (x - 2).",
        "3-қадам: Алымынан 3-ті жақша сыртына шығарамыз: 3 · (x - 2) / (x - 2).",
        "4-қадам: (x - 2) өрнегін қысқартамыз (себебі x ≠ 2).",
        "Жауабы: 3.",
      ],
      ru: [
        "Шаг 1: Знаменатели одинаковые: (x - 2).",
        "Шаг 2: Объединяем числители под одну черту: (3x - 6) / (x - 2).",
        "Шаг 3: Выносим общий множитель 3 за скобки: 3 · (x - 2) / (x - 2).",
        "Шаг 4: Сокращаем одинаковую скобку (x - 2), так как x ≠ 2.",
        "Итог: 3.",
      ],
      en: [
        "Step 1: Denominators are identical: (x - 2).",
        "Step 2: Combine numerators: (3x - 6) / (x - 2).",
        "Step 3: Factor out 3 in the numerator: 3(x - 2) / (x - 2).",
        "Step 4: Cancel the common binomial (x - 2) since x ≠ 2.",
        "Result: 3.",
      ],
    },
    howToSolveGuide: {
      givenAndGoal: {
        kz: "Берілгені: 3x/(x-2) - 6/(x-2). Мақсаты: Бөлшектерді азайтып, өрнекті барынша ықшамдау.",
        ru: "Дано выражение 3x/(x-2) - 6/(x-2) при x ≠ 2. Цель: Выполнить вычитание дробей и максимально сократить.",
        en: "Given 3x/(x-2) - 6/(x-2) for x ≠ 2. Goal: Subtract fractions and simplify fully.",
      },
      ruleOrFormula: {
        kz: "Алгебралық бөлшектерді азайту ережесі: a/c - b/c = (a - b)/c. Ортақ көбейткішті жақша сыртына шығару: ka - kb = k(a - b).",
        ru: "Правило вычитания дробей с одинаковым знаменателем: a/c - b/c = (a - b)/c. Вынесение множителя: ka - kb = k(a - b).",
        en: "Subtraction with like denominators: a/c - b/c = (a - b)/c. Factoring: ka - kb = k(a - b).",
      },
      steps: {
        kz: [
          "1. Бөлімдері бірдей (x - 2) екеніне көз жеткізіңіз.",
          "2. Алымдарын ортақ сызық астына біріктіріңіз: (3x - 6)/(x - 2).",
          "3. Алымынан 3 санын жақша сыртына шығарыңыз: 3(x - 2)/(x - 2).",
          "4. (x - 2) жақшасын қысқартып, нәтижені 3 деп алыңыз.",
        ],
        ru: [
          "1. Убедитесь, что знаменатели равны: (x - 2).",
          "2. Запишите числители под единую черту: (3x - 6)/(x - 2).",
          "3. Вынесите число 3 за скобки в числителе: 3·(x - 2)/(x - 2).",
          "4. Сократите скобку (x - 2) и получите результат: 3.",
        ],
        en: [
          "1. Note that denominators are identical: (x - 2).",
          "2. Merge numerators over single denominator: (3x - 6)/(x - 2).",
          "3. Factor out 3 in the numerator: 3(x - 2)/(x - 2).",
          "4. Cancel (x - 2) to get final value 3.",
        ],
      },
      commonTrap: {
        kz: "Бөлімдерін бір-бірінен азайтып (x - 2 - x + 2 = 0) немесе бөлшек сызығын елемей қалу!",
        ru: "Ловушка: Вычесть знаменатели (x-2) - (x-2) = 0! Знаменатель дроби никогда не вычитается, а сохраняется общим!",
        en: "Trap: Subtracting the denominators (x-2) - (x-2) = 0! The common denominator is kept.",
      },
    },
    xpReward: 25,
  },

  // 2. Geometry - Pythagorean Theorem
  {
    id: "q2",
    subject: {
      kz: "Геометрия",
      ru: "Геометрия",
      en: "Geometry",
    },
    grade: {
      kz: "8-сынып",
      ru: "8 класс",
      en: "Grade 8",
    },
    topic: {
      kz: "Пифагор теоремасы",
      ru: "Теорема Пифагора",
      en: "Pythagorean Theorem",
    },
    subtopic: {
      kz: "Тікбұрышты үшбұрыш",
      ru: "Прямоугольный треугольник",
      en: "Right-angled triangle",
    },
    questionText: {
      kz: "Тікбұрышты үшбұрыштың катеттері a = 6 см және b = 8 см. Гипотенузаның ұзындығы с нешеге тең?",
      ru: "В прямоугольном треугольнике катеты равны a = 6 см и b = 8 см. Чему равна гипотенуза c?",
      en: "In a right-angled triangle, the legs are a = 6 cm and b = 8 cm. What is the length of hypotenuse c?",
    },
    formulaDisplay: {
      type: "expression",
      expressionText: "c = √(a² + b²) = √(6² + 8²)",
    },
    options: [
      { id: "A", text: "14 см", isCorrect: false },
      { id: "B", text: "10 см", isCorrect: true },
      { id: "C", text: "12 см", isCorrect: false },
      { id: "D", text: "48 см", isCorrect: false },
    ],
    hint: {
      kz: "Пифагор теоремасын қолданыңыз: c² = a² + b². 6² = 36, 8² = 64. Қосындысынан квадрат түбір табыңыз!",
      ru: "Используй теорему Пифагора: c² = a² + b². 6² = 36, 8² = 64. 36 + 64 = 100. Извлеки квадратный корень!",
      en: "Apply the Pythagorean theorem: c² = a² + b². 6² = 36, 8² = 64. 36 + 64 = 100. Find the square root!",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Пифагор теоремасы: c² = a² + b².",
        "2-қадам: Катеттердің квадраттары: 6² = 36 және 8² = 64.",
        "3-қадам: Оларды қосамыз: c² = 36 + 64 = 100.",
        "4-қадам: Түбірден шығарамыз: c = √100 = 10 см.",
        "Жауабы: 10 см.",
      ],
      ru: [
        "Шаг 1: Формула теоремы Пифагора: c² = a² + b².",
        "Шаг 2: Возводим катеты в квадрат: 6² = 36, 8² = 64.",
        "Шаг 3: Складываем: c² = 36 + 64 = 100.",
        "Шаг 4: Извлекаем корень: c = √100 = 10 см.",
        "Итог: 10 см.",
      ],
      en: [
        "Step 1: Pythagorean theorem formula: c² = a² + b².",
        "Step 2: Square both legs: 6² = 36, 8² = 64.",
        "Step 3: Sum the squares: c² = 36 + 64 = 100.",
        "Step 4: Take the square root: c = √100 = 10 cm.",
        "Result: 10 cm.",
      ],
    },
    xpReward: 30,
  },

  // 3. Physics - Newton's Second Law
  {
    id: "q3",
    subject: {
      kz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    grade: {
      kz: "9-сынып",
      ru: "9 класс",
      en: "Grade 9",
    },
    topic: {
      kz: "Ньютонның екінші заңы",
      ru: "Второй закон Ньютона",
      en: "Newton's Second Law",
    },
    subtopic: {
      kz: "Күш пен үдеу",
      ru: "Сила и ускорение",
      en: "Force and Acceleration",
    },
    questionText: {
      kz: "Массасы 4 кг дене 3 м/с² үдеумен қозғалады. Денеге әсер етуші теңәрекетті күш F нешеге тең?",
      ru: "Тело массой 4 кг движется с ускорением 3 м/с². Чему равна действующая сила F?",
      en: "A body of mass 4 kg moves with acceleration 3 m/s². What is the net force F?",
    },
    formulaDisplay: {
      type: "expression",
      expressionText: "F = m · a = 4 кг · 3 м/с²",
    },
    options: [
      { id: "A", text: "7 Н (N)", isCorrect: false },
      { id: "B", text: "1.33 Н (N)", isCorrect: false },
      { id: "C", text: "24 Н (N)", isCorrect: false },
      { id: "D", text: "12 Н (N)", isCorrect: true },
    ],
    hint: {
      kz: "Формула: F = m · a. m = 4 кг, a = 3 м/с². Көбейтіңіз: 4 · 3 = 12 Н.",
      ru: "Формула: F = m · a. Масса 4 кг, ускорение 3 м/с². Умножаем: 4 · 3 = 12 Н.",
      en: "Formula: F = m · a. Mass = 4 kg, acceleration = 3 m/s². Multiply: 4 · 3 = 12 N.",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Ньютонның 2-заңының формуласын жазамыз: F = m · a.",
        "2-қадам: Мәндерін қоямыз: m = 4 кг, a = 3 м/с².",
        "3-қадам: F = 4 · 3 = 12 Ньютон.",
        "Жауабы: 12 Н.",
      ],
      ru: [
        "Шаг 1: Формула второго закона Ньютона: F = m · a.",
        "Шаг 2: Подставляем данные: m = 4 кг, a = 3 м/с².",
        "Шаг 3: F = 4 · 3 = 12 Ньютонов (Н).",
        "Итог: 12 Н.",
      ],
      en: [
        "Step 1: Newton's second law formula: F = m · a.",
        "Step 2: Plug in values: m = 4 kg, a = 3 m/s².",
        "Step 3: F = 4 · 3 = 12 Newtons (N).",
        "Result: 12 N.",
      ],
    },
    xpReward: 30,
  },

  // 4. Chemistry - Molecular Molar Mass
  {
    id: "q4",
    subject: {
      kz: "Химия",
      ru: "Химия",
      en: "Chemistry",
    },
    grade: {
      kz: "8-сынып",
      ru: "8 класс",
      en: "Grade 8",
    },
    topic: {
      kz: "Молярлық масса",
      ru: "Молярная масса",
      en: "Molar Mass",
    },
    subtopic: {
      kz: "Су молекуласы (H₂O)",
      ru: "Молекула воды (H₂O)",
      en: "Water molecule (H₂O)",
    },
    questionText: {
      kz: "Су молекуласының (H₂O) молярлық массасын табыңыз, егер Ar(H) = 1 г/моль, ал Ar(O) = 16 г/моль болса:",
      ru: "Найдите молярную массу воды (H₂O), если Ar(H) = 1 г/моль, а Ar(O) = 16 г/моль:",
      en: "Find the molar mass of water (H₂O), given Ar(H) = 1 g/mol and Ar(O) = 16 g/mol:",
    },
    formulaDisplay: {
      type: "expression",
      expressionText: "M(H₂O) = 2 · Ar(H) + Ar(O)",
    },
    options: [
      { id: "A", text: "17 г/моль", isCorrect: false },
      { id: "B", text: "34 г/моль", isCorrect: false },
      { id: "C", text: "18 г/моль", isCorrect: true },
      { id: "D", text: "20 г/моль", isCorrect: false },
    ],
    hint: {
      kz: "Су молекуласында 2 сутек (H) атомы және 1 оттек (O) атомы бар: M = 2 · 1 + 16.",
      ru: "В молекуле воды 2 атома водорода и 1 атом кислорода: M = 2 · 1 + 16 = 18 г/моль.",
      en: "Water contains 2 hydrogen atoms and 1 oxygen atom: M = 2 · 1 + 16 = 18 g/mol.",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: H₂O формуласында 2 сутек және 1 оттек бар.",
        "2-қадам: Сутектің салыстырмалы атомдық массасы: 2 · 1 = 2 г/моль.",
        "3-қадам: Оттектің салыстырмалы атомдық массасы: 16 г/моль.",
        "4-қадам: Қосамыз: 2 + 16 = 18 г/моль.",
        "Жауабы: 18 г/моль.",
      ],
      ru: [
        "Шаг 1: Молекула воды состоит из 2 атомов H и 1 атома O.",
        "Шаг 2: Масса двух водородов: 2 · 1 = 2 г/моль.",
        "Шаг 3: Масса одного кислорода: 16 г/моль.",
        "Шаг 4: Суммируем: 2 + 16 = 18 г/моль.",
        "Итог: 18 г/моль.",
      ],
      en: [
        "Step 1: Water molecule has 2 Hydrogen atoms and 1 Oxygen atom.",
        "Step 2: Mass of 2 Hydrogens: 2 · 1 = 2 g/mol.",
        "Step 3: Mass of 1 Oxygen: 16 g/mol.",
        "Step 4: Sum together: 2 + 16 = 18 g/mol.",
        "Result: 18 g/mol.",
      ],
    },
    xpReward: 25,
  },

  // 5. Algebra - Quadratic Equation (Vieta's Theorem)
  {
    id: "q5",
    subject: {
      kz: "Алгебра",
      ru: "Алгебра",
      en: "Algebra",
    },
    grade: {
      kz: "8-сынып",
      ru: "8 класс",
      en: "Grade 8",
    },
    topic: {
      kz: "Квадрат теңдеулер",
      ru: "Квадратные уравнения",
      en: "Quadratic Equations",
    },
    subtopic: {
      kz: "Виет теоремасы",
      ru: "Теорема Виета",
      en: "Vieta's Theorem",
    },
    questionText: {
      kz: "x² - 5x + 6 = 0 квадрат теңдеуінің түбірлерін табыңыз:",
      ru: "Найдите корни квадратного уравнения x² - 5x + 6 = 0:",
      en: "Find the roots of the quadratic equation x² - 5x + 6 = 0:",
    },
    formulaDisplay: {
      type: "expression",
      expressionText: "x² — 5x + 6 = 0  ⇒  (x — 2)(x — 3) = 0",
    },
    options: [
      { id: "A", text: "x₁ = -2,  x₂ = -3", isCorrect: false },
      { id: "B", text: "x₁ = 2,  x₂ = 3", isCorrect: true },
      { id: "C", text: "x₁ = 1,  x₂ = 6", isCorrect: false },
      { id: "D", text: "x₁ = -1,  x₂ = 5", isCorrect: false },
    ],
    hint: {
      kz: "Виет теоремасы бойынша түбірлердің қосындысы 5-ке, ал көбейтіндісі 6-ға тең: 2 + 3 = 5 және 2 · 3 = 6.",
      ru: "По теореме Виета сумма корней равна 5, а произведение 6: 2 + 3 = 5 и 2 · 3 = 6.",
      en: "By Vieta's theorem, sum of roots is 5 and product is 6: 2 + 3 = 5 and 2 · 3 = 6.",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Келтірілген квадрат теңдеу үшін Виет теоремасы: x₁ + x₂ = 5, x₁ · x₂ = 6.",
        "2-қадам: Көбейтіндісі 6 беретін сандар: (1, 6) немесе (2, 3).",
        "3-қадам: Қосындысы 5 беретін жұп: 2 + 3 = 5.",
        "4-қадам: Демек, түбірлері: x₁ = 2, x₂ = 3.",
        "Жауабы: x₁ = 2, x₂ = 3.",
      ],
      ru: [
        "Шаг 1: По теореме Виета для x² - px + q = 0: x₁ + x₂ = 5, x₁ · x₂ = 6.",
        "Шаг 2: Множители числа 6: 1 и 6, либо 2 и 3.",
        "Шаг 3: Проверяем сумму: 2 + 3 = 5 (верно!).",
        "Шаг 4: Корни уравнения: x₁ = 2, x₂ = 3.",
        "Итог: x₁ = 2, x₂ = 3.",
      ],
      en: [
        "Step 1: Vieta's theorem: x₁ + x₂ = 5 and x₁ · x₂ = 6.",
        "Step 2: Factors of 6: (1, 6) or (2, 3).",
        "Step 3: Check sum: 2 + 3 = 5 matches the linear coefficient.",
        "Step 4: Therefore, the roots are x₁ = 2 and x₂ = 3.",
        "Result: x₁ = 2, x₂ = 3.",
      ],
    },
    xpReward: 30,
  },

  // 6. Physics - Kinematics & Velocity
  {
    id: "q6",
    subject: {
      kz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    grade: {
      kz: "7-сынып",
      ru: "7 класс",
      en: "Grade 7",
    },
    topic: {
      kz: "Кинематика",
      ru: "Кинематика",
      en: "Kinematics",
    },
    subtopic: {
      kz: "Орташа жылдамдық",
      ru: "Средняя скорость",
      en: "Average Velocity",
    },
    questionText: {
      kz: "Автомобиль 180 км жолды 2.5 сағатта жүріп өтті. Оның орташа жылдамдығы v неше км/сағ?",
      ru: "Автомобиль проехал путь S = 180 км за время t = 2.5 часа. Какова его средняя скорость v?",
      en: "A car travels distance S = 180 km in time t = 2.5 hours. What is its average speed v?",
    },
    formulaDisplay: {
      type: "fraction",
      numeratorLeft: "v",
      denominatorLeft: "1",
      operator: "=",
      numeratorRight: "180 км",
      denominatorRight: "2.5 сағ (h)",
    },
    options: [
      { id: "A", text: "65 км/ч", textLocalized: { kz: "65 км/сағ", ru: "65 км/ч", en: "65 km/h" }, isCorrect: false },
      { id: "B", text: "80 км/ч", textLocalized: { kz: "80 км/сағ", ru: "80 км/ч", en: "80 km/h" }, isCorrect: false },
      { id: "C", text: "90 км/ч", textLocalized: { kz: "90 км/сағ", ru: "90 км/ч", en: "90 km/h" }, isCorrect: false },
      { id: "D", text: "72 км/ч", textLocalized: { kz: "72 км/сағ", ru: "72 км/ч", en: "72 km/h" }, isCorrect: true },
    ],
    hint: {
      kz: "Орташа жылдамдық формуласы: v = S / t. 180-ді 2.5-ке бөліңіз (немесе 180 · 2 / 5 = 72).",
      ru: "Формула средней скорости: v = S / t. Раздели 180 на 2.5 (180 : 2.5 = 72 км/ч).",
      en: "Average speed formula: v = S / t. Divide 180 by 2.5 (180 / 2.5 = 72 km/h).",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Жылдамдық формуласы: v = S / t.",
        "2-қадам: Мәндері: S = 180 км, t = 2.5 сағ.",
        "3-қадам: 180 / 2.5 = 1800 / 25 = 72 км/сағ.",
        "Жауабы: 72 км/сағ.",
      ],
      ru: [
        "Шаг 1: Формула прямолинейного движения: v = S / t.",
        "Шаг 2: Подставляем значения: S = 180 км, t = 2.5 ч.",
        "Шаг 3: Вычисляем: 180 / 2.5 = 72 км/ч.",
        "Итог: 72 км/ч.",
      ],
      en: [
        "Step 1: Speed formula: v = S / t.",
        "Step 2: Substitute values: S = 180 km, t = 2.5 h.",
        "Step 3: Calculate: 180 / 2.5 = 72 km/h.",
        "Result: 72 km/h.",
      ],
    },
    xpReward: 25,
  },

  // 7. Geometry - Triangle Angles
  {
    id: "q7",
    subject: {
      kz: "Геометрия",
      ru: "Геометрия",
      en: "Geometry",
    },
    grade: {
      kz: "7-сынып",
      ru: "7 класс",
      en: "Grade 7",
    },
    topic: {
      kz: "Үшбұрыштың бұрыштары",
      ru: "Углы треугольника",
      en: "Triangle Angles",
    },
    subtopic: {
      kz: "Бұрыштар қосындысы",
      ru: "Сумма углов",
      en: "Sum of angles",
    },
    questionText: {
      kz: "Үшбұрыштың екі бұрышы 45° және 70°-қа тең. Осы үшбұрыштың үшінші бұрышы неше градус?",
      ru: "В треугольнике два угла равны 45° и 70°. Чему равен третий угол этого треугольника?",
      en: "In a triangle, two angles measure 45° and 70°. What is the measure of the third angle?",
    },
    formulaDisplay: {
      type: "expression",
      expressionText: "∠C = 180° — (45° + 70°)",
    },
    options: [
      { id: "A", text: "75°", isCorrect: false },
      { id: "B", text: "55°", isCorrect: false },
      { id: "C", text: "65°", isCorrect: true },
      { id: "D", text: "85°", isCorrect: false },
    ],
    hint: {
      kz: "Кез келген үшбұрыштың ішкі бұрыштарының қосындысы әрдайым 180°-қа тең. 180 - (45 + 70) есептеңіз.",
      ru: "Сумма всех внутренних углов треугольника всегда равна 180°. Вычти известные углы: 180 - (45 + 70).",
      en: "The sum of interior angles in any triangle is always 180°. Subtract known angles: 180 - (45 + 70).",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Үшбұрыштың ішкі бұрыштарының қосындысы = 180°.",
        "2-қадам: Белгілі бұрыштардың қосындысы: 45° + 70° = 115°.",
        "3-қадам: Үшінші бұрыш: 180° - 115° = 65°.",
        "Жауабы: 65°.",
      ],
      ru: [
        "Шаг 1: Теорема: сумма углов треугольника равна 180°.",
        "Шаг 2: Сумма двух известных углов: 45° + 70° = 115°.",
        "Шаг 3: Находим третий угол: 180° - 115° = 65°.",
        "Итог: 65°.",
      ],
      en: [
        "Step 1: Theorem: Sum of angles in a triangle is 180°.",
        "Step 2: Sum the two known angles: 45° + 70° = 115°.",
        "Step 3: Subtract from 180°: 180° - 115° = 65°.",
        "Result: 65°.",
      ],
    },
    xpReward: 25,
  },

  // 8. Computer Science - Binary to Decimal
  {
    id: "q8",
    subject: {
      kz: "Информатика",
      ru: "Информатика",
      en: "Computer Science",
    },
    grade: {
      kz: "8-сынып",
      ru: "8 класс",
      en: "Grade 8",
    },
    topic: {
      kz: "Санау жүйелері",
      ru: "Системы счисления",
      en: "Number Systems",
    },
    subtopic: {
      kz: "Екілік жүйеден ондыққа",
      ru: "Двоичная в десятичную",
      en: "Binary to Decimal",
    },
    questionText: {
      kz: "1011₂ екілік санын ондық санау жүйесіне көшіріңіз:",
      ru: "Переведите двоичное число 1011₂ в десятичную систему счисления:",
      en: "Convert the binary number 1011₂ into decimal system:",
    },
    formulaDisplay: {
      type: "expression",
      expressionText: "1011₂ = 1·2³ + 0·2² + 1·2¹ + 1·2⁰",
    },
    options: [
      { id: "A", text: "13", isCorrect: false },
      { id: "B", text: "11", isCorrect: true },
      { id: "C", text: "9", isCorrect: false },
      { id: "D", text: "7", isCorrect: false },
    ],
    hint: {
      kz: "Разрядтар бойынша 2-нің дәрежелеріне көбейтіңіз: 1·8 + 0·4 + 1·2 + 1·1.",
      ru: "Разложи по степеням двойки справа налево: 1·8 + 0·4 + 1·2 + 1·1 = 8 + 0 + 2 + 1.",
      en: "Expand into powers of two from right to left: 1·8 + 0·4 + 1·2 + 1·1 = 8 + 0 + 2 + 1.",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Санның разрядтарын оңнан солға қарай нөмірлейміз: 3, 2, 1, 0.",
        "2-қадам: 1 · 2³ = 1 · 8 = 8.",
        "3-қадам: 0 · 2² = 0 · 4 = 0.",
        "4-қадам: 1 · 2¹ = 1 · 2 = 2.",
        "5-қадам: 1 · 2⁰ = 1 · 1 = 1.",
        "6-қадам: Қосындысы: 8 + 0 + 2 + 1 = 11.",
        "Жауабы: 11.",
      ],
      ru: [
        "Шаг 1: Расставляем степени двойки справа налево (0, 1, 2, 3).",
        "Шаг 2: 1 · 2³ = 8.",
        "Шаг 3: 0 · 2² = 0.",
        "Шаг 4: 1 · 2¹ = 2.",
        "Шаг 5: 1 · 2⁰ = 1.",
        "Шаг 6: Суммируем: 8 + 0 + 2 + 1 = 11.",
        "Итог: 11.",
      ],
      en: [
        "Step 1: Assign binary power weights (0, 1, 2, 3) from right to left.",
        "Step 2: 1 · 2³ = 8.",
        "Step 3: 0 · 2² = 0.",
        "Step 4: 1 · 2¹ = 2.",
        "Step 5: 1 · 2⁰ = 1.",
        "Step 6: Sum all terms: 8 + 0 + 2 + 1 = 11.",
        "Result: 11.",
      ],
    },
    xpReward: 30,
  },

  // 9. Algebra - Exponents & Powers
  {
    id: "q9",
    subject: {
      kz: "Алгебра",
      ru: "Алгебра",
      en: "Algebra",
    },
    grade: {
      kz: "7-сынып",
      ru: "7 класс",
      en: "Grade 7",
    },
    topic: {
      kz: "Дәрежелер қасиеттері",
      ru: "Свойства степеней",
      en: "Exponent Rules",
    },
    subtopic: {
      kz: "Бірдей негізді дәрежелер",
      ru: "Степени с одинаковым основанием",
      en: "Powers with same base",
    },
    questionText: {
      kz: "Дәрежелер қасиетін қолданып, өрнектің мәнін есептеңіз:",
      ru: "Используя свойства степеней, найдите значение выражения:",
      en: "Using the laws of exponents, calculate the value of the expression:",
    },
    formulaDisplay: {
      type: "fraction",
      numeratorLeft: "2³ · 2⁴",
      denominatorLeft: "2⁵",
      operator: "=",
      numeratorRight: "2⁷",
      denominatorRight: "2⁵",
    },
    options: [
      { id: "A", text: "8", isCorrect: false },
      { id: "B", text: "2", isCorrect: false },
      { id: "C", text: "16", isCorrect: false },
      { id: "D", text: "4", isCorrect: true },
    ],
    hint: {
      kz: "Көбейту кезінде дәреже көрсеткіштері қосылады: 3 + 4 = 7. Бөлу кезінде азайтылады: 7 - 5 = 2. 2² = 4.",
      ru: "При умножении показателей с одинаковым основанием степени складываются: 3 + 4 = 7. При делении вычитаются: 7 - 5 = 2. 2² = 4.",
      en: "When multiplying like bases, add exponents: 3 + 4 = 7. When dividing, subtract: 7 - 5 = 2. 2² = 4.",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Алымындағы көбейтінді: 2³ · 2⁴ = 2^(3+4) = 2⁷.",
        "2-қадам: Бөлімге бөлу: 2⁷ / 2⁵ = 2^(7-5) = 2².",
        "3-қадам: Мәні: 2² = 4.",
        "Жауабы: 4.",
      ],
      ru: [
        "Шаг 1: В числителе складываем степени: 2³ · 2⁴ = 2^(3+4) = 2⁷.",
        "Шаг 2: Делим на знаменатель: 2⁷ / 2⁵ = 2^(7-5) = 2².",
        "Шаг 3: Возводим в степень: 2² = 4.",
        "Итог: 4.",
      ],
      en: [
        "Step 1: Multiply numerator powers: 2³ · 2⁴ = 2^(3+4) = 2⁷.",
        "Step 2: Divide by denominator: 2⁷ / 2⁵ = 2^(7-5) = 2².",
        "Step 3: Evaluate: 2² = 4.",
        "Result: 4.",
      ],
    },
    xpReward: 25,
  },

  // 10. Physics - Mechanical Work
  {
    id: "q10",
    subject: {
      kz: "Физика",
      ru: "Физика",
      en: "Physics",
    },
    grade: {
      kz: "8-сынып",
      ru: "8 класс",
      en: "Grade 8",
    },
    topic: {
      kz: "Механикалық жұмыс",
      ru: "Механическая работа",
      en: "Mechanical Work",
    },
    subtopic: {
      kz: "Жұмыс пен орын ауыстыру",
      ru: "Работа и перемещение",
      en: "Work and Displacement",
    },
    questionText: {
      kz: "25 Н күш денені өз бағытымен s = 4 метрге жылжытты. Атқарылған механикалық жұмыс A нешеге тең?",
      ru: "Сила F = 25 Н переместила груз в направлении своего действия на расстояние s = 4 метра. Чему равна совершенная работа A?",
      en: "A force of F = 25 N moves an object in its direction over a distance of s = 4 meters. What is the mechanical work A done?",
    },
    formulaDisplay: {
      type: "expression",
      expressionText: "A = F · s = 25 Н · 4 м",
    },
    options: [
      { id: "A", text: "29 Дж (J)", isCorrect: false },
      { id: "B", text: "100 Дж (J)", isCorrect: true },
      { id: "C", text: "6.25 Дж (J)", isCorrect: false },
      { id: "D", text: "200 Дж (J)", isCorrect: false },
    ],
    hint: {
      kz: "Механикалық жұмыс формуласы: A = F · s. 25-ті 4-ке көбейтіңіз: 25 · 4 = 100 Джоуль.",
      ru: "Формула работы: A = F · s. Умножь силу на перемещение: 25 · 4 = 100 Джоулей.",
      en: "Mechanical work formula: A = F · s. Multiply force by displacement: 25 · 4 = 100 Joules.",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Механикалық жұмыс формуласы: A = F · s.",
        "2-қадам: Берілгені: F = 25 Н, s = 4 м.",
        "3-қадам: Есептейміз: A = 25 · 4 = 100 Дж (Джоуль).",
        "Жауабы: 100 Дж.",
      ],
      ru: [
        "Шаг 1: Формула механической работы: A = F · s.",
        "Шаг 2: Подставляем данные задачи: F = 25 Н, s = 4 м.",
        "Шаг 3: Вычисляем: A = 25 · 4 = 100 Дж (Джоулей).",
        "Итог: 100 Дж.",
      ],
      en: [
        "Step 1: Formula for mechanical work: A = F · s.",
        "Step 2: Plug in values: F = 25 N, s = 4 m.",
        "Step 3: Calculate: A = 25 · 4 = 100 Joules (J).",
        "Result: 100 J.",
      ],
    },
    xpReward: 30,
  },

  // 11. English - Present Perfect
  {
    id: "q11",
    subject: {
      kz: "Ағылшын тілі",
      ru: "Английский язык",
      en: "English",
    },
    grade: {
      kz: "9-сынып",
      ru: "9 класс",
      en: "Grade 9",
    },
    topic: {
      kz: "Шақтар жүйесі (Tenses)",
      ru: "Времена глаголов (Tenses)",
      en: "Verb Tenses",
    },
    subtopic: {
      kz: "Present Perfect",
      ru: "Present Perfect vs Past Simple",
      en: "Present Perfect vs Past Simple",
    },
    questionText: {
      kz: "Сөйлемдегі бос орынды толтырыңыз: \"She _____ here since 2019.\"",
      ru: "Вставьте правильную форму глагола: \"She _____ here since 2019.\"",
      en: "Choose the correct verb form: \"She _____ here since 2019.\"",
    },
    formulaDisplay: {
      type: "expression",
      expressionText: "Subject (She) + has + V3 (lived) + since 2019",
    },
    options: [
      { id: "A", text: "lived", isCorrect: false },
      { id: "B", text: "has lived", isCorrect: true },
      { id: "C", text: "is living", isCorrect: false },
      { id: "D", text: "had lived", isCorrect: false },
    ],
    hint: {
      kz: "\"since 2019\" (2019 жылдан бері) іс-әрекеттің қазірге дейін созылып жатқанын білдіреді (Present Perfect). She үшін \"has lived\" таңдалады.",
      ru: "Маркер времени \"since 2019\" указывает на действие, начавшееся в 2019 году и продолжающееся сейчас (Present Perfect: has + V3).",
      en: "The time marker \"since 2019\" indicates an action continuing from past to present (Present Perfect: has + V3).",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Сөйлемдегі \"since 2019\" маркері Present Perfect шағын көрсетеді.",
        "2-қадам: Бастауыш She (3-жақ жекеше түр), сондықтан has көмекші етістігі қолданылады.",
        "3-қадам: live етістігінің 3-формасы: lived.",
        "Жауабы: has lived.",
      ],
      ru: [
        "Шаг 1: Находим маркер \"since 2019\" — это маркер Present Perfect.",
        "Шаг 2: Подлежащее She требует вспомогательного глагола has.",
        "Шаг 3: Основной глагол в 3-й форме: lived.",
        "Итог: has lived.",
      ],
      en: [
        "Step 1: The marker \"since 2019\" denotes Present Perfect.",
        "Step 2: The 3rd person singular pronoun 'She' takes 'has'.",
        "Step 3: Past participle form of live is 'lived'.",
        "Result: has lived.",
      ],
    },
    howToSolveGuide: {
      givenAndGoal: {
        kz: "Берілгені: \"She _____ here since 2019\". Мақсаты: Дұрыс етістік шағын қою.",
        ru: "Дано предложение с маркером since 2019. Цель: Выбрать грамматически верную форму глагола.",
        en: "Given sentence with since 2019 marker. Goal: Choose correct verb tense.",
      },
      ruleOrFormula: {
        kz: "Present Perfect ережесі: have / has + V3. Маркерлер: since (басталған уақыты), for (созылу мерзімі).",
        ru: "Формула Present Perfect: have/has + V3. Маркер since указывает на точку старта действия в прошлом.",
        en: "Present Perfect: have/has + V3. Marker 'since' indicates starting point in the past.",
      },
      steps: {
        kz: [
          "1. \"since\" сөзін көріп, Present Perfect екенін анықтаңыз.",
          "2. Бастауышқа қараңыз: She ⟶ has керек.",
          "3. has lived нұсқасын таңдаңыз.",
        ],
        ru: [
          "1. Найдите маркер времени (since = с определенного года).",
          "2. Согласуйте с подлежащим (She -> has, а не have).",
          "3. Выберите 'has lived'.",
        ],
        en: [
          "1. Identify time marker 'since'.",
          "2. Match auxiliary 'has' with 3rd-person singular 'She'.",
          "3. Select 'has lived'.",
        ],
      },
      commonTrap: {
        kz: "Past Simple (lived) таңдау. Өткен шақ тек нақты аяқталған уақытта (in 2019, ago) болады!",
        ru: "Ловушка: Выбрать lived (Past Simple). Past Simple используется только при указании на законченное время (in 2019, 5 years ago)!",
        en: "Trap: Selecting Past Simple 'lived'. Past Simple is used with finished time words, not 'since'!",
      },
    },
    xpReward: 30,
  },

  // 12. Biology - Mitochondria
  {
    id: "q12",
    subject: {
      kz: "Биология",
      ru: "Биология",
      en: "Biology",
    },
    grade: {
      kz: "8-сынып",
      ru: "8 класс",
      en: "Grade 8",
    },
    topic: {
      kz: "Цитология (Жасуша құрылысы)",
      ru: "Цитология (Строение клетки)",
      en: "Cell Biology",
    },
    subtopic: {
      kz: "Жасуша органоидтарының қызметі",
      ru: "Органоиды клетки и их функции",
      en: "Organelle Functions",
    },
    questionText: {
      kz: "«Жасушаның энергетикалық станциясы» деп аталатын және АТФ молекуласын синтездейтін органоид:",
      ru: "Органоид клетки, который называют «энергетической станцией» за способность синтезировать молекулы АТФ:",
      en: "The organelle called the 'powerhouse of the cell' due to its ability to synthesize ATP molecules:",
    },
    formulaDisplay: {
      type: "expression",
      expressionText: "Глюкоза + O₂ ⟶ CO₂ + H₂O + АТФ (энергия)",
    },
    options: [
      { id: "A", text: "Рибосома", isCorrect: false },
      { id: "B", text: "Митохондрия", isCorrect: true },
      { id: "C", text: "Лизосома", isCorrect: false },
      { id: "D", text: "Гольджи аппараты", isCorrect: false },
    ],
    hint: {
      kz: "Митохондрияларда жасушалық тыныс алу жүреді және органикалық заттардың тотығуынан АТФ энергиясы түзіледі.",
      ru: "Митохондрии обеспечивают клеточное дыхание, расщепляя углеводы с запасанием энергии в форме макроэргических связей АТФ.",
      en: "Mitochondria carry out cellular respiration, converting glucose and oxygen into high-energy ATP bonds.",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Сұрақ энергия (АТФ) синтезі туралы.",
        "2-қадам: Рибосома ақуыз құрайды, лизосома ыдыратады, Гольджи тасымалдайды.",
        "3-қадам: АТФ энергиясын синтездейтін қос жарғақшалы органоид — митохондрия.",
        "Жауабы: Митохондрия.",
      ],
      ru: [
        "Шаг 1: Вопрос посвящен органоиду энергетического обмена (синтез АТФ).",
        "Шаг 2: Исключаем другие органоиды: рибосомы синтезируют белок, лизосомы расщепляют полимеры.",
        "Шаг 3: Двумембранный органоид дыхания и выработки АТФ — митохондрия.",
        "Итог: Митохондрия.",
      ],
      en: [
        "Step 1: The question targets ATP synthesis.",
        "Step 2: Ribosomes make proteins, lysosomes degrade waste, Golgi packages substances.",
        "Step 3: Mitochondria synthesize ATP via oxidative phosphorylation.",
        "Result: Митохондрия.",
      ],
    },
    howToSolveGuide: {
      givenAndGoal: {
        kz: "Берілгені: Органоидтың қызметі (АТФ синтезі). Мақсаты: Органоидтың атын табу.",
        ru: "Дана функция: выработка АТФ в клетке. Цель: Сопоставить с правильным органоидом.",
        en: "Given ATP synthesis role. Goal: Identify matching organelle.",
      },
      ruleOrFormula: {
        kz: "Цитология ережесі: Митохондрия = АТФ, Рибосома = ақуыз, Ядро = ДНҚ.",
        ru: "Классическое правило: Митохондрия = клеточная энергия (АТФ).",
        en: "Key pairing: Mitochondria = cellular energy (ATP).",
      },
      steps: {
        kz: [
          "1. «Энергетикалық станция» мен «АТФ» кілт сөздеріне қараңыз.",
          "2. Митохондрия нұсқасын таңдаңыз.",
        ],
        ru: [
          "1. Найдите маркерные термины: «энергетическая станция» и «АТФ».",
          "2. Вспомните, что именно митохондрии осуществляют аэробное дыхание.",
          "3. Выберите «Митохондрия».",
        ],
        en: [
          "1. Spot keywords 'powerhouse' and 'ATP'.",
          "2. Select Mitochondria.",
        ],
      },
      commonTrap: {
        kz: "Рибосомамен шатастыру (рибосома ақуыз үшін жауап береді, АТФ емес)!",
        ru: "Ловушка: Перепутать с рибосомами (рибосомы синтезируют белки, а не АТФ)!",
        en: "Trap: Confusing with ribosomes (ribosomes make proteins, not ATP)!",
      },
    },
    xpReward: 30,
  },

  // 13. Chemistry - Balancing Combustion
  {
    id: "q13",
    subject: {
      kz: "Химия",
      ru: "Химия",
      en: "Chemistry",
    },
    grade: {
      kz: "8-сынып",
      ru: "8 класс",
      en: "Grade 8",
    },
    topic: {
      kz: "Химиялық теңдеулер",
      ru: "Химические реакции и уравнения",
      en: "Chemical Reactions & Equations",
    },
    subtopic: {
      kz: "Метанның жануы және коэффициенттер",
      ru: "Коэффициенты в реакции горения метана",
      en: "Balancing Methane Combustion",
    },
    questionText: {
      kz: "Метанның оттекте жану реакциясы теңдеуіндегі оттектің (O₂) алдындағы коэффициентті табыңыз: CH₄ + ? O₂ ⟶ CO₂ + 2 H₂O",
      ru: "Найдите коэффициент перед кислородом (O₂) в уравнении горения метана: CH₄ + ? O₂ ⟶ CO₂ + 2 H₂O",
      en: "Find the stoichiometric coefficient before oxygen (O₂) in the equation: CH₄ + ? O₂ ⟶ CO₂ + 2 H₂O",
    },
    formulaDisplay: {
      type: "expression",
      expressionText: "CH₄ + ? O₂ ⟶ CO₂ + 2 H₂O",
    },
    options: [
      { id: "A", text: "1", isCorrect: false },
      { id: "B", text: "2", isCorrect: true },
      { id: "C", text: "3", isCorrect: false },
      { id: "D", text: "4", isCorrect: false },
    ],
    hint: {
      kz: "Оң жақтағы оттек атомдарын санаңыз: CO₂-де 2 атом және 2 H₂O-да 2 атом. Барлығы 2 + 2 = 4 атом оттек. Сол жақта O₂ молекуласы тұрғандықтан, 4 / 2 = 2 болады.",
      ru: "Посчитайте кислород справа: в CO₂ два атома кислорода, в 2H₂O еще два атома. Итого справа 4 атома O. Значит перед O₂ нужен коэффициент 2 (2×2=4).",
      en: "Count oxygen atoms on the right: 2 in CO2 and 2 in 2H2O = 4 atoms. Therefore, 4 / 2 = 2 before O2.",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Көміртек: сол жақта 1 (C), оң жақта 1 (C) — тең.",
        "2-қадам: Сутек: сол жақта 4 (H₄), оң жақта 2·2 = 4 (2H₂O) — тең.",
        "3-қадам: Оттек: оң жақта 2 (CO₂) + 2 (2H₂O) = 4 атом.",
        "4-қадам: Сол жақтағы O₂ молекуласы алдына 4/2 = 2 коэффициентін қоямыз.",
        "Жауабы: 2.",
      ],
      ru: [
        "Шаг 1: Проверяем углерод C: 1 слева = 1 справа.",
        "Шаг 2: Проверяем водород H: 4 слева (CH₄) = 4 справа (2×2 в 2H₂O).",
        "Шаг 3: Считаем суммарный кислород справа: 2 (из CO₂) + 2 (из 2H₂O) = 4 атома.",
        "Шаг 4: Делим 4 атома на индекс 2 в молекуле O₂: 4 / 2 = 2.",
        "Итог: 2.",
      ],
      en: [
        "Step 1: Check carbon: 1 on left = 1 on right.",
        "Step 2: Check hydrogen: 4 on left = 4 on right.",
        "Step 3: Count total right oxygens: 2 + 2 = 4 atoms.",
        "Step 4: Divide 4 by 2 for O2 molecule = coefficient 2.",
        "Result: 2.",
      ],
    },
    howToSolveGuide: {
      givenAndGoal: {
        kz: "Берілгені: CH₄ + ? O₂ ⟶ CO₂ + 2 H₂O. Мақсаты: Оттек алдындағы коэффициентті табу.",
        ru: "Дана схема реакции горения. Цель: Определить стехиометрический коэффициент перед O₂.",
        en: "Given combustion equation. Goal: Balance oxygen.",
      },
      ruleOrFormula: {
        kz: "Атомдар сақталу ережесі: Сол жақтағы оттек атомдары = Оң жақтағы оттек атомдары.",
        ru: "Закон сохранения атомов: число атомов O до реакции равно числу атомов O после реакции.",
        en: "Atom balance: Oxygen atoms on left must equal oxygen atoms on right.",
      },
      steps: {
        kz: [
          "1. Оң жақтағы өнімдердегі (CO₂ және H₂O) барлық оттекті қосыңыз (2 + 2 = 4).",
          "2. 4-ті O₂ молекуласының 2 индексіне бөліңіз.",
          "3. Коэффициент 2 екенін таңдаңыз.",
        ],
        ru: [
          "1. Сложите все атомы кислорода в правой части: 2 (CO₂) + 2 (H₂O) = 4.",
          "2. Разделите 4 на индекс 2 у молекулы кислорода O₂.",
          "3. Получите коэффициент 2.",
        ],
        en: [
          "1. Sum right-side oxygens: 2 + 2 = 4.",
          "2. Divide by index 2 of O2: 4 / 2 = 2.",
          "3. Choose coefficient 2.",
        ],
      },
      commonTrap: {
        kz: "H₂O-дағы оттекті ұмытып кетіп, тек CO₂-дегі 2 оттекке қарап, 1 деп қателесу!",
        ru: "Ловушка: Забыть про кислород в молекуле воды H₂O и посчитать только CO₂!",
        en: "Trap: Overlooking oxygen in the water molecules and counting only CO2!",
      },
    },
    xpReward: 30,
  },

  // 14. Computer Science - Binary to Decimal
  {
    id: "q14",
    subject: {
      kz: "Информатика",
      ru: "Информатика",
      en: "Computer Science",
    },
    grade: {
      kz: "9-сынып",
      ru: "9 класс",
      en: "Grade 9",
    },
    topic: {
      kz: "Санау жүйелері",
      ru: "Системы счисления",
      en: "Number Systems",
    },
    subtopic: {
      kz: "Екілік жүйе",
      ru: "Двоичная система счисления",
      en: "Binary System",
    },
    questionText: {
      kz: "Екілік жүйедегі 1101₂ санын ондық (10-дық) жүйеге аударыңыз:",
      ru: "Переведите двоичное число 1101₂ в привычную десятичную систему счисления:",
      en: "Convert the binary number 1101₂ into the decimal number system:",
    },
    formulaDisplay: {
      type: "expression",
      expressionText: "1101₂ = 1·2³ + 1·2² + 0·2¹ + 1·2⁰ = 8 + 4 + 0 + 1 = ?",
    },
    options: [
      { id: "A", text: "11", isCorrect: false },
      { id: "B", text: "13", isCorrect: true },
      { id: "C", text: "15", isCorrect: false },
      { id: "D", text: "9", isCorrect: false },
    ],
    hint: {
      kz: "Разрядтар салмағы оңнан солға қарай: 2⁰=1, 2¹=2, 2²=4, 2³=8. 1 тұрған разрядтарды қосамыз: 8 + 4 + 1 = 13.",
      ru: "Веса двоичных разрядов справа налево: 1, 2, 4, 8. Складываем разряды с единицами: 8 + 4 + 1 = 13.",
      en: "Powers of 2 from right to left: 1, 2, 4, 8. Add active bits: 8 + 4 + 1 = 13.",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Сан: 1101₂.",
        "2-қадам: Разрядтар: 1·8 + 1·4 + 0·2 + 1·1.",
        "3-қадам: Қосынды: 8 + 4 + 0 + 1 = 13.",
        "Жауабы: 13.",
      ],
      ru: [
        "Шаг 1: Записываем число: 1101₂.",
        "Шаг 2: Расставляем степени двойки: 1×2³ + 1×2² + 0×2¹ + 1×2⁰.",
        "Шаг 3: Складываем: 8 + 4 + 0 + 1 = 13.",
        "Итог: 13.",
      ],
      en: [
        "Step 1: Given: 1101₂.",
        "Step 2: Weights: 1*8 + 1*4 + 0*2 + 1*1.",
        "Step 3: Sum: 8 + 4 + 1 = 13.",
        "Result: 13.",
      ],
    },
    howToSolveGuide: {
      givenAndGoal: {
        kz: "Берілгені: 1101₂. Мақсаты: 10-дық санға аудару.",
        ru: "Дано двоичное число 1101₂. Цель: Перевести в десятичный вид.",
        en: "Given 1101₂. Goal: Convert to base 10.",
      },
      ruleOrFormula: {
        kz: "Екілік ереже: Разряд мәндерін 2^k дәрежелеріне көбейтіп қосу.",
        ru: "Формула перевода: сумма произведений битов на степени двойки 1, 2, 4, 8, 16...",
        en: "Binary expansion: sum of bits multiplied by powers of 2.",
      },
      steps: {
        kz: [
          "1. Оң жақтан бастап 1, 2, 4, 8 деп белгілеңіз.",
          "2. 1-дің үстіндегі сандарды қосыңыз (8 + 4 + 1).",
          "3. 13 табыңыз.",
        ],
        ru: [
          "1. Подпишите веса справа налево: 1 (для крайнего правого бита), 2, 4, 8.",
          "2. Сложите только те позиции, где стоят 1: 8 + 4 + 1.",
          "3. Выберите 13.",
        ],
        en: [
          "1. Assign weights right to left: 1, 2, 4, 8.",
          "2. Sum values for '1' bits: 8 + 4 + 1 = 13.",
          "3. Select 13.",
        ],
      },
      commonTrap: {
        kz: "Ең оң жақтағы разряд 2⁰=1 екенін ұмытып, 2-ден бастап санау!",
        ru: "Ловушка: Забыть, что 2⁰ = 1, и посчитать крайний правый разряд как 2 или 0!",
        en: "Trap: Forgetting that 2⁰ = 1 and miscounting rightmost bit!",
      },
    },
    xpReward: 25,
  },

  // 15. Biology - Photosynthesis (Световая и темновая фаза, хлоропласты)
  {
    id: "q15",
    subject: {
      kz: "Биология",
      ru: "Биология",
      en: "Biology",
    },
    grade: {
      kz: "9-сынып",
      ru: "9 класс",
      en: "Grade 9",
    },
    topic: {
      kz: "Фотосинтез: Жарық және қараңғы сатылары",
      ru: "Фотосинтез: Световая и темновая фазы",
      en: "Photosynthesis: Light & Dark Reactions",
    },
    subtopic: {
      kz: "Тилакоидтар мен стромадағы процестер",
      ru: "Процессы в тилакоидах и строме",
      en: "Thylakoid and Stroma Processes",
    },
    questionText: {
      kz: "Өсімдіктердегі фотосинтездің жарық фазасында тилакоид жарғақшасында судың фотолизі жүреді. Осы процестің нәтижесінде атмосфераға бөлінетін жанама өнім қайсы?",
      ru: "В световой фазе фотосинтеза на мембранах тилакоидов хлоропласта происходит фотолиз воды. Какой побочный газ выделяется в атмосферу в результате этого процесса?",
      en: "During the light-dependent stage of photosynthesis on thylakoid membranes, photolysis of water occurs. Which byproduct gas is released into the atmosphere?",
    },
    formulaDisplay: {
      type: "expression",
      expressionText: "2H₂O + hν (жарық кванты) ⟶ 4H⁺ + 4e⁻ + O₂ ↑ (оттек)",
    },
    options: [
      { id: "A", text: "Көмірқышқыл газы (CO₂)", isCorrect: false },
      { id: "B", text: "Молекулалық оттек (O₂)", isCorrect: true },
      { id: "C", text: "Азот (N₂)", isCorrect: false },
      { id: "D", text: "Глюкоза (C₆H₁₂O₆)", isCorrect: false },
    ],
    hint: {
      kz: "Су молекуласының күн сәулесі әсерінен ыдырауын «судың фотолизі» дейді: 2H₂O ⟶ 4H⁺ + 4e⁻ + O₂. Бұл кезде ауаға еркін оттек (O₂) бөлінеді.",
      ru: "Под действием квантов света происходит расщепление молекулы воды (фотолиз): 2H₂O ⟶ 4H⁺ + 4e⁻ + O₂. Образующийся молекулярный кислород (O₂) диффундирует в атмосферу.",
      en: "Under light energy, water molecules undergo photolysis: 2H₂O ⟶ 4H⁺ + 4e⁻ + O₂. Molecular oxygen (O₂) is released into the atmosphere.",
    },
    stepByStepSolution: {
      kz: [
        "1-қадам: Сұрақ фотосинтездің жарық сатысындағы судың фотолизі туралы.",
        "2-қадам: Судың фотолиз теңдеуі: 2H₂O + жарық ⟶ 4H⁺ + 4e⁻ + O₂.",
        "3-қадам: Сутегі иондары мен электрондар АТФ және НАДФ·H түзуге жұмсалады.",
        "4-қадам: Молекулалық оттек (O₂) жанама өнім ретінде атмосфераға шығарылады.",
        "Жауабы: Молекулалық оттек (O₂).",
      ],
      ru: [
        "Шаг 1: Вопрос касается световой фазы фотосинтеза в тилакоидах хлоропласта.",
        "Шаг 2: Уравнение фотолиза воды: 2H₂O + свет ⟶ 4H⁺ + 4e⁻ + O₂.",
        "Шаг 3: Протоны H⁺ и электроны e⁻ используются для синтеза АТФ и восстановления НАДФ⁺.",
        "Шаг 4: Кислород O₂ является побочным продуктом фотолиза и свободно выделяется в окружающую среду.",
        "Итог: Молекулярный кислород (O₂).",
      ],
      en: [
        "Step 1: Focus on the light-dependent phase occurring in thylakoid membranes.",
        "Step 2: Water photolysis reaction: 2H₂O + light ⟶ 4H⁺ + 4e⁻ + O₂.",
        "Step 3: Protons and electrons reduce NADP+ and generate ATP.",
        "Step 4: Molecular oxygen (O₂) is released as a byproduct into the atmosphere.",
        "Result: Molecular oxygen (O₂).",
      ],
    },
    howToSolveGuide: {
      givenAndGoal: {
        kz: "Берілгені: Фотосинтездің жарық фазасы, судың фотолизі. Мақсаты: Атмосфераға бөлінетін газды табу.",
        ru: "Дана световая фаза фотосинтеза и реакция фотолиза воды. Цель: Определить газ, выделяющийся в атмосферу.",
        en: "Given the light reaction and water photolysis. Goal: Identify the byproduct gas released.",
      },
      ruleOrFormula: {
        kz: "Фотолиз ережесі: Жарық фазасында тилакоидтарда су ыдырап, O₂ бөлінеді. Қараңғы фазада стромада CO₂ сіңіріліп, глюкоза түзіледі.",
        ru: "Закон фотосинтеза: Световая фаза (тилакоиды) = фотолиз воды и выделение O₂. Темновая фаза (строма, цикл Кальвина) = фиксация CO₂ и синтез глюкозы.",
        en: "Core photosynthesis rule: Light reactions in thylakoids split H₂O producing O₂. Dark reactions in stroma fix CO₂ into glucose.",
      },
      steps: {
        kz: [
          "1. Сұрақта «жарық фазасы» және «судың фотолизі» сөздерін белгілеңіз.",
          "2. Судың құрамындағы H₂O оттек (O₂) бөлетінін еске түсіріңіз.",
          "3. CO₂ қараңғы фазада жұмсалатынын, ал O₂ бөлінетінін нақтылаңыз.",
          "4. Молекулалық оттек (O₂) нұсқасын таңдаңыз.",
        ],
        ru: [
          "1. Обратите внимание на ключевые слова: «световая фаза» и «фотолиз воды».",
          "2. Вспомните, что кислород образуется именно при расщеплении воды: 2H₂O ⟶ O₂.",
          "3. Не путайте с темновой фазой, где углекислый газ CO₂ поглощается, а глюкоза синтезируется.",
          "4. Выберите «Молекулярный кислород (O₂)».",
        ],
        en: [
          "1. Note keywords 'light phase' and 'photolysis of water'.",
          "2. Recall that oxygen comes from splitting H₂O: 2H₂O ⟶ O₂.",
          "3. Distinguish from Calvin cycle where CO₂ is consumed to make glucose.",
          "4. Select 'Molecular oxygen (O₂)'.",
        ],
      },
      commonTrap: {
        kz: "Глюкозаны немесе CO₂-ні таңдау. Глюкоза қараңғы фазада стромада түзіледі, ал CO₂ керісінше сіңіріледі, бөлінбейді!",
        ru: "Ловушка: Выбрать CO₂ или глюкозу. CO₂ поглощается растением, а не выделяется, а глюкоза образуется только в темновой фазе в строме хлоропласта!",
        en: "Trap: Picking CO₂ or glucose. CO₂ is consumed, not released, and glucose is synthesized during the dark Calvin cycle in stroma!",
      },
    },
    xpReward: 35,
  },
];
