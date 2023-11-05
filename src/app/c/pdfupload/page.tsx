import { UserTopNavbar } from "../dash/UserTopNavbar";
import { AuthRedirectToLandingPageWithToast } from "../../components/AuthRedirectToLandingPageWithToast";
import { getUser } from "../../utils/GetUser";
import PdfUploadClient from "./PdfUploadClient";

export default function PdfUpload() {

    const user = getUser()

    if (!user) {
        return <AuthRedirectToLandingPageWithToast />
    }



    return (
        <div className="px-4 mt-4">
            <UserTopNavbar user={user} />
            <PdfUploadClient />
        </div>

    )
}
