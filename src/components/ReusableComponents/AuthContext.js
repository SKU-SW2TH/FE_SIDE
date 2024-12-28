import React, { createContext, useState, useContext } from 'react';

// Context 생성
const AuthContext = createContext();

// Context Provider 컴포넌트
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // 기본값을 true로 설정

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

// Context Consumer 훅
export const useAuth = () => useContext(AuthContext);
