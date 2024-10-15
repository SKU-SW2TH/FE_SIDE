// SelectedChannelContext.js
import React, { createContext, useContext, useState } from 'react';

// Context 생성
const SelectedChannelContext = createContext();

// Provider 컴포넌트 생성
export const SelectedChannelProvider = ({ children }) => {
    const [selectedChannel, setSelectedChannel] = useState('# 전체');

    return (
        <SelectedChannelContext.Provider value={{ selectedChannel, setSelectedChannel }}>
            {children}
        </SelectedChannelContext.Provider>
    );
};

// Context 사용을 위한 커스텀 훅
export const useSelectedChannel = () => {
    return useContext(SelectedChannelContext);
};
