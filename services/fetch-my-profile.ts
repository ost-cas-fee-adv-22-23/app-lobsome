import { ApiPost, Post } from '../types/post';
import { getRequest } from './request';
import { ResponseInterface } from '../types/generic-response';
import fetchMyProfile from './fetch-user';

export interface PostsResponse {
  count: number;
  posts: Post[];
}

export default async (id: string, token: string): Promise<PostsResponse> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    };

    const userPostsResponse = await getRequest<ResponseInterface<ApiPost>>(
      `https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts?creator=${id}`,
      config
    );
    const posts = await Promise.all(
      userPostsResponse.data.map(async (item) => {
        const user = await fetchMyProfile(item.creator, token);
        return { ...item, creator: user };
      })
    );

    return { count: userPostsResponse.count, posts };
  } catch (e: any) {
    throw new Error(`Parsing user posts error - ${e.message}`);
  }
};
