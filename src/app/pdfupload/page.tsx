import { DASH } from '@/app/routes-config'
import Link from 'next/link'

export default function PdfUpload() {
  return (
      <div>
          <div className='px-8 mt-14 flex flex-col'>
          <h1 className="text-[#8000FF] font-bold text-4xl">Diversif<span className="text-[#18C7D2]">AI</span></h1>
          <h2 className="text-gray-500 font-medium text-2xl mt-2">Upload your resume</h2>
          <p className="text-gray-400 mt-2 w-96">Our AI will scan your resume and edit portions that may lead to bias.</p>
          </div>

          <div className="flex items-center justify-center min-h-screen">
            <button className="h-96 w-96 mb-96">
              <img src="/upload.png" alt="apply" className="object-contain"/>
            </button>
          </div>



          <div className="absolute bottom-[120px] left-1/2 transform -translate-x-1/2">
            <Link href={DASH}>
            <button className="flex items-center justify-center w-64 rounded-[12px] bg-[#8000FF] mt-4 border-4 border-[#8000FF] py-2">
                <p className="text-white font-medium text-lg">Re-write!</p>
            </button>
            </Link>
          </div>

      </div>

    )
}
