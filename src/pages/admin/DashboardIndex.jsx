import React from 'react';

export default function DashboardIndex() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 mb-8 w-full max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold font-serif mb-2">Pusat Bantuan & Instruksi Penggunaan CMS</h2>
            <p className="text-gray-600 mb-8 border-b pb-6">
                Selamat datang di halaman Admin Istana D Interior. Berikut adalah panduan penggunaan untuk memodifikasi website Anda:
            </p>

            <div className="space-y-6">
                <div className="p-6 bg-sage/5 rounded-xl border border-sage/20">
                    <h3 className="font-bold text-sage mb-2 text-lg">⚙️ Global Settings</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                        <li><strong>Home:</strong> Ubah teks Judul Utama (Hero Title), Subtitle, dan Gambar Background utama (masukkan URL gambar/foto). </li>
                        <li><strong>Kontak & CTA:</strong> Ubah teks ajakan (Call to Action) dan masukkan <strong>Nomor WhatsApp Admin (CS)</strong> (gunakan format 628xxx tanpa simbol + atau spasi).</li>
                        <li><strong>Footer:</strong> Ubah deskripsi singkat perusahaan, alamat cabang, link sematan Google Maps (ambil dari &lt;iframe src="..."&gt; di Google Maps), dan link media sosial Anda.</li>
                    </ul>
                </div>

                <div className="p-6 bg-sage/5 rounded-xl border border-sage/20">
                    <h3 className="font-bold text-sage mb-2 text-lg">💡 Why Us (Kenapa Memilih Kami)</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                        <li>Berfungsi untuk mengubah 3 Poin Keunggulan Utama di halaman depan.</li>
                        <li><strong>Title:</strong> Judul poin (Contoh: "Berpengalaman" atau "Harga Transparan").</li>
                        <li><strong>Description:</strong> Penjelasan singkat di bawah judul poin tersebut.</li>
                        <li><strong>Sort Order:</strong> Urutan tampil (angka 1 akan tampil paling kiri).</li>
                    </ul>
                </div>

                <div className="p-6 bg-sage/5 rounded-xl border border-sage/20">
                    <h3 className="font-bold text-sage mb-2 text-lg">🛠️ Services (Layanan Kami)</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                        <li>Untuk menambahkan atau mengubah kotak Layanan pada beranda.</li>
                        <li><strong>Image URL:</strong> Masukkan link foto representasi layanan (berukuran landscape lebih baik).</li>
                        <li><strong>Icon Name:</strong> Anda bisa mengetik nama icon dari <em>Lucide React</em> (seperti: <code>Sofa</code>, <code>Paintbrush</code>, <code>Hammer</code>, dll). Icon otomatis akan muncul.</li>
                    </ul>
                </div>

                <div className="p-6 bg-sage/5 rounded-xl border border-sage/20">
                    <h3 className="font-bold text-sage mb-2 text-lg">🛍️ Products (Katalog Produk)</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                        <li>Klik <strong>Tambah Produk Baru</strong> untuk menambah katalog. Ini bisa diedit dan dihapus kapan saja.</li>
                        <li><strong>Harga:</strong> Masukkan angka (contoh: 50000000) dan jangan menggunakan Rp. atau titik. Formatter website yang akan mengaturnya.</li>
                    </ul>
                </div>

                <div className="p-6 bg-sage/5 rounded-xl border border-sage/20">
                    <h3 className="font-bold text-sage mb-2 text-lg">📝 Blogs (Artikel & Inspirasi)</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                        <li>Digunakan untuk menulis artikel penuh untuk meningkatkan SEO website Anda.</li>
                        <li><strong>Excerpt:</strong> Cuplikan tulisan singkat yang akan tampil di halaman utama (Beranda).</li>
                        <li><strong>Content:</strong> Isi artikel penuh yang dibaca oleh pengunjung saat menekan "Baca Selengkapnya". Anda bisa copy-paste tulisan kemari.</li>
                    </ul>
                </div>

                <div className="p-6 bg-sage/5 rounded-xl border border-sage/20">
                    <h3 className="font-bold text-sage mb-2 text-lg">📸 Gallery (Proyek Terbaru & Dokumentasi)</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                        <li>Menu ini mengatur semua foto Portfolio yang tampil baik di bagian "Proyek Terbaru" pada Beranda (3 terbaru), maupun halaman Gallery Dokumentasi komplit.</li>
                        <li><strong>Category:</strong> Tuliskan tipe pekerjaannya (contoh: <em>Kitchen Set</em>, <em>Living Room</em>, <em>Wardrobe</em>). Teks ini akan dicetak tebal dan menggunakan huruf kapital di atas judul foto.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
