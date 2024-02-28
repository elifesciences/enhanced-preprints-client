// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { TextEncoder } from 'util';
import { i18n } from './i18n';

i18n.setDefaultNamespace('elife');
global.TextEncoder = TextEncoder;
