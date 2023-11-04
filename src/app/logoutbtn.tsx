'use client'

import { toast } from "react-toastify"
import { LOGOUT_API } from "./routes-config"


export const logOutUserHandler = async () => {
    try {
        document.cookie = 'cocoAPI=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        toast.success('Logged out')
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    } catch (e: any) {
        toast.error(e.message)
    }
}
