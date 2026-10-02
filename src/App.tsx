import { useState } from 'react';
import { ScanSearch, Loader2, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import type { AppState, ResumeAnalysis } from '@/types';
import { extractResumeText } from '@/lib/resumeParser';
import { analyzeResume } from '@/lib/scoringEngine';
import UploadZone from '@/components/UploadZone';
import ScoreResults from '@/components/ScoreResults';

export default function App() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progressStep, setProgressStep] = useState(0);

  const analyzeSteps = [
    'Extracting text & formatting',
    'Analyzing section architecture',
    'Categorizing technical & soft skills',
    'Scanning for action verbs & metrics',
    'Auditing contact channels & buzzwords',
    'Calculating ATS & job match score',
  ];

  const handleFileSelected = async (file: File, jobDescription?: string) => {
    setError(null);
    setAppState('analyzing');
    setProgressStep(0);

    try {
      const stepInterval = setInterval(() => {
        setProgressStep((prev) => (prev < analyzeSteps.length - 1 ? prev + 1 : prev));
      }, 400);

      const text = await extractResumeText(file);
      if (!text || text.trim().length < 20) {
        clearInterval(stepInterval);
        setError('Could not extract enough text from this document. Please check if the file is readable.');
        setAppState('upload');
        return;
      }

      await new Promise((r) => setTimeout(r, 600));
      clearInterval(stepInterval);
      setProgressStep(analyzeSteps.length - 1);

      const result = analyzeResume(text, file.name, file.size, jobDescription);
      await new Promise((r) => setTimeout(r, 350));

      setAnalysis(result);
      setAppState('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing your resume.');
      setAppState('upload');
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
    setProgressStep(0);
    setAppState('upload');
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <ScanSearch className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">ResumeScore</h1>
              <p className="text-xs text-slate-400 leading-tight">ATS Resume Analyzer</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline">100% Private — processed in your browser</span>
            <span className="sm:hidden">Private</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {appState === 'upload' && (
          <div className="space-y-10">
            {/* Hero */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold mb-5">
                <Zap className="w-3.5 h-3.5" />
                Instant ATS Analysis
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
                Check Your Resume's <span className="text-sky-600">ATS Score</span>
              </h2>
              <p className="text-slate-500 mt-4 text-base sm:text-lg leading-relaxed">
                Upload your resume and get an instant score with detailed feedback on how to improve it for Applicant Tracking Systems.
              </p>
            </div>

            {/* Feature badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { icon: ScanSearch, title: 'Deep Analysis', desc: '6 scoring categories evaluated' },
                { icon: TrendingUp, title: 'Actionable Tips', desc: 'Specific improvements for each category' },
                { icon: ShieldCheck, title: 'Fully Private', desc: 'Your resume never leaves your device' },
              ].map((f) => (
                <div key={f.title} className="bg-white rounded-xl border border-slate-200 p-5 text-center hover:shadow-md transition-shadow duration-200">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mx-auto mb-3">
                    <f.icon className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="font-semibold text-slate-700 text-sm">{f.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{f.desc}</p>
                </div>
              ))}
            </div>

            <UploadZone onFileSelected={handleFileSelected} error={error} />
          </div>
        )}

        {appState === 'analyzing' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-slate-200" />
              <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
              <Loader2 className="absolute inset-0 m-auto w-8 h-8 text-sky-500 animate-pulse" />
            </div>
            <div className="mt-8 w-full max-w-md space-y-3">
              {analyzeSteps.map((step, i) => (
                <div
                  key={step}
                  className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                    i <= progressStep ? 'text-slate-700 opacity-100' : 'text-slate-300 opacity-40'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors duration-300
                      ${i < progressStep ? 'bg-emerald-500 text-white' : i === progressStep ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-400'}`}
                  >
                    {i < progressStep ? '✓' : i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {appState === 'results' && analysis && (
          <ScoreResults
            analysis={analysis}
            onReset={handleReset}
            onUpdateAnalysis={(updated) => setAnalysis(updated)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 mt-8">
        <p className="text-center text-xs text-slate-400">
          ResumeScore — Your resume is analyzed locally and never uploaded to any server.
        </p>
      </footer>
    </div>
  );
}
