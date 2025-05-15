export const generateNameWithEvaluationSummarySuffix = (
  name: string,
  version: number,
  withEvaluationSummary: boolean,
): string => `${name}${withEvaluationSummary ? '_with_evaluation_summary' : ''}${version === 1 ? '_first_version' : ''}`;
