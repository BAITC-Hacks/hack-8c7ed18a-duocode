import { LocalizedQuestion } from "../data/practiceQuestions";

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate 11th Grade Advanced Math (Calculus & Higher Mathematics: Derivatives, Integrals, Limits, 3D Vectors, Combinatorics)
export function generateMathGrade11(): LocalizedQuestion {
  const type = randInt(1, 6);

  if (type === 1) {
    // 1. Calculus: Derivative of polynomial f'(x_0)
    // f(x) = a*x^3 - b*x^2 + c*x - d at x_0
    const a = randInt(1, 3);
    const b = randInt(2, 5);
    const c = randInt(3, 8);
    const d = randInt(1, 9);
    const x0 = randInt(1, 2);

    // f'(x) = 3a*x^2 - 2b*x + c
    const derVal = 3 * a * (x0 * x0) - 2 * b * x0 + c;

    const correctText = `${derVal}`;
    const distractors = [
      `${derVal + 4}`,
      `${derVal - 3}`,
      `${3 * a * x0 * x0 + 2 * b * x0 + c}`,
    ];

    const rawOptions = [
      { text: correctText, isCorrect: true },
      ...distractors.map((d) => ({ text: d, isCorrect: false })),
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    const aStr = a === 1 ? "x³" : `${a}x³`;

    return {
      id: `gen_m11_deriv_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Математикалық талдау", ru: "Математический анализ", en: "Calculus" },
      grade: { kz: "11-сынып", ru: "11 класс", en: "Grade 11" },
      topic: { kz: "Туынды", ru: "Производная функции", en: "Derivatives" },
      subtopic: { kz: "Нүктедегі туындының мәні", ru: "Значение производной в точке", en: "Derivative at a point" },
      questionText: {
        kz: `f(x) = ${aStr} — ${b}x² + ${c}x — ${d} функциясының x₀ = ${x0} нүктесіндегі f'(x₀) туындысының мәнін табыңыз:`,
        ru: `Найдите значение производной f'(x₀) функции f(x) = ${aStr} — ${b}x² + ${c}x — ${d} в точке x₀ = ${x0}:`,
        en: `Find the value of derivative f'(x₀) for f(x) = ${aStr} — ${b}x² + ${c}x — ${d} at point x₀ = ${x0}:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `f'(x) = (xⁿ)' = n · xⁿ⁻¹  ⇒  f'(${x0}) = ?`,
      },
      options,
      hint: {
        kz: `Дәреженің туындысын алу ережесі: (xⁿ)' = n·xⁿ⁻¹. f'(x) = ${3 * a}x² - ${2 * b}x + ${c}. Содан соң x = ${x0} қойыңыз.`,
        ru: `Правило дифференцирования степени: (xⁿ)' = n·xⁿ⁻¹. f'(x) = ${3 * a}x² - ${2 * b}x + ${c}. Подставь x = ${x0}.`,
        en: `Power rule for differentiation: (xⁿ)' = n·xⁿ⁻¹. f'(x) = ${3 * a}x² - ${2 * b}x + ${c}. Plug in x = ${x0}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Туындыны табамыз: f'(x) = (${aStr})' - (${b}x²)' + (${c}x)' - (${d})'.`,
          `2-қадам: f'(x) = ${3 * a}x² - ${2 * b}x + ${c}.`,
          `3-қадам: x₀ = ${x0} қоямыз: f'(${x0}) = ${3 * a}·(${x0})² - ${2 * b}·(${x0}) + ${c}.`,
          `4-қадам: Есептейміз: ${3 * a * x0 * x0} - ${2 * b * x0} + ${c} = ${derVal}.`,
          `Жауабы: ${derVal}.`,
        ],
        ru: [
          `Шаг 1: Находим общую формулу производной: f'(x) = (${aStr})' - (${b}x²)' + (${c}x)' - (${d})'.`,
          `Шаг 2: Получаем: f'(x) = ${3 * a}x² - ${2 * b}x + ${c}.`,
          `Шаг 3: Подставляем точку x₀ = ${x0}: f'(${x0}) = ${3 * a}·(${x0})² - ${2 * b}·(${x0}) + ${c}.`,
          `Шаг 4: Вычисляем: ${3 * a * x0 * x0} - ${2 * b * x0} + ${c} = ${derVal}.`,
          `Итог: ${derVal}.`,
        ],
        en: [
          `Step 1: Differentiate each term: f'(x) = (${aStr})' - (${b}x²)' + (${c}x)' - (${d})'.`,
          `Step 2: Obtain derivative function: f'(x) = ${3 * a}x² - ${2 * b}x + ${c}.`,
          `Step 3: Evaluate at x₀ = ${x0}: f'(${x0}) = ${3 * a}·(${x0})² - ${2 * b}·(${x0}) + ${c}.`,
          `Step 4: Compute: ${derVal}.`,
          `Result: ${derVal}.`,
        ],
      },
      xpReward: 45,
    };
  }

  if (type === 2) {
    // 2. Geometric Meaning of Derivative: Tangent Slope k = f'(x_0)
    // f(x) = x^2 + a*x + b at x0
    const a = randInt(1, 5);
    const b = randInt(1, 8);
    const x0 = randInt(1, 4);
    const k = 2 * x0 + a;

    const correctText = `k = ${k}`;
    const distractors = [`k = ${k + 2}`, `k = ${k - 2}`, `k = ${x0 * x0 + a * x0 + b}`];

    const rawOptions = [
      { text: correctText, isCorrect: true },
      ...distractors.map((d) => ({ text: d, isCorrect: false })),
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_m11_tangent_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Математикалық талдау", ru: "Математический анализ", en: "Calculus" },
      grade: { kz: "11-сынып", ru: "11 класс", en: "Grade 11" },
      topic: { kz: "Жанаманың бұрыштық коэффициенті", ru: "Геометрический смысл производной", en: "Tangent Slope" },
      subtopic: { kz: "Туынды және жанама", ru: "Угловой коэффициент касательной", en: "Slope of tangent line" },
      questionText: {
        kz: `y = x² + ${a}x + ${b} параболасына оның x₀ = ${x0} абсциссасы бар нүктесінде жүргізілген жанаманың бұрыштық коэффициенті k нешеге тең?`,
        ru: `Найдите угловой коэффициент k касательной к графику функции y = x² + ${a}x + ${b} в точке с абсциссой x₀ = ${x0}:`,
        en: `Find the slope k of the tangent line to y = x² + ${a}x + ${b} at the point with abscissa x₀ = ${x0}:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `k = f'(x₀) = (x² + ${a}x + ${b})' |_(x = ${x0})`,
      },
      options,
      hint: {
        kz: `Жанаманың бұрыштық коэффициенті осы нүктедегі туындыға тең: k = f'(x₀). y' = 2x + ${a}. x₀ = ${x0} қойыңыз.`,
        ru: `Геометрический смысл производной: k = f'(x₀). Находим производную y' = 2x + ${a} и подставляем x₀ = ${x0}.`,
        en: `Geometric interpretation: k = f'(x₀). Differentiate y' = 2x + ${a} and evaluate at x₀ = ${x0}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Геометриялық мағына: k = f'(x₀).`,
          `2-қадам: Туындыны есептейміз: f'(x) = (x² + ${a}x + ${b})' = 2x + ${a}.`,
          `3-қадам: x₀ = ${x0} нүктесін қоямыз: k = 2·${x0} + ${a} = ${k}.`,
          `Жауабы: k = ${k}.`,
        ],
        ru: [
          `Шаг 1: Геометрический смысл: угловой коэффициент равен производной k = f'(x₀).`,
          `Шаг 2: Вычисляем производную: f'(x) = 2x + ${a}.`,
          `Шаг 3: Подставляем x₀ = ${x0}: k = 2 · ${x0} + ${a} = ${k}.`,
          `Итог: k = ${k}.`,
        ],
        en: [
          `Step 1: Geometric meaning: k = f'(x₀).`,
          `Step 2: Differentiate: f'(x) = 2x + ${a}.`,
          `Step 3: Evaluate at x₀ = ${x0}: k = 2 · ${x0} + ${a} = ${k}.`,
          `Result: k = ${k}.`,
        ],
      },
      xpReward: 45,
    };
  }

  if (type === 3) {
    // 3. Integral Calculus: Definite Integral via Newton-Leibniz Formula
    // \int_0^b (3x^2 + 2x) dx = [x^3 + x^2]_0^b = b^3 + b^2
    const b = randInt(2, 4);
    const ans = Math.pow(b, 3) + Math.pow(b, 2);

    const correctText = `${ans}`;
    const distractors = [
      `${ans + 6}`,
      `${ans - 4}`,
      `${Math.pow(b, 3)}`,
    ];

    const rawOptions = [
      { text: correctText, isCorrect: true },
      ...distractors.map((d) => ({ text: d, isCorrect: false })),
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_m11_int_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Математикалық талдау", ru: "Математический анализ", en: "Calculus" },
      grade: { kz: "11-сынып", ru: "11 класс", en: "Grade 11" },
      topic: { kz: "Анықталған интеграл", ru: "Определенный интеграл", en: "Definite Integrals" },
      subtopic: { kz: "Ньютон-Лейбниц формуласы", ru: "Формула Ньютона-Лейбница", en: "Newton-Leibniz formula" },
      questionText: {
        kz: `Анықталған интегралдың мәнін есептеңіз:`,
        ru: `Вычислите определенный интеграл:`,
        en: `Calculate the definite integral:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `∫₀^${b} (3x² + 2x) dx = F(${b}) — F(0)`,
      },
      options,
      hint: {
        kz: `Алғашқы функцияны табыңыз: ∫(3x² + 2x)dx = x³ + x². Содан соң Ньютон-Лейбниц формуласы бойынша жоғарғы шек ${b}-ні қойыңыз: F(${b}) - F(0).`,
        ru: `Найди первообразную: ∫(3x² + 2x)dx = x³ + x². Примени формулу Ньютона-Лейбница: F(${b}) - F(0) = ${b}³ + ${b}².`,
        en: `Find the antiderivative: F(x) = x³ + x². Apply Newton-Leibniz formula: F(${b}) - F(0) = ${b}³ + ${b}².`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Алғашқы функциясы: F(x) = 3·(x³/3) + 2·(x²/2) = x³ + x².`,
          `2-қадам: Ньютон-Лейбниц формуласы: ∫₀^${b} f(x)dx = F(${b}) - F(0).`,
          `3-қадам: F(${b}) = ${b}³ + ${b}² = ${Math.pow(b, 3)} + ${Math.pow(b, 2)} = ${ans}.`,
          `4-қадам: F(0) = 0³ + 0² = 0.`,
          `Жауабы: ${ans}.`,
        ],
        ru: [
          `Шаг 1: Находим первообразную: F(x) = 3(x³/3) + 2(x²/2) = x³ + x².`,
          `Шаг 2: По формуле Ньютона-Лейбница: ∫₀^${b} (3x² + 2x)dx = [x³ + x²]₀^${b}.`,
          `Шаг 3: Подставляем верхний предел: ${b}³ + ${b}² = ${Math.pow(b, 3)} + ${Math.pow(b, 2)} = ${ans}.`,
          `Шаг 4: Нижний предел равен 0.`,
          `Итог: ${ans}.`,
        ],
        en: [
          `Step 1: Find antiderivative: F(x) = x³ + x².`,
          `Step 2: Apply limits [0, ${b}]: F(${b}) - F(0).`,
          `Step 3: Evaluate upper limit: ${b}³ + ${b}² = ${ans}.`,
          `Step 4: Lower limit is 0.`,
          `Result: ${ans}.`,
        ],
      },
      xpReward: 45,
    };
  }

  if (type === 4) {
    // 4. Limits of Rational Function at Infinity: lim_{x -> inf} (a*x^2 + b*x) / (c*x^2 + d)
    const numMult = randInt(2, 4);
    const denMult = randInt(1, 3);
    const common = randInt(2, 3);
    const a = numMult * common;
    const c = denMult * common;
    const b = randInt(2, 7);
    const d = randInt(1, 8);

    // lim = a / c
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    const g = gcd(a, c);
    const redA = a / g;
    const redC = c / g;
    const ansText = redC === 1 ? `${redA}` : `${redA}/${redC}`;

    const correctText = ansText;
    const distractors = [
      redC === 1 ? `${redA + 1}` : `${redA + 1}/${redC}`,
      "0",
      "∞ (шексіздік)",
    ];

    const rawOptions = [
      { text: correctText, isCorrect: true },
      ...distractors.map((d) => ({ text: d, isCorrect: false })),
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_m11_limit_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Математикалық талдау", ru: "Математический анализ", en: "Calculus" },
      grade: { kz: "11-сынып", ru: "11 класс", en: "Grade 11" },
      topic: { kz: "Функция шегі", ru: "Предел функции", en: "Limits of Functions" },
      subtopic: { kz: "Шексіздіктегі шек", ru: "Предел на бесконечности", en: "Limits at infinity" },
      questionText: {
        kz: `Шексіздікке ұмтылғандағы функция шегін есептеңіз:`,
        ru: `Вычислите предел функции при x → ∞:`,
        en: `Evaluate the limit as x → ∞:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `lim_(x → ∞)  (${a}x² + ${b}x) / (${c}x² + ${d})`,
      },
      options,
      hint: {
        kz: `Алымы мен бөлімін ең үлкен дәрежеге, яғни x²-қа бөліңіз: (${a} + ${b}/x) / (${c} + ${d}/x²). x → ∞ ұмтылғанда ${b}/x → 0.`,
        ru: `Раздели числитель и знаменатель на наивысшую степень x²: (${a} + ${b}/x) / (${c} + ${d}/x²). При x → ∞ члены с x в знаменателе стремятся к 0.`,
        en: `Divide numerator and denominator by highest power x²: (${a} + ${b}/x) / (${c} + ${d}/x²). Terms with x in denominator approach 0.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: [∞/∞] түріндегі анықталмағандық бар.`,
          `2-қадам: Алымы мен бөлімін x²-қа бөлеміз: (${a} + ${b}/x) / (${c} + ${d}/x²).`,
          `3-қадам: x → ∞ кезінде: ${b}/x → 0 және ${d}/x² → 0.`,
          `4-қадам: Шек мәні: ${a} / ${c} = ${ansText}.`,
          `Жауабы: ${ansText}.`,
        ],
        ru: [
          `Шаг 1: Имеем неопределенность вида [∞/∞].`,
          `Шаг 2: Делим числитель и знаменатель на x²: (${a} + ${b}/x) / (${c} + ${d}/x²).`,
          `Шаг 3: При x → ∞ получаем: ${b}/x → 0 и ${d}/x² → 0.`,
          `Шаг 4: Предел равен отношению старших коэффициентов: ${a}/${c} = ${ansText}.`,
          `Итог: ${ansText}.`,
        ],
        en: [
          `Step 1: Indeterminate form [∞/∞].`,
          `Step 2: Divide numerator and denominator by x²: (${a} + ${b}/x) / (${c} + ${d}/x²).`,
          `Step 3: As x → ∞, reciprocal terms approach 0.`,
          `Step 4: Result is ratio of leading coefficients: ${a}/${c} = ${ansText}.`,
          `Result: ${ansText}.`,
        ],
      },
      xpReward: 45,
    };
  }

  if (type === 5) {
    // 5. 3D Spatial Geometry: Dot Product of Vectors in 3D Space
    // a = (x1, y1, z1), b = (x2, y2, z2)
    const x1 = randInt(1, 4);
    const y1 = randInt(-3, 3);
    const z1 = randInt(1, 4);

    const x2 = randInt(1, 4);
    const y2 = randInt(-3, 3);
    const z2 = randInt(1, 4);

    const dotProduct = x1 * x2 + y1 * y2 + z1 * z2;

    const correctText = `${dotProduct}`;
    const distractors = [
      `${dotProduct + 5}`,
      `${dotProduct - 4}`,
      `${x1 * x2 + z1 * z2}`,
    ];

    const rawOptions = [
      { text: correctText, isCorrect: true },
      ...distractors.map((d) => ({ text: d, isCorrect: false })),
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_m11_vec3d_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Кеңістіктік геометрия", ru: "Стереометрия и векторы", en: "3D Vectors" },
      grade: { kz: "11-сынып", ru: "11 класс", en: "Grade 11" },
      topic: { kz: "Кеңістіктегі векторлар", ru: "Векторы в пространстве", en: "Vectors in Space" },
      subtopic: { kz: "Скалярлық көбейтінді", ru: "Скалярное произведение векторов", en: "Scalar Dot Product" },
      questionText: {
        kz: `Кеңістікте a⃗(${x1}, ${y1}, ${z1}) және b⃗(${x2}, ${y2}, ${z2}) векторлары берілген. Олардың скалярлық көбейтіндісі a⃗ · b⃗ нешеге тең?`,
        ru: `В трехмерном пространстве даны векторы a⃗(${x1}, ${y1}, ${z1}) и b⃗(${x2}, ${y2}, ${z2}). Найдите их скалярное произведение a⃗ · b⃗:`,
        en: `In 3D space, vectors a⃗(${x1}, ${y1}, ${z1}) and b⃗(${x2}, ${y2}, ${z2}) are given. Find their dot product a⃗ · b⃗:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `a⃗ · b⃗ = x₁·x₂ + y₁·y₂ + z₁·z₂`,
      },
      options,
      hint: {
        kz: `Сәйкес координаттарын көбейтіп қосыңыз: (${x1} · ${x2}) + (${y1} · ${y2}) + (${z1} · ${z2}).`,
        ru: `Формула скалярного произведения в координатах: (${x1} · ${x2}) + (${y1} · ${y2}) + (${z1} · ${z2}).`,
        en: `Multiply corresponding coordinates and sum them: (${x1} · ${x2}) + (${y1} · ${y2}) + (${z1} · ${z2}).`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Скалярлық көбейтінді формуласы: a⃗ · b⃗ = x₁x₂ + y₁y₂ + z₁z₂.`,
          `2-қадам: x координаттары: ${x1} · ${x2} = ${x1 * x2}.`,
          `3-қадам: y координаттары: (${y1}) · (${y2}) = ${y1 * y2}.`,
          `4-қадам: z координаттары: ${z1} · ${z2} = ${z1 * z2}.`,
          `5-қадам: Қосамыз: ${x1 * x2} + (${y1 * y2}) + ${z1 * z2} = ${dotProduct}.`,
          `Жауабы: ${dotProduct}.`,
        ],
        ru: [
          `Шаг 1: Формула скалярного произведения: a⃗ · b⃗ = x₁x₂ + y₁y₂ + z₁z₂.`,
          `Шаг 2: По координате x: ${x1} · ${x2} = ${x1 * x2}.`,
          `Шаг 3: По координате y: (${y1}) · (${y2}) = ${y1 * y2}.`,
          `Шаг 4: По координате z: ${z1} · ${z2} = ${z1 * z2}.`,
          `Шаг 5: Складываем: ${x1 * x2} + (${y1 * y2}) + ${z1 * z2} = ${dotProduct}.`,
          `Итог: ${dotProduct}.`,
        ],
        en: [
          `Step 1: Formula: a⃗ · b⃗ = x₁x₂ + y₁y₂ + z₁z₂.`,
          `Step 2: x-product: ${x1} · ${x2} = ${x1 * x2}.`,
          `Step 3: y-product: (${y1}) · (${y2}) = ${y1 * y2}.`,
          `Step 4: z-product: ${z1} · ${z2} = ${z1 * z2}.`,
          `Step 5: Sum: ${dotProduct}.`,
          `Result: ${dotProduct}.`,
        ],
      },
      xpReward: 45,
    };
  }

  // 6. Combinatorics: Combinations C_n^k
  const nList = [6, 7, 8];
  const n = nList[randInt(0, nList.length - 1)];
  const k = randInt(2, 3);

  const factorial = (num: number): number => (num <= 1 ? 1 : num * factorial(num - 1));
  const combinations = factorial(n) / (factorial(k) * factorial(n - k));

  const correctText = `${combinations}`;
  const distractors = [
    `${combinations + 5}`,
    `${combinations - 4}`,
    `${combinations * 2}`,
  ];

  const rawOptions = [
    { text: correctText, isCorrect: true },
    ...distractors.map((d) => ({ text: d, isCorrect: false })),
  ];
  const shuffled = shuffle(rawOptions);
  const options = shuffled.map((opt, idx) => ({
    id: ["A", "B", "C", "D"][idx],
    text: opt.text,
    isCorrect: opt.isCorrect,
  }));

  return {
    id: `gen_m11_comb_${Date.now()}_${randInt(100, 999)}`,
    subject: { kz: "Комбинаторика", ru: "Комбинаторика", en: "Combinatorics" },
    grade: { kz: "11-сынып", ru: "11 класс", en: "Grade 11" },
    topic: { kz: "Терулер саны", ru: "Число сочетаний", en: "Combinations" },
    subtopic: { kz: "C_n^k формуласы", ru: "Формула C(n, k)", en: "Formula C(n, k)" },
    questionText: {
      kz: `${n} элементтен ${k} элементтен алынған терулер санын C_${n}^${k} табыңыз:`,
      ru: `Вычислите число сочетаний из ${n} элементов по ${k} (C_${n}^${k}):`,
      en: `Find the number of combinations of ${n} elements taken ${k} at a time (C_${n}^${k}):`,
    },
    formulaDisplay: {
      type: "fraction",
      numeratorLeft: `C_${n}^${k}`,
      denominatorLeft: "1",
      operator: "=",
      numeratorRight: `${n}!`,
      denominatorRight: `${k}! · (${n} — ${k})!`,
    },
    options,
    hint: {
      kz: `Теру формуласы: C_n^k = n! / (k! · (n - k)!). C_${n}^${k} = ${n}! / (${k}! · ${n - k}!).`,
      ru: `Формула сочетаний: C_n^k = n! / (k! · (n - k)!). Разложи факториалы и сократи общие множители.`,
      en: `Combinations formula: C_n^k = n! / (k! · (n - k)!). Cancel out common factorial factors.`,
    },
    stepByStepSolution: {
      kz: [
        `1-қадам: Формула: C_${n}^${k} = ${n}! / (${k}! · ${n - k}!).`,
        `2-қадам: ${n}! / ${n - k}! = ${k === 2 ? `${n} · ${n - 1}` : `${n} · ${n - 1} · ${n - 2}`}.`,
        `3-қадам: ${k}! = ${factorial(k)}.`,
        `4-қадам: Бөлеміз: ${k === 2 ? `${n * (n - 1)} / 2` : `${n * (n - 1) * (n - 2)} / 6`} = ${combinations}.`,
        `Жауабы: ${combinations}.`,
      ],
      ru: [
        `Шаг 1: Формула: C_${n}^${k} = ${n}! / (${k}! · ${n - k}!).`,
        `Шаг 2: Сокращаем ${n}! на ${n - k}!: произведение ${k === 2 ? `${n} · ${n - 1}` : `${n} · ${n - 1} · ${n - 2}`}.`,
        `Шаг 3: Знаменатель: ${k}! = ${factorial(k)}.`,
        `Шаг 4: Вычисляем: ${combinations}.`,
        `Итог: ${combinations}.`,
      ],
      en: [
        `Step 1: Formula: C_${n}^${k} = ${n}! / (${k}! · ${n - k}!).`,
        `Step 2: Cancel factors: ${k === 2 ? `${n} · ${n - 1}` : `${n} · ${n - 1} · ${n - 2}`}.`,
        `Step 3: Divide by ${k}! = ${factorial(k)}.`,
        `Step 4: Compute: ${combinations}.`,
        `Result: ${combinations}.`,
      ],
    },
    xpReward: 45,
  };
}
