import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', fontFamily: 'sans-serif', color: '#b91c1c', backgroundColor: '#fef2f2', minHeight: '100vh' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Sistem Mengalami Kendala (Crash)</h2>
                    <p style={{ marginBottom: '1rem' }}>Pesan Error:</p>
                    <pre style={{ background: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', marginBottom: '1rem' }}>
                        {this.state.error?.message}
                    </pre>
                    <p style={{ fontWeight: 'bold' }}>Kemungkinan Penyebab Utama Vercel Blank:</p>
                    <ul style={{ marginLeft: '1.5rem', listStyleType: 'disc', marginTop: '0.5rem' }}>
                        <li>Environment Variables (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY) belum ada atau salah nama di menu Settings Vercel.</li>
                        <li>Supabase client gagal melakukan inisialisasi karena URL kosong.</li>
                    </ul>
                    <details style={{ marginTop: '2rem', cursor: 'pointer' }}>
                        <summary>Lihat Stack Trace Detail</summary>
                        <pre style={{ background: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', marginTop: '1rem', fontSize: '0.8rem' }}>
                            {this.state.error?.stack}
                        </pre>
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}
