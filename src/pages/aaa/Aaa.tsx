import { Fragment, useEffect, useState } from 'react'

const dummyResponse = {
    meta_data: {
        code: 200,
        message: "OK"
    },
    data: {
        html: `<div>Halo! 👋 Senang bisa bantu kamu.<br><br>
Wah, kopi susu memang enak ya! Kalau mau dinikmati tiap hari, ada baiknya kita buat versi yang lebih ramah buat tubuh. Livia coba bantu kasih ide resep ya:<br><br>
<b>Resep Kopi Susu Lebih Sehat ala Livia:</b><br>
<ul>
  <li><b>Kopi:</b> Cukup 1 shot espresso atau sekitar 30-50ml seduhan kopi hitam murni. Batasi jumlahnya ya, jangan berlebihan kafeinnya.</li>
  <li><b>Susu:</b> Pilih susu segar (fresh milk) atau susu UHT rendah lemak (low-fat) sekitar 150-200ml. Susu nabati seperti susu almond atau oat tanpa tambahan gula juga bisa jadi pilihan bagus.</li>
  <li><b>Pemanis (Ini Kuncinya!):</b> Nah, coba deh kurangi atau bahkan hilangkan gula pasir. Kalau mau sedikit manis, bisa pakai <i>sedikiiit</i> aja madu murni, pemanis stevia, atau sejumput bubuk kayu manis untuk aroma dan rasa manis alami.</li>
</ul>
<br><b>Tips Penting:</b><br>
<ul>
  <li>Perhatikan waktu minum kopinya, jangan terlalu dekat jam tidur ya.</li>
  <li>Yang paling penting, dengarkan sinyal tubuhmu. Kalau ada rasa nggak nyaman di perut atau jantung berdebar, mungkin resepnya perlu disesuaikan lagi atau frekuensinya dikurangi.</li>
</ul>
<br>Ingat ya, ini saran umum. Kondisi setiap orang beda-beda. Kalau kamu punya kondisi kesehatan tertentu, lebih baik konsultasi dulu dengan dokter atau ahli gizi.<br><br>
Semoga resepnya cocok buat kamu! 😊❤️</div>`
    }
};


const Aaa = () => {

    const [htmlContent, setHtmlContent] = useState<any>('');
    const [loading, setLoading] = useState<boolean>(false);



    useEffect(() => {
        setLoading(true);
        setHtmlContent('')

        const html = dummyResponse.data.html;
        const tokens = html.split(/(\s+|<[^>]+>)/).filter(Boolean);
        let index = 0;
        let accumulated = '';

        const interval = setInterval(() => {
            accumulated += tokens[index];
            setHtmlContent(accumulated);
            index++;
            if (index >= tokens.length) {
                clearInterval(interval);
                setLoading(false);
            }
        }, 5)
    }, [])



    return (
        <Fragment>
            <div className='text-base text-black
             [&_ul]:list-disc [&_ul]:pl-5
             [&_li]:list-item [&_li]:ml-4'
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </Fragment>
    )
}

export default Aaa