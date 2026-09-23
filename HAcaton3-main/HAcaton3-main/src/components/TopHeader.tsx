import React from "react";
import { Language, NavTab } from "../types";
import { translations } from "../i18n/translations";

interface TopHeaderProps {
  currentTab: NavTab;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  coins: number;
  xp: number;
  streak: number;
  level: number;
  onNavigate?: (tab: NavTab) => void;
  onOpenSettings?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentTab,
  language,
  onLanguageChange,
  coins,
  xp,
  level,
  onNavigate,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#e2e7ff]/70 bg-[#faf8ff]/95 px-4 py-2.5 backdrop-blur-md transition-all shadow-xs">
      <div className="flex items-center gap-2.5">
        {/* App Logo / Tutor Icon */}
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#2563eb] text-white shadow-sm font-extrabold text-sm tracking-tight">
          AI
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-bold text-[#131b2e] tracking-tight leading-none">
              AI Tutor Pro
            </h1>
            <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-[#dbe1ff] text-[#004ac6]">
              LVL {level}
            </span>
          </div>
          <span className="text-[10px] font-semibold text-[#004ac6] uppercase tracking-wider mt-0.5">
            {t.home.systemBadge}
          </span>
        </div>
      </div>

      {/* Language Switcher Pills + Leaderboard + Stats */}
      <div className="flex items-center gap-1.5">
        {/* Trophy / Leaderboard Button */}
        <button
          onClick={() => onNavigate && onNavigate("leaderboard")}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg border transition-all cursor-pointer ${
            currentTab === "leaderboard"
              ? "bg-[#004ac6] text-white border-[#004ac6] shadow-xs"
              : "bg-amber-50 border-amber-300/80 text-amber-900 hover:bg-amber-100"
          }`}
          title="Лидерборд"
        >
          <span className="text-[13px]">🏆</span>
          <span className="text-[11px] font-black hidden min-[360px]:inline">
            {language === "kz" ? "ТОП" : language === "en" ? "TOP" : "ТОП"}
          </span>
        </button>

        {/* Quick Language Toggle */}
        <div className="flex items-center bg-[#eaedff] p-0.5 rounded-lg border border-[#c3c6d7]/40">
          <button
            onClick={() => onLanguageChange("kz")}
            className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-all ${
              language === "kz"
                ? "bg-[#2563eb] text-white shadow-xs"
                : "text-[#434655] hover:text-[#131b2e]"
            }`}
            title="Қазақ тілі"
          >
            🇰🇿 KZ
          </button>
          <button
            onClick={() => onLanguageChange("ru")}
            className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-all ${
              language === "ru"
                ? "bg-[#2563eb] text-white shadow-xs"
                : "text-[#434655] hover:text-[#131b2e]"
            }`}
            title="Русский язык"
          >
            🇷🇺 RU
          </button>
          <button
            onClick={() => onLanguageChange("en")}
            className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-all ${
              language === "en"
                ? "bg-[#2563eb] text-white shadow-xs"
                : "text-[#434655] hover:text-[#131b2e]"
            }`}
            title="English"
          >
            🇬🇧 EN
          </button>
        </div>

        {/* Currency Pill */}
        <div className="hidden sm:flex items-center gap-1 bg-[#eaedff] px-2 py-1 rounded-lg border border-[#c3c6d7]/30 text-xs font-bold text-[#004ac6]">
          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            token
          </span>
          <span>{coins}</span>
          <span className="text-[10px] text-[#737686]">NC</span>
        </div>
      </div>
    </header>
  );
};
