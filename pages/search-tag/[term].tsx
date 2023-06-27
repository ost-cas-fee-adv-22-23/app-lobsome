import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { InfinitePostList } from '../../components/infinite-post-list';
import { SearchResponseInterface } from '../../types/generic-response';
import { Post } from '../../types/post';
import searchPosts from '../../services/search-posts';
import { useRouter } from 'next/router';
import { Heading, HeadingColors, HeadingTags } from '@smartive-education/design-system-component-library-lobsome';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import CustomSearchInfiniteHook from '../../hooks/custom-search-infinite.hook';
import { useSession } from 'next-auth/react';

type PageProps = { searchResult: SearchResponseInterface<Post>; session: Session; term: string };
export default function SearchResultPage({
  searchResult,
  term,
}: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  const { query } = useRouter();
  const { data: session } = useSession();
  const { t } = useTranslation('search-tag');

  const { data, fetchNext, hasMore, error } = CustomSearchInfiniteHook({
    initialData: searchResult.data,
    initialHasMore: !!searchResult.next,
    accessToken: session?.accessToken,
    text: term,
  });

  return (
    <>
      <div className="py-8">
        <Heading color={HeadingColors.VIOLET} tag={HeadingTags.HEADING2}>
          {t('title', { tag: query.term })}
        </Heading>
      </div>
      <InfinitePostList posts={data} fetchNext={fetchNext} hasMore={hasMore} error={error} />
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

    return { props: { searchResult, session, term } };
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
