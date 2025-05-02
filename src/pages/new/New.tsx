import { useEffect, useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import { useHome } from "./hooks"


const New = () => {

    const {
        chatTopRef,
        chatEndRef,
        engine_index,
        setEngine
    } = useHome();

    // const [htmlContent, setHtmlContent] = useState<any>('');
    // const [loading, setLoading] = useState<boolean>(false);

    const hitToken = async () => {
        let res;
        res = await fetch(`https://ftmobile.inhealth.co.id/livia-ai/api/AuthToken/SW5pIGFkYWxhaCBrdW5jaSByYWhhc2lhLCB5YW5nIHN1ZGFoIGRpIGVua3JpcHNpIG1lbmdndW5ha2FuIGJhc2U2NC4gVG9sb25nIGRpamFnYSBiYWlrLWJhaWsgeWFhLg==`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
        const data = res.json();
        console.log(data);
    }

    const bodyAPI = {
        prompt: "berikan ciri-ciri kesehatan berdasarkan warna urin"
    }

    const hitpromt = async () => {
        let res;
        res = await fetch(`https://ftmobile.inhealth.co.id/livia-ai/api/Gemini/text-only`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGaXRhbGlzYUFJQ2hhdGJvdCIsImp0aSI6ImFiZDRiZWJmLTI4MjktNDBjZS1iZjdiLTk3Zjc0ZmExM2IxNCIsIm5iZiI6MTc0NjE2OTQ4MSwiZXhwIjoxNzQ2MTczMDgxLCJpc3MiOiJGaXRhbGlzYUFJIiwiYXVkIjoiRml0YWxpc2FVc2VycyJ9.gxfxeJGJcEk_PIGgDrPmtm8Gcl2uncF3nHHfcqGMPRk.SW5pIGFkYWxhaCBrdW5jaSByYWhhc2lhLCB5YW5nIHN1ZGFoIGRpIGVua3JpcHNpIG1lbmdndW5ha2FuIGJhc2U2NC4gVG9sb25nIGRpamFnYSBiYWlrLWJhaWsgeWFhLg==`
                },
                body: JSON.stringify(bodyAPI)
            })
        // const data = res.json();
        console.log(res);
    }




    return (
        <section className="bg-white container mx-auto overflow-hidden md:px-0 max-w-screen-md min-w-[360px]">
            {/* <div className='text-base text-black
             [&_ul]:list-disc [&_ul]:pl-5
             [&_li]:list-item [&_li]:ml-4'
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            /> */}
            <div ref={chatTopRef} />
            <h1 className="fixed top-4 left-4 w-full font-semibold flex items-center justify-start">
                <Dropdown engine_index={engine_index} setEngine={setEngine} />
            </h1>
            {/* <div className="fixed bottom-0 flex items-center gap-2">
                <button onClick={() => {
                    hitToken();
                }} className=" border">Hit Token</button>
                <button onClick={() => {
                    hitpromt();
                }} className=" border">Hit api</button>
            </div> */}
            <div className="bottom-4 left-0 right-0 px-4 max-w-screen-md w-full mx-auto">
                <input type="text" className="border w-full text-[16px] px-2 h-[50px]" />
            </div>
        </section>
    )
}

export default New