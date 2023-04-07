export interface ApiPost {
  id: string;
  creator: string;
  text: string;
  mediaUrl: string;
  mediaType: string;
  likeCount: number;
  likedByUser: boolean;
  type: string;
  replyCount: number;
}

export interface Post extends Omit<ApiPost, 'creator'> {
  creator: CreatorInterface;
}

export interface CreatorInterface {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface CreatePost {
  text: string;
  file: File | null;
}
