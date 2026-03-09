import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Hero() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from('interior_settings').select('hero_title, hero_subtitle, hero_image_url, contact_cs_number').single();
            if (data) setSettings(data);
        };
        fetchSettings();
    }, []);

    return (
        <header id="home" className="relative min-h-screen md:min-h-[90vh] flex items-center pt-32 pb-16 md:pt-20 md:pb-0 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src={settings?.hero_image_url || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-2xl">
                    <span className="inline-block px-4 py-1 bg-sage-500/80 backdrop-blur-sm rounded-full text-xs font-semibold tracking-widest uppercase mb-6 bg-sage bg-opacity-80">
                        Interior Specialist
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-6 leading-tight mt-4">
                        {settings?.hero_title || 'Wujudkan Rumah dan Kantor Impian yang Estetik & Fungsional'}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-10 font-light">
                        {settings?.hero_subtitle || 'Kami menghadirkan solusi desain interior yang mencerminkan kepribadian Anda dengan sentuhan modern.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href={`https://wa.me/${settings?.contact_cs_number || '6281298860248'}`} target="_blank" rel="noreferrer" className="bg-white text-sage px-8 py-4 rounded-full font-semibold text-center hover:bg-beige transition shadow-xl">
                            Konsultasi Gratis via WA
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
