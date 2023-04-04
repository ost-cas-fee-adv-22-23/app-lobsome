import NextAuth, { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'zitadel',
      name: 'zitadel',
      type: 'oauth',
      version: '2',
      wellKnown: process.env.ZITADEL_ISSUER,
      clientId: '181236603920908545@cas_fee_adv_qwacker_prod',
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
      idToken: true,
      checks: ['pkce', 'state'],
      client: {
        token_endpoint_auth_method: 'none',
      },
      async profile(_, { access_token }) {
        const { userinfo_endpoint } = await (
          await fetch(`${process.env.ZITADEL_ISSUER}/.well-known/openid-configuration`)
        ).json();
        const profile = await (
          await fetch(userinfo_endpoint, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
        ).json();

        return {
          id: profile.sub,
          firstname: profile.given_name,
          lastname: profile.family_name,
          username: profile.preferred_username.replace('@smartive.zitadel.cloud', ''),
          avatarUrl: profile.picture || undefined,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    maxAge: 12 * 60 * 60, // 12 hours
  },
  pages: {
    signIn: '/login',
  },
};
export default NextAuth(authOptions);
