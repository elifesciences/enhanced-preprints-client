export const significanceTerms = [
  'landmark', 'fundamental', 'important', 'valuable', 'useful',
];

export const strengthTerms = [
  'exceptional', 'compelling', 'convincing', 'solid', 'incomplete', 'inadequate',
];

const strengthAlternativeTerms: Record<string, string[]> = {
  incomplete: ['incompletely'],
  inadequate: ['inadequately'],
  convincing: ['convincingly'],
};

const termsRegex = (additionalTerms?: string[]): RegExp => new RegExp(`\\b(${[...significanceTerms, ...strengthTerms, ...(additionalTerms || [])].join('|')})\\b`, 'gi');

export const findTerms = (content: string): { significance?: string[], strength?: string[] } => {
  const found = (content.match(termsRegex()) || []).map((term) => term.toLowerCase());
  const significance = significanceTerms.filter((term) => found.includes(term));
  const strength = strengthTerms.filter((term) => found.includes(term));

  return {
    significance: significance.length > 0 ? significance : undefined,
    strength: strength.length > 0 ? strength : undefined,
  };
};

export const highlightTerms = (content: string): string => {
  const toHighlight = Object.values(strengthAlternativeTerms).flat();

  const regex = termsRegex(toHighlight);

  return content.replaceAll(regex, '<strong class="highlighted-term" aria-label="Highlighted">$1</strong>');
};

const termDescriptions: Record<string, string> = {
  landmark: 'Findings with profound implications that are expected to have widespread influence',
  fundamental: 'Findings that substantially advance our understanding of major research questions',
  important: 'Findings that have theoretical or practical implications beyond a single subfield',
  valuable: 'Findings that have theoretical or practical implications for a subfield',
  useful: 'Findings that have focused importance and scope',
  exceptional: 'Exemplary use of existing approaches that establish new standards for a field',
  compelling: 'Evidence that features methods, data and analyses more rigorous than the current state-of-the-art',
  convincing: 'Appropriate and validated methodology in line with current state-of-the-art',
  solid: 'Methods, data and analyses broadly support the claims with only minor weaknesses',
  incomplete: 'Main claims are only partially supported',
  inadequate: 'Methods, data and analyses do not support the primary claims',
};

export const getTermDescription = (term: string): string | undefined => termDescriptions[term.toLowerCase()];
