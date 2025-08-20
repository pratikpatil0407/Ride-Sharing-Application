import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }, []);

    const sendMessage = (event, payload) => {
        socket.emit(event, payload);
    };

    const receiveMessage = (event, callback) => {
        socket.on(event, callback);
    };

    return (
        <SocketContext.Provider value={{ socket, sendMessage, receiveMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
