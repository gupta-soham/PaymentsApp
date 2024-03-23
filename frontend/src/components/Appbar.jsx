import { Button } from "./Button";
import { UserDetails } from "./UserDetails";
import { Navigate, useNavigate } from 'react-router-dom'

export const Appbar = () => {
    const navigate = useNavigate();

    const user = UserDetails();
    if(user.loading) {
        return ;
    }

    if(!user.userDetails) {
        return <Navigate to={"/signin"} />
    }    

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            Payments App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {/* User First Name 👇 */}
                Hello, {user.userDetails.user.firstName}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {/* Profile Picture 👇 */}
                    {user.userDetails.user.firstName[0].toUpperCase()} 
                </div>
            </div>
            <div className="flex justify-center mt-1 mr-2">
                <Button label={"Logout"}
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/signin");
                }} />
            </div>
        </div>
    </div>
}