import { DM_Sans, Poppins } from 'next/font/google';
import { type JSX } from 'react';
import './common.scss';
import './claims-tree-question-page.scss';
import {ClaimCard} from '../../../molecules/mira/claim-card/claim-card';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
  variable: '--font-poppins',
});

const claimsData = [
  {
    id: '1',
    questionNumber: '1',
    title: 'The guilt effect is associated with increased BOLD signal in the left anterior insula.',
    related: ['Figure', 'Study 2'],
  },
  {
    id: '2',
    questionNumber: '1',
    title: 'Functional connectivity between the left anterior insula and the right inferior frontal gyrus varies with choice and condition, suggesting the right IFG is sensitive to guilt-related information during social choices.',
    related: ['Figure', 'Study 2'],
  },
  {
    id: '3',
    questionNumber: '1',
    title: 'The left superior temporal sulcus tracks partner reward prediction errors specifically when they result from the participant\'s choices.',
    related: ['Figure', 'Study 2'],
  },
];

export const ClaimsTreeQuestionPage = (): JSX.Element => (
  <>
    <main className={`page-wrapper ${dmSans.variable} ${poppins.variable}`}>
      <a href="#" className="close">
        <span className="visuallyhidden">Navigate away from this page.</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2"></path></svg>
      </a>
      <div className="claims-tree-pages-content">
        <h1>Question 1</h1>
        <article className="card">
          <h2>Question:</h2>
          <p className="question-text"><span className="visuallyhidden">The question: </span>What are the neural mechanisms of interpersonal guilt and responsibility during social decisions under risk?</p>
          <p>The paper investigates how responsibility for a partner&#39;s outcomes in risky choices evokes guilt and which brain regions are involved.</p>
          <p className="provenance">
            {/* eslint-disable-next-line @stylistic/max-len */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.49946 4C8.66242 4.00003 8.82094 4.05315 8.95103 4.1513C9.08112 4.24945 9.1757 4.3873 9.22046 4.544L10.0335 7.39C10.2085 8.00292 10.5369 8.5611 10.9876 9.01183C11.4384 9.46255 11.9965 9.79095 12.6095 9.966L15.4555 10.779C15.6121 10.8239 15.7498 10.9185 15.8478 11.0486C15.9459 11.1786 15.9989 11.3371 15.9989 11.5C15.9989 11.6629 15.9459 11.8214 15.8478 11.9514C15.7498 12.0815 15.6121 12.1761 15.4555 12.221L12.6095 13.034C11.9965 13.209 11.4384 13.5374 10.9876 13.9882C10.5369 14.4389 10.2085 14.9971 10.0335 15.61L9.22046 18.456C9.1756 18.6126 9.08098 18.7503 8.9509 18.8484C8.82082 18.9464 8.66235 18.9995 8.49946 18.9995C8.33657 18.9995 8.1781 18.9464 8.04802 18.8484C7.91794 18.7503 7.82332 18.6126 7.77846 18.456L6.96546 15.61C6.79041 14.9971 6.46201 14.4389 6.01129 13.9882C5.56056 13.5374 5.00238 13.209 4.38946 13.034L1.54346 12.221C1.38686 12.1761 1.24913 12.0815 1.15108 11.9514C1.05303 11.8214 1 11.6629 1 11.5C1 11.3371 1.05303 11.1786 1.15108 11.0486C1.24913 10.9185 1.38686 10.8239 1.54346 10.779L4.38946 9.966C5.00238 9.79095 5.56056 9.46255 6.01129 9.01183C6.46201 8.5611 6.79041 8.00292 6.96546 7.39L7.77846 4.544C7.82322 4.3873 7.9178 4.24945 8.04789 4.1513C8.17798 4.05315 8.3365 4.00003 8.49946 4ZM17.4995 1C17.6668 0.999907 17.8293 1.05576 17.9612 1.15869C18.0931 1.26161 18.1869 1.40569 18.2275 1.568L18.4855 2.604C18.7215 3.544 19.4555 4.278 20.3955 4.514L21.4315 4.772C21.5941 4.81228 21.7385 4.90586 21.8418 5.0378C21.945 5.16974 22.0011 5.33246 22.0011 5.5C22.0011 5.66754 21.945 5.83026 21.8418 5.9622C21.7385 6.09414 21.5941 6.18772 21.4315 6.228L20.3955 6.486C19.4555 6.722 18.7215 7.456 18.4855 8.396L18.2275 9.432C18.1872 9.59463 18.0936 9.73908 17.9617 9.84233C17.8297 9.94558 17.667 10.0017 17.4995 10.0017C17.3319 10.0017 17.1692 9.94558 17.0373 9.84233C16.9053 9.73908 16.8117 9.59463 16.7715 9.432L16.5135 8.396C16.3981 7.93443 16.1594 7.5129 15.823 7.17648C15.4866 6.84005 15.065 6.60139 14.6035 6.486L13.5675 6.228C13.4048 6.18772 13.2604 6.09414 13.1571 5.9622C13.0539 5.83026 12.9978 5.66754 12.9978 5.5C12.9978 5.33246 13.0539 5.16974 13.1571 5.0378C13.2604 4.90586 13.4048 4.81228 13.5675 4.772L14.6035 4.514C15.065 4.39861 15.4866 4.15995 15.823 3.82352C16.1594 3.4871 16.3981 3.06557 16.5135 2.604L16.7715 1.568C16.8121 1.40569 16.9058 1.26161 17.0377 1.15869C17.1696 1.05576 17.3321 0.999907 17.4995 1ZM15.9995 14.5C16.157 14.4999 16.3105 14.5494 16.4383 14.6415C16.5661 14.7336 16.6617 14.8636 16.7115 15.013L17.1055 16.196C17.2555 16.643 17.6055 16.995 18.0535 17.144L19.2365 17.539C19.3854 17.589 19.5149 17.6845 19.6067 17.8121C19.6984 17.9397 19.7478 18.0929 19.7478 18.25C19.7478 18.4071 19.6984 18.5603 19.6067 18.6879C19.5149 18.8155 19.3854 18.911 19.2365 18.961L18.0535 19.356C17.6065 19.506 17.2545 19.856 17.1055 20.304L16.7105 21.487C16.6604 21.636 16.5649 21.7655 16.4373 21.8572C16.3098 21.9489 16.1566 21.9983 15.9995 21.9983C15.8423 21.9983 15.6892 21.9489 15.5616 21.8572C15.434 21.7655 15.3385 21.636 15.2885 21.487L14.8935 20.304C14.8198 20.0833 14.6958 19.8827 14.5313 19.7182C14.3667 19.5537 14.1662 19.4297 13.9455 19.356L12.7625 18.961C12.6135 18.911 12.484 18.8155 12.3923 18.6879C12.3005 18.5603 12.2512 18.4071 12.2512 18.25C12.2512 18.0929 12.3005 17.9397 12.3923 17.8121C12.484 17.6845 12.6135 17.589 12.7625 17.539L13.9455 17.144C14.3925 16.994 14.7445 16.644 14.8935 16.196L15.2885 15.013C15.3382 14.8637 15.4336 14.7339 15.5612 14.6418C15.6888 14.5497 15.8421 14.5001 15.9995 14.5Z" fill="currentColor"></path></svg>
            <span className="visuallyhidden">This was </span>Generated by AI from the below extract in the article text</p>
          <p className="attribution">Quoted text in Abstract:</p>

          <blockquote>“The neural mechanisms underlying guilt evoked during such situations of social responsibility are still unknown.”</blockquote>
        </article>
        <section className="claims">
          <h2>Related claims (3)</h2>
          {claimsData.map((claim, index) => (
            <div className="claim" key={claim.id}>
              <ClaimCard
                questionNumber={claim.questionNumber}
                claimNumber={(index + 1).toString()}
                title={claim.title}
                related={claim.related}>
              </ClaimCard>
            </div>
          ))}
        </section>
        <section>
          <h2>Other research exploring this question:</h2>
          <article className="supplementary-card">
            <header>Distinct representational properties of cues and contexts shape fear and reversal learning</header>
            <p>Antoine Bouyeure, Daniel Pacheco-Estefan, George Jacob, Malte Kobelt, Marie-Christin Fellner, Jonas Rose, Nikolai Axmacher</p>
          </article>
        </section>
      </div>
    </main>

  </>
);
