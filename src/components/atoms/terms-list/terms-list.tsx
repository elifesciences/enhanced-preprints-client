export const TermsList = () => {
  const terms = ['Landmark', 'Fundamental', 'Important', 'Valuable', 'Useful'];
  return (
    <>
      <p><b>Valuable</b>: Contains findings that have theoretical or practical implications for a subfield.</p>
      <div className="terms-list">
        {terms.map((term) => (
          <span className="term" key={term}>{term}</span>
        ))}
      </div>
    </>
  );
};
