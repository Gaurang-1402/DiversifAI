'use client'

import { toast } from "react-toastify"
import { LOGOUT_API } from "./routes-config"


export const logOutUserHandler = async () => {
    try {
        const res = await fetch(LOGOUT_API)
        if (res.status !==200) throw new Error('Something went wrong')
        else {
            toast.success('Logged out', {autoClose: 200})
            setTimeout(() => {
                window.location.href = '/'
            }, 1000)
        }
    } catch (e: any) {
        toast.error(e.message)
    }
}
