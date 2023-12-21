import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './util/URL';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import MMKVStorage from 'react-native-mmkv-storage';

const AuthContext = createContext();
const mmkv = new MMKVStorage.Loader().initialize();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return mmkv.getBool('isLoggedIn');
    });
    const [account, setAccount] = useState(null);

    const login = async (accountType, email, password) => {
        try {
            const response = await axios.get(`${API_URL}/account/login-${accountType}/${email}/${password}`);
            const loginSuccessful = response.data;

            if (loginSuccessful) {
                setIsLoggedIn(true);
                console.log(isLoggedIn);

                // Save to MMKVStorage
                mmkv.setBool('isLoggedIn', true);

                // Fetch account information and save it
                const accountResponse = await axios.get(`${API_URL}/account/info/${accountType.toUpperCase()}/${email}`);
                const accountData = accountResponse.data;
                setAccount(accountData);
                mmkv.setMap('account', accountData); // Assuming accountData is an object
                console.log(mmkv.getMap('account'))
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

        // Remove from MMKVStorage
        mmkv.removeItem('isLoggedIn');
        mmkv.removeItem('account');
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
