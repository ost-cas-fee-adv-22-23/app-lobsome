import { putRequest } from './request';

export default async (token: string | undefined, postId: string): Promise<void> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await putRequest<unknown, unknown>(
      `https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts/${postId}/likes`,
      {},
      config
    );
  } catch (e: any) {
    throw new Error(`Parsing posts error - ${e.message}`);
  }
};
