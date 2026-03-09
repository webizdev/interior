import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            const { data, error } = await supabase
                .from('interior_blogs')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setBlogs(data);
            }
            setLoading(false);
        }
        fetchBlogs();
    }, []);

    return (
        <section id="blog" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">Artikel & Inspirasi</h2>
                    <div className="w-20 h-1 bg-sage mx-auto"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-sage border-t-transparent animate-spin"></div></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <article key={blog.id} className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300">
                                <div className="aspect-video overflow-hidden">
                                    <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                </div>
                                <div className="p-8">
                                    <div className="text-xs font-bold text-sage uppercase mb-3">{new Date(blog.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })} • {blog.author}</div>
                                    <h3 className="text-xl font-bold mb-3 font-sans line-clamp-2 group-hover:text-sage transition">{blog.title}</h3>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">{blog.excerpt}</p>
                                    <Link to={`/blog/${blog.id}`} className="inline-flex items-center text-sm font-bold text-deep-earth hover:text-sage transition">
                                        BACA SELENGKAPNYA
                                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
