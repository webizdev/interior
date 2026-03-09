import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader } from 'lucide-react';

export default function ServicesEditor() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const { data, error } = await supabase.from('interior_services').select('*').order('sort_order', { ascending: true });
        if (data) setItems(data);
        setLoading(false);
    };

    const handleChange = (id, field, value) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSave = async (id) => {
        setSavingId(id);
        const itemToSave = items.find(item => item.id === id);

        await supabase
            .from('interior_services')
            .update({
                title: itemToSave.title,
                description: itemToSave.description,
                image_url: itemToSave.image_url,
                icon_name: itemToSave.icon_name
            })
            .eq('id', id);

        setSavingId(null);
    };

    if (loading) return <div>Loading Services section...</div>;

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-bold text-gray-800">Services Section</h2>
                <p className="text-sm text-gray-500">Edit the services displayed on the homepage.</p>
            </div>

            <div className="grid gap-6">
                {items.map((item, index) => (
                    <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
                            <input
                                type="text"
                                value={item.image_url || ''}
                                onChange={(e) => handleChange(item.id, 'image_url', e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage mb-2"
                            />
                            {item.image_url && (
                                <img src={item.image_url} alt="Preview" className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                            )}
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service {index + 1} Title</label>
                                <input
                                    type="text"
                                    value={item.title || ''}
                                    onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows="3"
                                    value={item.description || ''}
                                    onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage"
                                />
                            </div>
                        </div>
                        <div className="flex items-end md:w-32">
                            <button
                                onClick={() => handleSave(item.id)}
                                disabled={savingId === item.id}
                                className="w-full h-10 mt-auto flex justify-center items-center bg-sage text-white px-4 rounded-lg hover:bg-sage/90 disabled:opacity-50"
                            >
                                {savingId === item.id ? <Loader className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-2" /> Save</>}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
