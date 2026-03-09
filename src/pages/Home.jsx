import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import Services from '../components/Services';
import Products from '../components/Products';
import Blog from '../components/Blog';
import Projects from '../components/Projects';
import ContactCTA from '../components/ContactCTA';
import Footer from '../components/Footer';

export default function Home() {
    // Handle smooth scrolling on initial load if there's a hash in the URL
    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, []);

    return (
        <div className="page-fade bg-soft-white text-deep-earth font-sans">
            <Navbar />
            <main>
                <Hero />
                <WhyUs />
                <Services />
                <Products />
                <Blog />
                <Projects />
                <ContactCTA />
            </main>
            <Footer />
        </div>
    );
}
