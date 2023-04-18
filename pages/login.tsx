import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { ReactElement } from 'react';
import { SplitScreenLayout } from '../components/layout/split-screen-layout';
import { useRouter } from 'next/router';
import {
  Button,
  ButtonColors,
  Heading,
  HeadingColors,
  HeadingTags,
  Input,
  Label,
  LabelSizes,
  Link,
  SvgEye,
  SvgMumble,
} from '@smartive-education/design-system-component-library-lobsome';
import useTranslation from 'next-translate/useTranslation';

function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const { t } = useTranslation('login');

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex-1 text-grey-darker bg-grey-light ">
          <div className="flex items-center justify-center h-screen">
            <div className="space-y-2">
              {!session && (
                <>
                  <Heading color={HeadingColors.SLATE}>{t('login:title')}</Heading>
                  <Input label={t('login:label-email')}></Input>
                  <Input label={t('login:label-password')}>
                    <SvgEye />
                  </Input>
                  <div className="space-y-3 pt-6">
                    {/* TODO add premium modal for this link */}
                    <Button fullWidth={true} label={t('login:label-login')} color={ButtonColors.VIOLET}>
                      <SvgMumble />
                    </Button>
                    <Button
                      fullWidth={true}
                      label={t('login:label-login-zidatel')}
                      onClick={() => signIn('zitadel', { callbackUrl: router.query.callbackUrl as string })}
                      color={ButtonColors.GRADIENT}
                    ></Button>
                  </div>
                  <div className="justify-center">
                    <Label size={LabelSizes.s}>{t('login:label-register')}</Label>
                    <Link href={'/register'} hasUnderline={true}>
                      <br />
                      {/* TODO add premium modal for this link */}
                      {t('login:link-register')}
                    </Link>
                  </div>
                </>
              )}
              {!!session && (
                <div className="space-y-6">
                  <Heading tag={HeadingTags.HEADING3}> {t('login:text-leaving')}</Heading>
                  <Button onClick={() => signOut()} color={ButtonColors.SLATE}>
                    {t('login:label-logout')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

Login.getLayout = (page: ReactElement) => <SplitScreenLayout>{page}</SplitScreenLayout>;

export default Login;
