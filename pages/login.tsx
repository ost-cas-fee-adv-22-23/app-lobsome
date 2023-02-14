import {
  Button,
  ButtonColors,
  ButtonSizes,
  Heading,
  HeadingColors,
  Input,
  Label,
  LabelSizes,
  Link,
  SvgEye,
  SvgMumble,
} from "@smartive-education/design-system-component-library-lobsome";
import { signIn } from "next-auth/react";
import React from "react";
import Head from "next/head";

export default function Home() {
  // const {data: session} = useSession();

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-stretch bg-grey-lighter min-h-screen">
        <div className="bg-gradient-to-br from-pink-500 to-violet-600 flex-1 text-grey-darker text-center bg-grey-light ">
          <div className="flex items-center justify-center h-screen">
            <Heading color={HeadingColors.WHITE}>
              Find out what’s new in <span>#fashion</span>
            </Heading>
          </div>
        </div>
        <div className="flex-1 text-grey-darker bg-grey-light ">
          <div className="flex items-center justify-center h-screen">
            <div className="space-y-2">
              <Heading color={HeadingColors.SLATE}>Anmelden</Heading>
              <Input label="E-Mail"></Input>
              <Input type="password" label="Password">
                <SvgEye />
              </Input>

              <input type="text" />

              <Button
                color={ButtonColors.GRADIENT}
                label="Let's mumble"
                size={ButtonSizes.M}
                fullWidth={true}
                onClick={() => signIn("zitadel", { callbackUrl: "/" })}
              >
                <SvgMumble />
              </Button>
              <Label size={LabelSizes.s}>Noch kein Account?</Label>
              <Link hasUnderline={true}> Jetzt registrieren</Link>
            </div>
          </div>
        </div>
      </div>

      {/*<Head>*/}
      {/*  <title>Login</title>*/}
      {/*  <link rel="icon" href="/favicon.ico" />*/}
      {/*</Head>*/}

      {/*<main>*/}
      {/*  {!!session && (*/}
      {/*    <a href="#" onClick={() => signOut()}>*/}
      {/*      <h2>Logout &rarr;</h2>*/}
      {/*      <p>Logout from your account</p>*/}
      {/*    </a>*/}
      {/*  )}*/}

      {/*  {!session && (*/}
      {/*    <a href="#" onClick={() => signIn("zitadel")}>*/}
      {/*      <h2>Login &rarr;</h2>*/}
      {/*      <p>Login with a ZITADEL account</p>*/}
      {/*    </a>*/}
      {/*  )}*/}
      {/*</main>*/}
    </>
  );
}
