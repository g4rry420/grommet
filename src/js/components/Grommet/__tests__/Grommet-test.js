import React from 'react';
import 'jest-styled-components';
import { cleanup, render } from '@testing-library/react';

import { hpe as hpeTheme } from 'grommet-theme-hpe';

import { Grommet } from '..';
import { Heading } from '../../Heading';
import { AnnounceContext, ResponsiveContext } from '../../../contexts';
import { grommet } from '../../../themes/grommet';

const TestAnnouncer = ({ announce }) => {
  React.useEffect(() => announce('hello', 'assertive'));
  return <div>hi</div>;
};

const customBreakpointsTheme = {
  global: {
    deviceBreakpoints: {
      phone: 'small',
      tablet: 'medium',
      computer: 'large',
    },
    breakpoints: {
      small: {
        value: 600,
      },
      medium: {
        value: 800,
      },
      large: {
        value: 1000,
      },
    },
  },
};

const SSRTester = ({ ua }) => (
  <Grommet theme={customBreakpointsTheme} userAgent={ua}>
    <ResponsiveContext.Consumer>
      {size => <Heading>{`Received size ${size} for ${ua}`}</Heading>}
    </ResponsiveContext.Consumer>
  </Grommet>
);

describe('Grommet', () => {
  afterEach(cleanup);

  test('basic', () => {
    const { container } = render(<Grommet />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('grommet theme', () => {
    const { container } = render(<Grommet theme={grommet} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('hpe theme', () => {
    const { container } = render(
      <Grommet theme={hpeTheme}>Grommet App</Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('themeMode', () => {
    const { container } = render(<Grommet theme={grommet} themeMode="dark" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('cssVars', () => {
    const { container } = render(<Grommet cssVars>Grommet App</Grommet>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('full', () => {
    const { container } = render(<Grommet full>Grommet App</Grommet>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('background', () => {
    const { container } = render(
      <Grommet full background="#0000ff">
        Grommet App
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('announce', done => {
    const { container } = render(
      <Grommet>
        <AnnounceContext.Consumer>
          {announce => <TestAnnouncer announce={announce} />}
        </AnnounceContext.Consumer>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    // no style, no need for expectPortal
    expect(
      document.body.querySelector('#grommet-announcer[aria-live]'),
    ).toMatchSnapshot();

    setTimeout(() => {
      // should clear the aria-live container
      expect(
        document.body.querySelector('#grommet-announcer[aria-live]'),
      ).toMatchSnapshot();
      done();
    }, 600); // wait the aria-live container to clear
  });

  [
    /* eslint-disable max-len */
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A452 Safari/601.1 PTST/396',
    'Mozilla/5.0 (iPad; CPU OS 11_2_1 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C153 [FBAN/FBIOS;FBAV/156.0.0.41.97;FBBV/89172188;FBDV/iPad5,3;FBMD/iPad;FBSN/iOS;FBSV/11.2.1;FBSS/2;FBCR/;FBID/tablet;FBLC/en_GB;FBOP/5;FBRV/0]',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
    /* eslint-enable max-len */
  ].forEach(ua => {
    test(`ssr rendering ${ua.substring(0, 25)}`, () => {
      const { container, unmount } = render(<SSRTester ua={ua} />);
      expect(container.firstChild).toMatchSnapshot();
      unmount();
    });
  });
});
