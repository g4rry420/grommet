import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { Text } from '..';

test('should have no accessibility violations', async () => {
  const { container } = render(
    <Grommet>
      <Text a11yTitle="test"> Example</Text>
    </Grommet>,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  expect(container.firstChild).toMatchSnapshot();
});

test('renders', () => {
  const { container } = render(
    <Grommet>
      <Text>text</Text>
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('accepts ref', () => {
  const ref = React.createRef();
  const { container } = render(
    <Grommet>
      <Text ref={ref}>text</Text>
    </Grommet>,
    { createNodeMock: el => el },
  );
  expect(ref.current).not.toBeNull();
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('renders size', () => {
  const { container } = render(
    <Grommet>
      <Text size="xsmall" />
      <Text size="small" />
      <Text size="medium" />
      <Text size="large" />
      <Text size="xlarge" />
      <Text size="xxlarge" />
      <Text size="2xl" />
      <Text size="3xl" />
      <Text size="4xl" />
      <Text size="5xl" />
      <Text size="6xl" />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('renders textAlign', () => {
  const { container } = render(
    <Grommet>
      <Text textAlign="start" />
      <Text textAlign="center" />
      <Text textAlign="end" />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('renders margin', () => {
  const { container } = render(
    <Grommet>
      <Text margin="small" />
      <Text margin="medium" />
      <Text margin="large" />
      <Text margin="none" />
      <Text margin={{ vertical: 'small' }} />
      <Text margin={{ horizontal: 'small' }} />
      <Text margin={{ bottom: 'small' }} />
      <Text margin={{ top: 'small' }} />
      <Text margin={{ left: 'small' }} />
      <Text margin={{ right: 'small' }} />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

const LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';

test('renders truncate', () => {
  const { container } = render(
    <Grommet>
      <Text truncate={false}>{LONG}</Text>
      <Text truncate>{LONG}</Text>
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('renders color', () => {
  const { container } = render(
    <Grommet>
      <Text color="status-critical" />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('renders tag', () => {
  const { container } = render(
    <Grommet>
      <Text as="div" />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('proxies tag', () => {
  const tagComponent = render(
    <Grommet>
      <Text tag="div" />
    </Grommet>,
  );
  const asComponent = render(
    <Grommet>
      <Text as="div" />
    </Grommet>,
  );
  expect(tagComponent.container.firstChild).toEqual(
    asComponent.container.firstChild,
  );
});

test('renders weight', () => {
  const { container } = render(
    <Grommet>
      <Text weight="normal" />
      <Text weight="bold" />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});
