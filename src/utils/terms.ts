const significanceTerms = [
  'landmark', 'fundamental', 'important', 'valuable', 'useful',
];

const strengthTerms = [
  'exceptional', 'compelling', 'convincing', 'solid', 'incomplete', 'inadequate',
];

const strengthAlternativeTerms: Record<string, string[]> = {
  incomplete: ['incompletely'],
  inadequate: ['inadequately'],
  convincing: ['convincingly'],
};

export const terms = [...significanceTerms, ...strengthTerms];

export const findTerms = (content: string): { significance?: string[], strength?: string[] } => {
  const significance: string[] = [];
  significanceTerms.forEach((term) => {
    if (content.includes(term)) {
      significance.push(term);
    }
  });

  const strength: string[] = [];
  strengthTerms.forEach((term) => {
    if (content.includes(term)) {
      strength.push(term);
    }
  });

  return {
    significance: significance.length > 0 ? significance : undefined,
    strength: strength.length > 0 ? strength : undefined,
  };
};

export const highlightTerms = (content: string): string => {
  const toHighlight = [...terms];

  // eslint-disable-next-line no-restricted-syntax
  for (const value of Object.values(strengthAlternativeTerms)) {
    value.forEach((term) => toHighlight.push(term));
  }

  const regex = new RegExp(`\\b(${toHighlight.join('|')})\\b`, 'gi');

  return content.replaceAll(regex, '<strong class="highlighted-term">$1</strong>');
};

const termDescriptions: Record<string, string> = {
  landmark: 'findings with profound implications that are expected to have widespread influence',
  fundamental: 'findings that substantially advance our understanding of major research questions',
  important: 'findings that have theoretical or practical implications beyond a single subfield',
  valuable: 'findings that have theoretical or practical implications for a subfield',
  useful: 'findings that have focused importance and scope',
  exceptional: 'exemplary use of existing approaches that establish new standards for a field',
  compelling: 'evidence that features methods, data and analyses more rigorous than the current state-of-the-art',
  convincing: 'appropriate and validated methodology in line with current state-of-the-art',
  solid: 'methods, data and analyses broadly support the claims with only minor weaknesses',
  incomplete: 'main claims are only partially supported',
  inadequate: 'methods, data and analyses do not support the primary claims',
};

export const getTermDescription = (term: string): string | undefined => termDescriptions[term.toLowerCase()];
