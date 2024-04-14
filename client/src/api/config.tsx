export const BASE_URL = "http://13.232.137.152:3000/";

export const GET = "get";
export const POST = "post";
export const PUT = "put";
export const DELETE = "delete";

interface AuthApi {
    [key: string]: string;
    signIn: string;
    signUp: string;
    forgotPassword: string;
}

export const AUTH_API: AuthApi = {
    signIn: "/signIn",
    signUp: "/signUp",
    forgotPassword: '/forgotpassword',
};
