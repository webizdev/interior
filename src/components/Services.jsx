import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import * as LucideIcons from 'lucide-react';

export default function Services() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const { data } = await supabase.from('interior_services').select('*').order('sort_order', { ascending: true });
            if (data) setItems(data);
        };
        fetchItems();
    }, []);

    return (
        <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">Layanan Kami</h2>
                    <div className="w-20 h-1 bg-sage mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map(item => {
                        const IconComponent = LucideIcons[item.icon_name || 'CheckCircle'] || LucideIcons.CheckCircle;
                        return (
                            <div key={item.id} className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-500 relative flex flex-col">
                                <div className="h-64 overflow-hidden relative">
                                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-60 transition duration-500"></div>
                                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                        <div className="p-2.5 bg-sage outline outline-2 outline-white/30 rounded-xl text-white backdrop-blur-md">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white shadow-sm">{item.title}</h3>
                                    </div>
                                </div>
                                <div className="p-8 pb-10 flex-grow bg-white border border-gray-100 rounded-b-3xl">
                                    <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
