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

// Generate 7th Grade Math: Very simple, elementary, foundational tasks
export function generateMathGrade7(): LocalizedQuestion {
  const type = randInt(1, 4);

  if (type === 1) {
    // 1. Simple 1st-degree linear equation: a * x + b = c
    const a = randInt(2, 5);
    const x = randInt(2, 9);
    const b = randInt(3, 15);
    const c = a * x + b;

    const correctText = `x = ${x}`;
    const distractors = [
      `x = ${x + 1}`,
      `x = ${Math.max(1, x - 1)}`,
      `x = ${x + 2}`,
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
      id: `gen_m7_lin_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Математика", ru: "Математика", en: "Mathematics" },
      grade: { kz: "7-сынып", ru: "7 класс", en: "Grade 7" },
      topic: { kz: "Сызықтық теңдеулер", ru: "Линейные уравнения", en: "Linear Equations" },
      subtopic: { kz: "Бір айнымалысы бар теңдеу", ru: "Уравнение с одной переменной", en: "One-variable equation" },
      questionText: {
        kz: `Қарапайым сызықтық теңдеуді шешіңіз:`,
        ru: `Решите простое линейное уравнение:`,
        en: `Solve the simple linear equation:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `${a}x + ${b} = ${c}`,
      },
      options,
      hint: {
        kz: `Алдымен ${b} санын оң жаққа минус таңбасымен өткізіңіз: ${a}x = ${c} - ${b}, содан соң ${a}-ға бөліңіз.`,
        ru: `Сначала перенеси число ${b} в правую часть с минусом: ${a}x = ${c} - ${b}, затем раздели на ${a}.`,
        en: `Move ${b} to the right side with a minus sign: ${a}x = ${c} - ${b}, then divide by ${a}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Белгісіз мүшені қалдырамыз: ${a}x = ${c} - ${b}.`,
          `2-қадам: Азайтамыз: ${a}x = ${c - b}.`,
          `3-қадам: x-ті табамыз: x = ${c - b} / ${a} = ${x}.`,
          `Жауабы: x = ${x}.`,
        ],
        ru: [
          `Шаг 1: Переносим слагаемое без x вправо: ${a}x = ${c} - ${b}.`,
          `Шаг 2: Вычисляем разность: ${a}x = ${c - b}.`,
          `Шаг 3: Находим x: x = ${c - b} : ${a} = ${x}.`,
          `Итог: x = ${x}.`,
        ],
        en: [
          `Step 1: Isolate term with x: ${a}x = ${c} - ${b}.`,
          `Step 2: Subtract: ${a}x = ${c - b}.`,
          `Step 3: Divide by coefficient: x = ${c - b} / ${a} = ${x}.`,
          `Result: x = ${x}.`,
        ],
      },
      xpReward: 20,
    };
  }

  if (type === 2) {
    // 2. Powers with same base: (a^m * a^n) / a^k
    const base = randInt(2, 4);
    const m = randInt(2, 4);
    const n = randInt(2, 3);
    const k = m + n - 2;
    const finalPower = m + n - k; // 2
    const ans = Math.pow(base, finalPower);

    const correctText = `${ans}`;
    const distractors = [
      `${Math.pow(base, finalPower + 1)}`,
      `${base}`,
      `${ans + 3}`,
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
      id: `gen_m7_pow_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Алгебра", ru: "Алгебра", en: "Algebra" },
      grade: { kz: "7-сынып", ru: "7 класс", en: "Grade 7" },
      topic: { kz: "Дәрежелер қасиеті", ru: "Свойства степеней", en: "Exponent Rules" },
      subtopic: { kz: "Бірдей негіздер", ru: "Одинаковые основания", en: "Same base powers" },
      questionText: {
        kz: `Дәрежелердің қасиеттерін қолданып, өрнектің мәнін табыңыз:`,
        ru: `Используя свойства степеней, найдите значение выражения:`,
        en: `Using exponent rules, calculate the value of the expression:`,
      },
      formulaDisplay: {
        type: "fraction",
        numeratorLeft: `${base}^${m} · ${base}^${n}`,
        denominatorLeft: `${base}^${k}`,
        operator: "=",
        numeratorRight: "?",
        denominatorRight: "1",
      },
      options,
      hint: {
        kz: `Негіздері бірдей дәрежелерді көбейткенде көрсеткіштер қосылады (${m} + ${n} = ${m + n}), ал бөлгенде азайтылады (${m + n} - ${k} = ${finalPower}).`,
        ru: `При умножении степеней показатели складываются (${m} + ${n} = ${m + n}), при делении — вычитаются (${m + n} - ${k} = ${finalPower}). ${base}^${finalPower} = ${ans}.`,
        en: `Multiply powers by adding exponents (${m} + ${n} = ${m + n}), and divide by subtracting (${m + n} - ${k} = ${finalPower}). ${base}^${finalPower} = ${ans}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Алымындағы дәрежелерді қосамыз: ${base}^(${m} + ${n}) = ${base}^${m + n}.`,
          `2-қадам: Бөліміне бөлгенде көрсеткішті азайтамыз: ${base}^(${m + n} - ${k}) = ${base}^${finalPower}.`,
          `3-қадам: Мәнін есептейміз: ${base}^${finalPower} = ${ans}.`,
          `Жауабы: ${ans}.`,
        ],
        ru: [
          `Шаг 1: В числителе складываем степени: ${base}^(${m} + ${n}) = ${base}^${m + n}.`,
          `Шаг 2: При делении вычитаем показатель знаменателя: ${base}^(${m + n} - ${k}) = ${base}^${finalPower}.`,
          `Шаг 3: Возводим основание в степень: ${base}^${finalPower} = ${ans}.`,
          `Итог: ${ans}.`,
        ],
        en: [
          `Step 1: Add exponents in numerator: ${base}^(${m} + ${n}) = ${base}^${m + n}.`,
          `Step 2: Subtract denominator exponent: ${base}^(${m + n} - ${k}) = ${base}^${finalPower}.`,
          `Step 3: Evaluate power: ${base}^${finalPower} = ${ans}.`,
          `Result: ${ans}.`,
        ],
      },
      xpReward: 20,
    };
  }

  if (type === 3) {
    // 3. Simple Percentage: Find P% of N
    const percents = [10, 20, 25, 50];
    const p = percents[randInt(0, percents.length - 1)];
    const bases = [120, 200, 240, 300, 400];
    const N = bases[randInt(0, bases.length - 1)];
    const ans = (N * p) / 100;

    const correctText = `${ans}`;
    const distractors = [`${ans + 10}`, `${Math.max(5, ans - 10)}`, `${ans * 2}`];

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
      id: `gen_m7_pct_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Математика", ru: "Математика", en: "Mathematics" },
      grade: { kz: "7-сынып", ru: "7 класс", en: "Grade 7" },
      topic: { kz: "Проценттер", ru: "Проценты", en: "Percentages" },
      subtopic: { kz: "Санның пайызын табу", ru: "Нахождение процента от числа", en: "Percentage of a number" },
      questionText: {
        kz: `${N} санының ${p}%-ын табыңыз:`,
        ru: `Найдите ${p}% от числа ${N}:`,
        en: `Find ${p}% of the number ${N}:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `(${N} · ${p}) / 100`,
      },
      options,
      hint: {
        kz: `Санның пайызын табу үшін санды пайызға көбейтіп, 100-ге бөлеміз: (${N} · ${p}) / 100.`,
        ru: `Чтобы найти процент от числа, умножь число на процент и раздели на 100: (${N} · ${p}) : 100.`,
        en: `To find the percentage of a number, multiply the number by the percentage and divide by 100.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Пайыз формуласы: (${N} · ${p}) / 100.`,
          `2-қадам: Көбейтеміз: ${N} · ${p} = ${N * p}.`,
          `3-қадам: 100-ге бөлеміз: ${N * p} / 100 = ${ans}.`,
          `Жауабы: ${ans}.`,
        ],
        ru: [
          `Шаг 1: Формула нахождения процента: (${N} · ${p}) / 100.`,
          `Шаг 2: Умножаем: ${N} · ${p} = ${N * p}.`,
          `Шаг 3: Делим на 100: ${N * p} : 100 = ${ans}.`,
          `Итог: ${ans}.`,
        ],
        en: [
          `Step 1: Formula: (${N} · ${p}) / 100.`,
          `Step 2: Multiply: ${N} · ${p} = ${N * p}.`,
          `Step 3: Divide by 100: ${N * p} / 100 = ${ans}.`,
          `Result: ${ans}.`,
        ],
      },
      xpReward: 20,
    };
  }

  // 4. Simple proportion: x / a = b / c
  const c = randInt(2, 4);
  const x = randInt(2, 8) * c;
  const a = randInt(2, 6);
  const b = (x * c) / a;

  const correctText = `x = ${x}`;
  const distractors = [`x = ${x + 2}`, `x = ${Math.max(1, x - 2)}`, `x = ${x * 2}`];

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
    id: `gen_m7_prop_${Date.now()}_${randInt(100, 999)}`,
    subject: { kz: "Математика", ru: "Математика", en: "Mathematics" },
    grade: { kz: "7-сынып", ru: "7 класс", en: "Grade 7" },
    topic: { kz: "Пропорция", ru: "Пропорция", en: "Proportions" },
    subtopic: { kz: "Белгісіз мүшені табу", ru: "Нахождение неизвестного члена", en: "Solving proportion" },
    questionText: {
      kz: `Пропорцияның белгісіз x мүшесін табыңыз:`,
      ru: `Найдите неизвестный член x пропорции:`,
      en: `Find the unknown term x of the proportion:`,
    },
    formulaDisplay: {
      type: "fraction",
      numeratorLeft: "x",
      denominatorLeft: `${a}`,
      operator: "=",
      numeratorRight: `${b}`,
      denominatorRight: `${c}`,
    },
    options,
    hint: {
      kz: `Пропорцияның негізгі қасиеті: шеткі мүшелерінің көбейтіндісі ортаңғы мүшелерінің көбейтіндісіне тең: x = (${a} · ${b}) / ${c}.`,
      ru: `Основное свойство пропорции: произведение крайних членов равно произведению средних: x = (${a} · ${b}) : ${c}.`,
      en: `Cross-multiplication property of proportions: x = (${a} · ${b}) / ${c}.`,
    },
    stepByStepSolution: {
      kz: [
        `1-қадам: Пропорцияның негізгі қасиеті: x · ${c} = ${a} · ${b}.`,
        `2-қадам: Көбейтеміз: ${a} · ${b} = ${a * b}.`,
        `3-қадам: x-ті табамыз: x = ${a * b} / ${c} = ${x}.`,
        `Жауабы: x = ${x}.`,
      ],
      ru: [
        `Шаг 1: Правило креста: x · ${c} = ${a} · ${b}.`,
        `Шаг 2: Умножаем средние члены: ${a} · ${b} = ${a * b}.`,
        `Шаг 3: Делим на ${c}: x = ${a * b} : ${c} = ${x}.`,
        `Итог: x = ${x}.`,
      ],
      en: [
        `Step 1: Cross-multiply: x · ${c} = ${a} · ${b}.`,
        `Step 2: Multiply: ${a} · ${b} = ${a * b}.`,
        `Step 3: Divide by ${c}: x = ${a * b} / ${c} = ${x}.`,
        `Result: x = ${x}.`,
      ],
    },
    xpReward: 20,
  };
}
