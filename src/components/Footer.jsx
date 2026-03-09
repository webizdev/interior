import React, { useState, useEffect } from 'react';
import { MessageCircle, Instagram, Facebook, Twitter, Youtube, Hash } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function Footer() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            if (!isSupabaseConfigured) return;
            try {
                const { data, error } = await supabase.from('interior_settings').select('*').single();
                if (!error && data) setSettings(data);
            } catch (err) {
                console.error("Footer settings fetch error:", err);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer className="bg-stone-900 text-stone-400 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-stone-800 pb-16">
                    <div className="space-y-6">
                        <span className="text-2xl font-serif font-bold text-white uppercase tracking-tighter">{settings?.website_name || 'Istana D Interior'}</span>
                        <p className="text-sm leading-relaxed">{settings?.footer_quote || 'Spesialis interior furniture melayani pembuatan kitchen set, lemari custom, sofa baru, gordyn, wallpaper, flooring, dan lainnya.'}</p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Navigasi</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="/#home" className="hover:text-sage transition">Home</a></li>
                            <li><a href="/#services" className="hover:text-sage transition">Services</a></li>
                            <li><a href="/#products" className="hover:text-sage transition">Products</a></li>
                            <li><a href="/#blog" className="hover:text-sage transition">Blog</a></li>
                            <li><a href="/#projects" className="hover:text-sage transition">Projects</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Kontak & Alamat</h4>
                        <p className="text-sm leading-relaxed mb-4 italic">{settings?.footer_address || 'Jl. Masjid Ar-Rahmah No.116, Sawangan Baru, Kec. Sawangan, Kota Depok, Jawa Barat 16511'}</p>
                        <div className="w-full h-48 rounded-lg overflow-hidden mt-4">
                            {settings?.footer_maps_link ? (
                                <iframe
                                    src={settings.footer_maps_link.match(/src="([^"]+)"/)?.[1] || settings.footer_maps_link}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            ) : (
                                <div className="w-full h-full bg-stone-800 flex items-center justify-center text-xs">Map not available</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Connect With Us</h4>
                        <div className="flex space-x-4">
                            {settings?.contact_cs_number && (
                                <a href={`https://wa.me/${settings.contact_cs_number}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-sage hover:text-white transition">
                                    <MessageCircle className="w-5 h-5" />
                                </a>
                            )}
                            {settings?.social_instagram && (
                                <a href={settings.social_instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-sage hover:text-white transition">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                            {settings?.social_facebook && (
                                <a href={settings.social_facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-sage hover:text-white transition">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )}
                            {settings?.social_twitter && (
                                <a href={settings.social_twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-sage hover:text-white transition">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                            {settings?.social_youtube && (
                                <a href={settings.social_youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-sage hover:text-white transition">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            )}
                            {settings?.social_tiktok && (
                                <a href={settings.social_tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-sage hover:text-white transition">
                                    <Hash className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest font-bold">
                    <p>&copy; {new Date().getFullYear()} {settings?.website_name || 'Istana D Interior'}. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 space-x-6">
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
