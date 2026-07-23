import { type JSX } from 'react';
import { contentToJsx } from '../../../content';
import { type Content } from '../../../types';
import './title.scss';

export const Title = ({ title }: { title: Content }): JSX.Element => (
  <h1 className="title">{contentToJsx(title)}</h1>
);
