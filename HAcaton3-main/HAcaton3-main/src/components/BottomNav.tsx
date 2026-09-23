import React from "react";
import { Language, NavTab } from "../types";
import { translations } from "../i18n/translations";

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  language,
}) => {
  const t = translations[language].tabs;

  const navItems: { id: NavTab; label: string; icon: string }[] = [
    { id: "home", label: t.home, icon: "home" },
    { id: "chat", label: t.chat, icon: "smart_toy" },
    { id: "knowledge", label: t.knowledge, icon: "account_tree" },
    { id: "practice", label: t.practice, icon: "fitness_center" },
    {
      id: "leaderboard",
      label: language === "kz" ? "Рейтинг" : language === "en" ? "Leaderboard" : "Лидерборд",
      icon: "emoji_events",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-md border-t border-[#e7ebf3] bg-[#f8f9fc]/95 backdrop-blur-md shadow-lg">
      <div className="flex gap-1 px-3 pb-2.5 pt-1.5 justify-around">
        {navItems.map((item) => {
          const isActive =
            currentTab === item.id ||
            (item.id === "leaderboard" && currentTab === "rewards");
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-1 flex-col items-center justify-end gap-1 py-1 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? "text-[#004ac6] font-bold"
                  : "text-[#4d6599] hover:text-[#0e121b]"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                  isActive
                    ? "bg-[#dbe1ff] text-[#004ac6] shadow-xs"
                    : "text-[#4d6599]"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>
              </div>
              <p className="text-[11px] font-semibold leading-none tracking-[0.01em] truncate w-full text-center px-0.5">
                {item.label}
              </p>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
