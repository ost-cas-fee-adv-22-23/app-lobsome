/* eslint-disable react/forbid-component-props */
import React from 'react';
import { Card } from '@smartive-education/design-system-component-library-lobsome';
import InfiniteScroll from 'react-infinite-scroller';
import { Post } from '../types/post';
import { PostCard } from './post-card';
import { SkeletonCard } from './skeleton/skeleton-card';

type InfinitePostListProps = {
  posts?: Post[];
  hasMore: boolean;
  fetchNext: (page?: number) => void;
  error: string | null;
  isAddingNewPost?: boolean;
};

export const InfinitePostList = ({ posts, fetchNext, hasMore, error, isAddingNewPost }: InfinitePostListProps) => {
  return error ? (
    <>
      <p>Ooops something went wrong!</p>
    </>
  ) : (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={(page) => fetchNext(page)}
        hasMore={hasMore}
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
          {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </InfiniteScroll>
    </>
  );
};
