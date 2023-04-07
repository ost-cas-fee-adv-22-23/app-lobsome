import { getRequest } from './request';
import { ApiPost, Post } from '../types/post';
import fetchUser from './fetch-user';
import { decodeTime } from 'ulid';

export default async (id: string, token: string): Promise<Post> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    };

    const postResponse = await getRequest<ApiPost>(
      `https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts/${id}`,
      config
    );

    return {
      ...postResponse,
      creator: await fetchUser(postResponse.creator, token),
      createdAt: new Date(decodeTime(postResponse.id)).toISOString(),
    };
  } catch (e: any) {
    throw new Error(`Parsing posts error - ${e.message}`);
  }
};
