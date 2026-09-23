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

// Generate 10th Grade Math tasks (Exponential, Logarithmic, Trigonometry, Stereometry)
export function generateMathGrade10(): LocalizedQuestion {
  const type = randInt(1, 4);

  if (type === 1) {
    // 1. Exponential equation: a^(kx - b) = a^m
    const base = randInt(2, 4);
    const k = randInt(1, 3);
    const x = randInt(2, 5);
    const b = randInt(1, 4);
    const power = k * x - b;
    const rightVal = Math.pow(base, power);

    const correctText = `x = ${x}`;
    const distractors = [`x = ${x + 1}`, `x = ${Math.max(1, x - 1)}`, `x = ${x * 2}`];

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

    const kStr = k === 1 ? "x" : `${k}x`;

    return {
      id: `gen_m10_exp_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Алгебра", ru: "Алгебра", en: "Algebra" },
      grade: { kz: "10-сынып", ru: "10 класс", en: "Grade 10" },
      topic: { kz: "Көрсеткіштік теңдеулер", ru: "Показательные уравнения", en: "Exponential Equations" },
      subtopic: { kz: "Бірдей негізге келтіру", ru: "Приведение к одному основанию", en: "Reduction to same base" },
      questionText: {
        kz: `Көрсеткіштік теңдеуді шешіңіз:`,
        ru: `Решите показательное уравнение:`,
        en: `Solve the exponential equation:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `${base}^(${kStr} — ${b}) = ${rightVal}`,
      },
      options,
      hint: {
        kz: `Оң жағындағы ${rightVal} санын ${base}-нің дәрежесі түрінде жазыңыз: ${rightVal} = ${base}^${power}. Содан соң көрсеткіштерін теңестіріңіз: ${kStr} - ${b} = ${power}.`,
        ru: `Представь число ${rightVal} как степень числа ${base}: ${rightVal} = ${base}^${power}. Приравняй показатели: ${kStr} - ${b} = ${power}.`,
        en: `Write ${rightVal} as a power of ${base}: ${rightVal} = ${base}^${power}. Equate exponents: ${kStr} - ${b} = ${power}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Оң жағын дәреже түрінде жазамыз: ${base}^(${kStr} - ${b}) = ${base}^${power}.`,
          `2-қадам: Негіздері бірдей болғандықтан, дәреже көрсеткіштерін теңестіреміз: ${kStr} - ${b} = ${power}.`,
          `3-қадам: ${kStr} = ${power} + ${b} = ${power + b}.`,
          `4-қадам: x = ${power + b} / ${k} = ${x}.`,
          `Жауабы: x = ${x}.`,
        ],
        ru: [
          `Шаг 1: Представляем правую часть в виде степени: ${base}^(${kStr} - ${b}) = ${base}^${power}.`,
          `Шаг 2: Основания одинаковы, приравниваем показатели: ${kStr} - ${b} = ${power}.`,
          `Шаг 3: Находим ${kStr} = ${power + b}.`,
          `Шаг 4: x = ${power + b} : ${k} = ${x}.`,
          `Итог: x = ${x}.`,
        ],
        en: [
          `Step 1: Rewrite right side with base ${base}: ${base}^(${kStr} - ${b}) = ${base}^${power}.`,
          `Step 2: Bases match, equate exponents: ${kStr} - ${b} = ${power}.`,
          `Step 3: Solve for linear term: ${kStr} = ${power + b}.`,
          `Step 4: x = ${power + b} / ${k} = ${x}.`,
          `Result: x = ${x}.`,
        ],
      },
      xpReward: 35,
    };
  }

  if (type === 2) {
    // 2. Logarithmic equation: log_a(x + b) = c
    const base = randInt(2, 4);
    const c = randInt(2, 3);
    const b = randInt(1, 7);
    const powerVal = Math.pow(base, c);
    const x = powerVal - b;

    const correctText = `x = ${x}`;
    const distractors = [`x = ${x + 2}`, `x = ${powerVal}`, `x = ${x - 3}`];

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
      id: `gen_m10_log_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Алгебра", ru: "Алгебра", en: "Algebra" },
      grade: { kz: "10-сынып", ru: "10 класс", en: "Grade 10" },
      topic: { kz: "Логарифмдік теңдеулер", ru: "Логарифмические уравнения", en: "Logarithmic Equations" },
      subtopic: { kz: "Логарифм анықтамасы", ru: "Определение логарифма", en: "Definition of Logarithm" },
      questionText: {
        kz: `Логарифмдік теңдеуді шешіңіз:`,
        ru: `Решите логарифмическое уравнение:`,
        en: `Solve the logarithmic equation:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `log_${base}(x + ${b}) = ${c}`,
      },
      options,
      hint: {
        kz: `Логарифмнің анықтамасы бойынша: x + ${b} = ${base}^${c}. Алдымен ${base}^${c} есептеп, содан соң ${b}-ні азайтыңыз.`,
        ru: `По определению логарифма: x + ${b} = ${base}^${c}. Возведи ${base} в степень ${c} (= ${powerVal}) и вычти ${b}.`,
        en: `By definition of logarithm: x + ${b} = ${base}^${c}. Evaluate ${base}^${c} (= ${powerVal}) and subtract ${b}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Логарифм анықтамасы: x + ${b} = ${base}^${c}.`,
          `2-қадам: Дәрежені есептейміз: ${base}^${c} = ${powerVal}.`,
          `3-қадам: x + ${b} = ${powerVal}  ⇒  x = ${powerVal} - ${b} = ${x}.`,
          `4-қадам: Анықталу облысы: x + ${b} = ${powerVal} > 0 (орындалады).`,
          `Жауабы: x = ${x}.`,
        ],
        ru: [
          `Шаг 1: По определению логарифма: x + ${b} = ${base}^${c}.`,
          `Шаг 2: Вычисляем степень: ${base}^${c} = ${powerVal}.`,
          `Шаг 3: Находим x: x = ${powerVal} - ${b} = ${x}.`,
          `Шаг 4: Проверка ОДЗ: x + ${b} = ${powerVal} > 0 (верно).`,
          `Итог: x = ${x}.`,
        ],
        en: [
          `Step 1: By definition of logarithm: x + ${b} = ${base}^${c}.`,
          `Step 2: Calculate power: ${base}^${c} = ${powerVal}.`,
          `Step 3: Solve for x: x = ${powerVal} - ${b} = ${x}.`,
          `Step 4: Check domain: x + ${b} = ${powerVal} > 0 (satisfied).`,
          `Result: x = ${x}.`,
        ],
      },
      xpReward: 35,
    };
  }

  if (type === 3) {
    // 3. Trigonometry: sin^2(alpha) + cos^2(alpha) = 1
    const trigPairs = [
      { sin: "3/5", cosNum: 4, cosDen: 5, angle: "α" },
      { sin: "5/13", cosNum: 12, cosDen: 13, angle: "α" },
      { sin: "8/17", cosNum: 15, cosDen: 17, angle: "α" },
    ];
    const chosen = trigPairs[randInt(0, trigPairs.length - 1)];

    const correctText = `${chosen.cosNum}/${chosen.cosDen}`;
    const distractors = [
      `${chosen.cosNum + 1}/${chosen.cosDen}`,
      `${chosen.cosNum}/${chosen.cosDen + 1}`,
      `${chosen.cosNum - 1}/${chosen.cosDen}`,
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
      id: `gen_m10_trig_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Тригонометрия", ru: "Тригонометрия", en: "Trigonometry" },
      grade: { kz: "10-сынып", ru: "10 класс", en: "Grade 10" },
      topic: { kz: "Негізгі тригонометриялық теңбе-теңдік", ru: "Основное тригонометрическое тождество", en: "Fundamental Trigonometric Identity" },
      subtopic: { kz: "Косинусты табу", ru: "Нахождение косинуса", en: "Finding Cosine" },
      questionText: {
        kz: `Егер 0 < α < π/2 және sin(α) = ${chosen.sin} болса, онда cos(α) мәні нешеге тең?`,
        ru: `Если 0 < α < π/2 и sin(α) = ${chosen.sin}, то чему равен cos(α)?`,
        en: `Given 0 < α < π/2 and sin(α) = ${chosen.sin}, what is the value of cos(α)?`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `cos(α) = √(1 — sin²(α))`,
      },
      options,
      hint: {
        kz: `Негізгі тригонометриялық теңбе-теңдік: sin²(α) + cos²(α) = 1. Демек, cos(α) = √(1 - sin²(α)). Бірінші ширекте cos оң таңбалы.`,
        ru: `Основное тригонометрическое тождество: sin²(α) + cos²(α) = 1. cos(α) = √(1 - sin²(α)). В I четверти косинус положителен.`,
        en: `Identity: sin²(α) + cos²(α) = 1. Hence cos(α) = √(1 - sin²(α)). In quadrant I, cosine is positive.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: sin²(α) + cos²(α) = 1.`,
          `2-қадам: sin²(α) = (${chosen.sin})² = ${chosen.cosDen * chosen.cosDen - chosen.cosNum * chosen.cosNum}/${chosen.cosDen * chosen.cosDen}.`,
          `3-қадам: cos²(α) = 1 - sin²(α) = ${chosen.cosNum * chosen.cosNum}/${chosen.cosDen * chosen.cosDen}.`,
          `4-қадам: I ширекте cos(α) > 0  ⇒  cos(α) = ${chosen.cosNum}/${chosen.cosDen}.`,
          `Жауабы: ${chosen.cosNum}/${chosen.cosDen}.`,
        ],
        ru: [
          `Шаг 1: Формула: sin²(α) + cos²(α) = 1.`,
          `Шаг 2: Возводим sin(α) в квадрат.`,
          `Шаг 3: cos²(α) = 1 - sin²(α) = ${chosen.cosNum * chosen.cosNum} / ${chosen.cosDen * chosen.cosDen}.`,
          `Шаг 4: Так как угол в I четверти, cos(α) = ${chosen.cosNum}/${chosen.cosDen}.`,
          `Итог: ${chosen.cosNum}/${chosen.cosDen}.`,
        ],
        en: [
          `Step 1: Formula: sin²(α) + cos²(α) = 1.`,
          `Step 2: Square sin(α).`,
          `Step 3: cos²(α) = 1 - sin²(α) = ${chosen.cosNum * chosen.cosNum} / ${chosen.cosDen * chosen.cosDen}.`,
          `Step 4: Since angle is in quadrant I, cos(α) = ${chosen.cosNum}/${chosen.cosDen}.`,
          `Result: ${chosen.cosNum}/${chosen.cosDen}.`,
        ],
      },
      xpReward: 35,
    };
  }

  // 4. Stereometry: Cylinder Volume V = pi * r^2 * h
  const r = randInt(2, 5);
  const h = randInt(3, 8);
  const volCoeff = r * r * h;

  const correctText = `${volCoeff}π см³`;
  const distractors = [
    `${volCoeff * 2}π см³`,
    `${r * h * 2}π см³`,
    `${volCoeff + 10}π см³`,
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
    id: `gen_m10_stereo_${Date.now()}_${randInt(100, 999)}`,
    subject: { kz: "Геометрия", ru: "Геометрия", en: "Geometry" },
    grade: { kz: "10-сынып", ru: "10 класс", en: "Grade 10" },
    topic: { kz: "Стереометрия", ru: "Стереометрия", en: "Stereometry" },
    subtopic: { kz: "Цилиндр көлемі", ru: "Объем цилиндра", en: "Cylinder Volume" },
    questionText: {
      kz: `Цилиндр табанының радиусы r = ${r} см, ал биіктігі h = ${h} см. Цилиндрдің көлемін V табыңыз:`,
      ru: `Радиус основания цилиндра r = ${r} см, а высота h = ${h} см. Найдите объем V цилиндра:`,
      en: `The base radius of a cylinder is r = ${r} cm, and height is h = ${h} cm. Find its volume V:`,
    },
    formulaDisplay: {
      type: "expression",
      expressionText: `V = π · r² · h = π · ${r}² · ${h}`,
    },
    options,
    hint: {
      kz: `Цилиндр көлемінің формуласы: V = π · r² · h. Радиусты квадраттаңыз: ${r}² = ${r * r}, содан соң биіктік ${h}-ке көбейтіңіз.`,
      ru: `Формула объема цилиндра: V = π · r² · h. Возведи радиус в квадрат: ${r}² = ${r * r}, затем умножь на высоту ${h}.`,
      en: `Cylinder volume formula: V = π · r² · h. Square radius: ${r}² = ${r * r}, then multiply by height ${h}.`,
    },
    stepByStepSolution: {
      kz: [
        `1-қадам: Формула: V = π · r² · h.`,
        `2-қадам: Табан ауданы: S = π · r² = π · ${r}² = ${r * r}π см².`,
        `3-қадам: Биіктікке көбейтеміз: V = ${r * r}π · ${h} = ${volCoeff}π см³.`,
        `Жауабы: ${volCoeff}π см³.`,
      ],
      ru: [
        `Шаг 1: Формула объема цилиндра: V = π · r² · h.`,
        `Шаг 2: Площадь основания: S = π · r² = ${r * r}π см².`,
        `Шаг 3: Умножаем на высоту: V = ${r * r}π · ${h} = ${volCoeff}π см³.`,
        `Итог: ${volCoeff}π см³.`,
      ],
      en: [
        `Step 1: Cylinder volume formula: V = π · r² · h.`,
        `Step 2: Base area: S = π · r² = ${r * r}π cm².`,
        `Step 3: Multiply by height: V = ${r * r}π · ${h} = ${volCoeff}π cm³.`,
        `Result: ${volCoeff}π cm³.`,
      ],
    },
    xpReward: 35,
  };
}
