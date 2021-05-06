import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { CheckBox } from '..';

describe('CheckBox', () => {
  afterEach(cleanup);

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <CheckBox a11yTitle="test" />
      </Grommet>,
    );
    const results = await axe(container);
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });

  test('label should not have accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <CheckBox label="test" />
      </Grommet>,
    );
    const results = await axe(container);
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <CheckBox />
        <CheckBox id="test id" name="test name" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('label renders', () => {
    const { container } = render(
      <Grommet>
        <CheckBox label="test label" />
        <CheckBox label={<div>test label</div>} />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('checked renders', () => {
    const { container } = render(
      <Grommet>
        <CheckBox checked />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('defaultChecked', () => {
    const { container } = render(
      <Grommet>
        <CheckBox defaultChecked />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('disabled renders', () => {
    const { container } = render(
      <Grommet>
        <CheckBox disabled />
        <CheckBox disabled checked />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('reverse renders', () => {
    const { container } = render(
      <Grommet>
        <CheckBox reverse label="test label" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('toggle renders', () => {
    const { container } = render(
      <Grommet>
        <CheckBox toggle />
        <CheckBox toggle checked />
        <CheckBox toggle label="test label" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('reverse toggle fill', () => {
    const { container } = render(
      <Grommet>
        <CheckBox label="test label" reverse fill toggle />
        <CheckBox fill toggle label="test label" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('indeterminate renders', () => {
    const { container } = render(
      <Grommet>
        <CheckBox indeterminate />
        <CheckBox indeterminate label="test label" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });

  test('indeterminate checked warns', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    render(
      <Grommet>
        <CheckBox indeterminate checked />
      </Grommet>,
    );
    expect(warnSpy).toBeCalledWith(
      'Checkbox cannot be "checked" and "indeterminate" at the same time.',
    );

    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('indeterminate toggle warns', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    render(
      <Grommet>
        <CheckBox indeterminate toggle />
      </Grommet>,
    );
    expect(warnSpy).toBeCalledWith(
      'Checkbox of type toggle does not have "indeterminate" state.',
    );

    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('controlled', () => {
    const { container, getByText } = render(
      <Grommet>
        <CheckBox label="test-label" checked />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('test-label'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom theme', () => {
    const customTheme = {
      checkBox: {
        pad: {
          horizontal: 'small',
          vertical: 'xsmall',
        },
      },
    };

    const { container } = render(
      <Grommet theme={customTheme}>
        <CheckBox label="test-label" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
