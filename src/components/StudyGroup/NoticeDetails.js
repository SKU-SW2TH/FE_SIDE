import React, { useState } from 'react';
import { useSelectedChannel } from '../../SelectedChannelContext';
import Sidebar from './Sidebar';
import NoticeDetail from './NoticeDetail';
import '../../styles/NoticeDetails.css';

function NoticeDetails() {
    const { selectedChannel } = useSelectedChannel();

    return (
        <div className="NoticeDetails">
            
            <main className="Notice-main">
                <Sidebar /> {/* 채널 선택 핸들러 전달 */}
                <NoticeDetail selectedChannel={selectedChannel}></NoticeDetail>
            </main>    
        </div>
    );
}
  
export default NoticeDetails;
