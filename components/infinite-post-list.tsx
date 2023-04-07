/* eslint-disable react/forbid-component-props */
import React from 'react';
import { Button, ButtonColors } from '@smartive-education/design-system-component-library-lobsome';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSession } from 'next-auth/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchPosts from '../services/fetch-posts';
import { ResponseInterface } from '../types/generic-response';
import { Post } from '../types/post';
import { PostCard } from './post-card';

type InfinitePostListProps = { posts: ResponseInterface<Post> };

export const InfinitePostList = ({ posts }: InfinitePostListProps) => {
  const { data: session } = useSession();
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) => {
      console.log(session);
      return fetchPosts(session!.accessToken!, { offset: pageParam, limit: 10 });
    },
    getNextPageParam: (lastPage) => {
      const urlParams = new URLSearchParams(lastPage.next!.split('?')[1]);
      return urlParams.get('offset') ? parseInt(urlParams.get('offset')!) : 0;
    },
    initialData: () => ({ pageParams: [], pages: [posts] }),
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
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-col w-full justify-center items-center mt-4 mb-8">
          <div>
            <Button onClick={() => fetchNextPage()} color={ButtonColors.GRADIENT}>
              {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
            </Button>
          </div>

          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </div>
      </InfiniteScroll>
    </>
  );
};
