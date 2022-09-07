import './button.scss';

type ButtonProps = {
  iconName: string,
  text: string,
};

export const Button = ({ text, iconName }: ButtonProps): JSX.Element => (
  <div className="button">
    <span className="material-icons button-icon">{iconName}</span>
    {text}
  </div>
);
