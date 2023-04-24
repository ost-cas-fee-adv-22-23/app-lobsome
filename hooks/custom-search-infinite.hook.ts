import { useState } from 'react';
import { Post } from '../types/post';
import searchPosts from '../services/search-posts';

type CustomSearchInfiniteHookParams = {
  initialData?: Post[];
  initialHasMore?: boolean;
  accessToken: string | undefined;
  likedBy?: string[];
  text?: string;
};

const CustomSearchInfiniteHook = ({
  accessToken,
  initialData,
  initialHasMore,
  text,
  likedBy,
}: CustomSearchInfiniteHookParams): {
  data: Post[];
  fetchNext: (page: number | undefined) => void;
  isLoading: boolean;
  hasMore: boolean;
  error: null | string;
  reset: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Post[]>(initialData || []);
  const [hasMore, setHasMore] = useState(initialHasMore || false);
  const isBrowser = () => typeof window !== 'undefined';

  const reset = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      if (isBrowser()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      const postResponse = await searchPosts(accessToken, { offset: 0, limit: 10, likedBy, text });
      setData(postResponse.data);
      setHasMore(!!postResponse.next);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNext = async (page: number | undefined) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const postResponse = await searchPosts(accessToken, {
        offset: page ? page * 10 : 0,
        limit: 10,
        likedBy,
        text,
      });
      setData([...data, ...postResponse.data]);
      setHasMore(!!postResponse.next);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, fetchNext, isLoading, hasMore, error, reset };
};

export default CustomSearchInfiniteHook;
