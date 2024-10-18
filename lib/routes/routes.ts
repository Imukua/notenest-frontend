import { sign } from "crypto";

export class Routes {
    public static readonly auth = {
        login: '/auth/login',
        signup: '/auth/register',
        refreshTokens: '/auth/refresh',
        logout: '/auth/logout',
        me: '/auth/me',
    };
}