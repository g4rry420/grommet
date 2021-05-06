import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { Add, Next } from 'grommet-icons';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { findAllByType } from '../../../utils';
import { Grommet, Button, Text } from '../..';

describe('Button', () => {
  afterEach(cleanup);

  test('should have no accessibility violations', async () => {
    const { container, getByText } = render(
      <Grommet>
        <Button a11yTitle="Test button" label="Test" onClick={() => {}} />
      </Grommet>,
    );

    fireEvent.click(getByText('Test'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('passes through the aria-label prop', async () => {
    const TEST_LABEL = 'Test Label';
    const { container, getByText } = render(
      <Grommet>
        <Button aria-label={TEST_LABEL} label="Test" onClick={() => {}} />
      </Grommet>,
    );

    const button = container.querySelector('button');
    expect(button.getAttribute('aria-label')).toEqual(TEST_LABEL);

    fireEvent.click(getByText('Test'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <Button label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('children function', () => {
    const { container } = render(
      <Grommet>
        <Button onClick={() => {}}>{() => <Text>Test</Text>}</Button>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('children function with disabled prop', () => {
    const { container } = render(
      <Grommet>
        <Button onClick={() => {}} disabled>
          {({ disabled }) => <Text>{disabled ? 'Disabled' : 'Test'}</Text>}
        </Button>
        <Button onClick={() => {}}>
          {({ disabled }) => <Text>{disabled ? 'Disabled' : 'Test'}</Text>}
        </Button>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('warns about invalid label', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const { container } = render(
      <Grommet>
        <Button label="Test" onClick={() => {}}>
          invalid
        </Button>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith(
      'Button should not have children if icon or label is provided',
    );
    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('warns about invalid icon', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const { container } = render(
      <Grommet>
        <Button icon={<svg />} onClick={() => {}}>
          invalid
        </Button>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith(
      'Button should not have children if icon or label is provided',
    );
    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('primary', () => {
    const { container } = render(
      <Grommet>
        <Button primary label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('color', () => {
    const { container } = render(
      <Grommet>
        <Button color="accent-1" label="Test" onClick={() => {}} />
        <Button color="accent-1" primary label="Test" onClick={() => {}} />
        <Button color="#111111" primary label="Test" onClick={() => {}} />
        <Button color="#123" primary label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('fill', () => {
    const component = renderer.create(
      <Grommet>
        <Button>
          <Button fill />
          <Button fill={false} />
          <Button fill="horizontal" />
          <Button fill="vertical" />
        </Button>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('focus', () => {
    const { container, getByText } = render(
      <Grommet>
        <Button label="Test" onClick={() => {}} />
      </Grommet>,
    );

    fireEvent.focus(getByText('Test'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('tip', () => {
    const { container, getByText } = render(
      <Grommet>
        <Button label="Default Tip" onClick={() => {}} tip="tooltip" />
      </Grommet>,
    );

    fireEvent.mouseOver(getByText('Default Tip'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(
      <Grommet>
        <Button disabled />
        <Button disabled primary label="Button" />
        <Button disabled label="Button" />
        <Button disabled plain label="Button" />
        <Button disabled plain={false} label="Button" />
        <Button disabled icon={<svg />} />
        <Button disabled icon={<svg />} plain />
        <Button disabled icon={<svg />} plain={false} />
        <Button disabled icon={<svg />} label="Button" />
        <Button disabled icon={<svg />} label="Button" plain />
        <Button disabled icon={<svg />} label="Button" primary />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('active', () => {
    const { container } = render(
      <Grommet>
        <Button active label="Button" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('active + primary', () => {
    const { container } = render(
      <Grommet>
        <Button active primary label="Button" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('icon label', () => {
    const { container } = render(
      <Grommet>
        <Button icon={<svg />} label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('reverse icon label', () => {
    const { container } = render(
      <Grommet>
        <Button reverse icon={<svg />} label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('href', () => {
    const { container } = render(
      <Grommet>
        <Button href="test" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('hoverIndicator background', () => {
    const { container } = render(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator="background">
          hoverIndicator
        </Button>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('hoverIndicator as object with color', () => {
    const { container } = render(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator={{ color: 'brand' }}>
          hoverIndicator
        </Button>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('hoverIndicator as object with invalid color', () => {
    const { container } = render(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator={{ color: 'invalid' }}>
          hoverIndicator
        </Button>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('hoverIndicator color', () => {
    const { container } = render(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator="dark-3">
          hoverIndicator
        </Button>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('onClick', () => {
    const onClick = jest.fn();
    const component = renderer.create(
      <Grommet>
        <Button label="Test" onClick={onClick} />
      </Grommet>,
    );
    const tree = component.toJSON();

    const button = findAllByType(tree, 'button');
    button[0].props.onClick();
    expect(onClick).toBeCalled();
  });

  test('size', () => {
    const { container } = render(
      <Grommet>
        <Button size="small" label="Small" />
        <Button size="medium" label="Medium" />
        <Button label="Default" />
        <Button size="large" label="Large" />
        <Button primary size="small" label="Small" />
        <Button primary size="medium" label="Medium" />
        <Button primary label="Default" />
        <Button primary size="large" label="Large" />
        <Button size="small" icon={<Add />} primary />
        <Button size="medium" icon={<Add />} primary />
        <Button icon={<Add />} primary />
        <Button size="large" icon={<Add />} primary />
        <Button size="small" label="Small" icon={<Next />} reverse />
        <Button size="medium" label="Medium" icon={<Next />} reverse />
        <Button label="Default" icon={<Next />} reverse />
        <Button size="large" label="Large" icon={<Next />} reverse />
      </Grommet>,
    );

    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('as', () => {
    const { container } = render(
      <Grommet>
        <Button as="span" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('a11yTitle', () => {
    const { container } = render(
      <Grommet>
        <Button a11yTitle="Title" />
        <Button aria-label="Title" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test(`disabled state cursor should indicate the button cannot be
  clicked`, () => {
    const { getByText } = render(
      <Grommet>
        <Button disabled label="Button" />
      </Grommet>,
    );

    const button = getByText('Button');
    // eslint-disable-next-line no-underscore-dangle
    const cursorStyle = window.getComputedStyle(button)._values.cursor;
    expect(cursorStyle).not.toBe('pointer');
    expect(cursorStyle).toBe('default');
  });
});
