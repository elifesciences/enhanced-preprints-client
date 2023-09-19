import './copyright.scss';

type Copyright = {
  license: string
};

export const Copyright = ({ license }: Copyright) => {
  return <p>{license}</p>;
};
