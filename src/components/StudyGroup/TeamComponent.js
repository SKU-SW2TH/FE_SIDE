import React, { useState, useEffect, useRef } from 'react';
import { useSelectedChannel } from '../../SelectedChannelContext';
import { FaStar, FaUser, FaUsersCog, FaUsers, FaPlusCircle, FaTimes, FaEllipsisV } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip'; // Tooltip 추가
import '../../styles/TeamComponent.css';

const Button = ({ icon, text, onClick }) => {
    return (
        <div className="button" onClick={onClick}>
            <span className="button-icon">{icon}</span>
            <span className="button-text">{text}</span>
        </div>
    );
};

const TeamInviteModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('pending');
    const [pendingInvites, setPendingInvites] = useState(['홍길동', '김갑똥']);
    const [newMember, setNewMember] = useState('');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleCancelInvite = (user) => {
        setPendingInvites(pendingInvites.filter(invite => invite !== user));
    };

    const handleInvite = () => {
        if (newMember) {
            setPendingInvites([...pendingInvites, newMember]);
            setNewMember('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}><FaTimes /></button>
                <div className="tab-buttons">
                    <button onClick={() => handleTabChange('pending')} className={activeTab === 'pending' ? 'active' : ''}>초대 대기</button>
                    <button onClick={() => handleTabChange('invite')} className={activeTab === 'invite' ? 'active' : ''}>팀원 초대</button>
                </div>
                {activeTab === 'pending' ? (
                    <div className="pending-invites">
                        {pendingInvites.length > 0 ? (
                            pendingInvites.map((user, index) => (
                                <div key={index} className="pending-invite-item">
                                    <span>{user}</span>
                                    <button onClick={() => handleCancelInvite(user)}>취소</button>
                                </div>
                            ))
                        ) : (
                            <p>대기 중인 초대가 없습니다.</p>
                        )}
                    </div>
                ) : (
                    <div className="invite-member">
                        <input
                            type="text"
                            value={newMember}
                            onChange={(e) => setNewMember(e.target.value)}
                            placeholder="닉네임 입력"
                        />
                        <button onClick={handleInvite}>초대</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const NicknameChangeModal = ({ isOpen, onClose, onChangeNickname }) => {
    const [newNickname, setNewNickname] = useState('');

    const handleSubmit = () => {
        if (newNickname) {
            onChangeNickname(newNickname);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}><FaTimes /></button>
                <h2>닉네임 변경</h2>
                <div className="changeNickname">
                    <input
                        type="text"
                        value={newNickname}
                        onChange={(e) => setNewNickname(e.target.value)}
                        placeholder="새 닉네임 입력"
                    />
                    <button onClick={handleSubmit}>변경</button>
                </div>
            </div>
        </div>
    );
};

const LeaveChannelModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}><FaTimes /></button>
                <h2>방 나가기</h2>
                <p>정말로 나가시겠습니까?</p>
                <button onClick={onConfirm}>확인</button>
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
};

const TeamMemberCard = ({ member, onKick, onRoleChange, onChangeNickname }) => {
    const { name, role, profileImage } = member;
    let roleIcon;

    // 역할에 따른 아이콘 설정
    if (role === '리더') {
        roleIcon = <FaStar />;
    } else if (role === '운영진') {
        roleIcon = <FaUsersCog />;
    } else {
        roleIcon = <FaUser />;
    }

    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const handleMenuClick = (e) => {
        e.stopPropagation(); // 부모 요소의 클릭 이벤트 방지
        setShowMenu(!showMenu);
    };

    const handleNicknameChange = () => {
        onChangeNickname(); // 닉네임 변경 모달 열기
        setShowMenu(false); // 메뉴 닫기
    };

    const handleOutsideClick = (e) => {
        // 메뉴가 열려있고, 클릭된 요소가 메뉴가 아닐 경우 메뉴를 닫음
        if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        // 클릭 이벤트 리스너 추가
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            // 컴포넌트 언마운트 시 리스너 제거
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showMenu]);

    return (
        <div className="team-member-card">
            <div className="avatar" style={{ backgroundImage: `url(${profileImage})` }}></div>
            <div className="role-icon" data-tooltip={role}>
                {roleIcon}
            </div>
            <h4>{name}</h4>
            <div className="member-actions">
                {name === '홍길동' && (
                    <div className="self-menu">
                        <FaEllipsisV onClick={handleMenuClick} />
                        {showMenu && (
                            <div className="context-menu" ref={menuRef}>
                                <button onClick={handleNicknameChange}>닉네임 변경</button>
                            </div>
                        )}
                    </div>
                )}

                {/* 리더인 경우 버튼을 숨김 */}
                {role !== '리더' && (
                    <div className="action-buttons">
                        <button onClick={onRoleChange} className="role-button">
                            {role === '운영진' ? '강등' : '승급'}
                        </button>
                        <button onClick={onKick} className="kick-button">추방</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const TeamComponent = () => {
    const { selectedChannel } = useSelectedChannel();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [nickname, setNickname] = useState('홍길동');
    const [teamMembers, setTeamMembers] = useState([
        { name: '홍길동', role: '리더', profileImage: 'url_to_image1' },
        { name: '김갑똥', role: '운영진', profileImage: 'url_to_image2' },
        { name: '이순신', role: '운영진', profileImage: 'url_to_image3' },
        { name: '강감찬', role: '팀원', profileImage: 'url_to_image4' },
    ]);

    // 현재 필터 상태 관리
    const [filter, setFilter] = useState('all'); // 'all', 'leaders', 'members'

    const handleKickMember = (name) => {
        setTeamMembers(teamMembers.filter(member => member.name !== name));
    };

    const handleRoleChange = (name) => {
        setTeamMembers((prevMembers) =>
            prevMembers.map((member) =>
                member.name === name
                    ? {
                          ...member,
                          role: member.role === '운영진' ? '팀원' : '운영진',
                      }
                    : member
            )
        );
    };

    const handleChangeNickname = (newNickname) => {
        setNickname(newNickname);
        setTeamMembers((prevMembers) => 
            prevMembers.map((member) =>
                member.name === '홍길동' ? { ...member, name: newNickname } : member
            )
        );
    };

    const handleLeaveChannel = () => {
        setIsLeaveModalOpen(true);
    };

    const handleConfirmLeave = () => {
        alert('방을 나갑니다!');
        setIsLeaveModalOpen(false);
        // 추가적인 방 나가기 로직을 여기에 추가할 수 있습니다.
    };

    // 팀원 필터링
    const filteredMembers = teamMembers.filter(member => {
        if (filter === 'leaders') {
            return member.role === '리더' || member.role === '운영진';
        } else if (filter === 'members') {
            return member.role === '팀원';
        }
        return true; // 'all'일 경우 모든 팀원 표시
    });

    return (
        <div className="TeamComponent">
            <div className="TeamComponent-header">
                <div>
                    <h2>SW 프로젝트팀</h2>
                    <h3>{selectedChannel}</h3>
                </div>
            </div>
            <div className="button-container">
                <Button icon={<FaStar />} text="운영진" onClick={() => setFilter('leaders')} />
                <Button icon={<FaUser />} text="스터디원" onClick={() => setFilter('members')} />
                <Button icon={<FaUsers />} text="모두 보기" onClick={() => setFilter('all')} />
                <Button icon={<FaPlusCircle />} text="팀원 초대" onClick={() => setIsModalOpen(true)} />
            </div>
            <div className="team-members-container">
                {filteredMembers.map((member, index) => (
                    <TeamMemberCard 
                        key={index} 
                        member={member} 
                        onKick={() => handleKickMember(member.name)} 
                        onRoleChange={() => handleRoleChange(member.name)}
                        onChangeNickname={() => setIsNicknameModalOpen(true)} // 닉네임 변경 모달 열기
                    />
                ))}
            </div>
            <TeamInviteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <NicknameChangeModal 
                isOpen={isNicknameModalOpen} 
                onClose={() => setIsNicknameModalOpen(false)} 
                onChangeNickname={handleChangeNickname} 
            />
            <LeaveChannelModal 
                isOpen={isLeaveModalOpen} 
                onClose={() => setIsLeaveModalOpen(false)} 
                onConfirm={handleConfirmLeave} 
            />
            <button className="leave-button" onClick={handleLeaveChannel}>방 나가기</button>
        </div>
    );
};

export default TeamComponent;
