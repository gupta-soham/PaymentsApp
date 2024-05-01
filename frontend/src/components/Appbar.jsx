import Github from "./Github";
import { UserDetails } from "./UserDetails";
import { Navigate, useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();

    const user = UserDetails();
  if (user.loading) {
    return;
  }

    if(!user.userDetails) {
        return <Navigate to={"/signin"} />
    }    

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            Payments App
        </div>
        <div className="flex gap-4">
          <Github />
            <div className="flex flex-col justify-center h-full">
                {/* User First Name 👇 */}
                Hello, {user.userDetails.user.firstName}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1">
                <div className="flex flex-col justify-center h-full text-xl">
                    {/* Profile Picture 👇 */}
                    {user.userDetails.user.firstName[0].toUpperCase()} 
                </div>
            </div>
            <div className="flex justify-center mt-1">
          <button
            className="w-full bg-gray-200 hover:border hover:text-red-600 hover:border-red-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
}