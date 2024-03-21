import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User.model";
import NextAuth from "next-auth";
import { connect } from "../../../utils/connect";
import bcrypt from "bcrypt";

export const authOptions = {

session: {
  maxAge: 6*60*60,
  
  
},


  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req, res) {
        await connect();

        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const passCorr = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (passCorr) {
              return user;
            }
          }
        } catch (error) {
          res.status(404).json({ message: "Error login", error });
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if(user) token.role = user.role
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      return session
    }
  }
};

export default NextAuth(authOptions);
