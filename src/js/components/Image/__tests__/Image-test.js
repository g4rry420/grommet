import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Grommet } from '../../Grommet';
import { Image } from '..';

const opacityTypes = ['weak', 'medium', 'strong', '0.3', true, false];
const SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAA1JREFUCB1jYGBg+A8AAQQBAB5znEAAAAAASUVORK5CYII='; // eslint-disable-line max-len

test('image should have no violations', async () => {
  const { container } = render(
    <Grommet>
      <Image src={SRC} a11yTitle="Alt Text" />
    </Grommet>,
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();

  cleanup();
});

test('Image renders', () => {
  const { container } = render(
    <Grommet>
      <Image src={SRC} />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('Image renders with aria-label', () => {
  const { container } = render(
    <Grommet>
      <Image a11yTitle="aria-label-text" src={SRC} />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('Image fit renders', () => {
  const { container } = render(
    <Grommet>
      <Image fit="cover" src={SRC} />
      <Image fit="contain" src={SRC} />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

opacityTypes.forEach(opacity => {
  test(`Image opacity of ${opacity} renders`, () => {
    const { container } = render(
      <Grommet>
        <Image opacity={opacity} src={SRC} />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });
});

test('Image fillProp renders', () => {
  const { container } = render(
    <Grommet>
      <Image fill src={SRC} />
      <Image fill={false} src={SRC} />
      <Image fill="horizontal" src={SRC} />
      <Image fill="vertical" src={SRC} />
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});

test('Image onError', () => {
  const onError = jest.fn();
  const { getByAltText } = render(
    <Grommet>
      <Image alt="test" onError={onError} />
    </Grommet>,
  );

  act(() => {
    fireEvent(getByAltText('test'), new Event('error'));
  });

  expect(onError).toHaveBeenCalledTimes(1);
});
