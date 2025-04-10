import React, { createContext, useState, useEffect } from "react";
import axios from "../config/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/users/me')
                .then((response) => {
                    setUser(response.data.user);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Token validation failed:', error.response?.data);
                    localStorage.removeItem('token');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};