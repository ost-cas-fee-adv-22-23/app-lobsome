import {
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
  Link,
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
import React, { useContext, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { premiumModalContext } from '../../providers/premium-modal.provider';
import CustomInfiniteHook from '../../hooks/custom-infinite.hook';
import { authOptions } from '../api/auth/[...nextauth]';
import fetchPosts from '../../services/fetch-posts';
import CustomSearchInfiniteHook from '../../hooks/custom-search-infinite.hook';
import { SkeletonCard } from '../../components/skeleton/skeleton-card';

type PageProps = { user: User; posts: ResponseInterface<Post>; session: Session };

enum TabEnum {
  MUMBLES = 'mumbles',
  LIKES = 'likes',
}

export default function MyProfilePage({ user, posts }: PageProps): InferGetServerSidePropsType<typeof getServerSideProps> {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState(TabEnum.MUMBLES);
  const { t } = useTranslation('myprofile');
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useContext(premiumModalContext);

  const userQuery = useQuery({
    queryKey: ['user', user.id],
    queryFn: () => {
      return fetchUser(user.id, session?.accessToken);
    },
    initialData: user,
  });

  const myLikedPosts = CustomSearchInfiniteHook({
    accessToken: session?.accessToken,
    likedBy: [user.id],
  });

  const myPosts = CustomInfiniteHook({
    initialData: posts?.data,
    initialHasMore: !!posts.next,
    accessToken: session?.accessToken,
    creator: user.id,
  });

  const setTab = (tab: TabEnum) => {
    if (tab === TabEnum.LIKES) {
      myLikedPosts.reset();
    }
    setActiveTab(tab);
  };

  return (
    <>
      <div className="bg-slate-100 py-10 flex items-center justify-center ">
        <div className="w-[680px]">
          <div className="space-y-8">
            <div className="relative ">
              <div className="absolute -bottom-24 right-8">
                <Avatar alt="" showBorder size={AvatarSize.XL} src={userQuery.data.avatarUrl || '/images/anonymous.png'} />
                <div className="absolute -mt-14 right-4">
                  <Button
                    onClick={() => setIsPremiumModalOpen(!isPremiumModalOpen)}
                    color={ButtonColors.SLATE}
                    label="Button Test"
                    showOnlyIcon
                    size={ButtonSizes.M}
                  >
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
                <Link onClick={() => setIsPremiumModalOpen(!isPremiumModalOpen)}>
                  <SvgSettings />
                </Link>
              </div>
              <div className="flex space-x-5 mt-2">
                <IconLink color={IconLinkColors.VIOLET} label={userQuery.data.userName}>
                  <SvgProfile />
                </IconLink>
                <IconLink color={IconLinkColors.SLATE} label={t('profile-header.place')}>
                  <SvgLocation />
                </IconLink>
                <IconLink color={IconLinkColors.SLATE} label={t('profile-header.register-date')}>
                  <SvgCalendar />
                </IconLink>
              </div>
              <div className="mt-3">
                <Paragraph size={ParagraphSizes.m}> {t('profile-header.profile-intro')}</Paragraph>
              </div>
            </div>
            <div className="flex  items-center space-x-5 mb-7">
              <Tabs
                activeId={activeTab}
                items={[
                  {
                    id: TabEnum.MUMBLES,
                    label: t('switch-tab.my-mumbles'),
                  },
                  {
                    id: TabEnum.LIKES,
                    label: t('switch-tab.your-likes'),
                  },
                ]}
                onChange={(item) => setTab(item.id as TabEnum)}
              />
            </div>
          </div>

          {activeTab === TabEnum.MUMBLES ? (
            <div className="mt-8 space-y-4">
              <InfinitePostList
                posts={myPosts.data}
                fetchNext={myPosts.fetchNext}
                hasMore={myPosts.hasMore}
                error={myPosts.error}
              />
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {myLikedPosts.isLoading && (
                <Card>
                  <SkeletonCard />
                </Card>
              )}
              <InfinitePostList
                posts={myLikedPosts.data}
                fetchNext={myLikedPosts.fetchNext}
                hasMore={myLikedPosts.hasMore}
                error={myLikedPosts.error}
              />
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
