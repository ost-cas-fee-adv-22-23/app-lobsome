import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/login';
import PremiumModalProvider from '../providers/premium-modal.provider';
import { signIn, useSession } from 'next-auth/react';
import userEvent from '@testing-library/user-event';

jest.mock('next-auth/react');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
describe('loads and displays login page', () => {
  test('it should render the title properly', () => {
    (useSession as jest.Mock).mockReturnValue([false, false]);
    render(<Login />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('login:title');
  });

  test('it should render the zitadel login button properly', async () => {
    (useSession as jest.Mock).mockReturnValue([false, false]);
    useRouter.mockImplementationOnce(() => ({
      query: { callbackUrl: 'http://test.test' },
    }));

    render(<Login />);

    await userEvent.click(screen.getByTestId('zitadel-login-button'));

    expect(signIn).toHaveBeenCalled();
    expect(screen.getByTestId('zitadel-login-button')).toHaveTextContent('login:label-login-zidatel');
  });

  test('it should open the premium modal on login click', async () => {
    (useSession as jest.Mock).mockReturnValue([false, false]);

    render(
      <PremiumModalProvider>
        <Login />
      </PremiumModalProvider>
    );

    await userEvent.click(screen.getByTestId('simple-login-button'));

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('premium-modal.modal-title');
  });

  test('it should open the premium modal on sign up click', async () => {
    (useSession as jest.Mock).mockReturnValue([false, false]);

    render(
      <PremiumModalProvider>
        <Login />
      </PremiumModalProvider>
    );

    await userEvent.click(screen.getByText('login:link-register'));

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('premium-modal.modal-title');
  });

  test('shows password when eye icon is clicked and reverse', async () => {
    // Arrange
    (useSession as jest.Mock).mockReturnValue([false, false]);
    render(<Login />);

    await userEvent.click(screen.getByTestId('show-password'));

    expect(screen.getByLabelText('login:label-password')).toHaveAttribute('type', 'text');

    await userEvent.click(screen.getByTestId('show-password'));

    expect(screen.getByLabelText('login:label-password')).toHaveAttribute('type', 'password');
  });

  test('renders logout form when authenticated', () => {
    // Arrange
    (useSession as jest.Mock).mockReturnValue({ data: {} });

    // Act
    render(<Login />);

    // Assert
    expect(screen.getByText('login:text-leaving')).toBeInTheDocument();
    expect(screen.getByText('login:back-to-home')).toBeInTheDocument();
    expect(screen.getByText('login:label-logout')).toBeInTheDocument();
  });
});
