'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { RedirectToAPageWithToast } from "./RedirectToAPageWithToast"

export const AuthRedirectToLandingPageWithToast = () => <RedirectToAPageWithToast route='/' text='Please login' />
