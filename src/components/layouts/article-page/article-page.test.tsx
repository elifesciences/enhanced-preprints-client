import {
  render, screen, fireEvent,
} from '@testing-library/react';
import { ArticlePageLayout } from './article-page';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import {
  metaData, status, citation,
} from '../../../utils/mocks';
import { contentToText } from '../../../utils/content-to-text';

describe('ArticlePageLayout', () => {
  it('renders correctly', () => {
    expect(() => render(<ArticlePageLayout metaData={metaData} status={status}>
      Hello
    </ArticlePageLayout>)).not.toThrow();
  });

  it('passes correct doi to status component', () => {
    const expectedDoi = '10.7554/eLife.123456.1';
    const encodedExpectedDoi = encodeURIComponent(expectedDoi);
    const { container } = render(
      <ArticleStatus articleStatus={status.status} doi={expectedDoi} articleType={status.articleType} pdfUrl={metaData.pdfUrl} title={contentToText(metaData.title)} citation={citation} msid="12345"/>,
    );

    fireEvent.click(screen.getByText('Share'));

    expect(screen.getByDisplayValue(expectedDoi, { exact: false })).toBeInTheDocument();

    Array.from(container.getElementsByClassName('socials-sharer'))
      .map((el) => el.getAttribute('href'))
      .forEach((url) => expect(url).toStrictEqual(expect.stringContaining(encodedExpectedDoi)));
  });
});
