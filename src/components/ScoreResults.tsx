import { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  Copy,
  Download,
  FileText,
  Globe,
  LayoutGrid,
  Lightbulb,
  Linkedin,
  Mail,
  Phone,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Users,
  Wrench,
  XCircle,
} from 'lucide-react';
import type { ResumeAnalysis } from '@/types';
import ScoreGauge from './ScoreGauge';
import BulletOptimizer from './BulletOptimizer';

interface ScoreResultsProps {
  analysis: ResumeAnalysis;
  onReset: () => void;
  onUpdateAnalysis?: (updated: ResumeAnalysis) => void;
}

const config = {
  good: {
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bar: 'bg-emerald-500',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50/50',
    badge: 'bg-emerald-100 text-emerald-800',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-600',
    bar: 'bg-amber-500',
    border: 'border-amber-200',
    bg: 'bg-amber-50/50',
    badge: 'bg-amber-100 text-amber-800',
  },
  poor: {
    icon: XCircle,
    color: 'text-rose-600',
    bar: 'bg-rose-500',
    border: 'border-rose-200',
    bg: 'bg-rose-50/50',
    badge: 'bg-rose-100 text-rose-800',
  },
};

export default function ScoreResults({
  analysis,
  onReset,
  onUpdateAnalysis,
}: ScoreResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'risks' | 'skills' | 'bullets'>('overview');
  const [expanded, setExpanded] = useState<string | null>(analysis.categories[0]?.name ?? null);
  const [showText, setShowText] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateReportText = () => {
    return [
      `=========================================`,
      `  RESUMESCORE ATS ANALYSIS REPORT`,
      `=========================================`,
      `Resume File: ${analysis.fileName}`,
      `Word Count: ${analysis.wordCount} words`,
      `Overall ATS Score: ${analysis.overallScore} / 100`,
      analysis.jobMatch
        ? `Target Job Match: ${analysis.jobMatch.matchScore}% (${analysis.jobMatch.matchedKeywords.length} of ${analysis.jobMatch.totalJdKeywords} JD keywords matched)`
        : '',
      ``,
      `--- CATEGORY BREAKDOWN ---`,
      ...analysis.categories.map(
        (c) =>
          `[${c.status.toUpperCase()}] ${c.name}: ${c.score}/${c.maxScore}\nFeedback: ${c.feedback}\nTips:\n${c.tips.map((t) => `  - ${t}`).join('\n')}\n`
      ),
      `--- ATS FORMATTING & COMPATIBILITY RISKS ---`,
      ...analysis.formatRisks.map(
        (r) => `[${r.severity.toUpperCase()}] ${r.title}: ${r.description}\nRecommendation: ${r.recommendation}\n`
      ),
      `--- CONTACT INFO AUDIT ---`,
      `- Email: ${analysis.contactAudit.hasEmail ? `Verified (${analysis.contactAudit.email})` : 'Missing'}`,
      `- Phone: ${analysis.contactAudit.hasPhone ? `Verified (${analysis.contactAudit.phone})` : 'Missing'}`,
      `- LinkedIn: ${analysis.contactAudit.hasLinkedIn ? `Verified (${analysis.contactAudit.linkedIn})` : 'Missing'}`,
      `- Portfolio/GitHub: ${analysis.contactAudit.hasPortfolioOrGitHub ? `Verified (${analysis.contactAudit.portfolio})` : 'Missing'}`,
      ``,
      `--- SKILLS DETECTED (WITH SYNONYM MATCHING) ---`,
      `Technical: ${analysis.skillsBreakdown.technical.join(', ') || 'None'}`,
      `Tools: ${analysis.skillsBreakdown.tools.join(', ') || 'None'}`,
      `Soft Skills: ${analysis.skillsBreakdown.soft.join(', ') || 'None'}`,
      ``,
      analysis.buzzwords.length > 0
        ? `--- BUZZWORDS TO REPLACE ---\n${analysis.buzzwords.map((b) => `- "${b.word}" (${b.count}x): ${b.suggestion}`).join('\n')}\n`
        : '',
      `--- RECOMMENDED KEYWORDS TO ADD ---`,
      analysis.missingKeywords.join(', '),
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(generateReportText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadReport = () => {
    const text = generateReportText();
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ATS-Report-${analysis.fileName.replace(/\.[^/.]+$/, '')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const criticalRisksCount = analysis.formatRisks.filter((r) => r.severity === 'critical').length;
  const warningRisksCount = analysis.formatRisks.filter((r) => r.severity === 'warning').length;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Top Overview Card */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row">
          <ScoreGauge score={analysis.overallScore} maxScore={100} />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Your ATS Resume Score</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Analysis of <strong className="font-semibold text-slate-700">{analysis.fileName}</strong> •{' '}
                  {analysis.wordCount} words
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-400" />
                      <span>Copy Report</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <Download className="h-3.5 w-3.5 text-slate-400" />
                  <span>Download .md</span>
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50/75 p-3 text-center sm:text-left">
                <span className="block text-xs font-medium text-slate-400">Total Skills</span>
                <strong className="text-lg font-bold text-emerald-600">
                  {analysis.detectedKeywords.length}
                </strong>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/75 p-3 text-center sm:text-left">
                <span className="block text-xs font-medium text-slate-400">Suggested Terms</span>
                <strong className="text-lg font-bold text-amber-600">
                  {analysis.missingKeywords.length}
                </strong>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/75 p-3 text-center sm:text-left">
                <span className="block text-xs font-medium text-slate-400">Formatting Hazards</span>
                <strong
                  className={`text-lg font-bold ${
                    criticalRisksCount > 0
                      ? 'text-rose-600'
                      : warningRisksCount > 0
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {criticalRisksCount + warningRisksCount}
                </strong>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/75 p-3 text-center sm:text-left">
                <span className="block text-xs font-medium text-slate-400">Word Count</span>
                <strong className="text-lg font-bold text-slate-700">{analysis.wordCount}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Job Match Banner (if JD provided) */}
      {analysis.jobMatch && (
        <section className="rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white shadow-md shadow-sky-600/20">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">
                  Target Job Match: <span className="text-sky-600">{analysis.jobMatch.matchScore}%</span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Matched {analysis.jobMatch.matchedKeywords.length} of {analysis.jobMatch.totalJdKeywords}{' '}
                  key terms (including synonyms & aliases) from target job description
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-800 border border-sky-200 shadow-sm">
                {analysis.jobMatch.matchScore >= 75
                  ? '🎯 High Alignment'
                  : analysis.jobMatch.matchScore >= 50
                  ? '⚡ Moderate Match'
                  : '⚠️ Needs Tailoring'}
              </span>
            </div>
          </div>

          {analysis.jobMatch.missingKeywords.length > 0 && (
            <div className="mt-4 pt-4 border-t border-sky-200/60">
              <span className="text-xs font-semibold text-slate-700 block mb-2">
                Missing keywords required by this job description:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.jobMatch.missingKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Scorecard & Pillars', icon: LayoutGrid },
          {
            id: 'risks',
            label: 'ATS Compatibility & Risks',
            icon: ShieldAlert,
            badge: criticalRisksCount > 0 ? `${criticalRisksCount} critical` : undefined,
          },
          { id: 'skills', label: 'Skills & Alias Matrix', icon: Code2 },
          { id: 'bullets', label: 'Bullet Optimizer & Live Editor', icon: Sparkles, highlight: true },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : tab.highlight
                  ? 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="rounded-full bg-rose-500 text-white text-[10px] px-1.5 py-0.2">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & PILLARS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Contact & Professional Audit */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Contact & Profile Audit</h3>
            <p className="text-xs text-slate-500 mb-4">
              ATS parsers must reliably extract your candidate contact channels.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className={`flex items-center gap-3 rounded-xl border p-3.5 ${
                  analysis.contactAudit.hasEmail
                    ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                    : 'border-rose-200 bg-rose-50/40 text-rose-900'
                }`}
              >
                <Mail className="h-5 w-5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase">Email Address</span>
                  <span className="truncate block text-xs">
                    {analysis.contactAudit.hasEmail ? analysis.contactAudit.email : 'Missing Email'}
                  </span>
                </div>
                {analysis.contactAudit.hasEmail ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-500" />
                )}
              </div>

              <div
                className={`flex items-center gap-3 rounded-xl border p-3.5 ${
                  analysis.contactAudit.hasPhone
                    ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                    : 'border-rose-200 bg-rose-50/40 text-rose-900'
                }`}
              >
                <Phone className="h-5 w-5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase">Phone Number</span>
                  <span className="truncate block text-xs">
                    {analysis.contactAudit.hasPhone ? analysis.contactAudit.phone : 'Missing Phone'}
                  </span>
                </div>
                {analysis.contactAudit.hasPhone ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-500" />
                )}
              </div>

              <div
                className={`flex items-center gap-3 rounded-xl border p-3.5 ${
                  analysis.contactAudit.hasLinkedIn
                    ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                    : 'border-amber-200 bg-amber-50/40 text-amber-900'
                }`}
              >
                <Linkedin className="h-5 w-5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase">LinkedIn Profile</span>
                  <span className="truncate block text-xs">
                    {analysis.contactAudit.hasLinkedIn
                      ? analysis.contactAudit.linkedIn
                      : 'Recommended to add LinkedIn link'}
                  </span>
                </div>
                {analysis.contactAudit.hasLinkedIn ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                )}
              </div>

              <div
                className={`flex items-center gap-3 rounded-xl border p-3.5 ${
                  analysis.contactAudit.hasPortfolioOrGitHub
                    ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <Globe className="h-5 w-5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase">Portfolio / GitHub</span>
                  <span className="truncate block text-xs">
                    {analysis.contactAudit.hasPortfolioOrGitHub
                      ? analysis.contactAudit.portfolio
                      : 'Optional / Recommended for tech roles'}
                  </span>
                </div>
                {analysis.contactAudit.hasPortfolioOrGitHub ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <span className="text-xs text-slate-400">Optional</span>
                )}
              </div>
            </div>
          </section>

          {/* Buzzwords & Cliché Alerts (if any) */}
          {analysis.buzzwords.length > 0 && (
            <section className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2 text-amber-900 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h3 className="text-lg font-bold">Clichés & Overused Buzzwords Detected</h3>
              </div>
              <p className="text-xs text-amber-800/80 mb-4">
                Recruiters and ATS scanners prefer concrete deliverables and metrics over generic self-descriptions.
              </p>

              <div className="space-y-2.5">
                {analysis.buzzwords.map((item) => (
                  <div
                    key={item.word}
                    className="rounded-xl border border-amber-200 bg-white p-3.5 text-sm shadow-xs"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-rose-700">"{item.word}"</span>
                      <span className="text-[11px] rounded bg-amber-100 px-1.5 py-0.5 text-amber-800 font-medium">
                        {item.count}x in resume
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 flex items-start gap-1.5 mt-1">
                      <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{item.suggestion}</span>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Score Breakdown Accordion */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-1 text-lg font-bold text-slate-800">Detailed ATS Scoring Pillars</h3>
            <p className="mb-5 text-xs text-slate-500">
              Click any scoring pillar to view personalized advice and actionable improvement tips.
            </p>

            <div className="space-y-3">
              {analysis.categories.map((item) => {
                const itemConfig = config[item.status];
                const Icon = itemConfig.icon;
                const isOpen = expanded === item.name;

                return (
                  <div
                    key={item.name}
                    className={`overflow-hidden rounded-xl border transition-all ${itemConfig.border} ${
                      isOpen ? itemConfig.bg : 'bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <button
                      type="button"
                      className="flex w-full items-center gap-4 p-4 text-left focus:outline-none"
                      onClick={() => setExpanded(isOpen ? null : item.name)}
                    >
                      <Icon className={`h-6 w-6 shrink-0 ${itemConfig.color}`} />
                      <div className="min-w-0 flex-1">
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <span className="font-semibold text-slate-800">{item.name}</span>
                          <span className={`text-sm font-bold ${itemConfig.color}`}>
                            {item.score} / {item.maxScore}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-200/80">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${itemConfig.bar}`}
                            style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                          />
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-slate-600' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-200/70 px-5 pb-5 pt-3">
                        <p className="text-sm font-medium text-slate-700">{item.feedback}</p>
                        {item.tips.map((tip) => (
                          <p key={tip} className="mt-2.5 flex items-start gap-2.5 text-sm text-slate-600">
                            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                            <span>{tip}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: ATS COMPATIBILITY & RISKS */}
      {activeTab === 'risks' && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert className="h-5 w-5 text-sky-600" />
              <h3 className="text-lg font-bold text-slate-800">ATS Parsing & Formatting Hazard Audit</h3>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Evaluation of technical document traps (tables, columns, dates, encoding, symbols) that cause ATS parsers like Workday, Taleo, and Greenhouse to misparse resumes.
            </p>

            <div className="space-y-3.5">
              {analysis.formatRisks.map((risk) => (
                <div
                  key={risk.id}
                  className={`p-4 rounded-xl border transition-all ${
                    risk.severity === 'critical'
                      ? 'border-rose-200 bg-rose-50/50'
                      : risk.severity === 'warning'
                      ? 'border-amber-200 bg-amber-50/50'
                      : 'border-emerald-200 bg-emerald-50/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {risk.severity === 'critical' ? (
                      <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                    ) : risk.severity === 'warning' ? (
                      <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-800 text-sm">{risk.title}</span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            risk.severity === 'critical'
                              ? 'bg-rose-200 text-rose-800'
                              : risk.severity === 'warning'
                              ? 'bg-amber-200 text-amber-800'
                              : 'bg-emerald-200 text-emerald-800'
                          }`}
                        >
                          {risk.severity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{risk.description}</p>
                      <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-start gap-1.5 text-xs text-slate-700">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="font-medium">{risk.recommendation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pro Tips Box */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Legacy ATS Golden Rules
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                <li>Never use 2-column or 3-column table layouts for core work experience.</li>
                <li>Avoid putting contact info exclusively inside Microsoft Word header/footer zones.</li>
                <li>Use clean font families like Calibri, Arial, Helvetica, or Georgia.</li>
              </ul>
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: SKILLS & ALIAS MATRIX */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-slate-800">Skills Inventory & Synonym Mapping</h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {analysis.detectedKeywords.length} Detected
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Skills recognized through exact terms and alias normalization (e.g., K8s $\leftrightarrow$ Kubernetes, Postgres $\leftrightarrow$ PostgreSQL, Node.js $\leftrightarrow$ NodeJS).
            </p>

            <div className="space-y-5">
              {/* Technical */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  <Code2 className="h-4 w-4 text-sky-600" />
                  <span>Technical & Engineering Skills ({analysis.skillsBreakdown.technical.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.skillsBreakdown.technical.length > 0 ? (
                    analysis.skillsBreakdown.technical.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-800 shadow-xs"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No primary technical skills detected</span>
                  )}
                </div>
              </div>

              {/* Tools & Frameworks */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  <Wrench className="h-4 w-4 text-indigo-600" />
                  <span>Tools & Platforms ({analysis.skillsBreakdown.tools.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.skillsBreakdown.tools.length > 0 ? (
                    analysis.skillsBreakdown.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-800 shadow-xs"
                      >
                        {tool}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No tools detected</span>
                  )}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  <Users className="h-4 w-4 text-teal-600" />
                  <span>Soft Skills & Leadership ({analysis.skillsBreakdown.soft.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.skillsBreakdown.soft.length > 0 ? (
                    analysis.skillsBreakdown.soft.map((soft) => (
                      <span
                        key={soft}
                        className="rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-800 shadow-xs"
                      >
                        {soft}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No soft skills detected</span>
                  )}
                </div>
              </div>

              {/* Recommended Terms to add */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-2">
                  Recommended Industry Keywords to Consider
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.missingKeywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800"
                    >
                      + {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 4: INTERACTIVE BULLET OPTIMIZER & LIVE RESUME RE-SCORER */}
      {activeTab === 'bullets' && (
        <BulletOptimizer
          analysis={analysis}
          onUpdateAnalysis={(updated) => onUpdateAnalysis?.(updated)}
        />
      )}

      {/* Extracted text accordion */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <button
          type="button"
          className="flex w-full items-center gap-3 text-left focus:outline-none"
          onClick={() => setShowText(!showText)}
        >
          <FileText className="h-5 w-5 text-slate-400" />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-800">Raw Extracted Text Preview</h3>
            <p className="text-xs text-slate-400">Inspect the text exactly as the ATS parser reads it</p>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
              showText ? 'rotate-180' : ''
            }`}
          />
        </button>
        {showText && (
          <div className="mt-4">
            <pre className="max-h-80 overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-700">
              {analysis.extractedText}
            </pre>
          </div>
        )}
      </section>

      {/* Action Button */}
      <button
        type="button"
        onClick={onReset}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 py-4 font-semibold text-white shadow-md shadow-sky-600/20 transition hover:from-sky-700 hover:to-blue-700 hover:-translate-y-0.5 active:translate-y-0"
      >
        <RotateCcw className="h-5 w-5" /> Analyze Another Resume
      </button>
    </div>
  );
}
