import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Gallery() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGallery() {
            const { data, error } = await supabase
                .from('interior_gallery')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setGalleryItems(data);
            }
            setLoading(false);
        }
        fetchGallery();
    }, []);

    return (
        <div id="gallery" className="pt-32 pb-12 min-h-screen bg-soft-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif mb-4">Gallery Dokumentasi</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Momen di balik layar, proses pengerjaan di lapangan, dan kegiatan harian tim Ratna Property dalam melayani klien.</p>
                    <div className="w-20 h-1 bg-sage mx-auto mt-6"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-sage border-t-transparent animate-spin"></div></div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleryItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 group transition duration-300">
                                <div className="aspect-video overflow-hidden relative bg-gray-100">
                                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                </div>
                                <div className="p-6">
                                    <span className="text-xs font-bold text-sage uppercase tracking-widest">{item.category}</span>
                                    <h4 className="text-lg font-bold mt-2 font-serif">{item.title}</h4>
                                    <p className="text-gray-500 text-sm mt-2 line-clamp-3">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
