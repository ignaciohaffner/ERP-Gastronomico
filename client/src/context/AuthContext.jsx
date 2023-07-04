import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest, changePasswordRequest } from '../api/auth.js'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data)
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setRole(res.data.role)
            setIsAuthenticated(true)
            setUser(res.data)

        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            } else
                setErrors([error.response.data.message])

        }
    }

    const changePassword = async (id, user) => {
        try {
            const res = await changePasswordRequest(id, user)
            console.log("que pasa aca")
        } catch (error) {
            console.log(error, 'update user')
        }
    }

    const logout = () => {
        Cookies.remove('token')
        setIsAuthenticated(false)
        setUser(null)
        setRole(null)
    }

    useEffect(() => {
        if (errors.length > 0) {
            setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                setRole(null)
                return setUser(null)
            }
            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    setRole(null)
                    return
                }
                setRole(res.data.role)
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setRole(null)
                setLoading(false)
            }


        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{ signup, user, isAuthenticated, errors, signin, loading, logout, role, changePassword }}>
            {children}
        </AuthContext.Provider>
    )
}