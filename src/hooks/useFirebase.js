import { useEffect, useState } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeAuthentication from "../Firebase/Firebase.init";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider);

        /* 
            signInWithPopup(auth, googleProvider)
                .then(result => {
                    console.log(result.user);
                }) 
        */
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({})
            })
    }
    // Observe whether user auth state changed or not
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
        return unsubscribe;
    }, [])

    return {
        user,
        signInUsingGoogle,
        logout,
    }
}

export default useFirebase;