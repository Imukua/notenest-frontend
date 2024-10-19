import { sign } from "crypto";

export class Routes {
    public static readonly auth = {
        login: '/auth/login',
        signup: '/auth/register',
        refreshTokens: '/auth/refresh',
        logout: '/auth/logout',
        me: '/auth/me',
        profile: '/auth/profile',
    };
    public static readonly journals = {
        dashboard: '/journals?page=1&limit=4',
        list: '/journals',
        create: '/journals/create',
        update: '/journals/update',
        delete: '/journals/delete',
    };
}