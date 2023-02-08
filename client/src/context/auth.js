import { useState, createContext, useContext, useEffect } from "react";
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    })

    // axios config
    axios.defaults.baseURL = process.env.REACT_APP_API // se usa siempre localhost:8080/api
    axios.defaults.headers.common['Authorization'] = auth?.token // se guarda en Authorization el token del usuario logeado 


    useEffect(() => {
        const data = localStorage.getItem("auth")
        if (data) {
            const parsed = JSON.parse(data)
            setAuth({...auth, user: parsed.user, token: parsed.token})
        }
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }