import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            if (!isSupabaseConfigured) {
                setLoading(false);
                return;
            }
            try {
                const { data, error } = await supabase
                    .from('interior_blogs')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (!error && data) setPost(data);
            } catch (err) {
                console.error("BlogPost fetch error:", err);
            }
            setLoading(false);
        }
        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-12 h-12 rounded-full border-4 border-sage border-t-transparent animate-spin"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h1 className="text-3xl font-serif mb-4">Artikel Tidak Ditemukan</h1>
                <Link to="/" className="text-sage hover:underline">Kembali ke Beranda</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-24 font-sans text-gray-900">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link to="/#blog" className="inline-flex items-center text-sage hover:text-sage/80 font-medium mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Artikel
                </Link>

                <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="aspect-[21/9] overflow-hidden">
                        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="text-sm font-bold text-sage uppercase tracking-wider mb-4">
                            {new Date(post.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })} • {post.author}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-serif font-bold mb-8 text-gray-900 leading-tight">
                            {post.title}
                        </h1>

                        <div className="prose prose-lg prose-sage max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }} />
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
