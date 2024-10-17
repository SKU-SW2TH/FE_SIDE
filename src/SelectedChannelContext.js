// SelectedChannelContext.js
import React, { createContext, useContext, useState } from 'react';

// Context 생성
const SelectedChannelContext = createContext();
const ToggleContext = createContext();

// Provider 컴포넌트 생성
export const SelectedChannelProvider = ({ children }) => {
    // selectedChannel 관리
    const [selectedChannel, setSelectedChannel] = useState('# 전체');

     // isOpen 관리
     const [isOpen, setIsOpen] = useState(false);

     return (
        <SelectedChannelContext.Provider value={{ selectedChannel, setSelectedChannel }}>
            <ToggleContext.Provider value={{ isOpen, setIsOpen }}>
                {children}
            </ToggleContext.Provider>
        </SelectedChannelContext.Provider>
    );
};

// Context 사용을 위한 커스텀 훅
export const useSelectedChannel = () => {
    return useContext(SelectedChannelContext);
};
export const useToggle = () => {
    return useContext(ToggleContext);
};