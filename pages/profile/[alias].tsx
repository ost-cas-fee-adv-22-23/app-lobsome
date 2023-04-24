import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../types/user';
import fetchUser from '../../services/fetch-user';
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
  Label,
  LabelColors,
  LabelSizes,
  Paragraph,
  ParagraphSizes,
  SvgCalendar,
  SvgCancel,
  SvgLocation,
  SvgProfile,
} from '@smartive-education/design-system-component-library-lobsome';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import fetchPosts from '../../services/fetch-posts';
import { InfinitePostList, InfinitePostListMode } from '../../components/infinite-post-list';
import { ResponseInterface } from '../../types/generic-response';
import { Post } from '../../types/post';
import React, { useContext } from 'react';
import { premiumModalContext } from '../../providers/premium-modal.provider';
import useTranslation from 'next-translate/useTranslation';

type PageProps = { user: User; posts: ResponseInterface<Post>; session: Session };

export default function ProfilePage({ user, posts }: PageProps): InferGetServerSidePropsType<typeof getServerSideProps> {
  const { data } = useSession();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useContext(premiumModalContext);
  const { t } = useTranslation('profile');

  const userQuery = useQuery({
    queryKey: ['user', user.id],
    queryFn: async () => {
      return await fetchUser(user.id, data?.accessToken);
    },
    initialData: user,
  });

  return (
    <div>
      <div className="bg-slate-100 py-10 flex items-center justify-center ">
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
                <IconLink color={IconLinkColors.SLATE} label={t('profile-header.place')}>
                  <SvgLocation />
                </IconLink>
                <IconLink color={IconLinkColors.SLATE} label={t('profile-header.register-date')}>
                  <SvgCalendar />
                </IconLink>
              </div>
              <div className="mt-3">
                <Paragraph size={ParagraphSizes.m}>{t('profile-header.profile-intro')}</Paragraph>
              </div>
            </div>
            <div className="flex justify-end items-center space-x-5 mb-7">
              <Label size={LabelSizes.m} color={LabelColors.SLATE}>
                {t('follow.not-following')} {userQuery.data.firstName} {userQuery.data.lastName}
              </Label>
              <Button
                onClick={() => setIsPremiumModalOpen(!isPremiumModalOpen)}
                color={ButtonColors.SLATE}
                label={t('follow.follow-button')}
                size={ButtonSizes.M}
              >
                <SvgCancel />
              </Button>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <InfinitePostList posts={posts} queryKey={'userPosts'} creator={user.id} mode={InfinitePostListMode.DEFAULT} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query: { alias }, req, res }) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const [user, posts] = await Promise.all([
      fetchUser(alias as string, session?.accessToken),
      fetchPosts(session?.accessToken, { offset: 0, limit: 5, creator: alias as string }),
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
