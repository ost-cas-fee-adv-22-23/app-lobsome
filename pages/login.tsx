import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { ReactElement } from 'react';
import { SplitScreenLayout } from '../components/layout/split-screen-layout';
import { useRouter } from 'next/router';
import { Button, ButtonColors } from '@smartive-education/design-system-component-library-lobsome';

function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex items-center justify-center h-screen">
          {!session && (
            <Button
              onClick={() => signIn('zitadel', { callbackUrl: router.query.callbackUrl as string })}
              color={ButtonColors.VIOLET}
            >
              Login with a ZITADEL account
            </Button>
          )}

          {!!session && (
            <Button onClick={() => signOut()} color={ButtonColors.SLATE}>
              Logout
            </Button>
          )}
        </div>
      </main>
    </>
  );
}

Login.getLayout = (page: ReactElement) => <SplitScreenLayout>{page}</SplitScreenLayout>;

export default Login;
