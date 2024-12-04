'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IAuthContext{
    credential: string
    setCredential: Dispatch<SetStateAction<string>>,
}

const AuthContext = createContext<IAuthContext>({
    credential: '',
    setCredential: () => {}
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {
    const [credential, setCredential] = useState('');

    useEffect(() => {
        const cred = document.cookie.split("; ").find((row) => row.startsWith("credential="))?.split("=")[1];
        if(cred){
            setCredential(cred)
        }else{
            setCredential('')
        }
    }, [])

    return(
        <AuthContext.Provider value={{ credential, setCredential}}>
          {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider