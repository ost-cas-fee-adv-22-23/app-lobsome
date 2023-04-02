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
  LabelSizes,
  Link,
  Paragraph,
  ParagraphSizes,
  SvgCalendar,
  SvgEdit,
  SvgLocation,
  SvgProfile,
  SvgSettings,
  SvgTime,
  Tabs,
} from '@smartive-education/design-system-component-library-lobsome';
import { getToken } from 'next-auth/jwt';
import fetchUser from '../../../../../backup/app-lobsome/services/fetch-user';
import fetchUserPosts, { PostsResponse } from '../../../../../backup/app-lobsome/services/fetch-user-posts';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { User } from '../../../../../backup/app-lobsome/types/user';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

type PageProps = { user: User; userPosts: PostsResponse };

export default function MyProfilePage({
  user,
  userPosts,
}: PageProps): InferGetServerSidePropsType<typeof getServerSideProps> {
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
    <>
      <div className="bg-slate-100 p-10 flex items-center justify-center ">
        <div className="w-[680px]">
          <div className="space-y-8">
            <div className="relative ">
              <div className="absolute -bottom-24 right-8">
                <Avatar alt="" showBorder size={AvatarSize.XL} src={userQuery.data.avatarUrl || '/images/anonymous.png'} />
                <div className="absolute -mt-14 right-4">
                  <Button color={ButtonColors.SLATE} label="Button Test" showOnlyIcon size={ButtonSizes.M}>
                    <SvgEdit />
                  </Button>
                </div>
              </div>
              <div>
                <img className="rounded-2xl	" src="https://placedog.net/680/320" alt="" />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center space-x-2">
                <Heading tag={HeadingTags.HEADING3}>
                  {userQuery.data.firstName} {userQuery.data.lastName}
                </Heading>
                <SvgSettings />
              </div>
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
            <div className="flex  items-center space-x-5 mb-7">
              <Tabs
                activeId={1}
                items={[
                  {
                    id: 1,
                    label: 'Meine Mumbles',
                  },
                  {
                    id: 2,
                    label: 'Deine Likes',
                  },
                ]}
                onChange={function noRefCheck() {
                  console.log('clicked');
                }}
              />
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
                      {userPost.replyCount} Comments
                    </InteractionButton>
                    <InteractionButton label="Likes" type={ActionType.LIKE}>
                      {userPost.likeCount} Likes
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query: { id }, req }) => {
  const jwt = await getToken({ req });

  const user = await fetchUser(id as string, jwt!.accessToken!);

  const posts = await fetchUserPosts(id as string, jwt!.accessToken!);

  return { props: { user, posts } };
};
