import { render } from '@testing-library/react';
import { Container } from '../../components/container';
import { Button } from '@smartive-education/design-system-component-library-lobsome';

it('renders container unchanged', () => {
  const { container } = render(
    <Container>
      <>
        <h1>Test</h1>
        <Button>Test</Button>
      </>
    </Container>
  );
  expect(container).toMatchSnapshot();
});
