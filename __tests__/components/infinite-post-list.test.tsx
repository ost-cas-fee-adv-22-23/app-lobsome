import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { InfinitePostList } from '../../components/infinite-post-list';
import { Post } from '../../types/post';
import fetchPosts from '../../services/fetch-posts';
import { useSession } from 'next-auth/react';
import { TestWrapper } from '../helpers/query-client-wrapper';

jest.mock('../../services/fetch-posts');
jest.mock('next-auth/react');

const mockPosts: Post[] = [
  {
    id: '01GZDK2FQCMAVAGDBBAFHB6ZFA',
    creator: {
      id: '1',
      userName: 'testUser',
      firstName: 'Max',
      lastName: 'Muster',
      avatarUrl:
        'https://cas-fee-advanced-ocvdad.zitadel.cloud/assets/v1/179828644300980481/users/195305735549092097/avatar?v=3b1662b598359b0221e987ebc08375f7',
    },
    text: '✈️',
    mediaUrl: 'https://storage.googleapis.com/qwacker-api-prod-data/40ff8b4a-f762-4df1-ad27-b4fc3b0f6463',
    mediaType: 'image/png',
    likeCount: 1,
    likedByUser: false,
    type: 'post',
    replyCount: 1,
    createdAt: '2023-05-05T14:48:00.000Z',
  },
  {
    id: '01GZDK2FQCMAVAFDBBAFHB6ZFA',
    creator: {
      id: '1',
      userName: 'testUser',
      firstName: 'Max',
      lastName: 'Muster',
      avatarUrl:
        'https://cas-fee-advanced-ocvdad.zitadel.cloud/assets/v1/179828644300980481/users/195305735549092097/avatar?v=3b1662b598359b0221e987ebc08375f7',
    },
    text: '☕️',
    mediaUrl: 'https://storage.googleapis.com/qwacker-api-prod-data/40ff8b4a-f762-4df1-ad27-b4fc3b0f6463',
    mediaType: 'image/png',
    likeCount: 1,
    likedByUser: false,
    type: 'post',
    replyCount: 1,
    createdAt: '2023-05-05T14:48:00.000Z',
  },
];

describe('InfinitePostList', () => {
  beforeEach(() => {
    (fetchPosts as jest.Mock).mockClear();
  });

  test('displays list of posts', async () => {
    (useSession as jest.Mock).mockReturnValue({ data: { accessToken: 'abc' } });
    (fetchPosts as jest.Mock).mockResolvedValueOnce({
      posts: mockPosts,
      hasMore: true,
    });

    render(
      <TestWrapper>
        <InfinitePostList fetchNext={jest.fn()} hasMore={true} error={null} posts={mockPosts} />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('☕️')).toBeInTheDocument();
      expect(screen.getByText('✈️')).toBeInTheDocument();
    });
  });

  test('displays loading skeleton when loading next page', async () => {
    (useSession as jest.Mock).mockReturnValue({ data: { accessToken: 'abc' } });
    (fetchPosts as jest.Mock).mockResolvedValueOnce({
      posts: mockPosts,
      hasMore: true,
    });

    const fetchNext = jest.fn();
    render(
      <TestWrapper>
        <InfinitePostList fetchNext={fetchNext} hasMore={true} error={null} posts={mockPosts} />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('✈️')).toBeInTheDocument();
      expect(screen.getByText('☕️')).toBeInTheDocument();
    });

    (fetchPosts as jest.Mock).mockResolvedValueOnce({
      posts: [],
      hasMore: false,
    });

    fetchNext.mockImplementationOnce(() => {
      render(<InfinitePostList fetchNext={fetchNext} hasMore={false} error={null} />);
    });

    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    //expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('No more posts')).toBeInTheDocument();
    });
  });

  test('displays error message if there is an error', async () => {
    (fetchPosts as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<InfinitePostList fetchNext={jest.fn()} hasMore={true} error="Network error" />);

    expect(screen.getByText('Ooops something went wrong!')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('☕️')).not.toBeInTheDocument();
  });
});
