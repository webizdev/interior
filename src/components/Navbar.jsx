import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from('interior_settings').select('website_name').single();
            if (data) setSettings(data);
        };
        fetchSettings();
    }, []);

    const handleScroll = (id) => {
        if (location.pathname !== '/') {
            window.location.href = `/#${id}`;
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
                        <span className="text-2xl font-bold tracking-tighter text-sage font-serif uppercase">
                            {settings?.website_name || 'Istana D Interior'}
                        </span>
                    </Link>
                    <div className="hidden md:flex space-x-8 items-center">
                        <button onClick={() => handleScroll('home')} className="text-base font-medium hover:text-sage transition">Home</button>
                        <button onClick={() => handleScroll('why-us')} className="text-base font-medium hover:text-sage transition">Why Us</button>
                        <button onClick={() => handleScroll('services')} className="text-base font-medium hover:text-sage transition">Services</button>
                        <button onClick={() => handleScroll('products')} className="text-base font-medium hover:text-sage transition">Products</button>
                        <button onClick={() => handleScroll('blog')} className="text-base font-medium hover:text-sage transition">Blog</button>
                        <button onClick={() => handleScroll('projects')} className="text-base font-medium hover:text-sage transition">Projects</button>
                        <Link to="/gallery" className="text-base font-bold text-sage border-2 border-sage px-5 py-2 rounded-full hover:bg-sage hover:text-white transition">Gallery</Link>
                        <a href="https://wa.me/6281298860248" target="_blank" rel="noreferrer" className="bg-sage text-white px-6 py-2.5 rounded-full text-base font-medium hover:opacity-90 transition">
                            Konsultasi
                        </a>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b px-4 py-4 space-y-2">
                    <button onClick={() => { handleScroll('home'); setIsOpen(false); }} className="block w-full text-left py-2 text-lg">Home</button>
                    <button onClick={() => { handleScroll('services'); setIsOpen(false); }} className="block w-full text-left py-2 text-lg">Services</button>
                    <button onClick={() => { handleScroll('products'); setIsOpen(false); }} className="block w-full text-left py-2 text-lg">Products</button>
                    <button onClick={() => { handleScroll('blog'); setIsOpen(false); }} className="block w-full text-left py-2 text-lg">Blog</button>
                    <button onClick={() => { handleScroll('projects'); setIsOpen(false); }} className="block w-full text-left py-2 text-lg">Projects</button>
                    <Link to="/gallery" onClick={() => setIsOpen(false)} className="block w-full py-2 text-lg font-bold text-sage border-2 border-sage rounded-full text-center hover:bg-sage hover:text-white transition mt-2">Gallery Dokumentasi</Link>
                </div>
            )}
        </nav>
    );
}
