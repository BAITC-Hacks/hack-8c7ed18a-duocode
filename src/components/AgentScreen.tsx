import React, { useState } from "react";
import { Language, CognitiveStyle } from "../types";
import { translations } from "../i18n/translations";

interface AgentScreenProps {
  language: Language;
  cognitiveStyle: CognitiveStyle;
  onChangeStyle: (style: CognitiveStyle) => void;
  socraticLevel: number;
  onChangeSocratic: (lvl: number) => void;
  gentlePace: boolean;
  onToggleGentlePace: () => void;
  interests: string[];
  onToggleInterest: (interest: string) => void;
  onSaveNotification: () => void;
}

export const AgentScreen: React.FC<AgentScreenProps> = ({
  language,
  cognitiveStyle,
  onChangeStyle,
  socraticLevel,
  onChangeSocratic,
  gentlePace,
  onToggleGentlePace,
  interests,
  onToggleInterest,
  onSaveNotification,
}) => {
  const t = translations[language].agent;
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = () => {
    onSaveNotification();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="flex flex-col gap-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Category Header */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-extrabold text-[#004ac6] uppercase tracking-wider">
          {t.syncHeader}
        </span>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#131b2e] tracking-tight">
            {t.centerTitle}
          </h2>
          <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#dbe1ff] text-[#004ac6] uppercase tracking-wider">
            {t.calibrationBadge}
          </span>
        </div>
      </div>

      {/* Hero Companion Card */}
      <section className="rounded-2xl bg-gradient-to-br from-[#004ac6] to-[#4338ca] p-4 text-white shadow-md flex items-center gap-3.5">
        <div className="relative shrink-0">
          <div className="size-13 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center orb-pulse">
            <span className="material-symbols-outlined text-[28px]">smart_toy</span>
          </div>
          <span className="absolute -bottom-1 -right-1 size-3.5 bg-emerald-400 rounded-full border-2 border-[#004ac6]"></span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-extrabold leading-snug">
            {t.companionHeroTitle}
          </h3>
          <p className="text-xs text-white/80 mt-0.5 leading-tight">
            {t.companionHeroDesc}
          </p>
        </div>
      </section>

      {/* Cognitive Style Segmented Control */}
      <section className="rounded-2xl bg-white border border-[#c3c6d7]/30 p-3.5 shadow-xs flex flex-col gap-2">
        <span className="text-xs font-bold text-[#131b2e]">
          {t.cognitiveStyleLabel}
        </span>
        <div className="grid grid-cols-3 gap-1 bg-[#eaedff] p-1 rounded-xl">
          <button
            onClick={() => onChangeStyle("analogy")}
            className={`py-2 rounded-lg text-xs font-bold transition-all text-center ${
              cognitiveStyle === "analogy"
                ? "bg-[#004ac6] text-white shadow-xs"
                : "text-[#434655] hover:text-[#131b2e]"
            }`}
          >
            {t.styles.analogies}
          </button>
          <button
            onClick={() => onChangeStyle("algorithm")}
            className={`py-2 rounded-lg text-xs font-bold transition-all text-center ${
              cognitiveStyle === "algorithm"
                ? "bg-[#004ac6] text-white shadow-xs"
                : "text-[#434655] hover:text-[#131b2e]"
            }`}
          >
            {t.styles.algorithm}
          </button>
          <button
            onClick={() => onChangeStyle("blitz")}
            className={`py-2 rounded-lg text-xs font-bold transition-all text-center ${
              cognitiveStyle === "blitz"
                ? "bg-[#004ac6] text-white shadow-xs"
                : "text-[#434655] hover:text-[#131b2e]"
            }`}
          >
            {t.styles.blitz}
          </button>
        </div>
      </section>

      {/* Socratic Mentorship Slider */}
      <section className="rounded-2xl bg-white border border-[#c3c6d7]/30 p-3.5 shadow-xs flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#131b2e]">
            {t.mentorshipLabel}
          </span>
          <span className="text-xs font-extrabold text-[#004ac6]">
            {socraticLevel}%
          </span>
        </div>

        <input
          type="range"
          min="10"
          max="100"
          value={socraticLevel}
          onChange={(e) => onChangeSocratic(Number(e.target.value))}
          className="w-full accent-[#004ac6] cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-[#737686] font-semibold">
          <span>{t.directHints}</span>
          <span>{t.socraticQuestions}</span>
        </div>
      </section>

      {/* Gentle Pace Toggle */}
      <section className="rounded-2xl bg-white border border-[#c3c6d7]/30 p-3.5 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] shrink-0">
            <span className="material-symbols-outlined text-[20px]">spa</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#131b2e]">{t.gentlePaceTitle}</h4>
            <p className="text-[11px] text-[#737686]">{t.gentlePaceSubtitle}</p>
          </div>
        </div>

        <button
          onClick={onToggleGentlePace}
          className={`w-11 h-6 rounded-full p-0.5 transition-colors relative focus:outline-none ${
            gentlePace ? "bg-[#004ac6]" : "bg-[#c3c6d7]"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              gentlePace ? "translate-x-5" : "translate-x-0"
            }`}
          ></div>
        </button>
      </section>

      {/* Custom Problem Interests Tags */}
      <section className="rounded-2xl bg-white border border-[#c3c6d7]/30 p-3.5 shadow-xs flex flex-col gap-2">
        <div>
          <h4 className="text-xs font-bold text-[#131b2e]">{t.interestsLabel}</h4>
          <p className="text-[11px] text-[#737686]">{t.interestsSubtitle}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {[
            { id: "football", label: t.interests.football },
            { id: "videogames", label: t.interests.videogames },
            { id: "space", label: t.interests.space },
          ].map((item) => {
            const isSelected = interests.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => onToggleInterest(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#004ac6] text-white shadow-xs"
                    : "bg-[#eaedff] text-[#434655] hover:bg-[#dbe1ff]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Multi-Agent Collaboration Synergy Cards (Image 9) */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#131b2e]">{t.agentSwarmTitle}</h4>
            <p className="text-[10px] text-[#737686]">{t.agentSwarmSubtitle}</p>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6]">
            {t.agentCount}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Agent 1 */}
          <div className="p-3 rounded-2xl bg-white border border-[#c3c6d7]/30 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500"></span>
                <span>{t.agents.empathyTitle}</span>
              </span>
              <span className="text-[10px] text-[#737686]">{t.agents.empathyTime}</span>
            </div>
            <p className="text-[11px] text-[#434655] leading-relaxed">
              {t.agents.empathyDesc}
            </p>
          </div>

          {/* Agent 2 */}
          <div className="p-3 rounded-2xl bg-white border border-[#c3c6d7]/30 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#ba1a1a] flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#ba1a1a]"></span>
                <span>{t.agents.gapTitle}</span>
              </span>
              <span className="text-[10px] text-[#737686]">{t.agents.gapTime}</span>
            </div>
            <p className="text-[11px] text-[#434655] leading-relaxed">
              {t.agents.gapDesc}
            </p>
          </div>

          {/* Agent 3 */}
          <div className="p-3 rounded-2xl bg-white border border-[#c3c6d7]/30 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#004ac6] flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#004ac6]"></span>
                <span>{t.agents.socraticTitle}</span>
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">{t.agents.socraticTime}</span>
            </div>
            <p className="text-[11px] text-[#434655] leading-relaxed">
              {t.agents.socraticDesc}
            </p>
          </div>

          {/* Agent 4 */}
          <div className="p-3 rounded-2xl bg-white border border-[#c3c6d7]/30 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-purple-700 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-purple-600"></span>
                <span>{t.agents.plannerTitle}</span>
              </span>
              <span className="text-[10px] text-[#737686]">{t.agents.plannerTime}</span>
            </div>
            <p className="text-[11px] text-[#434655] leading-relaxed">
              {t.agents.plannerDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Live Style Demo Preview Card */}
      <section className="rounded-2xl bg-[#eaedff] p-3.5 border border-[#c3c6d7]/40 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#004ac6]">{t.demoTitle}</span>
          <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-white text-[#004ac6] rounded shadow-2xs">
            {t.demoBadge}
          </span>
        </div>
        <p className="text-[11px] text-[#434655] font-medium leading-snug">
          {t.demoNote}
        </p>
        <blockquote className="text-xs italic text-[#131b2e] bg-white p-2.5 rounded-xl border border-[#c3c6d7]/30 mt-1">
          {t.demoQuote}
        </blockquote>
      </section>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3 rounded-xl bg-[#004ac6] hover:bg-[#2563eb] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
      >
        {t.saveSyncBtn}
      </button>

      {/* Toast Notification */}
      {showSavedToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#131b2e] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span>{t.syncSuccessToast}</span>
        </div>
      )}
    </div>
  );
};
