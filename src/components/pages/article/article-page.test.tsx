import {
  render, screen, cleanup, fireEvent,
} from '@testing-library/react';
import { ArticlePage } from './article-page';
import { ArticleStatus } from '../../molecules/article-status/article-status';
import {
  metaData, peerReview, status, timeline, citation, relatedContent,
} from '../../../utils/mocks';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from './tabs';
import { contentToText } from '../../../utils/content-to-text';

describe('ArticlePage', () => {
  it('renders correctly', () => {
    expect(() => render(<ArticlePage relatedContent={[]} msidWithVersion="12345v1" metaData={metaData} status={status} timeline={timeline} activeTab="fulltext" tabs={[]} previousVersionWarningUrl="http://latest.version">
      <ArticleFullTextTab headings={[]} content={''} peerReview={peerReview} metaData={metaData} metrics={null} />
    </ArticlePage>)).not.toThrow();
  });

  it('renders with figures tab', () => {
    expect(() => render(<ArticlePage relatedContent={[]} msidWithVersion="12345v1" metaData={metaData} status={status} timeline={timeline} activeTab="figures" tabs={[]} previousVersionWarningUrl="http://latest.version">
      <ArticleFiguresTab content={''} />
    </ArticlePage>)).not.toThrow();
  });

  it('renders with reviews tab', () => {
    expect(() => render(<ArticlePage relatedContent={[]} msidWithVersion="12345v1" metaData={metaData} status={status} timeline={timeline} activeTab="reviews" tabs={[]} previousVersionWarningUrl="http://latest.version">
      <ArticleReviewsTab peerReview={peerReview} />
    </ArticlePage>)).not.toThrow();
  });

  it('renders with tabs with correct active label', () => {
    const tabs = [
      {
        id: 'fulltext',
        linkElement: <a href={'/reviewed-preprints/12345v1#tab-content'}>Full text</a>,
      },
      {
        id: 'figures',
        linkElement: <a href={'/reviewed-preprints/12345v1/figures#tab-content'}>Figures</a>,
      },
      {
        id: 'reviews',
        linkElement: <a href={'/reviewed-preprints/12345v1/reviews#tab-content'}>Peer review</a>,
      },
    ];
    render(<ArticlePage relatedContent={[]} msidWithVersion="12345v1" metaData={metaData} status={status} timeline={timeline} activeTab="fulltext" tabs={tabs} previousVersionWarningUrl="http://latest.version">
      <ArticleFullTextTab headings={[]} content={''} peerReview={peerReview} metaData={metaData} metrics={null} />
    </ArticlePage>);

    expect(screen.getByText('Full text')).toBeInTheDocument();
    expect(screen.getByText('Figures')).toBeInTheDocument();
    expect(screen.getByText('Peer review')).toBeInTheDocument();

    expect(screen.getByText('Full text').parentElement?.classList.value).toContain('tab-label--active');
    expect(screen.getByText('Figures').parentElement?.classList.value).not.toContain('tab-label--active');
    expect(screen.getByText('Peer review').parentElement?.classList.value).not.toContain('tab-label--active');

    cleanup();
    render(<ArticlePage relatedContent={[]} msidWithVersion="12345v1" metaData={metaData} status={status} timeline={timeline} activeTab="figures" tabs={tabs} previousVersionWarningUrl="http://latest.version">
      <ArticleFullTextTab headings={[]} content={''} peerReview={peerReview} metaData={metaData} metrics={null} />
    </ArticlePage>);

    expect(screen.getByText('Full text').parentElement?.classList.value).not.toContain('tab-label--active');
    expect(screen.getByText('Figures').parentElement?.classList.value).toContain('tab-label--active');
    expect(screen.getByText('Peer review').parentElement?.classList.value).not.toContain('tab-label--active');

    cleanup();
    render(<ArticlePage relatedContent={[]} msidWithVersion="12345v1" metaData={metaData} status={status} timeline={timeline} activeTab="reviews" tabs={tabs} previousVersionWarningUrl="http://latest.version">
      <ArticleFullTextTab headings={[]} content={''} peerReview={peerReview} metaData={metaData} metrics={null} />
    </ArticlePage>);

    expect(screen.getByText('Full text').parentElement?.classList.value).not.toContain('tab-label--active');
    expect(screen.getByText('Figures').parentElement?.classList.value).not.toContain('tab-label--active');
    expect(screen.getByText('Peer review').parentElement?.classList.value).toContain('tab-label--active');
  });

  it('passes correct doi to status component', () => {
    const expectedDoi = '10.7554/eLife.123456.1';
    const encodedExpectedDoi = encodeURIComponent(expectedDoi);
    const { container } = render(
      <ArticleStatus doi={expectedDoi} pdfUrl={metaData.pdfUrl} title={contentToText(metaData.title)} citation={citation} timeline={{ events: timeline }} msid="12345"/>,
    );

    fireEvent.click(screen.getByText('Share'));

    expect(screen.getByDisplayValue(expectedDoi, { exact: false })).toBeInTheDocument();

    Array.from(container.getElementsByClassName('socials-sharer'))
      .map((el) => el.getAttribute('href'))
      .forEach((url) => expect(url).toStrictEqual(expect.stringContaining(encodedExpectedDoi)));
  });

  it('renders related content', () => {
    render(<ArticlePage relatedContent={relatedContent} msidWithVersion="12345v1" metaData={metaData} status={status} timeline={timeline} activeTab="figures" tabs={[]} previousVersionWarningUrl="http://latest.version">
      <ArticleFullTextTab headings={[]} content={''} peerReview={peerReview} metaData={metaData} metrics={null} />
    </ArticlePage>);

    expect(screen.getByText('Related Insight')).toBeInTheDocument();
    expect(screen.getByText('Insight Title')).toBeInTheDocument();
    expect(screen.getByText('Insight article about this article')).toBeInTheDocument();
  });

  it('renders metrics if present', () => {
    render(<ArticlePage relatedContent={[]} msidWithVersion="12345v1" metaData={metaData} status={status} timeline={timeline} activeTab="figures" tabs={[]} previousVersionWarningUrl="http://latest.version">
      <ArticleFullTextTab headings={[]} content={''} peerReview={peerReview} metaData={metaData} metrics={null} />
    </ArticlePage>);

    expect(screen.queryByText('views')).not.toBeInTheDocument();
    expect(screen.queryByText('downloads')).not.toBeInTheDocument();
    expect(screen.queryByText('citations')).not.toBeInTheDocument();

    // cleanup and rerender with metrics
    cleanup();
    render(
      <ArticlePage
        metrics={{ views: 2, downloads: 3, citations: 5 }}
        relatedContent={[]}
        msidWithVersion="12345v1"
        metaData={{ ...metaData, authors: [] }}
        status={status}
        timeline={timeline}
        activeTab="figures"
        tabs={[]}
        previousVersionWarningUrl={null}
      >
        <ArticleFullTextTab headings={[]} content={''} peerReview={peerReview} metaData={metaData} metrics={null} />
      </ArticlePage>,
    );

    expect(screen.getByText('views', { exact: false }).textContent).toStrictEqual('2 views');
    expect(screen.getByText('downloads', { exact: false }).textContent).toStrictEqual('3 downloads');
    expect(screen.getByText('citations', { exact: false }).textContent).toStrictEqual('5 citations');
  });

  it('does not render metrics for pdf tab', () => {
    render(
      <ArticlePage
        metrics={{ views: 2, downloads: 3, citations: 5 }}
        relatedContent={[]}
        msidWithVersion="12345v1"
        metaData={{ ...metaData, authors: [] }}
        status={status}
        timeline={timeline}
        activeTab="pdf"
        tabs={[]}
        previousVersionWarningUrl="http://latest.version"
      >
        <div></div>
      </ArticlePage>,
    );

    expect(screen.queryByText('views')).not.toBeInTheDocument();
    expect(screen.queryByText('downloads')).not.toBeInTheDocument();
    expect(screen.queryByText('citations')).not.toBeInTheDocument();
  });

  it('does not render related-content for pdf tab', () => {
    render(
      <ArticlePage
        metrics={null}
        relatedContent={relatedContent}
        msidWithVersion="12345v1"
        metaData={{ ...metaData, authors: [] }}
        status={status}
        timeline={timeline}
        activeTab="pdf"
        tabs={[]}
        previousVersionWarningUrl="http://latest.version"
      >
        <div></div>
      </ArticlePage>,
    );

    expect(screen.queryByText('Related Insight')).not.toBeInTheDocument();
    expect(screen.queryByText('Insight Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Insight article about this article')).not.toBeInTheDocument();
  });
});
