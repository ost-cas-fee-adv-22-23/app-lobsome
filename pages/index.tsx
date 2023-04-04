import {
  Card,
  Heading,
  HeadingColors,
  HeadingTags,
  Paragraph,
  ParagraphSizes,
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

type PageProps = { posts: ResponseInterface<Post>; session: Session };

export default function PageHome({ posts }: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  const { data: session } = useSession();
  const mutation = useMutation({
    mutationFn: (newPost: CreatePost) => createPost(session!.accessToken!, newPost),
  });

  return (
    <>
      <div className="py-8">
        <Heading color={HeadingColors.VIOLET} tag={HeadingTags.HEADING2}>
          Willkommen auf Mumble
        </Heading>
        <Heading color={HeadingColors.SLATE} tag={HeadingTags.HEADING4}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, exercitationem.
        </Heading>
      </div>

      <div className="py-8">
        <Card>
          <Heading tag={HeadingTags.HEADING3}>Voll leer hier! 😲</Heading>
          <Paragraph size={ParagraphSizes.m}>Verfasse deinen ersten Mumble oder folge anderen Usern!</Paragraph>
          <WriteCard onSend={mutation.mutate} />
        </Card>
      </div>

      <InfinitePostList posts={posts} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const posts = await fetchPosts(session!.accessToken!, { offset: 0, limit: 10 });

  return { props: { posts, session } };
};
