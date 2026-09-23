import React, { useState, useEffect } from "react";
import { Language, NavTab, CognitiveStyle } from "./types";
import { TopHeader } from "./components/TopHeader";
import { BottomNav } from "./components/BottomNav";
import { LanguageOnboarding } from "./components/LanguageOnboarding";
import { HomeScreen } from "./components/HomeScreen";
import { TutorChatScreen } from "./components/TutorChatScreen";
import { KnowledgeMapScreen } from "./components/KnowledgeMapScreen";
import { PracticeScreen } from "./components/PracticeScreen";
import { AgentScreen } from "./components/AgentScreen";
import { RewardsScreen } from "./components/RewardsScreen";
import { LeaderboardScreen } from "./components/LeaderboardScreen";

export default function App() {
  // Load persisted language from localStorage or default to Russian
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("ai_tutor_language");
    return saved === "kz" || saved === "ru" || saved === "en" ? saved : "ru";
  });

  const [isOnboarding, setIsOnboarding] = useState<boolean>(() => {
    return localStorage.getItem("ai_tutor_onboarding_done") !== "true";
  });

  const [currentTab, setCurrentTab] = useState<NavTab>("home");
  const [navContext, setNavContext] = useState<{
    subject?: string;
    topic?: string;
    prompt?: string;
    grade?: number;
    autoOpenGuide?: boolean;
  } | null>(null);

  const [coins, setCoins] = useState<number>(420);
  const [xp, setXp] = useState<number>(1420);
  const [streak] = useState<number>(7);
  const [level, setLevel] = useState<number>(14);

  const [bilingualSTEM, setBilingualSTEM] = useState<boolean>(true);
  const [cognitiveStyle, setCognitiveStyle] = useState<CognitiveStyle>("analogy");
  const [socraticLevel, setSocraticLevel] = useState<number>(85);
  const [gentlePace, setGentlePace] = useState<boolean>(true);
  const [interests, setInterests] = useState<string[]>(["football", "videogames"]);

  // Keep localStorage in sync with selected language
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("ai_tutor_language", lang);
  };

  const handleCompleteOnboarding = () => {
    setIsOnboarding(false);
    localStorage.setItem("ai_tutor_onboarding_done", "true");
  };

  const handleAddXP = (amount: number) => {
    setXp((prev) => {
      const next = prev + amount;
      if (next >= 1500 && level === 14) {
        setLevel(15);
      }
      return next;
    });
  };

  const handleAddCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
  };

  const handleNavigate = (
    tab: NavTab,
    context?: { subject?: string; topic?: string; prompt?: string; grade?: number; autoOpenGuide?: boolean }
  ) => {
    if (context) {
      setNavContext(context);
    }
    setCurrentTab(tab);
  };

  const handleBuyItem = (price: number): boolean => {
    if (coins >= price) {
      setCoins((prev) => prev - price);
      return true;
    }
    return false;
  };

  const handleToggleInterest = (item: string) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // If onboarding is active, render the language onboarding screen
  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-[#ffffff] font-sans antialiased text-[#131b2e] flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-white shadow-xl min-h-screen flex flex-col">
          <LanguageOnboarding
            selectedLanguage={language}
            onSelectLanguage={handleLanguageChange}
            bilingualSTEM={bilingualSTEM}
            onToggleBilingual={() => setBilingualSTEM(!bilingualSTEM)}
            onComplete={handleCompleteOnboarding}
            onSkip={handleCompleteOnboarding}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f2f8] font-sans antialiased text-[#131b2e] flex flex-col justify-start items-center">
      {/* Container constrained to mobile app layout width as shown in screenshot designs */}
      <div className="w-full max-w-md min-h-screen bg-[#faf8ff] shadow-xl relative flex flex-col">
        {/* Top Header with live stats, leaderboard toggle and quick language switch */}
        <TopHeader
          currentTab={currentTab}
          language={language}
          onLanguageChange={handleLanguageChange}
          coins={coins}
          xp={xp}
          streak={streak}
          level={level}
          onNavigate={handleNavigate}
          onOpenSettings={() => setIsOnboarding(true)}
        />

        {/* Tab Views */}
        <main className="flex-1 overflow-x-hidden">
          {currentTab === "home" && (
            <HomeScreen
              language={language}
              onNavigate={handleNavigate}
              coins={coins}
              xp={xp}
              streak={streak}
              level={level}
            />
          )}

          {currentTab === "chat" && (
            <TutorChatScreen
              language={language}
              cognitiveStyle={cognitiveStyle}
              onChangeStyle={setCognitiveStyle}
              onAddXP={handleAddXP}
              socraticLevel={socraticLevel}
              initialPrompt={navContext?.prompt}
              initialSubject={navContext?.subject}
            />
          )}

          {currentTab === "knowledge" && (
            <KnowledgeMapScreen
              language={language}
              onNavigate={handleNavigate}
              onAddXP={handleAddXP}
              onAddCoins={handleAddCoins}
            />
          )}

          {currentTab === "practice" && (
            <PracticeScreen
              language={language}
              onNavigate={handleNavigate}
              onAddXP={handleAddXP}
              onAddCoins={handleAddCoins}
              targetSubject={navContext?.subject}
              targetTopic={navContext?.topic}
              targetGrade={navContext?.grade}
              initialOpenGuide={navContext?.autoOpenGuide}
            />
          )}

          {currentTab === "agent" && (
            <AgentScreen
              language={language}
              cognitiveStyle={cognitiveStyle}
              onChangeStyle={setCognitiveStyle}
              socraticLevel={socraticLevel}
              onChangeSocratic={setSocraticLevel}
              gentlePace={gentlePace}
              onToggleGentlePace={() => setGentlePace(!gentlePace)}
              interests={interests}
              onToggleInterest={handleToggleInterest}
              onSaveNotification={() => {}}
            />
          )}

          {currentTab === "rewards" && (
            <RewardsScreen
              language={language}
              coins={coins}
              streak={streak}
              onNavigate={(tab) => setCurrentTab(tab)}
              onClaimChallenge={handleAddCoins}
              onBuyItem={handleBuyItem}
            />
          )}

          {currentTab === "leaderboard" && (
            <LeaderboardScreen
              language={language}
              onNavigate={handleNavigate}
              xp={xp}
              coins={coins}
              streak={streak}
              level={level}
              onAddXP={handleAddXP}
            />
          )}
        </main>

        {/* Global Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          language={language}
        />
      </div>
    </div>
  );
}
