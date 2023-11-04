import { cookies } from "next/headers";
import { getJwtPayloadFromCookie, jwtUserPayloadType } from "./SetAuthTokenAsCookie";


export const getUser = (): jwtUserPayloadType | null => {
    const myCookie = cookies().get("cocoAPI")?.value;
    return getJwtPayloadFromCookie(myCookie)
}
