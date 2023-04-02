import { getRequest } from './request';
import fetchUser from './fetch-user';
import { ApiReply, Reply } from '../types/replies';

export default async (id: string, token: string): Promise<Reply[]> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    };

    const replyResponse = await getRequest<ApiReply[]>(
      `https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts/${id}/replies`,
      config
    );
    return await Promise.all(
      replyResponse.map(async (item) => {
        const user = await fetchUser(item.creator, token);
        return { ...item, creator: user };
      })
    );
  } catch (e: any) {
    throw new Error(`Parsing post replies error - ${e.message}`);
  }
};
