import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

function AuthProvider(props) {
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState(null); // Changed to null for better type checking
    const [user, setUser] = useState(null); // Changed to null for better type checking
    const [booking, setBooking] = useState(null);

    const readUser = async () => {
        if (!token) return; // Ensure there's a token before proceeding
        try {
            const res = await axios.get(`api/auth/verify/userToken`, {
                headers: {
                    Authorization: token,
                },
            });
            setUser(res.data.user);
            await getBookingData(res.data.user._id); 
            setIsLogin(true); 
            toast.success("User verified successfully");
        } catch (err) {
            toast.error(err.response?.data?.msg || "User verification failed");
        }
    };

    const getBookingData = async (id) => {
        try {
            const res = await axios.get(`/api/booking/room/user/${id}`);
            setBooking(res.data.booking);
        } catch (err) {
            toast.error(err.response?.data?.msg || "Failed to fetch booking data");
        }
    };

    useEffect(() => {
        readUser(); 
    }, [token]);

    const logoutHandler = async () => {
        if (window.confirm(`Are you sure to logout?`)) {
            try {
                const res = await axios.get(`/api/auth/logout`);
                toast.success(res.data.msg);
                setIsLogin(false);
                setToken(null);
                setUser(null);
                setBooking(null); // Clear booking data on logout
                window.location.reload(); // Reload the page to reflect changes
            } catch (err) {
                toast.error(err.response?.data?.msg || "Logout failed");
            }
        }
    };

    return (
        <AuthContext.Provider value={{ isLogin, user, setIsLogin, setUser, token, setToken, logoutHandler, booking }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
