export interface MatchAnalysis {
  overall: number;
  technical: number;
  experience: number;
  education: number;
  industry: number;
  language: number;
  cultural: number;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  gaps: string[];
  verdict: string;
}

const SKILL_TAXONOMY = [
  "python",
  "sql",
  "javascript",
  "typescript",
  "excel",
  "financial modeling",
  "quantitative analytics",
  "data analysis",
  "machine learning",
  "sentence transformers",
  "project management",
  "stakeholder management",
  "communication",
  "leadership",
  "private equity",
  "investment banking",
  "portfolio management",
  "financial analysis",
  "deal structuring",
  "valuation",
  "risk management",
  "sovereign wealth",
  "oil and gas",
  "construction",
  "hospitality",
  "finance",
  "accounting",
  "mba",
  "cfa",
  "nebosh",
  "bachelor",
  "master",
  "arabic",
  "english",
  "bilingual",
  "saudi arabia",
  "united arab emirates",
  "uae",
  "qatar",
  "kuwait",
  "bahrain",
  "oman",
];

const CATEGORY_SKILLS = {
  technical: ["python", "sql", "javascript", "typescript", "excel", "financial modeling", "quantitative analytics", "data analysis", "machine learning", "valuation"],
  experience: ["project management", "stakeholder management", "leadership", "private equity", "investment banking", "portfolio management", "deal structuring", "risk management"],
  education: ["mba", "cfa", "bachelor", "master", "nebosh", "finance", "accounting"],
  industry: ["private equity", "investment banking", "portfolio management", "financial analysis", "sovereign wealth", "oil and gas", "construction", "hospitality", "finance"],
  language: ["arabic", "english", "bilingual"],
  cultural: ["saudi arabia", "united arab emirates", "uae", "qatar", "kuwait", "bahrain", "oman"],
} as const;

const STOP_WORDS = new Set([
  "about", "after", "again", "also", "among", "been", "being", "between", "could", "from", "have", "into", "more", "other", "over", "should", "than", "that", "their", "there", "these", "they", "this", "those", "under", "with", "would", "your",
]);

function includesSkill(text: string, skill: string) {
  return text.includes(skill);
}

export function extractSkills(text: string) {
  const normalized = text.toLowerCase().replace(/[^a-z0-9+#.\s-]/g, " ");
  return SKILL_TAXONOMY.filter(skill => includesSkill(normalized, skill));
}

function tokenOverlap(resumeText: string, jobText: string) {
  const tokenize = (text: string) => new Set(
    text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(token => token.length > 3 && !STOP_WORDS.has(token))
  );
  const resumeTokens = tokenize(resumeText);
  const jobTokens = tokenize(jobText);
  if (jobTokens.size === 0) return 0;
  let matches = 0;
  jobTokens.forEach(token => {
    if (resumeTokens.has(token)) matches += 1;
  });
  return matches / jobTokens.size;
}

function categoryScore(resumeText: string, jobText: string, skills: readonly string[]) {
  const requested = skills.filter(skill => includesSkill(jobText.toLowerCase(), skill));
  if (requested.length === 0) return 60;
  const matched = requested.filter(skill => includesSkill(resumeText.toLowerCase(), skill)).length;
  return Math.round((matched / requested.length) * 100);
}

export function matchResumeToJob(resumeText: string, jobText: string): MatchAnalysis {
  const resumeSkills = extractSkills(resumeText);
  const jobSkills = extractSkills(jobText);
  const matchedSkills = jobSkills.filter(skill => resumeSkills.includes(skill));
  const missingSkills = jobSkills.filter(skill => !resumeSkills.includes(skill));
  const skillCoverage = jobSkills.length === 0 ? 0.6 : matchedSkills.length / jobSkills.length;
  const overall = Math.max(0, Math.min(100, Math.round(skillCoverage * 70 + tokenOverlap(resumeText, jobText) * 30)));
  const technical = categoryScore(resumeText, jobText, CATEGORY_SKILLS.technical);
  const experience = categoryScore(resumeText, jobText, CATEGORY_SKILLS.experience);
  const education = categoryScore(resumeText, jobText, CATEGORY_SKILLS.education);
  const industry = categoryScore(resumeText, jobText, CATEGORY_SKILLS.industry);
  const language = categoryScore(resumeText, jobText, CATEGORY_SKILLS.language);
  const cultural = categoryScore(resumeText, jobText, CATEGORY_SKILLS.cultural);

  const strengths = matchedSkills.slice(0, 5).map(skill => `${skill[0].toUpperCase()}${skill.slice(1)} appears in both profiles`);
  const gaps = missingSkills.slice(0, 6).map(skill => `Missing target skill: ${skill}`);
  if (strengths.length === 0) strengths.push("Resume uploaded and checked against the target role");
  if (gaps.length === 0) gaps.push("No taxonomy skill gaps detected for this job description");

  const verdict = overall >= 85 ? "EXCELLENT" : overall >= 70 ? "GOOD" : overall >= 50 ? "FAIR" : "NEEDS WORK";
  return {
    overall,
    technical,
    experience,
    education,
    industry,
    language,
    cultural,
    matchedSkills,
    missingSkills,
    strengths,
    gaps,
    verdict,
  };
}
