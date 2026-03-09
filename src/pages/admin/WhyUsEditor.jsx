import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader } from 'lucide-react';

export default function WhyUsEditor() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const { data, error } = await supabase.from('interior_whyus').select('*').order('sort_order', { ascending: true });
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
            .from('interior_whyus')
            .update({
                title: itemToSave.title,
                description: itemToSave.description
            })
            .eq('id', id);

        setSavingId(null);
    };

    if (loading) return <div>Loading "Why Us" section...</div>;

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-bold text-gray-800">Why Us Section</h2>
                <p className="text-sm text-gray-500">Edit the three main advantages displayed on the homepage.</p>
            </div>

            <div className="grid gap-6">
                {items.map((item, index) => (
                    <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Item {index + 1} Title</label>
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
                                    rows="2"
                                    value={item.description || ''}
                                    onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage"
                                />
                            </div>
                        </div>
                        <div className="flexitems-end md:w-32">
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
