import { type Content } from '../../../types';
import { contentToJsx } from '../../../utils/content';
import './title.scss';

export const Title = ({ title }: { title: Content }) => (
  <h1 className="title">{contentToJsx(title)}</h1>
);
