import React from 'react';
import { useSelectedChannel } from '../../SelectedChannelContext'; // Context import
import Sidebar from './Sidebar';
import CalendarComponent from './CalendarComponent';
import '../../styles/Calendar.css';

function Calendar() {
    const { selectedChannel } = useSelectedChannel(); // 전역 상태에서 selectedChannel 가져오기

    return (
        <div className="Calendar">
            
            <main className="Calendar-main">
                <Sidebar /> {/* 채널 선택 핸들러는 필요 없음 */}
                <CalendarComponent></CalendarComponent>
            </main>    
        </div>
    );
}
  
export default Calendar;
