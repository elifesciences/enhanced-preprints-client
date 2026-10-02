import { hardCodedClaimsFromExtendedMiraWithRelationships } from './data/hard-coded-claims-from-extended-mira-with-relationships';

export const getClaimCardsForQuestion = (questionNumber: string) => hardCodedClaimsFromExtendedMiraWithRelationships
  .filter((claimDataItem) => claimDataItem.questionNumber === questionNumber)
  .map(({
    id, claim, relatedStudies, relatedFigure,
  }) => ({
    id,
    questionNumber,
    title: claim.summary ?? claim.title,
    related: [
      ...(relatedFigure ? ['Figure'] : []),
      ...(relatedStudies?.length ? [`Study ${relatedStudies.map((relatedStudy) => relatedStudy.id).join(' & ')}`] : []),
    ],
  }));
