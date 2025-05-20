import heic2any from 'heic2any';
import { Image, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { heicTo, isHeic } from "heic-to"

const AttachButton = ({ onFileChange }: { onFileChange: (file: File | null) => void }) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File | null>();

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
            console.log(file.type);
            onFileChange(file);
            setImage(file);
        }

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const saveFile = async (blob: any) => {
        const a = document.createElement('a');
        a.download = 'bagas';
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', (e) => {
          setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
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