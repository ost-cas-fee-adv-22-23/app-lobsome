import { SearchBody } from '../types/search-body';
import { postRequest } from './request';
import { ApiPost, Post } from '../types/post';
import { ResponseInterface } from '../types/generic-response';
import fetchUser from './fetch-user';

export default async (token: string, searchBody: SearchBody): Promise<ResponseInterface<Post>> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const searchResponse = await postRequest<SearchBody, ResponseInterface<ApiPost>>(
      `https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts/search`,
      searchBody,
      config
    );

    const posts: Post[] = await Promise.all(
      searchResponse.data.map(async (item) => {
        const user = await fetchUser(item.creator, token);
        return { ...item, creator: user };
      })
    );
    return { ...searchResponse, data: posts };
  } catch (e: any) {
    throw new Error(`Parsing posts error - ${e.message}`);
  }
};
