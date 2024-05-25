import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth";
import { getUser } from "@/lib/userActions";

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
        return {
          image: user.user_id,
          email: user.mobile,
          name: user.first_name + " " + user.last_name,
          
        };
      },
    }),
  ],


  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
