import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Save, Loader } from 'lucide-react';

export default function BlogsEditor() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const { data, error } = await supabase.from('interior_blogs').select('*').order('created_at', { ascending: false });
        if (data) setItems(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        await supabase.from('interior_blogs').delete().eq('id', id);
        fetchItems();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        if (editingItem.id) {
            // Update
            await supabase.from('interior_blogs').update({
                title: editingItem.title,
                excerpt: editingItem.excerpt,
                content: editingItem.content,
                image_url: editingItem.image_url,
                author: editingItem.author
            }).eq('id', editingItem.id);
        } else {
            // Insert
            await supabase.from('interior_blogs').insert([{
                title: editingItem.title,
                excerpt: editingItem.excerpt,
                content: editingItem.content,
                image_url: editingItem.image_url,
                author: editingItem.author || 'Admin'
            }]);
        }
        setIsSaving(false);
        setEditingItem(null);
        fetchItems();
    };

    if (loading) return <div>Loading Blogs...</div>;

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Blog Posts</h2>
                    <p className="text-sm text-gray-500">Manage articles and inspiration content.</p>
                </div>
                <button
                    onClick={() => setEditingItem({ title: '', excerpt: '', content: '', image_url: '', author: 'Admin' })}
                    className="flex items-center bg-sage text-white px-4 py-2 rounded-lg hover:bg-sage/90"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                </button>
            </div>

            {editingItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-3xl my-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">{editingItem.id ? 'Edit Post' : 'New Post'}</h3>
                            <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input required type="text" value={editingItem.title} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input required type="text" value={editingItem.image_url} onChange={e => setEditingItem({ ...editingItem, image_url: e.target.value })} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contributor / Author</label>
                                    <input required type="text" value={editingItem.author} onChange={e => setEditingItem({ ...editingItem, author: e.target.value })} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Excerpt (Displayed on Cards)</label>
                                    <textarea required rows="2" value={editingItem.excerpt} onChange={e => setEditingItem({ ...editingItem, excerpt: e.target.value })} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Article Content (HTML allowed)</label>
                                    <textarea required rows="8" value={editingItem.content || ''} onChange={e => setEditingItem({ ...editingItem, content: e.target.value })} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-sage focus:ring-sage" />
                                </div>
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

            <div className="grid md:grid-cols-2 gap-6">
                {items.map(item => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex overflow-hidden">
                        <img src={item.image_url} alt={item.title} className="w-40 h-auto object-cover" />
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-base mb-1 line-clamp-2">{item.title}</h3>
                            <p className="text-gray-500 text-xs mb-2">{new Date(item.created_at).toLocaleDateString()} • {item.author}</p>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{item.excerpt}</p>
                            <div className="flex gap-2 pt-3 border-t border-gray-50">
                                <button onClick={() => setEditingItem(item)} className="flex-1 flex justify-center items-center py-1.5 bg-gray-50 hover:bg-sage/10 hover:text-sage text-gray-600 rounded-lg text-xs font-medium transition-colors">
                                    <Edit2 className="w-3 h-3 mr-1.5" /> Edit
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="flex-1 flex justify-center items-center py-1.5 bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-600 rounded-lg text-xs font-medium transition-colors">
                                    <Trash2 className="w-3 h-3 mr-1.5" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
