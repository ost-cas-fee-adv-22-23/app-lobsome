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
  Link,
  Paragraph,
  ParagraphSizes,
  SvgProfile,
  SvgTime,
} from '@smartive-education/design-system-component-library-lobsome';
import Image from 'next/image';
import React from 'react';
import { Post } from '../types/post';

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  const wrapTags = () => {
    const textArray = post.text.split(' ');
    return textArray.map((str, index) => {
      if (str.startsWith('#')) {
        return (
          <React.Fragment key={index}>
            <Link hasUnderline>{str}</Link>&nbsp;
          </React.Fragment>
        );
      }
      return str + ' ';
    });
  };

  return (
    <Card key={post.id}>
      <div className="absolute -left-8 top-4">
        <Avatar
          alt="Portrait of Matilda"
          showBorder
          size={AvatarSize.M}
          src={post.creator.avatarUrl || '/images/anonymous.png'}
        />
      </div>
      <div className="mb-1">
        <Label size={LabelSizes.m}>
          {post.creator.firstName} {post.creator.lastName}
        </Label>
      </div>
      <div className="flex space-x-5 mb-6">
        <IconLink color={IconLinkColors.VIOLET} label={post.creator.userName}>
          <SvgProfile />
        </IconLink>
        <IconLink color={IconLinkColors.SLATE} label="vor 17 Minuten">
          <SvgTime />
        </IconLink>
      </div>
      <div className="mb-6">
        <Paragraph size={ParagraphSizes.m}>{wrapTags()}</Paragraph>
      </div>
      <div className="mb-6">
        {post.mediaUrl && <Image src={post.mediaUrl} alt={post.id} width={600} height={600} className="rounded-2xl" />}
      </div>
      <div className="flex relative -left-3 space-x-8">
        <InteractionButton label="Comments" type={ActionType.REPLY}>
          {post.replyCount} Comments
        </InteractionButton>
        <InteractionButton label="Likes" type={ActionType.LIKE}>
          {post.likeCount} Likes
        </InteractionButton>
        <InteractionButton label="Share" type={ActionType.SHARE}>
          Share
        </InteractionButton>
      </div>
    </Card>
  );
};