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
import React, {useState} from "react";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  // const {data: session} = useSession();
  const { t } = useTranslation();

  return (
    <>
      <div className="absolute right-0 flex space-x-1 p-5 bottom-0  ">
        <Button
          color={ButtonColors.VIOLET}
          size={ButtonSizes.M}
          onClick={async () => await setLanguage("en")}
        >
          EN
        </Button>

        <Button
          color={ButtonColors.VIOLET}
          size={ButtonSizes.M}
          onClick={async () => await setLanguage("de")}
        >
          DE
        </Button>
      </div>

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
              <Input type={showPassword ? 'text' : 'password'} label="Password">
                <SvgEye onClick={() => setShowPassword(!showPassword)} />
              <Heading color={HeadingColors.SLATE}>{t("login:title")}</Heading>
              <Input label={t("login:label-email")}></Input>
              <Input label={t("login:label-password")}>
                <SvgEye />
              </Input>

              <input type="text" />

              <Button
                color={ButtonColors.GRADIENT}
                label={t("login:label-login")}
                size={ButtonSizes.M}
                fullWidth={true}
                onClick={() => signIn("zitadel", { callbackUrl: "/" })}
              >
                <SvgMumble />
              </Button>
              <Label size={LabelSizes.s}>{t("login:label-register")}</Label>
              <Link href={"/register"} hasUnderline={true}>
                {t("login:link-register")}
              </Link>
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
