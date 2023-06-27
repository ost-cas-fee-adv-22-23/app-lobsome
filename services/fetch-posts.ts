import { ApiPost, Post } from '../types/post';
import { getRequest } from './request';
import { ResponseInterface } from '../types/generic-response';
import fetchUser from './fetch-user';
import { decodeTime } from 'ulid';

export interface PaginationParams {
  offset?: number;
  limit: number;
  creator?: string;
  olderThanId?: string;
  newerThanId?: string;
}

export default async (
  token: string | undefined,
  { offset, limit = 10, creator, olderThanId, newerThanId }: PaginationParams
): Promise<ResponseInterface<Post>> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const requestUrl = new URL('https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts');

    if (creator) {
      requestUrl.searchParams.append('creator', creator);
    }

    if (offset) {
      requestUrl.searchParams.append('offset', offset.toString());
    }

    if (olderThanId) {
      requestUrl.searchParams.append('olderThan', olderThanId);
    }

    if (newerThanId) {
      requestUrl.searchParams.append('newerThan', newerThanId);
    }

    requestUrl.searchParams.append('limit', limit.toString());

    const postsResponse = await getRequest<ResponseInterface<ApiPost>>(requestUrl.toString(), config);
    const posts: Post[] = await Promise.all(
      postsResponse.data.map(async (item) => {
        const user = await fetchUser(item.creator, token);
        return { ...item, creator: user, createdAt: new Date(decodeTime(item.id)).toISOString() };
      })
    );

    return { ...postsResponse, data: posts };
  } catch (e: any) {
    throw new Error(`Parsing posts error - ${e.message}`);
  }
};
