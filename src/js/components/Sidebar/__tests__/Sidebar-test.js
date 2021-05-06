import React from 'react';
import { cleanup, render } from '@testing-library/react';

import 'jest-styled-components';

import { Avatar } from '../../Avatar';
import { Grommet } from '../../Grommet';
import { Sidebar } from '..';

const src = '';

describe('Sidebar', () => {
  afterEach(cleanup);

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Sidebar id="test id" name="test name" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('header', () => {
    const { container } = render(
      <Grommet>
        <Sidebar header={<Avatar src={src} />} />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('footer', () => {
    const { container } = render(
      <Grommet>
        <Sidebar footer={<Avatar src={src} />} />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('children', () => {
    const { container } = render(
      <Grommet>
        <Sidebar>
          <Avatar src={src} />
          children test
        </Sidebar>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('all', () => {
    const { container } = render(
      <Grommet>
        <Sidebar
          footer={<Avatar>SY</Avatar>}
          header={<Avatar src={src} />}
          background="brand"
        >
          test all props and children
        </Sidebar>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });
});
