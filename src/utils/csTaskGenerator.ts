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

export function generateCSTask(grade: number = 9): LocalizedQuestion {
  const taskType = randInt(1, 4);

  if (taskType === 1) {
    // 1. Binary to Decimal conversion
    const num = randInt(9, 29);
    const binStr = num.toString(2);
    const distractors = [
      (num + 2).toString(),
      Math.max(1, num - 2).toString(),
      (num + 4).toString(),
    ];

    const rawOptions = [
      { text: `${num}`, isCorrect: true },
      ...distractors.map((d) => ({ text: d, isCorrect: false })),
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    // Calculation steps display:
    const bits = binStr.split("");
    const formulaParts = bits
      .map((b, i) => `${b} · 2^${bits.length - 1 - i}`)
      .join(" + ");

    return {
      id: `gen_cs_bin_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Информатика", ru: "Информатика", en: "Computer Science" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Санау жүйелері", ru: "Системы счисления", en: "Number Systems" },
      subtopic: { kz: "Екілік жүйеден ондық жүйеге ауыстыру", ru: "Перевод из двоичной системы в десятичную", en: "Binary to Decimal" },
      questionText: {
        kz: `Екілік санау жүйесіндегі ${binStr}₂ санын ондық (10-дық) жүйеге аударыңыз:`,
        ru: `Переведите число ${binStr}₂ из двоичной системы счисления в десятичную:`,
        en: `Convert the binary number ${binStr}₂ into the decimal system:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `${binStr}₂ = ${formulaParts} = ?`,
      },
      options,
      hint: {
        kz: `Оңнан солға қарай 2-нің дәрежелеріне (1, 2, 4, 8, 16...) көбейтіп қосыңыз. Егер разрядта 1 тұрса — қосылады, 0 болса — есептелмейді.`,
        ru: `Разложите число по степеням двойки справа налево (2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16...). Суммируйте веса тех разрядов, где стоят единицы.`,
        en: `Multiply each bit by powers of 2 from right to left (1, 2, 4, 8, 16...). Sum the weights of the '1' bits.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Сан: ${binStr}₂.`,
          `2-қадам: 2-нің дәрежелері бойынша жіктейміз: ${formulaParts}.`,
          `3-қадам: Қосындысын табамыз = ${num}.`,
          `Жауабы: ${num}.`,
        ],
        ru: [
          `Шаг 1: Исходное двоичное число: ${binStr}₂.`,
          `Шаг 2: Расписываем разряды по степеням двойки: ${formulaParts}.`,
          `Шаг 3: Складываем ненулевые слагаемые: сумма равна ${num}.`,
          `Итог: ${num}.`,
        ],
        en: [
          `Step 1: Given binary: ${binStr}₂.`,
          `Step 2: Expand in powers of 2: ${formulaParts}.`,
          `Step 3: Sum the terms: total equals ${num}.`,
          `Result: ${num}.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: ${binStr}₂. Мақсаты: Ондық жүйедегі мәнін табу.`,
          ru: `Дано двоичное число ${binStr}₂. Цель: Перевести в привычную десятичную систему счисления.`,
          en: `Given binary string ${binStr}₂. Goal: Convert to decimal.`,
        },
        ruleOrFormula: {
          kz: `Ереже: N₁₀ = ∑ (b_i · 2^i), мұндағы i — оң жақтан 0-ден басталатын разряд нөмірі.`,
          ru: `Формула перевода: сумма произведений каждой двоичной цифры на 2 в степени позиции (начиная с 0 справа).`,
          en: `Positional notation: sum of bits multiplied by 2^position index.`,
        },
        steps: {
          kz: [
            "1. Разрядтардың үстіне 2-нің дәрежелерін жазыңыз: 1, 2, 4, 8, 16...",
            "2. Тек 1 тұрған дәрежелерді қосыңыз.",
            `3. ${num} шығады.`,
          ],
          ru: [
            "1. Подпишите под каждым разрядом справа налево веса: 1, 2, 4, 8, 16, 32...",
            "2. Сложите только те числа, где в числе стоит 1 (нули игнорируйте).",
            `3. Получите результат: ${num}.`,
          ],
          en: [
            "1. Label bit positions from right to left with weights: 1, 2, 4, 8, 16...",
            "2. Add weights where bit is 1.",
            `3. Get result: ${num}.`,
          ],
        },
        commonTrap: {
          kz: `Разряд дәрежесін 1-ден бастау. Есте сақтаңыз: ең оң жақтағы разряд 2⁰ = 1-ге тең!`,
          ru: `Ловушка: Начать нумерацию степеней с 1 вместо 0. Самый правый младший бит умножается на 2⁰ = 1!`,
          en: `Trap: Starting powers from 1 instead of 0! The rightmost bit has weight 2⁰ = 1.`,
        },
      },
      xpReward: 30,
    };
  } else if (taskType === 2) {
    // 2. Python Code logic / Slicing or Loop
    const rawOptions = [
      { text: "[20, 30]", isCorrect: true },
      { text: "[10, 20]", isCorrect: false },
      { text: "[20, 30, 40]", isCorrect: false },
      { text: "[30, 40]", isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_cs_py_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Информатика", ru: "Информатика", en: "Computer Science" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Python бағдарламалау", ru: "Программирование на Python", en: "Python Programming" },
      subtopic: { kz: "Тізімдер және қималар (Slicing)", ru: "Срезы списков (Slicing)", en: "List Slicing" },
      questionText: {
        kz: `Python коды орындалғаннан кейін экранға не шығады?\nnumbers = [10, 20, 30, 40, 50]\nprint(numbers[1:3])`,
        ru: `Что будет выведено в консоль в результате выполнения кода на Python?\nnumbers = [10, 20, 30, 40, 50]\nprint(numbers[1:3])`,
        en: `What is the console output of this Python code?\nnumbers = [10, 20, 30, 40, 50]\nprint(numbers[1:3])`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: "numbers[start : stop] ⟹ от индекса 1 до 3 (3-й не включается)",
      },
      options,
      hint: {
        kz: `Python тізімдерінде индекстеу 0-ден басталады: 0-ші = 10, 1-ші = 20, 2-ші = 30, 3-ші = 40. [1:3] қимасында соңғы 3-ші индекс кірмейді!`,
        ru: `В Python индексация начинается с 0: [0]=10, [1]=20, [2]=30, [3]=40. Срез [1:3] включает элементы с индекса 1 до 3, НЕ ВКЛЮЧАЯ элемент с индексом 3.`,
        en: `Python indices start at 0: 0->10, 1->20, 2->30. Slicing [1:3] includes elements from index 1 up to (but excluding) index 3.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Тізім элементтерінің индекстері: 0: 10, 1: 20, 2: 30, 3: 40, 4: 50.`,
          `2-қадам: Қима формуласы: [басталуы : аяқталуы]. Аяқталу индексі кірмейді.`,
          `3-қадам: [1:3] бойынша 1-ші (20) және 2-ші (30) элементтер алынады.`,
          `Жауабы: [20, 30].`,
        ],
        ru: [
          `Шаг 1: Индексы элементов списка: index 0: 10, index 1: 20, index 2: 30, index 3: 40.`,
          `Шаг 2: Правило среза в Python: правая граница stop исключается из результата.`,
          `Шаг 3: В срез попадают элементы с индексами 1 и 2: 20 и 30.`,
          `Итог: [20, 30].`,
        ],
        en: [
          `Step 1: Map items to 0-based indices: index 0: 10, 1: 20, 2: 30, 3: 40.`,
          `Step 2: Slicing rule: the stop boundary is non-inclusive.`,
          `Step 3: Slice includes indices 1 and 2: [20, 30].`,
          `Result: [20, 30].`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: numbers = [10, 20, 30, 40, 50], numbers[1:3] қимасы. Мақсаты: Нәтижені табу.`,
          ru: `Дан список numbers и срез numbers[1:3]. Цель: Определить результирующий подсписок.`,
          en: `Given list numbers and slice [1:3]. Goal: Evaluate output.`,
        },
        ruleOrFormula: {
          kz: `Python срез ережесі: list[start : stop] → start индексі кіреді, stop индексі КІРМЕЙДІ!`,
          ru: `Синтаксис среза: list[start:stop] — полуинтервал [start, stop), правая граница не включается.`,
          en: `Slicing syntax: [start:stop] generates half-open range [start, stop).`,
        },
        steps: {
          kz: [
            "1. Әр элементтің 0-ден басталатын индексін анықтаңыз.",
            "2. 1-ші индекске қарама-қарсы тұрған элементті табыңыз (20).",
            "3. 3-ке дейінгі элементтерді алыңыз (20 және 30).",
          ],
          ru: [
            "1. Пронумеруйте список, начиная с 0 (10 — 0-й, 20 — 1-й, 30 — 2-й, 40 — 3-й).",
            "2. Возьмите элементы от индекса 1 включительно до 3 исключительно.",
            "3. Выберите [20, 30].",
          ],
          en: [
            "1. Number list from 0.",
            "2. Take index 1 and 2, exclude 3.",
            "3. Select [20, 30].",
          ],
        },
        commonTrap: {
          kz: `3-ші индексті қосып жіберу ([20, 30, 40]). Python-да оң жақ шек ешқашан кірмейді!`,
          ru: `Ловушка: Включить правый индекс ([20, 30, 40]). В Python правая граница всегда строго исключается!`,
          en: `Trap: Including the stop index ([20, 30, 40])! Stop index is always exclusive.`,
        },
      },
      xpReward: 30,
    };
  } else if (taskType === 3) {
    // 3. Boolean Logic: (A AND NOT B) OR C
    const rawOptions = [
      { text: "Ақиқат (True / 1)", isCorrect: true },
      { text: "Жалған (False / 0)", isCorrect: false },
      { text: "Анықталмаған (Null)", isCorrect: false },
      { text: "Синтаксистік қате", isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_cs_logic_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Информатика", ru: "Информатика", en: "Computer Science" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Математикалық логика", ru: "Логические операции (Булева алгебра)", en: "Boolean Logic & Operations" },
      subtopic: { kz: "Логикалық өрнектің мәнін есептеу", ru: "Вычисление логического выражения", en: "Evaluating Logical Expressions" },
      questionText: {
        kz: `Егер A = 1 (True), B = 0 (False), C = 0 (False) болса, мына логикалық өрнектің мәні неге тең?\n(A AND NOT B) OR C`,
        ru: `Чему равно значение логического выражения при A = 1 (True), B = 0 (False), C = 0 (False)?\n(A AND NOT B) OR C`,
        en: `What is the value of the logical expression when A = True, B = False, C = False?\n(A AND NOT B) OR C`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: "(1 AND (NOT 0)) OR 0 = (1 AND 1) OR 0 = 1",
      },
      options,
      hint: {
        kz: `Алдымен терістеу (NOT): NOT 0 = 1. Содан кейін көбейту (AND): 1 AND 1 = 1. Соңында қосу (OR): 1 OR 0 = 1 (True).`,
        ru: `Порядок действий: сначала отрицание NOT (NOT False = True). Затем конъюнкция AND (True AND True = True). Затем дизъюнкция OR (True OR False = True).`,
        en: `Order of operations: NOT first (NOT False = True), then AND (True AND True = True), then OR (True OR False = True).`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: NOT B = NOT 0 = 1.`,
          `2-қадам: A AND NOT B = 1 AND 1 = 1.`,
          `3-қадам: 1 OR C = 1 OR 0 = 1 (Ақиқат / True).`,
          `Жауабы: Ақиқат (True / 1).`,
        ],
        ru: [
          `Шаг 1: Инвертируем значение B: NOT False = True (1).`,
          `Шаг 2: Логическое 'И' (A AND 1): 1 AND 1 = 1 (True).`,
          `Шаг 3: Логическое 'ИЛИ' (1 OR C): 1 OR 0 = 1 (True).`,
          `Итог: Ақиқат (True / 1).`,
        ],
        en: [
          `Step 1: Evaluate NOT B: NOT 0 = 1.`,
          `Step 2: Evaluate A AND (NOT B): 1 AND 1 = 1.`,
          `Step 3: Evaluate 1 OR C: 1 OR 0 = 1 (True).`,
          `Result: Ақиқат (True / 1).`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: A=1, B=0, C=0. Өрнек: (A AND NOT B) OR C. Мақсаты: Соңғы логикалық мәнді табу.`,
          ru: `Даны значения логических переменных A=1, B=0, C=0. Цель: Вычислить итоговое значение булевой формулы.`,
          en: `Given A=1, B=0, C=0. Formula: (A AND NOT B) OR C. Goal: Evaluate truth value.`,
        },
        ruleOrFormula: {
          kz: `Логикалық басымдық: 1) NOT (терістеу) ⟶ 2) AND (көбейту) ⟶ 3) OR (қосу).`,
          ru: `Приоритет логических операций: 1. Скобки, 2. Отрицание NOT, 3. Логическое умножение AND, 4. Логическое сложение OR.`,
          en: `Precedence: 1) Parentheses, 2) NOT, 3) AND, 4) OR.`,
        },
        steps: {
          kz: [
            "1. Жақша ішіндегі NOT B-ні есептеңіз: NOT 0 = 1.",
            "2. 1 AND 1 есептеңіз: 1 шығады.",
            "3. 1 OR 0 есептеңіз: 1 (True) шығады.",
          ],
          ru: [
            "1. Выполните инверсию: NOT 0 дает 1.",
            "2. Выполните конъюнкцию: 1 AND 1 дает 1.",
            "3. Выполните дизъюнкцию: 1 OR 0 дает 1 (True).",
          ],
          en: [
            "1. Invert: NOT 0 = 1.",
            "2. Conjunction: 1 AND 1 = 1.",
            "3. Disjunction: 1 OR 0 = 1.",
          ],
        },
        commonTrap: {
          kz: `Логикалық амалдардың кезегін шатастыру. AND әрқашан OR-дан бұрын орындалады!`,
          ru: `Ловушка: Выполнить OR раньше, чем AND. Конъюнкция ('И') обладает более высоким приоритетом, чем дизъюнкция ('ИЛИ')!`,
          en: `Trap: Evaluating OR before AND! AND has higher precedence.`,
        },
      },
      xpReward: 30,
    };
  } else {
    // 4. Data storage units: 1 KB = 1024 Bytes, 1 Byte = 8 bits
    const kb = randInt(2, 8);
    const bytes = kb * 1024;
    const rawOptions = [
      { text: `${bytes} байт`, isCorrect: true },
      { text: `${kb * 1000} байт`, isCorrect: false },
      { text: `${kb * 512} байт`, isCorrect: false },
      { text: `${bytes * 8} байт`, isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_cs_units_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Информатика", ru: "Информатика", en: "Computer Science" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Ақпаратты өлшеу бірліктері", ru: "Единицы измерения информации", en: "Data Measurement Units" },
      subtopic: { kz: "КБ-дан Байтқа көшіру (1024 коэффициенті)", ru: "Перевод Килобайт в байты", en: "Kilobytes to Bytes" },
      questionText: {
        kz: `Көлемі ${kb} Килобайт (КБ) болатын файлда неше Байт ақпарат бар?`,
        ru: `Сколько байт информации содержится в файле объемом ${kb} Килобайт (КБ)?`,
        en: `How many bytes of data are contained in a ${kb} Kilobyte (KB) file?`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `${kb} КБ = ${kb} · 1024 Байт = ?`,
      },
      options,
      hint: {
        kz: `Информатикада екілік жүйеге байланысты 1 Килобайт = 1024 Байт (2¹⁰), 1000 емес! ${kb}-ні 1024-ке көбейтіңіз.`,
        ru: `В информатике 1 Килобайт равен строго 1024 байтам (2¹⁰), а не 1000. Умножьте ${kb} на 1024.`,
        en: `In computing, 1 Kilobyte equals 1024 bytes (2^10), not 1000. Multiply ${kb} by 1024.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Ақпарат бірліктері: 1 КБ = 1024 Байт (2¹⁰ Байт).`,
          `2-қадам: ${kb} КБ = ${kb} · 1024 Байт.`,
          `3-қадам: ${kb} · 1024 = ${bytes} Байт.`,
          `Жауабы: ${bytes} байт.`,
        ],
        ru: [
          `Шаг 1: Базовая константа: 1 Килобайт = 1024 байта (2¹⁰).`,
          `Шаг 2: Умножаем объем: ${kb} × 1024.`,
          `Шаг 3: Вычисляем: ${bytes} байт.`,
          `Итог: ${bytes} байт.`,
        ],
        en: [
          `Step 1: Fundamental unit: 1 KB = 1024 Bytes (2^10).`,
          `Step 2: Multiply: ${kb} * 1024.`,
          `Step 3: Result is ${bytes} bytes.`,
          `Result: ${bytes} байт.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: ${kb} КБ. Мақсаты: Байт санына айналдыру.`,
          ru: `Дан объем файла ${kb} КБ. Цель: Выразить объем в байтах.`,
          en: `Given ${kb} KB. Goal: Convert to bytes.`,
        },
        ruleOrFormula: {
          kz: `Ереже: 1 КБ = 1024 Байт = 2¹⁰ Байт.`,
          ru: `Правило двоичных приставок: 1 КБ = 1024 байта = 2¹⁰ байт.`,
          en: `Binary prefix: 1 KB = 1024 Bytes.`,
        },
        steps: {
          kz: [
            "1. Есте сақтаңыз: КБ ⟶ Байт ауыстырғанда 1024-ке көбейтіледі.",
            `2. ${kb} · 1024 көбейтіндісін орындаңыз.`,
            `3. ${bytes} байт табыңыз.`,
          ],
          ru: [
            "1. Помните, что в компьютерных системах приставка Кило означает 1024 (2¹⁰), а не 1000.",
            `2. Умножьте ${kb} на 1024.`,
            `3. Выберите точный ответ: ${bytes} байт.`,
          ],
          en: [
            "1. Recall that 1 KB is 1024 bytes.",
            `2. Multiply ${kb} by 1024.`,
            `3. Select ${bytes} bytes.`,
          ],
        },
        commonTrap: {
          kz: `Ондық приставкамен шатастырып 1000-ға көбейту (${kb * 1000} байт деп алу)!`,
          ru: `Ловушка: Умножить на 1000 вместо 1024 (ошибка десятичной системы)!`,
          en: `Trap: Multiplying by 1000 instead of 1024!`,
        },
      },
      xpReward: 25,
    };
  }
}
