import { putRequest } from './request';
import { Reply } from '../types/reply';
import { Post } from '../types/post';

export default async (token: string | undefined, post: Post | Reply): Promise<Post | Reply> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await putRequest<unknown, unknown>(
      `https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts/${post.id}/likes`,
      {},
      config
    );

    return post;
  } catch (e: any) {
    throw new Error(`Parsing posts error - ${e.message}`);
  }
};
