/* eslint-disable @stylistic/max-len */
import { type JSX } from 'react';
import './claims-tree-page.scss';

export const ClaimsTreePage = (): JSX.Element => (
  <>
    <main className="page-wrapper">
      <a href="#" className="close"><span className="visuallyhidden">Navigate away from this page.</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2"></path></svg></a>
      <div className="claims-tree-content">
        <h1>Claims tree</h1>
        <div className="visuallyhidden">There are 3 questions</div>
        <ul role="list">

          <li role="listitem" className="question">
            <a href="#" draggable="false" className="card">
              <header>Question 1<span aria-hidden="true" className="dot">&nbsp;&#x2022;&nbsp;</span><span className="visuallyhidden">comprises </span>3 claims<span className="visuallyhidden">.</span></header>
              <p><span className="visuallyhidden">The question: </span>What are the neural mechanisms of interpersonal guilt and responsibility during social decisions under risk?</p>
            </a>
            <section className="claims">

              <header className="visuallyhidden">There are 3 claims for this question:</header>

              <div className="claim-row">
                <a href="#" draggable="false" className="card">
                  <article>
                    <header>Claim 1 <span className="supplementary">(question&nbsp;1)</span></header>
                    <p>The guilt effect is associated with increased BOLD signal in the left anterior insula.</p>
                    <div className="related"><span className="visuallyhidden">The following is related to this claim: </span><span className="related-item"><span>Figure</span></span><span className="visuallyhidden">, </span><span className="related-item"><span>Study 2</span></span></div>
                  </article>
                </a>
              </div>

              <div className="claim-row">
                <a href="#" draggable="false" className="card">
                  <article>
                    <header>Claim 2 <span className="supplementary">(question&nbsp;1)</span></header>
                    <p>Functional connectivity between the left anterior insula and the right inferior frontal gyrus varies with choice and condition, suggesting the right IFG is sensitive to guilt-related information during social choices.</p>
                    <div className="related"><span className="visuallyhidden">The following is related to this claim: </span><span className="related-item"><span>Figure</span></span><span className="visuallyhidden">, </span><span className="related-item"><span>Study 2</span></span></div>
                  </article>
                </a>
              </div>

              <div className="claim-row">
                <a href="#" draggable="false" className="card">
                  <article>
                    <header>Claim 3 <span className="supplementary">(question&nbsp;1)</span></header>
                    <p>The left superior temporal sulcus tracks partner reward prediction errors specifically when they result from the participant&apos;s choices.</p>
                    <div className="related"><span className="visuallyhidden">The following is related to this claim: </span><span className="related-item"><span>Figure</span></span><span className="visuallyhidden">, </span><span className="related-item"><span>Study 2</span></span></div>
                  </article>
                </a>
              </div>
            </section>

          </li>

          <li role="listitem" className="question">
            <a href="#" draggable="false" className="card">
              <header>Question 2<span aria-hidden="true" className="dot">&nbsp;&#x2022;&nbsp;</span><span className="visuallyhidden">comprises </span>2 claims<span className="visuallyhidden">.</span></header>
              <p><span className="visuallyhidden">The question: </span>Happiness incorporates partner reward prediction errors with a responsibility-weighted rule — partner RPEs caused by the participant&apos;s own choices receive an independent, non-zero weight in the happiness computation.</p>
            </a>
            <section className="claims">

              <header className="visuallyhidden">There are 2 claims for this question:</header>
              <div className="claim-row">
                <a href="#" draggable="false" className="card">
                  <article>
                    <header>Claim 4 <span className="supplementary">(question&nbsp;2)</span></header>
                    <p>Responsibility for a partner&apos;s bad lottery outcomes decreases participant happiness more than the same outcomes following partner choices, consistent with interpersonal guilt.</p>
                    <div className="related"><span className="visuallyhidden">The following is related to this claim: </span><span className="related-item"><span>Data</span></span><span className="visuallyhidden">, </span><span className="related-item"><span>Study 1 & 2</span></span></div>
                  </article>
                </a>
              </div>

              <div className="claim-row">
                <a href="#" draggable="false" className="card">
                  <article>
                    <header>Claim 5 <span className="supplementary">(question&nbsp;2)</span></header>
                    <p>Computational models incorporating partner reward prediction errors differentiated by decision-maker (participant vs partner) best explain momentary happiness variations.</p>
                    <div className="related"><span className="visuallyhidden">The following is related to this claim: </span><span className="related-item"><span>Data</span></span><span className="visuallyhidden">, </span><span className="related-item"><span>Study 1 & 2</span></span></div>
                  </article>
                </a>
              </div>
            </section>

          </li>

          <li role="listitem" className="question">
            <a href="#" draggable="false" className="card">
              <header>Question 3<span aria-hidden="true" className="dot">&nbsp;&#x2022;&nbsp;</span><span className="visuallyhidden">comprises </span>1 claim<span className="visuallyhidden">.</span></header>
              <p><span className="visuallyhidden">The question: </span>Do risk preferences differ between Solo and Social conditions?</p>
            </a>

            <section className="claims">

              <header className="visuallyhidden">There is 1 claim for this question:</header>

              <div className="claim-row">
                <a href="#" draggable="false" className="card">
                  <article>
                    <header>Claim 6 <span className="supplementary">(question&nbsp;3)</span></header>
                    <p>Participants show similar risk preferences when deciding for themselves versus for themselves and a partner, with a tendency toward higher risk aversion in the Social condition only in Study 1.</p>
                    <div className="related"><span className="visuallyhidden">The following is related to this claim: </span><span className="related-item"><span>Data</span></span><span className="visuallyhidden">, </span><span className="related-item"><span>Study 1 & 2</span></span></div>
                  </article>
                </a>
              </div>
            </section>

          </li>

        </ul>
      </div>
    </main>

  </>
);
