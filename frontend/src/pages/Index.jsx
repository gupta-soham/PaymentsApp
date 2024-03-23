import { Navigate } from "react-router-dom"
import TerminalLoader from "../components/TerminalLoader";
import { UserDetails } from "../components/UserDetails";
import { useEffect, useState } from "react";

export const Index = () => {
    const user = UserDetails();
    const [delay, setDelay] = useState(true);

    // Adding a delay
    useEffect(() => {
        const timer = setTimeout(() => {
        setDelay(false); 
        }, 3000);
        return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    }, []);

    if (delay) {
        return <TerminalLoader />;
    }

    if(user.loading) {
        return <TerminalLoader />;
    }

    if(!user.userDetails) {
        return <Navigate to={"/signin"} />
    }    

    return <Navigate to={"/dashboard"} />
}

