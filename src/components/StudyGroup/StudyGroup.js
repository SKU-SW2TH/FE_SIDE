import React from 'react';
import { useSelectedChannel } from '../../SelectedChannelContext'; // Context import
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import '../../styles/StudyGroup.css';

function StudyGroup() {
    const { selectedChannel } = useSelectedChannel(); // 전역 상태에서 selectedChannel 가져오기

    return (
        <div className="StudyGroup">
            
            <main className="StudyGroup-main">
                <Sidebar /> {/* 채널 선택 핸들러는 필요 없음 */}
                <ChatWindow selectedChannel={selectedChannel} /> {/* 선택된 채널 전달 */}
            </main>    
        </div>
    );
}
  
export default StudyGroup;
