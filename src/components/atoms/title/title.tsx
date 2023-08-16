import { JSX } from 'react';
import { contentToJsx } from '../../../utils/content-to-jsx';
import { Content } from '../../../types';
import './title.scss';

export const Title = ({ title }: { title: Content }): JSX.Element => (
  <h1 className="title">{contentToJsx(title)}</h1>
);
