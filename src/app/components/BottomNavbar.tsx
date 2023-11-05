"use client"

import Link from "next/link";
import { Menu } from "@headlessui/react";
import { logOutUserHandler } from "@/app/logoutbtn";
import { usePathname, useRouter } from "next/navigation";
import { CANDIDATE_DASH, CANDIDATE_APPLIED_JOBS, INTERVIEW_PREP } from "../routes-config";
import { jwtUserPayloadType } from "../utils/SetAuthTokenAsCookie";







const UserIcon = ({ active }: { active?: boolean }) => {
    const color = active ? '#2563eb' : 'black'

    return (
        <svg width={28} height={30} viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M14 12C15.5913 12 17.1174 11.3679 18.2426 10.2426C19.3679 9.11742 20 7.5913 20 6C20 4.4087 19.3679 2.88258 18.2426 1.75736C17.1174 0.632141 15.5913 0 14 0C12.4087 0 10.8826 0.632141 9.75736 1.75736C8.63214 2.88258 8 4.4087 8 6C8 7.5913 8.63214 9.11742 9.75736 10.2426C10.8826 11.3679 12.4087 12 14 12ZM0 30C-2.73959e-08 28.1615 0.362121 26.341 1.06569 24.6424C1.76925 22.9439 2.80048 21.4005 4.1005 20.1005C5.40053 18.8005 6.94387 17.7693 8.64243 17.0657C10.341 16.3621 12.1615 16 14 16C15.8385 16 17.659 16.3621 19.3576 17.0657C21.0561 17.7693 22.5995 18.8005 23.8995 20.1005C25.1995 21.4005 26.2307 22.9439 26.9343 24.6424C27.6379 26.341 28 28.1615 28 30H0Z" fill={color} />
        </svg>

    )
}

const MessageIcon = ({ active }: { active?: boolean }) => {
    const color = active ? '#2563eb' : 'black'

    return (
        <svg width={33} height={32} viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M32.6667 4V20C32.6667 21.0609 32.2453 22.0783 31.4952 22.8284C30.745 23.5786 29.7276 24 28.6667 24H18.6667L8.66675 32V24H4.66675C3.60588 24 2.58847 23.5786 1.83832 22.8284C1.08818 22.0783 0.666748 21.0609 0.666748 20V4C0.666748 2.93913 1.08818 1.92172 1.83832 1.17157C2.58847 0.421427 3.60588 0 4.66675 0H28.6667C29.7276 0 30.745 0.421427 31.4952 1.17157C32.2453 1.92172 32.6667 2.93913 32.6667 4ZM10.6667 10H6.66675V14H10.6667V10ZM14.6667 10H18.6667V14H14.6667V10ZM26.6667 10H22.6667V14H26.6667V10Z" fill={color} />
        </svg>

    )
}

const LightBulb = ({ active }: { active?: boolean }) => {
    const color = active ? '#2563eb' : 'black'

    return (
        <svg width={33} height={32} viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3334 2C18.3334 1.46957 18.1227 0.960859 17.7476 0.585786C17.3725 0.210714 16.8638 0 16.3334 0C15.8029 0 15.2942 0.210714 14.9192 0.585786C14.5441 0.960859 14.3334 1.46957 14.3334 2V4C14.3334 4.53043 14.5441 5.03914 14.9192 5.41421C15.2942 5.78929 15.8029 6 16.3334 6C16.8638 6 17.3725 5.78929 17.7476 5.41421C18.1227 5.03914 18.3334 4.53043 18.3334 4V2ZM27.6474 7.514C28.0117 7.1368 28.2133 6.63159 28.2087 6.1072C28.2042 5.5828 27.9938 5.08118 27.623 4.71036C27.2522 4.33955 26.7506 4.12921 26.2262 4.12465C25.7018 4.1201 25.1966 4.32168 24.8194 4.686L23.4054 6.1C23.0411 6.4772 22.8395 6.98241 22.844 7.5068C22.8486 8.0312 23.0589 8.53282 23.4297 8.90364C23.8006 9.27445 24.3022 9.48479 24.8266 9.48935C25.351 9.49391 25.8562 9.29232 26.2334 8.928L27.6474 7.514ZM32.3334 16C32.3334 16.5304 32.1227 17.0391 31.7476 17.4142C31.3725 17.7893 30.8638 18 30.3334 18H28.3334C27.8029 18 27.2942 17.7893 26.9192 17.4142C26.5441 17.0391 26.3334 16.5304 26.3334 16C26.3334 15.4696 26.5441 14.9609 26.9192 14.5858C27.2942 14.2107 27.8029 14 28.3334 14H30.3334C30.8638 14 31.3725 14.2107 31.7476 14.5858C32.1227 14.9609 32.3334 15.4696 32.3334 16ZM6.43337 8.928C6.61787 9.11902 6.83856 9.27138 7.08257 9.3762C7.32657 9.48102 7.58901 9.53619 7.85457 9.5385C8.12013 9.54081 8.38349 9.49021 8.62928 9.38964C8.87507 9.28908 9.09838 9.14058 9.28616 8.95279C9.47395 8.76501 9.62246 8.5417 9.72302 8.29591C9.82358 8.05012 9.87418 7.78676 9.87187 7.5212C9.86957 7.25564 9.81439 6.9932 9.70958 6.74919C9.60476 6.50518 9.45239 6.28449 9.26137 6.1L7.84737 4.686C7.47017 4.32168 6.96497 4.1201 6.44057 4.12465C5.91618 4.12921 5.41455 4.33955 5.04374 4.71036C4.67292 5.08118 4.46258 5.5828 4.45803 6.1072C4.45347 6.63159 4.65506 7.1368 5.01937 7.514L6.43337 8.928ZM6.33337 16C6.33337 16.5304 6.12266 17.0391 5.74759 17.4142C5.37251 17.7893 4.86381 18 4.33337 18H2.33337C1.80294 18 1.29423 17.7893 0.91916 17.4142C0.544088 17.0391 0.333374 16.5304 0.333374 16C0.333374 15.4696 0.544088 14.9609 0.91916 14.5858C1.29423 14.2107 1.80294 14 2.33337 14H4.33337C4.86381 14 5.37251 14.2107 5.74759 14.5858C6.12266 14.9609 6.33337 15.4696 6.33337 16ZM12.3334 28V26H20.3334V28C20.3334 29.0609 19.9119 30.0783 19.1618 30.8284C18.4117 31.5786 17.3942 32 16.3334 32C15.2725 32 14.2551 31.5786 13.5049 30.8284C12.7548 30.0783 12.3334 29.0609 12.3334 28ZM20.3334 24C20.3634 23.32 20.7494 22.708 21.2874 22.282C22.5927 21.2525 23.545 19.8419 24.0117 18.2463C24.4784 16.6507 24.4364 14.9493 23.8916 13.3787C23.3467 11.808 22.3261 10.4461 20.9716 9.48223C19.617 8.51837 17.9958 8.00045 16.3334 8.00045C14.6709 8.00045 13.0497 8.51837 11.6952 9.48223C10.3406 10.4461 9.32002 11.808 8.77519 13.3787C8.23035 14.9493 8.18838 16.6507 8.65509 18.2463C9.1218 19.8419 10.074 21.2525 11.3794 22.282C11.9194 22.708 12.3034 23.32 12.3314 24H20.3354H20.3334Z" fill={color} />
        </svg>

    )
}

const HomeBulb = ({ active }: { active?: boolean }) => {
    const color = active ? '#2563eb' : 'black'
    return (
        <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.414 0.586C17.0389 0.211058 16.5303 0.000427246 16 0.000427246C15.4696 0.000427246 14.961 0.211058 14.586 0.586L0.58596 14.586C0.221644 14.9632 0.0200549 15.4684 0.0246117 15.9928C0.0291686 16.5172 0.239506 17.0188 0.610323 17.3896C0.981139 17.7605 1.48276 17.9708 2.00716 17.9753C2.53155 17.9799 3.03676 17.7783 3.41396 17.414L3.99996 16.828V30C3.99996 30.5304 4.21067 31.0391 4.58575 31.4142C4.96082 31.7893 5.46953 32 5.99996 32H9.99996C10.5304 32 11.0391 31.7893 11.4142 31.4142C11.7892 31.0391 12 30.5304 12 30V26C12 25.4696 12.2107 24.9609 12.5857 24.5858C12.9608 24.2107 13.4695 24 14 24H18C18.5304 24 19.0391 24.2107 19.4142 24.5858C19.7892 24.9609 20 25.4696 20 26V30C20 30.5304 20.2107 31.0391 20.5857 31.4142C20.9608 31.7893 21.4695 32 22 32H26C26.5304 32 27.0391 31.7893 27.4142 31.4142C27.7892 31.0391 28 30.5304 28 30V16.828L28.586 17.414C28.9632 17.7783 29.4684 17.9799 29.9928 17.9753C30.5172 17.9708 31.0188 17.7605 31.3896 17.3896C31.7604 17.0188 31.9708 16.5172 31.9753 15.9928C31.9799 15.4684 31.7783 14.9632 31.414 14.586L17.414 0.586Z" fill={color} />
        </svg>

    )
}

export const LogoutBulb = ({ active }: { active?: boolean }) => {
    const color = active ? '#2563eb' : 'black'


    return (
        <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" width="96.000000pt" height="96.000000pt" viewBox="0 0 96.000000 96.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
                <path d="M386 870 c-63 -16 -153 -70 -197 -117 -22 -24 -55 -74 -72 -111 -29
-61 -32 -76 -32 -163 0 -90 2 -99 37 -171 45 -91 103 -147 196 -191 61 -29 76
-32 162 -32 86 0 101 3 162 32 93 44 151 100 196 191 35 72 37 81 37 172 0 91
-2 100 -37 172 -68 136 -188 217 -336 224 -42 2 -94 -1 -116 -6z m395 -317
c32 -31 59 -64 59 -73 0 -17 -111 -130 -127 -130 -19 0 -33 25 -33 57 l0 33
-140 0 -140 0 0 40 0 40 140 0 140 0 0 33 c0 32 14 57 33 57 5 0 35 -25 68
-57z" />
            </g>
        </svg>

    )
}

export const ListIcon = ({ active }: { active?: boolean }) => {
    const color = active ? '#2563eb' : 'black'

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={19}
            viewBox="0 0 24 19"
            className="w-10 h-10"
            fill="none"
        >
            <path
                d="M1.94595 7.6C0.869189 7.6 0 8.44867 0 9.5C0 10.5513 0.869189 11.4 1.94595 11.4C3.0227 11.4 3.89189 10.5513 3.89189 9.5C3.89189 8.44867 3.0227 7.6 1.94595 7.6ZM1.94595 0C0.869189 0 0 0.848667 0 1.9C0 2.95133 0.869189 3.8 1.94595 3.8C3.0227 3.8 3.89189 2.95133 3.89189 1.9C3.89189 0.848667 3.0227 0 1.94595 0ZM1.94595 15.2C0.869189 15.2 0 16.0613 0 17.1C0 18.1387 0.882162 19 1.94595 19C3.00973 19 3.89189 18.1387 3.89189 17.1C3.89189 16.0613 3.0227 15.2 1.94595 15.2ZM5.83784 18.3667H24V15.8333H5.83784V18.3667ZM5.83784 10.7667H24V8.23333H5.83784V10.7667ZM5.83784 0.633333V3.16667H24V0.633333H5.83784Z"
                fill={color}
            />
        </svg>

    )
}

export const BottomNavbar = ({ user }: { user: jwtUserPayloadType | null }) => {
    const pathname = usePathname()

    if (!user) return;

    return (
        <div className="border-t pt-3 border-black bg-gradient-to-r bg-white p-0.5 shadow-xl fixed bottom-0 pb-3 flex justify-around w-full">

            {!user?.isRecruiter && <>
                <Link href={CANDIDATE_DASH} className="flex justify-center items-center">
                    <HomeBulb active={pathname === CANDIDATE_DASH} />
                </Link>

                <Link href={CANDIDATE_APPLIED_JOBS} className="flex justify-center items-center">
                    <ListIcon active={pathname === CANDIDATE_APPLIED_JOBS} />
                </Link>

                {/* <Link href={INTERVIEW_PREP} className="flex justify-center items-center">
                    <MessageIcon active={pathname === INTERVIEW_PREP} />
                </Link> */}
            </>}

            {/* TODO */}
            {/* {user?.isRecruiter && <>
                <Link href={RECRUITER_DASH} className="flex justify-center items-center">
                    <HomeBulb active={pathname === RECRUITER_DASH} />
                </Link>

                <Link href={RECRUITER_VIEW_ALL_JOBS} className="flex justify-center items-center">
                    <LightBulb active={pathname === RECRUITER_VIEW_ALL_JOBS} />
                </Link>
            </>} */}

            <button className="flex justify-center items-center" onClick={() => confirm('are you sure to logout?') ? logOutUserHandler() : null}>
                <LogoutBulb />
            </button>
        </div>
    )
}
