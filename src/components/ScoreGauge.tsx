import { useEffect, useState } from 'react';

interface ScoreGaugeProps { score: number; maxScore: number; }

export default function ScoreGauge({ score, maxScore }: ScoreGaugeProps) {
  const [value, setValue] = useState(0);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const percentage = score / maxScore;
  const color = percentage >= 0.75 ? '#10b981' : percentage >= 0.5 ? '#f59e0b' : '#ef4444';
  const label = percentage >= 0.75 ? 'Excellent' : percentage >= 0.5 ? 'Good' : 'Needs Work';

  useEffect(() => {
    const timer = window.setTimeout(() => setValue(score), 50);
    return () => window.clearTimeout(timer);
  }, [score]);

  return <div className="relative flex flex-col items-center"><svg className="-rotate-90" width="200" height="200"><circle cx="100" cy="100" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="14" /><circle cx="100" cy="100" r={radius} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - (value / maxScore) * circumference} style={{ transition: 'stroke-dashoffset 1.2s ease-out' }} /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><strong className="text-5xl font-bold" style={{ color }}>{value}</strong><span className="text-sm text-slate-400">out of {maxScore}</span><span className="mt-2 rounded-full px-3 py-1 text-xs font-semibold" style={{ color, backgroundColor: `${color}1a` }}>{label}</span></div></div>;
}
