import React from 'react';
import { useSelectedChannel } from '../../SelectedChannelContext';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트
import '../../styles/NoticeDetail.css'; // 스타일을 위한 CSS 파일을 임포트합니다.

const Notice = () => {
    const { selectedChannel } = useSelectedChannel();

    return (
        <div className="Notice">
            <div className="chat-header">
                <div>
                    <h2>SW 프로젝트팀</h2>
                    <h3>{selectedChannel}</h3>  {/* 선택된 채널 표시 */}
                </div>
            </div>
            <div className="notice-container">
                <h2>*스터디방 종합 공지사항</h2>
                <p>📢 스터디팀 공지사항</p>
                <p>안녕하세요, 스터디 팀원 여러분! 다음과 같은 공지 사항을 전달드립니다.</p>

                <h3>1. 스터디 일정</h3>
                <ul>
                    <li>일시: 2024년 10월 1일 (화) 오후 7시</li>
                    <li>장소: 스터디 3호 회의실</li>
                    <li>참석 대상: 모든 스터디 팀원</li>
                </ul>

                <h3>2. 과제 제출</h3>
                <p>다음 스터디 전까지 3일 전까지 제출해 주세요.</p>
                <p>마감일: 2024년 10월 1일 (화) 11시 59분까지</p>

                <h3>3. 기타 사항</h3>
                <p>모든 스터디 전까지 준비사항 확인 부탁드립니다.</p>
                <p>스터디 자료는 스터디 팀원들과 공유됩니다.</p>

                <h3>4. 기타 문의</h3>
                <p>스터디 관련 문의 사항이 있으면 언제든지 스터디에 연락해 주세요.</p>

                <p>스터디에 참여해 주셔서 감사합니다! 😊</p>

                <Link to="/StudyGroup/Notice" style={{ textDecoration: 'none', color: '#007bff' }}>
                    <p>🔙 목록으로 돌아가기</p>
                </Link>
            </div>
        </div>
    );
};

export default Notice;
