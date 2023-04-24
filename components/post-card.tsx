import {
  ActionType,
  Avatar,
  AvatarSize,
  Card,
  IconLink,
  IconLinkColors,
  InteractionButton,
  Label,
  LabelSizes,
  Link as MumbleLink,
  Paragraph,
  ParagraphSizes,
  SvgProfile,
  SvgTime,
} from '@smartive-education/design-system-component-library-lobsome';
import Image from 'next/image';
import React, { ReactNode, useContext } from 'react';
import { Post } from '../types/post';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { Like } from './like';
import useTranslation from 'next-translate/useTranslation';
import { premiumModalContext } from '../providers/premium-modal.provider';

type PostCardProps = {
  post: Post;
  children?: ReactNode;
};

export const PostCard = ({ post, children }: PostCardProps) => {
  const { t } = useTranslation('common');
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useContext(premiumModalContext);

  const wrapTags = () => {
    const textArray = post.text.split(' ');
    return textArray.map((str, index) => {
      if (str.startsWith('#')) {
        return (
          <React.Fragment key={index}>
            <MumbleLink href={'/search-tag/' + str.replace('#', '')} hasUnderline>
              {str}
            </MumbleLink>
            &nbsp;
          </React.Fragment>
        );
      }
      return str + ' ';
    });
  };

  const count = post.replyCount;
  return (
    <Card key={post.id}>
      <div className="absolute -left-8 top-4">
        <Link href={'/profile/' + post.creator.id}>
          <Avatar
            alt={post.creator.userName}
            showBorder
            size={AvatarSize.M}
            src={post.creator.avatarUrl || '/images/anonymous.png'}
          />
        </Link>
      </div>
      <div className="mb-1">
        <Label size={LabelSizes.m}>
          {post.creator.firstName} {post.creator.lastName}
        </Label>
      </div>
      <div className="flex space-x-5 mb-6">
        <Link href={'/profile/' + post.creator.id}>
          <IconLink color={IconLinkColors.VIOLET} label={post.creator.userName}>
            <SvgProfile />
          </IconLink>
        </Link>
        <Link href={'/mumble/' + post.id}>
          <IconLink color={IconLinkColors.SLATE} label={formatDistance(new Date(post.createdAt), Date.now())}>
            <SvgTime />
          </IconLink>
        </Link>
      </div>
      <div className="mb-6">
        <Paragraph size={ParagraphSizes.m}>{wrapTags()}</Paragraph>
      </div>
      <div className="mb-6">
        {/* eslint-disable-next-line react/forbid-component-props */}
        {post.mediaUrl && <Image src={post.mediaUrl} alt={post.id} width={600} height={600} className="rounded-2xl" />}
      </div>
      <div className="flex relative -left-3 space-x-8">
        <Link href={'/mumble/' + post.id}>
          <InteractionButton label={t('post-card.comments_many')} type={ActionType.REPLY}>
            {post.replyCount == 0 ? '' : post.replyCount + ' '}
            {t('post-card.comments', { count })}
          </InteractionButton>
        </Link>
        <Like countLike={post.likeCount} likedByUser={post.likedByUser} postId={post.id} />
        <InteractionButton
          onClick={() => setIsPremiumModalOpen(!isPremiumModalOpen)}
          label={t('post-card.share')}
          type={ActionType.SHARE}
        >
          {t('post-card.share')}
        </InteractionButton>
      </div>

      {children}
    </Card>
  );
};
