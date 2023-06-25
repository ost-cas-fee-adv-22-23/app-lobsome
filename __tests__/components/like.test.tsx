import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession } from 'next-auth/react';
import { Like } from '../../components/like';
import putLike from '../../services/put-like';
import userEvent from '@testing-library/user-event';
import deleteLike from '../../services/delete-like';
import { TestWrapper } from '../../helpers/query-client-wrapper';

jest.mock('../../services/put-like');
jest.mock('../../services/delete-like');
jest.mock('next-auth/react');
describe('testing the like component', () => {
  const postId = '123';
  const countLike = 10;
  const likedByUser = true;

  test('renders like button with correct count and text', () => {
    (useSession as jest.Mock).mockReturnValue({ data: {} });

    render(
      <TestWrapper>
        <Like postId={postId} countLike={countLike} likedByUser={likedByUser} />
      </TestWrapper>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('10 post-card.likes')).toBeInTheDocument();
  });

  test('renders like button with zero likes', () => {
    (useSession as jest.Mock).mockReturnValue({ data: {} });

    render(
      <TestWrapper>
        <Like postId={postId} countLike={0} likedByUser={likedByUser} />
      </TestWrapper>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText(' likes')).toBeNull();
  });

  test('clicking like button increments like count and toggles active state when not already liked', async () => {
    (useSession as jest.Mock).mockReturnValue({ data: { accessToken: 'abc' } });
    (putLike as jest.Mock).mockResolvedValueOnce({});

    render(
      <TestWrapper>
        <Like postId={postId} countLike={countLike} likedByUser={false} />
      </TestWrapper>
    );

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(putLike).toHaveBeenCalledTimes(1);
      expect(putLike).toHaveBeenCalledWith('abc', postId);
      expect(screen.getByText('11 post-card.likes')).toBeInTheDocument();
    });
  });

  test('clicking like button decrements like count and toggles active state when not already liked', async () => {
    (useSession as jest.Mock).mockReturnValue({ data: { accessToken: 'abc' } });
    (deleteLike as jest.Mock).mockResolvedValueOnce({});

    render(
      <TestWrapper>
        <Like postId={postId} countLike={countLike} likedByUser={true} />
      </TestWrapper>
    );

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(deleteLike).toHaveBeenCalledTimes(1);
      expect(deleteLike).toHaveBeenCalledWith('abc', postId);
      expect(screen.getByText('9 post-card.likes')).toBeInTheDocument();
    });
  });
});
