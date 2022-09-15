import { render, screen } from '@testing-library/react';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  it('renders the logo image with alt text', () => {
    render(<SiteHeader />);

    expect(screen.getByAltText('eLife logo', { exact: false }).getAttribute('src')?.endsWith('elife-logo.svg')).toStrictEqual(true);
  });

  it('renders additional classes on the root Site Header element', () => {
    render(<SiteHeader additionalClasses={['testClass']} />);

    expect(
      screen.getByAltText('eLife logo', { exact: false })
        .parentElement
        ?.classList,
    ).toContain('testClass');
  });
});
