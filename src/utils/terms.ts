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

const termsRegex = (terms: string[]): RegExp => new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');

export const findTerms = (content: string): { significance?: string[], strength?: string[] } => {
  // Replace entries of alternative terms with the primary terms in content.
  let mutableContent = content;
  Object.entries(strengthAlternativeTerms).forEach(([term, alternatives]) => {
    mutableContent = mutableContent.replaceAll(termsRegex(alternatives), term);
  });

  const contentSplit = Array.from(new Set(mutableContent.toLowerCase().replaceAll(/[^a-z]+/g, ',').split(',')));
  const significance: string[] = [];
  const strength: string[] = [];

  contentSplit.forEach((term) => {
    if (significanceTerms.includes(term) && !significance.includes(term)) {
      significance.push(term);
    } else if (strengthTerms.includes(term) && !strength.includes(term)) {
      strength.push(term);
    }
  });

  return {
    significance: significance.length > 0 ? significance : undefined,
    strength: strength.length > 0 ? strength : undefined,
  };
};

export const highlightTerms = (content: string): string => {
  const toHighlight = [...significanceTerms, ...strengthTerms, ...Object.values(strengthAlternativeTerms).flat()];

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
