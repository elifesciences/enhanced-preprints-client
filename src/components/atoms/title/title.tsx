import './title.scss';
import { contentToJsx } from '../../../utils/content-to-jsx';
import { Content } from '../../../types/content';

export const Title = ({ title }: { title: Content }): JSX.Element => (
  <h1 className="title">{contentToJsx(title)}</h1>
);
