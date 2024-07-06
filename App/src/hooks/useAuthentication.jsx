import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes('Password')) {
                systemErrorMessage = 'A senha precisa conter pelo menos 6 caracters.';
            } else if (error.message.includes('email-already')) {
                systemErrorMessage = 'E-mail já cadastrado.';
            } else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.';
            }

            setLoading(false)
            setError(systemErrorMessage)

        }

    }
    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    }
    const login = async (data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)
            let systemErrorMessage;

            if (error.message.includes("auth/invalid-credential")) {
                systemErrorMessage = 'Email ou senha incorretos';
            }
            else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
            }

            setError(systemErrorMessage);
            setLoading(false);
        }
    }
    const GoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            await signInWithPopup(auth, provider);


        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        GoogleLogin,
        error,
        loading,
        logout,
        login
    };
}