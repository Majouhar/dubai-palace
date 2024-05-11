import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth";
import { getUser } from "@/lib/actions";

const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, _req) {
        const user = await getUser(credentials.mobile);
        if (!user) {
          throw new Error("No User Found");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password 
        );
        if (!isValid) {
          throw Error("Wrong credentials");
        }
        return { phone: user.mobile, id: user.user_id };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
