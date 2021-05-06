import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Paragraph } from '..';

test('Paragraph renders', () => {
  const { container } = render(
    <Grommet>
      <Paragraph />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('Paragraph size renders', () => {
  const { container } = render(
    <Grommet>
      <Paragraph size="small" />
      <Paragraph size="medium" />
      <Paragraph size="large" />
      <Paragraph size="xlarge" />
      <Paragraph size="xxlarge" />
      <Paragraph fill />
      <Paragraph fill={false} />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('Paragraph margin renders', () => {
  const { container } = render(
    <Grommet>
      <Paragraph margin="small" />
      <Paragraph margin="medium" />
      <Paragraph margin="large" />
      <Paragraph margin="none" />
      <Paragraph margin={{ bottom: 'small' }} />
      <Paragraph margin={{ top: 'small' }} />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('Paragraph textAlign renders', () => {
  const { container } = render(
    <Grommet>
      <Paragraph textAlign="start" />
      <Paragraph textAlign="center" />
      <Paragraph textAlign="end" />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});
