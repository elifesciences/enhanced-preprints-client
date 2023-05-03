type Participant = {
  name: string,
  role: string,
  institutions: string,
};

type ReviewToFetch = {
  hypothesisId: string,
  reviewType: string,
  date: string,
  participants: Participant[],
};
type Review = {
  text: string,
  reviewType: string,
  date: string,
  participants: Participant[],
};

export const getReviewJson = async (reviews: ReviewToFetch[], evaluationSummary: ReviewToFetch, authorResponse?: ReviewToFetch) => {
  const fetchAndTransform = async (reviewToFetch: ReviewToFetch): Promise<Review> => ({
    text: await (await fetch(`https://sciety.org/evaluations/${reviewToFetch.hypothesisId}/content`)).text(),
    reviewType: reviewToFetch.reviewType,
    date: reviewToFetch.date,
    participants: reviewToFetch.participants,
  });

  const mappedReviews: Review[] = await Promise.all(reviews.map(fetchAndTransform));

  return {
    reviews: mappedReviews,
    evaluationSummary: await fetchAndTransform(evaluationSummary),
    authorResponse: authorResponse ? fetchAndTransform(evaluationSummary) : undefined,
  };
};

getReviewJson(
  [
    {
      hypothesisId: 'hypothesis:VZA2tNRwEe2Gn6fVyZDsZw',
      date: '2023-04-06',
      reviewType: 'review-article',
      participants: [],
    },
  ],
  {
    hypothesisId: 'hypothesis:W6Lk6NRwEe27ZnsdX_tiKQ',
    date: '2023-04-06',
    reviewType: 'evaluation-summary',
    participants: [],
  },
).then((json) => console.log(JSON.stringify(json)));
