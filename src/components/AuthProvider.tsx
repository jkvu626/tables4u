'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IAuthContext{
    credential: string
    setCredential: Dispatch<SetStateAction<string>>,
    loading: boolean,
    admin: boolean,
    setAdmin: Dispatch<SetStateAction<boolean>>,
}

const AuthContext = createContext<IAuthContext>({
    credential: '',
    setCredential: () => {},
    loading: true,
    admin: false,
    setAdmin: () => {}
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {
    const [credential, setCredential] = useState('');
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        const cred = document.cookie.split("; ").find((row) => row.startsWith("credential="))?.split("=")[1];
        const ad = (document.cookie.split("; ").find((row) => row.startsWith("admin="))?.split("=")[1]) == "true";
        if(cred){
            setCredential(cred)
            setAdmin(ad)
        }else{
            setCredential('')
            setAdmin(false)
        }
        setLoading(false)
    }, [])

    return(
        <AuthContext.Provider value={{ credential, setCredential, loading, admin, setAdmin}}>
          {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider