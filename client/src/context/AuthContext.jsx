import { createContext, useEffect, useState } from "react";
import { getProfile } from "../api/profileApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const restoreUser = async () => {
            const storedToken = localStorage.getItem("token");

            if (!storedToken) return;

            setToken(storedToken);

            try {
                const response = await getProfile();

                setUser(response.data);

            } catch (error) {
                console.error(error);

                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            }
        };

        restoreUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}