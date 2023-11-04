import { getUser } from '@/app/utils/GetUser';
import { AuthRedirectToLandingPageWithToast } from '@/app/components/AuthRedirectToLandingPageWithToast';
import { BottomNavbar } from '@/app/components/BottomNavbar';

export default function CandidateJobsAll() {
    const user = getUser();

    if (!user) {
        return <AuthRedirectToLandingPageWithToast />;
    }

    // You no longer need to handle the file upload on the client side
    // The form submission will trigger the API route

    return (
        <div>
            Upload Resume
            <form action="/api/upload" method="post" encType="multipart/form-data">
                <input type="file" name="resume" required />
                <button type="submit">Submit</button>
            </form>
            <BottomNavbar user={user} />
        </div>
    );
}
