import React, { useState } from "react";
import { Language, NavTab, ShopItem } from "../types";
import { translations } from "../i18n/translations";

interface RewardsScreenProps {
  language: Language;
  coins: number;
  streak: number;
  onNavigate: (tab: NavTab) => void;
  onClaimChallenge: (ncReward: number) => void;
  onBuyItem: (price: number) => boolean;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({
  language,
  coins,
  streak,
  onNavigate,
  onClaimChallenge,
  onBuyItem,
}) => {
  const t = translations[language].rewards;

  const [challenge1Claimed, setChallenge1Claimed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [shopItems, setShopItems] = useState<ShopItem[]>([
    {
      id: "item1",
      name: t.items.item1Title,
      desc: t.items.item1Desc,
      category: "skin",
      price: 350,
      icon: "palette",
      badge: t.items.item1Badge,
      purchased: false,
    },
    {
      id: "item2",
      name: t.items.item2Title,
      desc: t.items.item2Desc,
      category: "protection",
      price: 150,
      icon: "ac_unit",
      badge: t.items.item2Badge,
      purchased: false,
    },
    {
      id: "item3",
      name: t.items.item3Title,
      desc: t.items.item3Desc,
      category: "boost",
      price: 200,
      icon: "bolt",
      badge: t.items.item3Badge,
      purchased: false,
    },
    {
      id: "item4",
      name: t.items.item4Title,
      desc: t.items.item4Desc,
      category: "raffle",
      price: 80,
      icon: "confirmation_number",
      badge: t.items.item4Badge,
      purchased: false,
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleClaim = () => {
    if (challenge1Claimed) return;
    setChallenge1Claimed(true);
    onClaimChallenge(100);
    showToast("+100 NC получен!");
  };

  const handleBuy = (item: ShopItem) => {
    if (item.purchased) return;
    if (coins < item.price) {
      showToast(t.notEnoughCoins);
      return;
    }

    const success = onBuyItem(item.price);
    if (success) {
      setShopItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, purchased: true } : i))
      );
      showToast(`🎉 ${item.name} куплен!`);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-24 pt-2 px-4 max-w-md mx-auto">
      {/* Top Profile Header */}
      <section className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-[#737686] uppercase tracking-wide">
            {t.studentTrack}
          </span>
          <h2 className="text-xl font-extrabold text-[#131b2e] tracking-tight">
            {t.studentTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700">
            <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
            <span>{streak} {language === "kz" ? "күн" : language === "en" ? "days" : "дней"}</span>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-[#eaedff] px-2.5 py-1 text-xs font-extrabold text-[#004ac6] border border-[#c3c6d7]/40">
            <span className="material-symbols-outlined text-[16px]">token</span>
            <span>{coins} NC</span>
          </div>
        </div>
      </section>

      {/* Rewards vs Leaderboard Quick Toggle Strip */}
      <div className="grid grid-cols-2 p-1 bg-[#eaedff] rounded-2xl border border-[#c3c6d7]/30 shadow-xs">
        <div className="py-2 rounded-xl text-xs font-black bg-[#004ac6] text-white shadow-sm flex items-center justify-center gap-1.5 cursor-default">
          <span className="material-symbols-outlined text-[16px]">military_tech</span>
          <span>{language === "kz" ? "🎁 Марапаттар" : language === "en" ? "🎁 Rewards" : "🎁 Награды"}</span>
        </div>
        <button
          onClick={() => onNavigate("leaderboard")}
          className="py-2 rounded-xl text-xs font-black text-[#434655] hover:text-[#004ac6] hover:bg-white/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-amber-600">emoji_events</span>
          <span>{language === "kz" ? "🏆 Рейтинг (ТОП)" : language === "en" ? "🏆 Leaderboard" : "🏆 Лидерборд"}</span>
        </button>
      </div>

      {/* Critical Gap Milestone Hero Banner (Image 10) */}
      <section className="rounded-2xl bg-gradient-to-br from-[#004ac6] to-[#3b82f6] p-4 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md uppercase tracking-wider text-white">
            {t.heroBannerBadge}
          </span>
          <span className="text-[10px] font-bold bg-amber-400 text-[#410002] px-2 py-0.5 rounded-full shadow-2xs">
            {t.heroMultiplier}
          </span>
        </div>

        <span className="text-[10px] font-semibold text-white/80 uppercase tracking-wide block">
          {t.heroCategory}
        </span>
        <h3 className="text-base font-extrabold leading-snug mt-0.5">
          {t.heroTitle}
        </h3>
        <p className="text-xs text-white/85 mt-1 leading-relaxed">
          {t.heroDesc}
        </p>

        <div className="mt-3 pt-2.5 border-t border-white/20 flex flex-col gap-1 text-[11px]">
          <div className="flex items-center gap-1.5 font-bold text-emerald-300">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>{t.rewardAccrued}</span>
          </div>
          <span className="text-white/70 text-[10px]">{t.guideUpdated}</span>
        </div>
      </section>

      {/* Daily Steps to Super Reward */}
      <section className="rounded-2xl bg-white border border-[#c3c6d7]/30 p-3.5 shadow-xs flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-[#131b2e]">{t.dailyStepsTitle}</h4>
          <span className="text-[10px] font-bold text-[#004ac6]">2/3</span>
        </div>
        <p className="text-[11px] text-[#737686] leading-snug">
          {t.dailyStepsRemaining}
        </p>
        <button
          onClick={() => onNavigate("practice")}
          className="mt-1 w-full py-2.5 rounded-xl bg-[#eaedff] text-[#004ac6] hover:bg-[#dbe1ff] text-xs font-bold transition-colors cursor-pointer"
        >
          {t.continueWithNewton}
        </button>
      </section>

      {/* Route Challenges */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#131b2e]">{t.challengesTitle}</h4>
            <p className="text-[10px] text-[#737686]">{t.challengesSubtitle}</p>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6]">
            {t.activeCount}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Challenge 1: Claimable */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#c3c6d7]/30 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">task_alt</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h5 className="text-xs font-bold text-[#131b2e]">
                    {t.challenges.challenge1Title}
                  </h5>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                    {t.challenges.challenge1Status}
                  </span>
                </div>
                <p className="text-[10px] text-[#737686] mt-0.5 leading-snug">
                  {t.challenges.challenge1Desc}
                </p>
              </div>
            </div>

            <button
              onClick={handleClaim}
              disabled={challenge1Claimed}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                challenge1Claimed
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer active:scale-95"
              }`}
            >
              {challenge1Claimed ? "✓" : t.challenges.claimBtn}
            </button>
          </div>

          {/* Challenge 2: In Progress */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#c3c6d7]/30 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-xl bg-blue-100 text-[#004ac6] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">fitness_center</span>
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#131b2e]">
                  {t.challenges.challenge2Title}
                </h5>
                <p className="text-[10px] text-[#737686] mt-0.5 leading-snug">
                  {t.challenges.challenge2Desc}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#004ac6] bg-[#eaedff] px-2 py-1 rounded-lg shrink-0">
              {t.challenges.stepRemaining}
            </span>
          </div>

          {/* Challenge 3: Weekly */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#c3c6d7]/30 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">track_changes</span>
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#131b2e]">
                  {t.challenges.challenge3Title}
                </h5>
                <p className="text-[10px] text-[#737686] mt-0.5 leading-snug">
                  {t.challenges.challenge3Desc}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded-lg shrink-0">
              {t.challenges.untilSun}
            </span>
          </div>
        </div>
      </section>

      {/* Rewards Store */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#131b2e]">{t.storeTitle}</h4>
            <p className="text-[10px] text-[#737686]">{t.storeSubtitle}</p>
          </div>
          <span className="text-xs font-extrabold text-[#004ac6]">
            {t.balanceLabel} {coins} NC
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {shopItems.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-white border border-[#c3c6d7]/30 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="size-8 rounded-lg bg-[#eaedff] text-[#004ac6] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#f2f3ff] text-[#434655]">
                    {item.badge}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-[#131b2e] leading-snug">{item.name}</h5>
                <p className="text-[10px] text-[#737686] mt-0.5 leading-snug">{item.desc}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#c3c6d7]/20 flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#004ac6]">{item.price} NC</span>
                <button
                  onClick={() => handleBuy(item)}
                  disabled={item.purchased}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    item.purchased
                      ? "bg-gray-100 text-gray-500"
                      : "bg-[#004ac6] text-white hover:bg-[#2563eb]"
                  }`}
                >
                  {item.purchased ? t.boughtBtn : t.buyBtn}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Big Prize Item */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#fbfaff] to-[#f0f3ff] border border-[#c3c6d7]/50 shadow-xs flex flex-col gap-2 mt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#131b2e]">{t.items.featuredTitle}</span>
            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {t.items.featuredBadge}
            </span>
          </div>
          <p className="text-[11px] text-[#737686] leading-snug">
            {t.items.featuredDesc}
          </p>
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex justify-between text-[10px] font-semibold text-[#434655]">
              <span>{t.items.featuredProgress}</span>
              <span className="text-[#004ac6] font-bold">{coins} / 1200 NC</span>
            </div>
            <div className="w-full bg-[#e2e7ff] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#2563eb] h-full rounded-full"
                style={{ width: `${Math.min(100, (coins / 1200) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#131b2e] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl">
          {toastMessage}
        </div>
      )}
    </div>
  );
};
