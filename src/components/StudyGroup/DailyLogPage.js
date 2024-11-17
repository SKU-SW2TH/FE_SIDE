import React from 'react';
import { useSelectedChannel } from '../../SelectedChannelContext'; // Context import
import Sidebar from './Sidebar';
import DailyLog from './DailyLog';
import '../../styles/DailyLogPage.css';

function DailyLogPage() {
    const { selectedChannel } = useSelectedChannel(); // 전역 상태에서 selectedChannel 가져오기

    return (
        <div className="dailyLogPage">
            <main className="dailyLog-main">
                <Sidebar /> {/* 채널 선택 핸들러는 필요 없음 */}
                <DailyLog></DailyLog>
            </main>    
        </div>
    );
}
  
export default DailyLogPage;
