import { ApiPost, CreatePost, CreatorInterface } from './post';

export type ApiReply = ApiPost;

export interface Reply extends Omit<ApiReply, 'creator'> {
  creator: CreatorInterface;
}

export type CreateReply = CreatePost;
