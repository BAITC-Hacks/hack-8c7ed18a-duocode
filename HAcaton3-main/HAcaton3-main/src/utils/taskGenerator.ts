import { Language } from "../types";
import { LocalizedQuestion } from "../data/practiceQuestions";
import { generateMathGrade5or6 } from "./mathGrade5and6";
import { generateMathGrade7 } from "./mathGrade7";
import { generateMathGrade8 } from "./mathGrade8";
import { generateMathGrade10 } from "./mathGrade10";
import { generateMathGrade11 } from "./mathGrade11";
import { generateEnglishTask } from "./englishTaskGenerator";
import { generateBiologyTask } from "./biologyTaskGenerator";
import { generateChemistryTask } from "./chemistryTaskGenerator";
import { generateCSTask } from "./csTaskGenerator";

export {
  generateMathGrade5or6,
  generateMathGrade7,
  generateMathGrade8,
  generateMathGrade10,
  generateMathGrade11,
  generateEnglishTask,
  generateBiologyTask,
  generateChemistryTask,
  generateCSTask,
};

// Helper for random integer in range [min, max] inclusive
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper to shuffle an array
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate a random 9th Grade Math (Algebra) task
export function generateMathGrade9(): LocalizedQuestion {
  const taskType = randInt(1, 5);

  if (taskType === 1) {
    // 1. Quadratic Equation with random integer roots
    const r1 = randInt(1, 6);
    let r2 = randInt(1, 7);
    if (r2 === r1) r2 += 1;

    const b = -(r1 + r2);
    const c = r1 * r2;
    const bSign = b < 0 ? `— ${Math.abs(b)}x` : `+ ${b}x`;
    const cSign = c < 0 ? `— ${Math.abs(c)}` : `+ ${c}`;

    const correctText = `x₁ = ${Math.min(r1, r2)}, x₂ = ${Math.max(r1, r2)}`;
    const distractors = [
      `x₁ = ${-Math.min(r1, r2)}, x₂ = ${-Math.max(r1, r2)}`,
      `x₁ = 1, x₂ = ${c}`,
      `x₁ = ${Math.min(r1, r2)}, x₂ = ${-Math.max(r1, r2)}`,
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
      id: `gen_m9_quad_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Алгебра", ru: "Алгебра", en: "Algebra" },
      grade: { kz: "9-сынып", ru: "9 класс", en: "Grade 9" },
      topic: { kz: "Квадрат теңдеулер", ru: "Квадратные уравнения", en: "Quadratic Equations" },
      subtopic: { kz: "Виет теоремасы", ru: "Теорема Виета", en: "Vieta's Theorem" },
      questionText: {
        kz: `x² ${bSign} ${cSign} = 0 теңдеуінің түбірлерін табыңыз:`,
        ru: `Найдите корни квадратного уравнения x² ${bSign} ${cSign} = 0:`,
        en: `Find the roots of the quadratic equation x² ${bSign} ${cSign} = 0:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `x² ${bSign} ${cSign} = 0  ⇒  (x — ${r1})(x — ${r2}) = 0`,
      },
      options,
      hint: {
        kz: `Виет теоремасы: x₁ + x₂ = ${-b}, ал x₁ · x₂ = ${c}. Түбірлердің көбейтіндісі мен қосындысын тексеріңіз.`,
        ru: `По теореме Виета сумма корней равна ${-b}, а произведение равно ${c}.`,
        en: `By Vieta's theorem, sum of roots = ${-b}, and product of roots = ${c}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Келтірілген теңдеу: x² - (${r1 + r2})x + ${c} = 0.`,
          `2-қадам: Виет теоремасы: x₁ + x₂ = ${r1 + r2}, x₁ · x₂ = ${c}.`,
          `3-қадам: Бұл шартты қанағаттандыратын сандар: ${r1} және ${r2}.`,
          `Жауабы: x₁ = ${Math.min(r1, r2)}, x₂ = ${Math.max(r1, r2)}.`,
        ],
        ru: [
          `Шаг 1: Приведенное квадратное уравнение: x² - (${r1 + r2})x + ${c} = 0.`,
          `Шаг 2: По теореме Виета: x₁ + x₂ = ${r1 + r2}, x₁ · x₂ = ${c}.`,
          `Шаг 3: Подбираем множители: ${r1} и ${r2}.`,
          `Итог: x₁ = ${Math.min(r1, r2)}, x₂ = ${Math.max(r1, r2)}.`,
        ],
        en: [
          `Step 1: Standard form: x² - (${r1 + r2})x + ${c} = 0.`,
          `Step 2: Vieta's relations: x₁ + x₂ = ${r1 + r2}, x₁ · x₂ = ${c}.`,
          `Step 3: Matching factor pair: ${r1} and ${r2}.`,
          `Result: x₁ = ${Math.min(r1, r2)}, x₂ = ${Math.max(r1, r2)}.`,
        ],
      },
      xpReward: 30,
    };
  }

  if (taskType === 2) {
    // 2. Algebraic Fractions with common denominator and factoring
    const factor = randInt(2, 6);
    const root = randInt(2, 8);
    const topConst = factor * root;

    const correctText = `${factor}`;
    const distractors = [
      `${factor}x / (x — ${root})`,
      `x + ${factor}`,
      `(${factor}x — ${topConst}) / 2`,
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
      id: `gen_m9_frac_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Алгебра", ru: "Алгебра", en: "Algebra" },
      grade: { kz: "9-сынып", ru: "9 класс", en: "Grade 9" },
      topic: { kz: "Алгебралық бөлшектер", ru: "Алгебраические дроби", en: "Algebraic Fractions" },
      subtopic: { kz: "Қысқарту", ru: "Сокращение дробей", en: "Fraction Simplification" },
      questionText: {
        kz: `x ≠ ${root} болғанда өрнекті ықшамдаңыз:`,
        ru: `Упростите выражение при x ≠ ${root}:`,
        en: `Simplify the expression when x ≠ ${root}:`,
      },
      formulaDisplay: {
        type: "fraction",
        numeratorLeft: `${factor}x`,
        denominatorLeft: `x — ${root}`,
        operator: "—",
        numeratorRight: `${topConst}`,
        denominatorRight: `x — ${root}`,
      },
      options,
      hint: {
        kz: `Ортақ бөлім: (x - ${root}). Алымындағы ${factor} санын жақша сыртына шығарыңыз: ${factor}(x - ${root}).`,
        ru: `Одинаковый знаменатель (x - ${root}). Вынеси общий множитель ${factor} в числителе: ${factor}(x - ${root}).`,
        en: `Common denominator is (x - ${root}). Factor out ${factor} in the numerator: ${factor}(x - ${root}).`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Бөлімі бірдей, алымдарын қосамыз: (${factor}x - ${topConst}) / (x - ${root}).`,
          `2-қадам: Ортақ көбейткішті шығарамыз: ${factor} · (x - ${root}) / (x - ${root}).`,
          `3-қадам: (x - ${root}) жақшасын қысқартамыз.`,
          `Жауабы: ${factor}.`,
        ],
        ru: [
          `Шаг 1: Записываем под общий знаменатель: (${factor}x - ${topConst}) / (x - ${root}).`,
          `Шаг 2: Выносим множитель ${factor}: ${factor}(x - ${root}) / (x - ${root}).`,
          `Шаг 3: Сокращаем скобку (x - ${root}).`,
          `Итог: ${factor}.`,
        ],
        en: [
          `Step 1: Write over common denominator: (${factor}x - ${topConst}) / (x - ${root}).`,
          `Step 2: Factor out ${factor}: ${factor}(x - ${root}) / (x - ${root}).`,
          `Step 3: Cancel identical term (x - ${root}).`,
          `Result: ${factor}.`,
        ],
      },
      xpReward: 25,
    };
  }

  if (taskType === 3) {
    // 3. Difference of squares algebraic fractions: (x² - m²) / (x - m)
    const m = randInt(2, 9);
    const mSq = m * m;

    const correctText = `x + ${m}`;
    const distractors = [`x — ${m}`, `${m}`, `x² — ${m}`];

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
      id: `gen_m9_diffsq_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Алгебра", ru: "Алгебра", en: "Algebra" },
      grade: { kz: "9-сынып", ru: "9 класс", en: "Grade 9" },
      topic: { kz: "Қысқаша көбейту формулалары", ru: "Формулы сокращенного умножения", en: "Factoring Formulas" },
      subtopic: { kz: "Квадраттар айырымы", ru: "Разность квадратов", en: "Difference of Squares" },
      questionText: {
        kz: `x ≠ ${m} болғанда бөлшекті қысқартыңыз:`,
        ru: `Сократите дробь при условии x ≠ ${m}:`,
        en: `Simplify the rational fraction when x ≠ ${m}:`,
      },
      formulaDisplay: {
        type: "fraction",
        numeratorLeft: `x² — ${mSq}`,
        denominatorLeft: `x — ${m}`,
        operator: "=",
        numeratorRight: `(x — ${m})(x + ${m})`,
        denominatorRight: `x — ${m}`,
      },
      options,
      hint: {
        kz: `Алымындағы квадраттар айырымын ашыңыз: a² - b² = (a - b)(a + b). x² - ${mSq} = (x - ${m})(x + ${m}).`,
        ru: `Разложи числитель по формуле разности квадратов: a² - b² = (a - b)(a + b). Числитель: (x - ${m})(x + ${m}).`,
        en: `Expand using difference of squares: a² - b² = (a - b)(a + b). Numerator becomes (x - ${m})(x + ${m}).`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Алымы: x² - ${mSq} = (x - ${m})(x + ${m}).`,
          `2-қадам: Бөлімі: (x - ${m}).`,
          `3-қадам: (x - ${m}) өрнегін қысқартамыз.`,
          `Жауабы: x + ${m}.`,
        ],
        ru: [
          `Шаг 1: Раскладываем числитель: x² - ${mSq} = (x - ${m})(x + ${m}).`,
          `Шаг 2: В знаменателе скобка (x - ${m}).`,
          `Шаг 3: Сокращаем одинаковые сомножители.`,
          `Итог: x + ${m}.`,
        ],
        en: [
          `Step 1: Factor numerator: x² - ${mSq} = (x - ${m})(x + ${m}).`,
          `Step 2: Denominator is (x - ${m}).`,
          `Step 3: Cancel identical factor (x - ${m}).`,
          `Result: x + ${m}.`,
        ],
      },
      xpReward: 30,
    };
  }

  if (taskType === 4) {
    // 4. Arithmetic progression (9th grade)
    const a1 = randInt(2, 10);
    const d = randInt(2, 5);
    const n = randInt(5, 10);
    const an = a1 + (n - 1) * d;

    const correctText = `${an}`;
    const distractors = [
      `${an + d}`,
      `${an - d}`,
      `${a1 * n}`,
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
      id: `gen_m9_ap_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Алгебра", ru: "Алгебра", en: "Algebra" },
      grade: { kz: "9-сынып", ru: "9 класс", en: "Grade 9" },
      topic: { kz: "Арифметикалық прогрессия", ru: "Арифметическая прогрессия", en: "Arithmetic Progression" },
      subtopic: { kz: "n-ші мүшесінің формуласы", ru: "Формула n-го члена", en: "n-th Term Formula" },
      questionText: {
        kz: `Арифметикалық прогрессияның бірінші мүшесі a₁ = ${a1}, айырымы d = ${d}. Осы прогрессияның ${n}-ші мүшесін (a_${n}) табыңыз:`,
        ru: `В арифметической прогрессии первый член a₁ = ${a1}, разность d = ${d}. Найдите ${n}-й член (a_${n}):`,
        en: `In an arithmetic progression, first term a₁ = ${a1} and difference d = ${d}. Find the ${n}-th term (a_${n}):`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `a_${n} = a₁ + (${n} — 1) · d = ${a1} + ${n - 1} · ${d}`,
      },
      options,
      hint: {
        kz: `Формула: a_n = a₁ + (n - 1)d. a_${n} = ${a1} + (${n} - 1) · ${d} = ${a1} + ${n - 1} · ${d}.`,
        ru: `Формула n-го члена: a_n = a₁ + (n - 1)d. Подставь: a_${n} = ${a1} + ${n - 1} · ${d}.`,
        en: `Formula for n-th term: a_n = a₁ + (n - 1)d. Substitute: a_${n} = ${a1} + ${n - 1} · ${d}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Прогрессия формуласы: a_n = a₁ + (n - 1)d.`,
          `2-қадам: Берілгені: a₁ = ${a1}, d = ${d}, n = ${n}.`,
          `3-қадам: (n - 1) = ${n - 1}, көбейтеміз: ${n - 1} · ${d} = ${(n - 1) * d}.`,
          `4-қадам: Қосамыз: ${a1} + ${(n - 1) * d} = ${an}.`,
          `Жауабы: ${an}.`,
        ],
        ru: [
          `Шаг 1: Формула n-го члена: a_n = a₁ + (n - 1)d.`,
          `Шаг 2: Подставляем данные: a₁ = ${a1}, d = ${d}, n = ${n}.`,
          `Шаг 3: Вычисляем приращение: (${n} - 1) · ${d} = ${(n - 1) * d}.`,
          `Шаг 4: Суммируем с первым членом: ${a1} + ${(n - 1) * d} = ${an}.`,
          `Итог: ${an}.`,
        ],
        en: [
          `Step 1: Formula for general term: a_n = a₁ + (n - 1)d.`,
          `Step 2: Plug in values: a₁ = ${a1}, d = ${d}, n = ${n}.`,
          `Step 3: Calculate difference step: (${n} - 1) · ${d} = ${(n - 1) * d}.`,
          `Step 4: Add to initial term: ${a1} + ${(n - 1) * d} = ${an}.`,
          `Result: ${an}.`,
        ],
      },
      xpReward: 30,
    };
  }

  // 5. System of Linear Equations (9th grade)
  const x = randInt(3, 8);
  const y = randInt(1, 5);
  const sum = x + y;
  const diff = x - y;

  const correctText = `x = ${x}, y = ${y}`;
  const distractors = [
    `x = ${y}, y = ${x}`,
    `x = ${x + 1}, y = ${y - 1}`,
    `x = ${sum}, y = ${diff}`,
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
    id: `gen_m9_sys_${Date.now()}_${randInt(100, 999)}`,
    subject: { kz: "Алгебра", ru: "Алгебра", en: "Algebra" },
    grade: { kz: "9-сынып", ru: "9 класс", en: "Grade 9" },
    topic: { kz: "Теңдеулер жүйесі", ru: "Системы уравнений", en: "Systems of Equations" },
    subtopic: { kz: "Қосу тәсілі", ru: "Метод сложения", en: "Addition Method" },
    questionText: {
      kz: `Сызықтық теңдеулер жүйесін шешіңіз:`,
      ru: `Решите систему линейных уравнений:`,
      en: `Solve the system of linear equations:`,
    },
    formulaDisplay: {
      type: "expression",
      expressionText: `{ x + y = ${sum} ;  x — y = ${diff} }`,
    },
    options,
    hint: {
      kz: `Екі теңдеуді мүшелеп қосыңыз: (x + y) + (x - y) = ${sum} + ${diff}  ⇒  2x = ${sum + diff}.`,
      ru: `Сложи два уравнения почленно: y и -y взаимно уничтожатся, останется 2x = ${sum + diff}. Найди x, затем y.`,
      en: `Add both equations term by term: y and -y cancel out, leaving 2x = ${sum + diff}. Find x, then y.`,
    },
    stepByStepSolution: {
      kz: [
        `1-қадам: Теңдеулерді қосамыз: 2x = ${sum} + ${diff} = ${sum + diff}.`,
        `2-қадам: x = ${sum + diff} / 2 = ${x}.`,
        `3-қадам: x-ті бірінші теңдеуге қоямыз: ${x} + y = ${sum}  ⇒  y = ${sum} - ${x} = ${y}.`,
        `Жауабы: x = ${x}, y = ${y}.`,
      ],
      ru: [
        `Шаг 1: Складываем уравнения: (x + y) + (x - y) = ${sum} + ${diff}.`,
        `Шаг 2: Получаем 2x = ${sum + diff}, откуда x = ${x}.`,
        `Шаг 3: Подставляем x в первое уравнение: ${x} + y = ${sum}  ⇒  y = ${y}.`,
        `Итог: x = ${x}, y = ${y}.`,
      ],
      en: [
        `Step 1: Add both equations: 2x = ${sum} + ${diff} = ${sum + diff}.`,
        `Step 2: Solve for x: x = ${x}.`,
        `Step 3: Substitute x into first equation: ${x} + y = ${sum}  ⇒  y = ${y}.`,
        `Result: x = ${x}, y = ${y}.`,
      ],
    },
    xpReward: 35,
  };
}

// Generate a random Geometry Task
export function generateGeometryTask(grade: number = 9): LocalizedQuestion {
  if (grade === 7) {
    // 7th grade: Angle sum in triangle: alpha + beta + gamma = 180 deg
    const a1 = randInt(35, 60);
    const a2 = randInt(45, 75);
    const a3 = 180 - (a1 + a2);

    const correctText = `${a3}°`;
    const distractors = [`${a3 + 15}°`, `${Math.max(15, a3 - 15)}°`, `${180 - a1}°`];

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
      id: `gen_geom_ang7_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Геометрия", ru: "Геометрия", en: "Geometry" },
      grade: { kz: "7-сынып", ru: "7 класс", en: "Grade 7" },
      topic: { kz: "Үшбұрыш бұрыштарының қосындысы", ru: "Сумма углов треугольника", en: "Triangle Angle Sum" },
      subtopic: { kz: "Үшінші бұрышты табу", ru: "Нахождение третьего угла", en: "Finding third angle" },
      questionText: {
        kz: `Үшбұрыштың екі бұрышы ∠A = ${a1}° және ∠B = ${a2}° берілген. Үшінші ∠C бұрышын табыңыз:`,
        ru: `В треугольнике два угла равны ∠A = ${a1}° и ∠B = ${a2}°. Найдите величину третьего угла ∠C:`,
        en: `In a triangle, two angles are ∠A = ${a1}° and ∠B = ${a2}°. Find the third angle ∠C:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `∠A + ∠B + ∠C = 180°  ⇒  ∠C = 180° — (${a1}° + ${a2}°)`,
      },
      options,
      hint: {
        kz: `Үшбұрыштың ішкі бұрыштарының қосындысы әрдайым 180°-қа тең: ∠C = 180° - (${a1}° + ${a2}°).`,
        ru: `Сумма углов любого треугольника равна 180°: ∠C = 180° - (${a1}° + ${a2}°).`,
        en: `The sum of angles in any triangle is 180°: ∠C = 180° - (${a1}° + ${a2}°).`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Үшбұрыш бұрыштарының қосындысы: ∠A + ∠B + ∠C = 180°.`,
          `2-қадам: Белгілі бұрыштарды қосамыз: ${a1}° + ${a2}° = ${a1 + a2}°.`,
          `3-қадам: 180°-тан азайтамыз: ∠C = 180° - ${a1 + a2}° = ${a3}°.`,
          `Жауабы: ${a3}°.`,
        ],
        ru: [
          `Шаг 1: Теорема о сумме углов треугольника: ∠A + ∠B + ∠C = 180°.`,
          `Шаг 2: Складываем известные углы: ${a1}° + ${a2}° = ${a1 + a2}°.`,
          `Шаг 3: Вычитаем из 180°: ∠C = 180° - ${a1 + a2}° = ${a3}°.`,
          `Итог: ${a3}°.`,
        ],
        en: [
          `Step 1: Triangle angle sum theorem: ∠A + ∠B + ∠C = 180°.`,
          `Step 2: Add known angles: ${a1}° + ${a2}° = ${a1 + a2}°.`,
          `Step 3: Subtract from 180°: ∠C = 180° - ${a1 + a2}° = ${a3}°.`,
          `Result: ${a3}°.`,
        ],
      },
      xpReward: 20,
    };
  }

  if (grade === 11) {
    // 11th grade: 3D coordinates distance between points A and B
    const triads = [
      { dx: 1, dy: 2, dz: 2, d: 3 },
      { dx: 2, dy: 3, dz: 6, d: 7 },
      { dx: 4, dy: 4, dz: 7, d: 9 },
    ];
    const chosen = triads[randInt(0, triads.length - 1)];
    const x1 = randInt(1, 3);
    const y1 = randInt(1, 3);
    const z1 = randInt(1, 3);
    const x2 = x1 + chosen.dx;
    const y2 = y1 + chosen.dy;
    const z2 = z1 + chosen.dz;
    const d = chosen.d;

    const correctText = `d = ${d}`;
    const distractors = [`d = ${d + 2}`, `d = ${d - 1}`, `d = ${chosen.dx + chosen.dy + chosen.dz}`];

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
      id: `gen_geom_3d_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Геометрия", ru: "Геометрия", en: "Geometry" },
      grade: { kz: "11-сынып", ru: "11 класс", en: "Grade 11" },
      topic: { kz: "Кеңістіктегі арақашықтық", ru: "Расстояние между точками в 3D", en: "3D Distance Between Points" },
      subtopic: { kz: "Координаталық әдіс", ru: "Координатный метод", en: "Coordinate method" },
      questionText: {
        kz: `Кеңістікте A(${x1}, ${y1}, ${z1}) және B(${x2}, ${y2}, ${z2}) нүктелерінің арасындағы d арақашықтықты табыңыз:`,
        ru: `Найдите расстояние d между точками A(${x1}, ${y1}, ${z1}) и B(${x2}, ${y2}, ${z2}) в трехмерном пространстве:`,
        en: `Find the distance d between points A(${x1}, ${y1}, ${z1}) and B(${x2}, ${y2}, ${z2}) in 3D space:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `d = √((x₂ — x₁)² + (y₂ — y₁)² + (z₂ — z₁)²)`
      },
      options,
      hint: {
        kz: `Кеңістіктегі арақашықтық формуласы: d = √((x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²).`,
        ru: `Формула расстояния между точками в пространстве: d = √((x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²).`,
        en: `3D distance formula: d = √((x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²).`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Координата айырымдары: Δx = ${x2} - ${x1} = ${chosen.dx}, Δy = ${y2} - ${y1} = ${chosen.dy}, Δz = ${z2} - ${z1} = ${chosen.dz}.`,
          `2-қадам: Квадраттары: ${chosen.dx}² = ${chosen.dx * chosen.dx}, ${chosen.dy}² = ${chosen.dy * chosen.dy}, ${chosen.dz}² = ${chosen.dz * chosen.dz}.`,
          `3-қадам: Қосындысы: ${chosen.dx * chosen.dx} + ${chosen.dy * chosen.dy} + ${chosen.dz * chosen.dz} = ${d * d}.`,
          `4-қадам: Түбірден шығарамыз: d = √${d * d} = ${d}.`,
          `Жауабы: d = ${d}.`,
        ],
        ru: [
          `Шаг 1: Разности координат: Δx = ${chosen.dx}, Δy = ${chosen.dy}, Δz = ${chosen.dz}.`,
          `Шаг 2: Квадраты разностей: ${chosen.dx * chosen.dx}, ${chosen.dy * chosen.dy}, ${chosen.dz * chosen.dz}.`,
          `Шаг 3: Сумма квадратов: ${d * d}.`,
          `Шаг 4: Извлекаем квадратный корень: d = ${d}.`,
          `Итог: d = ${d}.`,
        ],
        en: [
          `Step 1: Coordinate differences: Δx = ${chosen.dx}, Δy = ${chosen.dy}, Δz = ${chosen.dz}.`,
          `Step 2: Squares: ${chosen.dx * chosen.dx}, ${chosen.dy * chosen.dy}, ${chosen.dz * chosen.dz}.`,
          `Step 3: Sum of squares: ${d * d}.`,
          `Step 4: Square root: d = ${d}.`,
          `Result: d = ${d}.`,
        ],
      },
      xpReward: 40,
    };
  }

  const type = randInt(1, 3);

  if (type === 1) {
    // Pythagorean triple
    const multiplier = randInt(1, 4);
    const a = 3 * multiplier;
    const b = 4 * multiplier;
    const c = 5 * multiplier;

    const correctText = `${c} см`;
    const distractors = [`${a + b} см`, `${c + 2} см`, `${c - 1} см`];

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
      id: `gen_geom_pyth_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Геометрия", ru: "Геометрия", en: "Geometry" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Пифагор теоремасы", ru: "Теорема Пифагора", en: "Pythagorean Theorem" },
      subtopic: { kz: "Гипотенуза", ru: "Гипотенуза", en: "Hypotenuse" },
      questionText: {
        kz: `Тікбұрышты үшбұрыштың катеттері a = ${a} см және b = ${b} см. Гипотенуза с-ны табыңыз:`,
        ru: `В прямоугольном треугольнике катеты a = ${a} см и b = ${b} см. Найдите гипотенузу c:`,
        en: `In a right triangle, legs are a = ${a} cm and b = ${b} cm. Find the hypotenuse c:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `c = √(a² + b²) = √(${a}² + ${b}²)`,
      },
      options,
      hint: {
        kz: `Пифагор теоремасы: c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}.`,
        ru: `Теорема Пифагора: c² = ${a * a} + ${b * b} = ${c * c}. Извлеки корень!`,
        en: `Pythagorean theorem: c² = ${a * a} + ${b * b} = ${c * c}. Extract root!`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: c² = a² + b².`,
          `2-қадам: ${a}² = ${a * a}, ${b}² = ${b * b}.`,
          `3-қадам: c² = ${a * a + b * b}.`,
          `4-қадам: c = √${c * c} = ${c} см.`,
          `Жауабы: ${c} см.`,
        ],
        ru: [
          `Шаг 1: Формула Пифагора: c² = a² + b².`,
          `Шаг 2: Квадраты катетов: ${a * a} и ${b * b}.`,
          `Шаг 3: Сумма квадратов: ${a * a + b * b}.`,
          `Шаг 4: Корень: c = ${c} см.`,
          `Итог: ${c} см.`,
        ],
        en: [
          `Step 1: Formula: c² = a² + b².`,
          `Step 2: Squares: ${a * a} and ${b * b}.`,
          `Step 3: Sum of squares: ${a * a + b * b}.`,
          `Step 4: Square root: c = ${c} cm.`,
          `Result: ${c} cm.`,
        ],
      },
      xpReward: 30,
    };
  }

  // Triangle Area S = 1/2 * a * h
  const base = randInt(4, 12) * 2;
  const height = randInt(3, 10);
  const area = (base * height) / 2;

  const correctText = `${area} см²`;
  const distractors = [`${base * height} см²`, `${area + 5} см²`, `${area - 4} см²`];

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
    id: `gen_geom_area_${Date.now()}_${randInt(100, 999)}`,
    subject: { kz: "Геометрия", ru: "Геометрия", en: "Geometry" },
    grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
    topic: { kz: "Үшбұрыш ауданы", ru: "Площадь треугольника", en: "Triangle Area" },
    subtopic: { kz: "Аудан формуласы", ru: "Формула площади", en: "Area Formula" },
    questionText: {
      kz: `Үшбұрыштың табаны a = ${base} см, ал оған түсірілген биіктік h = ${height} см. Үшбұрыштың ауданын S табыңыз:`,
      ru: `Основание треугольника a = ${base} см, а проведенная к нему высота h = ${height} см. Найдите площадь S:`,
      en: `The base of a triangle is a = ${base} cm and altitude is h = ${height} cm. Find its area S:`,
    },
    formulaDisplay: {
      type: "expression",
      expressionText: `S = ½ · a · h = ½ · ${base} · ${height}`,
    },
    options,
    hint: {
      kz: `Үшбұрыш ауданы: S = (a · h) / 2. Табаны мен биіктігін көбейтіп, 2-ге бөліңіз.`,
      ru: `Формула площади треугольника: S = (a · h) / 2. Перемножь основание и высоту и раздели на 2.`,
      en: `Triangle area formula: S = (a · h) / 2. Multiply base by height and divide by 2.`,
    },
    stepByStepSolution: {
      kz: [
        `1-қадам: S = (a · h) / 2.`,
        `2-қадам: a · h = ${base} · ${height} = ${base * height}.`,
        `3-қадам: 2-ге бөлеміз: ${base * height} / 2 = ${area} см².`,
        `Жауабы: ${area} см².`,
      ],
      ru: [
        `Шаг 1: Формула: S = (a · h) / 2.`,
        `Шаг 2: Умножаем: ${base} · ${height} = ${base * height}.`,
        `Шаг 3: Делим пополам: ${area} см².`,
        `Итог: ${area} см².`,
      ],
      en: [
        `Step 1: Formula: S = (a · h) / 2.`,
        `Step 2: Multiply: ${base} · ${height} = ${base * height}.`,
        `Step 3: Halve the result: ${area} cm².`,
        `Result: ${area} cm².`,
      ],
    },
    xpReward: 25,
  };
}

// Generate a random Physics Task (Speed, Ohm's Law, Kinetic energy, Lorentz Force)
export function generatePhysicsTask(grade: number = 9): LocalizedQuestion {
  if (grade === 7) {
    // 7th grade: Speed formula: v = s / t
    const t = randInt(2, 4);
    const v = randInt(40, 80);
    const s = v * t;

    const correctText = `${v} км/сағ`;
    const distractors = [`${v + 15} км/сағ`, `${v - 10} км/сағ`, `${s} км/сағ`];

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
      id: `gen_phys_spd7_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Физика", ru: "Физика", en: "Physics" },
      grade: { kz: "7-сынып", ru: "7 класс", en: "Grade 7" },
      topic: { kz: "Жылдамдық және уақыт", ru: "Скорость и время", en: "Velocity and Time" },
      subtopic: { kz: "Бірқалыпты қозғалыс", ru: "Равномерное движение", en: "Uniform motion" },
      questionText: {
        kz: `Автокөлік t = ${t} сағатта s = ${s} км жол жүрді. Көліктің жылдамдығы v нешеге тең?`,
        ru: `Автомобиль преодолел расстояние s = ${s} км за время t = ${t} часа. Чему равна скорость v?`,
        en: `A car traveled a distance s = ${s} km in time t = ${t} hours. What is its speed v?`,
      },
      formulaDisplay: {
        type: "fraction",
        numeratorLeft: "v",
        denominatorLeft: "1",
        operator: "=",
        numeratorRight: `${s} км`,
        denominatorRight: `${t} сағ`,
      },
      options,
      hint: {
        kz: `Жылдамдық формуласы: v = s / t. Жолды уақытқа бөліңіз: ${s} / ${t}.`,
        ru: `Формула скорости равномерного движения: v = s / t. Раздели путь на время: ${s} : ${t}.`,
        en: `Speed formula: v = s / t. Divide distance by time: ${s} / ${t}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Формула: v = s / t.`,
          `2-қадам: s = ${s} км, t = ${t} сағат.`,
          `3-қадам: Бөлеміз: v = ${s} / ${t} = ${v} км/сағ.`,
          `Жауабы: ${v} км/сағ.`,
        ],
        ru: [
          `Шаг 1: Формула скорости: v = s / t.`,
          `Шаг 2: Подставляем: s = ${s} км, t = ${t} ч.`,
          `Шаг 3: Вычисляем: ${s} : ${t} = ${v} км/ч.`,
          `Итог: ${v} км/ч.`,
        ],
        en: [
          `Step 1: Formula: v = s / t.`,
          `Step 2: Plug in values: s = ${s} km, t = ${t} h.`,
          `Step 3: Compute: ${s} / ${t} = ${v} km/h.`,
          `Result: ${v} km/h.`,
        ],
      },
      xpReward: 20,
    };
  }

  if (grade === 11) {
    // 11th grade: Lorentz Force F = q * v * B (sin 90 = 1)
    const qCoeff = randInt(2, 5); // microCoulombs (10^-6)
    const vCoeff = randInt(2, 6); // * 10^4 m/s
    const bCoeff = randInt(2, 5) * 0.1; // Tesla
    // F = (qCoeff * 10^-6) * (vCoeff * 10^4) * bCoeff = qCoeff * vCoeff * bCoeff * 10^-2 N
    const fVal = Math.round(qCoeff * vCoeff * bCoeff * 10) / 1000;

    const correctText = `${fVal} Н (N)`;
    const distractors = [`${fVal * 10} Н (N)`, `${fVal / 2} Н (N)`, `${fVal + 0.02} Н (N)`];

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
      id: `gen_phys_lorentz_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Физика", ru: "Физика", en: "Physics" },
      grade: { kz: "11-сынып", ru: "11 класс", en: "Grade 11" },
      topic: { kz: "Магнит өрісі және Лоренц күші", ru: "Магнитное поле и сила Лоренца", en: "Lorentz Force" },
      subtopic: { kz: "Лоренц күшінің формуласы", ru: "Формула силы Лоренца", en: "Lorentz force formula" },
      questionText: {
        kz: `Индукциясы B = ${bCoeff.toFixed(1)} Тл біртекті магнит өрісіне перпендикуляр бағытта q = ${qCoeff} · 10⁻⁶ Кл заряд v = ${vCoeff} · 10⁴ м/с жылдамдықпен кіреді. Зарядқа әсер ететін F_Л Лоренц күшін табыңыз:`,
        ru: `В однородное магнитное поле с индукцией B = ${bCoeff.toFixed(1)} Тл перпендикулярно линиям поля влетает заряд q = ${qCoeff} · 10⁻⁶ Кл со скоростью v = ${vCoeff} · 10⁴ м/с. Найдите силу Лоренца F_Л:`,
        en: `A charge q = ${qCoeff} · 10⁻⁶ C enters perpendicular to a magnetic field B = ${bCoeff.toFixed(1)} T with velocity v = ${vCoeff} · 10⁴ m/s. Find the Lorentz force F_L:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `F_Л = |q| · v · B · sin(90°) = |q| · v · B`,
      },
      options,
      hint: {
        kz: `Лоренц күші формуласы: F = q · v · B · sin(α). α = 90° болғанда sin(90°) = 1. F = (${qCoeff} · 10⁻⁶) · (${vCoeff} · 10⁴) · ${bCoeff.toFixed(1)}.`,
        ru: `Формула силы Лоренца: F = q · v · B · sin(α). При перпендикулярном влете sin(90°) = 1. Перемножь заряд, скорость и индукцию.`,
        en: `Lorentz force: F = q · v · B · sin(α). For perpendicular entry, sin(90°) = 1. Multiply charge, speed, and magnetic field.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Лоренц күші формуласы: F = |q| · v · B.`,
          `2-қадам: q = ${qCoeff} · 10⁻⁶ Кл, v = ${vCoeff} · 10⁴ м/с, B = ${bCoeff.toFixed(1)} Тл.`,
          `3-қадам: Көбейтеміз: (${qCoeff} · 10⁻⁶) · (${vCoeff} · 10⁴) · ${bCoeff.toFixed(1)} = ${fVal} Н.`,
          `Жауабы: ${fVal} Н.`,
        ],
        ru: [
          `Шаг 1: Формула силы Лоренца: F = |q| · v · B.`,
          `Шаг 2: Значения: q = ${qCoeff} · 10⁻⁶ Кл, v = ${vCoeff} · 10⁴ м/с, B = ${bCoeff.toFixed(1)} Тл.`,
          `Шаг 3: Вычисляем произведение: ${fVal} Ньютона.`,
          `Итог: ${fVal} Н.`,
        ],
        en: [
          `Step 1: Formula: F = |q| · v · B.`,
          `Step 2: Values: q = ${qCoeff} · 10⁻⁶ C, v = ${vCoeff} · 10⁴ m/s, B = ${bCoeff.toFixed(1)} T.`,
          `Step 3: Multiply: ${fVal} N.`,
          `Result: ${fVal} N.`,
        ],
      },
      xpReward: 45,
    };
  }

  const type = randInt(1, 3);

  if (type === 1) {
    // Ohm's law: I = U / R
    const r = randInt(2, 10);
    const i = randInt(2, 6);
    const u = r * i;

    const correctText = `${i} А (A)`;
    const distractors = [`${i + 2} А (A)`, `${u} А (A)`, `${r} А (A)`];

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
      id: `gen_phys_ohm_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Физика", ru: "Физика", en: "Physics" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Ом заңы", ru: "Закон Ома", en: "Ohm's Law" },
      subtopic: { kz: "Тізбек бөлігі", ru: "Участок цепи", en: "Circuit Portion" },
      questionText: {
        kz: `Кернеу U = ${u} В, ал өткізгіш кедергісі R = ${r} Ом. Тізбектегі ток күші I нешеге тең?`,
        ru: `Напряжение U = ${u} В, сопротивление проводника R = ${r} Ом. Чему равна сила тока I?`,
        en: `Voltage U = ${u} V, resistance R = ${r} Ω. What is the electric current I?`,
      },
      formulaDisplay: {
        type: "fraction",
        numeratorLeft: "I",
        denominatorLeft: "1",
        operator: "=",
        numeratorRight: `${u} В`,
        denominatorRight: `${r} Ом`,
      },
      options,
      hint: {
        kz: `Тізбек бөлігі үшін Ом заңы: I = U / R. ${u}-ні ${r}-ге бөліңіз.`,
        ru: `Закон Ома: I = U / R. Раздели напряжение ${u} В на сопротивление ${r} Ом.`,
        en: `Ohm's law: I = U / R. Divide voltage ${u} V by resistance ${r} Ω.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Формула: I = U / R.`,
          `2-қадам: U = ${u} В, R = ${r} Ом.`,
          `3-қадам: I = ${u} / ${r} = ${i} Ампер.`,
          `Жауабы: ${i} А.`,
        ],
        ru: [
          `Шаг 1: Формула закона Ома: I = U / R.`,
          `Шаг 2: Значения: U = ${u} В, R = ${r} Ом.`,
          `Шаг 3: Вычисляем: ${u} : ${r} = ${i} Ампер.`,
          `Итог: ${i} А.`,
        ],
        en: [
          `Step 1: Ohm's law formula: I = U / R.`,
          `Step 2: Values: U = ${u} V, R = ${r} Ω.`,
          `Step 3: Calculate: ${u} / ${r} = ${i} Amperes.`,
          `Result: ${i} A.`,
        ],
      },
      xpReward: 30,
    };
  }

  // Kinetic energy E = m*v^2 / 2
  const m = randInt(2, 6) * 2;
  const v = randInt(2, 5);
  const ek = (m * v * v) / 2;

  const correctText = `${ek} Дж (J)`;
  const distractors = [`${m * v} Дж (J)`, `${ek * 2} Дж (J)`, `${ek + 10} Дж (J)`];

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
    id: `gen_phys_ek_${Date.now()}_${randInt(100, 999)}`,
    subject: { kz: "Физика", ru: "Физика", en: "Physics" },
    grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
    topic: { kz: "Кинетикалық энергия", ru: "Кинетическая энергия", en: "Kinetic Energy" },
    subtopic: { kz: "Энергия формуласы", ru: "Формула энергии", en: "Energy Formula" },
    questionText: {
      kz: `Массасы m = ${m} кг дене v = ${v} м/с жылдамдықпен қозғалады. Оның кинетикалық энергиясы E_k нешеге тең?`,
      ru: `Тело массой m = ${m} кг движется со скоростью v = ${v} м/с. Какова его кинетическая энергия E_k?`,
      en: `A body of mass m = ${m} kg moves with velocity v = ${v} m/s. What is its kinetic energy E_k?`,
    },
    formulaDisplay: {
      type: "expression",
      expressionText: `E_k = (m · v²) / 2 = (${m} · ${v}²) / 2`,
    },
    options,
    hint: {
      kz: `Кинетикалық энергия формуласы: E_k = m · v² / 2. Алдымен жылдамдықты квадраттаңыз: ${v}² = ${v * v}.`,
      ru: `Формула кинетической энергии: E_k = m · v² / 2. Сначала возведи скорость в квадрат: ${v}² = ${v * v}.`,
      en: `Kinetic energy formula: E_k = m · v² / 2. First square velocity: ${v}² = ${v * v}.`,
    },
    stepByStepSolution: {
      kz: [
        `1-қадам: E_k = m · v² / 2.`,
        `2-қадам: ${v}² = ${v * v}.`,
        `3-қадам: m · v² = ${m} · ${v * v} = ${m * v * v}.`,
        `4-қадам: 2-ге бөлеміз: ${m * v * v} / 2 = ${ek} Дж.`,
        `Жауабы: ${ek} Дж.`,
      ],
      ru: [
        `Шаг 1: Формула: E_k = m · v² / 2.`,
        `Шаг 2: Скорость в квадрате: ${v}² = ${v * v}.`,
        `Шаг 3: Умножаем на массу: ${m} · ${v * v} = ${m * v * v}.`,
        `Шаг 4: Делим на 2: ${ek} Дж.`,
        `Итог: ${ek} Дж.`,
      ],
      en: [
        `Step 1: Formula: E_k = m · v² / 2.`,
        `Step 2: Square velocity: ${v}² = ${v * v}.`,
        `Step 3: Multiply by mass: ${m} · ${v * v} = ${m * v * v}.`,
        `Step 4: Divide by 2: ${ek} J.`,
        `Result: ${ek} J.`,
      ],
    },
    xpReward: 30,
  };
}

// Helper function to dispatch Math by grade
export function generateMathByGrade(grade: number = 9): LocalizedQuestion {
  if (grade <= 6) return generateMathGrade5or6(grade);
  if (grade === 7) return generateMathGrade7();
  if (grade === 8) return generateMathGrade8();
  if (grade === 10) return generateMathGrade10();
  if (grade === 11) return generateMathGrade11();
  return generateMathGrade9();
}

// Master generator dispatching by subject and grade with anti-repetition filter
export function generateRandomQuestion(
  selectedSubject: string = "math",
  selectedGrade: number = 9,
  excludeIds: string[] = []
): LocalizedQuestion {
  const norm = (selectedSubject || "").toLowerCase().trim();

  const generateOnce = (): LocalizedQuestion => {
    if (
      norm === "math" ||
      norm === "algebra" ||
      norm === "математика" ||
      norm === "алгебра"
    ) {
      return generateMathByGrade(selectedGrade);
    }
    if (norm === "geometry" || norm === "геометрия") {
      return generateGeometryTask(selectedGrade);
    }
    if (norm === "physics" || norm === "физика") {
      return generatePhysicsTask(selectedGrade);
    }
    if (
      norm === "english" ||
      norm === "ағылшын тілі" ||
      norm === "английский язык" ||
      norm === "ағылшын"
    ) {
      return generateEnglishTask(selectedGrade);
    }
    if (norm === "biology" || norm === "биология") {
      return generateBiologyTask(selectedGrade);
    }
    if (norm === "chemistry" || norm === "химия") {
      return generateChemistryTask(selectedGrade);
    }
    if (
      norm === "cs" ||
      norm === "informatics" ||
      norm === "информатика" ||
      norm === "компьютерные науки"
    ) {
      return generateCSTask(selectedGrade);
    }

    // If "all" or unrecognized, pick an available subject for this grade
    const availablePool: Array<() => LocalizedQuestion> = [
      () => generateMathByGrade(selectedGrade),
    ];

    if (selectedGrade >= 7) {
      availablePool.push(() => generateGeometryTask(selectedGrade));
      availablePool.push(() => generateEnglishTask(selectedGrade));
      availablePool.push(() => generateBiologyTask(selectedGrade));
    }
    if (selectedGrade >= 8) {
      availablePool.push(() => generatePhysicsTask(selectedGrade));
      availablePool.push(() => generateChemistryTask(selectedGrade));
    }
    if (selectedGrade >= 9) {
      availablePool.push(() => generateCSTask(selectedGrade));
    }

    const picker = availablePool[randInt(0, availablePool.length - 1)];
    return picker();
  };

  // Try up to 6 times to generate a question not in excludeIds
  let result = generateOnce();
  let attempts = 0;
  while (excludeIds.includes(result.id) && attempts < 6) {
    result = generateOnce();
    attempts++;
  }

  return result;
}
