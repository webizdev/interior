import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, Settings, List, Image, FileText, Package, LogOut } from 'lucide-react';

export default function AdminLayout() {
    const { session, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Global Settings', href: '/admin/settings', icon: Settings },
        { name: 'Why Us', href: '/admin/whyus', icon: List },
        { name: 'Services', href: '/admin/services', icon: List },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Blog Posts', href: '/admin/blogs', icon: FileText },
        { name: 'Projects & Gallery', href: '/admin/gallery', icon: Image },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-xl flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <span className="text-xl font-bold font-serif text-sage">Admin Panel</span>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? 'bg-sage text-white'
                                        : 'text-gray-600 hover:bg-sage/10 hover:text-sage'
                                    }`}
                            >
                                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5 text-red-500" />
                        Log out
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white shadow-sm flex items-center px-8 border-b border-gray-100">
                    <h1 className="text-xl font-semibold text-gray-800">
                        {navigation.find(n => n.href === location.pathname)?.name || 'Admin'}
                    </h1>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
