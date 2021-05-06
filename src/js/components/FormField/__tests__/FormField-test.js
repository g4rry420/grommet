import React from 'react';
import styled from 'styled-components';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { cleanup, render } from '@testing-library/react';
import { Alert, New, StatusInfo } from 'grommet-icons';
import { Grommet } from '../../Grommet';
import { Form } from '../../Form';
import { FormField } from '..';
import { TextInput } from '../../TextInput';

const CustomFormField = styled(FormField)`
  font-size: 40px;
`;

describe('FormField', () => {
  afterEach(cleanup);

  test(`should have no accessibility violations`, async () => {
    const { container } = render(
      <Grommet>
        <FormField />
      </Grommet>,
    );
    const results = await axe(container);
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });

  test('default', () => {
    const { container, unmount } = render(
      <Grommet>
        <FormField />
        <FormField>
          <TextInput />
        </FormField>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('label', () => {
    const { container, unmount } = render(
      <Grommet>
        <FormField label="test label" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('help', () => {
    const { container, unmount } = render(
      <Grommet>
        <FormField help="test help" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('error', () => {
    const { container, unmount } = render(
      <Grommet>
        <FormField error="test error" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('info', () => {
    const { container, unmount } = render(
      <Grommet>
        <FormField info="test info" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('htmlFor', () => {
    const { container, unmount } = render(
      <Grommet>
        <FormField htmlFor="test-id" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('margin', () => {
    const { container, unmount } = render(
      <Grommet>
        <FormField margin="medium" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('empty margin', () => {
    const { container, unmount } = render(
      <Grommet>
        <FormField margin="none" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('pad', () => {
    const { container, unmount } = render(
      <Grommet>
        <FormField pad />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('abut', () => {
    const { container, unmount } = render(
      <Grommet
        theme={{
          formField: {
            border: {
              color: 'border',
              error: {
                color: {
                  dark: 'white',
                  light: 'status-critical',
                },
              },
              size: 'large',
              position: 'outer',
              side: 'all',
            },
            margin: { bottom: 'small' },
          },
        }}
      >
        <FormField htmlFor="test-id" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('abut with margin', () => {
    const { container, unmount } = render(
      <Grommet
        theme={{
          formField: {
            border: {
              color: 'border',
              error: {
                color: {
                  dark: 'white',
                  light: 'status-critical',
                },
              },
              size: 'large',
              position: 'outer',
              side: 'all',
            },
            margin: { bottom: 'small' },
          },
        }}
      >
        <FormField margin="medium" htmlFor="test-id" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('custom formfield', () => {
    const { container, unmount } = render(
      <Grommet>
        <CustomFormField htmlFor="test-id" />
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('disabled', () => {
    const { container, unmount } = render(
      <Grommet>
        <FormField disabled /> {/* don't use FormField without Form */}
        <Form>
          <FormField disabled />
        </Form>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('required', () => {
    const { container, unmount } = render(
      <Grommet>
        <FormField required /> {/* don't use FormField without Form */}
        <Form>
          <FormField required />
        </Form>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('custom label', () => {
    const { container, unmount } = render(
      <Grommet
        theme={{
          formField: {
            label: {
              color: 'red',
              size: 'small',
              margin: 'xsmall',
              weight: 600,
            },
          },
        }}
      >
        <Form>
          <FormField label="label" />
        </Form>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('disabled with custom label', () => {
    const { container, unmount } = render(
      <Grommet
        theme={{
          formField: {
            label: {
              color: 'red',
              size: 'small',
              margin: 'xsmall',
              weight: 600,
            },
            disabled: {
              label: {
                color: 'teal',
              },
            },
          },
        }}
      >
        <Form>
          <FormField disabled label="label" />
        </Form>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('pad with border undefined', () => {
    const { container, unmount } = render(
      <Grommet
        theme={{
          formField: {
            border: undefined,
            content: {
              pad: 'large',
            },
          },
        }}
      >
        <Form>
          <FormField label="label" pad />
        </Form>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('custom input margin', () => {
    const { container, unmount } = render(
      <Grommet
        theme={{
          formField: {
            content: {
              margin: { vertical: 'large' },
            },
          },
        }}
      >
        <Form>
          <FormField label="label" />
        </Form>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('contentProps', () => {
    const { container, unmount } = render(
      <Grommet>
        <Form>
          <FormField
            label="label"
            contentProps={{
              border: false,
            }}
          />
        </Form>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('custom error and info icon and container', () => {
    const { container, unmount } = render(
      <Grommet
        theme={{
          formField: {
            error: {
              icon: <Alert />,
              container: {
                background: {
                  color: 'green',
                },
              },
            },
            info: {
              icon: <StatusInfo />,
              container: {
                pad: { horizontal: 'large' },
              },
            },
          },
        }}
      >
        <Form>
          <FormField
            label="label"
            error="This is an error message."
            info="Here is a little added info on FormField."
            contentProps={{
              border: false,
            }}
          />
        </Form>
      </Grommet>,
    );
    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
    unmount();
  });

  test('should render asterisk when requiredIndicator === true', () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            label: {
              requiredIndicator: true,
            },
          },
        }}
      >
        <Form>
          <FormField label="label" required />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`should render custom indicator when requiredIndicator is 
  element`, () => {
    const { container } = render(
      <Grommet
        theme={{
          formField: {
            label: {
              requiredIndicator: <New size="small" />,
            },
          },
        }}
      >
        <Form>
          <FormField label="label" required />
        </Form>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
