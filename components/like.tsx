import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import putLike from '../services/put-like';
import deleteLike from '../services/delete-like';
import { useSession } from 'next-auth/react';
import { ActionType, InteractionButton } from '@smartive-education/design-system-component-library-lobsome';
import useTranslation from 'next-translate/useTranslation';

type LikeProps = {
  countLike: number;
  likedByUser: boolean;
  postId: string;
};
export const Like = ({ countLike, likedByUser, postId }: LikeProps) => {
  const { data: session } = useSession();
  const { t } = useTranslation('common');

  const initialState = { likeCount: countLike || 0, liked: likedByUser || false };
  const [likeState, setLikeState] = useState(initialState);

  const likeAddMutation = useMutation({
    mutationFn: () => putLike(session?.accessToken, postId),
    onMutate: () => setLikeState({ likeCount: ++likeState.likeCount, liked: true }),
    onError: () => setLikeState(initialState),
  });

  const likeDeleteMutation = useMutation({
    mutationFn: () => deleteLike(session?.accessToken, postId),
    onMutate: () => setLikeState({ likeCount: --likeState.likeCount, liked: false }),
    onError: () => setLikeState(initialState),
  });

  const handleLike = () => {
    likeState.liked ? likeDeleteMutation.mutate() : likeAddMutation.mutate();
  };

  const count = likeState.likeCount;

  return (
    <InteractionButton label="Likes" type={ActionType.LIKE} onClick={() => handleLike()} active={likeState.liked}>
      {likeState.likeCount == 0 ? '' : likeState.likeCount + ' '}
      {t('post-card.likes', { count })}
    </InteractionButton>
  );
};
