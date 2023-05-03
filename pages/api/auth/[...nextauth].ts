import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        if (username !== "foo" || password !== "bar") {
          throw new Error("Invalid credentials");
        }

        return {
          name: "Foo Bar",
          email: "foo.bar@gmail.com",
          id: "1234",
        };
      },
    }),
  ],
  pages: {
    signIn: "/account/login",
  },
};

export default NextAuth(authOptions);
