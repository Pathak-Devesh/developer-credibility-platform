import { createContext, useEffect, useState } from "react";
import { getProfile } from "../api/profileApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreUser = async () => {
            const storedToken = localStorage.getItem("token");

            if (!storedToken) {
                setLoading(false);
                return;
            }

            setToken(storedToken);

            try {
                const response = await getProfile();

                setUser(response.data);
            } catch (error) {
                console.error(error);

                localStorage.removeItem("token");

                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
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
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}