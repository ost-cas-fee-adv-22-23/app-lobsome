import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Reply } from '../types/reply';
import putLike from '../services/put-like';
import deleteLike from '../services/delete-like';
import { useSession } from 'next-auth/react';
import { Post } from '../types/post';
import { ActionType, InteractionButton } from '@smartive-education/design-system-component-library-lobsome';

type LikeProps = {
  mode: 'posts' | 'replies';
  post: Post | Reply;
};
export const Like = ({ mode, post }: LikeProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const likeAddMutation = useMutation({
    mutationFn: () => putLike(session?.accessToken, post),
    onSuccess: () => {
      onLikeSuccess({ ...post, likedByUser: true, likeCount: ++post.likeCount });
    },
  });

  const likeDeleteMutation = useMutation({
    mutationFn: () => deleteLike(session?.accessToken, post.id),
    onSuccess: () => {
      onLikeSuccess({ ...post, likedByUser: false, likeCount: --post.likeCount });
    },
  });

  const onLikeSuccess = async (reply: Reply) => {
    await queryClient.cancelQueries({ queryKey: [mode] });
    //const previousTodos = queryClient.getQueryData(['todos']);
    return queryClient.setQueryData<Reply[]>([mode], (old) => updateItemInArray(old, reply));
  };

  const handleLike = (post: Post | Reply) => {
    post.likedByUser ? likeDeleteMutation.mutate() : likeAddMutation.mutate();
  };

  const updateItemInArray = (list: any[] | undefined, updatedItem: any): any[] => {
    if (!list) {
      return [];
    }
    const updateList = [...list];
    const index = updateList.findIndex((item) => item.id === updatedItem.id);

    if (index !== -1) {
      updateList[index] = {
        ...updateList[index],
        ...updatedItem,
      };

      return updateList;
    }

    return list;
  };

  return (
    <InteractionButton label="Likes" type={ActionType.LIKE} onClick={() => handleLike(post)} active={post.likedByUser}>
      {post.likeCount} Likes
    </InteractionButton>
  );
};
