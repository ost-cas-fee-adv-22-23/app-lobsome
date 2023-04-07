import { ApiPost, CreatePost, Post } from '../types/post';
import { postRequest } from './request';
import fetchUser from './fetch-user';

export default async (token: string, reply: CreatePost, postId: string): Promise<Post> => {
  try {
    const config: RequestInit = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append('text', reply.text);

    if (reply.file) {
      formData.append('image', reply.file);
    }

    const postResponse = await postRequest<FormData, ApiPost>(
      `https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts/${postId}`,
      formData,
      config
    );

    return { ...postResponse, creator: await fetchUser(postResponse.creator, token) };
  } catch (e: any) {
    throw new Error(`Parsing posts error - ${e.message}`);
  }
};
