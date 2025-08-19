export default function InfoSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-primary-800 mb-4">Apa itu Warisan (Faraid)?</h2>
        <p className="text-gray-700 mb-4">
          Warisan (Faraid) dalam Islam adalah aturan pembagian harta peninggalan seseorang yang telah wafat sesuai ketentuan syariat Islam yang telah ditetapkan dalam Al-Qur'an dan Hadits.
        </p>
        <p className="text-gray-700">
          Di Indonesia, penerapan hukum warisan mengikuti aturan Faraid kecuali jika semua ahli waris sepakat untuk menggunakan wasiat atau hibah.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-primary-800 mb-4">Ahli Waris Utama</h2>
        <div className="space-y-3">
          <div className="border-l-4 border-primary-500 pl-3">
            <h3 className="font-semibold text-gray-800">Suami</h3>
            <p className="text-sm text-gray-600">1/2 (jika tidak ada anak) atau 1/4 (jika ada anak)</p>
          </div>
          <div className="border-l-4 border-primary-500 pl-3">
            <h3 className="font-semibold text-gray-800">Istri</h3>
            <p className="text-sm text-gray-600">1/4 (jika tidak ada anak) atau 1/8 (jika ada anak)</p>
          </div>
          <div className="border-l-4 border-primary-500 pl-3">
            <h3 className="font-semibold text-gray-800">Ayah</h3>
            <p className="text-sm text-gray-600">1/6 (jika ada anak) atau 1/4 (jika tidak ada anak)</p>
          </div>
          <div className="border-l-4 border-primary-500 pl-3">
            <h3 className="font-semibold text-gray-800">Ibu</h3>
            <p className="text-sm text-gray-600">1/6 (jika ada anak) atau 1/3 (jika tidak ada anak)</p>
          </div>
          <div className="border-l-4 border-primary-500 pl-3">
            <h3 className="font-semibold text-gray-800">Anak Laki-laki</h3>
            <p className="text-sm text-gray-600">2 bagian jika ada anak perempuan</p>
          </div>
          <div className="border-l-4 border-primary-500 pl-3">
            <h3 className="font-semibold text-gray-800">Anak Perempuan</h3>
            <p className="text-sm text-gray-600">1 bagian jika ada anak laki-laki</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-primary-800 mb-4">Langkah-langkah Pembagian</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Bayar semua hutang yang dimiliki almarhum</li>
          <li>Laksanakan wasiat (tidak boleh lebih dari 1/3 harta)</li>
          <li>Bagi harta sesuai aturan Faraid kepada ahli waris</li>
          <li>Sisa harta dibagikan sesuai kesepakatan ahli waris</li>
        </ol>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Catatan Penting</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Hasil kalkulasi ini hanya sebagai panduan</li>
          <li>• Konsultasikan dengan ahli waris (pendeta/pengurus masjid) untuk konfirmasi</li>
          <li>• Semua ahli waris harus menyetujui pembagian warisan</li>
        </ul>
      </div>
    </div>
  )
}
