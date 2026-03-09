import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save } from 'lucide-react';

export default function SettingsEditor() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        const { data, error } = await supabase.from('interior_settings').select('*').single();
        if (data) setSettings(data);
        setLoading(false);
    };

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        const { error } = await supabase
            .from('interior_settings')
            .update({
                website_name: settings.website_name,
                hero_title: settings.hero_title,
                hero_subtitle: settings.hero_subtitle,
                hero_image_url: settings.hero_image_url,
                contact_title: settings.contact_title,
                contact_subtitle: settings.contact_subtitle,
                contact_cs_number: settings.contact_cs_number,
                footer_quote: settings.footer_quote,
                footer_address: settings.footer_address,
                footer_maps_link: settings.footer_maps_link,
                social_facebook: settings.social_facebook,
                social_instagram: settings.social_instagram,
                social_twitter: settings.social_twitter,
                social_youtube: settings.social_youtube,
                social_tiktok: settings.social_tiktok,
                updated_at: new Date()
            })
            .eq('id', settings.id);

        if (error) {
            setMessage(`Error saving: ${error.message}`);
        } else {
            setMessage('Settings saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        }
        setSaving(false);
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Global Settings</h2>
                    <p className="text-sm text-gray-500">Update general information across the website.</p>
                </div>
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center bg-sage text-white px-6 py-2 rounded-lg hover:bg-sage/90 disabled:opacity-50"
                >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                    {message}
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="font-bold text-lg border-b pb-2">Website Identity & Hero Section</h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website Name / Logo Text</label>
                        <input type="text" name="website_name" value={settings?.website_name || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
                        <input type="text" name="hero_image_url" value={settings?.hero_image_url || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" name="hero_title" value={settings?.hero_title || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                        <textarea name="hero_subtitle" rows="2" value={settings?.hero_subtitle || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="font-bold text-lg border-b pb-2">Contact Call-to-Action</h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" name="contact_title" value={settings?.contact_title || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                        <textarea name="contact_subtitle" rows="2" value={settings?.contact_subtitle || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CS WhatsApp Number (Prefix with country code, e.g. 62812...)</label>
                        <input type="text" name="contact_cs_number" value={settings?.contact_cs_number || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="font-bold text-lg border-b pb-2">Footer & Address</h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Footer Description/Quote</label>
                        <textarea name="footer_quote" rows="2" value={settings?.footer_quote || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Detail Text</label>
                        <textarea name="footer_address" rows="2" value={settings?.footer_address || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Iframe Embed Code/Link</label>
                        <input type="text" name="footer_maps_link" value={settings?.footer_maps_link || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="font-bold text-lg border-b pb-2">Social Media Endpoints</h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                        <input type="text" name="social_facebook" value={settings?.social_facebook || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                        <input type="text" name="social_instagram" value={settings?.social_instagram || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X URL</label>
                        <input type="text" name="social_twitter" value={settings?.social_twitter || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                        <input type="text" name="social_youtube" value={settings?.social_youtube || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">TikTok URL</label>
                        <input type="text" name="social_tiktok" value={settings?.social_tiktok || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                    </div>
                </div>
            </div>

            <div className="h-10"></div>
        </form>
    );
}
