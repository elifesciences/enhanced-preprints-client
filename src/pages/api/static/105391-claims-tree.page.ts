/* eslint-disable @stylistic/max-len */
import type { NextApiRequest, NextApiResponse } from 'next';
// ts-unused-exports:disable-next-line
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>105391 Claims Tree</title>
  </head>
  <body>
    <h1>Claims tree</h1>

    <nav aria-label="Hypotheses">
      <ul role="list">
        <li role="listitem"><a href="#hypothesis-1">Hypothesis 1</a></li>
        <li role="listitem"><a href="#hypothesis-2">Hypothesis 2</a></li>
        <li role="listitem"><a href="#hypothesis-3">Hypothesis 3</a></li>
      </ul>
    </nav>

    <section>
      <h2>Hypotheses</h2>
      <div class="visuallyhidden">There are 3 hypotheses</div>
      <ul role="list">

        <li role="listitem">

          <dl id="hypothesis-1">
            <dt role="listitem">Hypothesis 1 (<span class="visuallyhidden">comprises </span>2 claims)</dt>
            <dd>
              <p><span class="visuallyhidden">The hypothesis is: </span>Anterior insula encodes interpersonal guilt — the responsibility-contingent affect arising specifically when one's own choice has caused harm to another.</p>
              <dl>
                <dt role="listitem">Claim 1 (hypothesis 1)</dt>
                <dd>
                  <p>The guilt hypotheses predict a behavioral interaction: happiness should drop more after negative partner outcomes when the participant — rather than the partner — made the choice.</p>
                  <dl>
                    <dt role="listitem">Evidence (claim 1, hypothesis 1) — Figure 3</dt>
                    <dd>
                      <p>Happiness ratings decrease more after negative partner outcomes when the participant made the choice (Social condition) than when the partner made the choice (Partner condition), operationalizing interpersonal guilt as responsibility-contingent unhappiness about partner harm.</p>
                    </dd>
                  </dl>
                </dd>

                <dt role="listitem">Claim 2 (hypothesis 1)</dt>
                <dd>
                  <p>The insula-as-guilt-substrate hypothesis predicts elevated anterior insula BOLD in Social vs Partner trials specifically after negative partner outcomes — the (condition × outcome) interaction in an a priori insula ROI.</p>
                  <dl>
                    <dt role="listitem">Evidence (claim 2, hypothesis 1) — Figure 4</dt>
                    <dd>
                      <p>Anterior insula BOLD activity is significantly elevated in the Social condition compared to the Partner condition specifically after negative partner outcomes, tracking the guilt effect (responsibility-contingent partner unhappiness).</p>
                    </dd>
                  </dl>
                </dd>

              </dl>
            </dd>
          </dl>

        </li>

        <li role="listitem">

          <dl id="hypothesis-2">
            <dt role="listitem">Hypothesis 2 • 3 claims</dt>
            <dd>
              <p>Happiness incorporates partner reward prediction errors with a responsibility-weighted rule — partner RPEs caused by the participant's own choices receive an independent, non-zero weight in the happiness computation.</p>
            </dd>
          </dl>

        </li>

        <li role="listitem">

          <dl id="hypothesis-3">
            <dt role="listitem">Hypothesis 3</dt>
            <dd></dd>
          </dl>

        </li>

      </ul>
    </section>
  </body>
</html>
`);
};
