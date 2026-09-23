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

export function generateBiologyTask(grade: number = 8): LocalizedQuestion {
  // 8 diverse non-monotonous biology task categories
  const taskType = randInt(1, 8);

  if (taskType === 1) {
    // 1. Cell organelles: Mitochondria / Chloroplast / Ribosome / Lysosome / Golgi / Vacuole
    const organelles = [
      {
        name: { kz: "Митохондрия", ru: "Митохондрия", en: "Mitochondria" },
        function: {
          kz: "АТФ синтездеу және жасушалық тыныс алу («жасушаның электр станциясы»)",
          ru: "Синтез АТФ и клеточное дыхание («энергетическая станция клетки»)",
          en: "ATP synthesis and cellular respiration ('powerhouse of the cell')",
        },
        distractors: [
          { kz: "Ақуыздарды синтездеу", ru: "Синтез белков на матрице иРНК", en: "Protein synthesis" },
          { kz: "Генетикалық ақпаратты сақтау", ru: "Хранение генетической информации", en: "Storage of genetic information" },
          { kz: "Фотосинтез арқылы глюкоза түзу", ru: "Фотосинтез и образование глюкозы", en: "Photosynthesis and glucose production" },
        ],
      },
      {
        name: { kz: "Рибосома", ru: "Рибосома", en: "Ribosome" },
        function: {
          kz: "Ақуыздар биосинтезі (трансляция)",
          ru: "Биосинтез белков (трансляция на мембранах ЭПС)",
          en: "Protein biosynthesis (translation)",
        },
        distractors: [
          { kz: "АТФ синтезі", ru: "Синтез молекул АТФ", en: "ATP synthesis" },
          { kz: "Заттарды ыдырату (лизосома қызметі)", ru: "Расщепление полимеров", en: "Polymer degradation" },
          { kz: "Жасушаның бөліну шүйкесін құру", ru: "Построение веретена деления", en: "Spindle apparatus formation" },
        ],
      },
      {
        name: { kz: "Хлоропласт", ru: "Хлоропласт", en: "Chloroplast" },
        function: {
          kz: "Күн сәулесі энергиясын пайдаланып фотосинтез жүргізу",
          ru: "Фотосинтез с использованием энергии солнечного света",
          en: "Photosynthesis converting sunlight into chemical energy",
        },
        distractors: [
          { kz: "ДНҚ репликациясы", ru: "Репликация молекулы ДНК", en: "DNA replication" },
          { kz: "Жасушалық тыныс алу және АТФ", ru: "Клеточное дыхание без хлорофилла", en: "Respiration without chlorophyll" },
          { kz: "Қоректік заттарды экзоцитоз арқылы шығару", ru: "Выведение веществ из клетки", en: "Exocytosis of waste" },
        ],
      },
      {
        name: { kz: "Лизосома", ru: "Лизосома", en: "Lysosome" },
        function: {
          kz: "Гидролиздік ферменттер арқылы жасушаішілік қорыту және фагоцитоз",
          ru: "Внутриклеточное переваривание макромолекул гидролитическими ферментами",
          en: "Intracellular digestion and hydrolysis of macromolecules",
        },
        distractors: [
          { kz: "АТФ энергиясын жинақтау", ru: "Синтез АТФ на кристах", en: "ATP synthesis" },
          { kz: "Күн сәулесін сіңіру", ru: "Поглощение квантов света", en: "Sunlight absorption" },
          { kz: "Липидтер мен көмірсуларды модификациялау", ru: "Упаковка секреторных гранул", en: "Secretory packaging" },
        ],
      },
      {
        name: { kz: "Гольджи аппараты", ru: "Аппарат Гольджи", en: "Golgi Apparatus" },
        function: {
          kz: "Синтезделген заттарды сұрыптау, өзгерту және везикулаларға орау",
          ru: "Модификация, сортировка и упаковка белков и липидов в пузырьки",
          en: "Modification, sorting, and packaging of proteins into vesicles",
        },
        distractors: [
          { kz: "Аминқышқылдарынан ақуыз құрастыру", ru: "Непосредственная трансляция полипептида", en: "Direct translation" },
          { kz: "Сутектің тотығуы және фотолиз", ru: "Фотолиз воды и транспорт электронов", en: "Photolysis of water" },
          { kz: "Фагоцитоз арқылы бактерияны жою", ru: "Фагоцитоз чужеродных тел", en: "Phagocytosis" },
        ],
      },
    ];

    const selected = organelles[randInt(0, organelles.length - 1)];
    const rawOptions = [
      { text: selected.function.ru, isCorrect: true },
      ...selected.distractors.map((d) => ({ text: d.ru, isCorrect: false })),
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_bio_organelle_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Биология", ru: "Биология", en: "Biology" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Жасуша биологиясы (Цитология)", ru: "Цитология и органоиды клетки", en: "Cell Biology & Organelles" },
      subtopic: { kz: "Органоидтардың құрылысы мен қызметі", ru: "Строение и функции органоидов", en: "Organelle Structure & Function" },
      questionText: {
        kz: `Жасуша органоиды «${selected.name.kz}» негізгі қандай қызмет атқарады?`,
        ru: `Какую ключевую функцию в клетке выполняет органоид «${selected.name.ru}»?`,
        en: `What is the primary function of the organelle '${selected.name.en}' in a cell?`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `Органоид: ${selected.name.ru}  ⇒  Функция: ?`,
      },
      options,
      hint: {
        kz: `Еске түсіріңіз: ${selected.name.kz} жасушадағы негізгі процесті атқарады.`,
        ru: `Вспомните биологическую роль: ${selected.name.ru} отвечает за свой метаболический сектор в клетке.`,
        en: `Recall: ${selected.name.en} manages a specific metabolic pathway.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Аталған органоид: ${selected.name.kz}.`,
          `2-қадам: Оның басты функциясы — ${selected.function.kz}.`,
          `Жауабы: ${selected.function.kz}.`,
        ],
        ru: [
          `Шаг 1: Рассматриваемый органоид: ${selected.name.ru}.`,
          `Шаг 2: Вспоминаем его специализацию в метаболизме клетки.`,
          `Шаг 3: Главная функция органоида: ${selected.function.ru}.`,
          `Итог: ${selected.function.ru}.`,
        ],
        en: [
          `Step 1: The organelle in question is ${selected.name.en}.`,
          `Step 2: Primary role is ${selected.function.en}.`,
          `Result: ${selected.function.en}.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: Жасуша органоиды (${selected.name.kz}). Мақсаты: Оның негізгі қызметін анықтау.`,
          ru: `Дан органоид клетки (${selected.name.ru}). Цель: Определить его биологическую роль.`,
          en: `Given cell organelle (${selected.name.en}). Goal: Identify its essential function.`,
        },
        ruleOrFormula: {
          kz: `Цитология ережесі: Митохондрия = АТФ, Рибосома = ақуыз, Лизосома = қорыту, Гольджи = сұрыптау.`,
          ru: `Правило цитологии: Митохондрия = АТФ, Рибосома = белок, Лизосома = переваривание, Гольджи = модификация и упаковка.`,
          en: `Rule: Mitochondria = ATP, Ribosome = protein, Lysosome = digestion, Golgi = packaging.`,
        },
        steps: {
          kz: ["1. Органоид атын оқыңыз.", "2. Қызметін еске түсіріңіз.", "3. Дұрыс жауапты таңдаңыз."],
          ru: ["1. Определите органоид.", "2. Отсейте функции других органоидов.", "3. Выберите правильный вариант."],
          en: ["1. Read organelle name.", "2. Eliminate distractors.", "3. Select matching role."],
        },
        commonTrap: {
          kz: `Митохондрия мен хлоропласттың қызметін шатастыру!`,
          ru: `Ловушка: Перепутать энергетические станции (митохондрии выделяют АТФ при дыхании, хлоропласты создают глюкозу на свету).`,
          en: `Trap: Confusing ATP respiration in mitochondria with glucose synthesis in chloroplasts.`,
        },
      },
      xpReward: 25,
    };
  } else if (taskType === 2) {
    // 2. DNA Chargaff rule & percentage calculation
    const adeninePercent = randInt(18, 32);
    const thyminePercent = adeninePercent;
    const cytosinePercent = (100 - adeninePercent * 2) / 2;
    const guaninePercent = cytosinePercent;

    const askTarget = Math.random() > 0.5 ? "цитозин (C)" : "гуанин (G)";
    const targetVal = cytosinePercent;

    const rawOptions = [
      { text: `${targetVal}%`, isCorrect: true },
      { text: `${adeninePercent}%`, isCorrect: false },
      { text: `${100 - adeninePercent}%`, isCorrect: false },
      { text: `${(targetVal + 10) % 50}%`, isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_bio_chargaff_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Биология", ru: "Биология", en: "Biology" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Молекулалық биология", ru: "Молекулярная биология и ДНК", en: "Molecular Biology & DNA" },
      subtopic: { kz: "Чаргафф ережесі", ru: "Правило Чаргаффа (А=Т, Г=Ц)", en: "Chargaff's Rules" },
      questionText: {
        kz: `ДНҚ молекуласында адениннің (А) үлесі ${adeninePercent}% құрайды. Чаргафф ережесі бойынша осы молекуладағы ${askTarget} үлесі қандай болады?`,
        ru: `В молекуле ДНК доля аденина (А) составляет ${adeninePercent}%. Согласно правилу Чаргаффа, какова процентная доля нуклеотида ${askTarget}?`,
        en: `In a DNA molecule, adenine (A) accounts for ${adeninePercent}%. According to Chargaff's rules, what is the percentage of ${askTarget}?`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `A + T + G + C = 100%  |  A = T, G = C`,
      },
      options,
      hint: {
        kz: `Аденин мөлшері тиминге тең: A = T = ${adeninePercent}%. Олар бірге ${adeninePercent * 2}% құрайды. Қалған ${100 - adeninePercent * 2}% гуанин мен цитозинге бөлінеді (екіге бөліңіз).`,
        ru: `Правило Чаргаффа: А = Т, значит Т тоже ${adeninePercent}%. Вместе А+Т = ${adeninePercent * 2}%. Оставшиеся ${100 - adeninePercent * 2}% поровну делятся между Г и Ц.`,
        en: `A = T, so T = ${adeninePercent}%. A + T = ${adeninePercent * 2}%. Remaining ${100 - adeninePercent * 2}% is split equally between G and C.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Аденин = ${adeninePercent}%, демек Тимин = ${thyminePercent}%.`,
          `2-қадам: A + T = ${adeninePercent + thyminePercent}%.`,
          `3-қадам: G + C = 100% - ${adeninePercent + thyminePercent}% = ${100 - (adeninePercent + thyminePercent)}%.`,
          `4-қадам: ${askTarget} = ${100 - (adeninePercent + thyminePercent)}% / 2 = ${targetVal}%.`,
          `Жауабы: ${targetVal}%.`,
        ],
        ru: [
          `Шаг 1: По правилу комплементарности количество Аденина равно Тимину (А = Т = ${adeninePercent}%).`,
          `Шаг 2: Суммарно на пару А-Т приходится: ${adeninePercent} + ${thyminePercent} = ${adeninePercent + thyminePercent}%.`,
          `Шаг 3: На пару Г-Ц остается: 100% - ${adeninePercent + thyminePercent}% = ${100 - (adeninePercent + thyminePercent)}%.`,
          `Шаг 4: Так как Г = Ц, доля ${askTarget} равна ${100 - (adeninePercent + thyminePercent)}% / 2 = ${targetVal}%.`,
          `Итог: ${targetVal}%.`,
        ],
        en: [
          `Step 1: Complementary base pairing requires A = T = ${adeninePercent}%.`,
          `Step 2: Total A + T = ${adeninePercent + thyminePercent}%.`,
          `Step 3: Remaining G + C = 100% - ${adeninePercent + thyminePercent}% = ${100 - (adeninePercent + thyminePercent)}%.`,
          `Step 4: Since G = C, percentage of ${askTarget} is ${targetVal}%.`,
          `Result: ${targetVal}%.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: А = ${adeninePercent}%. Мақсаты: ${askTarget} үлесін есептеу.`,
          ru: `Дано: Доля А = ${adeninePercent}%. Цель: Найти процентное содержание нуклеотида ${askTarget}.`,
          en: `Given: A = ${adeninePercent}%. Goal: Calculate percentage of ${askTarget}.`,
        },
        ruleOrFormula: {
          kz: `Чаргафф ережесі: A=T және G=C. Жалпы қосындысы 100%.`,
          ru: `Правило Чаргаффа: Количество аденина равно тимину (А=Т), а гуанина — цитозину (Г=Ц). Сумма всех четырех равна 100%.`,
          en: `Chargaff's Rule: %A = %T and %G = %C. Total sum = 100%.`,
        },
        steps: {
          kz: ["1. A=T қосындысын табыңыз.", "2. 100-ден азайтып қалғанын табыңыз.", "3. 2-ге бөліп, жауапты анықтаңыз."],
          ru: ["1. Удвойте процент А (так как А=Т).", "2. Вычтите сумму из 100%.", "3. Разделите остаток на 2 для получения доли Г или Ц."],
          en: ["1. Double %A (since A=T).", "2. Subtract from 100%.", "3. Divide remaining percentage by 2."],
        },
        commonTrap: {
          kz: `100-ден Аденин үлесін шегеріп, 2-ге бөлуді ұмытып кету!`,
          ru: `Ловушка: Забыть вычесть Тимин или забыть поделить остаток на 2.`,
          en: `Trap: Forgetting that A=T occupies double the percentage before dividing remainder by 2.`,
        },
      },
      xpReward: 30,
    };
  } else if (taskType === 3) {
    // 3. Photosynthesis: Light vs Dark phases & water photolysis
    const subvariant = randInt(1, 2);

    if (subvariant === 1) {
      // Photolysis byproduct gas
      const rawOptions = [
        { text: "Оттек (O₂) — тилакоид жарғақшасындағы су фотолизінен", isCorrect: true },
        { text: "Көмірқышқыл газы (CO₂)", isCorrect: false },
        { text: "Азот газы (N₂)", isCorrect: false },
        { text: "Глюкоза буы (C₆H₁₂O₆)", isCorrect: false },
      ];
      const shuffled = shuffle(rawOptions);
      const options = shuffled.map((opt, idx) => ({
        id: ["A", "B", "C", "D"][idx],
        text: opt.text,
        isCorrect: opt.isCorrect,
      }));

      return {
        id: `gen_bio_photo1_${Date.now()}_${randInt(100, 999)}`,
        subject: { kz: "Биология", ru: "Биология", en: "Biology" },
        grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
        topic: { kz: "Фотосинтез процесі", ru: "Фотосинтез: световая и темновая фазы", en: "Photosynthesis Process" },
        subtopic: { kz: "Судың фотолизі және жарық фазасы", ru: "Фотолиз воды и выделение кислорода", en: "Water Photolysis" },
        questionText: {
          kz: `Фотосинтездің жарық фазасында хлоропласттың тилакоидтарында су фотолизі нәтижесінде атмосфераға қандай жанама газ бөлінеді?`,
          ru: `Какой побочный газ выделяется в атмосферу в световой фазе фотосинтеза в результате фотолиза воды на тилакоидах хлоропласта?`,
          en: `Which byproduct gas is released into the atmosphere during the light-dependent phase of photosynthesis as a result of water photolysis on chloroplast thylakoids?`,
        },
        formulaDisplay: {
          type: "expression",
          expressionText: "2H₂O + hν (жарық) ⟶ 4H⁺ + 4e⁻ + O₂ ↑ (оттек)",
        },
        options,
        hint: {
          kz: `Судың құрамындағы сутек (H⁺) АТФ пен НАДФ·H түзуге кетеді, ал оттек (O₂) жанама өнім ретінде ауаға ұшып шығады.`,
          ru: `При расщеплении молекулы воды H₂O протоны H⁺ идут на синтез АТФ и НАДФ·Н, а кислород O₂ освобождается в атмосферу.`,
          en: `Water splitting releases electrons and protons for ATP/NADPH, while oxygen O2 is released as a byproduct.`,
        },
        stepByStepSolution: {
          kz: [
            `1-қадам: Жарық кванттары су молекуласын фотолизге ұшыратады: 2H₂O ⟶ 4H⁺ + 4e⁻ + O₂ ↑.`,
            `2-қадам: Бөлінген жанама өнім — молекулалық оттек (O₂).`,
            `Жауабы: Оттек (O₂).`,
          ],
          ru: [
            `Шаг 1: В световой фазе на мембране тилакоида происходит фотолиз воды: 2H₂O ⟶ 4H⁺ + 4e⁻ + O₂ ↑.`,
            `Шаг 2: Кислород не используется растением для синтеза сахара в темновой фазе и диффундирует в атмосферу.`,
            `Итог: Кислород (O₂).`,
          ],
          en: [
            `Step 1: In the thylakoid lumen, light drives water photolysis: 2H2O -> 4H+ + 4e- + O2.`,
            `Step 2: Oxygen gas diffuses out into the atmosphere as a byproduct.`,
            `Result: Oxygen (O2).`,
          ],
        },
        howToSolveGuide: {
          givenAndGoal: {
            kz: `Берілгені: Су фотолизі процесі. Мақсаты: Бөлінетін газды анықтау.`,
            ru: `Дано: Световая фаза фотосинтеза и фотолиз воды. Цель: Определить выделяющийся газ.`,
            en: `Given: Water photolysis in light reactions. Goal: Identify released gas.`,
          },
          ruleOrFormula: {
            kz: `Фотолиз реакциясы: 2H₂O ⟶ 4H⁺ + 4e⁻ + O₂.`,
            ru: `Уравнение фотолиза: 2H₂O + свет ⟶ 4H⁺ + 4e⁻ + O₂ ↑. Кислород происходит именно из воды, а не из углекислого газа!`,
            en: `Photolysis: 2H2O + light -> 4H+ + 4e- + O2. Oxygen originates from water, not CO2!`,
          },
          steps: {
            kz: ["1. Су формуласын еске түсіріңіз (H₂O).", "2. Оттек бөлінетінін анықтаңыз.", "3. O₂ таңдаңыз."],
            ru: ["1. Вспомните формулу воды (H₂O).", "2. Выделите компонент O₂ как газообразный побочный продукт.", "3. Выберите кислород."],
            en: ["1. Note water composition (H2O).", "2. Identify O2 as released gas.", "3. Select oxygen."],
          },
          commonTrap: {
            kz: `Қате: Көмірқышқыл газын (CO₂) таңдау — CO₂ керісінше қараңғы сатысында сіңіріледі!`,
            ru: `Ловушка: Выбрать углекислый газ (CO₂) — CO₂ поглощается в темновой фазе, а не выделяется!`,
            en: `Trap: Selecting CO2 (which is absorbed in dark phase, not released).`,
          },
        },
        xpReward: 35,
      };
    } else {
      // Dark phase: Calvin cycle in Stroma
      const rawOptions = [
        { text: "Стромада (Кальвин циклінде көмірқышқыл газынан глюкоза түзілуі)", isCorrect: true },
        { text: "Тилакоид жарғақшасында (судың фотолизі)", isCorrect: false },
        { text: "Хлоропласттың сыртқы қабықшасында", isCorrect: false },
        { text: "Ядрошықта", isCorrect: false },
      ];
      const shuffled = shuffle(rawOptions);
      const options = shuffled.map((opt, idx) => ({
        id: ["A", "B", "C", "D"][idx],
        text: opt.text,
        isCorrect: opt.isCorrect,
      }));

      return {
        id: `gen_bio_photo2_${Date.now()}_${randInt(100, 999)}`,
        subject: { kz: "Биология", ru: "Биология", en: "Biology" },
        grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
        topic: { kz: "Фотосинтез: Қараңғы фазасы", ru: "Фотосинтез: Темновая фаза и цикл Кальвина", en: "Dark Reactions & Calvin Cycle" },
        subtopic: { kz: "Глюкозаның стромада синтезделуі", ru: "Локализация темновой фазы в строме", en: "Stroma Localization" },
        questionText: {
          kz: `Фотосинтездің қараңғы фазасы (Кальвин циклі, CO₂ бекітілуі және глюкоза синтезі) хлоропласттың нақты қай бөлігінде жүреді?`,
          ru: `В какой части хлоропласта протекают реакции темновой фазы фотосинтеза (цикл Кальвина, фиксация CO₂ и синтез глюкозы)?`,
          en: `In which part of the chloroplast do dark reactions take place (Calvin cycle, CO2 fixation, and glucose synthesis)?`,
        },
        formulaDisplay: {
          type: "expression",
          expressionText: "Строма: 6CO₂ + 18АТФ + 12НАДФ·H ⟶ C₆H₁₂O₆ (Глюкоза)",
        },
        options,
        hint: {
          kz: `Жарық сатысы — тилакоидтарда, ал қараңғы сатысы (глюкоза жасау) — хлоропласттың ішкі сұйықтығында (стромада) өтеді.`,
          ru: `Световая фаза протекает на мембранах тилакоидов граны, а темновая фаза — в строме (внутреннем содержимом) хлоропласта.`,
          en: `Light phase is on thylakoids; dark phase (Calvin cycle) occurs in the stroma.`,
        },
        stepByStepSolution: {
          kz: [
            `1-қадам: Жарық фазасы тилакоид мембранасында АТФ пен НАДФ·H береді.`,
            `2-қадам: Бұл энергия қараңғы фазаға — стромаға жіберіледі.`,
            `3-қадам: Стромада ферменттер көмегімен CO₂-ден глюкоза синтезделеді.`,
            `Жауабы: Стромада.`,
          ],
          ru: [
            `Шаг 1: Реакции фиксации углерода требуют растворимых ферментов цикла Кальвина (включая Рубиско).`,
            `Шаг 2: Эти ферменты находятся во внутреннем гелеобразном матриксе хлоропласта — строме.`,
            `Шаг 3: На тилакоидах идет только световая фаза, в строме — темновая.`,
            `Итог: В строме.`,
          ],
          en: [
            `Step 1: Calvin cycle enzymes operate in the fluid matrix of the chloroplast.`,
            `Step 2: This fluid matrix is known as the stroma.`,
            `Result: In the stroma.`,
          ],
        },
        howToSolveGuide: {
          givenAndGoal: {
            kz: `Берілгені: Фотосинтездің қараңғы фазасы. Мақсаты: Оның өтетін орнын табу.`,
            ru: `Дана темновая фаза фотосинтеза. Цель: Указать правильную локализацию в органоиде.`,
            en: `Given dark reactions. Goal: Identify exact chloroplast compartment.`,
          },
          ruleOrFormula: {
            kz: `Жарық = Тилакоид (O₂, АТФ). Қараңғы = Строма (Глюкоза C₆H₁₂O₆).`,
            ru: `Свет = Тилакоиды (фотолиз, синтез АТФ). Темнота = Строма (фиксация CO₂, синтез глюкозы).`,
            en: `Light = Thylakoids (O2, ATP). Dark = Stroma (Calvin cycle, Glucose).`,
          },
          steps: {
            kz: ["1. Жарық пен қараңғы сатысын ажыратыңыз.", "2. Строма терминін таңдаңыз."],
            ru: ["1. Разделите световую и темновую фазу.", "2. Сопоставьте строму с циклом Кальвина.", "3. Выберите строму."],
            en: ["1. Distinguish light vs dark reactions.", "2. Associate stroma with Calvin cycle.", "3. Select stroma."],
          },
          commonTrap: {
            kz: `Тилакоидпен шатастыру!`,
            ru: `Ловушка: Выбрать тилакоиды — на тилакоидах идет ТОЛЬКО световая фаза!`,
            en: `Trap: Selecting thylakoids where only light reactions occur.`,
          },
        },
        xpReward: 30,
      };
    }
  } else if (taskType === 4) {
    // 4. Mendel's Laws & Genetics
    const isTestCross = Math.random() > 0.5;

    if (isTestCross) {
      // Test cross: Aa x aa -> 1:1
      const rawOptions = [
        { text: "1 : 1 (50% доминантты, 50% рецессивті)", isCorrect: true },
        { text: "3 : 1", isCorrect: false },
        { text: "1 : 2 : 1", isCorrect: false },
        { text: "100% біркелкі доминантты", isCorrect: false },
      ];
      const shuffled = shuffle(rawOptions);
      const options = shuffled.map((opt, idx) => ({
        id: ["A", "B", "C", "D"][idx],
        text: opt.text,
        isCorrect: opt.isCorrect,
      }));

      return {
        id: `gen_bio_testcross_${Date.now()}_${randInt(100, 999)}`,
        subject: { kz: "Биология", ru: "Биология", en: "Biology" },
        grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
        topic: { kz: "Генетика: Талдаушы шағылыстыру", ru: "Генетика: Анализирующее скрещивание", en: "Genetics: Test Cross" },
        subtopic: { kz: "Aa × aa будандастыру", ru: "Скрещивание с рецессивной гомозиготой", en: "Aa x aa Cross" },
        questionText: {
          kz: `Гетерозиготалы дараны (Aa) рецессивті гомозиготамен (aa) талдаушы шағылыстырғанда ұрпақта фенотип бойынша қандай ажырау болады?`,
          ru: `Какое расщепление по фенотипу и генотипу наблюдается при анализирующем скрещивании гетерозиготы с рецессивной гомозиготой (Aa × aa)?`,
          en: `What phenotypic and genotypic ratio is observed in a test cross between a heterozygote and a homozygous recessive individual (Aa x aa)?`,
        },
        formulaDisplay: {
          type: "expression",
          expressionText: "P: Aa × aa  ⟹  F₁: 1 Aa (50%) : 1 aa (50%)  [1 : 1]",
        },
        options,
        hint: {
          kz: `Аталық гаметалар: A және a. Аналық: a. Ұрпақтары: Aa (доминантты) және aa (рецессивті) тең мөлшерде 1:1.`,
          ru: `Особь Aa дает гаметы A и a, особь aa дает только гамету a. Получаются потомки: 50% Aa и 50% aa. Расщепление строго 1:1.`,
          en: `Aa produces A and a gametes, aa produces only a. Offspring: 50% Aa and 50% aa (1:1).`,
        },
        stepByStepSolution: {
          kz: [
            `1-қадам: Aa дарасы екі типті гамета береді: A және a.`,
            `2-қадам: aa дарасы бір ғана типті гамета береді: a.`,
            `3-қадам: Қосылу нәтижесі: 1 Aa : 1 aa.`,
            `Жауабы: 1 : 1.`,
          ],
          ru: [
            `Шаг 1: Анализирующее скрещивание проводится с особью генотипа aa.`,
            `Шаг 2: Гаметы: от Aa получаем A и a; от aa — только a.`,
            `Шаг 3: Сочетания зигот: Aa (доминантный фенотип) и aa (рецессивный фенотип) в равных долях.`,
            `Итог: 1 : 1.`,
          ],
          en: [
            `Step 1: Test cross pairs Aa with homozygous recessive aa.`,
            `Step 2: Gametes: A, a from first parent; a from second parent.`,
            `Step 3: Offspring: 50% Aa : 50% aa (1:1 ratio).`,
            `Result: 1 : 1.`,
          ],
        },
        howToSolveGuide: {
          givenAndGoal: {
            kz: `Берілгені: Aa × aa шағылыстыруы. Мақсаты: Ажырау қатынасын табу.`,
            ru: `Дано скрещивание Aa × aa. Цель: Определить расщепление.`,
            en: `Given Aa x aa. Goal: Determine offspring ratio.`,
          },
          ruleOrFormula: {
            kz: `Талдаушы шағылыстыру формуласы: Aa × aa → 1:1.`,
            ru: `Правило анализирующего скрещивания: моногибридное дает 1:1, дигибридное (AaBb × aabb) дает 1:1:1:1.`,
            en: `Test cross rule: Aa x aa yields 1:1 ratio.`,
          },
          steps: {
            kz: ["1. Гаметаларды анықтаңыз.", "2. 1:1 нұсқасын таңдаңыз."],
            ru: ["1. Запишите гаметы родителей.", "2. Составьте решетку Пеннета 2x1.", "3. Выберите 1:1."],
            en: ["1. Write gametes.", "2. Cross A and a with a.", "3. Select 1:1."],
          },
          commonTrap: {
            kz: `3:1 (Aa x Aa) қатынасымен шатастыру!`,
            ru: `Ловушка: Выбрать 3:1 — 3:1 получается при скрещивании Aa × Aa, а не Aa × aa!`,
            en: `Trap: Confusing with 3:1 which only occurs in Aa x Aa.`,
          },
        },
        xpReward: 35,
      };
    } else {
      // Aa x Aa -> 3:1
      const rawOptions = [
        { text: "3 : 1 (75% доминантты, 25% рецессивті)", isCorrect: true },
        { text: "1 : 1", isCorrect: false },
        { text: "9 : 3 : 3 : 1", isCorrect: false },
        { text: "1 : 2 : 1 (бұл генотип бойынша)", isCorrect: false },
      ];
      const shuffled = shuffle(rawOptions);
      const options = shuffled.map((opt, idx) => ({
        id: ["A", "B", "C", "D"][idx],
        text: opt.text,
        isCorrect: opt.isCorrect,
      }));

      return {
        id: `gen_bio_mendel_${Date.now()}_${randInt(100, 999)}`,
        subject: { kz: "Биология", ru: "Биология", en: "Biology" },
        grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
        topic: { kz: "Мендель заңдары", ru: "Законы Менделя и генетика", en: "Mendelian Genetics" },
        subtopic: { kz: "Моногибридті будандастыру (Аа × Аа)", ru: "Расщепление по фенотипу 3:1", en: "Monohybrid Cross" },
        questionText: {
          kz: `Толық басымдылық кезінде екі гетерозиготалы дараны (Aa × Aa) будандастырғанда ұрпақта (F₂) фенотип бойынша қандай ажырау байқалады?`,
          ru: `Какое расщепление по фенотипу наблюдается во втором поколении (F₂) при моногибридном скрещивании двух гетерозигот (Aa × Aa) при полном доминировании?`,
          en: `What phenotypic ratio is observed in the F2 generation from a cross between two heterozygotes (Aa × Aa) with complete dominance?`,
        },
        formulaDisplay: {
          type: "expression",
          expressionText: "P: Aa × Aa  ⟹  F₁: 1 AA : 2 Aa : 1 aa (Фенотип: 3 : 1)",
        },
        options,
        hint: {
          kz: `AA және Aa бірдей доминантты белгіні көрсетеді (1 + 2 = 3 бөлік), ал aa — 1 бөлік (3:1).`,
          ru: `Особи AA и Aa обладают одинаковым доминантным фенотипом (1+2=3), особь aa — рецессивным (1). Получается 3:1.`,
          en: `AA and Aa share dominant phenotype (3 parts), aa is recessive (1 part) -> 3:1.`,
        },
        stepByStepSolution: {
          kz: [
            `1-қадам: Генотиптік ажырау: 1 AA : 2 Aa : 1 aa.`,
            `2-қадам: Фенотип бойынша: (1+2) доминантты : 1 рецессивті = 3 : 1.`,
            `Жауабы: 3 : 1.`,
          ],
          ru: [
            `Шаг 1: Генотипы: 1 AA : 2 Aa : 1 aa (соотношение 1:2:1).`,
            `Шаг 2: Внешний фенотип: 3 части доминантных к 1 части рецессивных.`,
            `Итог: 3 : 1.`,
          ],
          en: [
            `Step 1: Genotypes: 1 AA : 2 Aa : 1 aa.`,
            `Step 2: Phenotypes: 3 dominant : 1 recessive -> 3:1.`,
            `Result: 3 : 1.`,
          ],
        },
        howToSolveGuide: {
          givenAndGoal: {
            kz: `Берілгені: Aa × Aa. Мақсаты: Фенотип бойынша арақатынас.`,
            ru: `Дано Aa × Aa. Цель: Найти расщепление по фенотипу.`,
            en: `Given Aa x Aa. Goal: Phenotypic ratio.`,
          },
          ruleOrFormula: {
            kz: `Мендельдің ажырау заңы: Aa × Aa → 3:1 (фенотип).`,
            ru: `Второй закон Менделя: при моногибридном скрещивании гетерозигот расщепление по фенотипу 3:1.`,
            en: `Mendel's 2nd Law: Aa x Aa produces 3:1 phenotypic ratio.`,
          },
          steps: {
            kz: ["1. Сұрақта фенотип екенін тексеріңіз.", "2. 3:1 нұсқасын таңдаңыз."],
            ru: ["1. Обратите внимание: вопрос по ФЕНОТИПУ.", "2. Выберите 3:1."],
            en: ["1. Note question asks for PHENOTYPE.", "2. Select 3:1."],
          },
          commonTrap: {
            kz: `Генотиптік (1:2:1) қатынаспен шатастыру!`,
            ru: `Ловушка: 1:2:1 — это расщепление по генотипу, а по фенотипу строго 3:1!`,
            en: `Trap: Selecting 1:2:1 which is the genotypic ratio.`,
          },
        },
        xpReward: 35,
      };
    }
  } else if (taskType === 5) {
    // 5. Blood Groups (AB0 System)
    const bloodQuestions = [
      {
        question: {
          kz: "Қан тобы I (0) болатын адам неліктен «әмбебап донор» деп аталады?",
          ru: "Почему человек с I (0) группой крови считается универсальным донором?",
          en: "Why is a person with blood type O (I) considered a universal donor?",
        },
        correct: {
          kz: "Эритроциттерінде A және B агглютиногендері (антигендері) болмайды",
          ru: "В его эритроцитах отсутствуют агглютиногены (антигены) А и В",
          en: "Red blood cells lack A and B agglutinogens (antigens)",
        },
        distractors: [
          { kz: "Қан плазмасында антиденелер мүлдем болмайды", ru: "В плазме полностью отсутствуют антитела", en: "Plasma has no antibodies" },
          { kz: "Оның эритроциттерінде екі антиген де бар", ru: "Его эритроциты содержат оба антигена А и В", en: "Contains both antigens" },
          { kz: "Оның қанында гемоглобин екі есе көп", ru: "Его кровь содержит двойную дозу гемоглобина", en: "Contains double hemoglobin" },
        ],
      },
      {
        question: {
          kz: "Қан тобы IV (AB) болатын реципиенттің ерекшелігі қандай?",
          ru: "В чем особенность реципиента с IV (AB) группой крови?",
          en: "What is the unique characteristic of an AB (IV) blood group recipient?",
        },
        correct: {
          kz: "Плазмасында α және β агглютининдері жоқ, сондықтан барлық топты қабылдай алады",
          ru: "В плазме отсутствуют агглютинины α и β, поэтому он является универсальным реципиентом",
          en: "Plasma contains no α and β antibodies, making them a universal recipient",
        },
        distractors: [
          { kz: "Тек I топтағы қанды ғана қабылдай алады", ru: "Может принимать только I группу", en: "Can only receive group I" },
          { kz: "Эритроциттері басқа қанды ыдыратады", ru: "Его эритроциты разрушают любую донорскую кровь", en: "Destroys donor blood" },
          { kz: "Оның қанында фибриноген жоқ", ru: "В его крови отсутствует белок фибриноген", en: "Lacks fibrinogen" },
        ],
      },
    ];

    const item = bloodQuestions[randInt(0, bloodQuestions.length - 1)];
    const rawOptions = [
      { text: item.correct.ru, isCorrect: true },
      ...item.distractors.map((d) => ({ text: d.ru, isCorrect: false })),
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_bio_blood_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Биология", ru: "Биология", en: "Biology" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Адам ағзасы және қанайналым", ru: "Кровеносная система и группы крови", en: "Circulatory System & Blood Types" },
      subtopic: { kz: "AB0 жүйесі бойынша қан құю", ru: "Система AB0 и совместимость при переливании", en: "AB0 System Compatibility" },
      questionText: item.question,
      formulaDisplay: {
        type: "expression",
        expressionText: "I (0) = әмбебап донор (антигенсіз)  |  IV (AB) = әмбебап реципиент (антиденесіз)",
      },
      options,
      hint: {
        kz: `I (0) тобының эритроциттерінде антиген жоқ, сондықтан басқа адамның қаны оған қарсы иммундық шабуыл жасамайды.`,
        ru: `Универсальный донор I(0) безопасен тем, что на его эритроцитах нет антигенов А и В, вызывающих склеивание (агглютинацию).`,
        en: `Type O lacks A/B surface antigens, preventing agglutination in recipients.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Қан топтары AB0 жүйесінде эритроциттегі агглютиногендерге байланысты.`,
          `2-қадам: I (0) тобында A және B антигендері жоқ.`,
          `Жауабы: ${item.correct.kz}.`,
        ],
        ru: [
          `Шаг 1: Агглютинация (склеивание эритроцитов) происходит при встрече одноименных антигена и антитела (А с α, В с β).`,
          `Шаг 2: У I(0) группы на поверхности эритроцитов нет антигенов А и В.`,
          `Итог: ${item.correct.ru}.`,
        ],
        en: [
          `Step 1: Agglutination occurs when matching antigen and antibody meet.`,
          `Step 2: Type O has no A or B antigens on erythrocyte membranes.`,
          `Result: ${item.correct.en}.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: Қан тобының сипаттамасы. Мақсаты: Дұрыс иммунологиялық себебін табу.`,
          ru: `Дана группа крови. Цель: Выявить причину донорской совместимости.`,
          en: `Given blood group. Goal: Explain immunological compatibility.`,
        },
        ruleOrFormula: {
          kz: `Агглютинация ережесі: A + α немесе B + β қатар келгенде эритроциттер жабысады.`,
          ru: `Правило совместимости: Нельзя допускать встречи антигена эритроцита донора с антителом плазмы реципиента.`,
          en: `Rule: Prevent donor erythrocyte antigens from reacting with recipient plasma antibodies.`,
        },
        steps: {
          kz: ["1. Эритроциттегі антигендерді еске түсіріңіз.", "2. I топта антиген болмайтынын таңдаңыз."],
          ru: ["1. Вспомните антигены на эритроцитах.", "2. Выберите отсутствие антигенов А и В."],
          en: ["1. Check membrane antigens.", "2. Select lack of A and B antigens."],
        },
        commonTrap: {
          kz: `Эритроциттегі антиген мен плазмадағы антиденені шатастыру!`,
          ru: `Ловушка: Перепутать антигены (на эритроцитах) и антитела (в плазме).`,
          en: `Trap: Confusing erythrocyte antigens with plasma antibodies.`,
        },
      },
      xpReward: 30,
    };
  } else if (taskType === 6) {
    // 6. Cellular Respiration & ATP balance
    const rawOptions = [
      { text: "38 молекула АТФ (2 АТФ гликолизде + 36 АТФ митохондрияда)", isCorrect: true },
      { text: "2 молекула АТФ (оттексіз гликолиз)", isCorrect: false },
      { text: "12 молекула АТФ", isCorrect: false },
      { text: "100 молекула АТФ", isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_bio_atp_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Биология", ru: "Биология", en: "Biology" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Жасушалық тыныс алу", ru: "Клеточное дыхание и энергетический обмен", en: "Cellular Respiration & Energy" },
      subtopic: { kz: "Глюкозаның толық оттекті ыдырауы", ru: "Баланс синтеза АТФ при дыхании", en: "ATP Yield in Respiration" },
      questionText: {
        kz: `Бір молекула глюкозаның оттекті толық ыдырауы (аэробты тыныс алу) нәтижесінде жасушада барлығы неше АТФ молекуласы түзіледі?`,
        ru: `Сколько молекул АТФ суммарно образуется в клетке при полном аэробном (кислородном) расщеплении одной молекулы глюкозы?`,
        en: `How many total ATP molecules are produced in a cell during complete aerobic respiration of one glucose molecule?`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: "C₆H₁₂O₆ + 6O₂ + 38АДФ + 38Ф ⟶ 6CO₂ + 6H₂O + 38АТФ",
      },
      options,
      hint: {
        kz: `Анаэробты гликолизде цитоплазмада 2 АТФ, ал митохондриядағы оттекті кезеңде (Кребс циклі мен тотыға фосфорлану) тағы 36 АТФ түзіледі.`,
        ru: `Бескислородный этап (гликолиз в гиалоплазме) дает 2 АТФ, а кислородный этап в митохондриях дает еще 36 АТФ. Суммарно — 38 АТФ.`,
        en: `Glycolysis in cytoplasm produces 2 ATP; aerobic stages in mitochondria yield 36 ATP -> total 38 ATP.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Оттексіз кезең (гликолиз): 1 глюкоза ⟶ 2 ПВҚ + 2 АТФ.`,
          `2-қадам: Оттекті кезең (митохондрия кристалары): 36 АТФ.`,
          `3-қадам: Жалпы энергетикалық шығым: 2 + 36 = 38 АТФ.`,
          `Жауабы: 38 молекула АТФ.`,
        ],
        ru: [
          `Шаг 1: Бескислородное расщепление (гликолиз) дает 2 молекулы АТФ.`,
          `Шаг 2: Кислородное расщепление в митохондриях дает 36 молекул АТФ.`,
          `Шаг 3: Полный суммарный выход энергии составляет 38 АТФ.`,
          `Итог: 38 молекул АТФ.`,
        ],
        en: [
          `Step 1: Glycolysis yields 2 net ATP.`,
          `Step 2: Krebs cycle and electron transport chain yield 36 ATP.`,
          `Step 3: Total net balance is 38 ATP.`,
          `Result: 38 ATP molecules.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: 1 молекула глюкоза. Мақсаты: Аэробты тыныс алудың толық АТФ санын анықтау.`,
          ru: `Дана 1 молекула глюкозы. Цель: Определить полный выход АТФ.`,
          en: `Given 1 glucose molecule. Goal: Determine total ATP yield.`,
        },
        ruleOrFormula: {
          kz: `Энергия теңдеуі: 2 АТФ (гликолиз) + 36 АТФ (митохондрия) = 38 АТФ.`,
          ru: `Энергетический баланс: 2 АТФ (гликолиз) + 36 АТФ (кислородный этап) = 38 АТФ.`,
          en: `Energy equation: 2 ATP + 36 ATP = 38 ATP.`,
        },
        steps: {
          kz: ["1. Оттекті аэробты процесс екенін көріңіз.", "2. 38 АТФ нұсқасын таңдаңыз."],
          ru: ["1. Проверьте: вопрос об АЭРОБНОМ (полном) дыхании.", "2. Выберите 38 АТФ."],
          en: ["1. Note full aerobic pathway.", "2. Select 38 ATP."],
        },
        commonTrap: {
          kz: `Тек гликолиздің 2 АТФ мәнін таңдап қою!`,
          ru: `Ловушка: Выбрать 2 АТФ — 2 АТФ образуется только при брожении или бескислородном гликолизе!`,
          en: `Trap: Selecting 2 ATP which is only anaerobic glycolysis.`,
        },
      },
      xpReward: 30,
    };
  } else if (taskType === 7) {
    // 7. Ecology: Lindeman 10% rule of energy transfer
    const producerEnergy = randInt(2, 8) * 10000; // e.g. 40,000 kJ
    const herbivoreEnergy = producerEnergy * 0.1; // 4,000 kJ
    const carnivoreEnergy = herbivoreEnergy * 0.1; // 400 kJ

    const askLevel = Math.random() > 0.5 ? "жыртқыш (2-реттік консумент)" : "өсімдікқоректі (1-реттік консумент)";
    const ansVal = askLevel.includes("жыртқыш") ? carnivoreEnergy : herbivoreEnergy;

    const rawOptions = [
      { text: `${ansVal} кДж`, isCorrect: true },
      { text: `${producerEnergy * 0.5} кДж`, isCorrect: false },
      { text: `${ansVal * 2} кДж`, isCorrect: false },
      { text: `${ansVal / 10} кДж`, isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_bio_lindeman_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Биология", ru: "Биология", en: "Biology" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Экология және биогеоценоздар", ru: "Экология и пищевые цепи", en: "Ecology & Food Webs" },
      subtopic: { kz: "Линдеманның 10% ережесі", ru: "Правило 10% Линдемана", en: "Lindeman's 10% Law" },
      questionText: {
        kz: `Қоректік тізбекте өсімдіктер (продуценттер) ${producerEnergy} кДж энергия жинақтады. Линдеманның 10% ережесі бойынша келесі деңгейдегі ${askLevel} денесіне қанша энергия өтеді?`,
        ru: `В экосистеме продуценты (растения) накопили ${producerEnergy} кДж энергии. Согласно экологическому правилу 10% Линдемана, сколько энергии перейдет на уровень: ${askLevel}?`,
        en: `In a food chain, plants (producers) accumulated ${producerEnergy} kJ. According to Lindeman's 10% ecological rule, how much energy is transferred to: ${askLevel}?`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `Продуцент (${producerEnergy} кДж) ⟶ Консумент I (${herbivoreEnergy} кДж) ⟶ Консумент II (${carnivoreEnergy} кДж)`,
      },
      options,
      hint: {
        kz: `Әрбір келесі қоректік деңгейге алдыңғы деңгейдегі энергияның тек 10%-ы (оннан бір бөлігі) ғана өтеді.`,
        ru: `С одного трофического уровня на следующий переходит приблизительно 10% энергии (деление на 10 для каждого шага).`,
        en: `Approximately 10% of energy is transferred to each subsequent trophic level.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Продуценттер энергиясы: ${producerEnergy} кДж.`,
          `2-қадам: 1-реттік консументтерге (өсімдікқоректілерге) 10% өтеді: ${producerEnergy} × 0.1 = ${herbivoreEnergy} кДж.`,
          askLevel.includes("жыртқыш")
            ? `3-қадам: 2-реттік консументтерге (жыртқыштарға) тағы 10% өтеді: ${herbivoreEnergy} × 0.1 = ${carnivoreEnergy} кДж.`
            : `3-қадам: Сұралған деңгей: ${herbivoreEnergy} кДж.`,
          `Жауабы: ${ansVal} кДж.`,
        ],
        ru: [
          `Шаг 1: Исходная биомасса/энергия продуцентов: ${producerEnergy} кДж.`,
          `Шаг 2: На уровень травоядных переходит 10%: ${producerEnergy} / 10 = ${herbivoreEnergy} кДж.`,
          askLevel.includes("жыртқыш")
            ? `Шаг 3: На уровень хищников переходит еще 10%: ${herbivoreEnergy} / 10 = ${carnivoreEnergy} кДж.`
            : `Шаг 3: Значение для консументов I порядка: ${herbivoreEnergy} кДж.`,
          `Итог: ${ansVal} кДж.`,
        ],
        en: [
          `Step 1: Producer energy = ${producerEnergy} kJ.`,
          `Step 2: Primary consumers receive 10% = ${herbivoreEnergy} kJ.`,
          askLevel.includes("жыртқыш")
            ? `Step 3: Secondary consumers receive 10% of that = ${carnivoreEnergy} kJ.`
            : `Step 3: Primary consumer target = ${herbivoreEnergy} kJ.`,
          `Result: ${ansVal} kJ.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: Продуцент энергиясы (${producerEnergy} кДж). Мақсаты: Келесі трофикалық деңгейдегі энергияны табу.`,
          ru: `Дано: Энергия растений ${producerEnergy} кДж. Цель: Рассчитать переданную энергию по цепи питания.`,
          en: `Given producer energy ${producerEnergy} kJ. Goal: Calculate energy at target trophic level.`,
        },
        ruleOrFormula: {
          kz: `Линдеман ережесі: Энергия әр деңгейде 10 есе азаяды (E_n+1 = E_n × 0.1).`,
          ru: `Правило 10%: Каждый следующий трофический уровень получает 10% от предыдущего.`,
          en: `10% Law: Next trophic level receives exactly 10% of previous energy.`,
        },
        steps: {
          kz: ["1. Қанша деңгей алға жылжу керектігін санаңыз.", "2. Әр қадамда 10-ға бөліңіз.", "3. Жауапты таңдаңыз."],
          ru: ["1. Определите число шагов цепи.", "2. Разделите исходное число на 10 для каждого перехода.", "3. Выберите число."],
          en: ["1. Count trophic steps.", "2. Divide by 10 for each step.", "3. Select answer."],
        },
        commonTrap: {
          kz: `Жыртқыш деңгейінде екі рет 10-ға бөлуді ұмытып, бір ғана рет бөлу!`,
          ru: `Ловушка: Разделить на 10 только один раз при расчете для вторичных консументов (хищников).`,
          en: `Trap: Dividing by 10 once instead of twice for secondary consumers.`,
        },
      },
      xpReward: 30,
    };
  } else {
    // 8. Enzymes & Biological Catalysts
    const rawOptions = [
      { text: "Ақуыз (нәруыз) молекулалары — жоғары температурада денатурацияға ұшырайды", isCorrect: true },
      { text: "Майлар (липидтер)", isCorrect: false },
      { text: "Тек бейорганикалық тұздар", isCorrect: false },
      { text: "Күрделі көмірсулар (целлюлоза)", isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_bio_enzyme_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Биология", ru: "Биология", en: "Biology" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Ферменттер биологиясы", ru: "Биологические катализаторы (ферменты)", en: "Enzymes & Biocatalysts" },
      subtopic: { kz: "Ферменттердің химиялық табиғаты", ru: "Белковая природа ферментов", en: "Protein Nature of Enzymes" },
      questionText: {
        kz: `Тірі жасушаларда биохимиялық реакцияларды жүздеген мың есе жылдамдататын ферменттердің басым бөлігінің химиялық табиғаты қандай?`,
        ru: `Какова химическая природа подавляющего большинства ферментов, ускоряющих биохимические реакции в живых клетках?`,
        en: `What is the chemical nature of the vast majority of enzymes that catalyze biochemical reactions in living cells?`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: "Субстрат + Фермент (Ақуыз) ⟶ [Фермент-Субстрат кешені] ⟶ Өнімдер + Фермент",
      },
      options,
      hint: {
        kz: `Ферменттер жоғары температурада (мысалы 45-50°C-тан жоғары) белсенділігін жоғалтады (денатурацияланады), өйткені олар нәруыздардан тұрады.`,
        ru: `При нагревании свыше 42-45°C ферменты теряют третичную структуру (денатурируют), что подтверждает их белковую природу.`,
        en: `Enzymes lose their shape above 45°C due to denaturation, confirming they are proteins.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Ферменттер — биологиялық катализаторлар.`,
          `2-қадам: Олардың басым бөлігі глобулярлы ақуыздардан тұрады.`,
          `3-қадам: Сондықтан олар денатурацияға бейім.`,
          `Жауабы: Ақуыз молекулалары.`,
        ],
        ru: [
          `Шаг 1: Ферменты осуществляют высокоспецифичный катализ в клетках.`,
          `Шаг 2: По химическому строению практически все ферменты являются глобулярными белками.`,
          `Шаг 3: Их активный центр образован цепочкой аминокислот.`,
          `Итог: Белковые молекулы.`,
        ],
        en: [
          `Step 1: Enzymes are biological catalysts.`,
          `Step 2: Chemically, almost all enzymes are proteins with amino acid active sites.`,
          `Result: Proteins.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: Ферменттердің қызметі. Мақсаты: Олардың биохимиялық табиғатын табу.`,
          ru: `Даны ферменты. Цель: Определить их химический класс.`,
          en: `Given enzymes. Goal: Identify chemical class.`,
        },
        ruleOrFormula: {
          kz: `Ереже: Барлық дерлік ферменттер — ақуыздар (нәруыздар).`,
          ru: `Правило: Ферменты = глобулярные белки со специфическим активным центром.`,
          en: `Rule: Enzymes are globular proteins.`,
        },
        steps: {
          kz: ["1. Фермент қасиеттерін еске түсіріңіз.", "2. Ақуыз жауабын таңдаңыз."],
          ru: ["1. Вспомните денатурацию ферментов при температуре.", "2. Свяжите это со свойством белков.", "3. Выберите белки."],
          en: ["1. Recall enzyme denaturation with heat.", "2. Match with proteins."],
        },
        commonTrap: {
          kz: `Көмірсулармен (целлюлозамен) шатастыру!`,
          ru: `Ловушка: Выбрать углеводы или жиры. Ферменты — это белки!`,
          en: `Trap: Selecting lipids or carbohydrates. Enzymes are proteins!`,
        },
      },
      xpReward: 25,
    };
  }
}
