import { useEffect, useState } from "react";
import axios from "axios";

export const UserDetails = () => {
    const [ userDetails, setUserDetails ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    async function getDetails() {
        try {
            const res = await axios.get(import.meta.env.VITE_BE_API  + "/api/v1/user/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setUserDetails(res.data);
        } catch(e) {
            console.log(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        getDetails();
    }, []);


    return {
        loading,
        userDetails
    }
}