import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트
import '../../styles/NoticeList.css'; // 스타일을 위한 CSS 파일을 임포트합니다.

function NoticeList({ selectedChannel }) {  // selectedChannel prop 추가

  const notices = [
    {
      title: '*스터디방 종합 공지사항',
      content: '안녕하세요, 스터디 팀 여러분! 다음과 같은 공지 사항을 전달드립니다:\n1. 스터디 일정 안내...',
      date: '7월 12일 오후 6:49',
      author: '황정욱',
      comments: 5,
    },
    {
      title: '*스터디방 규칙 재공지',
      content: '안녕하세요, 스터디 팀 여러분! 다음과 같은 공지 사항을 전달드립니다:\n1. 스터디 재공지 안내...',
      date: '7월 12일 오후 6:49',
      author: '황정욱',
      comments: 15,
    },
    {
      title: '*스터디방 과제 제출 양식',
      content: '안녕하세요, 스터디 팀 여러분! 다음과 같은 공지 사항을 전달드립니다:\n1. 스터디 양식 안내...',
      date: '7월 12일 오후 6:49',
      author: '황정욱',
      comments: 5,
    },
    {
      title: '*스터디방 출석 공지사항',
      content: '안녕하세요, 스터디 팀 여러분! 다음과 같은 공지 사항을 전달드립니다:\n1. 스터디 출석 안내...',
      date: '7월 12일 오후 6:49',
      author: '황정욱',
      comments: 5,
    },
  ];

  return (
    <div className="notice-window">
      <div className="notice-header">
          <div>
              <h2>SW 프로젝트팀</h2>
              <h3>{selectedChannel}</h3>  {/* 선택된 채널 표시 */}
          </div>
      </div>
      <div className="notice-container">
        {notices.map((notice) => (
          <Link 
            to={`/StudyGroup/NoticeDetails`}
            key={notice.id} 
            style={{ textDecoration: 'none', color: 'inherit' }} // 인라인 스타일 적용
          >
            <div className="notice-item">
              <h2>{notice.title}</h2>
              <p>{notice.content}</p>
              <p className="notice-meta">
                작성자: {notice.author} | 댓글: {notice.comments}개
              </p>
              <p className="notice-date">{notice.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NoticeList;
