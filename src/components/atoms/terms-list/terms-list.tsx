export const TermsList = () => {
  const terms = ['Landmark', 'Fundamental', 'Important', 'Valuable', 'Useful'];
  return (
    <div className="terms-list">
      {terms.map((term) => (
        <span className="term" key={term}>{term}</span>
      ))}
    </div>
  );
};
