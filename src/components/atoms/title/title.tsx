import { contentToJsx } from '../../../utils/content';
import { Content } from '../../../types';
import './title.scss';

export const Title = ({ title }: { title: Content }) => (
  <h1 className="title">{contentToJsx(title)}</h1>
);
