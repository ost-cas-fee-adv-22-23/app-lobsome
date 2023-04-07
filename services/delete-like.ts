import { deleteRequest } from './request';

export default async (token: string | undefined, postId: string): Promise<unknown> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const postResponse = await deleteRequest<unknown>(
      `https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts/${postId}/likes`,
      config
    );

    return postResponse;
  } catch (e: any) {
    throw new Error(`Parsing posts error - ${e.message}`);
  }
};
