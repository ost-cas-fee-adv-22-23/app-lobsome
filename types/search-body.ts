export interface SearchBody {
  text?: string;
  tags?: string[];
  likedBy?: string[];
  mentions?: string[];
  isReply?: boolean;
  offset?: number;
  limit?: number;
}
