import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, X, Save, Loader } from 'lucide-react';

export default function GalleryEditor() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const { data, error } = await supabase.from('interior_gallery').select('*').order('created_at', { ascending: false });
        if (data) setItems(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project item?')) return;
        await supabase.from('interior_gallery').delete().eq('id', id);
        fetchItems();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        if (editingItem.id) {
            // Update
            await supabase.from('interior_gallery').update({
                title: editingItem.title,
                image_url: editingItem.image_url,
                category: editingItem.category || 'Portfolio'
            }).eq('id', editingItem.id);
        } else {
            // Insert
            await supabase.from('interior_gallery').insert([{
                title: editingItem.title,
                image_url: editingItem.image_url,
                category: editingItem.category || 'Portfolio'
            }]);
        }
        setIsSaving(false);
        setEditingItem(null);
        fetchItems();
    };

    if (loading) return <div>Loading Gallery...</div>;

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Projects & Gallery</h2>
                    <p className="text-sm text-gray-500">Manage your latest projects portfolio.</p>
                </div>
                <button
                    onClick={() => setEditingItem({ title: '', image_url: '', category: 'Portfolio' })}
                    className="flex items-center bg-sage text-white px-4 py-2 rounded-lg hover:bg-sage/90"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </button>
            </div>

            {editingItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">{editingItem.id ? 'Edit Project' : 'Add New Project'}</h3>
                            <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                                <input required type="text" value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input required type="text" value={editingItem.image_url} onChange={e => setEditingItem({ ...editingItem, image_url: e.target.value })} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setEditingItem(null)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" disabled={isSaving} className="flex items-center px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 disabled:opacity-50">
                                    {isSaving ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
                {items.map(item => (
                    <div key={item.id} className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="aspect-square">
                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-4 pt-12 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <h3 className="text-white font-medium text-sm mb-2">{item.title}</h3>
                            <div className="flex gap-2">
                                <button onClick={() => setEditingItem(item)} className="px-2 py-1 bg-white/20 hover:bg-white text-white hover:text-gray-900 text-xs rounded transition-colors backdrop-blur-sm">Edit</button>
                                <button onClick={() => handleDelete(item.id)} className="px-2 py-1 bg-red-500/80 hover:bg-red-500 text-white text-xs rounded transition-colors backdrop-blur-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
