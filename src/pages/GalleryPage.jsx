import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

export default function GalleryPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-fade bg-soft-white text-deep-earth font-sans flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Gallery />
            </main>
            <Footer />
        </div>
    );
}
