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
import React, { ReactNode } from 'react';
import { Post } from '../types/post';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { Like } from './like';

type PostCardProps = {
  post: Post;
  children?: ReactNode;
};

export const PostCard = ({ post, children }: PostCardProps) => {
  const wrapTags = () => {
    const textArray = post.text.split(' ');
    return textArray.map((str, index) => {
      if (str.startsWith('#')) {
        return (
          <React.Fragment key={index}>
            <MumbleLink hasUnderline>{str}</MumbleLink>&nbsp;
          </React.Fragment>
        );
      }
      return str + ' ';
    });
  };

  return (
    <Card key={post.id}>
      <div className="absolute -left-8 top-4">
        <Link href={'/profile/' + post.creator.id}>
          <Avatar
            alt="Portrait of Matilda"
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
          <InteractionButton label="Comments" type={ActionType.REPLY}>
            {post.replyCount} Comments
          </InteractionButton>
        </Link>
        <Like count={post.likeCount} likedByUser={post.likedByUser} postId={post.id} />
        <InteractionButton label="Share" type={ActionType.SHARE}>
          Share
        </InteractionButton>
      </div>

      {children}
    </Card>
  );
};
