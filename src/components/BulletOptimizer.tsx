import { useState } from 'react';
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Copy,
  Flame,
  HelpCircle,
  Lightbulb,
  Pencil,
  RefreshCw,
  Sparkles,
  Wand2,
} from 'lucide-react';
import type { ResumeAnalysis } from '@/types';
import { assessBulletPoint, analyzeResume } from '@/lib/scoringEngine';

interface BulletOptimizerProps {
  analysis: ResumeAnalysis;
  onUpdateAnalysis: (updated: ResumeAnalysis) => void;
}

export default function BulletOptimizer({ analysis, onUpdateAnalysis }: BulletOptimizerProps) {
  const [selectedBullet, setSelectedBullet] = useState<string>(
    analysis.extractedBullets[0] ?? 'Engineered scalable backend microservices using Node.js and PostgreSQL, reducing API latency by 45%.'
  );
  const [customBullet, setCustomBullet] = useState<string>(selectedBullet);
  const [liveResumeText, setLiveResumeText] = useState<string>(analysis.extractedText);
  const [isEditingFullResume, setIsEditingFullResume] = useState(false);
  const [copied, setCopied] = useState(false);
  const [recalculating, setRecalculating] = useState(false);

  const assessment = assessBulletPoint(customBullet);

  const handleSelectBullet = (bullet: string) => {
    setSelectedBullet(bullet);
    setCustomBullet(bullet);
  };

  const handleCopyBullet = async () => {
    try {
      await navigator.clipboard.writeText(customBullet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleApplyTemplate = (template: string) => {
    setCustomBullet(template);
  };

  const handleLiveRecalculate = () => {
    setRecalculating(true);
    setTimeout(() => {
      const newAnalysis = analyzeResume(
        liveResumeText,
        analysis.fileName,
        analysis.fileSize,
        analysis.rawJobDescription
      );
      onUpdateAnalysis(newAnalysis);
      setRecalculating(false);
    }, 400);
  };

  const formulas = [
    {
      title: 'Google XYZ Formula',
      desc: 'Accomplished [X] as measured by [Y], by doing [Z]',
      template: 'Scaled core payment API throughput by 40% across 1.2M daily users by migrating monolith to Go microservices.',
    },
    {
      title: 'Cost & Efficiency Formula',
      desc: 'Action Verb + What + Numeric Savings/Time Saved + Tech',
      template: 'Automated CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycle duration from 4 hours to 15 minutes.',
    },
    {
      title: 'Leadership & Collaboration',
      desc: 'Mentored/Led + Team Size + Project Outcome + Business Value',
      template: 'Led a cross-functional team of 6 engineers to deliver customer analytics dashboard 2 weeks ahead of schedule, driving $150k ARR.',
    },
    {
      title: 'Optimization & Quality',
      desc: 'Refactored/Optimized + Metric Improvement + Testing/Tools',
      template: 'Architected comprehensive automated testing suite with Vitest and Cypress, improving test coverage from 45% to 92% and cutting bug escapes by 60%.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white shadow-md shadow-sky-600/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Interactive Bullet Point Optimizer</h3>
            <p className="text-xs text-slate-600">
              Audit individual experience statements against Google's XYZ formula (Action Verb + Quantifiable Metric + Context).
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Selector & Live Editor */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Extracted Resume Bullets
              </label>
              <span className="text-[11px] text-slate-400">Click to load & optimize</span>
            </div>

            {analysis.extractedBullets.length > 0 ? (
              <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
                {analysis.extractedBullets.map((b, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectBullet(b)}
                    className={`text-left text-xs p-2.5 rounded-lg border transition-all ${
                      selectedBullet === b
                        ? 'border-sky-500 bg-sky-50 font-medium text-sky-900 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    • {b}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                No distinct experience bullets identified. Type or paste your own statement below.
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Pencil className="h-3.5 w-3.5 text-sky-600" />
                  Edit / Test Statement
                </label>
                <button
                  type="button"
                  onClick={handleCopyBullet}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" />
                  {copied ? <span className="text-emerald-600 font-semibold">Copied!</span> : 'Copy Bullet'}
                </button>
              </div>

              <textarea
                value={customBullet}
                onChange={(e) => setCustomBullet(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                placeholder="Type or paste a resume bullet point to evaluate..."
              />

              <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                <span>{customBullet.trim().split(/\s+/).filter(Boolean).length} words</span>
                <span className="flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 text-amber-500" />
                  Target: 15–30 words with 1 metric
                </span>
              </div>
            </div>
          </div>

          {/* Quick Power Formula Templates */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-3">
              <Wand2 className="h-4 w-4 text-indigo-600" />
              High-Impact Formula Presets
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {formulas.map((f, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-200 transition text-left flex flex-col justify-between group cursor-pointer"
                  onClick={() => handleApplyTemplate(f.template)}
                >
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block group-hover:text-indigo-700">
                      {f.title}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{f.desc}</p>
                  </div>
                  <span className="text-[10px] text-indigo-600 font-semibold mt-2 block">
                    Use Formula →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Bullet Assessment Scorecard */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-800">Bullet Impact Score</h4>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  assessment.score >= 80
                    ? 'bg-emerald-100 text-emerald-800'
                    : assessment.score >= 50
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {assessment.score} / 100
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              {/* Action Verb */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                {assessment.hasActionVerb ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold text-slate-800 block">
                    Action Verb: {assessment.hasActionVerb ? `"${assessment.detectedVerb}" (Strong)` : 'Missing Power Verb'}
                  </span>
                  <p className="text-slate-500 mt-0.5">
                    {assessment.hasActionVerb
                      ? 'Begins with an active, leadership-oriented past-tense verb.'
                      : 'Avoid passive starts ("Responsible for"). Start with "Spearheaded", "Engineered", etc.'}
                  </p>
                </div>
              </div>

              {/* Quantifiable Metric */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                {assessment.hasMetric ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold text-slate-800 block">
                    Quantifiable Metric: {assessment.hasMetric ? `"${assessment.metricSnippet}"` : 'No Metrics Found'}
                  </span>
                  <p className="text-slate-500 mt-0.5">
                    {assessment.hasMetric
                      ? 'Great quantifiable evidence demonstrating measurable business impact.'
                      : 'Add numbers, %, $, scale, latency reduction, or team size.'}
                  </p>
                </div>
              </div>

              {/* Cliché / Buzzword */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                {!assessment.hasCliché ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold text-slate-800 block">
                    Buzzwords & Fluff: {!assessment.hasCliché ? 'Clean' : `"${assessment.clichéWord}" detected`}
                  </span>
                  <p className="text-slate-500 mt-0.5">
                    {!assessment.hasCliché
                      ? 'No overused clichés detected.'
                      : 'Replace buzzword with concrete technical accomplishments.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Suggestions list */}
            {assessment.suggestions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                  Improvement Advice
                </span>
                <div className="space-y-1.5">
                  {assessment.suggestions.map((s, i) => (
                    <p key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="text-sky-600">•</span> {s}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Resume Recalculator Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-sky-600" />
              Live Resume Re-Scorer & Editor
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit or add missing keywords into the parsed text below, then recalculate your full ATS score in real time.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsEditingFullResume(!isEditingFullResume)}
            className="text-xs font-medium text-sky-600 hover:text-sky-700 self-start sm:self-auto"
          >
            {isEditingFullResume ? 'Collapse Editor' : 'Open Full Resume Editor'}
          </button>
        </div>

        {isEditingFullResume && (
          <div className="space-y-3">
            <textarea
              value={liveResumeText}
              onChange={(e) => setLiveResumeText(e.target.value)}
              rows={8}
              className="w-full rounded-xl border border-slate-200 p-3.5 font-mono text-xs text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              placeholder="Full resume text..."
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {liveResumeText.trim().split(/\s+/).filter(Boolean).length} total words
              </span>
              <button
                type="button"
                onClick={handleLiveRecalculate}
                disabled={recalculating}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white text-xs font-semibold shadow hover:from-sky-700 hover:to-blue-700 disabled:opacity-50 transition"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${recalculating ? 'animate-spin' : ''}`} />
                {recalculating ? 'Recalculating...' : 'Recalculate ATS Score Live'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
