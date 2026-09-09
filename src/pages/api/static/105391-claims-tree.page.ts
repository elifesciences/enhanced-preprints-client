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
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Poppins:wght@600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/static/105391.css">
  </head>
  <body>
    <h1>Claims tree</h1>

    <section>
      <div class="visuallyhidden">There are 3 questions</div>
      <ul role="list">

        <li role="listitem" class="question">
          <a href="#" draggable="false" class="card">
            <header>Question 1 (<span class="visuallyhidden">comprises </span>3 claims)</header>
            <p><span class="visuallyhidden">The question: </span>What are the neural mechanisms of interpersonal guilt and responsibility during social decisions under risk?</p>
          </a>
          <section>
          
            <header class="visuallyhidden">There are 3 claims for this question:</header>
            
            <a href="#" draggable="false" class="card">
              <article>
                <header>Claim 1 <span class="supplementary">(question 1)</span></header>
                <p>The guilt effect is associated with increased BOLD signal in the left anterior insula.</p>            
                <div><span class="visuallyhidden">The following is related to this claim: </span><span>Figure</span><span class="visuallyhidden">, </span><span>Study 2</span></div>
              </article>
            </a>
            
            <a href="#" draggable="false" class="card">
              <article>            
                <header>Claim 2 <span class="supplementary">(question 1)</span></header>
                <p>Functional connectivity between the left anterior insula and the right inferior frontal gyrus varies with choice and condition, suggesting the right IFG is sensitive to guilt-related information during social choices.</p>               
                <div><span class="visuallyhidden">The following is related to this claim: </span><span>Figure</span><span class="visuallyhidden">, </span><span>Study 2</span></div>
              </article>
            </a>

            <a href="#" draggable="false" class="card">
              <article>            
                <header>Claim 3 <span class="supplementary">(question 1)</span></header>
                <p>The left superior temporal sulcus tracks partner reward prediction errors specifically when they result from the participant's choices.</p>               
                <div><span class="visuallyhidden">The following is related to this claim: </span><span>Figure</span><span class="visuallyhidden">, </span><span>Study 2</span></div>
              </article>
            </a>
            
          </section>  
          
        </li>

        <li role="listitem" class="question">
          <a href="#" draggable="false" class="card">
            <header>Question 2 (<span class="visuallyhidden">comprises </span>2 claims)</header>
            <p>Happiness incorporates partner reward prediction errors with a responsibility-weighted rule — partner RPEs caused by the participant's own choices receive an independent, non-zero weight in the happiness computation.</p>
          </a>
          <section>

            <header class="visuallyhidden">There are 2 claims for this question:</header>

            <a href="#" draggable="false" class="card">
              <article>
                <header>Claim 4 <span class="supplementary">(question 2)</span></header>
                <p>Responsibility for a partner's bad lottery outcomes decreases participant happiness more than the same outcomes following partner choices, consistent with interpersonal guilt.</p>            
                  <div><span class="visuallyhidden">The following is related to this claim: </span><span>Data</span><span class="visuallyhidden">, </span><span>Study 1 & 2</span></div>
              </article>
            </a>
            
            <a href="#" draggable="false" class="card">
              <article>            
                <header>Claim 5 <span class="supplementary">(question 2)</span></header>
                <p>Computational models incorporating partner reward prediction errors differentiated by decision-maker (participant vs partner) best explain momentary happiness variations.</p>               
                <div><span class="visuallyhidden">The following is related to this claim: </span><span>Data</span><span class="visuallyhidden">, </span><span>Study 1 & 2</span></div>
              </article>
            </a>

          </section>

        </li>

        <li role="listitem" class="question">
          <a href="#" draggable="false" class="card">
            <header>Question 3 (<span class="visuallyhidden">comprises </span>1 claim)</header>
            <p>Do risk preferences differ between Solo and Social conditions?</p>
          </a>

          <section>

            <header class="visuallyhidden">There is 1 claim for this question:</header>

            <a href="#" draggable="false" class="card">
              <article>
                <header>Claim 6 <span class="supplementary">(question 3)</span></header>
                <p>Participants show similar risk preferences when deciding for themselves versus for themselves and a partner, with a tendency toward higher risk aversion in the Social condition only in Study 1.</p>            
                <div><span class="visuallyhidden">The following is related to this claim: </span><span>Data</span><span class="visuallyhidden">, </span><span>Study 1 & 2</span></div>
              </article>
            </a>

          </section>

        </li>

      </ul>
    </section>
  </body>
</html>
`);
};
