import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma/prisma";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                if (!credentials) return null

                // Extract username and password from credentials
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };

                // Add logic here to look up the user from the credentials supplied
                const user = await prisma.user.findUnique({
                    where: { email: username }
                })

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    console.error('Invalid User')
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }: any) => {
            session.name = token.user.firstName + " " + token.user.lastName;
            session.email = token.user.email;
            return session
        },
        jwt: async ({ token, user }: any) => {
            if (user) {
                token.id = user.id;
                token.user = user;
            }
            return token
        }
    },
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET
    },
    pages: {
        signIn: '/signin',
        signOut: '/signout',
        newUser: '/signup'
    }
})

export { handler as GET, handler as POST }