import './title.scss';

export const Title = ({ title }: { title: string }): JSX.Element => (
  <h1 className="title">{title}</h1>
);
