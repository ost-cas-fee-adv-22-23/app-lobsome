import { useEffect, useState } from 'react';
import fetchPosts from '../services/fetch-posts';
import { Post } from '../types/post';

type CustomInfiniteHookParams = {
  initialData: Post[];
  initialHasMore: boolean;
  accessToken: string | undefined;
  creator?: string;
};

const CustomInfiniteHook = ({
  initialData,
  accessToken,
  initialHasMore,
  creator,
}: CustomInfiniteHookParams): {
  data: Post[];
  fetchNext: () => void;
  isLoading: boolean;
  hasMore: boolean;
  hasNew: boolean;
  error: null | string;
  reset: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Post[]>(initialData);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [hasNew, setHasNew] = useState(false);
  const isBrowser = () => typeof window !== 'undefined';

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (hasNew) {
        return;
      }

      const postResponse = await fetchPosts(accessToken, { newerThanId: data[0].id, limit: 1, creator });
      setHasNew(!!postResponse.data.length);
    }, 3000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, hasNew]);

  const reset = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      if (isBrowser()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      const postResponse = await fetchPosts(accessToken, { limit: 10, creator });
      setData(postResponse.data);
      setHasMore(!!postResponse.next);
      setHasNew(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNext = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const postResponse = await fetchPosts(accessToken, { olderThanId: data[data.length - 1].id, limit: 10, creator });
      setData([...data, ...postResponse.data]);
      setHasMore(!!postResponse.next);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, fetchNext, isLoading, hasMore, hasNew, error, reset };
};

export default CustomInfiniteHook;
