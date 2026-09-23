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

export function generateEnglishTask(grade: number = 9): LocalizedQuestion {
  const taskType = randInt(1, 8);

  if (taskType === 1) {
    // 1. Present Perfect vs Past Simple (since/for/ago/yesterday)
    const years = randInt(2, 6);
    const subjects = [
      { pr: "She", verb: "has lived", dist: ["lived", "is living", "lives"] },
      { pr: "They", verb: "have studied", dist: ["studied", "are studying", "studies"] },
      { pr: "We", verb: "have worked", dist: ["worked", "are working", "works"] },
    ];
    const item = subjects[randInt(0, subjects.length - 1)];

    const rawOptions = [
      { text: item.verb, isCorrect: true },
      ...item.dist.map((d) => ({ text: d, isCorrect: false })),
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_eng_perf_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Ағылшын тілі", ru: "Английский язык", en: "English" },
      grade: {
        kz: `${grade}-сынып`,
        ru: `${grade} класс`,
        en: `Grade ${grade}`,
      },
      topic: { kz: "Шақтар жүйесі (Tenses)", ru: "Времена глаголов (Tenses)", en: "Verb Tenses" },
      subtopic: {
        kz: "Present Perfect vs Past Simple",
        ru: "Present Perfect vs Past Simple",
        en: "Present Perfect vs Past Simple",
      },
      questionText: {
        kz: `Сөйлемдегі бос орынды дұрыс грамматикалық формамен толықтырыңыз: "${item.pr} _____ here for ${years} years."`,
        ru: `Вставьте правильную форму глагола в пропуск: "${item.pr} _____ here for ${years} years."`,
        en: `Complete the sentence with the correct verb form: "${item.pr} _____ here for ${years} years."`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: `${item.pr} + [ have / has + V3 ] + for ${years} years`,
      },
      options,
      hint: {
        kz: `"for ${years} years" (соңғы ${years} жыл бойы) сөз тіркесі іс-әрекеттің бұрын басталып, қазір де жалғасып жатқанын білдіреді (Present Perfect: have/has + V3).`,
        ru: `Маркер "for ${years} years" (на протяжении ${years} лет) указывает на действие, начавшееся в прошлом и длящееся до сих пор. Используется Present Perfect (have/has + V3).`,
        en: `The time marker "for ${years} years" indicates an action that started in the past and continues into the present. Use Present Perfect (have/has + V3).`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Уақыт көрсеткішін анықтаймыз: "for ${years} years". Бұл — Present Perfect маркері.`,
          `2-қадам: Бастауышқа назар аударамыз: "${item.pr}".`,
          `3-қадам: ${item.pr === "She" || item.pr === "He" ? "3-жақ үшін has + V3 қолданылады" : "Көпше түр үшін have + V3 қолданылады"}: "${item.verb}".`,
          `Жауабы: ${item.verb}.`,
        ],
        ru: [
          `Шаг 1: Находим маркер времени: "for ${years} years" указывает на период до настоящего момента (Present Perfect).`,
          `Шаг 2: Смотрим на подлежащее: "${item.pr}".`,
          `Шаг 3: ${item.pr === "She" ? "С местоимением She/He согласуется has + 3-я форма" : "С местоимением They/We согласуется have + 3-я форма"}: "${item.verb}".`,
          `Итог: ${item.verb}.`,
        ],
        en: [
          `Step 1: Identify the time marker: "for ${years} years" indicates a duration up to now (Present Perfect).`,
          `Step 2: Check subject: "${item.pr}".`,
          `Step 3: Combine auxiliary verb and past participle: "${item.verb}".`,
          `Result: ${item.verb}.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: "${item.pr} _____ here for ${years} years". Мақсаты: Дұрыс етістік шағын таңдау.`,
          ru: `Дано предложение с пропуском и маркером длительности "for ${years} years". Цель: Выбрать корректную форму глагола.`,
          en: `Given sentence with duration marker "for ${years} years". Goal: Select correct tense form.`,
        },
        ruleOrFormula: {
          kz: `Present Perfect: have/has + V3 (Past Participle). Қолданылуы: for/since көрсеткіштерімен нәтиже немесе жалғасқан әрекет.`,
          ru: `Present Perfect: have / has + V3 (причастие прошедшего времени). Маркеры: for, since, already, yet.`,
          en: `Present Perfect: have / has + Past Participle (V3). Markers: for, since, already, yet.`,
        },
        steps: {
          kz: [
            "1. Сөйлемдегі уақыт маркерін табыңыз (for ... years).",
            "2. Бастауыштың жекеше не көпше екенін тексеріңіз.",
            "3. have немесе has таңдап, етістіктің 3-ші формасын қойыңыз.",
          ],
          ru: [
            "1. Найдите маркер времени в предложении (for ... years = длительность).",
            "2. Определите лицо и число подлежащего (he/she/it -> has, I/we/you/they -> have).",
            "3. Поставьте смысловой глагол в 3-ю форму (V3 / ed).",
          ],
          en: [
            "1. Find the time signal in the clause (for ... years = continuous duration to present).",
            "2. Determine subject person/number (he/she -> has, they/we -> have).",
            "3. Select have/has + past participle (V3).",
          ],
        },
        commonTrap: {
          kz: `Қате: Past Simple (lived) қою. Past Simple нақты өткен уақытта аяқталғанда (yesterday, in 2020) ғана қолданылады!`,
          ru: `Ловушка: Выбрать простое прошедшее (lived/studied). Past Simple используется только при указании на законченное прошлое (yesterday, in 2021, ago)!`,
          en: `Trap: Selecting Past Simple. Past Simple is only used when the time frame is finished (yesterday, ago, in 2020)!`,
        },
      },
      xpReward: 30,
    };
  } else if (taskType === 2) {
    // 2. First and Second Conditionals
    const isSecond = grade >= 9 && Math.random() > 0.5;
    if (isSecond) {
      // Second Conditional: If + Past Simple, would + V1
      const rawOptions = [
        { text: "would travel", isCorrect: true },
        { text: "will travel", isCorrect: false },
        { text: "travelled", isCorrect: false },
        { text: "would have travelled", isCorrect: false },
      ];
      const shuffled = shuffle(rawOptions);
      const options = shuffled.map((opt, idx) => ({
        id: ["A", "B", "C", "D"][idx],
        text: opt.text,
        isCorrect: opt.isCorrect,
      }));

      return {
        id: `gen_eng_cond2_${Date.now()}_${randInt(100, 999)}`,
        subject: { kz: "Ағылшын тілі", ru: "Английский язык", en: "English" },
        grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
        topic: { kz: "Шартты сөйлемдер (Conditionals)", ru: "Условные предложения (Conditionals)", en: "Conditionals" },
        subtopic: { kz: "Second Conditional (Екінші шартты)", ru: "Second Conditional (Нереальное условие)", en: "Second Conditional" },
        questionText: {
          kz: `Шартты сөйлемнің басты бөлігін толықтырыңыз: "If I won a million dollars, I _____ around the world."`,
          ru: `Завершите главное предложение: "If I won a million dollars, I _____ around the world."`,
          en: `Complete the conditional sentence: "If I won a million dollars, I _____ around the world."`,
        },
        formulaDisplay: {
          type: "expression",
          expressionText: "If + Past Simple (won) , would + Verb (travel)",
        },
        options,
        hint: {
          kz: `"If"-тен кейін Past Simple (won) тұр. Бұл — қиялдағы, орындалуы екіталай шарт (Second Conditional). Басты сөйлемде "would + V1" болуы керек.`,
          ru: `После If стоит Past Simple (won). Это нереальное условие в настоящем/будущем (Second Conditional). В главной части требуется "would + глагол в инфинитиве".`,
          en: `After 'If' we have Past Simple ('won'). This is an unreal conditional (Second Conditional). Main clause requires 'would + bare infinitive'.`,
        },
        stepByStepSolution: {
          kz: [
            `1-қадам: Шарт бағыныңқы сөйлеміндегі етістікті табамыз: "won" (Past Simple).`,
            `2-қадам: Ереже бойынша: If + Past Simple болса, басты сөйлем: would + V1.`,
            `3-қадам: Дұрыс нұсқа — "would travel".`,
            `Жауабы: would travel.`,
          ],
          ru: [
            `Шаг 1: Определяем время придаточного предложения: "won" (Past Simple).`,
            `Шаг 2: Правило 2nd Conditional: If + Past Simple, would + Infinitive (V1).`,
            `Шаг 3: Выбираем "would travel".`,
            `Итог: would travel.`,
          ],
          en: [
            `Step 1: Notice the If-clause tense: "won" (Past Simple).`,
            `Step 2: Rule for 2nd Conditional: If + Past Simple, would + V1.`,
            `Step 3: Correct choice is "would travel".`,
            `Result: would travel.`,
          ],
        },
        howToSolveGuide: {
          givenAndGoal: {
            kz: `Берілгені: If-бөлімінде Past Simple («won»). Мақсаты: Басты бөліктің дұрыс формасын табу.`,
            ru: `Дано придаточное условие с формой прошедшего времени ("If I won..."). Цель: Определить форму глагола в главной части.`,
            en: `Given If-clause with Past Simple ("won"). Goal: Identify correct modal verb in main clause.`,
          },
          ruleOrFormula: {
            kz: `Second Conditional формуласы: If + V2 (Past Simple) → would / could + V1.`,
            ru: `Second Conditional: If + V2 (Past Simple) → would + V1 (инфинитив). Обозначает гипотетическую, маловероятную ситуацию.`,
            en: `Second Conditional formula: If + Past Simple → would + V1. Used for hypothetical or unreal situations.`,
          },
          steps: {
            kz: [
              "1. If тұрған бөліктен шақты анықтаңыз (won = өткен шақ).",
              "2. 2-ші шартты ережесін еске түсіріңіз: will емес, would қолданылады.",
              "3. would + travel нұсқасын таңдаңыз.",
            ],
            ru: [
              "1. Определите время в условии (won — 2-я форма глагола win).",
              "2. Примените правило 2nd Conditional (в главной части will заменяется на would).",
              "3. Исключите will travel и would have travelled.",
            ],
            en: [
              "1. Find verb in If-clause (won = Past Simple).",
              "2. Recall 2nd conditional structure: main clause takes 'would + V1'.",
              "3. Select 'would travel'.",
            ],
          },
          commonTrap: {
            kz: `Ловушка: "will travel" таңдау. Will тек 1st Conditional-да (If I win, I will travel) қолданылады!`,
            ru: `Ловушка: Выбрать will travel. Will используется только в 1-м типе условий (реальное будущее: If I win, I will travel)!`,
            en: `Trap: Choosing 'will travel'. Will is only for 1st Conditional with Present Simple in condition!`,
          },
        },
        xpReward: 30,
      };
    } else {
      // First Conditional: If + Present Simple, will + V1
      const rawOptions = [
        { text: "will pass", isCorrect: true },
        { text: "passes", isCorrect: false },
        { text: "would pass", isCorrect: false },
        { text: "passed", isCorrect: false },
      ];
      const shuffled = shuffle(rawOptions);
      const options = shuffled.map((opt, idx) => ({
        id: ["A", "B", "C", "D"][idx],
        text: opt.text,
        isCorrect: opt.isCorrect,
      }));

      return {
        id: `gen_eng_cond1_${Date.now()}_${randInt(100, 999)}`,
        subject: { kz: "Ағылшын тілі", ru: "Английский язык", en: "English" },
        grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
        topic: { kz: "Шартты сөйлемдер (Conditionals)", ru: "Условные предложения (Conditionals)", en: "Conditionals" },
        subtopic: { kz: "First Conditional (Бірінші шартты)", ru: "First Conditional (Реальное условие)", en: "First Conditional" },
        questionText: {
          kz: `Сөйлемді аяқтаңыз: "If you study hard, you _____ the exam."`,
          ru: `Вставьте верный глагол: "If you study hard, you _____ the exam."`,
          en: `Complete the sentence: "If you study hard, you _____ the exam."`,
        },
        formulaDisplay: {
          type: "expression",
          expressionText: "If + Present Simple (study) , will + Verb (pass)",
        },
        options,
        hint: {
          kz: `First Conditional нақты мүмкін әрекеттерге арналған: If + Present Simple (study) → will + V1 (will pass).`,
          ru: `First Conditional выражает реальное условие в будущем: If + Present Simple (study) → will + инфинитив (will pass).`,
          en: `First Conditional expresses real future conditions: If + Present Simple → will + bare verb.`,
        },
        stepByStepSolution: {
          kz: [
            `1-қадам: If-сөйлемінде Present Simple тұр: "study".`,
            `2-қадам: First Conditional құрылымы: If + Present Simple, will + V1.`,
            `3-қадам: Дұрыс жауап: "will pass".`,
            `Жауабы: will pass.`,
          ],
          ru: [
            `Шаг 1: В придаточном времени стоит Present Simple: "study".`,
            `Шаг 2: Структура 1-го типа условий: If + Present Simple, will + V1.`,
            `Шаг 3: Выбираем "will pass".`,
            `Итог: will pass.`,
          ],
          en: [
            `Step 1: If-clause contains Present Simple ("study").`,
            `Step 2: 1st Conditional pattern: If + Present Simple, will + V1.`,
            `Step 3: Correct answer is "will pass".`,
            `Result: will pass.`,
          ],
        },
        howToSolveGuide: {
          givenAndGoal: {
            kz: `Берілгені: "If you study hard, you _____ the exam". Мақсаты: Болашаққа арналған нақты шартты форманы табу.`,
            ru: `Дано предложение реального условия в будущем. Цель: Выбрать корректную форму будущего времени.`,
            en: `Given a real conditional in the future. Goal: Complete the main clause with the right auxiliary.`,
          },
          ruleOrFormula: {
            kz: `1st Conditional: If + Present Simple, will + V1.`,
            ru: `1st Conditional: If + Present Simple, will + глагол в начальной форме (без частицы to).`,
            en: `1st Conditional: If + Present Simple, will + base form of verb.`,
          },
          steps: {
            kz: [
              "1. If-тен кейінгі шақты көріңіз (study — осы шақ).",
              "2. Басты бөлікте will + етістік болатынын ескеріңіз.",
              "3. will pass таңдаңыз.",
            ],
            ru: [
              "1. Проверьте время в части с If (study — настоящее время).",
              "2. В главной части используйте вспомогательный глагол будущего времени will.",
              "3. Выберите 'will pass'.",
            ],
            en: [
              "1. Check tense after If (study is Present Simple).",
              "2. Use 'will + base verb' in the main clause.",
              "3. Select 'will pass'.",
            ],
          },
          commonTrap: {
            kz: `If сөзінен кейін will қоюға болмайды: "If you will study" — өрескел қате!`,
            ru: `Никогда не ставьте will сразу после If: "If you will study" — типичная грубая ошибка!`,
            en: `Never place 'will' immediately inside the If-clause: "If you will study" is grammatically incorrect!`,
          },
        },
        xpReward: 30,
      };
    }
  } else if (taskType === 3) {
    // 3. Passive Voice
    const rawOptions = [
      { text: "was invented", isCorrect: true },
      { text: "invented", isCorrect: false },
      { text: "is inventing", isCorrect: false },
      { text: "were invented", isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_eng_pass_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Ағылшын тілі", ru: "Английский язык", en: "English" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Ырықсыз етіс (Passive Voice)", ru: "Пассивный залог (Passive Voice)", en: "Passive Voice" },
      subtopic: { kz: "Past Simple Passive", ru: "Past Simple Passive", en: "Past Simple Passive" },
      questionText: {
        kz: `Ырықсыз етістегі дұрыс форманы таңдаңыз: "The telephone _____ by Alexander Graham Bell in 1876."`,
        ru: `Выберите верную форму пассивного залога: "The telephone _____ by Alexander Graham Bell in 1876."`,
        en: `Choose the correct passive voice form: "The telephone _____ by Alexander Graham Bell in 1876."`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: "Subject (The telephone) + was / were + V3 (invented)",
      },
      options,
      hint: {
        kz: `Телефон өзі ойлап таппады, оны ойлап тапты (ырықсыз етіс). Және 1876 жылы (өткен шақ). Телефон жекеше болғандықтан: "was invented".`,
        ru: `Телефон не сам себя изобрел, а был изобретен (пассивный залог). Год 1876 указывает на прошедшее время. Единственное число: "was invented".`,
        en: `The telephone did not invent itself; it was invented (passive voice). The year 1876 specifies past. Singular subject requires "was invented".`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Телефон — іс-әрекеттің объектісі (Passive Voice).`,
          `2-қадам: 1876 жыл — нақты өткен шақ (Past Simple).`,
          `3-қадам: Пассивтің өткен шақ формуласы: was / were + V3.`,
          `4-қадам: "The telephone" — жекеше түр, сондықтан "was invented".`,
          `Жауабы: was invented.`,
        ],
        ru: [
          `Шаг 1: Подлежащее (телефон) испытывает действие на себе -> Пассивный залог.`,
          `Шаг 2: Указан конкретный 1876 год -> Past Simple.`,
          `Шаг 3: Формула Past Simple Passive: was / were + V3.`,
          `Шаг 4: Подлежащее в единственном числе -> "was invented".`,
          `Итог: was invented.`,
        ],
        en: [
          `Step 1: The subject receives the action -> Passive Voice.`,
          `Step 2: Specific past year (1876) -> Past Simple.`,
          `Step 3: Past Simple Passive formula: was/were + V3.`,
          `Step 4: Singular subject takes 'was' -> "was invented".`,
          `Result: was invented.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: "The telephone _____ by Bell in 1876". Мақсаты: Өткен шақтағы ырықсыз етісті құрастыру.`,
          ru: `Дано предложение с исполнителем действия через "by" и годом в прошлом. Цель: Определить форму страдательного залога.`,
          en: `Given sentence with agent introduced by "by" and past year. Goal: Construct correct passive verb form.`,
        },
        ruleOrFormula: {
          kz: `Past Simple Passive: was / were + V3 (Past Participle).`,
          ru: `Формула пассивного залога: to be (в нужном времени) + 3-я форма смыслового глагола (V3 / -ed).`,
          en: `Passive structure: form of 'to be' + Past Participle (V3).`,
        },
        steps: {
          kz: [
            "1. Субъект әрекетті өзі орындай ма, әлде оған жасала ма екенін тексеріңіз (Passive).",
            "2. Уақытты анықтаңыз (in 1876 -> Past Simple).",
            "3. was / were таңдаңыз (The telephone = жекеше = was).",
          ],
          ru: [
            "1. Проверьте субъект: телефон изобретен кем-то (Пассивный залог).",
            "2. Найдите временную отметку (in 1876 = Past Simple).",
            "3. Выберите was для единственного числа (the telephone) и глагол с окончанием -ed.",
          ],
          en: [
            "1. Verify that action is performed on the subject (Passive voice).",
            "2. Identify the time indicator (in 1876 = Past Simple).",
            "3. Match singular 'telephone' with 'was' and past participle 'invented'.",
          ],
        },
        commonTrap: {
          kz: `Қате: Белсенді етісті "invented" қою. Егер "invented" десек, телефон өзі біреуді ойлап тапқан болып шығады!`,
          ru: `Ловушка: Выбрать активную форму "invented". Иначе получится, что сам телефон кого-то изобрёл в 1876 году!`,
          en: `Trap: Choosing active 'invented'. That would imply the telephone performed the inventing!`,
        },
      },
      xpReward: 30,
    };
  } else if (taskType === 4) {
    // 4. Modal Verbs: must, have to, should, mustn't
    const rawOptions = [
      { text: "mustn't", isCorrect: true },
      { text: "don't have to", isCorrect: false },
      { text: "should", isCorrect: false },
      { text: "might", isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_eng_modal_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Ағылшын тілі", ru: "Английский язык", en: "English" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Модальді етістіктер (Modal Verbs)", ru: "Модальные глаголы (Modal Verbs)", en: "Modal Verbs" },
      subtopic: { kz: "Тыйым салу және қажеттілік", ru: "Запрет и отсутствие необходимости", en: "Prohibition & Obligation" },
      questionText: {
        kz: `Контекстке сай модальді етістікті таңдаңыз: "You _____ touch that wire! It's extremely dangerous."`,
        ru: `Вставьте подходящий по смыслу модальный глагол: "You _____ touch that wire! It's extremely dangerous."`,
        en: `Choose the appropriate modal verb: "You _____ touch that wire! It's extremely dangerous."`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: "Prohibition (Тыйым салу / Строгий запрет) = mustn't + V1",
      },
      options,
      hint: {
        kz: `"Қауіпті, тиіспе!" деген қатаң тыйым салу үшін "mustn't" қолданылады. Ал "don't have to" — "тиісуге міндетті емессің, бірақ қаласаң тиісе аласың" дегенді білдіреді.`,
        ru: `Для строгого запрета из соображений опасности используется "mustn't" (нельзя, запрещено!). "Don't have to" означает лишь отсутствие обязательства (необязательно, но можно).`,
        en: `For strict prohibition involving danger, use 'mustn't' (prohibited!). 'Don't have to' merely means lack of obligation.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Сөйлемнің мағынасы: сымды ұстау қауіпті, қатаң тыйым салынған.`,
          `2-қадам: Қатаң тыйым сөзі — "mustn't" (must not).`,
          `3-қадам: "don't have to" қажеттіліктің жоқтығын білдіреді, бірақ тыйым салмайды.`,
          `Жауабы: mustn't.`,
        ],
        ru: [
          `Шаг 1: Анализируем контекст: провод под напряжением, трогать категорически опасно.`,
          `Шаг 2: Категорический запрет ("нельзя!") выражается только через mustn't.`,
          `Шаг 3: don't have to переводится как "нет необходимости" (не подходит по смыслу).`,
          `Итог: mustn't.`,
        ],
        en: [
          `Step 1: Analyze context: high voltage / extreme danger.`,
          `Step 2: Strict prohibition is expressed by 'mustn't'.`,
          `Step 3: 'don't have to' means lack of necessity, not prohibition.`,
          `Result: mustn't.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: "You _____ touch that wire! It's extremely dangerous." Мақсаты: Қатаң тыйым салу модалін таңдау.`,
          ru: `Дана опасная ситуация, требующая запрещающего предписания. Цель: Выбрать глагол строгого запрета.`,
          en: `Given hazardous situation requiring strong warning. Goal: Select correct modal of prohibition.`,
        },
        ruleOrFormula: {
          kz: `mustn't = қатаң тыйым (тыйым салынады). don't have to = міндетті емес.`,
          ru: `mustn't = категорический запрет (нельзя!). don't have to = необязательно делать.`,
          en: `mustn't = absolute prohibition. don't have to = lack of necessity.`,
        },
        steps: {
          kz: [
            "1. Сөйлемдегі ескертуді оқыңыз (extremely dangerous).",
            "2. Бұл қатаң тыйым екенін түсініңіз.",
            "3. mustn't нұсқасын белгілеңіз.",
          ],
          ru: [
            "1. Прочитайте вторую часть: 'It's extremely dangerous' (крайне опасно).",
            "2. Поймите, что речь идет о запрете, угрожающем жизни.",
            "3. Выберите модальный глагол mustn't.",
          ],
          en: [
            "1. Read the warning: 'It's extremely dangerous'.",
            "2. Recognize that life safety rules require strict prohibition.",
            "3. Choose 'mustn't'.",
          ],
        },
        commonTrap: {
          kz: `don't have to мен mustn't шатастыру. "You don't have to touch" = "Ұстамасаң да болады (қаласаң ұста)". Бұл қауіпті жағдайда дұрыс емес!`,
          ru: `Путаница между don't have to и mustn't. "Don't have to" разрешает действие, просто говорит, что это необязательно!`,
          en: `Confusing 'don't have to' with 'mustn't'. 'Don't have to' permits the action as optional!`,
        },
      },
      xpReward: 25,
    };
  } else if (taskType === 5) {
    // 5. Prepositions of time: in / on / at
    const prepItems = [
      { time: "Monday morning", ans: "on", dist: ["at", "in", "by"] },
      { time: "the afternoon", ans: "in", dist: ["at", "on", "to"] },
      { time: "7:30 PM", ans: "at", dist: ["on", "in", "for"] },
      { time: "October", ans: "in", dist: ["on", "at", "with"] },
    ];
    const item = prepItems[randInt(0, prepItems.length - 1)];
    const rawOptions = [
      { text: item.ans, isCorrect: true },
      ...item.dist.map((d) => ({ text: d, isCorrect: false })),
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_eng_prep_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Ағылшын тілі", ru: "Английский язык", en: "English" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Предлогтар (Prepositions)", ru: "Предлоги времени (Prepositions of Time)", en: "Prepositions of Time" },
      subtopic: { kz: "IN / ON / AT қолданылуы", ru: "Правило IN / ON / AT", en: "IN / ON / AT Triangle" },
      questionText: {
        kz: `Уақыт предлогын дұрыс таңдаңыз: "Our math meeting will start _____ ${item.time}."`,
        ru: `Выберите верный предлог времени: "Our math meeting will start _____ ${item.time}."`,
        en: `Select the correct preposition of time: "Our math meeting will start _____ ${item.time}."`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: "AT (нақты уақыт) | ON (күндер/күндер бөлігі) | IN (айлар/жылдар/ғасырлар)",
      },
      options,
      hint: {
        kz: `Ереже: AT — нақты сағатпен (at 5:00). ON — нақты күн немесе апта күнімен (on Monday). IN — айлар, жылдар, ұзақ кезеңдермен (in July, in the morning).`,
        ru: `Правило треугольника: AT — для точного времени (часы), ON — для дней недели и дат, IN — для месяцев, лет и времен суток.`,
        en: `Triangle rule: AT for precise clock time, ON for days and dates, IN for months, years, and long periods.`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Уақыт көрсеткішін талдаймыз: "${item.time}".`,
          `2-қадам: Ереже: ${
            item.ans === "on"
              ? "Апта күндеріне ON предлогы қойылады."
              : item.ans === "at"
              ? "Нақты сағатқа AT предлогы қойылады."
              : "Айларға немесе тәулік мезгілдеріне IN қойылады."
          }`,
          `3-қадам: Дұрыс предлог: "${item.ans}".`,
          `Жауабы: ${item.ans}.`,
        ],
        ru: [
          `Шаг 1: Определяем тип временного выражения: "${item.time}".`,
          `Шаг 2: Вспоминаем правило: ${
            item.ans === "on"
              ? "С днями недели и датами всегда используется ON."
              : item.ans === "at"
              ? "С точным временем на часах используется AT."
              : "С месяцами, годами и частями суток (кроме night) используется IN."
          }`,
          `Шаг 3: Правильный ответ: "${item.ans}".`,
          `Итог: ${item.ans}.`,
        ],
        en: [
          `Step 1: Check time expression: "${item.time}".`,
          `Step 2: Rule application: ${
            item.ans === "on"
              ? "Days of the week take ON."
              : item.ans === "at"
              ? "Exact clock times take AT."
              : "Months, years, and general day parts take IN."
          }`,
          `Step 3: Select "${item.ans}".`,
          `Result: ${item.ans}.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: уақыт сөзі "${item.time}". Мақсаты: сәйкес предлогты таңдау.`,
          ru: `Дано временное выражение "${item.time}". Цель: Выбрать правильный предлог времени.`,
          en: `Given time expression "${item.time}". Goal: Choose matching preposition of time.`,
        },
        ruleOrFormula: {
          kz: `AT (нақты сағат) < ON (күндер) < IN (айлар, жылдар).`,
          ru: `Пирамида предлогов времени: AT (точный момент) -> ON (один день / дата) -> IN (длительный период: месяц, сезон, год).`,
          en: `Time pyramid: AT (point in time) -> ON (day/date) -> IN (wider periods).`,
        },
        steps: {
          kz: [
            "1. Уақыттың көлемін анықтаңыз (сағат па, күн бе, әлде ай ма).",
            "2. Егер сағат болса — AT, егер апта күні/дата болса — ON, егер ай/жыл болса — IN.",
            `3. "${item.ans}" таңдаңыз.`,
          ],
          ru: [
            "1. Оцените масштаб времени: секунды/часы, конкретный день или длинный отрезок?",
            "2. Примените формулу: часы = at, дни/даты = on, месяцы/года = in.",
            `3. Выберите правильный вариант: "${item.ans}".`,
          ],
          en: [
            "1. Determine timeframe scale: point, calendar day, or extended period.",
            "2. Match with at/on/in.",
            `3. Select "${item.ans}".`,
          ],
        },
        commonTrap: {
          kz: `Орыс не қазақ тілінен сөзбе-сөз аудару. Ағылшын тілінде "по понедельникам" — бұл "on Mondays", "in Monday" емес!`,
          ru: `Ловушка: Буквальный перевод с русского. В русском «в понедельник» (предлог в), но по-английски строго "ON Monday", а не "in"!`,
          en: `Trap: Direct native translation. Calendar days always take ON, never IN!`,
        },
      },
      xpReward: 25,
    };
  } else if (taskType === 6) {
    // 6. Reported Speech: Tense Backshift
    const rawOptions = [
      { text: "was working", isCorrect: true },
      { text: "is working", isCorrect: false },
      { text: "has worked", isCorrect: false },
      { text: "will work", isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_eng_reported_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Ағылшын тілі", ru: "Английский язык", en: "English" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Жанама сөз (Reported Speech)", ru: "Косвенная речь (Reported Speech)", en: "Reported Speech" },
      subtopic: { kz: "Шақтардың сәйкесуі (Backshift of Tenses)", ru: "Согласование времен (Present Continuous -> Past Continuous)", en: "Backshift of Tenses" },
      questionText: {
        kz: `Төл сөзді жанама сөзге айналдырыңыз: John said: "I am working on my biology project." ⟹ John said that he _____ on his project.`,
        ru: `Выберите верную глагольную форму в косвенной речи: John said: "I am working on my biology project." ⟹ John said that he _____ on his project.`,
        en: `Choose the correct verb form for indirect speech: John said: "I am working on my biology project." ⟹ John said that he _____ on his project.`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: "Direct: 'am working' (Present Cont.) ⟹ Reported: 'was working' (Past Cont.)",
      },
      options,
      hint: {
        kz: `Егер басты сөйлем өткен шақта (said) тұрса, төл сөздегі Present Continuous (am working) автоматты түрде Past Continuous-ке (was working) ауысады.`,
        ru: `Правило согласования времен: если вводный глагол в прошедшем (said), то Present Continuous ("am working") сдвигается на шаг назад в Past Continuous ("was working").`,
        en: `Backshift rule: When the reporting verb is in the past (said), Present Continuous shifts back to Past Continuous (was working).`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Кіріспе етістік — "said" (өткен шақ).`,
          `2-қадам: Төл сөздегі "am working" (Present Continuous) бір саты артқа жылжиды.`,
          `3-қадам: Ол Past Continuous: "was working" болады.`,
          `Жауабы: was working.`,
        ],
        ru: [
          `Шаг 1: Вводное сказуемое в прошедшем времени: "said".`,
          `Шаг 2: Действие в прямой речи: Present Continuous ("am working").`,
          `Шаг 3: Сдвигаем на одно время назад -> Past Continuous ("was working").`,
          `Итог: was working.`,
        ],
        en: [
          `Step 1: Reporting verb is in past: "said".`,
          `Step 2: Original tense is Present Continuous ("am working").`,
          `Step 3: Backshift yields Past Continuous ("was working").`,
          `Result: was working.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: Төл сөз "am working". Мақсаты: Жанама сөздегі шақты табу.`,
          ru: `Дано предложение в прямой речи с "am working". Цель: Выполнить согласование времени в косвенной речи.`,
          en: `Given direct speech with 'am working'. Goal: Apply tense backshift in reported speech.`,
        },
        ruleOrFormula: {
          kz: `Шақтар сәйкесуі: Present Simple → Past Simple; Present Continuous → Past Continuous.`,
          ru: `Сдвиг времен: Present Simple -> Past Simple; Present Continuous -> Past Continuous; Past Simple -> Past Perfect.`,
          en: `Tense shift: Present Continuous becomes Past Continuous.`,
        },
        steps: {
          kz: ["1. 'said' сөзін көріңіз.", "2. Шақты бір қадам артқа шегеріңіз.", "3. 'was working' таңдаңыз."],
          ru: ["1. Обратите внимание на прошедшее время 'said'.", "2. Сдвиньте Present Continuous в Past Continuous.", "3. Выберите 'was working'."],
          en: ["1. Note past reporting verb 'said'.", "2. Shift Present Continuous to Past Continuous.", "3. Select 'was working'."],
        },
        commonTrap: {
          kz: `Шақты өзгертпей "is working" деп қалдыру!`,
          ru: `Ловушка: Оставить исходное настоящее время "is working". При 'said' сдвиг времени обязателен!`,
          en: `Trap: Keeping 'is working' without shifting tenses.`,
        },
      },
      xpReward: 30,
    };
  } else if (taskType === 7) {
    // 7. Gerund vs Infinitive
    const rawOptions = [
      { text: "studying", isCorrect: true },
      { text: "to study", isCorrect: false },
      { text: "study", isCorrect: false },
      { text: "studied", isCorrect: false },
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_eng_gerund_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Ағылшын тілі", ru: "Английский язык", en: "English" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Герундий және инфинитив (Gerund & Infinitive)", ru: "Герундий и инфинитив (Gerund vs Infinitive)", en: "Gerund vs Infinitive" },
      subtopic: { kz: "Герундийді қажет ететін етістіктер (avoid, enjoy)", ru: "Глаголы с герундием (enjoy, avoid, suggest)", en: "Verbs followed by Gerund" },
      questionText: {
        kz: `Дұрыс форманы таңдаңыз: "She really enjoys _____ biology and chemistry in the laboratory."`,
        ru: `Выберите верную грамматическую форму: "She really enjoys _____ biology and chemistry in the laboratory."`,
        en: `Choose the correct form: "She really enjoys _____ biology and chemistry in the laboratory."`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: "enjoy / avoid / suggest / keep + Verb-ing (Gerund)",
      },
      options,
      hint: {
        kz: `"enjoy", "avoid", "suggest", "mind" сияқты етістіктерден кейін тек герундий (-ing) қолданылады.`,
        ru: `После глаголов предпочтения и процессов (enjoy, avoid, practice, mind, suggest) используется герундий (глагол с окончанием -ing).`,
        en: `Verbs like 'enjoy', 'avoid', 'suggest', 'mind' are strictly followed by a gerund (V-ing).`,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Сөйлемдегі негізгі етістік — "enjoys".`,
          `2-қадам: Ереже: enjoy + V-ing (герундий).`,
          `3-қадам: Дұрыс жауап: "studying".`,
          `Жауабы: studying.`,
        ],
        ru: [
          `Шаг 1: Находим глагол-триггер: "enjoys".`,
          `Шаг 2: Правило: enjoy требует после себя герундий (V-ing).`,
          `Шаг 3: Выбираем "studying".`,
          `Итог: studying.`,
        ],
        en: [
          `Step 1: Identify trigger verb: 'enjoys'.`,
          `Step 2: Rule: 'enjoy' takes the gerund form (V-ing).`,
          `Step 3: Select 'studying'.`,
          `Result: studying.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: "enjoys _____". Мақсаты: Герундий немесе инфинитивті анықтау.`,
          ru: `Дано сочетание с глаголом enjoy. Цель: Выбрать между инфинитивом и герундием.`,
          en: `Given sentence with 'enjoy'. Goal: Choose between gerund and infinitive.`,
        },
        ruleOrFormula: {
          kz: `enjoy + V-ing; decide + to V.`,
          ru: `Формула: enjoy / avoid / finish + V-ing. Decide / promise / hope + to V.`,
          en: `Rule: enjoy + V-ing.`,
        },
        steps: {
          kz: ["1. 'enjoy' етістігін көріңіз.", "2. -ing жалғауы бар форманы таңдаңыз."],
          ru: ["1. Найдите управляющий глагол 'enjoy'.", "2. Вспомните, что он требует окончания -ing.", "3. Выберите 'studying'."],
          en: ["1. Recognize trigger verb 'enjoy'.", "2. Select -ing form."],
        },
        commonTrap: {
          kz: `Қате: Инфинитив "to study" қою!`,
          ru: `Ловушка: Выбрать инфинитив "to study". С enjoy инфинитив никогда не используется!`,
          en: `Trap: Choosing infinitive 'to study' which is incorrect after enjoy.`,
        },
      },
      xpReward: 25,
    };
  } else {
    // 8. Phrasal Verbs in Context
    const phrasalItems = [
      {
        question: "Don't _____ now! You are so close to solving this complex physics problem.",
        ans: "give up",
        formula: "give up = тоқтату, берілу / сдаваться, бросать",
        dist: ["look after", "run into", "turn on"],
        explanation: {
          kz: "«give up» фразалық етістігі «берілу, тастап кету» дегенді білдіреді.",
          ru: "Фразовый глагол «give up» означает «сдаваться, опускать руки».",
          en: "The phrasal verb 'give up' means to quit or surrender.",
        },
      },
      {
        question: "Could you please _____ my pet while I am at school?",
        ans: "look after",
        formula: "look after = қарау, қамқор болу / присматривать, заботиться",
        dist: ["give away", "take off", "look for"],
        explanation: {
          kz: "«look after» — біреуге қарау, қамқорлық жасау деген мағына береді.",
          ru: "Фразовый глагол «look after» переводится как «присматривать, заботиться».",
          en: "The phrasal verb 'look after' means to take care of someone or something.",
        },
      },
    ];

    const item = phrasalItems[randInt(0, phrasalItems.length - 1)];
    const rawOptions = [
      { text: item.ans, isCorrect: true },
      ...item.dist.map((d) => ({ text: d, isCorrect: false })),
    ];
    const shuffled = shuffle(rawOptions);
    const options = shuffled.map((opt, idx) => ({
      id: ["A", "B", "C", "D"][idx],
      text: opt.text,
      isCorrect: opt.isCorrect,
    }));

    return {
      id: `gen_eng_phrasal_${Date.now()}_${randInt(100, 999)}`,
      subject: { kz: "Ағылшын тілі", ru: "Английский язык", en: "English" },
      grade: { kz: `${grade}-сынып`, ru: `${grade} класс`, en: `Grade ${grade}` },
      topic: { kz: "Фразалық етістіктер (Phrasal Verbs)", ru: "Фразовые глаголы (Phrasal Verbs)", en: "Phrasal Verbs" },
      subtopic: { kz: "Контекстік қолданыс", ru: "Фразовые глаголы в контексте", en: "Phrasal Verbs in Context" },
      questionText: {
        kz: `Контекстке сай фразалық етістікті таңдаңыз: "${item.question}"`,
        ru: `Вставьте подходящий по смыслу фразовый глагол: "${item.question}"`,
        en: `Select the fitting phrasal verb for this context: "${item.question}"`,
      },
      formulaDisplay: {
        type: "expression",
        expressionText: item.formula,
      },
      options,
      hint: {
        kz: item.explanation.kz,
        ru: item.explanation.ru,
        en: item.explanation.en,
      },
      stepByStepSolution: {
        kz: [
          `1-қадам: Сөйлемнің контексін талдаңыз.`,
          `2-қадам: Дұрыс мағына беретін фразалық етістік: "${item.ans}".`,
          `Жауабы: ${item.ans}.`,
        ],
        ru: [
          `Шаг 1: Проанализируйте смысловой контекст предложения.`,
          `Шаг 2: Подходящий по значению фразовый глагол: "${item.ans}".`,
          `Итог: ${item.ans}.`,
        ],
        en: [
          `Step 1: Analyze context of the sentence.`,
          `Step 2: Correct matching phrasal verb is "${item.ans}".`,
          `Result: ${item.ans}.`,
        ],
      },
      howToSolveGuide: {
        givenAndGoal: {
          kz: `Берілгені: Сөйлем контексі. Мақсаты: Дұрыс фразалық етістікті табу.`,
          ru: `Дано предложение с пропуском. Цель: Выбрать подходящий фразовый глагол.`,
          en: `Given sentence gap. Goal: Select correct phrasal verb.`,
        },
        ruleOrFormula: {
          kz: `Фразалық етістік мағынасы предлогқа тікелей байланысты.`,
          ru: `Значение фразового глагола определяется комбинацией глагола и предлога.`,
          en: `Phrasal verb meaning is determined by particle/preposition.`,
        },
        steps: {
          kz: ["1. Контексті түсініңіз.", "2. Мағынасы сай етістікті таңдаңыз."],
          ru: ["1. Переведите предложение.", "2. Выберите глагол с подходящим значением."],
          en: ["1. Read context.", "2. Select matching phrasal verb."],
        },
        commonTrap: {
          kz: `Тек негізгі етістіктің тура мағынасына сүйену (give = беру деп қана түсіну).`,
          ru: `Ловушка: Переводить глагол буквально без учета предлога (give = дать, но give up = сдаться).`,
          en: `Trap: Translating bare verb without preposition context.`,
        },
      },
      xpReward: 30,
    };
  }
}

