import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import {
  ActionType,
  Avatar,
  AvatarSize,
  Button,
  ButtonColors,
  Card,
  IconLink,
  IconLinkColors,
  InteractionButton,
  Label,
  LabelSizes,
  Paragraph,
  ParagraphSizes,
  SvgProfile,
  SvgSend,
  SvgTime,
  SvgUpload,
  Textarea,
} from '@smartive-education/design-system-component-library-lobsome';
import fetchPost from '../../services/fetch-post';
import { useQuery } from '@tanstack/react-query';
import fetchReplies from '../../services/fetch-replies';
import { useSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import { Post } from '../../types/post';
import { Reply } from '../../types/replies';

type PageProps = { post: Post; postReplies: Reply[] };

export default function MumblePage({ post, postReplies }: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  const { data } = useSession();

  const postQuery = useQuery({
    queryKey: ['post', post.id],
    queryFn: async () => {
      return await fetchPost(post.id, data!.accessToken!);
    },
    initialData: post,
  });

  const postRepliesQuery = useQuery({
    queryKey: ['replies', post.id],
    queryFn: async () => {
      return await fetchReplies(post.id, data!.accessToken!);
    },
    initialData: postReplies,
  });

  return (
    <>
      <div className="bg-slate-100 p-10 flex items-center justify-center ">
        <div className="w-[680px]">
          <Card>
            {/* mumble */}
            <div className="space-y-16">
              <div>
                <div className="absolute -left-8 top-4">
                  <Avatar alt="Portrait of Matilda" showBorder size={AvatarSize.M} src={post.creator.avatarUrl} />
                </div>
                <div className="mb-1">
                  <Label size={LabelSizes.xl}>
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
                  <Paragraph size={ParagraphSizes.m}>{postQuery.data.text}</Paragraph>
                </div>
                <div className="flex relative -left-3 space-x-8">
                  <InteractionButton label="Comments" type={ActionType.REPLY}>
                    {postQuery.data.replyCount} Comments
                  </InteractionButton>
                  <InteractionButton label="Likes" type={ActionType.LIKE}>
                    {postQuery.data.likeCount} Likes
                  </InteractionButton>
                  <InteractionButton label="Share" type={ActionType.SHARE}>
                    Share
                  </InteractionButton>
                </div>
              </div>

              {/* mumble your response */}
              <div>
                <div className="flex space-x-2">
                  <Avatar
                    alt="Portrait of Matilda"
                    size={AvatarSize.S}
                    src={data?.user.avatarUrl || '/images/anonymous.png'}
                  />
                  <div>
                    <div className="mb-1">
                      <Label size={LabelSizes.m}>
                        {data?.user.firstname} {data?.user.lastname}
                      </Label>
                    </div>
                    <div className=" space-x-5 mb-6">
                      <IconLink color={IconLinkColors.VIOLET} label="username">
                        <SvgProfile />
                      </IconLink>
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <Textarea placeholder="Und was meinst du dazu?" />
                </div>
                <div className="flex space-x-5">
                  <Button color={ButtonColors.SLATE} fullWidth>
                    Bild hochladen <SvgUpload />
                  </Button>
                  <Button color={ButtonColors.VIOLET} fullWidth>
                    Absenden <SvgSend />
                  </Button>
                </div>
              </div>

              {/* mumble other responses */}

              {postRepliesQuery.data?.map((reply) => (
                <div key={post.id}>
                  <div className="flex space-x-2">
                    <Avatar
                      alt="Portrait of Matilda"
                      size={AvatarSize.S}
                      src={reply.creator.avatarUrl || '/images/anonymous.png'}
                    />
                    <div>
                      <div className="mb-1">
                        <Label size={LabelSizes.m}>
                          {reply.creator.firstName} {reply.creator.lastName}
                        </Label>
                      </div>
                      <div className="flex space-x-5 mb-6">
                        <IconLink color={IconLinkColors.VIOLET} label={reply.creator.userName}>
                          <SvgProfile />
                        </IconLink>
                        <IconLink color={IconLinkColors.SLATE} label="vor 17 Minuten">
                          <SvgTime />
                        </IconLink>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <Paragraph size={ParagraphSizes.m}>{reply.text}</Paragraph>
                  </div>

                  <div className="flex relative -left-3 space-x-8">
                    <InteractionButton label="Comments" type={ActionType.REPLY}>
                      Comments
                    </InteractionButton>
                    <InteractionButton label="Likes" type={ActionType.LIKE}>
                      {reply.likeCount} Likes
                    </InteractionButton>
                    <InteractionButton label="Share" type={ActionType.SHARE}>
                      Share
                    </InteractionButton>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query: { id }, req }) => {
  const jwt = await getToken({ req });

  const post = await fetchPost(id as string, jwt!.accessToken!);
  const replies = await fetchReplies(id as string, jwt!.accessToken!);

  return { props: { post, replies } };
};
