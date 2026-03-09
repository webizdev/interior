import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function ContactCTA() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const { data } = await supabase.from('interior_settings').select('contact_title, contact_subtitle, contact_cs_number').single();
            if (data) setSettings(data);
        };
        fetchSettings();
    }, []);

    return (
        <section id="contact" className="py-24 bg-white text-center border-t border-gray-50">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-4xl font-serif mb-6">{settings?.contact_title || 'Siap Memulai Proyek Anda?'}</h2>
                <p className="text-gray-600 mb-10">{settings?.contact_subtitle || 'Kami siap mendengarkan visi Anda dan mengubahnya menjadi kenyataan yang indah.'}</p>
                <a href={`https://wa.me/${settings?.contact_cs_number || '6281298860248'}`} target="_blank" rel="noreferrer" className="inline-block bg-sage text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition hover:-translate-y-1 transform">
                    Hubungi Tim Kami
                </a>
            </div>
        </section>
    );
}
