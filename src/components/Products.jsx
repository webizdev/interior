import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase
                .from('interior_products')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setProducts(data);
            }
            setLoading(false);
        }
        fetchProducts();
    }, []);

    return (
        <section id="products" className="py-24 bg-beige/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">Produk Pilihan</h2>
                    <div className="w-20 h-1 bg-sage mx-auto"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-sage border-t-transparent animate-spin"></div></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group">
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-deep-earth">{product.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-sage">Rp {product.price?.toLocaleString('id-ID')}</span>
                                        <a href={`https://wa.me/6281298860248?text=Halo Kak, saya tertarik dengan ${product.name}`} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-wider text-white bg-deep-earth px-3 py-1.5 rounded-lg hover:bg-sage transition">
                                            Pesan
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
