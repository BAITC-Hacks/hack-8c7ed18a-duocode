import React from "react";
import { Language } from "../types";
import { translations } from "../i18n/translations";

interface LanguageOnboardingProps {
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  bilingualSTEM: boolean;
  onToggleBilingual: () => void;
  onComplete: () => void;
  onSkip: () => void;
}

export const LanguageOnboarding: React.FC<LanguageOnboardingProps> = ({
  selectedLanguage,
  onSelectLanguage,
  bilingualSTEM,
  onToggleBilingual,
  onComplete,
  onSkip,
}) => {
  const t = translations[selectedLanguage];

  const languages: {
    id: Language;
    flag: string;
    name: string;
    desc: string;
  }[] = [
    {
      id: "kz",
      flag: "🇰🇿",
      name: "Қазақ тілі",
      desc: t.onboarding.langKzDesc,
    },
    {
      id: "ru",
      flag: "🇷🇺",
      name: "Русский язык",
      desc: t.onboarding.langRuDesc,
    },
    {
      id: "en",
      flag: "🇬🇧",
      name: "English",
      desc: t.onboarding.langEnDesc,
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#ffffff] pb-10">
      {/* Top Header with Step Counter */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#c3c6d7]/20 bg-[#ffffff]/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <span className="material-symbols-outlined text-[18px]">psychology</span>
          </div>
          <span className="font-bold text-base text-[#004ac6] tracking-tight">AI Tutor Pro</span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-[#eaedff] px-2.5 py-1 rounded-full text-xs font-bold text-[#434655]">
            <div className="w-2 h-2 rounded-full bg-[#2563eb]"></div>
            <div className="w-2 h-2 rounded-full bg-[#c3c6d7]"></div>
            <div className="w-2 h-2 rounded-full bg-[#c3c6d7]"></div>
            <span className="ml-1 text-[#004ac6]">{t.onboarding.step}</span>
          </div>
          <button
            onClick={onSkip}
            className="text-xs font-bold text-[#434655] hover:text-[#004ac6] px-2 py-1 rounded transition-colors"
          >
            {t.onboarding.skip}
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-5 pt-3 pb-2 flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-xs font-semibold text-[#434655]">
          <span>{t.onboarding.step}: {t.onboarding.badge}</span>
          <span className="text-[#004ac6] font-bold">33%</span>
        </div>
        <div className="w-full bg-[#e2e7ff] h-2 rounded-full overflow-hidden">
          <div className="bg-[#2563eb] h-full rounded-full transition-all duration-500" style={{ width: "33.33%" }}></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-5 pt-2 pb-6 flex flex-col gap-4">
        {/* Title & Description */}
        <section className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6] font-semibold text-[11px] uppercase tracking-wide">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              translate
            </span>
            <span>{t.onboarding.badge}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#131b2e] leading-tight tracking-tight">
            {t.onboarding.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
            {t.onboarding.subtitle}
          </p>
        </section>

        {/* Newton AI Tutor Motivation Card */}
        <section className="rounded-2xl border border-[#c3c6d7]/50 bg-gradient-to-r from-[#eaedff] to-[#f2f3ff] p-3.5 flex items-start gap-3 shadow-xs">
          <div className="relative shrink-0 mt-0.5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#004ac6] to-[#712ae2] flex items-center justify-center text-white shadow-md orb-pulse">
              <span className="material-symbols-outlined text-[22px]">smart_toy</span>
            </div>
            <span className="absolute -bottom-1 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-bold text-[#131b2e]">Newton AI Tutor</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white text-[#004ac6] shadow-xs">
                ONLINE
              </span>
            </div>
            <p className="text-xs text-[#434655] italic leading-snug">
              {t.onboarding.tutorQuote}
            </p>
          </div>
        </section>

        {/* Language Selection Radio Cards */}
        <section className="flex flex-col gap-2.5">
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => onSelectLanguage(lang.id)}
                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#2563eb] bg-[#f2f3ff] shadow-md ring-2 ring-[#2563eb]/20"
                    : "border-[#c3c6d7]/40 bg-white hover:border-[#2563eb]/40 shadow-xs"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl leading-none">{lang.flag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-[#131b2e] leading-snug">
                          {lang.name}
                        </h2>
                        {isSelected && (
                          <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#2563eb] text-white uppercase tracking-wider">
                            {t.onboarding.selectedBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5a5d6e] mt-1 font-medium leading-normal">{lang.desc}</p>
                    </div>
                  </div>

                  {/* Radio Check Circle */}
                  <div
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                      isSelected
                        ? "border-[#2563eb] bg-[#2563eb] text-white"
                        : "border-[#c3c6d7] bg-transparent text-transparent"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </div>
                </div>
              </button>
            );
          })}
        </section>

        {/* Bilingual STEM Switch */}
        <section className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#c3c6d7]/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-white flex items-center justify-center text-[#004ac6] shadow-xs shrink-0">
              <span className="material-symbols-outlined text-[20px]">subtitles</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-[#131b2e] leading-tight">
                  {t.onboarding.bilingualTitle}
                </h4>
                <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#8a4cfc]/20 text-[#712ae2] font-bold rounded">
                  AI PRO
                </span>
              </div>
              <p className="text-[11px] text-[#434655] leading-tight mt-0.5">
                {t.onboarding.bilingualDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onToggleBilingual}
            aria-pressed={bilingualSTEM}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors relative focus:outline-none ${
              bilingualSTEM ? "bg-[#2563eb]" : "bg-[#c3c6d7]"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                bilingualSTEM ? "translate-x-5" : "translate-x-0"
              }`}
            ></div>
          </button>
        </section>

        {/* Live Navigation Tabs Preview (Real Dynamic Localization) */}
        <section className="bg-white rounded-2xl p-3 border border-[#c3c6d7]/40 shadow-xs">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] uppercase font-bold text-[#737686] tracking-wider">
              {t.onboarding.previewLabel}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-[#004ac6] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6] animate-ping"></span>
              <span>{t.onboarding.syncText}</span>
            </span>
          </div>

          {/* Mini dynamic preview tabs */}
          <div className="grid grid-cols-5 gap-1 bg-[#eaedff] p-1.5 rounded-xl text-center">
            <div className="flex flex-col items-center py-1 rounded-lg bg-white shadow-xs text-[#004ac6]">
              <span className="material-symbols-outlined text-[15px]">home</span>
              <span className="text-[9px] font-bold mt-0.5 truncate w-full px-0.5">{t.tabs.home}</span>
            </div>
            <div className="flex flex-col items-center py-1 text-[#434655]">
              <span className="material-symbols-outlined text-[15px]">smart_toy</span>
              <span className="text-[9px] font-medium mt-0.5 truncate w-full px-0.5">{t.tabs.chat}</span>
            </div>
            <div className="flex flex-col items-center py-1 text-[#434655]">
              <span className="material-symbols-outlined text-[15px]">account_tree</span>
              <span className="text-[9px] font-medium mt-0.5 truncate w-full px-0.5">{t.tabs.knowledge}</span>
            </div>
            <div className="flex flex-col items-center py-1 text-[#434655]">
              <span className="material-symbols-outlined text-[15px]">fitness_center</span>
              <span className="text-[9px] font-medium mt-0.5 truncate w-full px-0.5">{t.tabs.practice}</span>
            </div>
            <div className="flex flex-col items-center py-1 text-[#434655]">
              <span className="material-symbols-outlined text-[15px]">military_tech</span>
              <span className="text-[9px] font-medium mt-0.5 truncate w-full px-0.5">{t.tabs.rewards}</span>
            </div>
          </div>
        </section>

        {/* Available Subjects Preview */}
        <section className="flex flex-col gap-1.5 pt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#737686]">
            {t.onboarding.subjectsHeader}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {t.onboarding.subjects.map((sub, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-[#eaedff] text-[#131b2e] text-xs font-semibold"
              >
                {sub}
              </span>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky Bottom Action Button */}
      <footer className="sticky bottom-0 z-30 w-full bg-white/95 backdrop-blur-md px-5 py-3 border-t border-[#c3c6d7]/30 flex flex-col gap-2">
        <button
          onClick={onComplete}
          className="w-full h-13 rounded-2xl bg-[#004ac6] hover:bg-[#2563eb] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#004ac6]/25 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>{t.onboarding.continueBtn}</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
        <p className="text-center text-[11px] text-[#737686]">
          {t.onboarding.footerNote}
        </p>
      </footer>
    </div>
  );
};
