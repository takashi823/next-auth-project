import type {NextAuthOptions} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
        debug: true,
        session: {strategy: "jwt"},
        providers: [
            CredentialsProvider({
                    name: "Sign in",
                    credentials: {
                        email: {
                            label: "Email",
                            type: "email",
                            placeholder: "example@example.com",
                        },
                        password: {label: "Password", type: "password"},
                    },
                    // メールアドレス認証処理
                    async authorize(credentials) {

                        // 本来はDBからデータを取得
                        const users = [
                            {id: "1", email: "user1@example.com", password: "password1"},
                            {id: "2", email: "user2@example.com", password: "password2"},
                            {id: "3", email: "abc@abc", password: "123"},
                        ];

                        const user = users.find(user => user.email === credentials?.email);

                        if (user && user?.password === credentials?.password) {
                            // 認証に成功した場合、id, name, email, roleなどを返却
                            return {id: user.id, name: user.email, email: user.email, role: "admin"};
                        } else {
                            // 認証に失敗した場合、nullを返却
                            return null;
                        }
                    }
                }
            ),
            GitHubProvider({
                clientId: process.env.GITHUB_ID!,
                clientSecret: process.env.GITHUB_SECRET!,
            }),
        ],
        callbacks: {
            // jwt
            jwt: async ({token, user, account}) => {

                if (user) {
                    token.user = user;
                    const u = user as any
                    token.role = u.role;
                }
                if (account) {
                    token.accessToken = account.access_token
                }
                return token;
            },
            // session
            session: ({session, token}) => {
                console.log("in session", {session, token});
                token.accessToken
                return {
                    ...session,
                    user: {
                        ...session.user,
                        role: token.role,
                    },
                };
            },
        }
    }
;