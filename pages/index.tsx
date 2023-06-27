import {
  Avatar,
  AvatarSize,
  Button,
  ButtonColors,
  ButtonSizes,
  Card,
  Heading,
  HeadingColors,
  HeadingTags,
  SvgMumble,
} from '@smartive-education/design-system-component-library-lobsome';
import { CreatePost, Post } from '../types/post';
import { useSession } from 'next-auth/react';
import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { useMutation } from '@tanstack/react-query';
import createPost from '../services/create-post';
import { WriteCard } from '../components/write-card';
import { InfinitePostList } from '../components/infinite-post-list';
import fetchPosts from '../services/fetch-posts';
import { ResponseInterface } from '../types/generic-response';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import CustomInfiniteHook from '../hooks/custom-infinite.hook';

type PageProps = { posts: ResponseInterface<Post>; session: Session };

export default function PageHome({ posts }: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  const { t } = useTranslation('index');
  const { data: session } = useSession();

  const { data, fetchNext, hasMore, error, reset, hasNew } = CustomInfiniteHook({
    initialData: posts?.data,
    initialHasMore: !!posts.next,
    accessToken: session?.accessToken,
  });

  const mutation = useMutation({
    mutationFn: (newPost: CreatePost) => createPost(session?.accessToken, newPost),
    onSuccess: () => reset(),
  });

  return (
    <>
      {hasNew && (
        <div className="z-50 flex justify-center items-center fixed mt-5 inset-x-0">
          <Button color={ButtonColors.GRADIENT} label="Load new posts!" size={ButtonSizes.M} onClick={reset}>
            <SvgMumble />
          </Button>
        </div>
      )}

      <div className="py-8">
        <Heading color={HeadingColors.VIOLET} tag={HeadingTags.HEADING2}>
          {t('intro.title')}
        </Heading>
        <Heading color={HeadingColors.SLATE} tag={HeadingTags.HEADING4}>
          {t('intro.subtitle')}
        </Heading>
      </div>

      <div className="py-4">
        <Card>
          <div className="absolute -left-8 top-4">
            <Avatar
              alt={session?.user.username}
              showBorder
              size={AvatarSize.M}
              src={session?.user.avatarUrl || '/images/anonymous.png'}
            />
          </div>
          <div className="mb-1">
            <Heading tag={HeadingTags.HEADING4}> {t('write-card.title')}</Heading>
          </div>
          <WriteCard onSend={mutation.mutate} />
        </Card>
      </div>

      <InfinitePostList
        posts={data}
        fetchNext={fetchNext}
        isAddingNewPost={mutation.isLoading}
        hasMore={hasMore}
        error={error}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const posts = await fetchPosts(session?.accessToken, { offset: 0, limit: 10 });
    return { props: { posts, session } };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }
};
