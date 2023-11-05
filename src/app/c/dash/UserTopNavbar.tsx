import { jwtUserPayloadType } from '@/app/utils/SetAuthTokenAsCookie';




export const UserTopNavbar = ({ user }: { user: jwtUserPayloadType; }) => {
    return (
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
                <p style={{
                    color: "var(--grey-60, #95969D)",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "150%",
                    letterSpacing: "-0.14px"
                }}>
                    Welcome back!
                </p>
                <p style={{
                    color: "var(--Black, #0D0D26)",
                    marginTop: "5px",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "120%",
                    letterSpacing: "-0.33px"
                }}>
                    {`${user.fName} ${user.lName}`} 👋
                </p>
            </div>
            <div>
                <img className='rounded-full w-10' src={user.profilePicUrl} alt="avatar" />
            </div>
        </div>
    );
};
