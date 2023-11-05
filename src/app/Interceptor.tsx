'use client'

import { useEffect, useState } from "react"


export const Interceptor = () => {

    const [isWidthOkay, setIsWidthOkay] = useState(true)

    useEffect(() => {
        const handleEvent = (ev: any) => {
            setIsWidthOkay(window.innerWidth < 650)
        }
        handleEvent(window.innerWidth)
        window.addEventListener('resize', handleEvent)
        return () => window.removeEventListener('resize', handleEvent)
    }, [])


    if(isWidthOkay){
        return null
    }


    return (
        <div className='z-50 text-center h-screen w-screen fixed top-0 bg-white'>

            <div className="font-bold mt-3 text-md">diversify-ai</div>
            <div className="mt-5"></div>
            <div className='max-w-xl mx-auto font-medium text-transparent text-md bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>
                Thanks for visiting our web app! For best viewing experience, please access it on a <span className='font-extrabold'>mobile</span> or <span className='font-extrabold'> smaller device</span>.
            </div>
            {/* <img src='/sorry.png' className='max-w-xs mt-6 mx-auto' /> */}
        </div>
    )
}
