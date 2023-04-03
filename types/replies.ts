import { CreatorInterface } from './post';

export interface ApiReply {
  id: string;
  creator: string;
  text: string;
  mediaUrl: any;
  mediaType: any;
  likeCount: number;
  likedByUser: boolean;
  type: string;
  parentId: string;
}

export interface Reply extends Omit<ApiReply, 'creator'> {
  creator: CreatorInterface;
}
