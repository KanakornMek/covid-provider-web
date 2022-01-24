import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../components/firebase'
import axios from 'axios'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    async function login(username, password) {
        return axios.post('https://us-central1-nsc-covidapp.cloudfunctions.net/createHospitalToken', {
            username: username,
            password: password
        }).then(async (token) => {
            console.log(token)
            try {
                return await auth.signInWithCustomToken(token.data)
            } catch (error) {
                var errorCode = error.code
                var errorMessage = error.message
                if (errorCode === 'auth/invalid-custom-token') {
                    alert('The token you provided is not valid.')
                } else {
                    console.error(error)
                }
            }
        }).catch((err) => {
            alert(err.response.data)
        })
    }

    function logout() {
        auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user)
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
