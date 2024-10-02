'use client'
import { loadUserRequest } from "@/http/apiCalls";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext();


const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(undefined);
    const [loading, setLoading] = useState(false);



    async function getUser() {
        try {
            setLoading(true);
            const {data} = await loadUserRequest();
            setIsAuth(true);
            setUser(data);
        } catch (error) {
            console.log(error.message)
            setIsAuth(false);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    },[])

    return(
        <UserContext.Provider value={{user,setUser,isAuth,setIsAuth,getUser,loading}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;