// 프로젝트 공통 타입 정의
export type QuestionCategory = "tech" | "behavioral" | "cs";

export type SessionWithQuestions = {
  id: string;
  jobTitle: string;
  jdText: string;
  createdAt: Date;
  questions: Question[];
};

export type Question = {
  id: string;
  content: string;
  category: QuestionCategory;
  order: number;
  answer?: Answer | null;
};

export type Answer = {
  id: string;
  content: string;
  createdAt: Date;
  feedback?: Feedback | null;
};

export type Feedback = {
  id: string;
  strengths: string;
  improvements: string;
  modelAnswer: string;
  score: number;
};
