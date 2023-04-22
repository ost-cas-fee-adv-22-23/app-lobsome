import { ApiPost, Post } from '../types/post';
import { postRequest } from './request';
import { SearchResponseInterface } from '../types/generic-response';
import fetchUser from './fetch-user';
import { decodeTime } from 'ulid';

export interface SearchBodyParams {
  text?: string;
  tags?: string[];
  likedBy?: string[];
  mentions?: string[];
  isReply?: boolean;
  offset: number;
  limit: number;
}

export default async (token: string | undefined, searchBody: SearchBodyParams): Promise<SearchResponseInterface<Post>> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const postsResponse = await postRequest<SearchBodyParams, SearchResponseInterface<ApiPost>>(
      `https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts/search`,
      searchBody,
      config
    );
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
