/* eslint-disable react/forbid-component-props */
import React from 'react';
import { Button, ButtonColors, Card } from '@smartive-education/design-system-component-library-lobsome';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSession } from 'next-auth/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchResponseInterface } from '../types/generic-response';
import { Post } from '../types/post';
import { PostCard } from './post-card';
import { SkeletonCard } from './skeleton/skeleton-card';
import searchPosts from '../services/search-posts';

type InfiniteLikedPostListProps = { queryKey: string; likedBy: string };

export const InfiniteLikedPostList = ({ queryKey, likedBy }: InfiniteLikedPostListProps) => {
  const { data: session } = useSession();
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<
    SearchResponseInterface<Post>
  >({
    queryKey: [queryKey],
    queryFn: async ({ pageParam }) => {
      return searchPosts(session?.accessToken, { offset: pageParam, limit: 10, likedBy: [likedBy] });
    },
    getNextPageParam: (lastPage) => (lastPage?.next?.offset ? lastPage.next.offset : undefined),
  });

  return status === 'loading' ? (
    <Card>
      <SkeletonCard />
    </Card>
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
