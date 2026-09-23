import React, { useState, useMemo } from "react";
import { Language, NavTab, LeaderboardUser } from "../types";
import {
  leaderboardScopes,
  getComputedLeaderboard,
  ScopeOption,
} from "../data/leaderboardData";

interface LeaderboardScreenProps {
  language: Language;
  onNavigate: (
    tab: NavTab,
    context?: { subject?: string; topic?: string; prompt?: string; grade?: number; autoOpenGuide?: boolean }
  ) => void;
  xp: number;
  coins: number;
  streak: number;
  level: number;
  onAddXP?: (amount: number) => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  language,
  onNavigate,
  xp,
  coins,
  streak,
  level,
  onAddXP,
}) => {
  // Metric toggle: "xp" (опыт) vs "coins" (очки/монеты NC)
  const [sortBy, setSortBy] = useState<"xp" | "coins">("xp");

  // Scope: class, school, country, league
  const [selectedScope, setSelectedScope] = useState<
    "class" | "school" | "country" | "league"
  >("class");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cheeredUsers, setCheeredUsers] = useState<Record<string, boolean>>({});

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCheer = (user: LeaderboardUser) => {
    if (cheeredUsers[user.id]) return;
    setCheeredUsers((prev) => ({ ...prev, [user.id]: true }));
    if (onAddXP) {
      onAddXP(5);
    }
    const cheerMsg =
      language === "kz"
        ? `✋ ${user.name} оқушысына қолдау білдірдіңіз! (+5 XP)`
        : language === "en"
        ? `✋ You gave a high-five to ${user.name}! (+5 XP)`
        : `✋ Вы дали пять ученику ${user.name}! (+5 XP)`;
    showToast(cheerMsg);
  };

  // Compute live rankings with current user's state
  const { list: rankedList, currentUser, leaderGap, nextRankGap } = useMemo(() => {
    return getComputedLeaderboard(selectedScope, sortBy, {
      xp,
      coins,
      streak,
      level,
    });
  }, [selectedScope, sortBy, xp, coins, streak, level]);

  const top1 = rankedList[0];
  const top2 = rankedList[1];
  const top3 = rankedList[2];
  const remainingList = rankedList.slice(3);

  // Localized texts
  const t = {
    title: {
      kz: "Оқушылар рейтингі",
      ru: "Лидерборд учеников",
      en: "Student Leaderboard",
    },
    subtitle: {
      kz: "Тәжірибе мен ұпай бойынша 1-орынға талас",
      ru: "Соревнование за 1-е место по опыту и очкам",
      en: "Compete for #1 place by XP & points",
    },
    timerLabel: {
      kz: "Апта соңына дейін: 2 күн 14 сағ.",
      ru: "До конца недели: 2 дня 14 ч.",
      en: "Week ends in: 2d 14h",
    },
    byXp: {
      kz: "⚡ Тәжірибе (XP)",
      ru: "⚡ По опыту (XP)",
      en: "⚡ By XP",
    },
    byCoins: {
      kz: "🪙 Очкола (NC)",
      ru: "🪙 По очкам (NC)",
      en: "🪙 By Coins (NC)",
    },
    youAreRank: {
      kz: "Сіздің орныңыз:",
      ru: "Ваше место:",
      en: "Your Rank:",
    },
    catchLeader: {
      kz: `1-орынға жету үшін небәрі +${leaderGap} ${sortBy === "xp" ? "XP" : "NC"} қажет!`,
      ru: `До 1-го места осталось всего +${leaderGap} ${sortBy === "xp" ? "XP" : "NC"}!`,
      en: `Only +${leaderGap} ${sortBy === "xp" ? "XP" : "NC"} to reach #1!`,
    },
    isLeader: {
      kz: "🎉 Керемет! Сіз 1-орындасыз! Лидерлікті сақтап қалыңыз!",
      ru: "🎉 Отлично! Вы на 1-м месте! Удерживайте лидерство!",
      en: "🎉 Awesome! You are in 1st place! Keep leading!",
    },
    catchNext: {
      kz: `Келесі орынға жетуге: +${nextRankGap} ${sortBy === "xp" ? "XP" : "NC"}`,
      ru: `До следующего места: +${nextRankGap} ${sortBy === "xp" ? "XP" : "NC"}`,
      en: `To next rank: +${nextRankGap} ${sortBy === "xp" ? "XP" : "NC"}`,
    },
    solveTasksBtn: {
      kz: "Тапсырма шешіп, ұпай жинау ➔",
      ru: "Решать задания и догнать ➔",
      en: "Solve Tasks & Gain Points ➔",
    },
    rewardsTitle: {
      kz: "🏆 Апталық лига сыйлықтары:",
      ru: "🏆 Призы недельной лиги:",
      en: "🏆 Weekly League Rewards:",
    },
    rewardsDesc: {
      kz: "1-орын: +500 NC және Алтын кубок • Топ-5 Алмаз лигасына өтеді!",
      ru: "1-е место: +500 NC и Золотой кубок • Топ-5 переходят в Высшую лигу!",
      en: "#1 place: +500 NC and Gold Trophy • Top 5 advance to Diamond League!",
    },
  };

  return (
    <div className="flex flex-col gap-3.5 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2 rounded-2xl shadow-xl text-xs font-bold animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Screen Header & Season Timer */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-amber-500">
                emoji_events
              </span>
              <span className="text-xs font-extrabold text-[#004ac6] uppercase tracking-wider">
                {t.title[language]}
              </span>
            </div>
            <h2 className="text-xl font-black text-[#131b2e] tracking-tight">
              {language === "kz"
                ? "Көшбасшылар сайысы"
                : language === "en"
                ? "Rankings Race"
                : "Битва за 1-е место"}
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1 rounded-xl text-[11px] font-bold">
            <span className="material-symbols-outlined text-[15px] text-amber-600">
              timer
            </span>
            <span>{t.timerLabel[language]}</span>
          </div>
        </div>
        <p className="text-xs text-[#737686]">{t.subtitle[language]}</p>
      </section>

      {/* Metric Selector (XP vs NC Coins) */}
      <div className="grid grid-cols-2 p-1 bg-[#eaedff] rounded-2xl border border-[#c3c6d7]/30 shadow-xs">
        <button
          onClick={() => setSortBy("xp")}
          className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            sortBy === "xp"
              ? "bg-[#004ac6] text-white shadow-sm scale-101"
              : "text-[#434655] hover:text-[#131b2e]"
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          <span>{t.byXp[language]}</span>
        </button>
        <button
          onClick={() => setSortBy("coins")}
          className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            sortBy === "coins"
              ? "bg-[#004ac6] text-white shadow-sm scale-101"
              : "text-[#434655] hover:text-[#131b2e]"
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">token</span>
          <span>{t.byCoins[language]}</span>
        </button>
      </div>

      {/* Scope Selector Strip: Class / School / Country / League */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
        {leaderboardScopes.map((sc) => {
          const isActive = selectedScope === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedScope(sc.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                isActive
                  ? "bg-[#004ac6] border-[#004ac6] text-white shadow-xs"
                  : "bg-white border-[#c3c6d7]/40 text-[#434655] hover:bg-[#f2f3ff]"
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{sc.icon}</span>
              <span>{sc.label[language]}</span>
            </button>
          );
        })}
      </div>

      {/* PODIUM VIEW (Топ-3 Пьедестал почёта) */}
      <section className="relative rounded-3xl bg-linear-to-b from-[#1b2b4f] via-[#101b33] to-[#0a1020] p-4 text-white shadow-xl overflow-hidden border border-white/10">
        {/* Ambient glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-amber-500/20 blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-3 text-[11px] text-amber-200/90 font-bold border-b border-white/10 pb-2">
          <span>{leaderboardScopes.find((s) => s.id === selectedScope)?.badge[language]}</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="material-symbols-outlined text-[14px]">military_tech</span>
            <span>{language === "kz" ? "Топ-3 жүлдегерлер" : "Топ-3 призера"}</span>
          </span>
        </div>

        {/* 3 Columns Podium */}
        <div className="flex items-end justify-center gap-2 pt-2 pb-1">
          {/* 🥈 Rank 2 (Silver) */}
          {top2 && (
            <div className="flex-1 flex flex-col items-center">
              <div className="relative mb-1">
                <div
                  className={`size-14 rounded-2xl bg-linear-to-b from-gray-200 to-gray-400 p-0.5 shadow-md flex items-center justify-center text-2xl ${
                    top2.isCurrentUser ? "ring-2 ring-blue-400" : ""
                  }`}
                >
                  <div className="size-full bg-[#18233c] rounded-[14px] flex items-center justify-center">
                    <span>{top2.avatar}</span>
                  </div>
                </div>
                <span className="absolute -bottom-1.5 -right-1 size-5 rounded-full bg-slate-300 text-slate-900 flex items-center justify-center font-black text-[11px] shadow-sm">
                  2
                </span>
              </div>
              <span className="text-xs font-bold text-slate-200 truncate max-w-[85px] text-center mt-1">
                {top2.isCurrentUser
                  ? language === "kz"
                    ? "Сіз (Сіз)"
                    : "Вы"
                  : top2.name.split(" ")[0]}
              </span>
              <span className="text-[11px] font-black text-slate-300">
                {sortBy === "xp" ? `${top2.xp} XP` : `${top2.coins} NC`}
              </span>

              {/* Silver Pillar */}
              <div className="w-full h-16 rounded-t-2xl bg-linear-to-b from-slate-400/40 to-slate-600/20 border-t-2 border-slate-300/60 mt-2 flex flex-col items-center justify-center">
                <span className="text-xl">🥈</span>
                <span className="text-[10px] font-bold text-slate-300">2-орын</span>
              </div>
            </div>
          )}

          {/* 🥇 Rank 1 (Gold - CENTER & HIGHEST) */}
          {top1 && (
            <div className="flex-1.2 flex flex-col items-center -mt-3">
              {/* Crown */}
              <span className="text-2xl animate-bounce -mb-1">👑</span>
              <div className="relative mb-1">
                <div
                  className={`size-18 rounded-2xl bg-linear-to-b from-amber-300 via-amber-400 to-amber-600 p-0.8 shadow-xl shadow-amber-500/20 flex items-center justify-center text-3xl ${
                    top1.isCurrentUser ? "ring-4 ring-amber-300" : ""
                  }`}
                >
                  <div className="size-full bg-[#1e2a4a] rounded-[14px] flex items-center justify-center">
                    <span>{top1.avatar}</span>
                  </div>
                </div>
                <span className="absolute -bottom-2 -right-1 size-6 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-black text-xs shadow-md">
                  1
                </span>
              </div>
              <span className="text-xs font-extrabold text-amber-200 truncate max-w-[100px] text-center mt-1">
                {top1.isCurrentUser
                  ? language === "kz"
                    ? "Сіз (Чемпион!)"
                    : "Вы (Лидер!)"
                  : top1.name.split(" ")[0]}
              </span>
              <span className="text-xs font-black text-amber-300">
                {sortBy === "xp" ? `${top1.xp} XP` : `${top1.coins} NC`}
              </span>

              {/* Gold Pillar */}
              <div className="w-full h-24 rounded-t-2xl bg-linear-to-b from-amber-400/40 to-amber-600/20 border-t-2 border-amber-400 mt-2 flex flex-col items-center justify-center shadow-lg">
                <span className="text-2xl">🥇</span>
                <span className="text-[11px] font-extrabold text-amber-300">
                  {language === "kz" ? "1-Орын" : "1 Место"}
                </span>
                <span className="text-[9px] text-amber-200/80 font-bold">🏆 Чемпион</span>
              </div>
            </div>
          )}

          {/* 🥉 Rank 3 (Bronze) */}
          {top3 && (
            <div className="flex-1 flex flex-col items-center">
              <div className="relative mb-1">
                <div
                  className={`size-14 rounded-2xl bg-linear-to-b from-amber-700 to-amber-900 p-0.5 shadow-md flex items-center justify-center text-2xl ${
                    top3.isCurrentUser ? "ring-2 ring-blue-400" : ""
                  }`}
                >
                  <div className="size-full bg-[#18233c] rounded-[14px] flex items-center justify-center">
                    <span>{top3.avatar}</span>
                  </div>
                </div>
                <span className="absolute -bottom-1.5 -right-1 size-5 rounded-full bg-amber-700 text-white flex items-center justify-center font-black text-[11px] shadow-sm">
                  3
                </span>
              </div>
              <span className="text-xs font-bold text-amber-200/90 truncate max-w-[85px] text-center mt-1">
                {top3.isCurrentUser
                  ? language === "kz"
                    ? "Сіз (Сіз)"
                    : "Вы"
                  : top3.name.split(" ")[0]}
              </span>
              <span className="text-[11px] font-black text-amber-400">
                {sortBy === "xp" ? `${top3.xp} XP` : `${top3.coins} NC`}
              </span>

              {/* Bronze Pillar */}
              <div className="w-full h-12 rounded-t-2xl bg-linear-to-b from-amber-700/40 to-amber-900/20 border-t-2 border-amber-600/60 mt-2 flex flex-col items-center justify-center">
                <span className="text-lg">🥉</span>
                <span className="text-[10px] font-bold text-amber-300">3-орын</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CURRENT USER STATUS CARD (Где находитесь вы и сколько осталось до 1 места) */}
      <section
        className={`rounded-3xl p-4 shadow-md border-2 transition-all ${
          currentUser.rank === 1
            ? "bg-linear-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border-amber-400"
            : "bg-linear-to-r from-[#004ac6]/10 via-[#2563eb]/10 to-[#eaedff] border-[#004ac6]/40"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="size-12 rounded-2xl bg-white shadow-xs border border-[#c3c6d7]/40 flex items-center justify-center text-2xl">
                {currentUser.avatar}
              </div>
              <span
                className={`absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center text-[10px] font-black shadow-xs ${
                  currentUser.rank === 1
                    ? "bg-amber-400 text-amber-950"
                    : currentUser.rank === 2
                    ? "bg-slate-300 text-slate-900"
                    : currentUser.rank === 3
                    ? "bg-amber-700 text-white"
                    : "bg-[#004ac6] text-white"
                }`}
              >
                #{currentUser.rank}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-[#131b2e]">
                  {language === "kz" ? "Сіздің көрсеткішіңіз" : "Ваш результат"}
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md bg-[#004ac6] text-white">
                  LVL {level}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#004ac6] mt-0.5">
                <span>{xp} XP</span>
                <span>•</span>
                <span>{coins} NC</span>
                <span>•</span>
                <span className="text-orange-600 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">
                    local_fire_department
                  </span>
                  <span>{streak} дн.</span>
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-[#737686] block">
              {t.youAreRank[language]}
            </span>
            <span className="text-xl font-black text-[#004ac6]">
              #{currentUser.rank}
            </span>
          </div>
        </div>

        {/* Motivational progress bar to 1st place */}
        <div className="mt-3 pt-2.5 border-t border-[#c3c6d7]/30 flex flex-col gap-1.5">
          <p className="text-xs font-bold text-[#131b2e]">
            {currentUser.rank === 1 ? t.isLeader[language] : t.catchLeader[language]}
          </p>

          <button
            onClick={() => onNavigate("practice", { autoOpenGuide: true })}
            className="w-full py-2.5 rounded-2xl bg-linear-to-r from-[#004ac6] to-[#2563eb] hover:from-[#003896] hover:to-[#1d4ed8] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">fitness_center</span>
            <span>{t.solveTasksBtn[language]}</span>
          </button>
        </div>
      </section>

      {/* FULL RANKINGS LIST (От 4-го места и далее) */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-[#131b2e] uppercase tracking-wider">
            {language === "kz"
              ? "Толық қатысушылар тізімі"
              : language === "en"
              ? "Full Participant Standings"
              : "Полный список участников"}
          </h4>
          <span className="text-[10px] font-bold text-[#737686]">
            {rankedList.length} {language === "kz" ? "оқушы" : "учеников"}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {remainingList.map((user) => {
            const isUser = user.isCurrentUser;
            const isCheered = cheeredUsers[user.id];

            return (
              <div
                key={user.id}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  isUser
                    ? "bg-[#eaedff] border-[#004ac6] shadow-xs ring-2 ring-[#004ac6]/30"
                    : "bg-white border-[#c3c6d7]/30 hover:border-[#c3c6d7]/70 shadow-xs"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Rank number & rank change badge */}
                  <div className="flex flex-col items-center justify-center w-7 shrink-0">
                    <span
                      className={`text-xs font-black ${
                        isUser ? "text-[#004ac6]" : "text-[#434655]"
                      }`}
                    >
                      #{user.rank}
                    </span>
                    {user.change > 0 && (
                      <span className="text-[9px] font-black text-emerald-600 leading-none">
                        ▲+{user.change}
                      </span>
                    )}
                    {user.change < 0 && (
                      <span className="text-[9px] font-black text-rose-600 leading-none">
                        ▼{user.change}
                      </span>
                    )}
                    {user.change === 0 && (
                      <span className="text-[9px] text-[#737686] leading-none">—</span>
                    )}
                  </div>

                  {/* Avatar & Profile Details */}
                  <div className="size-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-xl shrink-0 border border-[#c3c6d7]/30">
                    {user.avatar}
                  </div>

                  <div className="min-w-0 flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <h5
                        className={`text-xs font-extrabold truncate ${
                          isUser ? "text-[#004ac6]" : "text-[#131b2e]"
                        }`}
                      >
                        {isUser
                          ? language === "kz"
                            ? "Сіз (Сіздің профиль)"
                            : "Вы (Ваш профиль)"
                          : user.name}
                      </h5>
                      {isUser && (
                        <span className="text-[9px] px-1 py-0.2 bg-[#004ac6] text-white rounded font-bold">
                          YOU
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#737686] truncate">
                      {user.school} • {user.city}
                    </p>
                  </div>
                </div>

                {/* Score & Action Button */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-black text-[#131b2e]">
                      {sortBy === "xp" ? `${user.xp} XP` : `${user.coins} NC`}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-[#737686]">
                      <span className="text-orange-600 font-bold flex items-center">
                        <span className="material-symbols-outlined text-[12px]">
                          local_fire_department
                        </span>
                        <span>{user.streak}</span>
                      </span>
                      <span>•</span>
                      <span>{user.tasksSolved} {language === "kz" ? "есеп" : "задач"}</span>
                    </div>
                  </div>

                  {!isUser ? (
                    <button
                      onClick={() => handleCheer(user)}
                      disabled={isCheered}
                      className={`size-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isCheered
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-[#f2f3ff] hover:bg-[#eaedff] text-[#004ac6] active:scale-95 border border-[#c3c6d7]/30"
                      }`}
                      title={language === "kz" ? "Қолдау көрсету" : "Дать пять"}
                    >
                      <span>{isCheered ? "❤️" : "✋"}</span>
                    </button>
                  ) : (
                    <div className="size-8 rounded-xl bg-[#004ac6] text-white flex items-center justify-center font-bold text-xs">
                      ★
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WEEKLY LEAGUE PROMOTION BANNER */}
      <section className="rounded-2xl bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 p-3.5 text-white shadow-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0">
            🏆
          </div>
          <div>
            <h5 className="text-xs font-extrabold leading-tight">
              {t.rewardsTitle[language]}
            </h5>
            <p className="text-[10px] text-amber-100 mt-0.5 leading-snug">
              {t.rewardsDesc[language]}
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate("practice", { autoOpenGuide: true })}
          className="shrink-0 px-3 py-1.5 rounded-xl bg-white text-orange-700 text-xs font-black shadow-xs hover:bg-white/90 active:scale-95 transition-all cursor-pointer"
        >
          {language === "kz" ? "Қатысу" : language === "en" ? "Join" : "В бой!"}
        </button>
      </section>
    </div>
  );
};
