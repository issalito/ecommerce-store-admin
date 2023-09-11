import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";
import { mongooseConnect } from "@/lib/mongoose";
import { Admin } from "@/models/Admin";

//const adminEmails = ["issamhando777@gmail.com"];

// await mongooseConnect();
// const admins = await Admin.find();
// const emails = admins.map((admin) => admin.adminEmails);
// console.log(emails);
//return admins.adminEmail;
await mongooseConnect();
const admins = await Admin.find();
// Use the map function to extract "adminEmail" values into the "emails" array
const adminEmails = admins.map((admin) => admin.adminEmail);
//console.log(emails); // This will print an array of "adminEmail" values

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      //console.log({ session, token, user });
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "not an Admin";
  }
}
