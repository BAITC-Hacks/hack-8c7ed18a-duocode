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

export function generateChemistryTask(grade: number = 8): LocalizedQuestion {
  const taskType = randInt(1, 4);

  if (taskType === 1) {
    // 1. Balancing chemical equation: Al + O₂ ⟶ Al₂O₃
    // 4Al + 3O₂ -> 2Al₂O₃. Sum of coefficients or coefficient before Al
    const rawOptions = [
      { text: "4 Al + 3 O₂ ⟶ 2 Al₂O₃ (коэффициенттер қосындысы: 9)", isCorrect: true },
      { text: "2 Al + 3 O₂ ⟶ Al₂O₃", isCorrect: false },
      { text: "Al + O₂ ⟶ Al₂O₃", isCorrect: false },
      { text: "4 Al + 2 O₂ ⟶ 3 Al₂O₃", isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_chem_balance_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Химия", ru: "Химия", en: "Chemistry" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Химиялық теңдеулер", ru: "Химические уравнения и коэффициенты", en: "Chemical Equations & Balancing" },
      subtopic: { kz: "Зат массасының сақталу заңы", ru: "Закон сохранения массы веществ", en: "Conservation of Mass" },
      questionText: {
        kz: `Алюминийдің оттекпен тотығу реакциясының теңдеуін теңестіріңіз: Al + O₂ ⟶ Al₂O₃. Дұрыс коэффициенттерді көрсетіңіз:`,
        ru: `Уравняйте реакцию окисления алюминия кислородом: Al + O₂ ⟶ Al₂O₃. Выберите верный набор коэффициентов:`,
        en: `Balance the combustion reaction of aluminum: Al + O₂ ⟶ Al₂O₃. Select the balanced equation:`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: "? Al + ? O₂ ⟶ ? Al₂O₃",
      },
      options,
      hint: {
        kz: `Оттекке қараңыз: сол жақта O₂, оң жақта O₃. Олардың ЕКОҮ (НОК) = 6. Демек, оң жаққа 2 коэффициентін қоямыз (2 · 3 = 6 атом О), сол жаққа 3O₂ қоямыз (3 · 2 = 6 атом О). Ал Al оң жақта 2 · 2 = 4 болды, сондықтан сол жаққа 4 Al қоямыз!`,
        ru: `Посмотрите на кислород: слева O₂, справа O₃. Наименьшее общее кратное 2 и 3 равно 6. Ставим 2 перед Al₂O₃ (2×3=6 кислородов) и 3 перед O₂ (3×2=6). Справа стало 4 алюминия (2×2), значит перед Al ставим 4.`,
        en: `Look at oxygen: O2 on left, O3 on right. LCM of 2 and 3 is 6. Place 2 in front of Al2O3 and 3 before O2. Then balance Al with 4.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Атомдарды санаймыз: сол жақта 1 Al және 2 O; оң жақта 2 Al және 3 O.`,
          `2-қадам: Оттекті теңестіреміз: НОК(2, 3) = 6. 3 O₂ және 2 Al₂O₃ жазамыз.`,
          `3-қадам: Алюминийді тексереміз: оң жақта 2 · 2 = 4 алюминий атомы бар. Сол жаққа 4 Al қоямыз.`,
          `4-қадам: Толық теңдеу: 4 Al + 3 O₂ ⟶ 2 Al₂O₃.`,
          `Жауабы: 4 Al + 3 O₂ ⟶ 2 Al₂O₃.`,
        ],
        ru: [
          `Шаг 1: Подсчитываем атомы до расстановки коэффициентов: Al: 1 слева, 2 справа; O: 2 слева, 3 справа.`,
          `Шаг 2: Уравниваем кислород через наименьшее общее кратное (НОК = 6): 3 O₂ и 2 Al₂O₃.`,
          `Шаг 3: Уравниваем алюминий: справа 2 × 2 = 4 атома, значит слева ставим коэффициент 4 перед Al.`,
          `Шаг 4: Итоговое уравнение: 4 Al + 3 O₂ ⟶ 2 Al₂O₃.`,
          `Итог: 4 Al + 3 O₂ ⟶ 2 Al₂O₃.`,
        ],
        en: [
          `Step 1: Count atoms: Left: 1 Al, 2 O. Right: 2 Al, 3 O.`,
          `Step 2: Find LCM of oxygens: LCM(2, 3) = 6 -> 3 O₂ and 2 Al₂O₃.`,
          `Step 3: Balance Al: 2 × 2 = 4 on right -> place 4 in front of Al on left.`,
          `Step 4: Balanced form: 4 Al + 3 O₂ ⟶ 2 Al₂O₃.`,
          `Result: 4 Al + 3 O₂ ⟶ 2 Al₂O₃.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: Схема Al + O₂ ⟶ Al₂O₃. Мақсаты: Зат массасының сақталу заңы бойынша коэффициенттерді қою.`,
          ru: `Дана схема реакции Al + O₂ ⟶ Al₂O₃. Цель: Расставить стехиометрические коэффициенты.`,
          en: `Given reaction scheme Al + O₂ ⟶ Al₂O₃. Goal: Balance atoms on both sides.`,
        },
        ruleOrFormula: {
          kz: `Зат массасының сақталу заңы: Реакцияға дейінгі және кейінгі әрбір элемент атомдарының саны бірдей болуы керек.`,
          ru: `Закон сохранения массы: число атомов каждого химического элемента слева и справа должно совпадать.`,
          en: `Law of Conservation of Mass: number of atoms of each element must remain constant.`,
        },
        steps: {
          kz: [
            "1. Индекстері тақ/жұп келетін элементтен бастаңыз (оттек: 2 және 3).",
            "2. ЕКОҮ (НОК) тауып, молекулалар алдына көбейту коэффициентін қойыңыз.",
            "3. Қалған жай заттың (Al) коэффициентін реттеңіз.",
          ],
          ru: [
            "1. Найдите элемент с нечетным числом атомов в сложной молекуле (кислород: справа 3, слева 2).",
            "2. Найдите НОК (для 2 и 3 это 6) и поставьте множители перед веществами (3 O₂ и 2 Al₂O₃).",
            "3. Уравняйте простой металл (алюминий: 2×2=4).",
          ],
          en: [
            "1. Start with the element in unequal odd/even counts (Oxygen).",
            "2. Apply least common multiple (6) to set coefficients 3 and 2.",
            "3. Balance the standalone metal Al last.",
          ],
        },
        commonTrap: {
          kz: `Индексті өзгерту (мысалы Al₂O₂ деп жазу). Индекстерді өзгертуге БОЛМАЙДЫ, тек алдына коэффициент қойылады!`,
          ru: `Ловушка: Менять индексы внутри химической формулы (например писать AlO₂)! Менять формулы нельзя, ставятся только коэффициенты ПЕРЕД формулой!`,
          en: `Trap: Modifying subscripts inside formulas! You can only modify leading coefficients!`,
        },
      },
      xpReward: 35,
    };
  } else if (taskType === 2) {
    // 2. Oxidation state: S in H₂SO₄ or Mn in KMnO₄
    const rawOptions = [
      { text: "+6", isCorrect: true },
      { text: "+4", isCorrect: false },
      { text: "+2", isCorrect: false },
      { text: "-2", isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_chem_oxstate_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Химия", ru: "Химия", en: "Chemistry" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Тотығу-тотықсыздану", ru: "Степени окисления элементов", en: "Oxidation States" },
      subtopic: { kz: "Күкірттің тотығу дәрежесі", ru: "Определение степени окисления в молекуле", en: "Determining Oxidation States" },
      questionText: {
        kz: `Күкірт қышқылының (H₂SO₄) құрамындағы күкірт (S) атомының тотығу дәрежесі нешеге тең?`,
        ru: `Определите степень окисления серы (S) в молекуле серной кислоты (H₂SO₄):`,
        en: `Determine the oxidation state of sulfur (S) in sulfuric acid (H₂SO₄):`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: "H₂⁺¹SˣO₄⁻² ⟹ 2·(+1) + x + 4·(-2) = 0",
      },
      options,
      hint: {
        kz: `Бейтарап молекуладағы тотығу дәрежелерінің қосындысы 0-ге тең. Сутек H әрқашан +1, оттек O әрқашан -2: 2·(+1) + x + 4·(-2) = 0. x-ті табыңыз!`,
        ru: `Сумма степеней окисления нейтральной молекулы равна 0. У водорода +1, у кислорода -2. Уравнение: 2×(+1) + x + 4×(-2) = 0. Найдите x.`,
        en: `The sum of oxidation states in a neutral compound is 0. Hydrogen is +1, Oxygen is -2. Solve: 2(+1) + x + 4(-2) = 0.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Белгілі тотығу дәрежелері: H = +1, O = -2.`,
          `2-қадам: Теңдеу құрамыз: 2 · (+1) + x + 4 · (-2) = 0.`,
          `3-қадам: 2 + x - 8 = 0  ⇒  x - 6 = 0  ⇒  x = +6.`,
          `Жауабы: +6.`,
        ],
        ru: [
          `Шаг 1: Константные степени окисления: Водород H = +1, Кислород O = -2.`,
          `Шаг 2: Составляем уравнение электронейтральности: 2×(+1) + x + 4×(-2) = 0.`,
          `Шаг 3: Упрощаем: +2 + x - 8 = 0  ⇒  x - 6 = 0  ⇒  x = +6.`,
          `Итог: +6.`,
        ],
        en: [
          `Step 1: Known oxidation states: H = +1, O = -2.`,
          `Step 2: Electrical neutrality: 2(+1) + x + 4(-2) = 0.`,
          `Step 3: Simplify: +2 + x - 8 = 0  =>  x = +6.`,
          `Result: +6.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: H₂SO₄ формуласы. Мақсаты: S тотығу дәрежесін есептеу.`,
          ru: `Дана формула серной кислоты H₂SO₄. Цель: Найти степень окисления центрального атома серы.`,
          en: `Given formula H₂SO₄. Goal: Calculate sulfur oxidation number.`,
        },
        ruleOrFormula: {
          kz: `Электробейтараптық ережесі: ∑ (тотығу дәрежелері · атомдар саны) = 0.`,
          ru: `Правило электронейтральности молекулы: алгебраическая сумма степеней окисления всех атомов равна нулю.`,
          en: `Neutrality rule: sum of oxidation numbers multiplied by stoichiometric indices equals zero.`,
        },
        steps: {
          kz: [
            "1. Тұрақты тотығу дәрежелерін қойыңыз: H(+1), O(-2).",
            "2. Индекстерге көбейтіңіз: 2·(+1) = +2, 4·(-2) = -8.",
            "3. Қосындысы 0 болуы үшін S нешеге тең екенін табыңыз: +8 - 2 = +6.",
          ],
          ru: [
            "1. Запишите известные степени окисления: H = +1, O = -2.",
            "2. Умножьте на индексы: 2 × (+1) = +2, 4 × (-2) = -8.",
            "3. Найдите балансирующий заряд: +2 + x - 8 = 0 -> x = +6.",
          ],
          en: [
            "1. Assign standard values: H = +1, O = -2.",
            "2. Multiply by indices: 2(+1) = +2, 4(-2) = -8.",
            "3. Solve for neutral charge: +2 + x - 8 = 0 -> x = +6.",
          ],
        },
        commonTrap: {
          kz: `Валенттілік (VI) пен тотығу дәрежесінің таңбасын шатастыру (+ таңбасын қоюды ұмытпаңыз: +6).`,
          ru: `Ловушка: Забыть знак плюса или спутать с валентностью (валентность пишется римскими цифрами без знака, а степень окисления строго со знаком: +6)!`,
          en: `Trap: Forgetting sign (+) or confusing with valence! Oxidation state always includes sign (+6).`,
        },
      },
      xpReward: 30,
    };
  } else if (taskType === 3) {
    // 3. Molar calculations: n = m / M
    // e.g. mass of m = 36 g of water (H2O), M = 18 g/mol -> n = 2 mol
    const moles = randInt(2, 5);
    const m = moles * 18;
    const rawOptions = [
      { text: `${moles} моль`, isCorrect: true },
      { text: `${moles + 1} моль`, isCorrect: false },
      { text: `${Math.max(1, moles - 1)} моль`, isCorrect: false },
      { text: `${moles * 2} моль`, isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_chem_molar_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Химия", ru: "Химия", en: "Chemistry" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Зат мөлшері және молярлық масса", ru: "Количество вещества и молярная масса", en: "Amount of Substance & Moles" },
      subtopic: { kz: "n = m / M формуласы", ru: "Расчет количества вещества (n = m/M)", en: "n = m / M Formula" },
      questionText: {
        kz: `Массасы m = ${m} г таза судың (H₂O) зат мөлшері (n) неше мольге тең? (M(H₂O) = 18 г/моль)`,
        ru: `Каково количество вещества (n) воды (H₂O) массой m = ${m} грамм? (Молярная масса M(H₂O) = 18 г/моль)`,
        en: `What is the amount of substance (n) of water (H₂O) with mass m = ${m} g? (Molar mass M(H₂O) = 18 g/mol)`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `n = m / M = ${m} г / 18 г/моль`,
      },
      options,
      hint: {
        kz: `Зат мөлшері формуласы: n = m / M. Масса ${m}-ді молярлық масса 18-ге бөліңіз: ${m} / 18 = ${moles} моль.`,
        ru: `Формула количества вещества: n = m / M. Разделите массу на молярную массу: ${m} / 18 = ${moles} моль.`,
        en: `Use formula n = m / M. Divide mass by molar mass: ${m} / 18 = ${moles} mol.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Берілгені: m = ${m} г, M(H₂O) = 2·1 + 16 = 18 г/моль.`,
          `2-қадам: Формула: n = m / M.`,
          `3-қадам: Есептейміз: n = ${m} / 18 = ${moles} моль.`,
          `Жауабы: ${moles} моль.`,
        ],
        ru: [
          `Шаг 1: Дано: масса воды m = ${m} г, M(H₂O) = 2×1 + 16 = 18 г/моль.`,
          `Шаг 2: Формула связи массы и количества вещества: n = m / M.`,
          `Шаг 3: Вычисляем: n = ${m} / 18 = ${moles} моль.`,
          `Итог: ${moles} моль.`,
        ],
        en: [
          `Step 1: Given: m = ${m} g, M(H₂O) = 18 g/mol.`,
          `Step 2: Formula: n = m / M.`,
          `Step 3: Calculate: n = ${m} / 18 = ${moles} mol.`,
          `Result: ${moles} mol.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: m = ${m} г су. Мақсаты: Зат мөлшерін n табу.`,
          ru: `Дана масса воды m = ${m} г. Цель: Рассчитать количество вещества n (в молях).`,
          en: `Given water mass m = ${m} g. Goal: Find moles n.`,
        },
        ruleOrFormula: {
          kz: `Негізгі формула: n = m / M (моль = грамм / (грамм/моль)).`,
          ru: `Основная стехиометрическая формула: n = m / M.`,
          en: `Key stoichiometric equation: n = m / M.`,
        },
        steps: {
          kz: [
            "1. Заттың молярлық массасын есептеңіз: M(H₂O) = 18 г/моль.",
            "2. Массаны молярлық массаға бөліңіз.",
            `3. ${m} / 18 = ${moles} моль табыңыз.`,
          ],
          ru: [
            "1. Проверьте молярную массу молекулы (для воды 2×1 + 16 = 18 г/моль).",
            "2. Примените формулу n = m / M.",
            `3. Разделите ${m} на 18 и получите ${moles} моль.`,
          ],
          en: [
            "1. Note molar mass of water (18 g/mol).",
            "2. Apply n = m / M.",
            `3. Divide ${m} by 18 to get ${moles} mol.`,
          ],
        },
        commonTrap: {
          kz: `Көбейту немесе бөлуді шатастыру (мысалы n = m · M деп жаңсақ көбейту). Моль — бұл массаны молярлық массаға БӨЛУ!`,
          ru: `Ловушка: Перепутать формулу и умножить массу на молярную массу вместо деления!`,
          en: `Trap: Multiplying mass by molar mass instead of dividing!`,
        },
      },
      xpReward: 30,
    };
  } else {
    // 4. Classification of inorganic substances (Acids vs Bases vs Salts vs Oxides)
    const substances = [
      { formula: "H₂SO₄", typeRu: "Кислота", typeKz: "Қышқыл", typeEn: "Acid" },
      { formula: "NaOH", typeRu: "Основание (щелочь)", typeKz: "Негіз (сілті)", typeEn: "Base (alkali)" },
      { formula: "NaCl", typeRu: "Соль", typeKz: "Тұз", typeEn: "Salt" },
      { formula: "CaO", typeRu: "Основный оксид", typeKz: "Негіздік оксид", typeEn: "Basic Oxide" },
    ];
    const item = substances[randInt(0, substances.length - 1)];
    const types = ["Кислота", "Основание (щелочь)", "Соль", "Основный оксид"];
    const distractors = types.filter((t) => t !== item.typeRu);

    const rawOptions = [
      { text: item.typeRu, isCorrect: true },
      ...distractors.map((d) => ({ text: d, isCorrect: false })),
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_chem_class_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Химия", ru: "Химия", en: "Chemistry" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Бейорганикалық заттардың кластары", ru: "Классы неорганических соединений", en: "Inorganic Compound Classes" },
      subtopic: { kz: "Оксидтер, қышқылдар, негіздер, тұздар", ru: "Оксиды, кислоты, основания, соли", en: "Oxides, Acids, Bases, Salts" },
      questionText: {
        kz: `«${item.formula}» заты бейорганикалық қосылыстардың қай класына жатады?`,
        ru: `К какому классу неорганических соединений относится вещество «${item.formula}»?`,
        en: `Which class of inorganic compounds does '${item.formula}' belong to?`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `Формула: ${item.formula} ⟹ Класс: ?`,
      },
      options,
      hint: {
        kz: `Формуланың басы мен аяғына қараңыз: егер H-тан басталса — қышқыл, егер OH аяқталса — негіз, егер металл + оттек болса — оксид, егер металл + қышқыл қалдығы болса — тұз.`,
        ru: `Смотрите на состав: начинается на H — кислота; заканчивается группой OH — основание; бинарное соединение с кислородом — оксид; металл + кислотный остаток — соль.`,
        en: `Composition clues: Starts with H -> Acid; Ends with OH -> Base; Binary with Oxygen -> Oxide; Metal + Acid radical -> Salt.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Зат формуласын талдаймыз: ${item.formula}.`,
          `2-қадам: Белгілері: ${
            item.formula.startsWith("H")
              ? "H ионы және қышқыл қалдығынан тұрады."
              : item.formula.includes("OH")
              ? "Металл және гидроксид (OH) тобынан тұрады."
              : item.formula.endsWith("O")
              ? "Элемент пен оттектен тұратын бинарлы қосылыс."
              : "Металл атомы мен қышқыл қалдығынан тұрады."
          }`,
          `3-қадам: Сәйкес класс: ${item.typeKz}.`,
          `Жауабы: ${item.typeRu}.`,
        ],
        ru: [
          `Шаг 1: Анализируем химический состав формулы ${item.formula}.`,
          `Шаг 2: Характерная группа: ${
            item.formula.startsWith("H")
              ? "Водород H⁺ на первом месте свидетельствует о кислоте."
              : item.formula.includes("OH")
              ? "Гидроксогруппа OH⁻ на втором месте указывает на основание."
              : item.formula.endsWith("O")
              ? "Двухэлементное соединение с кислородом O⁻² — оксид."
              : "Катион металла с анионом кислотного остатка образуют соль."
          }`,
          `Шаг 3: Класс вещества: ${item.typeRu}.`,
          `Итог: ${item.typeRu}.`,
        ],
        en: [
          `Step 1: Analyze formula ${item.formula}.`,
          `Step 2: Functional group analysis.`,
          `Step 3: Class is ${item.typeEn}.`,
          `Result: ${item.typeRu}.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: ${item.formula}. Мақсаты: Бейорганикалық класын анықтау.`,
          ru: `Дана формула вещества ${item.formula}. Цель: Определить класс неорганического соединения.`,
          en: `Given formula ${item.formula}. Goal: Classify compound.`,
        },
        ruleOrFormula: {
          kz: `Классификация ережесі: H+қышқыл қалдығы = Қышқыл; Металл+(OH) = Негіз; Элемент+O = Оксид; Металл+қышқыл қалдығы = Тұз.`,
          ru: `Признаки классов: H(кислотный остаток) = кислота; Me(OH)n = основание; ЭxOy = оксид; Me(кислотный остаток) = соль.`,
          en: `Classification rules: H-radical = Acid; Me-OH = Base; Element-O = Oxide; Me-radical = Salt.`,
        },
        steps: {
          kz: [
            "1. Формуланың бірінші және екінші элементтеріне қараңыз.",
            "2. H, OH, немесе O тобын анықтаңыз.",
            `3. "${item.typeRu}" белгілеңіз.`,
          ],
          ru: [
            "1. Посмотрите на начало и конец формулы.",
            "2. Выделите характерную группу (H, OH, O или кислотный остаток).",
            `3. Выберите класс: "${item.typeRu}".`,
          ],
          en: [
            "1. Inspect cationic and anionic components.",
            "2. Match with definition of Acid, Base, Salt, or Oxide.",
            `3. Select "${item.typeRu}".`,
          ],
        },
        commonTrap: {
          kz: `Негіздік оксид (CaO) пен негізді (Ca(OH)₂) шатастыру. Оксидте сутек болмайды!`,
          ru: `Ловушка: Путать оксиды и гидроксиды. В оксиде строго 2 элемента, один из которых кислород!`,
          en: `Trap: Confusing oxides with hydroxides. Oxides contain only 2 elements!`,
        },
      },
      xpReward: 25,
    };
  }
}
