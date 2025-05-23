import NextAuth, { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            username: string;
            image: string;
        },
        accessToken?: string;
    }
}