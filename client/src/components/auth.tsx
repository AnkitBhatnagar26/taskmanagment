import React, { useContext, useEffect, useState } from 'react';
import { usePost } from "../hooks/useFetch";
import { AUTH_API, SIGN_IN, SIGN_UP } from '../api/config';
import NotificationContext from '../store/notification-context';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from '../utils/common';
import { changeAuthToken } from '../store/redux/authSlice';
import { useAppDispatch } from '../store/redux/hooks';

type AuthMode = 'signIn' | 'signUp' | 'forgotPassword';
type Role = 'admin' | 'user';

interface FormData {
    email: string;
    password: string;
    confirmPassword?: string;
    role: Role;
}

const AuthForm: React.FC = () => {
    const [authMode, setAuthMode] = useState<AuthMode>('signIn');
    const [formData, setFormData] = useState<FormData>({ email: '', password: '', confirmPassword: '', role: 'user' });
    const { data: postSignInData, refresh: postSignInAPI } = usePost(AUTH_API[SIGN_IN]);
    const { refresh: postSignUpData } = usePost(AUTH_API[SIGN_UP]);
    const notificationCtx = useContext(NotificationContext);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (postSignInData) {
            dispatch(changeAuthToken({ value: postSignInData.token }));
            setUserSession(postSignInData.token, postSignInData.user || "");
            navigate('/dashboard');
        }
    }, [postSignInData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Sign In logic here
        if (authMode === 'signIn') {
            postSignInAPI({ data: { email: formData.email, password: formData.password } });

        } else if (authMode === 'signUp') {
            if (formData.password !== formData.confirmPassword) {
                notificationCtx.showNotification({
                    title: "Passwords don't match",
                    status: "error",
                });
                return;
            }
            postSignUpData({ data: formData });
            // Sign Up logic here
        } else {
            console.log('Reset password for:', formData.email);
            // Forgot password logic here
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6 transition-all duration-500">
                <h2 className="text-3xl font-bold text-center">Welcome to Task Management Application</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    {authMode !== 'forgotPassword' && (
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}

                    {authMode === 'signUp' && (
                        <>
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    required
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="role" className="text-sm font-medium text-gray-700">
                                    Select Role:
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange(e as any)}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select...</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        {authMode === 'signIn' ? 'Sign In' : authMode === 'signUp' ? 'Sign Up' : 'Reset Password'}
                    </button>

                    {authMode !== 'forgotPassword' && (
                        <p className="text-sm text-center">
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-700"
                                onClick={() => setAuthMode('forgotPassword')}
                            >
                                Forgot Password?
                            </button>
                        </p>
                    )}

                    {authMode === 'signIn' && (
                        <p className="text-sm text-center">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-700"
                                onClick={() => setAuthMode('signUp')}
                            >
                                Sign Up
                            </button>
                        </p>
                    )}

                    {authMode === 'signUp' && (
                        <p className="text-sm text-center">
                            Already have an account?{' '}
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-700"
                                onClick={() => setAuthMode('signIn')}
                            >
                                Sign In
                            </button>
                        </p>
                    )}
                </form>
            </div>

        </div>
    );
};

export default AuthForm;
