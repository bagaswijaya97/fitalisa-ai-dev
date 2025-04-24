import StreamingHTML from './TestPage';
import TestPage from './TestPage';

const htmlContent = `
  <div>\n<p>Halo Alex Sitompul, saya Fitalisa dari FitAja!. Saya mengerti kekhawatiran Anda mengenai penipisan rambut di usia muda. Berikut beberapa tips perawatan rambut yang bisa membantu:</p>\n<ul>\n  <li><strong>Nutrisi Seimbang:</strong> Pastikan asupan protein, zat besi, zinc, serta vitamin B (terutama Biotin), D, dan E tercukupi. Makanan seperti telur, ikan, bayam, kacang-kacangan, dan biji-bijian sangat baik untuk kesehatan rambut.</li>\n  <li><strong>Perawatan Kulit Kepala:</strong> Jaga kebersihan kulit kepala dengan keramas secara teratur menggunakan sampo yang lembut dan sesuai jenis rambut. Hindari menggaruk kulit kepala terlalu keras. Pijat lembut kulit kepala saat keramas dapat membantu melancarkan sirkulasi darah.</li>\n  <li><strong>Hindari Bahan Kimia Keras:</strong> Batasi penggunaan produk rambut yang mengandung bahan kimia keras seperti sulfat dan paraben. Hindari juga pewarnaan, pengeritingan, atau pelurusan rambut yang terlalu sering.</li>\n  <li><strong>Hindari Penataan Rambut Berlebih:</strong> Kurangi penggunaan alat penata rambut yang panas (hair dryer, catokan) dan hindari mengikat rambut terlalu kencang karena dapat menyebabkan tarikan pada akar rambut (traction alopecia).</li>\n  <li><strong>Kelola Stres:</strong> Stres dapat memicu kerontokan rambut. Coba kelola stres dengan baik melalui olahraga teratur, meditasi, yoga, atau melakukan hobi yang Anda sukai.</li>\n  <li><strong>Tidur Cukup:</strong> Pastikan Anda mendapatkan tidur yang cukup dan berkualitas setiap malam, karena regenerasi sel, termasuk sel rambut, terjadi saat kita tidur.</li>\n  <li><strong>Hindari Merokok:</strong> Merokok dapat mengganggu sirkulasi darah ke folikel rambut.</li>\n  <li><strong>Konsultasi Profesional:</strong> Jika penipisan rambut terasa signifikan atau mengkhawatirkan, jangan ragu untuk berkonsultasi dengan dokter atau dokter spesialis kulit (dermatologis) untuk mengetahui penyebab pastinya dan mendapatkan penanganan yang tepat.</li>\n</ul>\n<p>Semoga tips ini bermanfaat untuk menjaga kesehatan rambut Anda, Alex!</p>\n</div>
`;

export default function TestingPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <StreamingHTML htmlString={htmlContent} speed={25} />
    </div>
  );
}
