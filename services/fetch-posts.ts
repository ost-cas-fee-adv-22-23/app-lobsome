import { ApiPost, Post } from '../types/post';
import { getRequest } from './request';
import { ResponseInterface } from '../types/generic-response';
import fetchUser from './fetch-user';

export interface PostsResponse {
  count: number;
  posts: Post[];
}

export default async (token: string): Promise<PostsResponse> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    };

    const postsResponse = await getRequest<ResponseInterface<ApiPost>>(
      `https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts`,
      config
    );
    const posts = await Promise.all(
      postsResponse.data.map(async (item) => {
        const user = await fetchUser(item.creator, token);
        return { ...item, creator: user };
      })
    );

    return { count: postsResponse.count, posts };
  } catch (e: any) {
    throw new Error(`Parsing posts error - ${e.message}`);
  }
};
