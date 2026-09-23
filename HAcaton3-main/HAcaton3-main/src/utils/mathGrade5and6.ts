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

export function generateMathGrade5or6(grade: number = 5): LocalizedQuestion {
  const type = randInt(1, 3);

  if (type === 1) {
    // Adding fractions with different denominators: 1/a + 1/b
    const a = 2;
    const b = randInt(3, 5);
    // 1/a + 1/b = (b + a) / (a * b)
    const num = b + a;
    const den = a * b;

    const rawOptions = [
      { text: `${num} / ${den}`, isCorrect: true },
      { text: `2 / ${a + b}`, isCorrect: false },
      { text: `${num - 1} / ${den}`, isCorrect: false },
      { text: `1 / ${den}`, isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_m5_frac_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Математика", ru: "Математика", en: "Mathematics" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Жай бөлшектерді қосу", ru: "Сложение обыкновенных дробей", en: "Adding Fractions" },
      subtopic: { kz: "Әртүрлі бөлімді бөлшектер", ru: "Дроби с разными знаменателями", en: "Different Denominators" },
      questionText: {
        kz: `Бөлшектердің қосындысын есептеңіз:`,
        ru: `Вычислите сумму дробей с разными знаменателями:`,
        en: `Calculate the sum of fractions with different denominators:`,
      },
      formulaDisplay: {
        type: "fraction",
        numeratorLeft: "1",
        denominatorLeft: `${a}`,
        operator: "+",
        numeratorRight: "1",
        denominatorRight: `${b}`,
      },
      options,
      hint: {
        kz: `Ортақ бөлім табамыз: ${a} мен ${b}-нің ортақ бөлімі — ${den}. Бірінші бөлшекті ${b}-ге, екіншісін ${a}-ға көбейтеміз: ${b}/${den} + ${a}/${den} = ${num}/${den}.`,
        ru: `Приведите к общему знаменателю: для ${a} и ${b} общий знаменатель равен ${den}. Умножаем числители на дополнительные множители: (${b} + ${a}) / ${den} = ${num}/${den}.`,
        en: `Find common denominator: for ${a} and ${b} it is ${den}. Numerators become (${b} + ${a}) / ${den} = ${num}/${den}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Бөлімдері: ${a} және ${b}. Ортақ бөлім: ${den}.`,
          `2-қадам: 1/${a} = ${b}/${den}, ал 1/${b} = ${a}/${den}.`,
          `3-қадам: Алымдарын қосамыз: ${b} + ${a} = ${num}.`,
          `Жауабы: ${num}/${den}.`,
        ],
        ru: [
          `Шаг 1: Знаменатели ${a} и ${b}. Наименьший общий знаменатель равен ${den}.`,
          `Шаг 2: Дополнительные множители: для первой дроби ${b}, для второй дроби ${a}.`,
          `Шаг 3: Складываем числители: ${b} + ${a} = ${num}. Знаменатель сохраняем: ${den}.`,
          `Итог: ${num}/${den}.`,
        ],
        en: [
          `Step 1: Denominators are ${a} and ${b}. Common denominator is ${den}.`,
          `Step 2: Equivalent fractions: ${b}/${den} and ${a}/${den}.`,
          `Step 3: Sum numerators: ${b} + ${a} = ${num}.`,
          `Result: ${num}/${den}.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: 1/${a} + 1/${b}. Мақсаты: Бөлшектерді қосу.`,
          ru: `Даны дроби 1/${a} и 1/${b}. Цель: Найти их точную сумму.`,
          en: `Given 1/${a} and 1/${b}. Goal: Compute sum.`,
        },
        ruleOrFormula: {
          kz: `Ереже: Әртүрлі бөлімді бөлшектерді қосқанда алдымен ортақ бөлімге келтіреміз! Бөлімдерін бір-біріне қосуға БОЛМАЙДЫ.`,
          ru: `Золотое правило дробей: нельзя складывать знаменатели между собой! Сначала общий знаменатель, затем сложение числителей.`,
          en: `Fraction rule: Never add denominators! Find a common denominator first, then add numerators.`,
        },
        steps: {
          kz: [
            `1. Ортақ бөлімді табыңыз: ${den}.`,
            `2. Қосымша көбейткіштерді есептеңіз: ${b} және ${a}.`,
            `3. ${num}/${den} мәнін таңдаңыз.`,
          ],
          ru: [
            `1. Найдите общий знаменатель для ${a} и ${b} (${den}).`,
            `2. Переведите дроби: ${b}/${den} + ${a}/${den}.`,
            `3. Сложите числители (${num}) и выберите ответ: ${num}/${den}.`,
          ],
          en: [
            `1. Find common denominator (${den}).`,
            `2. Convert fractions: ${b}/${den} + ${a}/${den}.`,
            `3. Add numerators to get ${num}/${den}.`,
          ],
        },
        commonTrap: {
          kz: `Бөлімдерін тікелей қосу: (1+1)/(2+3) = 2/5 деп қателесу! Бұл математикадағы ең көп кездесетін қате.`,
          ru: `Главная ловушка: Сложить числители и знаменатели напрямую ((1+1)/(2+${b}) = 2/${a + b})! Знаменатели складывать категорически нельзя!`,
          en: `Trap: Adding numerators and denominators straight across (2/${a + b})!`,
        },
      },
      xpReward: 25,
    };
  } else if (type === 2) {
    // Percentage: find P% of Number
    const p = [10, 20, 25, 50][randInt(0, 3)];
    const val = randInt(4, 16) * 10;
    const ans = (val * p) / 100;

    const rawOptions = [
      { text: `${ans}`, isCorrect: true },
      { text: `${ans + 5}`, isCorrect: false },
      { text: `${Math.max(1, ans - 5)}`, isCorrect: false },
      { text: `${ans * 2}`, isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_m5_perc_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Математика", ru: "Математика", en: "Mathematics" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Проценттер", ru: "Проценты", en: "Percentages" },
      subtopic: { kz: "Санның пайызын табу", ru: "Нахождение процента от числа", en: "Finding Percentage of a Number" },
      questionText: {
        kz: `${val} санының ${p}%-ын табыңыз:`,
        ru: `Найдите ${p}% от числа ${val}:`,
        en: `Find ${p}% of the number ${val}:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `(${val} · ${p}) / 100 = ?`,
      },
      options,
      hint: {
        kz: `Пайызды табу үшін санды пайызға көбейтіп, 100-ге бөлеміз: (${val} · ${p}) / 100 = ${ans}.`,
        ru: `Чтобы найти процент от числа, умножьте число на процент и разделите на 100: (${val} × ${p}) / 100 = ${ans}.`,
        en: `Multiply the number by percentage and divide by 100: (${val} * ${p}) / 100 = ${ans}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Формула: (Сан · Пайыз) / 100.`,
          `2-қадам: ${val} · ${p} = ${val * p}.`,
          `3-қадам: 100-ге бөлеміз: ${val * p} / 100 = ${ans}.`,
          `Жауабы: ${ans}.`,
        ],
        ru: [
          `Шаг 1: Правило: (Число × Процент) / 100.`,
          `Шаг 2: Умножаем: ${val} × ${p} = ${val * p}.`,
          `Шаг 3: Делим на 100: ${val * p} / 100 = ${ans}.`,
          `Итог: ${ans}.`,
        ],
        en: [
          `Step 1: Rule: (Number * Percent) / 100.`,
          `Step 2: Multiply: ${val} * ${p} = ${val * p}.`,
          `Step 3: Divide by 100: ${val * p} / 100 = ${ans}.`,
          `Result: ${ans}.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: ${val} саны және ${p}%. Мақсаты: Пайыздық мәнін есептеу.`,
          ru: `Дано число ${val} и процент ${p}%. Цель: Вычислить долю.`,
          en: `Given value ${val} and percentage ${p}%. Goal: Calculate portion.`,
        },
        ruleOrFormula: {
          kz: `1% = санның 1/100 бөлігі. Демек: N · (P / 100).`,
          ru: `1 процент — это одна сотая часть числа: N × (P / 100).`,
          en: `1% = 1/100th of number: N * (P / 100).`,
        },
        steps: {
          kz: [
            "1. Пайызды ондық бөлшекке айналдырыңыз (мысалы 25% = 0.25).",
            "2. Санға көбейтіңіз.",
            `3. ${ans} мәнін алыңыз.`,
          ],
          ru: [
            "1. Переведите процент в десятичную дробь (например 20% = 0.2).",
            "2. Умножьте исходное число на эту дробь.",
            `3. Получите результат: ${ans}.`,
          ],
          en: [
            "1. Convert percentage to decimal.",
            "2. Multiply by given number.",
            `3. Result is ${ans}.`,
          ],
        },
        commonTrap: {
          kz: `100-ге бөлуді ұмытып, жай ғана сандарды көбейту (${val * p} деп жазу)!`,
          ru: `Ловушка: Забыть разделить на 100 и указать огромное число ${val * p}!`,
          en: `Trap: Forgetting to divide by 100!`,
        },
      },
      xpReward: 25,
    };
  } else {
    // Simple 1-step equation: x + a = b
    const a = randInt(12, 45);
    const x = randInt(15, 60);
    const b = x + a;

    const rawOptions = [
      { text: `x = ${x}`, isCorrect: true },
      { text: `x = ${x + 5}`, isCorrect: false },
      { text: `x = ${Math.max(1, x - 5)}`, isCorrect: false },
      { text: `x = ${b + a}`, isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_m5_eq_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Математика", ru: "Математика", en: "Mathematics" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Қарапайым теңдеулер", ru: "Простые уравнения", en: "Basic Equations" },
      subtopic: { kz: "Белгісіз қосылғышты табу", ru: "Нахождение неизвестного слагаемого", en: "Finding Unknown Term" },
      questionText: {
        kz: `Теңдеуді шешіп, x-тің мәнін табыңыз:`,
        ru: `Решите уравнение и найдите x:`,
        en: `Solve the equation to find x:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `x + ${a} = ${b}`,
      },
      options,
      hint: {
        kz: `Белгісіз қосылғышты табу үшін қосындыдан белгілі қосылғышты азайтамыз: x = ${b} - ${a} = ${x}.`,
        ru: `Чтобы найти неизвестное слагаемое, нужно из суммы вычесть известное слагаемое: x = ${b} - ${a} = ${x}.`,
        en: `To find the unknown addend, subtract the known addend from sum: x = ${b} - ${a} = ${x}.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Теңдеу: x + ${a} = ${b}.`,
          `2-қадам: ${a} санын теңдіктің оң жағына минус таңбасымен көшіреміз: x = ${b} - ${a}.`,
          `3-қадам: x = ${x}.`,
          `Жауабы: x = ${x}.`,
        ],
        ru: [
          `Шаг 1: Записано уравнение: x + ${a} = ${b}.`,
          `Шаг 2: Переносим ${a} в правую часть со сменой знака: x = ${b} - ${a}.`,
          `Шаг 3: Вычисляем: x = ${x}.`,
          `Итог: x = ${x}.`,
        ],
        en: [
          `Step 1: Equation: x + ${a} = ${b}.`,
          `Step 2: Subtract ${a} from both sides: x = ${b} - ${a}.`,
          `Step 3: Result: x = ${x}.`,
          `Result: x = ${x}.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: x + ${a} = ${b}. Мақсаты: x-ті табу.`,
          ru: `Дано уравнение x + ${a} = ${b}. Цель: Найти корень уравнения x.`,
          en: `Given x + ${a} = ${b}. Goal: Find root x.`,
        },
        ruleOrFormula: {
          kz: `Теңдеу ережесі: Сан теңдіктің екінші жағына өткенде таңбасы қарама-қарсыға өзгереді (+ өрнек - болады).`,
          ru: `Правило весов: при переносе числа через знак «=» знак числа меняется на противоположный (+ меняется на -).`,
          en: `Equation balance rule: moving a term across '=' flips its sign.`,
        },
        steps: {
          kz: [
            `1. x-ті сол жақта қалдырыңыз.`,
            `2. Оң жақта ${b} - ${a} орындаңыз.`,
            `3. x = ${x} табыңыз.`,
          ],
          ru: [
            `1. Оставьте переменную x слева.`,
            `2. Перенесите число ${a} вправо: ${b} - ${a}.`,
            `3. Запишите ответ: x = ${x}.`,
          ],
          en: [
            `1. Isolate x on the left.`,
            `2. Compute ${b} - ${a} on the right.`,
            `3. Result is x = ${x}.`,
          ],
        },
        commonTrap: {
          kz: `Азайтудың орнына оң жақтағы сандарды қосып жіберу (${b + a} деп алу)!`,
          ru: `Ловушка: Прибавить ${a} к ${b} вместо вычитания (${b + a})!`,
          en: `Trap: Adding ${a} to ${b} instead of subtracting!`,
        },
      },
      xpReward: 20,
    };
  }
}
