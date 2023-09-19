import './copyright.scss';

type Copyright = {
  license?: string,
};

export const Copyright = ({ license }: Copyright) => {
  let text;

  if (license && license.includes('/by/')) {
    text = 'by';
  } else if (license && license.includes('/zero/')) {
    text = 'zero';
  } else {
    text = 'Default Text';
  }

  return (
    <div>
      2023 A Name <p>{text}</p>
    </div>
  );
};
