import React from 'react';
import { useSelectedChannel } from '../../SelectedChannelContext'; // Context import
import Sidebar from './Sidebar';
import TeamComponent from './TeamComponent';
import '../../styles/Team.css';

function Team() {
    const { selectedChannel } = useSelectedChannel(); // 전역 상태에서 selectedChannel 가져오기

    return (
        <div className="Team">
            
            <main className="Team-main">
                <Sidebar /> {/* 채널 선택 핸들러는 필요 없음 */}
                <TeamComponent></TeamComponent>
            </main>    
        </div>
    );
}
  
export default Team;
