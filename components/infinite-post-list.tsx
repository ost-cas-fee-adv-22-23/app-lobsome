/* eslint-disable react/forbid-component-props */
import React from 'react';
import { Card } from '@smartive-education/design-system-component-library-lobsome';
import InfiniteScroll from 'react-infinite-scroller';
import { useSession } from 'next-auth/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import fetchPosts from '../services/fetch-posts';
import { SearchPaginationParams, ResponseInterface, SearchResponseInterface } from '../types/generic-response';
import { Post } from '../types/post';
import { PostCard } from './post-card';
import { SkeletonCard } from './skeleton/skeleton-card';
import searchPosts from '../services/search-posts';

export enum InfinitePostListMode {
  DEFAULT = 'default',
  LIKES = 'likes',
  SEARCH = 'search',
}

type InfinitePostListProps = {
  posts?: ResponseInterface<Post> | SearchResponseInterface<Post>;
  mode: InfinitePostListMode;
  queryKey: string;
  creator?: string;
  isAddingNewPost?: boolean;
  likedBy?: string;
  tag?: string;
};

export const InfinitePostList = ({
  posts,
  queryKey,
  creator,
  isAddingNewPost = false,
  mode = InfinitePostListMode.DEFAULT,
  likedBy,
  tag,
}: InfinitePostListProps) => {
  const { data: session } = useSession();

  function determineFetchFn(pageParam: number, likedBy: string | undefined, creator: string | undefined) {
    switch (mode) {
      case InfinitePostListMode.LIKES:
        if (!likedBy) {
          throw Error('To search for liked posts you have to provide a likedBy creator!');
        }
        return searchPosts(session?.accessToken, { offset: pageParam, limit: 10, likedBy: [likedBy] });
      case InfinitePostListMode.SEARCH:
        if (!tag) {
          throw Error('To search for tags you have to provide a tag!');
        }
        return searchPosts(session?.accessToken, { offset: pageParam, limit: 10, tags: [tag] });
      default:
        return fetchPosts(session?.accessToken, { offset: pageParam, limit: 10, creator });
    }
  }

  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery<
    ResponseInterface<Post> | SearchResponseInterface<Post>
  >({
    queryKey: [queryKey],
    queryFn: async ({ pageParam }) => {
      return determineFetchFn(pageParam * 10, likedBy, creator);
    },
    getNextPageParam: (lastPage) => {
      if (mode === InfinitePostListMode.DEFAULT) {
        if (lastPage.next) {
          const urlParams = new URLSearchParams((lastPage.next as string).split('?')[1]);
          return urlParams.get('offset') ? parseInt(urlParams.get('offset')!) : 0;
        }
        return undefined;
      }

      return (lastPage?.next as SearchPaginationParams)?.offset
        ? (lastPage.next as SearchPaginationParams).offset
        : undefined;
    },
    initialData: () => {
      return posts ? { pageParams: [0], pages: [posts] } : undefined;
    },
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
        pageStart={0}
        loadMore={(pageParam) => fetchNextPage({ pageParam })}
        hasMore={hasNextPage || false}
        loader={
          <div key={0} className="mt-4">
            <Card>
              <SkeletonCard />
            </Card>
          </div>
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
        </div>
      </InfiniteScroll>
    </>
  );
};
