/* eslint-disable react/forbid-component-props */
import React from 'react';
import { Button, ButtonColors, Card } from '@smartive-education/design-system-component-library-lobsome';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSession } from 'next-auth/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchPosts from '../services/fetch-posts';
import { ResponseInterface } from '../types/generic-response';
import { Post } from '../types/post';
import { PostCard } from './post-card';
import { SkeletonCard } from './skeleton/skeleton-card';

type InfinitePostListProps = {
  posts: ResponseInterface<Post>;
  queryKey: string;
  creator?: string;
  isAddingNewPost?: boolean;
};

export const InfinitePostList = ({ posts, queryKey, creator, isAddingNewPost = false }: InfinitePostListProps) => {
  const { data: session } = useSession();
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<ResponseInterface<Post>>({
    queryKey: [queryKey],
    queryFn: async ({ pageParam }) => {
      return fetchPosts(session?.accessToken, { offset: pageParam, limit: 10, creator });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const urlParams = new URLSearchParams(lastPage.next.split('?')[1]);
        return urlParams.get('offset') ? parseInt(urlParams.get('offset')!) : 0;
      }

      return undefined;
    },
    initialData: () => ({ pageParams: [0], pages: [posts] }),
  });

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {(error as Error).message}</p>
  ) : (
    <>
      <InfiniteScroll
        dataLength={data?.pages[0].count}
        hasMore={hasNextPage || false}
        next={() => fetchNextPage()}
        style={{ overflow: 'unset' }}
        loader={''}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="space-y-4">
          {isAddingNewPost && (
            <Card>
              <SkeletonCard />
            </Card>
          )}
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </React.Fragment>
          ))}

          {isFetchingNextPage && (
            <Card>
              <SkeletonCard />
            </Card>
          )}
        </div>
        <div className="flex flex-col w-full justify-center items-center mt-4 mb-8">
          <div>
            {hasNextPage && !isFetchingNextPage && (
              <Button onClick={() => fetchNextPage()} color={ButtonColors.GRADIENT}>
                Load more
              </Button>
            )}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
