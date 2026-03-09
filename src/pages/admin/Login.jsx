import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/admin');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-serif font-extrabold text-gray-900">
                    Istana D Interior Admin
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Sign in to manage your website content.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
                    {!isSupabaseConfigured && (
                        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-bold text-amber-800">Konfigurasi Belum Lengkap</h3>
                                <p className="text-xs text-amber-700 mt-1 uppercase leading-relaxed">
                                    Supabase URL atau Anon Key belum terdeteksi di Vercel.
                                    Harap tambahkan <b>VITE_SUPABASE_URL</b> dan <b>VITE_SUPABASE_ANON_KEY</b> di Settings Vercel Anda.
                                </p>
                            </div>
                        </div>
                    )}
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email address</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sage focus:border-sage sm:text-sm bg-white text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sage focus:border-sage sm:text-sm bg-white text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage hover:bg-sage/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage transition duration-150 disabled:opacity-50"
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Note: If you haven't created an account, you can quickly create one in Supabase Studio.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
