import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthConfig } from 'next-auth'

const authConfig = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Email e senha são obrigatórios")
                }

                const { email, password } = credentials

                try {
                    const data = await fetch('http://localhost:3333/auth/login', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify({ email, password })
                    }).then(response => response.json())

                    const { user, error, message } = data

                    return {...user, name: user.username, accessToken: user.accessToken}
                } catch(error) {
                    console.log(error)
                    return null
                    // throw new Error("Erro tentando realizar a autenticação");    
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },
    callbacks: {
        async jwt({ user, token }) {
            console.log(user, token)
            return token
        },
        async session({ session, token, user }: any) {
            console.log(token)
            session.user = token
            session.expires_in = token.expires_in
            session.accessToken = token.accessToken
            return session
        }
    },
    pages: {
        signIn: '/'
    }
} satisfies NextAuthConfig

export default authConfig