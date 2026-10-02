import type {
  BulletAssessment,
  BuzzwordAlert,
  ContactAudit,
  FormatRiskAlert,
  JobMatchResult,
  ResumeAnalysis,
  ScoreCategory,
  SkillsBreakdown,
} from '@/types';

export const technicalSkillsDict = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'golang', 'rust', 'ruby', 'php', 'swift', 'kotlin',
  'react', 'next.js', 'vue', 'angular', 'svelte', 'node.js', 'express', 'django', 'fastapi', 'spring boot',
  'sql', 'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'graphql', 'rest api', 'microservices',
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ci/cd', 'git', 'linux', 'data analysis',
  'machine learning', 'deep learning', 'nlp', 'data science', 'cybersecurity', 'cloud architecture',
  'system design', 'agile', 'scrum', 'unit testing', 'test automation', 'devops', 'web development'
];

export const softSkillsDict = [
  'leadership', 'communication', 'collaboration', 'problem solving', 'mentorship',
  'time management', 'adaptability', 'critical thinking', 'negotiation', 'stakeholder management',
  'presentation', 'conflict resolution', 'cross-functional leadership', 'decision making', 'empathy'
];

export const toolsDict = [
  'jira', 'confluence', 'github', 'gitlab', 'figma', 'postman', 'vscode', 'docker', 'kubernetes',
  'jenkins', 'tableau', 'power bi', 'excel', 'slack', 'notion', 'datadog', 'webpack', 'vite', 'tailwind css'
];

export const skillAliases: Record<string, string[]> = {
  'kubernetes': ['k8s', 'kube', 'kubernetes', 'k8'],
  'postgresql': ['postgres', 'postgresql', 'psql', 'postgres db'],
  'react': ['react', 'react.js', 'reactjs'],
  'node.js': ['node', 'nodejs', 'node.js', 'node js'],
  'typescript': ['typescript', 'ts'],
  'javascript': ['javascript', 'js', 'es6', 'es2020', 'ecmascript'],
  'golang': ['golang', 'go lang', 'go programming'],
  'c++': ['c++', 'cpp'],
  'c#': ['c#', 'csharp', 'c sharp', '.net'],
  'aws': ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloudformation'],
  'gcp': ['gcp', 'google cloud', 'google cloud platform', 'bigquery'],
  'azure': ['azure', 'microsoft azure', 'azure devops'],
  'ci/cd': ['ci/cd', 'ci cd', 'continuous integration', 'continuous delivery', 'continuous deployment', 'github actions', 'gitlab ci'],
  'machine learning': ['ml', 'machine learning', 'scikit-learn', 'tensorflow', 'pytorch'],
  'deep learning': ['deep learning', 'dl', 'neural networks', 'transformers', 'llm', 'llms'],
  'nlp': ['nlp', 'natural language processing', 'spacy', 'huggingface', 'langchain'],
  'rest api': ['rest', 'restful', 'rest api', 'rest apis', 'restful api', 'restful apis'],
  'graphql': ['graphql', 'gql', 'apollo'],
  'unit testing': ['unit test', 'unit testing', 'jest', 'vitest', 'pytest', 'mocha', 'junit', 'cypress', 'playwright'],
  'docker': ['docker', 'containerization', 'containers', 'docker compose'],
  'system design': ['system design', 'distributed systems', 'microservices architecture', 'high availability'],
  'tailwind css': ['tailwind', 'tailwindcss', 'tailwind css'],
  'next.js': ['next', 'nextjs', 'next.js'],
  'vue': ['vue', 'vuejs', 'vue.js', 'vue3'],
  'angular': ['angular', 'angularjs', 'angular 2+'],
  'python': ['python', 'py', 'python3'],
  'mongodb': ['mongo', 'mongodb', 'mongoose'],
  'sql': ['sql', 'rdbms', 'relational database', 't-sql', 'pl/sql'],
  'microservices': ['microservices', 'microservice architecture', 'soa'],
  'agile': ['agile', 'scrum', 'kanban', 'sprints'],
};

export const buzzwordsDict: Record<string, string> = {
  'hardworking': 'Demonstrate dedication through achievements, deadlines met, and project turnaround times.',
  'go-getter': 'Use specific examples showing initiative, like "spearheaded", "initiated", or "launched".',
  'team player': 'Describe exact collaborative impact, e.g., "partnered with 4 cross-functional engineers to deliver...".',
  'results-driven': 'State the exact numeric results (percentages, revenue, latency reduced, time saved) instead.',
  'detail-oriented': 'Showcase quality control metrics (e.g. "reduced defect rate by 35%" or "achieved 99.9% test coverage").',
  'think outside the box': 'Highlight specific innovative solutions, patents, or novel architectures implemented.',
  'synergy': 'Specify how cross-functional alignment and productivity gains were achieved.',
  'rockstar': 'Use professional titles and quantify your actual contributions.',
  'ninja': 'Replace with established engineering/professional titles.',
  'fast-paced': 'Quantify sprint cadence, deployment frequencies, or quarterly deliverable volumes.',
  'self-starter': 'Highlight independent projects or initiatives initiated and completed without supervision.',
  'strategic thinker': 'Provide examples of strategic roadmaps or architectural plans formulated.',
  'guru': 'Highlight recognized industry certifications, publications, or speaking engagements.',
  'responsible for': 'Replace with active power verbs like "Executed", "Directed", "Engineered", or "Spearheaded".',
  'helped with': 'Specify your exact contribution: "Co-authored", "Implemented", "Designed", or "Accelerated".',
  'worked on': 'State your definitive role: "Developed", "Refactored", "Maintained", or "Orchestrated".',
};

export const actionVerbs = [
  'led', 'managed', 'developed', 'created', 'implemented', 'designed',
  'built', 'launched', 'improved', 'increased', 'reduced', 'optimized',
  'streamlined', 'coordinated', 'established', 'delivered', 'achieved',
  'generated', 'analyzed', 'executed', 'trained', 'mentored', 'orchestrated',
  'spearheaded', 'automated', 'transformed', 'negotiated', 'formulated', 'architected',
  'accelerated', 'engineered', 'championed', 'scaled', 'modernized', 'deployed'
];

export const weakVerbs = [
  'responsible for', 'helped with', 'worked on', 'assisted in', 'handled', 'duties included', 'participated in', 'tasked with'
];

const sections: Record<string, RegExp> = {
  'Contact Information': /@|phone|linkedin\.com|github\.com|\b(?:email|tel|mobile|address)\b/i,
  'Professional Summary': /\b(?:summary|objective|profile|about me|professional summary|executive summary)\b/i,
  'Work Experience': /\b(?:experience|employment|work history|career history|professional experience)\b/i,
  'Education': /\b(?:education|university|college|degree|bachelor|master|phd|diploma|academic background)\b/i,
  'Skills': /\b(?:skills?|competencies|proficiencies|technologies|technical stack|tools|core strengths)\b/i,
};

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Check if text mentions a skill keyword or any of its known aliases */
export function containsSkillWithAliases(text: string, skill: string): boolean {
  const lowerText = text.toLowerCase();
  const normalized = skill.toLowerCase();
  const aliases = skillAliases[normalized] || [normalized];
  
  return aliases.some((alias) => {
    // Exact word boundary matching for the alias
    const pattern = new RegExp(`(^|[^a-zA-Z0-9_#+.-])${escapeRegex(alias)}($|[^a-zA-Z0-9_#+.-])`, 'i');
    return pattern.test(lowerText);
  });
}

function status(score: number, max: number): ScoreCategory['status'] {
  const percentage = score / max;
  return percentage >= 0.75 ? 'good' : percentage >= 0.5 ? 'warning' : 'poor';
}

function category(name: string, score: number, maxScore: number, feedback: string, tips: string[]): ScoreCategory {
  return { name, score: Math.min(score, maxScore), maxScore, status: status(score, maxScore), feedback, tips };
}

export function matchJobDescription(resumeText: string, jobDescriptionText: string): JobMatchResult {
  const jdLower = jobDescriptionText.toLowerCase();

  // Combine vocabularies for searching JD requirements
  const targetVocab = Array.from(new Set([...technicalSkillsDict, ...softSkillsDict, ...toolsDict, ...actionVerbs]));
  
  // Extract keywords explicitly mentioned in the JD (considering aliases too)
  const jdKeywords = targetVocab.filter((word) => containsSkillWithAliases(jdLower, word));

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const kw of jdKeywords) {
    if (containsSkillWithAliases(resumeText, kw)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  }

  const matchScore = jdKeywords.length > 0
    ? Math.round((matchedKeywords.length / jdKeywords.length) * 100)
    : 100;

  // Try extracting job title from first line of JD
  const firstLine = jobDescriptionText.trim().split('\n')[0]?.trim();
  const jobTitle = firstLine && firstLine.length < 60 ? firstLine : undefined;

  return {
    jobTitle,
    matchScore,
    matchedKeywords,
    missingKeywords,
    totalJdKeywords: jdKeywords.length,
  };
}

export function extractPhoneNumber(text: string): string | undefined {
  // 1. Look for labeled phone number first (e.g. "Phone: +91 99853 84290" or "Mobile: +91 99853 84290")
  const labeledMatch = text.match(/(?:phone|tel|mobile|cell|contact)(?:\s*(?:no\.?|number|#))?\s*[:\-]?\s*(\+?[\d\s().-]{7,20}\d)/i);
  if (labeledMatch?.[1]) {
    const raw = labeledMatch[1].trim();
    const digitsOnly = raw.replace(/\D/g, '');
    if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
      return raw;
    }
  }

  // 2. Look for international phone formats (e.g. +91 99853 84290, +91-99853-84290, +1 555-123-4567)
  const intlMatch = text.match(/(?:\+|00)\d{1,4}[-.\s]?(?:\(?\d{1,5}\)?[-.\s]?)?\d{2,5}[-.\s]?\d{2,5}(?:[-.\s]?\d{2,5})?/);
  if (intlMatch?.[0]) {
    const raw = intlMatch[0].trim();
    const digitsOnly = raw.replace(/\D/g, '');
    if (digitsOnly.length >= 8 && digitsOnly.length <= 15) {
      return raw;
    }
  }

  // 3. Indian 10-digit formats (5+5, 10 continuous starting with 6-9, with or without +91)
  const indianMatch = text.match(/(?:(?:\+?91[-.\s]?)?[6-9]\d{4}[-.\s]?\d{5})\b/);
  if (indianMatch?.[0]) {
    return indianMatch[0].trim();
  }

  // 4. North American / Standard 10-digit formats: (123) 456-7890 or 123-456-7890
  const standard10 = text.match(/(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}\b/);
  if (standard10?.[0]) {
    return standard10[0].trim();
  }

  // 5. Fallback general phone number pattern with 7-14 digits
  const generalMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,5}\b/);
  if (generalMatch?.[0]) {
    const raw = generalMatch[0].trim();
    const digitsOnly = raw.replace(/\D/g, '');
    if (digitsOnly.length >= 8 && digitsOnly.length <= 15) {
      return raw;
    }
  }

  return undefined;
}

export function extractPortfolioOrGitHub(text: string): string | undefined {
  // GitHub match
  const githubMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_.-]+/i);
  if (githubMatch) return githubMatch[0];

  // Portfolio / custom domain with broad TLD support (.in, .dev, .me, .io, .com, .app, .tech, etc.)
  const portfolioMatch = text.match(/(?:https?:\/\/)?(?:www\.)?[A-Za-z0-9_-]+\.(?:in|dev|me|io|com|app|tech|co|org|net|live|page|site|xyz|online|design)\/?[A-Za-z0-9_./-]*/i);
  if (portfolioMatch) return portfolioMatch[0];

  // Labeled Portfolio: https://...
  const labeled = text.match(/portfolio\s*[:\-]?\s*(https?:\/\/[^\s|]+)/i);
  if (labeled?.[1]) return labeled[1];

  return undefined;
}

export function auditContactInfo(text: string): ContactAudit {
  const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b/i);
  const phone = extractPhoneNumber(text);
  const linkedInMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_.-]+/i);
  const portfolio = extractPortfolioOrGitHub(text);

  return {
    hasEmail: Boolean(emailMatch),
    email: emailMatch?.[0],
    hasPhone: Boolean(phone),
    phone: phone,
    hasLinkedIn: Boolean(linkedInMatch),
    linkedIn: linkedInMatch?.[0],
    hasPortfolioOrGitHub: Boolean(portfolio),
    portfolio: portfolio,
  };
}

export function detectBuzzwords(text: string): BuzzwordAlert[] {
  const alerts: BuzzwordAlert[] = [];

  for (const [buzzword, suggestion] of Object.entries(buzzwordsDict)) {
    const regex = new RegExp(`\\b${escapeRegex(buzzword)}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches && matches.length > 0) {
      alerts.push({
        word: buzzword,
        count: matches.length,
        suggestion,
      });
    }
  }

  return alerts;
}

export function categorizeSkills(text: string): SkillsBreakdown {
  const testItems = (list: string[]) =>
    list.filter((item) => containsSkillWithAliases(text, item));

  return {
    technical: testItems(technicalSkillsDict),
    soft: testItems(softSkillsDict),
    tools: testItems(toolsDict),
  };
}

/** Audits resume text for ATS formatting traps (multi-columns, weird symbols, dates, headers) */
export function auditFormatRisks(text: string, wordCount: number): FormatRiskAlert[] {
  const risks: FormatRiskAlert[] = [];

  // 1. Date format check
  const dateRegex = /\b(?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4}|\d{1,2}\/\d{4}|\d{4}\s*[-–—]\s*(?:present|current|\d{4}))\b/gi;
  const dateMatches = text.match(dateRegex);
  if (!dateMatches || dateMatches.length < 2) {
    risks.push({
      id: 'date-formatting',
      severity: 'warning',
      category: 'dates',
      title: 'Missing or Non-Standard Date Formats',
      description: 'ATS timeline parsers rely on standard date formats (e.g. "Jan 2021 – Present" or "05/2020 – 12/2022") to build your career timeline.',
      recommendation: 'Use standard Month Year formats for all work and education experiences.',
    });
  } else {
    risks.push({
      id: 'date-formatting-safe',
      severity: 'safe',
      category: 'dates',
      title: 'Consistent Date Formats Detected',
      description: `Identified ${dateMatches.length} standard date ranges for timeline parsing.`,
      recommendation: 'Keep all job dates in consistent "Month Year – Month Year" format.',
    });
  }

  // 2. Non-standard special glyphs / emojis check
  const nonStandardSymbols = text.match(/[\uD800-\uDFFF\u2600-\u27BF\uFE00-\uFE0F\u200D\u25A0-\u25FF]/g);
  if (nonStandardSymbols && nonStandardSymbols.length > 3) {
    risks.push({
      id: 'special-glyphs',
      severity: 'critical',
      category: 'symbols',
      title: 'Fancy Emojis / Decorative Glyphs Detected',
      description: `Found ${nonStandardSymbols.length} non-standard glyphs (e.g. icons, emojis) that frequently cause encoding errors in legacy ATS (like Workday and Taleo).`,
      recommendation: 'Replace fancy icons and emojis with standard bullet points (• or -) and clear text labels.',
    });
  } else {
    risks.push({
      id: 'special-glyphs-safe',
      severity: 'safe',
      category: 'symbols',
      title: 'Clean Character Encoding',
      description: 'Document uses standard clean typography suitable for all ATS scanners.',
      recommendation: 'Avoid inserting icons, rating stars, or skill graphics.',
    });
  }

  // 3. Section Header Standardization
  const missingHeaders = Object.keys(sections).filter((secName) => !sections[secName].test(text));
  if (missingHeaders.length > 0) {
    risks.push({
      id: 'missing-headers',
      severity: missingHeaders.includes('Work Experience') || missingHeaders.includes('Skills') ? 'critical' : 'warning',
      category: 'sections',
      title: `Unrecognized Section Headers: ${missingHeaders.join(', ')}`,
      description: 'ATS algorithms use strict keyword headings to route text to the correct database fields.',
      recommendation: 'Use industry-standard headings: "Work Experience", "Skills", "Education", and "Professional Summary".',
    });
  } else {
    risks.push({
      id: 'headers-safe',
      severity: 'safe',
      category: 'sections',
      title: 'Standard ATS Section Architecture',
      description: 'All 5 core standard resume sections were clearly recognized.',
      recommendation: 'Maintain standard capitalized section headings.',
    });
  }

  // 4. Word count calibration
  if (wordCount < 300) {
    risks.push({
      id: 'length-short',
      severity: 'warning',
      category: 'length',
      title: 'Resume is Extremely Brief (< 300 words)',
      description: 'Short resumes may lack sufficient keyword density and quantifiable achievements to pass ATS score filters.',
      recommendation: 'Expand each role with 3–5 accomplishment-driven bullet points.',
    });
  } else if (wordCount > 1000) {
    risks.push({
      id: 'length-long',
      severity: 'warning',
      category: 'length',
      title: 'Resume is Lengthy (> 1000 words)',
      description: 'Dense resumes risk lower human recruiter engagement after passing initial ATS screening.',
      recommendation: 'Aim for a concise 450–850 words (1–2 focused pages).',
    });
  } else {
    risks.push({
      id: 'length-safe',
      severity: 'safe',
      category: 'length',
      title: 'Optimal Word Count & Density',
      description: `${wordCount} words is in the sweet spot (400–850 words) for both ATS scanners and human recruiters.`,
      recommendation: 'Maintain this balance of brevity and detail.',
    });
  }

  return risks;
}

/** Extracts experience bullets from resume text */
export function extractBulletPoints(text: string): string[] {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const bullets: string[] = [];

  for (const line of lines) {
    const cleaned = line.replace(/^[•\-\–\*]\s*|^\d+\.\s*/, '').trim();
    if (cleaned.length >= 25 && cleaned.length <= 300) {
      // Must look like an experience statement (starts with letter and has some structure)
      if (/^[A-Z][a-zA-Z\s,;'"%$0-9-]{15,}/.test(cleaned)) {
        bullets.push(cleaned);
      }
    }
  }

  return Array.from(new Set(bullets)).slice(0, 15);
}

/** Evaluates an individual bullet point against the Google XYZ formula and power criteria */
export function assessBulletPoint(bulletText: string): BulletAssessment {
  const trimmed = bulletText.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const firstWord = words[0]?.toLowerCase().replace(/[^a-z]/g, '');

  const hasActionVerb = actionVerbs.some((verb) => firstWord === verb || trimmed.toLowerCase().startsWith(verb));
  const detectedVerb = actionVerbs.find((verb) => firstWord === verb || trimmed.toLowerCase().startsWith(verb));

  const hasWeakStart = weakVerbs.some((wv) => trimmed.toLowerCase().startsWith(wv));
  
  const metricMatch = trimmed.match(/\$[\d,]+|\d+(?:\.\d+)?%|\b\d+\+?\s*(?:people|users|clients|years|months|members|projects|increase|growth|reduction|hours|downloads|requests|ms|seconds|x|employees|modules|tables|controllers|endpoints)\b/i);
  const hasMetric = Boolean(metricMatch);

  const foundCliché = Object.keys(buzzwordsDict).find((bw) => new RegExp(`\\b${escapeRegex(bw)}\\b`, 'i').test(trimmed));
  const hasCliché = Boolean(foundCliché);

  let score = 50; // base score
  const suggestions: string[] = [];

  if (hasActionVerb) {
    score += 25;
  } else if (hasWeakStart) {
    score -= 15;
    suggestions.push('Avoid passive openings like "Responsible for" or "Worked on". Start directly with an active power verb (e.g., "Architected", "Engineered", "Optimized").');
  } else {
    score -= 5;
    suggestions.push('Start the bullet point with a high-impact past-tense action verb.');
  }

  if (hasMetric) {
    score += 25;
  } else {
    suggestions.push('Add quantifiable impact: include numbers, percentages (%), dollar amounts ($), speedups, or scale (e.g. "cutting latency by 40%", "serving 50k users").');
  }

  if (hasCliché) {
    score -= 10;
    suggestions.push(`Replace buzzword "${foundCliché}" with concrete technical specifics.`);
  }

  let lengthStatus: BulletAssessment['lengthStatus'] = 'ideal';
  if (wordCount < 10) {
    lengthStatus = 'too_short';
    score -= 10;
    suggestions.push('Bullet is too brief. Provide more context on how you solved the problem and what tools you used.');
  } else if (wordCount > 35) {
    lengthStatus = 'too_long';
    score -= 5;
    suggestions.push('Bullet is lengthy. Break into two distinct achievements or trim non-essential fluff.');
  }

  score = Math.max(10, Math.min(100, score));

  // Generate an automated improved version template following Google XYZ formula
  let improvedVersion: string | undefined;
  const sampleVerb = detectedVerb ? detectedVerb.charAt(0).toUpperCase() + detectedVerb.slice(1) : 'Spearheaded';
  if (!hasMetric || !hasActionVerb) {
    improvedVersion = `${sampleVerb} [core initiative/system] resulting in [quantifiable % or $ metric] by implementing [specific tools/technologies].`;
  }

  return {
    text: trimmed,
    score,
    hasActionVerb,
    detectedVerb,
    hasMetric,
    metricSnippet: metricMatch?.[0],
    hasCliché,
    clichéWord: foundCliché,
    wordCount,
    lengthStatus,
    suggestions: suggestions.length > 0 ? suggestions : ['Well-crafted, accomplishment-driven bullet point.'],
    improvedVersion,
  };
}

export function analyzeResume(
  text: string,
  fileName: string,
  fileSize: number,
  jobDescription?: string
): ResumeAnalysis {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  
  const foundSections = Object.entries(sections)
    .filter(([, pattern]) => pattern.test(text))
    .map(([name]) => name);
  
  const skillsBreakdown = categorizeSkills(text);
  const allDetectedSkills = Array.from(
    new Set([...skillsBreakdown.technical, ...skillsBreakdown.soft, ...skillsBreakdown.tools])
  );
  
  const allDictKeywords = Array.from(new Set([...technicalSkillsDict, ...softSkillsDict, ...toolsDict]));
  const missingKeywords = allDictKeywords.filter((k) => !allDetectedSkills.includes(k));
  
  const foundVerbs = actionVerbs.filter((verb) => {
    const pattern = new RegExp(`\\b${escapeRegex(verb)}\\b`, 'i');
    return pattern.test(text);
  });
  
  const metrics = text.match(/\$[\d,]+|\d+(?:\.\d+)?%|\b\d+\+?\s*(?:people|users|clients|years|months|members|projects|increase|growth|reduction|hours|downloads|requests|ms|seconds|x|employees|modules|tables|controllers|endpoints)\b/gi)?.length ?? 0;
  const bullets = /(?:^|\n)\s*(?:[•\-–*]|\d+\.)\s+/m.test(text);
  
  const contactAudit = auditContactInfo(text);
  const buzzwords = detectBuzzwords(text);
  const formatRisks = auditFormatRisks(text, wordCount);
  const extractedBullets = extractBulletPoints(text);
  
  // Optional Job Description matching
  const jobMatch = jobDescription && jobDescription.trim().length >= 20
    ? matchJobDescription(text, jobDescription)
    : null;

  // 1. Section Completeness (Max 25)
  const missingSectionNames = Object.keys(sections).filter((name) => !foundSections.includes(name));
  const sectionScore = Math.round((foundSections.length / Object.keys(sections).length) * 25);
  const sectionTips = missingSectionNames.length > 0
    ? [`Consider adding explicit section headers for: ${missingSectionNames.join(', ')}.`]
    : ['All core ATS resume sections are clearly recognized.'];

  // 2. Keyword & Skills Optimization (Max 20)
  const skillsCount = allDetectedSkills.length;
  const keywordScore = Math.min(20, Math.round((skillsCount / 14) * 20));
  const keywordTips = [
    skillsBreakdown.technical.length < 5
      ? `Incorporate key technical skills relevant to your target roles (e.g. ${missingKeywords.slice(0, 4).join(', ')}).`
      : `Strong technical vocabulary (${skillsBreakdown.technical.length} technical skills found with alias matching).`,
    `Soft skills detected: ${skillsBreakdown.soft.length > 0 ? skillsBreakdown.soft.slice(0, 4).join(', ') : 'Add collaboration and leadership keywords'}.`
  ];

  // 3. Action Verbs & Impact (Max 20)
  const verbScore = Math.min(20, foundVerbs.length * 3);
  const verbTips = foundVerbs.length < 6
    ? ['Begin experience bullet points with strong action verbs (e.g., Spearheaded, Orchestrated, Automated).']
    : [`Excellent variety of high-impact action verbs (${foundVerbs.length} distinct verbs used).`];

  // 4. Quantifiable Results & Metrics (Max 15)
  const metricScore = Math.min(15, metrics * 3);
  const metricTips = metrics < 3
    ? ['Add measurable outcomes to your bullet points (e.g., "boosted system throughput by 35%", "managed $120k budget").']
    : ['Strong inclusion of quantifiable metrics, numbers, and scale indicators.'];

  // 5. Format & Length (Max 10)
  const lengthScore = wordCount >= 350 && wordCount <= 850 ? 6 : wordCount >= 200 && wordCount <= 1200 ? 4 : 2;
  const bulletScore = bullets ? 4 : 0;
  const formatScore = Math.min(10, lengthScore + bulletScore);
  const formatTips = [
    wordCount < 350 ? 'Resume is slightly short. Aim for 350–750 words.' : wordCount > 900 ? 'Resume may be too lengthy. Aim for concise 1–2 pages (under 800 words).' : 'Resume length is well-calibrated for ATS readers.',
    bullets ? 'Clean bullet point structure detected.' : 'Use standard bullet points (•) for scannability.'
  ];

  // 6. Contact Details & Audit (Max 10)
  let contactScore = 0;
  if (contactAudit.hasEmail) contactScore += 3;
  if (contactAudit.hasPhone) contactScore += 3;
  if (contactAudit.hasLinkedIn) contactScore += 2;
  if (contactAudit.hasPortfolioOrGitHub) contactScore += 2;
  const contactTips: string[] = [];
  if (!contactAudit.hasEmail) contactTips.push('Add a valid professional email address.');
  if (!contactAudit.hasPhone) contactTips.push('Add a phone number with country/area code.');
  if (!contactAudit.hasLinkedIn) contactTips.push('Include a clean LinkedIn profile link (linkedin.com/in/...).');
  if (!contactAudit.hasPortfolioOrGitHub) contactTips.push('Add a GitHub or portfolio URL to showcase projects.');
  if (contactTips.length === 0) contactTips.push('Complete contact and professional profile details provided.');

  const categories: ScoreCategory[] = [
    category('Section Completeness', sectionScore, 25, `${foundSections.length} of ${Object.keys(sections).length} standard sections identified.`, sectionTips),
    category('Keyword & Skills Optimization', keywordScore, 20, `${allDetectedSkills.length} key skills detected across technical, soft, and tools.`, keywordTips),
    category('Action Verbs & Impact', verbScore, 20, `${foundVerbs.length} high-impact action verbs found.`, verbTips),
    category('Quantifiable Results', metricScore, 15, `${metrics} measurable result indicators found.`, metricTips),
    category('Format & Structure', formatScore, 10, `${wordCount} words detected${bullets ? ' with formatted bullet points.' : '.'}`, formatTips),
    category('Contact & Online Presence', contactScore, 10, `${[contactAudit.hasEmail && 'Email', contactAudit.hasPhone && 'Phone', contactAudit.hasLinkedIn && 'LinkedIn', contactAudit.hasPortfolioOrGitHub && 'Portfolio'].filter(Boolean).length} contact channels verified.`, contactTips),
  ];

  // Adjust overall score: penalize slightly for high buzzwords count or critical formatting risks
  let totalScore = categories.reduce((sum, item) => sum + item.score, 0);
  if (buzzwords.length >= 3) {
    totalScore = Math.max(0, totalScore - 3);
  }
  const criticalFormatRisks = formatRisks.filter((r) => r.severity === 'critical');
  if (criticalFormatRisks.length > 0) {
    totalScore = Math.max(0, totalScore - criticalFormatRisks.length * 4);
  }

  totalScore = Math.min(100, Math.max(0, totalScore));

  return {
    overallScore: totalScore,
    categories,
    extractedText: text,
    wordCount,
    detectedKeywords: allDetectedSkills,
    missingKeywords: missingKeywords.slice(0, 15),
    fileName,
    fileSize,
    contactAudit,
    buzzwords,
    skillsBreakdown,
    jobMatch,
    formatRisks,
    extractedBullets,
    rawJobDescription: jobDescription,
  };
}
