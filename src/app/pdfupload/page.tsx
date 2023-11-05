"use client";

import { DASH } from '@/app/routes-config'
import Link from 'next/link'
import { useState } from 'react';


export default function PdfUpload() {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    
    const onFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const objectUrl = URL.createObjectURL(file);
            setFileUrl(objectUrl);
        } else {
            alert('Please upload a PDF file');
        }
    };

  return (
      <div>
          <div className='px-8 mt-10 flex flex-col'>
          <h1 className="text-[#8000FF] font-bold text-4xl">Diversif<span className="text-[#18C7D2]">AI</span></h1>
          <h2 className="text-gray-500 font-medium text-2xl mt-2">Upload your resume</h2>
          <p className="text-gray-400 mt-2 w-96">Our NeutrifAI™ tool will scan your resume and edit portions that may lead to bias.</p>
          </div>

          {/* <div className="flex items-center justify-center min-h-screen">
            <button className="h-96 w-96 mb-96">
              <img src="/upload.png" alt="apply" className="object-contain"/>
            </button>
          </div> */}

          <div className="flex items-center justify-center">
                {fileUrl ? (
                    <div className="flex flex-col items-center">
                        <object
                            data={fileUrl}
                            type="application/pdf"
                            className="h-96 w-96 mt-6"
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
                    <label className="h-96 w-96 mb-96 cursor-pointer mt-20">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={onFileChange}
                            className="hidden"
                        />
                        <img src="/upload.png" alt="apply" className="object-contain"/>
                    </label>
                )}
            </div>




          <div className="absolute bottom-[60px] left-1/2 transform -translate-x-1/2">
            <Link href={DASH}>
            <button className={`flex items-center justify-center w-64 rounded-[12px] ${fileUrl ? 'bg-[#8000FF]' : 'bg-gray-300'} mt-4 border-4 ${fileUrl ? 'border-[#8000FF]' : 'border-gray-300'} py-2`} disabled={!fileUrl}>
                <p className="text-white font-medium text-lg">Re-write!</p>
            </button>
            </Link>
          </div>

      </div>

    )
}
