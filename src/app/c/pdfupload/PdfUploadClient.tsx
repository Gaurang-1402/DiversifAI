"use client";

import { CANDIDATE_PROFILE_SCREEN, DASH, PARSE_PDF_API } from '@/app/routes-config'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';



export default function PdfUploadClient() {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null)

    const onFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const objectUrl = URL.createObjectURL(file);
            setFileUrl(objectUrl);
            setFile(file)
        } else {
            alert('Please upload a PDF file');
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false)
    const router=useRouter()

    const handleSubmit = async () => {
        if (!file || isSubmitting) return;
        try {
            setIsSubmitting(true)
            const formData = new FormData()
            formData.append('file', file)

            const res=await fetch(PARSE_PDF_API, {
                method: 'POST',
                body: formData
            })
            const json=await res.json()
            console.log(json)
            if(json.error){
                throw new Error(json.message)
            }
            toast.success('File uploaded & parsed successfully. redirecting to profile...')
            router.push(CANDIDATE_PROFILE_SCREEN)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <div className='flex flex-col mt-8'>
                <h1 className="text-[#8000FF] font-bold text-4xl">Diversif<span className="text-[#18C7D2]">AI</span></h1>
                <h2 className="text-gray-500 font-medium text-2xl mt-2">Upload your resume</h2>
                <p className="text-gray-400 mt-2 w-96">Our NeutrifAI™ tool will scan your resume and edit portions that may lead to bias.</p>
            </div>


            <div className="flex flex-col gap-10 items-center justify-center">
                {fileUrl ? (
                    <div className="flex flex-col w-full items-center mt-6">
                        <object
                            data={fileUrl}
                            type="application/pdf"
                            className="h-96 w-full"
                            aria-label="PDF file"
                        >
                            PDF file
                        </object>
                        <label className="mt-4 cursor-pointer">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={onFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                ) : (
                    <label className="w-96 cursor-pointer mt-20">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={onFileChange}
                            className="hidden"
                        />
                        <img src="/upload.png" alt="apply" className="object-contain" />
                    </label>
                )}

                <div className="">
                    <button onClick={handleSubmit} className={`flex items-center justify-center w-64 rounded-[12px] ${fileUrl ? 'bg-[#8000FF]' : 'bg-gray-300'} mt-4 border-4 ${fileUrl ? 'border-[#8000FF]' : 'border-gray-300'} py-2`} disabled={!fileUrl}>
                        <p className="text-white font-medium text-lg">Anonymize my info!</p>
                    </button>
                </div>
            </div>








        </div>

    )
}
