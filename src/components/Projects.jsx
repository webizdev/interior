import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Link } from 'react-router-dom';

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!isSupabaseConfigured) return;
            try {
                const { data, error } = await supabase
                    .from('interior_gallery')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(3);
                if (!error && data) setProjects(data);
            } catch (err) {
                console.error("Projects fetch error:", err);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="py-24 bg-beige/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">Proyek Terbaru</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative overflow-hidden rounded-xl aspect-[4/5] shadow-lg">
                            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center p-4">
                                <span className="text-sage text-xs font-bold uppercase tracking-widest mb-2">{project.category}</span>
                                <h4 className="text-white text-xl font-serif text-center">{project.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link to="/gallery" className="inline-block border border-sage text-sage px-8 py-3 rounded-full font-bold hover:bg-sage hover:text-white transition">
                        Lihat Semua Proyek
                    </Link>
                </div>
            </div>
        </section>
    );
}
