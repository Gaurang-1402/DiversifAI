import { RESUME_UPLOAD } from '@/app/routes-config'
import Link from 'next/link'

export default function Selector() {
  return (
      <div>
          <div className='px-8 mt-10 flex flex-col max-w-xs'>
          <h1 className="text-[#8000FF] font-bold text-4xl">Diversif<span className="text-[#18C7D2]">AI</span></h1>
          <h2 className="text-gray-500 font-medium text-2xl mt-2">What describes you?</h2>
          </div>
          <img src="/selector-graphic.png" alt="apply" className="absolute top-[42%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 h-72 w-72 "/>

          <div className="absolute bottom-[120px] left-1/2 transform -translate-x-1/2">
            <Link href={RESUME_UPLOAD}>
            <button className="flex items-center justify-center w-64 rounded-[12px] bg-[#8000FF] mt-4 border-4 border-[#8000FF] py-2">
                <p className="text-white font-medium text-lg">Applying to jobs</p>
            </button>
            </Link>
            <button className="flex items-center justify-center w-64 rounded-[12px] bg-[#8000FF] mt-5 border-4 border-[#8000FF] py-2">
                <p className="text-white font-medium text-lg">Looking for candidates</p>
            </button>
          </div>

      </div>

    )
}
