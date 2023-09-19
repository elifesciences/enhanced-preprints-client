import './copyright.scss';

type Copyright = {
  license?: string,
};

export const Copyright = ({ license }: Copyright) => {
  return (<div>2023 A Name <p>{license}</p></div>);
};
