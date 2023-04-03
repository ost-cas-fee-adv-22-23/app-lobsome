import { ApiPost, Post } from '../types/post';
import { getRequest } from './request';
import { ResponseInterface } from '../types/generic-response';
import fetchUser from './fetch-user';

export interface PaginationParams {
  offset: number;
  limit: number;
}

export default async (token: string, { offset = 0, limit = 10 }: PaginationParams): Promise<ResponseInterface<Post>> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    };

    const postsResponse = await getRequest<ResponseInterface<ApiPost>>(
      `https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts?offset=${offset}&limit=${limit}`,
      config
    );
    const posts: Post[] = await Promise.all(
      postsResponse.data.map(async (item) => {
        const user = await fetchUser(item.creator, token);
        return { ...item, creator: user };
      })
    );

    return { ...postsResponse, data: posts };
  } catch (e: any) {
    throw new Error(`Parsing posts error - ${e.message}`);
  }
};
