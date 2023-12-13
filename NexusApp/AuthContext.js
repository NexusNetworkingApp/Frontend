import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './util/URL';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return AsyncStorage.getItem('isLoggedIn').then(value => value === 'true');
    });
    const [account, setAccount] = useState(null);

    const login = async (accountType, email, password) => {
        try {
            const response = await axios.get(`${API_URL}/account/login-${accountType}/${email}/${password}`);
            const loginSuccessful = response.data;

            if (loginSuccessful) {
                setIsLoggedIn(true);
                // Save to AsyncStorage
                AsyncStorage.setItem('isLoggedIn', 'true');

                // Fetch account information and save it
                const accountResponse = await axios.get(`${API_URL}/account/info/${accountType}/${email}`);
                const accountData = accountResponse.data;
                setAccount(accountData);
                AsyncStorage.setItem('account', JSON.stringify(accountData));
                console.log('Account Data:', accountData);
            } else {
                console.log('Login failed');
            }

            return loginSuccessful;
        } catch (error) {
            console.error('Login failed:', error.message);
            return false;
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setAccount(null);
        // Remove from AsyncStorage
        AsyncStorage.removeItem('isLoggedIn');
        AsyncStorage.removeItem('account');
        // Consider using navigation to redirect to the home screen in a real app
        // Example: navigation.navigate('Home');
    };

    useEffect(() => {
        console.log('isLoggedIn in useEffect:', isLoggedIn);
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, account }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
