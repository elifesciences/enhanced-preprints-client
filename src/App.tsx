import { mockContent } from './components/atoms/article-content/mock-content';
import { ArticlePage } from './components/pages/article/article';

export const App = (): JSX.Element => (
  <div className="App">
    <ArticlePage
      additionalClasses={['grid-container']}
      additionalSiteHeaderClasses={['grid-header']}
      additionalContentHeaderClasses={['primary-column-header']}
      msas={['Mad Science', 'Alchemy']}
      importance={'Landmark'}
      strengthOfEvidence={'Tour-de-force'}
      title={'This is a title'}
      doi={'bbc.co.uk'}
      authors={[
        { givenNames: ['Steve'], familyNames: ['Rogers'] },
        { givenNames: ['Antony'], familyNames: ['Stark'] },
        { givenNames: ['Natasha'], familyNames: ['Romanov'] },
        { givenNames: ['Bruce'], familyNames: ['Banner'] },
        { givenNames: ['Wanda'], familyNames: ['Maximof'] },
        { givenNames: ['Bucky'], familyNames: ['Barnes'] },
        { givenNames: ['Barry'], familyNames: ['Allen'] },
        { givenNames: ['Jesse'], familyNames: ['Quick'] },
        { givenNames: ['Kara'], familyNames: ['Zor-el'] },
        { givenNames: ['Arthur'], familyNames: ['Curry'] },
        { givenNames: ['Kal'], familyNames: ['El'] },
        { givenNames: ['Oliver'], familyNames: ['Queen'] },
      ]}
      content={mockContent}
      tweets={0} citations={0} views={0}
    />
  </div>
);

export default App;
