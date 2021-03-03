import React, { createContext, useState } from 'react'



let AuthContext = createContext({});
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null || localStorage.getItem("user"))
    const login = ({ email, password }) => {

        let users = {
            email: email,
            password: password,
        }
        console.log(users)
        setUser(users)
        console.log(user)
       
    }
    
    const logout = () => {
        setUser(null)
        localStorage.removeItem("user");
    }


    return <AuthContext.Provider value={{ user, login, logout }} > {children} </AuthContext.Provider>
}

const useAuth = () => React.useContext(AuthContext)


export { AuthProvider, AuthContext , useAuth }