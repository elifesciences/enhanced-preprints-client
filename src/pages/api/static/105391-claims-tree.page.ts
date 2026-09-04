/* eslint-disable @stylistic/max-len */
import type { NextApiRequest, NextApiResponse } from 'next';
// ts-unused-exports:disable-next-line
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>105391 Claims Tree</title>
    <style>
      .visuallyhidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        user-select: none;
        width: 1px;
      }
    </style>

  </head>
  <body>
    <h1>Claims tree</h1>

    <section>
      <div class="visuallyhidden">There are 3 questions</div>
      <ul role="list">

        <li role="listitem">
          <header>Question 1 (<span class="visuallyhidden">comprises </span>3 claims)</header>
          <p><span class="visuallyhidden">The question: </span>What are the neural mechanisms of interpersonal guilt and responsibility during social decisions under risk?</p>

          <section>
          
            <header class="visuallyhidden">There are 3 claims for this question:</header>
            
            <article>
              <header>Claim 1 (question 1)</header>
              <p>The guilt effect is associated with increased BOLD signal in the left anterior insula.</p>
              
              <section>
                <header class="visuallyhidden">There is 1 piece of evidence for this claim.</header>
                <article>
                  <header>Evidence (claim 1, question 1) — Figure 3</header>
                  <p>Happiness ratings decrease more after negative partner outcomes when the participant made the choice (Social condition) than when the partner made the choice (Partner condition), operationalizing interpersonal guilt as responsibility-contingent unhappiness about partner harm.</p>
                </article>
              </section>
            
            </article>
            
            <article>            
              <header>Claim 2 (question 1)</header>
              <p>The insula-as-guilt-substrate question predicts elevated anterior insula BOLD in Social vs Partner trials specifically after negative partner outcomes — the (condition × outcome) interaction in an a priori insula ROI.</p>
              
              <section>
                <header class="visuallyhidden">There is 1 piece of evidence for this claim.</header>
                <article>
                  <header>Evidence (claim 2, question 1) — Figure 4</header>
                  <p>Anterior insula BOLD activity is significantly elevated in the Social condition compared to the Partner condition specifically after negative partner outcomes, tracking the guilt effect (responsibility-contingent partner unhappiness).</p>
                </article>
               </section>
               
            </article>
            
          </section>  
          
        </li>

        <li role="listitem">
          <header>Question 2 (<span class="visuallyhidden">comprises </span>3 claims)</header>
          <p>Happiness incorporates partner reward prediction errors with a responsibility-weighted rule — partner RPEs caused by the participant's own choices receive an independent, non-zero weight in the happiness computation.</p>
        </li>

        <li role="listitem">
          <header>Question 3</header>
        </li>

      </ul>
    </section>
  </body>
</html>
`);
};
