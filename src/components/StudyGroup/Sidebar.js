// Sidebar.js
import React, { useState } from 'react';
import '../../styles/Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelectedChannel, useToggle } from '../../SelectedChannelContext'; // Context import

const Sidebar = () => {
    const { selectedChannel, setSelectedChannel } = useSelectedChannel(); // 전역 상태에서 selectedChannel 가져오기
    const { isOpen, setIsOpen } = useToggle(); // 전역 토글 상태
    const navigate = useNavigate();

    const toggleSubMenu = () => {
        setIsOpen(!isOpen); // 토글 상태 변경
    };

    const handleChannelSelect = (channel, path) => {
        setSelectedChannel(channel); // 선택된 채널 업데이트
        if (path) {
            navigate(path); // 페이지 이동
        }
    };
    
    const handleItemClick = (item, path) => {
        setSelectedChannel(item); // 선택된 아이템 업데이트
        navigate(path); // 페이지 이동
    };

    return (
        <div className="sidebar">
            <h2>SW 프로젝트팀</h2>
            <ul>
                <li onClick={() => handleItemClick('일정', '/StudyGroup/Calendar')}>일정</li>
                <li onClick={() => handleItemClick('공지사항', '/StudyGroup/Notice')}>공지사항</li>
                <li onClick={() => handleItemClick('데일리 로그', '/StudyGroup/DailyLog')}>데일리 로그</li>
                <li onClick={() => handleItemClick('팀원')}>팀원</li>
                <li onClick={() => handleItemClick('채팅방 설정')}>채팅방 설정</li>
                <li onClick={toggleSubMenu} className="submenu-toggle">
                    채널 {isOpen ? '▲' : '▼'}
                </li>
                {isOpen && (
                    <ul className="submenu">
                        <li onClick={() => handleChannelSelect('# 전체', '/StudyGroup/Chat')} className={selectedChannel === '# 전체' ? 'active' : ''}># 전체</li>
                        <li onClick={() => handleChannelSelect('# 김성현')} className={selectedChannel === '# 김성현' ? 'active' : ''}># 김성현</li>
                        <li onClick={() => handleChannelSelect('# 황장욱')} className={selectedChannel === '# 황장욱' ? 'active' : ''}># 황장욱</li>
                        <li onClick={() => handleChannelSelect('# 회의')} className={selectedChannel === '# 회의' ? 'active' : ''}># 회의</li>
                        <li onClick={() => handleChannelSelect('# 백엔드')} className={selectedChannel === '# 백엔드' ? 'active' : ''}># 백엔드</li>
                        <li onClick={() => handleChannelSelect('# 프론트엔드')} className={selectedChannel === '# 프론트엔드' ? 'active' : ''}># 프론트엔드</li>
                        <li onClick={() => handleChannelSelect('# 인프라')} className={selectedChannel === '# 인프라' ? 'active' : ''}># 인프라</li>
                    </ul>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
