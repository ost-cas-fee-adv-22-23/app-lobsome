import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { InfinitePostList, InfinitePostListMode } from '../../components/infinite-post-list';
import { SearchResponseInterface } from '../../types/generic-response';
import { Post } from '../../types/post';
import searchPosts from '../../services/search-posts';
import { useRouter } from 'next/router';
import { Heading, HeadingColors, HeadingTags } from '@smartive-education/design-system-component-library-lobsome';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';

type PageProps = { searchResult: SearchResponseInterface<Post>; session: Session };
export default function SearchResultPage({ searchResult }: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  const { query } = useRouter();
  const { t } = useTranslation('search-tag');
  return (
    <>
      <div className="py-8">
        <Heading color={HeadingColors.VIOLET} tag={HeadingTags.HEADING2}>
          {t('title', { tag: query.term })}
        </Heading>
      </div>
      <InfinitePostList
        posts={searchResult}
        queryKey="tagPosts"
        mode={InfinitePostListMode.SEARCH}
        tag={query.term as string}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query: { term }, req, res }) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const searchResult = await searchPosts(session?.accessToken, {
      text: term as string,
      offset: 0,
      limit: 10,
    });

    return { props: { searchResult, session } };
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
