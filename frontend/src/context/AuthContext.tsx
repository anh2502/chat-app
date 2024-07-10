import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type AuthUserType = {
    id: string,
    fullName: string,
    email: string,
    profilePic: string,
    gender: string,
};
const AuthContext = createContext <{
    authUser: AuthUserType | null;
    setAuthUser: Dispatch<SetStateAction <AuthUserType | null>>;
    isLoading: boolean;
}>({
    authUser: null,
    setAuthUser: ()=>{},
    isLoading: true,
});

export const useAuthContext = () =>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}:{children: ReactNode}) =>{
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const fectchAuthUser = async () =>{
            try{
                const res = await fetch("/api/auth/me")
                const data = await res.json()
                if(!res.ok) {
                    throw new Error(data.message);
                }
            } catch(error){
                console.error(error)
            } finally{
                setIsLoading(false)
            }
        }
        fectchAuthUser()
    }, [])
    return (
        <AuthContext.Provider 
            value={{
                authUser,
                isLoading,
                setAuthUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}