import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function WhyUs() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            if (!isSupabaseConfigured) return;
            try {
                const { data, error } = await supabase.from('interior_whyus').select('*').order('sort_order', { ascending: true });
                if (!error && data) setItems(data);
            } catch (err) {
                console.error("WhyUs fetch error:", err);
            }
        };
        fetchItems();
    }, []);

    if (items.length === 0) return null;

    return (
        <section id="why-us" className="py-24 bg-white border-b border-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif mb-4 text-gray-800">Kenapa Memilih Kami?</h2>
                    <div className="w-12 h-0.5 bg-sage mx-auto"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-12">
                    {items.map(item => (
                        <div key={item.id} className="text-center px-4">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 font-serif">{item.title}</h3>
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
