export interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
  status: 'good' | 'warning' | 'poor';
  feedback: string;
  tips: string[];
}

export interface ContactAudit {
  hasEmail: boolean;
  email?: string;
  hasPhone: boolean;
  phone?: string;
  hasLinkedIn: boolean;
  linkedIn?: string;
  hasPortfolioOrGitHub: boolean;
  portfolio?: string;
}

export interface BuzzwordAlert {
  word: string;
  count: number;
  suggestion: string;
}

export interface SkillsBreakdown {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface JobMatchResult {
  jobTitle?: string;
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  totalJdKeywords: number;
}

export interface FormatRiskAlert {
  id: string;
  severity: 'critical' | 'warning' | 'safe';
  category: 'dates' | 'symbols' | 'sections' | 'length' | 'contact';
  title: string;
  description: string;
  recommendation: string;
}

export interface BulletAssessment {
  text: string;
  score: number;
  hasActionVerb: boolean;
  detectedVerb?: string;
  hasMetric: boolean;
  metricSnippet?: string;
  hasCliché: boolean;
  clichéWord?: string;
  wordCount: number;
  lengthStatus: 'too_short' | 'ideal' | 'too_long';
  suggestions: string[];
  improvedVersion?: string;
}

export interface ResumeAnalysis {
  overallScore: number;
  categories: ScoreCategory[];
  extractedText: string;
  wordCount: number;
  detectedKeywords: string[];
  missingKeywords: string[];
  fileName: string;
  fileSize: number;
  contactAudit: ContactAudit;
  buzzwords: BuzzwordAlert[];
  skillsBreakdown: SkillsBreakdown;
  jobMatch?: JobMatchResult | null;
  formatRisks: FormatRiskAlert[];
  extractedBullets: string[];
  rawJobDescription?: string;
}

export type AppState = 'upload' | 'analyzing' | 'results';
