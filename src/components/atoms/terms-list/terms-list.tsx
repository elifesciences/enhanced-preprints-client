import './terms-list.scss';

export const TermsList = () => {
  const terms = ['Landmark', 'Fundamental', 'Important', 'Valuable', 'Useful'];
  return (
    <div className='terms-container'>
      <p className='term-description'>
        <b>Valuable</b>: Contains findings that have theoretical or practical implications for a subfield.
      </p>
      <div className="terms-list">
        {terms.map((term) => (
          <span className="term" key={term}>{term}</span>
        ))}
      </div>
    </div>
  );
};
