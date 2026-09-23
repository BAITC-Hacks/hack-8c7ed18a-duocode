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

// Generate 8th Grade Math tasks
export function generateMathGrade8(): LocalizedQuestion {
  const type = randInt(1, 4);

  if (type === 1) {
    // 1. Pythagorean Theorem
    const triples = [
      [3, 4, 5],
      [6, 8, 10],
      [5, 12, 13],
      [8, 15, 17],
      [9, 12, 15],
    ];
    const chosen = triples[randInt(0, triples.length - 1)];
    const a = chosen[0];
    const b = chosen[1];
    const c = chosen[2];

    const correctText = `c = ${c} см`;
    const distractors = [`c = ${c + 2} см`, `c = ${a + b} см`, `c = ${c - 1} см`];

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
      id: `gen_m8_pyth_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Геометрия", ru: "Геометрия", en: "Geometry" },
      grade: { kz: "8-сынып", ru: "8 класс", en: "Grade 8" },
      topic: { kz: "Пифагор теоремасы", ru: "Теорема Пифагора", en: "Pythagorean Theorem" },
      subtopic: { kz: "Тікбұрышты үшбұрыш", ru: "Прямоугольный треугольник", en: "Right triangle" },
      questionText: {
        kz: `Тікбұрышты үшбұрыштың катеттері a = ${a} см, b = ${b} см. Гипотенуза с-ның ұзындығын табыңыз:`,
        ru: `В прямоугольном треугольнике катеты a = ${a} см, b = ${b} см. Найдите длину гипотенузы c:`,
        en: `In a right triangle, legs are a = ${a} cm and b = ${b} cm. Find hypotenuse c:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `c² = a² + b² = ${a}² + ${b}²`,
      },
      options,
      hint: {
        kz: `Пифагор теоремасы бойынша c = √(a² + b²). ${a}² = ${a * a}, ${b}² = ${b * b}.`,
        ru: `По теореме Пифагора c = √(a² + b²). ${a}² = ${a * a}, ${b}² = ${b * b}. Сумма равна ${c * c}.`,
        en: `By Pythagorean theorem c = √(a² + b²). ${a}² = ${a * a}, ${b}² = ${b * b}. Sum is ${c * c}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Пифагор теоремасы: c² = a² + b².`,
          `2-қадам: Катеттер квадраттары: ${a}² = ${a * a}, ${b}² = ${b * b}.`,
          `3-қадам: Қосамыз: c² = ${a * a} + ${b * b} = ${c * c}.`,
          `4-қадам: Түбірден шығарамыз: c = √${c * c} = ${c} см.`,
          `Жауабы: c = ${c} см.`,
        ],
        ru: [
          `Шаг 1: Формула теоремы Пифагора: c² = a² + b².`,
          `Шаг 2: Возводим в квадрат: ${a}² = ${a * a}, ${b}² = ${b * b}.`,
          `Шаг 3: Складываем: c² = ${a * a + b * b}.`,
          `Шаг 4: Извлекаем корень: c = √${c * c} = ${c} см.`,
          `Итог: c = ${c} см.`,
        ],
        en: [
          `Step 1: Formula: c² = a² + b².`,
          `Step 2: Square both legs: ${a}² = ${a * a}, ${b}² = ${b * b}.`,
          `Step 3: Add squares: c² = ${a * a + b * b}.`,
          `Step 4: Take root: c = √${c * c} = ${c} cm.`,
          `Result: c = ${c} cm.`,
        ],
      },
      xpReward: 25,
    };
  }

  if (type === 2) {
    // 2. Square root calculation: sqrt(a * b) = sqrt(a) * sqrt(b)
    const roots = [
      { a: 16, b: 25, ans: 20 },
      { a: 9, b: 36, ans: 18 },
      { a: 4, b: 49, ans: 14 },
      { a: 25, b: 36, ans: 30 },
      { a: 9, b: 16, ans: 12 },
    ];
    const chosen = roots[randInt(0, roots.length - 1)];
    const product = chosen.a * chosen.b;
    const ans = chosen.ans;

    const correctText = `${ans}`;
    const distractors = [`${ans + 2}`, `${ans - 2}`, `${Math.round(ans * 1.5)}`];

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
      id: `gen_m8_sqrt_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Алгебра", ru: "Алгебра", en: "Algebra" },
      grade: { kz: "8-сынып", ru: "8 класс", en: "Grade 8" },
      topic: { kz: "Арифметикалық квадрат түбір", ru: "Арифметический квадратный корень", en: "Arithmetic Square Root" },
      subtopic: { kz: "Түбірлер қасиеттері", ru: "Свойства корней", en: "Root properties" },
      questionText: {
        kz: `Өрнектің мәнін есептеңіз:`,
        ru: `Вычислите значение выражения:`,
        en: `Evaluate the expression:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `√(${chosen.a} · ${chosen.b})`,
      },
      options,
      hint: {
        kz: `Көбейтіндінің түбірі көбейткіштердің түбірлеріне тең: √(${chosen.a} · ${chosen.b}) = √${chosen.a} · √${chosen.b}.`,
        ru: `Корень из произведения равен произведению корней: √(${chosen.a} · ${chosen.b}) = √${chosen.a} · √${chosen.b}.`,
        en: `The square root of a product is equal to the product of square roots: √(${chosen.a} · ${chosen.b}) = √${chosen.a} · √${chosen.b}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Түбір қасиетін қолданамыз: √(${chosen.a} · ${chosen.b}) = √${chosen.a} · √${chosen.b}.`,
          `2-қадам: √${chosen.a} = ${Math.sqrt(chosen.a)}, √${chosen.b} = ${Math.sqrt(chosen.b)}.`,
          `3-қадам: Көбейтеміз: ${Math.sqrt(chosen.a)} · ${Math.sqrt(chosen.b)} = ${ans}.`,
          `Жауабы: ${ans}.`,
        ],
        ru: [
          `Шаг 1: Применяем свойство корня: √(${chosen.a} · ${chosen.b}) = √${chosen.a} · √${chosen.b}.`,
          `Шаг 2: Извлекаем корни: √${chosen.a} = ${Math.sqrt(chosen.a)}, √${chosen.b} = ${Math.sqrt(chosen.b)}.`,
          `Шаг 3: Перемножаем результаты: ${Math.sqrt(chosen.a)} · ${Math.sqrt(chosen.b)} = ${ans}.`,
          `Итог: ${ans}.`,
        ],
        en: [
          `Step 1: Apply root law: √(${chosen.a} · ${chosen.b}) = √${chosen.a} · √${chosen.b}.`,
          `Step 2: Extract individual roots: √${chosen.a} = ${Math.sqrt(chosen.a)}, √${chosen.b} = ${Math.sqrt(chosen.b)}.`,
          `Step 3: Multiply: ${Math.sqrt(chosen.a)} · ${Math.sqrt(chosen.b)} = ${ans}.`,
          `Result: ${ans}.`,
        ],
      },
      xpReward: 25,
    };
  }

  if (type === 3) {
    // 3. Area of Parallelogram: S = a * h
    const a = randInt(5, 12);
    const h = randInt(4, 9);
    const s = a * h;

    const correctText = `S = ${s} см²`;
    const distractors = [`S = ${s / 2} см²`, `S = ${s + a} см²`, `S = ${s - h} см²`];

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
      id: `gen_m8_area_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Геометрия", ru: "Геометрия", en: "Geometry" },
      grade: { kz: "8-сынып", ru: "8 класс", en: "Grade 8" },
      topic: { kz: "Параллелограмм ауданы", ru: "Площадь параллелограмма", en: "Parallelogram Area" },
      subtopic: { kz: "Аудан формуласы", ru: "Формула площади", en: "Area formula" },
      questionText: {
        kz: `Параллелограммның қабырғасы a = ${a} см, ал оған түсірілген биіктігі h = ${h} см. Параллелограммның ауданын S табыңыз:`,
        ru: `Сторона параллелограмма a = ${a} см, а проведенная к ней высота h = ${h} см. Найдите площадь S параллелограмма:`,
        en: `The side of a parallelogram is a = ${a} cm, and the altitude drawn to it is h = ${h} cm. Find the area S:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `S = a · h = ${a} · ${h}`,
      },
      options,
      hint: {
        kz: `Параллелограммның ауданы: S = a · h. Қабырғасы мен биіктігін көбейтіңіз.`,
        ru: `Формула площади параллелограмма: S = a · h. Умножь сторону на высоту.`,
        en: `Area formula of a parallelogram: S = a · h. Multiply side by altitude.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Параллелограмм ауданы: S = a · h.`,
          `2-қадам: Берілгені: a = ${a} см, h = ${h} см.`,
          `3-қадам: Көбейтеміз: S = ${a} · ${h} = ${s} см².`,
          `Жауабы: S = ${s} см².`,
        ],
        ru: [
          `Шаг 1: Формула: S = a · h.`,
          `Шаг 2: Подставляем: a = ${a} см, h = ${h} см.`,
          `Шаг 3: Вычисляем: S = ${a} · ${h} = ${s} см².`,
          `Итог: S = ${s} см².`,
        ],
        en: [
          `Step 1: Formula: S = a · h.`,
          `Step 2: Plug in values: a = ${a} cm, h = ${h} cm.`,
          `Step 3: Multiply: S = ${a} · ${h} = ${s} cm².`,
          `Result: S = ${s} cm².`,
        ],
      },
      xpReward: 25,
    };
  }

  // 4. Linear inequality: ax - b > c
  const a = randInt(2, 4);
  const root = randInt(2, 6);
  const b = randInt(2, 8);
  const c = a * root - b;

  const correctText = `x > ${root}`;
  const distractors = [`x < ${root}`, `x > ${root + 2}`, `x < ${root - 1}`];

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
    id: `gen_m8_ineq_${Date.now()}_${randInt(100, 999)}`,
    subject: { kz: "Алгебра", ru: "Алгебра", en: "Algebra" },
    grade: { kz: "8-сынып", ru: "8 класс", en: "Grade 8" },
    topic: { kz: "Сызықтық теңсіздіктер", ru: "Линейные неравенства", en: "Linear Inequalities" },
    subtopic: { kz: "Теңсіздікті шешу", ru: "Решение неравенства", en: "Solving inequality" },
    questionText: {
      kz: `Сызықтық теңсіздікті шешіңіз:`,
      ru: `Решите линейное неравенство:`,
      en: `Solve the linear inequality:`,
    },
    formulaDisplay: {
      type: "expression",
      expressionText: `${a}x — ${b} > ${c}`,
    },
    options,
    hint: {
      kz: `${b} санын оң жаққа қосу таңбасымен өткізіңіз: ${a}x > ${c} + ${b}, сосын ${a}-ға бөліңіз.`,
      ru: `Перенеси число -${b} в правую часть со знаком плюс: ${a}x > ${c} + ${b}, затем раздели на ${a}.`,
      en: `Move -${b} to the right side with plus: ${a}x > ${c} + ${b}, then divide by positive ${a}.`,
    },
    stepByStepSolution: {
      kz: [
        `1-қадам: ${b}-ні оңға өткіземіз: ${a}x > ${c} + ${b}  ⇒  ${a}x > ${c + b}.`,
        `2-қадам: Екі жағын ${a}-ға бөлеміз: x > ${c + b} / ${a}.`,
        `3-қадам: x > ${root}.`,
        `Жауабы: x > ${root}.`,
      ],
      ru: [
        `Шаг 1: Переносим -${b} вправо: ${a}x > ${c} + ${b}  ⇒  ${a}x > ${c + b}.`,
        `Шаг 2: Делим обе части на положительное число ${a}: x > ${c + b} : ${a}.`,
        `Шаг 3: Получаем: x > ${root}.`,
        `Итог: x > ${root}.`,
      ],
      en: [
        `Step 1: Move -${b} to right: ${a}x > ${c} + ${b}  ⇒  ${a}x > ${c + b}.`,
        `Step 2: Divide by positive ${a}: x > ${c + b} / ${a}.`,
        `Step 3: Evaluate: x > ${root}.`,
        `Result: x > ${root}.`,
      ],
    },
    xpReward: 25,
  };
}
