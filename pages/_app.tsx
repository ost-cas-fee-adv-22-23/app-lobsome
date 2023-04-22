import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import React, { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { Layout } from '../components/layout/layout';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { User } from '../types/user';
import PremiumModalProvider from '../providers/premium-modal.provider';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export const cachedUsers: Record<string, User> = {};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <PremiumModalProvider>{getLayout(<Component {...pageProps} />)}</PremiumModalProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
