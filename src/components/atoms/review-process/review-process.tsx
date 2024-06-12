import './review-process.scss';

export const ReviewProcess = () => (
  <section className="review-process">
    <h2 className="review-process__header">Peer review process</h2>
    <div className="review-process__container">
      <p className="review-process__body"><b>Not revised:</b> This Reviewed Preprint includes the authors’ original preprint (without revision), an eLife assessment, public reviews, and a response from the authors (if available).</p>
      <a className="review-process__link link-reviewed" href="#">Read more about eLife’s peer review process.</a>
    </div>
  </section>
);
