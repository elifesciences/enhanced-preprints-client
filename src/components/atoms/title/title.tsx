import { type JSX } from 'react';
import { contentToJsx, type Content } from '../../../content';
import './title.scss';

export const Title = ({ title }: { title: Content }): JSX.Element => (
  <h1 className="title">{contentToJsx(title)}</h1>
);
