import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import fetchSearchResults from '../../services/fetch-search-results';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { InfinitePostList } from '../../components/infinite-post-list';
import { ResponseInterface } from '../../types/generic-response';
import { Post } from '../../types/post';

type PageProps = { searchResult: ResponseInterface<Post>; session: Session };
export default function SearchResultPage({ searchResult }: PageProps): InferGetStaticPropsType<typeof getServerSideProps> {
  return <InfinitePostList posts={searchResult} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query: { term }, req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  const searchResult = await fetchSearchResults(session!.accessToken!, { text: term as string, offset: 0, limit: 10 });

  return { props: { searchResult } };
};
