import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../types/user';
import fetchUser from '../../services/fetch-user';
import { getToken } from 'next-auth/jwt';
import {
  ActionType,
  Avatar,
  AvatarSize,
  Button,
  ButtonColors,
  ButtonSizes,
  Card,
  Heading,
  HeadingTags,
  IconLink,
  IconLinkColors,
  InteractionButton,
  Label,
  LabelColors,
  LabelSizes,
  Paragraph,
  ParagraphSizes,
  SvgCalendar,
  SvgCancel,
  SvgLocation,
  SvgProfile,
  SvgTime,
} from '@smartive-education/design-system-component-library-lobsome';
import fetchUserPosts, { PostsResponse } from '../../services/fetch-user-posts';

type PageProps = { user: User; userPosts: PostsResponse };

export default function ProfilePage({ user, userPosts }: PageProps): InferGetServerSidePropsType<typeof getServerSideProps> {
  const { data } = useSession();

  const userQuery = useQuery({
    queryKey: ['user', user.id],
    queryFn: async () => {
      return await fetchUser(user.id, data!.accessToken!);
    },
    initialData: user,
  });

  const userPostsQuery = useQuery({
    queryKey: ['posts', user.id],
    queryFn: async () => {
      return await fetchUserPosts(user.id, data!.accessToken!);
    },
    initialData: userPosts,
  });

  return (
    <div>
      <div className="bg-slate-100 p-10 flex items-center justify-center ">
        <div className="w-[680px]">
          <div className="space-y-8">
            <div className="relative ">
              <div className="absolute -bottom-24 right-8">
                <Avatar
                  alt={userQuery.data.userName}
                  showBorder
                  size={AvatarSize.XL}
                  src={userQuery.data.avatarUrl || '/images/anonymous.png'}
                />
              </div>
              <div>
                <img className="rounded-2xl	" src="https://placedog.net/680/320" alt="I LOVE DOGGOS! <3" />
              </div>
            </div>
            <div className="mt-6">
              <Heading tag={HeadingTags.HEADING3}>
                {userQuery.data.firstName} {userQuery.data.lastName}
              </Heading>
              <div className="flex space-x-5 mt-2">
                <IconLink color={IconLinkColors.VIOLET} label={userQuery.data.userName}>
                  <SvgProfile />
                </IconLink>
                <IconLink color={IconLinkColors.SLATE} label="Chur">
                  <SvgLocation />
                </IconLink>
                <IconLink color={IconLinkColors.SLATE} label={userQuery.data.created}>
                  <SvgCalendar />
                </IconLink>
              </div>
              <div className="mt-3">
                <Paragraph size={ParagraphSizes.m}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, earum expedita harum inventore placeat
                  quibusdam quos reprehenderit tenetur voluptas? Ab corporis, deleniti earum eius, eos error harum hic iure
                  magnam maiores mollitia nemo porro ut?
                </Paragraph>
              </div>
            </div>
            <div className="flex justify-end items-center space-x-5 mb-7">
              <Label size={LabelSizes.m} color={LabelColors.SLATE}>
                Du folgst {userQuery.data.firstName} {userQuery.data.firstName}
              </Label>
              <Button color={ButtonColors.SLATE} label="Unfollow" size={ButtonSizes.M}>
                <SvgCancel />
              </Button>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {userPostsQuery.data?.posts.map((userPost) => (
              <Card key={userPost.id}>
                {/* mumble */}
                <div>
                  <div className="absolute -left-8 top-4">
                    <Avatar
                      alt={userPost.creator.userName}
                      showBorder
                      size={AvatarSize.M}
                      src={userPost.creator.avatarUrl || '/images/anonymous.png'}
                    />
                  </div>
                  <div className="mb-1">
                    <Label size={LabelSizes.xl}>
                      {userPost.creator.firstName} {userPost.creator.lastName}
                    </Label>
                  </div>
                  <div className="flex space-x-5 mb-6">
                    <IconLink color={IconLinkColors.VIOLET} label={userPost.creator.userName}>
                      <SvgProfile />
                    </IconLink>
                    <IconLink color={IconLinkColors.SLATE} label="vor 17 Minuten">
                      <SvgTime />
                    </IconLink>
                  </div>
                  <div className="mb-6">
                    <Paragraph size={ParagraphSizes.m}>{userPost.text}</Paragraph>
                  </div>
                  <div className="flex relative -left-3 space-x-8">
                    <InteractionButton label="Comments" type={ActionType.REPLY}>
                      {userPost.replyCount} {userPost.replyCount > 1 ? 'Comments' : 'Comment'}
                    </InteractionButton>
                    <InteractionButton label="Likes" type={ActionType.LIKE}>
                      {userPost.likeCount} {userPost.likeCount > 1 ? 'Likes' : 'Like'}
                    </InteractionButton>
                    <InteractionButton label="Share" type={ActionType.SHARE}>
                      Share
                    </InteractionButton>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query: { alias }, req }) => {
  const jwt = await getToken({ req });

  const user = await fetchUser(alias as string, jwt!.accessToken!);

  const posts = await fetchUserPosts(alias as string, jwt!.accessToken!);

  return { props: { user, posts } };
};
