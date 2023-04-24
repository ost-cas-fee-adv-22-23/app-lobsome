import React from 'react';
import {
  ActionType,
  Avatar,
  AvatarSize,
  IconLink,
  IconLinkColors,
  InteractionButton,
  Label,
  LabelSizes,
  Paragraph,
  ParagraphSizes,
  SvgProfile,
  SvgTime,
} from '@smartive-education/design-system-component-library-lobsome';
import { Reply } from '../types/reply';
import { Like } from './like';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

type ReplyCardProps = {
  reply: Reply;
};

export const ReplyCard = ({ reply }: ReplyCardProps) => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className="flex space-x-2">
        <Avatar alt="Portrait of Matilda" size={AvatarSize.S} src={reply.creator.avatarUrl || '/images/anonymous.png'} />
        <div>
          <div className="mb-1">
            <Link href={'/profile/' + reply.creator.id}>
              <Label size={LabelSizes.m}>
                {reply.creator.firstName} {reply.creator.lastName}
              </Label>
            </Link>
          </div>
          <div className="flex space-x-5 mb-6">
            <Link href={'/profile/' + reply.creator.id}>
              <IconLink color={IconLinkColors.VIOLET} label={reply.creator.userName}>
                <SvgProfile />
              </IconLink>
            </Link>
            <IconLink color={IconLinkColors.SLATE} label={formatDistance(new Date(reply.createdAt), Date.now())}>
              <SvgTime />
            </IconLink>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <Paragraph size={ParagraphSizes.m}>{reply.text}</Paragraph>
      </div>

      <div className="flex relative -left-3 space-x-8">
        {/* TODO add feature to API */}
        {/*<InteractionButton label="Comments" type={ActionType.REPLY}>*/}
        {/*  Comments*/}
        {/*</InteractionButton>*/}
        <Like countLike={reply.likeCount} likedByUser={reply.likedByUser} postId={reply.id} />
        <InteractionButton label={t('premium-modal.modal-title')} type={ActionType.SHARE}>
          {t('post-card.share')}
        </InteractionButton>
      </div>
    </div>
  );
};
