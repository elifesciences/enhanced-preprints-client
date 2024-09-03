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

  return content.replaceAll(new RegExp(`([^\\w]+)(?<term>${toHighlight.join('|')})([^\\w]+)`, 'gi'), '$1<strong class="highlighted-term">$<term></strong>$3');
};
