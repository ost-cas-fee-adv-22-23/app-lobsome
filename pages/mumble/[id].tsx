import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import {
  Avatar,
  AvatarSize,
  IconLink,
  IconLinkColors,
  Label,
  LabelSizes,
  SvgProfile,
} from '@smartive-education/design-system-component-library-lobsome';
import fetchPost from '../../services/fetch-post';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import fetchReplies from '../../services/fetch-replies';
import { useSession } from 'next-auth/react';
import { Post } from '../../types/post';
import { CreateReply, Reply } from '../../types/reply';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { PostCard } from '../../components/post-card';
import { WriteCard } from '../../components/write-card';
import createReply from '../../services/create-reply';
import { ReplyCard } from '../../components/reply-card';
import { SkeletonCard } from '../../components/skeleton/skeleton-card';
import Link from 'next/link';

type PageProps = { post: Post; postReplies: Reply[]; session: Session };

export default function MumblePage({ post, postReplies }: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: postData } = useQuery({
    queryKey: ['post', post.id],
    queryFn: async () => {
      return await fetchPost(post.id, session?.accessToken);
    },
    initialData: post,
  });

  const { data: replyData } = useQuery({
    queryKey: ['replies', post.id],
    queryFn: async () => {
      return await fetchReplies(post.id, session?.accessToken);
    },
    initialData: postReplies,
  });

  const mutation = useMutation({
    mutationFn: (reply: CreateReply) => createReply(session?.accessToken, reply, post.id),
    onSuccess: () => {
      return queryClient.invalidateQueries(['replies']);
    },
  });

  return (
    <div className="py-8">
      <PostCard post={postData}>
        <div className="space-y-16 mt-16">
          <div>
            <div className="flex space-x-2">
              <Avatar
                alt="Portrait of Matilda"
                size={AvatarSize.S}
                src={session?.user.avatarUrl || '/images/anonymous.png'}
              />
              <div>
                <div className="mb-1">
                  <Label size={LabelSizes.m}>
                    {session?.user.firstname} {session?.user.lastname}
                  </Label>
                </div>
                <div className=" space-x-5 mb-6">
                  <Link href={'/my-profile'}>
                    <IconLink color={IconLinkColors.VIOLET} label={session?.user.username || 'anonymous'}>
                      <SvgProfile />
                    </IconLink>
                  </Link>
                </div>
              </div>
            </div>

            <WriteCard onSend={mutation.mutate} />
          </div>

          {mutation.isLoading && <SkeletonCard />}
          {replyData?.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} />
          ))}
        </div>
      </PostCard>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query: { id }, req, res }) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    const post = await fetchPost(id as string, session?.accessToken);
    const postReplies = await fetchReplies(id as string, session?.accessToken);

    return { props: { post, postReplies, session } };
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
