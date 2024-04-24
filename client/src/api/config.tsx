export const BASE_URL = "http://localhost:8080";

export const GET = "get";
export const POST = "post";
export const PUT = "put";
export const DELETE = "delete";
export const SIGN_IN = "signIn";
export const SIGN_UP = "signUp";

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

export const TASKS_API = {
    get: '/api/task',
    post: '/api/task',
    put: '/api/task',
    delete: '/api/task'
}

export const USERS_API = {
    get: '/api/user',
    post: '/api/user',
    put: '/api/user',
    delete: '/api/user'
}