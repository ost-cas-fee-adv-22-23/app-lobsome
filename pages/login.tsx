import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { ReactElement } from "react";
import { SplitScreenLayout } from "../components/layout/split-screen-layout";

function Login() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!!session && (
          <a href="#" onClick={() => signOut()}>
            <h2>Logout &rarr;</h2>
            <p>Logout from your account</p>
          </a>
        )}

        {!session && (
          <a href="#" onClick={() => signIn("zitadel")}>
            <h2>Login &rarr;</h2>
            <p>Login with a ZITADEL account</p>
          </a>
        )}
      </main>
    </>
  );
}

Login.getLayout = (page: ReactElement) => (
  <SplitScreenLayout>{page}</SplitScreenLayout>
);

export default Login;
