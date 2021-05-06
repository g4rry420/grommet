import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Markdown } from '..';

const CONTENT = `
# H1

Paragraph

## H2

### H3

#### H4

[a link](#)

> i carry your heart with me

![alt text](//v2.grommet.io/assets/IMG_4245.jpg "Markdown Image")

Markdown | Less | Pretty
--- | --- | ---
*Still* | \`renders\` | **nicely**
1 | 2 | 3
`;

test('Markdown renders', () => {
  const { container } = render(
    <Grommet>
      <Markdown>{CONTENT}</Markdown>
    </Grommet>,
  );
  const tree = container.firstChild;
  expect(tree).toMatchSnapshot();
});
