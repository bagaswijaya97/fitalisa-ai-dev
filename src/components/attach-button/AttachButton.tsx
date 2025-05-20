import heic2any from 'heic2any';
import { Image, Upload } from 'lucide-react'
import { useRef } from 'react'

const AttachButton = ({ onFileChange }: { onFileChange: (file: File | null) => void }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileClick = () => {
        inputRef.current?.click();
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file && (file.type === "image/heic" || file.name.endsWith(".heic"))) {
            try {
                // Convert to JPEG blob
                const convertedBlob = await heic2any({
                    blob: file,
                    toType: "image/jpeg",
                    quality: 0.8,
                });

                const newFile = new File([convertedBlob as Blob], file.name.replace(/\.heic$/i, ".jpeg"), {
                    type: "image/jpeg",
                  });
                onFileChange(newFile);
            } catch (err) {
                console.error("HEIC conversion error:", err);
            }
        } else {
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