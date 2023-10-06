import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PlayerModel } from "../../../server/db/models";
import dbConnect from "../../../server/db/db";
import axios from 'axios';

/* Google Login Logic */
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
  ],
  callbacks: {

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