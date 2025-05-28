import { render, screen } from '@testing-library/react';
import { ReviewProcess } from './review-process';
import '../../../i18n';

describe('Review Process', () => {
  it('renders review process', () => {
    render(<ReviewProcess />);

    expect(screen.getByText('Peer review process')).toBeInTheDocument();
  });

  it('shows the not revised description when version is 1', () => {
    render(<ReviewProcess current={1} />);

    expect(screen.getByText('Not revised:')).toBeInTheDocument();
  });

  it('shows the not revised description without author response', () => {
    render(<ReviewProcess current={1} authorResponse={false} />);

    expect(screen.getByText('This Reviewed Preprint includes the authors’ original preprint (without revision), an eLife assessment, and public reviews.')).toBeInTheDocument();
  });

  it('shows the not revised description with author response', () => {
    render(<ReviewProcess current={1} authorResponse={true} />);

    expect(screen.getByText('Not revised:')).toBeInTheDocument();
    expect(screen.getByText('This Reviewed Preprint includes the authors’ original preprint (without revision), an eLife assessment, public reviews, and a provisional response from the authors.')).toBeInTheDocument();
  });

  it('shows the revised description when version is above 1', () => {
    render(<ReviewProcess current={2} />);

    expect(screen.getByText('Revised:')).toBeInTheDocument();
  });

  it('shows the not revised description with an evaluation summary class', () => {
    render(<ReviewProcess current={1} evaluationSummary={true} />);

    expect(document.querySelectorAll('.review-process--reviewed')).toHaveLength(1);
    expect(document.querySelectorAll('.review-process--with-evaluation-summary')).toHaveLength(1);
  });

  it.failing('shows the description with a version of record class', () => {
    render(<ReviewProcess current={1} versionOfRecord={true} />);

    expect(document.querySelectorAll('.review-process--version-of-record')).toHaveLength(1);
  });
});
