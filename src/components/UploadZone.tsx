import { useRef, useState } from 'react';
import {
  AlertCircle,
  Briefcase,
  ChevronDown,
  FileText,
  Sparkles,
  UploadCloud,
  X,
} from 'lucide-react';

interface UploadZoneProps {
  onFileSelected: (file: File, jobDescription?: string) => void;
  error: string | null;
}

export default function UploadZone({ onFileSelected, error: externalError }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showJdInput, setShowJdInput] = useState(false);
  const [jobDescription, setJobDescription] = useState('');

  const choose = (nextFile: File | undefined) => {
    if (!nextFile) return;
    setLocalError(null);
    const lower = nextFile.name.toLowerCase();
    const valid =
      nextFile.type === 'application/pdf' ||
      nextFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      nextFile.type === 'text/plain' ||
      /\.(pdf|docx|txt)$/i.test(lower);

    if (valid) {
      setFile(nextFile);
    } else {
      setFile(null);
      setLocalError(
        `"${nextFile.name}" is not supported. Please upload a PDF (.pdf), Word (.docx), or Plain Text (.txt) file.`
      );
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setLocalError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const activeError = localError || externalError;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">
      {/* File Drop Area */}
      <div
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all sm:p-12 ${
          dragging
            ? 'scale-[1.01] border-sky-500 bg-sky-50/80 shadow-inner'
            : file
              ? 'border-emerald-400 bg-emerald-50/50 shadow-sm'
              : 'border-slate-300 bg-white hover:border-sky-400 hover:bg-sky-50/20 shadow-sm'
        }`}
        onClick={() => !file && inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          choose(event.dataTransfer.files[0]);
        }}
      >
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          onChange={(event) => choose(event.target.files?.[0])}
        />
        {file ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
              <FileText className="h-8 w-8" />
            </div>
            <div>
              <p className="max-w-md truncate font-semibold text-slate-800 text-base">{file.name}</p>
              <p className="mt-1 text-sm text-slate-500">
                {(file.size / 1024).toFixed(1)} KB • {file.name.split('.').pop()?.toUpperCase()} Document
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition"
              onClick={handleClear}
            >
              <X className="h-4 w-4" /> Change file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
              <UploadCloud className="h-8 w-8" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-800">Drop your resume here</p>
              <p className="mt-1 text-sm text-slate-500">or click to browse from device</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['PDF (.pdf)', 'Word (.docx)', 'Plain Text (.txt)'].map((fmt) => (
                <span
                  key={fmt}
                  className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Optional Job Description Matcher toggle */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <button
          type="button"
          className="flex w-full items-center justify-between text-left focus:outline-none"
          onClick={() => setShowJdInput(!showJdInput)}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-semibold text-slate-800">
                Target Job Description Matching
              </span>
              <span className="ml-2 rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">
                Optional
              </span>
              <p className="text-xs text-slate-400">
                Paste a job posting to calculate custom keyword match percentage
              </p>
            </div>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
              showJdInput ? 'rotate-180' : ''
            }`}
          />
        </button>

        {showJdInput && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job title and responsibilities/requirements from the job posting..."
              rows={4}
              className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
            <p className="mt-1.5 text-right text-[11px] text-slate-400">
              {jobDescription.trim() ? `${jobDescription.trim().split(/\s+/).length} words entered` : 'Optional'}
            </p>
          </div>
        )}
      </div>

      {/* Error alert */}
      {activeError && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <p className="flex-1">{activeError}</p>
        </div>
      )}

      {/* Trigger Button */}
      {file && (
        <button
          type="button"
          onClick={() => onFileSelected(file, jobDescription)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-4 text-lg font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:from-sky-600 hover:to-blue-700 hover:shadow-sky-500/35 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Sparkles className="h-5 w-5" /> Analyze My Resume
        </button>
      )}
    </div>
  );
}


