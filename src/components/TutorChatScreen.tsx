import React, { useState, useRef, useEffect } from "react";
import { Language, CognitiveStyle, ChatMessage } from "../types";
import { translations } from "../i18n/translations";
import { generateRandomQuestion } from "../utils/taskGenerator";
import { getInitialChatMessages } from "../data/tutorChatScenarios";

interface TutorChatScreenProps {
  language: Language;
  cognitiveStyle: CognitiveStyle;
  onChangeStyle: (style: CognitiveStyle) => void;
  onAddXP: (amount: number) => void;
  socraticLevel: number;
  initialPrompt?: string;
  initialSubject?: string;
}

export const TutorChatScreen: React.FC<TutorChatScreenProps> = ({
  language,
  cognitiveStyle,
  onChangeStyle,
  onAddXP,
  socraticLevel,
  initialPrompt,
  initialSubject,
}) => {
  const t = translations[language].chat;

  const [subject, setSubject] = useState<string>(initialSubject || "algebra");
  const [chatGrade, setChatGrade] = useState<number>(9);
  const [inputText, setInputText] = useState(initialPrompt || "");
  const usedTaskIdsRef = useRef<string[]>([]);

  // Initial chat messages tailored to subject and language
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    getInitialChatMessages(initialSubject || "algebra", language)
  );

  useEffect(() => {
    if (initialSubject) {
      setSubject(initialSubject);
      setMessages(getInitialChatMessages(initialSubject, language));
    }
  }, [initialSubject, language]);

  useEffect(() => {
    if (initialPrompt) {
      setInputText(initialPrompt);
    }
  }, [initialPrompt]);
  const [isTyping, setIsTyping] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<
    Record<string, { selectedOption: string; isCorrect: boolean; showSolution: boolean }>
  >({});
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [formulaModalOpen, setFormulaModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update messages when language changes (if user hasn't had a long conversation yet)
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 2) {
        return getInitialChatMessages(subject, language);
      }
      return prev;
    });
  }, [language, subject]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const normalizeSubjKey = (subjType: string): string => {
    const norm = (subjType || "").toLowerCase().trim();
    if (norm.includes("bio") || norm.includes("биолог")) return "biology";
    if (norm.includes("eng") || norm.includes("англ") || norm.includes("ағылш")) return "english";
    if (norm.includes("chem") || norm.includes("хим")) return "chemistry";
    if (norm.includes("cs") || norm.includes("информ") || norm.includes("компьют")) return "cs";
    if (norm.includes("phys") || norm.includes("физик")) return "physics";
    if (norm.includes("geom") || norm.includes("геомет")) return "geometry";
    return "math";
  };

  const createTrainerTaskMessage = (gradeNum: number, subjType: string): ChatMessage => {
    const subjKey = normalizeSubjKey(subjType);
    const q = generateRandomQuestion(subjKey, gradeNum, usedTaskIdsRef.current);
    usedTaskIdsRef.current = [...usedTaskIdsRef.current.slice(-15), q.id];

    const formulaStr = q.formulaDisplay?.expressionText || (
      q.formulaDisplay?.numeratorLeft
        ? `${q.formulaDisplay.numeratorLeft}/${q.formulaDisplay.denominatorLeft} = ${q.formulaDisplay.numeratorRight}/${q.formulaDisplay.denominatorRight}`
        : undefined
    );

    const intros = {
      kz: `Міне, ${q.grade.kz} бойынша «${q.topic.kz}» тақырыбындағы жаттығу есебі! Мұқият есептеп, дұрыс жауабын таңда:`,
      ru: `Держи тренировочную задачу по теме «${q.topic.ru}» (${q.grade.ru})! Попробуй решить её и проверить себя:`,
      en: `Here is a practice trainer task on "${q.topic.en}" (${q.grade.en})! Solve it and select the right option:`,
    };

    return {
      id: `trainer_msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      sender: "tutor",
      text: intros[language] || intros.ru,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      modeBadge: `🎯 Тренажёр • ${q.grade[language]}`,
      quizChallenge: {
        id: `quiz_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        question: q.questionText[language],
        formula: formulaStr,
        options: q.options.map((opt) => ({
          id: opt.id,
          text: opt.text,
          correct: opt.isCorrect,
        })),
        stepByStepSolution: q.stepByStepSolution[language],
        grade: q.grade[language],
        subject: q.subject[language],
        topic: q.topic[language],
        xpReward: q.xpReward || 20,
      },
    };
  };

  const handleSendTrainerTask = (targetGrade?: number, targetSubj?: string) => {
    const gr = targetGrade || chatGrade;
    const sub = targetSubj || subject;

    const userText =
      language === "kz"
        ? `Маған ${gr}-сынып бойынша жаттығу есебін берші`
        : language === "en"
        ? `Give me a trainer task for Grade ${gr}`
        : `Дай мне задачу-тренажёр для ${gr} класса`;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const tutorMsg = createTrainerTaskMessage(gr, sub);
    setMessages((prev) => [...prev, userMsg, tutorMsg]);
    setTimeout(scrollToBottom, 80);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const wantsTask = /(задач|есеп|quiz|тренажер|тест|task|problem|пример|проверь|порешаем)/i.test(query);

    let taskGrade = chatGrade;
    if (/11/i.test(query)) taskGrade = 11;
    else if (/10/i.test(query)) taskGrade = 10;
    else if (/8/i.test(query)) taskGrade = 8;
    else if (/7/i.test(query)) taskGrade = 7;

    let taskSubj = subject;
    if (/биолог|клетк|фотосинтез|днк|генет/i.test(query)) taskSubj = "biology";
    else if (/англ|english|present|past|conditional|preposition/i.test(query)) taskSubj = "english";
    else if (/хим|кислот|оксид|реакци/i.test(query)) taskSubj = "chemistry";
    else if (/информ|двоичн|программ|python|код|cs/i.test(query)) taskSubj = "cs";
    else if (/геомет|треугольн|гипотенуз|пифагор/i.test(query)) taskSubj = "geometry";
    else if (/физик|ньютон|скорост|ускорен|сила/i.test(query)) taskSubj = "physics";
    else if (/алгебр|уравнен|дроб|дискриминант/i.test(query)) taskSubj = "algebra";

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    const subjMap: Record<string, string> = {
      algebra: "Алгебра",
      geometry: "Геометрия",
      physics: "Физика",
      biology: "Биология",
      english: "Английский язык",
      chemistry: "Химия",
      cs: "Информатика",
    };
    const apiSubject = subjMap[normalizeSubjKey(taskSubj)] || "Алгебра";

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          language,
          subject: apiSubject,
          grade: `${taskGrade} класс`,
          style: cognitiveStyle,
          socraticLevel,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed response");
      }

      const data = await res.json();
      const tutorReplyText = data.reply;

      let attachedQuiz = undefined;
      if (wantsTask) {
        const dummyMsg = createTrainerTaskMessage(taskGrade, taskSubj);
        attachedQuiz = dummyMsg.quizChallenge;
      }

      const tutorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "tutor",
        text: tutorReplyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modeBadge:
          cognitiveStyle === "analogy"
            ? "Режим: Аналогии 🍕"
            : cognitiveStyle === "algorithm"
            ? "Режим: Алгоритм 🪜"
            : "Режим: Блиц ⚡",
        quizChallenge: attachedQuiz,
        isAiGenerated: true,
      };

      setMessages((prev) => [...prev, tutorMsg]);
      onAddXP(10);
    } catch (e) {
      console.error(e);
      if (wantsTask) {
        const tutorMsg = createTrainerTaskMessage(taskGrade, taskSubj);
        setMessages((prev) => [...prev, tutorMsg]);
      } else {
        const normKey = normalizeSubjKey(taskSubj);
        let fallbackReply = "";
        if (normKey === "biology") {
          fallbackReply =
            language === "kz"
              ? "Биология бойынша тамаша сұрақ! Хлоропласттар мен митохондриялар жасушаның басты қуат көздері болып табылады. Тағы бір мысалды талдағың келе ме?"
              : language === "en"
              ? "Great biology question! Chloroplasts and mitochondria are the key powerhouses of the cell. Would you like to explore another example?"
              : "Отличный вопрос по биологии! Хлоропласты и митохондрии — главные энергетические станции живой клетки. Хочешь разобрать ещё один пример?";
        } else if (normKey === "english") {
          fallbackReply =
            language === "kz"
              ? "Ағылшын грамматикасы бойынша керемет сұрақ! Шақтарды салыстыру кезінде уақыт маркерлеріне ('since', 'yesterday', 'already') мән берген жөн."
              : language === "en"
              ? "Great English grammar question! Always pay attention to time markers like 'since', 'yesterday', or 'already'."
              : "Отличный вопрос по английской грамматике! Всегда обращай внимание на маркеры времени («since», «yesterday», «already»).";
        } else {
          fallbackReply =
            language === "kz"
              ? "Бұл тамаша сұрақ! Бөлшектердің ортақ бөлімін табу үшін ең кіші ортақ еселікті (ЕКОЕ) табамыз. Сұрағыңызды тереңірек талдағыңыз келе ме?"
              : language === "en"
              ? "Great question! Finding a common denominator requires the Least Common Multiple (LCM). Would you like to see another step-by-step example?"
              : "Отличный вопрос! Чтобы сложить эти дроби, сначала приводим их к наименьшему общему кратному (НОК). Хочешь разобрать ещё один похожий пример?";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "tutor",
            text: fallbackReply,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuizSelect = (quizId: string, optId: string, isCorrect: boolean, xp: number = 15) => {
    if (quizAnswers[quizId]) return;
    setQuizAnswers((prev) => ({
      ...prev,
      [quizId]: {
        selectedOption: optId,
        isCorrect,
        showSolution: false,
      },
    }));
    if (isCorrect) {
      onAddXP(xp);
    }
  };

  const toggleQuizSolution = (quizId: string) => {
    setQuizAnswers((prev) => {
      const cur = prev[quizId];
      if (!cur) return prev;
      return {
        ...prev,
        [quizId]: {
          ...cur,
          showSolution: !cur.showSolution,
        },
      };
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] pb-18 max-w-md mx-auto bg-[#faf8ff]">
      {/* Top Bar for Chat */}
      <div className="flex flex-col border-b border-[#c3c6d7]/30 bg-white px-4 py-2.5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#004ac6] to-[#712ae2] text-white shadow-md font-bold">
                <span className="material-symbols-outlined text-[22px]">smart_toy</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-[#131b2e] leading-none">
                  {t.tutorName}
                </h3>
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-[#2563eb] text-white rounded">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500"></span>
                <span>{t.onlineStatus}</span>
              </p>
            </div>
          </div>

          {/* Subject Dropdown Pill & Direct Trainer Trigger */}
          <div className="flex items-center gap-1.5">
            <select
              value={subject}
              onChange={(e) => {
                const newSubj = e.target.value;
                setSubject(newSubj);
                setMessages(getInitialChatMessages(newSubj, language));
              }}
              className="text-[11px] font-semibold bg-[#eaedff] text-[#004ac6] border border-[#c3c6d7]/40 rounded-xl px-2 py-1 outline-none cursor-pointer"
            >
              <option value="algebra">📐 {language === "kz" ? "Алгебра" : language === "en" ? "Algebra" : "Алгебра"}</option>
              <option value="geometry">📏 {language === "kz" ? "Геометрия" : language === "en" ? "Geometry" : "Геометрия"}</option>
              <option value="physics">⚡ {language === "kz" ? "Физика" : language === "en" ? "Physics" : "Физика"}</option>
              <option value="biology">🧬 {language === "kz" ? "Биология" : language === "en" ? "Biology" : "Биология"}</option>
              <option value="english">🇬🇧 {language === "kz" ? "Ағылшын тілі" : language === "en" ? "English" : "Английский"}</option>
              <option value="chemistry">🧪 {language === "kz" ? "Химия" : language === "en" ? "Chemistry" : "Химия"}</option>
              <option value="cs">💻 {language === "kz" ? "Информатика" : language === "en" ? "Informatics" : "Информатика"}</option>
            </select>

            <button
              onClick={() => handleSendTrainerTask()}
              title={language === "kz" ? "Жаттығу есебін алу" : language === "en" ? "Get practice task" : "Получить задачу-тренажёр"}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white text-[11px] font-bold shadow-2xs hover:opacity-95 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">sports_score</span>
              <span className="hidden sm:inline">
                {language === "kz" ? "Тренажер" : language === "en" ? "Trainer" : "Тренажёр"}
              </span>
            </button>
          </div>
        </div>

        {/* Grade Selector & Cognitive Style Row */}
        <div className="mt-2 pt-2 border-t border-[#c3c6d7]/20 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1 text-[#434655] font-semibold">
              <span className="material-symbols-outlined text-[13px] text-[#004ac6]">school</span>
              <span>{language === "kz" ? "Сынып деңгейі:" : language === "en" ? "Grade level:" : "Класс:"}</span>
            </div>
            <div className="flex items-center gap-1 bg-[#eaedff]/70 p-0.5 rounded-lg">
              {[7, 8, 9, 10, 11].map((gr) => (
                <button
                  key={gr}
                  onClick={() => setChatGrade(gr)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                    chatGrade === gr
                      ? "bg-[#004ac6] text-white shadow-2xs"
                      : "text-[#434655] hover:text-[#131b2e]"
                  }`}
                >
                  {gr}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#737686] font-semibold mt-0.5">
            <span>{t.explanationStyleTitle}</span>
            <span className="text-[#004ac6]">{t.adaptiveNote}</span>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-[#eaedff]/60 p-1 rounded-xl">
            <button
              onClick={() => onChangeStyle("analogy")}
              className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition-all text-center truncate ${
                cognitiveStyle === "analogy"
                  ? "bg-white text-[#004ac6] shadow-xs"
                  : "text-[#434655] hover:text-[#131b2e]"
              }`}
            >
              {t.styles.analogy}
            </button>
            <button
              onClick={() => onChangeStyle("algorithm")}
              className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition-all text-center truncate ${
                cognitiveStyle === "algorithm"
                  ? "bg-white text-[#004ac6] shadow-xs"
                  : "text-[#434655] hover:text-[#131b2e]"
              }`}
            >
              {t.styles.algorithm}
            </button>
            <button
              onClick={() => onChangeStyle("blitz")}
              className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition-all text-center truncate ${
                cognitiveStyle === "blitz"
                  ? "bg-white text-[#004ac6] shadow-xs"
                  : "text-[#434655] hover:text-[#131b2e]"
              }`}
            >
              {t.styles.theory}
            </button>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 no-scrollbar">
        <div className="text-center">
          <span className="px-3 py-1 rounded-full bg-[#eaedff] text-[10px] font-semibold text-[#737686]">
            {t.todayTime}
          </span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <span className="text-[10px] font-bold text-[#737686]">
                  {isUser ? t.studentLabel : t.tutorName}
                </span>
                {msg.modeBadge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#dbe1ff] text-[#004ac6] rounded-full">
                    {msg.modeBadge}
                  </span>
                )}
                <span className="text-[9px] text-[#a4a7b5]">{msg.time}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[90%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs ${
                  isUser
                    ? "bg-[#004ac6] text-white rounded-tr-none font-medium"
                    : "bg-white text-[#131b2e] rounded-tl-none border border-[#c3c6d7]/30"
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Rich Analogy Warning Box */}
                {msg.analogyBox && (
                  <div className="mt-3 flex flex-col gap-2.5">
                    {msg.analogyBox.warning && (
                      <div className="rounded-xl bg-[#fff0ee] p-2.5 text-[#ba1a1a] border border-[#ffdad6] text-[11px] font-medium leading-snug">
                        {msg.analogyBox.warning}
                      </div>
                    )}

                    {/* Denominator Magic Breakdown */}
                    <div className="rounded-xl bg-[#eaedff] p-3 border border-[#c3c6d7]/40">
                      <h4 className="font-bold text-[11px] text-[#004ac6] mb-1.5">
                        {msg.analogyBox.title}
                      </h4>
                      <p className="text-[11px] text-[#434655] mb-2">
                        {msg.analogyBox.description || t.magicDenomDesc}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mb-2 text-center">
                        <div className="bg-white p-2 rounded-lg border border-[#c3c6d7]/30">
                          <span className="text-[10px] text-[#737686] block">{msg.analogyBox.leftLabel}</span>
                          <span className="text-sm font-extrabold text-[#004ac6]">{msg.analogyBox.leftValue}</span>
                          <span className="text-[9px] text-[#737686] block mt-0.5">{msg.analogyBox.leftNote}</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-[#c3c6d7]/30">
                          <span className="text-[10px] text-[#737686] block">{msg.analogyBox.rightLabel}</span>
                          <span className="text-sm font-extrabold text-[#004ac6]">{msg.analogyBox.rightValue}</span>
                          <span className="text-[9px] text-[#737686] block mt-0.5">{msg.analogyBox.rightNote}</span>
                        </div>
                      </div>

                      <div className="bg-[#2563eb] text-white p-2 rounded-lg text-center font-bold text-[11px]">
                        {msg.analogyBox.result}
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Quiz Mini-Trainer */}
                {msg.quizChallenge && (() => {
                  const quiz = msg.quizChallenge;
                  const ans = quizAnswers[quiz.id];
                  const isAnswered = !!ans;

                  return (
                    <div className="mt-3 rounded-2xl bg-gradient-to-br from-[#f8f9ff] via-[#f0f3ff] to-[#e6ecff] p-3.5 border border-[#004ac6]/20 shadow-xs">
                      {/* Header Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#004ac6] bg-[#004ac6]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">sports_score</span>
                            <span>{quiz.grade || `${chatGrade} кл`}</span>
                          </span>
                          {quiz.topic && (
                            <span className="text-[10px] font-bold text-[#434655] truncate max-w-[140px]">
                              {quiz.topic}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                          +{quiz.xpReward || 20} XP
                        </span>
                      </div>

                      {/* Formula Callout if available */}
                      {quiz.formula && (
                        <div className="mb-2 py-1 px-3 rounded-xl bg-white border border-[#004ac6]/25 font-mono text-center font-bold text-xs text-[#004ac6] tracking-wider shadow-2xs">
                          {quiz.formula}
                        </div>
                      )}

                      {/* Question Text */}
                      <p className="text-xs font-bold text-[#131b2e] leading-snug mb-2.5">
                        {quiz.question}
                      </p>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {quiz.options.map((opt) => {
                          const isChosen = ans?.selectedOption === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              disabled={isAnswered}
                              onClick={() => handleQuizSelect(quiz.id, opt.id, !!opt.correct, quiz.xpReward)}
                              className={`p-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between border transition-all cursor-pointer ${
                                isAnswered
                                  ? opt.correct
                                    ? "bg-emerald-500 text-white border-emerald-600 shadow-xs"
                                    : isChosen
                                    ? "bg-red-500 text-white border-red-600"
                                    : "bg-white text-[#737686] border-[#c3c6d7]/30 opacity-70"
                                  : "bg-white text-[#131b2e] border-[#c3c6d7]/50 hover:bg-[#eaedff] active:scale-98 shadow-2xs"
                              }`}
                            >
                              <span>{opt.text}</span>
                              {isAnswered && opt.correct && (
                                <span className="material-symbols-outlined text-[16px] text-white">check_circle</span>
                              )}
                              {isAnswered && isChosen && !opt.correct && (
                                <span className="material-symbols-outlined text-[16px] text-white">cancel</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback & Actions when answered */}
                      {ans && (
                        <div className="mt-2.5 space-y-2">
                          <div
                            className={`p-2 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5 ${
                              ans.isCorrect
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-red-100 text-red-800 border border-red-300"
                            }`}
                          >
                            <span>
                              {ans.isCorrect
                                ? language === "kz"
                                  ? `🎉 Керемет! Дұрыс жауап! (+${quiz.xpReward || 20} XP)`
                                  : language === "en"
                                  ? `🎉 Excellent! Correct answer! (+${quiz.xpReward || 20} XP)`
                                  : `🎉 Отлично! Верно! (+${quiz.xpReward || 20} XP)`
                                : language === "kz"
                                ? "❌ Қате. Дұрыс жауап жасыл түспен белгіленген."
                                : language === "en"
                                ? "❌ Incorrect. The correct option is highlighted in green."
                                : "❌ Не совсем так. Правильный вариант подсвечен зелёным."}
                            </span>
                          </div>

                          {/* Step-by-Step Solution Accordion */}
                          {quiz.stepByStepSolution && quiz.stepByStepSolution.length > 0 && (
                            <div className="border border-[#c3c6d7]/40 rounded-xl overflow-hidden bg-white">
                              <button
                                type="button"
                                onClick={() => toggleQuizSolution(quiz.id)}
                                className="w-full px-3 py-1.5 bg-[#eaedff]/60 hover:bg-[#eaedff] flex items-center justify-between text-[11px] font-bold text-[#004ac6] transition-colors"
                              >
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px]">menu_book</span>
                                  <span>
                                    {language === "kz" ? "Шешу жолы (қадам-қадам)" : language === "en" ? "Step-by-step solution" : "Пошаговое решение"}
                                  </span>
                                </span>
                                <span className="material-symbols-outlined text-[16px]">
                                  {ans.showSolution ? "expand_less" : "expand_more"}
                                </span>
                              </button>
                              {ans.showSolution && (
                                <div className="p-2.5 space-y-1.5 text-xs text-[#131b2e] bg-white border-t border-[#c3c6d7]/30">
                                  {quiz.stepByStepSolution.map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-1.5">
                                      <span className="size-4 shrink-0 rounded-full bg-[#004ac6] text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                                        {idx + 1}
                                      </span>
                                      <span className="leading-snug">{step}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Next task button */}
                          <button
                            type="button"
                            onClick={() => handleSendTrainerTask()}
                            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white text-xs font-bold shadow-xs hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                            <span>
                              {language === "kz"
                                ? "Келесі жаттығу есебі 🎯"
                                : language === "en"
                                ? "Next Trainer Task 🎯"
                                : "Следующая задача-тренажёр 🎯"}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#004ac6] bg-white p-2.5 rounded-xl border border-[#c3c6d7]/30 w-fit">
            <span className="size-2 rounded-full bg-[#004ac6] animate-pulse"></span>
            <span className="font-semibold">{t.aiThinking}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Follow-up Quick Chips */}
      <div className="px-4 py-1.5 bg-[#faf8ff] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {/* Fast Trainer Task Button */}
        <button
          onClick={() => handleSendTrainerTask(chatGrade, subject)}
          className="whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-[11px] font-bold text-white shadow-xs hover:opacity-95 transition-all flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[13px]">sports_score</span>
          <span>
            {language === "kz" ? "🎯 Жаттығу есебі" : language === "en" ? "🎯 Practice Task" : "🎯 Задача-тренажёр"}
          </span>
        </button>

        {/* Dynamic Chips based on active subject */}
        {(() => {
          const norm = normalizeSubjKey(subject);
          if (norm === "biology") {
            return (
              <>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Фотосинтездің жарық пен қараңғы сатыларын қарапайым мысалмен түсіндірші" : language === "en" ? "Explain the light and dark reactions of photosynthesis simply" : "Объясни световую и темновую фазу фотосинтеза простыми словами")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>🌿</span>
                  <span>{language === "kz" ? "Фотосинтез" : language === "en" ? "Photosynthesis" : "Фотосинтез"}</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Митохондрия мен рибосоманың айырмашылығы қандай?" : language === "en" ? "What is the difference between mitochondria and ribosomes?" : "В чем разница между митохондрией и рибосомой?")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-purple-50 text-[11px] font-bold text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>⚡</span>
                  <span>{language === "kz" ? "Митохондрия" : language === "en" ? "Mitochondria" : "Митохондрия"}</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "ДНК құрылысы және азотты негіздердің комплементарлығы (А-Т, Г-Ц)" : language === "en" ? "Explain DNA structure and complementary base pairs" : "Строение ДНК и комплементарность оснований (А-Т, Г-Ц)")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-blue-50 text-[11px] font-bold text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>🧬</span>
                  <span>{language === "kz" ? "ДНК құрылысы" : language === "en" ? "DNA structure" : "ДНК и репликация"}</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Мендельдің бірінші заңы туралы түсіндіріп бер" : language === "en" ? "Explain Mendel first law of genetics" : "Первый закон Менделя в генетике")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-amber-50 text-[11px] font-bold text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>🧪</span>
                  <span>{language === "kz" ? "Генетика" : language === "en" ? "Genetics" : "Генетика"}</span>
                </button>
              </>
            );
          }
          if (norm === "english") {
            return (
              <>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Present Perfect пен Past Simple шақтарының айырмашылығын түсіндірші" : language === "en" ? "Explain Present Perfect vs Past Simple with examples" : "Объясни Present Perfect vs Past Simple с примерами")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-indigo-50 text-[11px] font-bold text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>🇬🇧</span>
                  <span>Present Perfect vs Past</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Passive Voice қалай құрастырылады және қашан қолданылады?" : language === "en" ? "How to form and use Passive Voice in English" : "Как образуется Passive Voice в английском?")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-purple-50 text-[11px] font-bold text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>🔄</span>
                  <span>Passive Voice</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Ең жиі қолданылатын 5 фразалық етістік және мысалдары" : language === "en" ? "Top 5 essential phrasal verbs with examples" : "Топ-5 полезных фразовых глаголов с примерами")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>🧩</span>
                  <span>Phrasal Verbs</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Conditionals (1 және 2 шартты сөйлемдер) айырмашылығы" : language === "en" ? "First vs Second Conditionals comparison" : "First vs Second Conditionals (условные предложения)")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-amber-50 text-[11px] font-bold text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>💡</span>
                  <span>Conditionals</span>
                </button>
              </>
            );
          }
          if (norm === "chemistry") {
            return (
              <>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Химиялық теңдеулерді коэффициенттермен қалай теңестіреміз?" : language === "en" ? "How to balance chemical equations with coefficients" : "Как расставлять коэффициенты в химических реакциях?")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-cyan-50 text-[11px] font-bold text-cyan-700 border border-cyan-200 hover:bg-cyan-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>⚖️</span>
                  <span>{language === "kz" ? "Теңдеу теңестіру" : language === "en" ? "Balance Equations" : "Коэффициенты"}</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Оксидтер, қышқылдар және тұздардың айырмашылығы" : language === "en" ? "Oxides, acids, bases, and salts" : "Оксиды, кислоты, основания и соли")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-rose-50 text-[11px] font-bold text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>🧪</span>
                  <span>{language === "kz" ? "Бейорганикалық заттар" : language === "en" ? "Compounds" : "Классы соединений"}</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Молярлық массаны (M) периодтық жүйе арқылы қалай табады?" : language === "en" ? "How to calculate molar mass using periodic table" : "Как рассчитывать молярную массу соединений?")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-amber-50 text-[11px] font-bold text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>⚛️</span>
                  <span>{language === "kz" ? "Молярлық масса" : language === "en" ? "Molar Mass" : "Молярная масса"}</span>
                </button>
              </>
            );
          }
          if (norm === "cs") {
            return (
              <>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Сандарды екілік санау жүйесінен ондыққа қалай аударады?" : language === "en" ? "How to convert binary numbers to decimal" : "Как переводить двоичные числа в десятичные?")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-blue-50 text-[11px] font-bold text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>💻</span>
                  <span>{language === "kz" ? "Екілік жүйе" : language === "en" ? "Binary System" : "Двоичная система"}</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Python тіліндегі for және while циклдері қалай жұмыс істейді?" : language === "en" ? "How for and while loops work in Python" : "Как работают циклы for и while в Python?")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>🐍</span>
                  <span>Python Циклы</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Ақпарат өлшем бірліктері: 1 Кбайт, 1 Мбайт, 1 Гбайт" : language === "en" ? "Units of information: bytes, KB, MB, GB" : "Единицы информации: байты, КБ, МБ, ГБ")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-violet-50 text-[11px] font-bold text-violet-700 border border-violet-200 hover:bg-violet-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>📦</span>
                  <span>{language === "kz" ? "Кбайт және Мбайт" : language === "en" ? "KB & MB" : "КБ и МБ"}</span>
                </button>
              </>
            );
          }
          if (norm === "physics") {
            return (
              <>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Ньютонның екінші заңын (F = ma) өмірлік мысалмен түсіндір" : language === "en" ? "Explain Newton's second law F = ma with everyday examples" : "Объясни второй закон Ньютона (F = ma) на жизненном примере")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-blue-50 text-[11px] font-bold text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>⚡</span>
                  <span>F = ma</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Жылдамдық пен үдеудің айырмашылығы неде?" : language === "en" ? "Difference between velocity and acceleration" : "В чем разница между скоростью и ускорением?")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>🏎️</span>
                  <span>{language === "kz" ? "Үдеу және жылдамдық" : language === "en" ? "Acceleration" : "Скорость и ускорение"}</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Кинетикалық және потенциалдық энергия формулалары" : language === "en" ? "Kinetic and potential energy formulas" : "Кинетическая и потенциальная энергия")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-amber-50 text-[11px] font-bold text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>🔋</span>
                  <span>{language === "kz" ? "Энергия" : language === "en" ? "Energy" : "Энергия"}</span>
                </button>
              </>
            );
          }
          if (norm === "geometry") {
            return (
              <>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Пифагор теоремасын (a² + b² = c²) қалай оңай есте сақтап, қолдануға болады?" : language === "en" ? "How to understand and use Pythagorean theorem" : "Как применять теорему Пифагора (a² + b² = c²)?")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-amber-50 text-[11px] font-bold text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>📐</span>
                  <span>{language === "kz" ? "Пифагор" : language === "en" ? "Pythagoras" : "Пифагор"}</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Үшбұрыш ауданының негізгі формулалары" : language === "en" ? "Key triangle area formulas" : "Формулы площади треугольника")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-purple-50 text-[11px] font-bold text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>🔺</span>
                  <span>{language === "kz" ? "Үшбұрыш ауданы" : language === "en" ? "Triangle Area" : "Площадь треугольника"}</span>
                </button>
                <button
                  onClick={() => handleSendMessage(language === "kz" ? "Шеңбердің ұзындығы және дөңгелектің ауданы" : language === "en" ? "Circle circumference and area" : "Длина окружности и площадь круга")}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-teal-50 text-[11px] font-bold text-teal-700 border border-teal-200 hover:bg-teal-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>⭕</span>
                  <span>{language === "kz" ? "Шеңбер" : language === "en" ? "Circle" : "Окружность"}</span>
                </button>
              </>
            );
          }
          // Default Algebra chips
          return (
            <>
              <button
                onClick={() => handleSendTrainerTask(11, "algebra")}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-purple-50 text-[11px] font-bold text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
              >
                <span>🎓</span>
                <span>{language === "kz" ? "11 сынып: Туынды" : language === "en" ? "Grade 11: Calculus" : "11 кл: Производная"}</span>
              </button>
              <button
                onClick={() => handleSendTrainerTask(7, "algebra")}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
              >
                <span>🟢</span>
                <span>{language === "kz" ? "7 сынып: Теңдеу" : language === "en" ? "Grade 7: Equation" : "7 кл: Уравнение"}</span>
              </button>
              <button
                onClick={() => handleSendMessage(t.chips.showOnPizza)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white text-[11px] font-semibold text-[#004ac6] border border-[#c3c6d7]/40 hover:bg-[#eaedff] transition-colors shadow-2xs cursor-pointer"
              >
                {t.chips.showOnPizza}
              </button>
            </>
          );
        })()}
      </div>

      {/* Input Bar */}
      <div className="border-t border-[#c3c6d7]/30 bg-white p-2.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-1.5"
        >
          {/* Photo upload mock modal button */}
          <button
            type="button"
            onClick={() => setPhotoModalOpen(true)}
            className="flex size-9 items-center justify-center rounded-xl bg-[#eaedff] text-[#004ac6] hover:bg-[#dbe1ff] transition-colors"
            title={t.photoTooltip}
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </button>

          {/* Formula keyboard button */}
          <button
            type="button"
            onClick={() => setFormulaModalOpen(true)}
            className="flex size-9 items-center justify-center rounded-xl bg-[#eaedff] text-[#004ac6] hover:bg-[#dbe1ff] transition-colors"
            title={t.formulaTooltip}
          >
            <span className="material-symbols-outlined text-[20px]">functions</span>
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="flex-1 rounded-xl bg-[#f2f3ff] px-3.5 py-2 text-xs text-[#131b2e] placeholder-[#737686] outline-none border border-[#c3c6d7]/30 focus:border-[#004ac6]"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="flex size-9 items-center justify-center rounded-xl bg-[#004ac6] text-white disabled:opacity-40 hover:bg-[#2563eb] transition-all"
            title={t.sendTooltip}
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>

      {/* Photo Homework Modal */}
      {photoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm text-[#131b2e]">
                {language === "kz" ? "Есеп суретін жіберу" : language === "en" ? "Send Homework Photo" : "Сфотографировать задачу"}
              </h4>
              <button onClick={() => setPhotoModalOpen(false)} className="text-[#737686]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="border-2 border-dashed border-[#c3c6d7] rounded-xl p-6 text-center bg-[#f8f9fc] flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl text-[#004ac6]">add_a_photo</span>
              <p className="text-xs text-[#434655]">
                {language === "kz"
                  ? "Дәптердегі қиын есепті түсіріңіз, Newton талдап береді"
                  : language === "en"
                  ? "Capture your notebook problem for instant Newton breakdown"
                  : "Сфотографируйте задачу в тетради, Newton мгновенно её решит"}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setPhotoModalOpen(false);
                  handleSendMessage(
                    language === "kz"
                      ? "📸 [Дәптерден сурет жіберілді]: x² - 5x + 6 = 0 теңдеуін қадам бойынша түсіндірші"
                      : language === "en"
                      ? "📸 [Homework photo sent]: Solve equation x² - 5x + 6 = 0 step-by-step"
                      : "📸 [Фото задачи из тетради]: Реши по шагам уравнение x² - 5x + 6 = 0"
                  );
                }}
                className="w-full py-2.5 rounded-xl bg-[#004ac6] text-white text-xs font-bold shadow-sm"
              >
                {language === "kz" ? "Суретті талдауға жіберу" : language === "en" ? "Analyze Sample Photo" : "Отправить фото на анализ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formula Modal */}
      {formulaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm text-[#131b2e]">
                {language === "kz" ? "Формулалар тақтасы" : language === "en" ? "Math Symbols" : "Символы формул"}
              </h4>
              <button onClick={() => setFormulaModalOpen(false)} className="text-[#737686]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["√", "∑", "π", "∫", "x²", "≠", "≤", "≥", "±", "α", "β", "Δ"].map((sym) => (
                <button
                  key={sym}
                  onClick={() => {
                    setInputText((p) => p + sym);
                    setFormulaModalOpen(false);
                  }}
                  className="p-2.5 rounded-lg bg-[#eaedff] text-[#004ac6] font-bold text-sm hover:bg-[#dbe1ff]"
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
