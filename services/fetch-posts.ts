import { PostInterface } from '../data/post.interface';
import { mumbleApi } from './api-request';

export interface PostsResponse {
  count: number;
  data: PostInterface[];
}

export default async (): Promise<PostsResponse> => {
  try {
    return mumbleApi.getWithoutAuth<PostsResponse>(`https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/posts`);
  } catch (e: any) {
    throw new Error(`Parsing posts error - ${e.message}`);
  }
};
