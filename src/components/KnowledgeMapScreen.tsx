import React, { useState, useMemo } from "react";
import { Language, NavTab } from "../types";
import { translations } from "../i18n/translations";
import {
  knowledgeMapSubjects,
  SubjectKnowledge,
  KnowledgeTopic,
  TopicStatus,
} from "../data/knowledgeMapData";

interface KnowledgeMapScreenProps {
  language: Language;
  onNavigate: (
    tab: NavTab,
    context?: { subject?: string; topic?: string; prompt?: string; grade?: number; autoOpenGuide?: boolean }
  ) => void;
  onAddXP?: (amount: number) => void;
  onAddCoins?: (amount: number) => void;
}

export const KnowledgeMapScreen: React.FC<KnowledgeMapScreenProps> = ({
  language,
  onNavigate,
  onAddXP,
  onAddCoins,
}) => {
  const t = translations[language].knowledge;

  // Selected Subject Tab
  const [selectedSubjectId, setSelectedSubjectId] = useState<
    "algebra" | "geometry" | "physics" | "cs" | "english" | "biology" | "chemistry"
  >("algebra");

  // Selected Filter Tab
  const [activeFilter, setActiveFilter] = useState<"all" | "gaps" | "inProgress" | "mastered">(
    "all"
  );

  // Grade filter
  const [gradeFilter, setGradeFilter] = useState<number | "all">("all");

  // View mode tab: "tree" (Tree of dependencies) | "list" (Grid catalog)
  const [viewMode, setViewMode] = useState<"tree" | "list">("tree");

  // Topic detail modal state
  const [selectedTopic, setSelectedTopic] = useState<KnowledgeTopic | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<"theory" | "links" | "quiz" | "ai">(
    "theory"
  );

  // Quiz state inside topic modal
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizIsChecked, setQuizIsChecked] = useState(false);
  const [quizShowHint, setQuizShowHint] = useState(false);
  const [quizCompletedTopics, setQuizCompletedTopics] = useState<Record<string, boolean>>({});

  // Sprint modal state
  const [sprintModalOpen, setSprintModalOpen] = useState(false);
  const [sprintStep, setSprintStep] = useState<1 | 2 | 3>(1);
  const [sprintAnswer, setSprintAnswer] = useState<string | null>(null);
  const [sprintIsChecked, setSprintIsChecked] = useState(false);
  const [sprintCompleted, setSprintCompleted] = useState(false);

  // Find active subject data
  const currentSubject: SubjectKnowledge = useMemo(() => {
    return (
      knowledgeMapSubjects.find((s) => s.id === selectedSubjectId) || knowledgeMapSubjects[0]
    );
  }, [selectedSubjectId]);

  // Counts for filter tabs
  const counts = useMemo(() => {
    const topics = currentSubject.topics;
    return {
      all: topics.length,
      gaps: topics.filter((top) => top.status === "critical_gap").length,
      inProgress: topics.filter((top) => top.status === "in_progress").length,
      mastered: topics.filter((top) => top.status === "mastered").length,
    };
  }, [currentSubject]);

  // Filter topics based on activeFilter and gradeFilter
  const filteredTopics = useMemo(() => {
    return currentSubject.topics.filter((top) => {
      // Status filter
      if (activeFilter === "gaps" && top.status !== "critical_gap") return false;
      if (activeFilter === "inProgress" && top.status !== "in_progress") return false;
      if (activeFilter === "mastered" && top.status !== "mastered") return false;

      // Grade filter
      if (gradeFilter !== "all" && top.grade !== gradeFilter) return false;

      return true;
    });
  }, [currentSubject, activeFilter, gradeFilter]);

  // Open topic modal
  const handleOpenTopic = (topic: KnowledgeTopic) => {
    setSelectedTopic(topic);
    setModalActiveTab("theory");
    setQuizSelectedOption(null);
    setQuizIsChecked(false);
    setQuizShowHint(false);
  };

  // Check quiz in modal
  const handleCheckQuiz = () => {
    if (!selectedTopic || !quizSelectedOption || quizIsChecked) return;
    setQuizIsChecked(true);

    const chosen = selectedTopic.quiz.options.find((o) => o.id === quizSelectedOption);
    if (chosen?.isCorrect) {
      if (!quizCompletedTopics[selectedTopic.id]) {
        setQuizCompletedTopics((prev) => ({ ...prev, [selectedTopic.id]: true }));
        onAddXP?.(20);
        onAddCoins?.(10);
      }
    }
  };

  // Launch Sprint
  const handleStartSprint = () => {
    setSprintStep(1);
    setSprintAnswer(null);
    setSprintIsChecked(false);
    setSprintModalOpen(true);
  };

  // Complete Sprint
  const handleFinishSprint = () => {
    if (!sprintCompleted) {
      setSprintCompleted(true);
      onAddXP?.(50);
      onAddCoins?.(25);
    }
    setSprintModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-3.5 pb-28 pt-2 px-4 max-w-md mx-auto">
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-extrabold text-[#004ac6] uppercase tracking-wider">
            {currentSubject.categoryTag[language]}
          </span>
          <h2 className="text-xl font-extrabold text-[#131b2e] tracking-tight">
            {currentSubject.name[language]} • {language === "kz" ? "Білім картасы" : language === "ru" ? "Карта знаний" : "Knowledge Map"}
          </h2>
        </div>

        {/* View Mode Toggle Button */}
        <div className="flex items-center rounded-xl bg-white border border-[#c3c6d7]/40 p-0.5 shadow-xs">
          <button
            onClick={() => setViewMode("tree")}
            title={language === "kz" ? "Ағаш көрінісі" : language === "ru" ? "Вид графа" : "Graph Tree"}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === "tree"
                ? "bg-[#004ac6] text-white shadow-xs"
                : "text-[#434655] hover:text-[#131b2e]"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            <span className="text-[11px]">{language === "kz" ? "Ағаш" : language === "ru" ? "Граф" : "Tree"}</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            title={language === "kz" ? "Тізім көрінісі" : language === "ru" ? "Список модулей" : "Catalog List"}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === "list"
                ? "bg-[#004ac6] text-white shadow-xs"
                : "text-[#434655] hover:text-[#131b2e]"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
            <span className="text-[11px]">{language === "kz" ? "Тізім" : language === "ru" ? "Каталог" : "List"}</span>
          </button>
        </div>
      </div>

      {/* 1. Subject Switcher Tabs (Вкладки предметов) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {knowledgeMapSubjects.map((sub) => {
          const isActive = sub.id === selectedSubjectId;
          return (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubjectId(sub.id);
                setActiveFilter("all");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-[#004ac6] text-white shadow-sm ring-2 ring-[#004ac6]/20"
                  : "bg-white text-[#434655] border border-[#c3c6d7]/40 hover:bg-[#f2f3ff]"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{sub.icon}</span>
              <span>{sub.name[language]}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isActive ? "bg-white/20 text-white" : "bg-[#f2f3ff] text-[#004ac6]"
                }`}
              >
                {sub.masteryScore}%
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Status Filter Tabs (Вкладки фильтрации статусов) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {/* All topics */}
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
            activeFilter === "all"
              ? "bg-[#004ac6] text-white shadow-xs"
              : "bg-white text-[#434655] border border-[#c3c6d7]/40 hover:bg-[#eaedff]/30"
          }`}
        >
          <span>{language === "kz" ? "Барлық тақырыптар" : language === "ru" ? "Все темы" : "All Topics"}</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeFilter === "all" ? "bg-white/25 text-white" : "bg-[#f0f2f8] text-[#434655]"
            }`}
          >
            {counts.all}
          </span>
        </button>

        {/* Gaps */}
        <button
          onClick={() => setActiveFilter("gaps")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
            activeFilter === "gaps"
              ? "bg-[#ba1a1a] text-white shadow-xs ring-2 ring-[#ba1a1a]/20"
              : "bg-[#fff0ee] text-[#ba1a1a] border border-[#ffdad6] hover:bg-[#ffe5e2]"
          }`}
        >
          <span className="size-1.5 rounded-full bg-[#ba1a1a] animate-ping inline-block"></span>
          <span>{language === "kz" ? "Пробелдер" : language === "ru" ? "Пробелы" : "Gaps"}</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeFilter === "gaps" ? "bg-white/25 text-white" : "bg-[#ffdad6] text-[#ba1a1a]"
            }`}
          >
            {counts.gaps}
          </span>
        </button>

        {/* In Progress */}
        <button
          onClick={() => setActiveFilter("inProgress")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
            activeFilter === "inProgress"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
          }`}
        >
          <span>{language === "kz" ? "Оқылуда" : language === "ru" ? "В процессе" : "In Progress"}</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeFilter === "inProgress" ? "bg-white/25 text-white" : "bg-amber-100 text-amber-800"
            }`}
          >
            {counts.inProgress}
          </span>
        </button>

        {/* Mastered */}
        <button
          onClick={() => setActiveFilter("mastered")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
            activeFilter === "mastered"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
          }`}
        >
          <span>{language === "kz" ? "Меңгерілді" : language === "ru" ? "Освоено" : "Mastered"}</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeFilter === "mastered" ? "bg-white/25 text-white" : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {counts.mastered}
          </span>
        </button>
      </div>

      {/* 3. Grade Filter Selector */}
      <div className="flex items-center gap-1 text-[11px] overflow-x-auto no-scrollbar">
        <span className="text-[#737686] font-semibold pr-1">
          {language === "kz" ? "Сынып:" : language === "ru" ? "Класс:" : "Grade:"}
        </span>
        {[
          { label: language === "kz" ? "Барлығы" : language === "ru" ? "Все" : "All", val: "all" as const },
          { label: "5", val: 5 },
          { label: "6", val: 6 },
          { label: "7", val: 7 },
          { label: "8", val: 8 },
          { label: "9", val: 9 },
          { label: "10", val: 10 },
          { label: "11", val: 11 },
        ].map((g) => {
          const isGActive = gradeFilter === g.val;
          return (
            <button
              key={String(g.val)}
              onClick={() => setGradeFilter(g.val)}
              className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                isGActive
                  ? "bg-[#131b2e] text-white"
                  : "bg-white text-[#737686] border border-[#c3c6d7]/30 hover:text-[#131b2e]"
              }`}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Course Mastery Gauge Card (Dynamic SVG ring) */}
      <section className="rounded-2xl bg-white border border-[#c3c6d7]/30 p-4 shadow-xs flex items-center justify-between gap-4">
        {/* SVG Circular Progress Ring */}
        <div className="relative size-20 shrink-0 flex items-center justify-center">
          <svg className="size-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#e2e7ff]"
              strokeWidth="3.8"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={
                currentSubject.masteryScore >= 70
                  ? "text-[#004ac6]"
                  : currentSubject.masteryScore >= 50
                  ? "text-purple-600"
                  : "text-amber-600"
              }
              strokeDasharray={`${currentSubject.masteryScore}, 100`}
              strokeWidth="3.8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-base font-black text-[#131b2e] leading-none">
              {currentSubject.masteryScore}%
            </span>
            <span className="text-[8px] uppercase font-bold text-[#737686] mt-0.5">SCORE</span>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#131b2e] leading-snug">
              {t.masteryGaugeTitle}: {currentSubject.name[language]}
            </h3>
          </div>
          <p className="text-xs text-[#737686] mt-0.5 leading-tight">
            {currentSubject.masterySubtitle[language]}
          </p>
          {currentSubject.blockerCount > 0 ? (
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-[#ba1a1a]">
              <span className="size-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
              <span>
                {currentSubject.blockerCount}{" "}
                {language === "kz"
                  ? "сыни бөгеуіш бар"
                  : language === "ru"
                  ? "критических блокера"
                  : "critical blockers"}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-600">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>
                {language === "kz"
                  ? "Сыни бөгеуіштер жоқ!"
                  : language === "ru"
                  ? "Все зависимости открыты!"
                  : "No blockers detected!"}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Topics Tree or Catalog Section */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#131b2e]">
              {viewMode === "tree" ? t.treeTitle : language === "kz" ? "Модульдер каталогы" : language === "ru" ? "Каталог модулей" : "Modules Catalog"}
            </h3>
            <p className="text-[11px] text-[#737686]">
              {language === "kz"
                ? "Толық мазмұнды ашу үшін тақырыпты басыңыз"
                : language === "ru"
                ? "Нажмите на любую тему, чтобы открыть теорию, связи и тест"
                : "Tap any topic to open theory, prerequisites & test"}
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eaedff] text-[#004ac6]">
            {filteredTopics.length}{" "}
            {language === "kz" ? "тақырып" : language === "ru" ? "тем" : "topics"}
          </span>
        </div>

        {/* Empty state if filter returns no items */}
        {filteredTopics.length === 0 && (
          <div className="p-6 rounded-2xl bg-white border border-[#c3c6d7]/30 text-center flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[#737686] text-3xl">filter_alt_off</span>
            <p className="text-xs text-[#737686]">
              {language === "kz"
                ? "Бұл сүзгі бойынша тақырыптар табылмады"
                : language === "ru"
                ? "В этой категории пока нет тем"
                : "No topics found in this category"}
            </p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setGradeFilter("all");
              }}
              className="px-3 py-1 rounded-lg bg-[#004ac6] text-white text-xs font-bold cursor-pointer"
            >
              {language === "kz" ? "Барлығын көрсету" : language === "ru" ? "Показать все" : "Show all"}
            </button>
          </div>
        )}

        {/* Render topics */}
        <div className="flex flex-col gap-2">
          {filteredTopics.map((topic, index) => {
            const isMastered = topic.status === "mastered";
            const isCriticalGap = topic.status === "critical_gap";
            const isInProgress = topic.status === "in_progress";
            const isLocked = topic.status === "locked";

            return (
              <React.Fragment key={topic.id}>
                {/* Arrow connector in tree view between sequential nodes */}
                {viewMode === "tree" && index > 0 && (
                  <div className="flex justify-center -my-1">
                    <span className="material-symbols-outlined text-[#737686] text-[18px]">
                      arrow_downward
                    </span>
                  </div>
                )}

                {/* Topic Card */}
                <div
                  onClick={() => handleOpenTopic(topic)}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer shadow-xs border ${
                    isCriticalGap
                      ? "border-2 border-[#ba1a1a] bg-[#fff8f7] hover:border-red-600 shadow-sm"
                      : isMastered
                      ? "bg-white border-[#c3c6d7]/30 hover:border-emerald-500/50"
                      : isInProgress
                      ? "bg-white border-amber-200/80 hover:border-amber-400"
                      : "bg-[#eaedff]/30 border-[#c3c6d7]/30 opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0 mr-2">
                      {/* Status Icon */}
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                          isMastered
                            ? "bg-emerald-100 text-emerald-600"
                            : isCriticalGap
                            ? "bg-red-100 text-[#ba1a1a]"
                            : isInProgress
                            ? "bg-amber-100 text-amber-700"
                            : "bg-[#c3c6d7] text-[#434655]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {isMastered
                            ? "check_circle"
                            : isCriticalGap
                            ? "warning"
                            : isInProgress
                            ? "sync"
                            : "lock"}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {isCriticalGap && (
                            <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-[#ba1a1a] text-white uppercase tracking-wider">
                              {language === "kz" ? "КРИТИКАЛЫҚ ПРОБЕЛ" : language === "ru" ? "КРИТИЧЕСКИЙ ПРОБЕЛ" : "CRITICAL GAP"}
                            </span>
                          )}
                          {isMastered && (
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                              {topic.prereqNumber
                                ? `${language === "kz" ? "Пререквизит" : language === "ru" ? "Пререквизит" : "Prereq"} ${topic.prereqNumber}`
                                : language === "kz" ? "Меңгерілді" : language === "ru" ? "Освоено" : "Mastered"}
                            </span>
                          )}
                          {isInProgress && (
                            <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded">
                              {language === "kz" ? "Оқылуда" : language === "ru" ? "В процессе" : "In Progress"}
                            </span>
                          )}
                          <span className="text-[10px] text-[#737686] font-semibold">
                            {topic.grade} {language === "kz" ? "сынып" : language === "ru" ? "класс" : "Grade"}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-[#131b2e] truncate mt-0.5">
                          {topic.title[language]}
                        </h4>
                        <p className="text-[11px] text-[#737686] line-clamp-1 mt-0.5">
                          {topic.desc[language]}
                        </p>
                      </div>
                    </div>

                    {/* Right side Score / Action */}
                    <div className="flex flex-col items-end shrink-0 gap-1">
                      <span
                        className={`text-xs font-black ${
                          isMastered
                            ? "text-emerald-600"
                            : isCriticalGap
                            ? "text-[#ba1a1a]"
                            : isInProgress
                            ? "text-amber-600"
                            : "text-[#737686]"
                        }`}
                      >
                        {topic.score}%
                      </span>

                      {isCriticalGap && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate("practice", {
                              subject: currentSubject.id === "algebra" ? "math" : currentSubject.id,
                              topic: topic.title[language],
                              grade: topic.grade,
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-[10px] shadow-xs transition-colors cursor-pointer"
                        >
                          {language === "kz" ? "Жою" : language === "en" ? "Fix" : "Закрыть"} →
                        </button>
                      )}

                      {!isCriticalGap && (
                        <span className="text-[10px] text-[#004ac6] font-bold flex items-center">
                          {language === "kz" ? "Ашу" : language === "ru" ? "Разбор" : "Open"}
                          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Warning / Blocker footer if any */}
                  {topic.warningNote && (
                    <div className="mt-2 pt-1.5 border-t border-[#c3c6d7]/30 flex items-center justify-between text-[10px] text-[#737686]">
                      <span className={isCriticalGap ? "text-[#ba1a1a] font-semibold" : ""}>
                        {topic.warningNote[language]}
                      </span>
                      {topic.accuracy !== undefined && (
                        <span className="font-bold">
                          {language === "kz" ? "Дәлдік:" : language === "ru" ? "Точность:" : "Accuracy:"} {topic.accuracy}%
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* AI Diagnostic Root-Cause Card (Interactive Sprint Trigger) */}
      <section className="rounded-2xl border border-[#c3c6d7]/40 bg-white p-4 shadow-sm flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#004ac6] text-[18px]">psychology</span>
            <h4 className="text-xs font-bold text-[#131b2e]">{currentSubject.diagnostic.title[language]}</h4>
          </div>
          <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-[#dbe1ff] text-[#004ac6] rounded">
            {currentSubject.diagnostic.badge[language]}
          </span>
        </div>

        <p className="text-xs text-[#434655] leading-relaxed">
          {currentSubject.diagnostic.errorObservation[language]}
        </p>

        <div className="rounded-xl bg-[#f2f3ff] p-2.5 border border-[#c3c6d7]/30">
          <span className="text-[10px] font-extrabold text-[#004ac6] block">
            {currentSubject.diagnostic.missedBaseTitle[language]}
          </span>
          <span className="text-xs font-semibold text-[#131b2e] block mt-0.5">
            {currentSubject.diagnostic.missedBaseConcept[language]}
          </span>
        </div>

        <div className="text-[11px] text-[#737686] leading-snug">
          <span className="font-bold text-[#131b2e]">{currentSubject.diagnostic.impactTitle[language]} </span>
          {currentSubject.diagnostic.impactDesc[language]}
        </div>

        {/* Start Sprint CTA Button */}
        <button
          onClick={handleStartSprint}
          className="mt-1 w-full rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white p-3 text-xs font-bold flex flex-col items-center justify-center gap-0.5 shadow-md shadow-[#004ac6]/20 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>{currentSubject.diagnostic.startSprintBtn[language]}</span>
          <span className="text-[10px] font-normal text-white/80">
            {currentSubject.diagnostic.sprintSubtitle[language]}
          </span>
        </button>
      </section>

      {/* ========================================================================= */}
      {/* TOPIC DETAIL MODAL / DRAWER (Вкладки которые открываются) */}
      {/* ========================================================================= */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#c3c6d7]/30 flex items-center justify-between bg-[#faf8ff]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`size-8 rounded-xl flex items-center justify-center shrink-0 ${
                    selectedTopic.status === "mastered"
                      ? "bg-emerald-100 text-emerald-600"
                      : selectedTopic.status === "critical_gap"
                      ? "bg-red-100 text-[#ba1a1a]"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {selectedTopic.status === "mastered"
                      ? "check_circle"
                      : selectedTopic.status === "critical_gap"
                      ? "warning"
                      : "sync"}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#131b2e] truncate">
                    {selectedTopic.title[language]}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#737686]">
                    <span>{currentSubject.name[language]}</span>
                    <span>•</span>
                    <span>{selectedTopic.grade} {language === "kz" ? "сынып" : language === "ru" ? "класс" : "Grade"}</span>
                    <span>•</span>
                    <span className="font-bold text-[#004ac6]">{selectedTopic.score}%</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedTopic(null)}
                className="size-8 rounded-full bg-[#eaedff] text-[#434655] hover:bg-[#dbe1ff] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* WORKING INTERNAL TABS IN TOPIC MODAL (Вкладки внутри окна темы) */}
            <div className="flex items-center border-b border-[#c3c6d7]/30 bg-white px-2">
              <button
                onClick={() => setModalActiveTab("theory")}
                className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  modalActiveTab === "theory"
                    ? "border-[#004ac6] text-[#004ac6]"
                    : "border-transparent text-[#737686] hover:text-[#131b2e]"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>{language === "kz" ? "Теория" : language === "ru" ? "Теория" : "Theory"}</span>
              </button>

              <button
                onClick={() => setModalActiveTab("links")}
                className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  modalActiveTab === "links"
                    ? "border-[#004ac6] text-[#004ac6]"
                    : "border-transparent text-[#737686] hover:text-[#131b2e]"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">hub</span>
                <span>{language === "kz" ? "Байланыстар" : language === "ru" ? "Связи" : "Links"}</span>
              </button>

              <button
                onClick={() => setModalActiveTab("quiz")}
                className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  modalActiveTab === "quiz"
                    ? "border-[#004ac6] text-[#004ac6]"
                    : "border-transparent text-[#737686] hover:text-[#131b2e]"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">quiz</span>
                <span>{language === "kz" ? "Экспресс-тест" : language === "ru" ? "Тест" : "Quiz"}</span>
                {quizCompletedTopics[selectedTopic.id] && (
                  <span className="size-1.5 rounded-full bg-emerald-500"></span>
                )}
              </button>

              <button
                onClick={() => setModalActiveTab("ai")}
                className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  modalActiveTab === "ai"
                    ? "border-[#004ac6] text-[#004ac6]"
                    : "border-transparent text-[#737686] hover:text-[#131b2e]"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                <span>{language === "kz" ? "AI Түсіндіру" : language === "ru" ? "AI Разбор" : "AI Socratic"}</span>
              </button>
            </div>

            {/* Modal Body Content depending on Active Tab */}
            <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-3.5 text-xs">
              {/* TAB 1: THEORY */}
              {modalActiveTab === "theory" && (
                <div className="flex flex-col gap-3">
                  <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#c3c6d7]/40">
                    <span className="text-[10px] font-extrabold text-[#004ac6] uppercase tracking-wide block">
                      {selectedTopic.theory.ruleTitle[language]}
                    </span>
                    <div className="mt-1.5 p-2 rounded-lg bg-white border border-[#004ac6]/20 font-mono text-center font-extrabold text-sm text-[#004ac6]">
                      {selectedTopic.theory.formula}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-[#131b2e] mb-1">
                      {language === "kz" ? "Ереженің мәні:" : language === "ru" ? "Суть правила:" : "Concept Essence:"}
                    </h5>
                    <p className="text-[#434655] leading-relaxed">
                      {selectedTopic.theory.explanation[language]}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#fff0ee] border border-[#ffdad6]">
                    <div className="flex items-center gap-1.5 text-[#ba1a1a] font-bold mb-1">
                      <span className="material-symbols-outlined text-[16px]">warning</span>
                      <span>
                        {language === "kz" ? "Жиі кездесетін қателік:" : language === "ru" ? "Типичная ловушка:" : "Common Pitfall:"}
                      </span>
                    </div>
                    <p className="text-[#410002] leading-snug">
                      {selectedTopic.theory.commonTrap[language]}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: LINKS & PREREQUISITES */}
              {modalActiveTab === "links" && (
                <div className="flex flex-col gap-3">
                  {/* Prerequisites */}
                  <div className="p-3 rounded-xl bg-white border border-[#c3c6d7]/40">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-2">
                      <span className="material-symbols-outlined text-[16px]">check_box</span>
                      <span>
                        {language === "kz" ? "Алдында меңгеру қажет (Пререквизиттер):" : language === "ru" ? "Необходимо знать заранее (Пререквизиты):" : "Required Foundations:"}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-1.5 pl-2">
                      {selectedTopic.dependencies.prerequisites[language].map((prereq, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[#434655]">
                          <span className="size-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                          <span>{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Unlocks */}
                  <div className="p-3 rounded-xl bg-white border border-[#c3c6d7]/40">
                    <div className="flex items-center gap-1.5 text-[#004ac6] font-bold mb-2">
                      <span className="material-symbols-outlined text-[16px]">lock_open</span>
                      <span>
                        {language === "kz" ? "Осы тақырып ашатын тараулар:" : language === "ru" ? "Открывает доступ к темам:" : "Unlocks Future Topics:"}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-1.5 pl-2">
                      {selectedTopic.dependencies.unlocks[language].map((unl, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[#434655]">
                          <span className="size-1.5 rounded-full bg-[#004ac6] shrink-0"></span>
                          <span>{unl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cross-subject impact */}
                  {selectedTopic.dependencies.crossSubjectImpact && (
                    <div className="p-3 rounded-xl bg-[#eaedff] border border-[#004ac6]/30">
                      <span className="text-[10px] font-bold text-[#004ac6] uppercase block mb-1">
                        {language === "kz" ? "Пәнаралық байланыс:" : language === "ru" ? "Межпредметная связь:" : "Cross-Subject Link:"}
                      </span>
                      <p className="text-[#131b2e] leading-snug">
                        {selectedTopic.dependencies.crossSubjectImpact[language]}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: INTERACTIVE QUIZ */}
              {modalActiveTab === "quiz" && (
                <div className="flex flex-col gap-3">
                  <div className="p-3 rounded-xl bg-[#f8f9fc] border border-[#c3c6d7]/40">
                    <span className="text-[10px] font-bold text-[#737686] uppercase block mb-1">
                      {language === "kz" ? "Бекіту сұрағы:" : language === "ru" ? "Проверочный вопрос:" : "Check Question:"}
                    </span>
                    <p className="font-bold text-[#131b2e] text-sm">
                      {selectedTopic.quiz.question[language]}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="flex flex-col gap-2">
                    {selectedTopic.quiz.options.map((opt) => {
                      const isSelected = quizSelectedOption === opt.id;
                      let btnStyle = "bg-white border-[#c3c6d7]/40 text-[#131b2e] hover:border-[#004ac6]";

                      if (quizIsChecked) {
                        if (opt.isCorrect) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/20";
                        } else if (isSelected) {
                          btnStyle = "bg-red-50 border-[#ba1a1a] text-[#ba1a1a] font-bold";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-[#dbe1ff] border-[#004ac6] text-[#004ac6] font-bold";
                      }

                      return (
                        <button
                          key={opt.id}
                          disabled={quizIsChecked}
                          onClick={() => setQuizSelectedOption(opt.id)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="size-6 rounded-md bg-black/5 flex items-center justify-center font-bold text-[11px]">
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                          {quizIsChecked && opt.isCorrect && (
                            <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Hint toggle */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setQuizShowHint(!quizShowHint)}
                      className="text-[11px] font-bold text-[#004ac6] flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">lightbulb</span>
                      <span>{language === "kz" ? "Көмек/Подсказка" : language === "ru" ? "Подсказка" : "Hint"}</span>
                    </button>
                  </div>

                  {quizShowHint && (
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                      💡 {selectedTopic.quiz.hint[language]}
                    </div>
                  )}

                  {/* Submit Answer */}
                  {!quizIsChecked ? (
                    <button
                      disabled={!quizSelectedOption}
                      onClick={handleCheckQuiz}
                      className={`w-full py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                        quizSelectedOption
                          ? "bg-[#004ac6] hover:bg-[#2563eb] text-white shadow-sm"
                          : "bg-[#e2e7ff] text-[#737686] cursor-not-allowed"
                      }`}
                    >
                      {language === "kz" ? "Жауапты тексеру →" : language === "ru" ? "Проверить ответ →" : "Verify Answer →"}
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs">
                        <span className="font-bold block mb-1">
                          {selectedTopic.quiz.options.find((o) => o.id === quizSelectedOption)?.isCorrect
                            ? "🎉 " + (language === "kz" ? "Дұрыс! +20 XP берілді!" : language === "ru" ? "Верно! Начислено +20 XP!" : "Correct! +20 XP earned!")
                            : "⚠️ " + (language === "kz" ? "Түсіндірме:" : language === "ru" ? "Пояснение решения:" : "Explanation:")}
                        </span>
                        <p>{selectedTopic.quiz.explanation[language]}</p>
                      </div>

                      <button
                        onClick={() => {
                          setQuizSelectedOption(null);
                          setQuizIsChecked(false);
                        }}
                        className="py-2 text-center text-xs font-bold text-[#004ac6] hover:underline cursor-pointer"
                      >
                        {language === "kz" ? "Қайта тапсырып көру" : language === "ru" ? "Попробовать ещё раз" : "Try Again"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: AI SOCRATIC TUTOR EXPLANATION */}
              {modalActiveTab === "ai" && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-50 border border-purple-200">
                    <span className="material-symbols-outlined text-purple-700 text-[22px]">psychology</span>
                    <div>
                      <h5 className="font-bold text-purple-900 text-xs">
                        Newton AI: {selectedTopic.aiExplanation.analogyTitle[language]}
                      </h5>
                      <span className="text-[10px] text-purple-700">
                        {language === "kz" ? "Бейнелі түсіндіру стилі" : language === "ru" ? "Образный стиль объяснения" : "Intuitive visual analogy"}
                      </span>
                    </div>
                  </div>

                  <p className="text-[#434655] leading-relaxed text-xs">
                    {selectedTopic.aiExplanation.analogyBody[language]}
                  </p>

                  <div className="p-2.5 rounded-lg bg-[#f0f2f8] border border-[#c3c6d7]/30 text-[#131b2e] font-semibold text-[11px]">
                    ✨ {language === "kz" ? "Басты түйін:" : language === "ru" ? "Главный вывод:" : "Core takeaway:"} {selectedTopic.aiExplanation.keyTakeaway[language]}
                  </div>

                  {/* Action to talk with tutor directly in chat */}
                  <button
                    onClick={() => {
                      const promptText =
                        language === "kz"
                          ? `Маған "${selectedTopic.title[language]}" тақырыбын түсіндіріп берші.`
                          : language === "ru"
                          ? `Объясни мне тему "${selectedTopic.title[language]}" через простые жизненные аналогии.`
                          : `Explain the topic "${selectedTopic.title[language]}" with analogies.`;
                      setSelectedTopic(null);
                      onNavigate("chat", {
                        subject: currentSubject.id,
                        topic: selectedTopic.title[language],
                        prompt: promptText,
                      });
                    }}
                    className="mt-1 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>
                      {language === "kz" ? "Осы тақырыпты Newton-мен талқылау" : language === "ru" ? "Обсудить тему в чате с Newton" : "Discuss with Newton in Chat"}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 border-t border-[#c3c6d7]/30 bg-[#faf8ff] flex items-center gap-2">
              <button
                onClick={() => {
                  const currentSub = currentSubject.id === "algebra" ? "math" : currentSubject.id;
                  setSelectedTopic(null);
                  onNavigate("practice", {
                    subject: currentSub,
                    topic: selectedTopic.title[language],
                    grade: selectedTopic.grade,
                    autoOpenGuide: true,
                  });
                }}
                className="flex-1 py-3 rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#004ac6]/20 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">fitness_center</span>
                <span>
                  {language === "kz" ? "Тренажерге өту" : language === "ru" ? "Перейти к тренажеру" : "Go to Practice"}
                </span>
              </button>

              <button
                onClick={() => setSelectedTopic(null)}
                className="px-4 py-3 rounded-xl bg-white border border-[#c3c6d7]/40 text-[#434655] font-bold text-xs hover:bg-[#eaedff] transition-all cursor-pointer"
              >
                {language === "kz" ? "Жабу" : language === "ru" ? "Закрыть" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10-MINUTE SPRINT MODAL (Мини-спринт ликвидации пробела) */}
      {/* ========================================================================= */}
      {sprintModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-4 border-b border-[#c3c6d7]/30 flex items-center justify-between bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px]">bolt</span>
                <div>
                  <h3 className="text-sm font-bold leading-tight">
                    {language === "kz" ? "10 минуттық супер-спринт" : language === "ru" ? "10-минутный экспресс-спринт" : "10-Minute Rapid Sprint"}
                  </h3>
                  <span className="text-[10px] text-white/80">
                    {currentSubject.name[language]} • {language === "kz" ? `${sprintStep}/3 қадам` : language === "ru" ? `Шаг ${sprintStep} из 3` : `Step ${sprintStep} of 3`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSprintModalOpen(false)}
                className="size-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Sprint Stepper Bar */}
            <div className="grid grid-cols-3 gap-1 p-2 bg-[#f0f2f8]">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  sprintStep >= 1 ? "bg-[#004ac6]" : "bg-[#c3c6d7]"
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-all ${
                  sprintStep >= 2 ? "bg-[#004ac6]" : "bg-[#c3c6d7]"
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-all ${
                  sprintStep >= 3 ? "bg-emerald-500" : "bg-[#c3c6d7]"
                }`}
              />
            </div>

            {/* Content per Step */}
            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3 text-xs">
              {/* STEP 1: MICRO-LESSON */}
              {sprintStep === 1 && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 text-[#004ac6] font-bold">
                    <span className="material-symbols-outlined text-[18px]">school</span>
                    <span className="text-sm">{currentSubject.diagnostic.sprintLessonTitle[language]}</span>
                  </div>

                  <p className="text-[#434655] leading-relaxed text-xs">
                    {currentSubject.diagnostic.sprintLessonContent[language]}
                  </p>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 leading-snug">
                    🎯 <strong>{language === "kz" ? "Есіңде сақта:" : language === "ru" ? "Золотое правило:" : "Golden Rule:"}</strong>{" "}
                    {language === "kz"
                      ? "Бөлімдердің ең кіші ортақ еселігін (ЕКОҮ) тауып, содан кейін ғана амалдарды орындаңыз!"
                      : language === "ru"
                      ? "Всегда раскладывай знаменатели на простые множители и находи НОК перед сложением!"
                      : "Always factor denominators to prime factors and establish the LCM before adding!"}
                  </div>

                  <button
                    onClick={() => setSprintStep(2)}
                    className="mt-2 w-full py-3 rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <span>{language === "kz" ? "Есепті шешуге көшу →" : language === "ru" ? "Перейти к проверочной задаче →" : "Proceed to Quick Task →"}</span>
                  </button>
                </div>
              )}

              {/* STEP 2: EXPRESS PRACTICE TASK */}
              {sprintStep === 2 && (
                <div className="flex flex-col gap-3">
                  <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#c3c6d7]/30">
                    <span className="text-[10px] font-bold text-[#004ac6] uppercase block mb-1">
                      {language === "kz" ? "Экспресс-есеп:" : language === "ru" ? "Экспресс-задача:" : "Express Task:"}
                    </span>
                    <p className="font-bold text-[#131b2e] text-sm">
                      {currentSubject.id === "algebra"
                        ? "1/4 + 1/6 нешеге тең болады? (НОК = 12)"
                        : currentSubject.id === "geometry"
                        ? "Катеттері 3 және 4 болатын тікбұрышты үшбұрыштың гипотенузасы:"
                        : currentSubject.id === "physics"
                        ? "3 Ом және 6 Ом екі кедергі параллель қосылғандағы жалпы кедергі:"
                        : "Python-да 2 ** 3 амалының мәні нешеге тең?"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {(currentSubject.id === "algebra"
                      ? [
                          { id: "A", text: "5/12", correct: true },
                          { id: "B", text: "2/10 = 1/5", correct: false },
                          { id: "C", text: "7/12", correct: false },
                          { id: "D", text: "1/24", correct: false },
                        ]
                      : currentSubject.id === "geometry"
                      ? [
                          { id: "A", text: "5", correct: true },
                          { id: "B", text: "7", correct: false },
                          { id: "C", text: "25", correct: false },
                          { id: "D", text: "6", correct: false },
                        ]
                      : currentSubject.id === "physics"
                      ? [
                          { id: "A", text: "2 Ом", correct: true },
                          { id: "B", text: "9 Ом", correct: false },
                          { id: "C", text: "4.5 Ом", correct: false },
                          { id: "D", text: "18 Ом", correct: false },
                        ]
                      : [
                          { id: "A", text: "8", correct: true },
                          { id: "B", text: "6", correct: false },
                          { id: "C", text: "9", correct: false },
                          { id: "D", text: "5", correct: false },
                        ]
                    ).map((opt) => {
                      const isSel = sprintAnswer === opt.id;
                      let style = "bg-white border-[#c3c6d7]/40 text-[#131b2e]";

                      if (sprintIsChecked) {
                        if (opt.correct) {
                          style = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                        } else if (isSel) {
                          style = "bg-red-50 border-[#ba1a1a] text-[#ba1a1a]";
                        }
                      } else if (isSel) {
                        style = "bg-[#dbe1ff] border-[#004ac6] text-[#004ac6] font-bold";
                      }

                      return (
                        <button
                          key={opt.id}
                          disabled={sprintIsChecked}
                          onClick={() => setSprintAnswer(opt.id)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${style}`}
                        >
                          <span>{opt.text}</span>
                          {sprintIsChecked && opt.correct && (
                            <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!sprintIsChecked ? (
                    <button
                      disabled={!sprintAnswer}
                      onClick={() => setSprintIsChecked(true)}
                      className={`w-full py-3 rounded-xl font-bold transition-all cursor-pointer ${
                        sprintAnswer
                          ? "bg-[#004ac6] hover:bg-[#2563eb] text-white shadow-sm"
                          : "bg-[#e2e7ff] text-[#737686] cursor-not-allowed"
                      }`}
                    >
                      {language === "kz" ? "Жауапты бекіту" : language === "ru" ? "Подтвердить ответ" : "Confirm Answer"}
                    </button>
                  ) : (
                    <button
                      onClick={() => setSprintStep(3)}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all cursor-pointer shadow-sm"
                    >
                      {language === "kz" ? "Керемет! Нәтижені көру →" : language === "ru" ? "Отлично! Завершить спринт →" : "Great! Complete Sprint →"}
                    </button>
                  )}
                </div>
              )}

              {/* STEP 3: CELEBRATION & REWARDS */}
              {sprintStep === 3 && (
                <div className="flex flex-col items-center justify-center text-center gap-3 py-4">
                  <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                    <span className="material-symbols-outlined text-[36px]">military_tech</span>
                  </div>

                  <h4 className="text-base font-extrabold text-[#131b2e]">
                    {language === "kz" ? "Спринт сәтті аяқталды!" : language === "ru" ? "Спринт успешно пройден!" : "Sprint Completed!"}
                  </h4>

                  <p className="text-xs text-[#737686] max-w-xs">
                    {language === "kz"
                      ? "Сіз тақырыптың негізгі түйінін бекіттіңіз және пробелді жоюға үлкен қадам жасадыңыз!"
                      : language === "ru"
                      ? "Ты закрепил фундаментальное правило и сделал ключевой шаг к ликвидации блокера!"
                      : "You solidified the fundamental concept and took a key step toward gap elimination!"}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 font-extrabold text-xs text-[#004ac6]">
                      +50 XP
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 font-extrabold text-xs text-amber-800">
                      +25 NC
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-2 mt-2">
                    <button
                      onClick={handleFinishSprint}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                    >
                      {language === "kz" ? "Марапатты алып, Картаға оралу" : language === "ru" ? "Забрать награду и вернуться к Карте" : "Claim Reward & Return"}
                    </button>

                    <button
                      onClick={() => {
                        handleFinishSprint();
                        onNavigate("practice", {
                          subject: currentSubject.id === "algebra" ? "math" : currentSubject.id,
                        });
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#f0f2f8] text-[#131b2e] font-bold text-xs hover:bg-[#e2e7ff] transition-all cursor-pointer"
                    >
                      {language === "kz" ? "Толық тренажерге көшу →" : language === "ru" ? "Закрепить в полном тренажере →" : "Practice further in Trainer →"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
