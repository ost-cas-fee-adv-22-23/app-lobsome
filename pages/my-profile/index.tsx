import {
  Avatar,
  AvatarSize,
  Button,
  ButtonColors,
  ButtonSizes,
  Heading,
  HeadingTags,
  IconLink,
  IconLinkColors,
  Paragraph,
  ParagraphSizes,
  SvgCalendar,
  SvgEdit,
  SvgLocation,
  SvgProfile,
  SvgSettings,
  Tabs,
} from '@smartive-education/design-system-component-library-lobsome';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../types/user';
import { ResponseInterface } from '../../types/generic-response';
import { Post } from '../../types/post';
import { getServerSession, Session } from 'next-auth';
import fetchUser from '../../services/fetch-user';
import { InfinitePostList } from '../../components/infinite-post-list';
import { authOptions } from '../api/auth/[...nextauth]';
import fetchPosts from '../../services/fetch-posts';
import { useState } from 'react';
import { InfiniteLikedPostList } from '../../components/infinite-liked-post-list';

type PageProps = { user: User; posts: ResponseInterface<Post>; session: Session };

enum TabEnum {
  MUMBLES = 'mumbles',
  LIKES = 'likes',
}

export default function MyProfilePage({ user, posts }: PageProps): InferGetServerSidePropsType<typeof getServerSideProps> {
  const { data } = useSession();
  const [activeTab, setActiveTab] = useState(TabEnum.MUMBLES);

  const userQuery = useQuery({
    queryKey: ['user', user.id],
    queryFn: async () => {
      return await fetchUser(user.id, data?.accessToken);
    },
    initialData: user,
  });

  return (
    <>
      <div className="bg-slate-100 py-10 flex items-center justify-center ">
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
                <IconLink color={IconLinkColors.SLATE} label="Mitglied seit 4 Wochen">
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
                activeId={activeTab}
                items={[
                  {
                    id: TabEnum.MUMBLES,
                    label: 'Meine Mumbles',
                  },
                  {
                    id: TabEnum.LIKES,
                    label: 'Deine Likes',
                  },
                ]}
                onChange={(item) => setActiveTab(item.id as TabEnum)}
              />
            </div>
          </div>

          {activeTab === TabEnum.MUMBLES ? (
            <div className="mt-8 space-y-4">
              <InfinitePostList posts={posts} queryKey={'userPosts'} creator={user.id} />
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              <InfiniteLikedPostList queryKey={'userLikedPosts'} likedBy={user.id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const [user, posts] = await Promise.all([
      fetchUser(session?.user.id as string, session?.accessToken),
      fetchPosts(session?.accessToken, { offset: 0, limit: 5, creator: session?.user.id }),
    ]);

    return { props: { user, posts, session } };
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
