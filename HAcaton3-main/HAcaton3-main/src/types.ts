export type Language = "kz" | "ru" | "en";

export type NavTab =
  | "home"
  | "chat"
  | "knowledge"
  | "practice"
  | "agent"
  | "rewards"
  | "leaderboard";

export type CognitiveStyle = "analogy" | "algorithm" | "blitz";

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  city: string;
  school: string;
  grade: number;
  xp: number;
  coins: number;
  streak: number;
  tasksSolved: number;
  rank: number;
  change: number; // e.g. +2, 0, -1
  badge?: string;
  isCurrentUser?: boolean;
}

export interface StudentProfile {
  name: string;
  level: number;
  xp: number;
  coins: number; // Newton Coins (NC)
  streakDays: number;
  dailyGoalPercent: number;
  language: Language;
  bilingualSTEM: boolean;
  cognitiveStyle: CognitiveStyle;
  socraticLevel: number; // 0 - 100
  gentlePace: boolean;
  interests: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "tutor";
  text: string;
  time: string;
  modeBadge?: string;
  analogyBox?: {
    title: string;
    description?: string;
    warning?: string;
    leftLabel: string;
    leftValue: string;
    leftNote: string;
    rightLabel: string;
    rightValue: string;
    rightNote: string;
    result: string;
  };
  quizChallenge?: {
    id: string;
    question: string;
    formula?: string;
    options: { id: string; text: string; correct?: boolean }[];
    answered?: string;
    explanation?: string;
    stepByStepSolution?: string[];
    grade?: string;
    subject?: string;
    topic?: string;
    xpReward?: number;
  };
  isAiGenerated?: boolean;
}

export interface PracticeQuestion {
  id: string;
  subject: string;
  grade: string;
  topic: string;
  subtopic: string;
  questionText: string;
  conditionText?: string;
  formulaDisplay: {
    numeratorLeft: string;
    denominatorLeft: string;
    operator: string;
    numeratorRight: string;
    denominatorRight: string;
  };
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  hint: string;
  stepByStepSolution: string[];
  xpReward: number;
  difficulty: "adaptive_medium" | "easy" | "hard";
}

export interface KnowledgeNode {
  id: string;
  title: string;
  subtitle: string;
  status: "mastered" | "critical_gap" | "partial" | "locked";
  percentage: number;
  badge?: string;
  blockCount?: number;
  warningNote?: string;
  accuracy?: number;
}

export interface ShopItem {
  id: string;
  name: string;
  desc: string;
  category: "skin" | "protection" | "boost" | "raffle" | "real_perk";
  price: number;
  icon: string;
  badge: string;
  imageUrl?: string;
  purchased: boolean;
  totalGoal?: number;
  accumulated?: number;
}

export interface RouteChallenge {
  id: string;
  title: string;
  desc: string;
  rewardNC: number;
  rewardXP?: number;
  badge?: string;
  status: "claimable" | "in_progress" | "weekly_epic" | "claimed";
  progress?: { current: number; total: number };
}
