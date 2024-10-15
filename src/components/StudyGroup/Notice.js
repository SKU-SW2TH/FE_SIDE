import React, { useState } from 'react';
import { useSelectedChannel } from '../../SelectedChannelContext';
import Sidebar from './Sidebar';
import NoticeList from './NoticeList';
import '../../styles/Notice.css';

function Notice() {
    const { selectedChannel } = useSelectedChannel();

    return (
        <div className="Notice">
            
            <main className="Notice-main">
                <Sidebar /> {/* 채널 선택 핸들러 전달 */}
                <NoticeList selectedChannel={selectedChannel}></NoticeList>
            </main>   
        </div>
    );
}
  
export default Notice;
