import heic2any from 'heic2any';
import { Image, Upload } from 'lucide-react'
import { useRef } from 'react'
import { heicTo } from "heic-to"

const AttachButton = ({ onFileChange }: { onFileChange: (file: File | null) => void }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileClick = () => {
        inputRef.current?.click();
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        console.log(file.type);

        if (file && (file.type === "image/heic" || file.type === "image/heif" || file.name.toLowerCase().endsWith(".heif") || file.name.endsWith(".heic"))) {
            console.log("heic heif")
            try {
                const jpeg = await heicTo({
                    blob: file,
                    type: "image/jpeg",
                    quality: 0.5
                  })
                const newFileName = file.name.replace(/\.(heic|heif)$/i, ".jpeg");

                const newFile = new File([jpeg as Blob], newFileName, {
                    type: "image/jpeg",
                });
                onFileChange(newFile);
            } catch (err) {
                console.error("HEIC conversion error:", err);
            }
        } else {
            console.log("bukan heic")
            onFileChange(file);
        }

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className='relative'>
            <input
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            <button
                onClick={handleFileClick}
                className="inline-flex gap-2 border rounded-full hover:bg-white hover:shadow-md transition-all p-1 items-center text-sm font-medium"
            >
                <Image
                    size={18}
                    className="text-[#284F71]"
                />
            </button>
        </div>
    )
}

export default AttachButton