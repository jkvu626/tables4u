'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IAuthContext{
    credential: string
    setCredential: Dispatch<SetStateAction<string>>,
    loading: boolean
}

const AuthContext = createContext<IAuthContext>({
    credential: '',
    setCredential: () => {},
    loading: true
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {
    const [credential, setCredential] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const cred = document.cookie.split("; ").find((row) => row.startsWith("credential="))?.split("=")[1];
        if(cred){
            setCredential(cred)
        }else{
            setCredential('')
        }
        setLoading(false)
    }, [])

    return(
        <AuthContext.Provider value={{ credential, setCredential, loading}}>
          {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider