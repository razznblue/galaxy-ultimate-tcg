import NextAuth from "next-auth";
import GoogleProvider,{ GoogleProfile } from "next-auth/providers/google";
import { PlayerModel } from "../../../server/db/models";
import dbConnect from "../../../server/db/db";
import axios from 'axios';
import { userIsAdmin } from "../../../helpers/apiHelper";
import jwt from 'jsonwebtoken'

/* Google Login Logic */
export const authOptions = {
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          ...profile,
          id: profile?.sub?.toString(),
          image: profile?.picture,
          role: profile?.role ?? "user"
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
  ],
  callbacks: {
    async jwt({ token, user}) {
      if (user) token.role = user?.role
      const isAdmin = await userIsAdmin(token?.name, token?.email);
      token.role = isAdmin === 'true' ? "admin" : "user";
      return token
    },
    /* Needed to use in client components */
    async session({ session, token}) {
      if (session?.user) session.user.role = token?.role
      const isAdmin = await userIsAdmin(session?.user?.name, session?.user?.email);
      session.user.role = isAdmin === 'true' ? "admin" : "user";
      return session
    },

    /* This code is called after a user chooses a gmail to log in with */
    async signIn(credentials: any) {
      try {
        // Set Up User Info
        const user = credentials?.user;
        const startupEmail = credentials?.user?.email;
        const username = credentials?.user?.name;
        const provider = credentials?.account?.provider?.toUpperCase();
        const providerId = credentials?.account?.providerAccountId;

        await dbConnect();
        const potentialUser = await PlayerModel.findOne({ 'username': username, 'provider.providerId': providerId });

        if (!potentialUser) {
          console.info(`${username} does not have an account. Creating one now and logging them in!!`);

          const appBaseUrl = process.env.APP_URL;
          const newUser = await axios.post(`${appBaseUrl}/api/players`, {
            username: user?.name,
            email: startupEmail,
            provider: {
              name: provider,
              providerId: providerId
            }
          })
          return newUser.data;
        }
        console.log(`Welcome back ${username}! Logging you in`);
        return potentialUser;
      } catch(err) {
        console.error(err);
        console.error(`err logging in user ${credentials?.user?.name}.`);
        return false;
      }
      
    }
  },
}

const authHandler = NextAuth(authOptions);
export default async function handler(...params) {
  await authHandler(...params);
}