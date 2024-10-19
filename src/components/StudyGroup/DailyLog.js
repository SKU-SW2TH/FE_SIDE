import React, { useState } from 'react';
import { useSelectedChannel } from '../../SelectedChannelContext';
import '../../styles/DailyLog.css'; // 스타일을 위한 CSS 파일

const DailyLog = () => {
  const { selectedChannel } = useSelectedChannel();
  const [logs, setLogs] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date('2024-09-25')); // 초기 날짜 설정
  const [title, setTitle] = useState('');  // 로그 제목
  const [content, setContent] = useState('');  // 로그 내용
  const [selectedLog, setSelectedLog] = useState(null); // 선택된 로그 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  // 날짜 변경 함수
  const changeDate = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + direction); // 하루씩 이동
      return newDate;
    });
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value); // Date 객체로 변환
    setCurrentDate(selectedDate);
  };

  // 로그 남기기 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    const dateString = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
    if (dateString && title && content) {
      const newLog = { title, content };
      setLogs((prevLogs) => ({
        ...prevLogs,
        [dateString]: [...(prevLogs[dateString] || []), newLog],
      }));
      setTitle('');  // 입력 필드 초기화
      setContent('');
      setIsModalOpen(false); // 로그 저장 후 모달 닫기
    }
  };

  // 로그 카드 클릭 처리 함수
  const handleCardClick = (log) => {
    setSelectedLog(log); // 클릭한 로그를 모달에 설정
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setSelectedLog(null); // 모달 닫기
  };

  // 로그 제목의 일부만 표시하는 함수 (미리보기)
  const getPreviewTitle = (title) => {
  const maxLength = 10;  // 제목 미리보기로 표시할 글자 수 제한
  return title.length > maxLength ? title.substring(0, maxLength) + '..' : title;
  };

  // 로그 내용의 일부만 표시하는 함수 (미리보기)
  const getPreviewContent = (content) => {
  const maxLength = 50;  // 미리보기로 표시할 글자 수 제한
  return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  

  return (
    <div className="dailyLog">
      <div className="dailyLog-header">
        <div>
          <h2>SW 프로젝트팀</h2>
          <h3>{selectedChannel}</h3>  {/* 선택된 채널 표시 */}
        </div>
      </div>
      <div className="daily-log-container">
        <div className="date-navigation">
          <button onClick={() => changeDate(-1)}>◀</button>
          <input 
            name="date"
            type="date" // datetime-local 대신 date 사용
            value={currentDate.toISOString().split('T')[0]} // YYYY-MM-DD 형식으로 변환
            onChange={handleDateChange} 
          />
          <button onClick={() => changeDate(1)}>▶</button>
        </div>

        <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>로그 남기기</button>

        <div className="log-card-container">
          {Object.entries(logs)
            .filter(([date]) => date === currentDate.toISOString().split('T')[0]) // 현재 선택된 날짜의 로그만 필터링
            .flatMap(([date, logsByDate]) => 
              logsByDate.map((log, index) => (
                <div className="log-card" key={`${date}-${index}`} onClick={() => handleCardClick(log)}>
                  <strong>{getPreviewTitle(log.title)}</strong> {/* 제목 미리보기로 제한 */}
                  <p>{getPreviewContent(log.content)}</p> {/* 내용 일부만 표시 */}
                </div>
              ))
            )}
        </div>

        {/* 로그 작성 모달 */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
              <h2>로그 작성</h2>
              <form onSubmit={handleSubmit} className="log-form">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="로그 제목"
                  required
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="로그 내용을 입력하세요"
                  required
                />
                <button type="submit">저장하기</button>
              </form>
            </div>
          </div>
        )}

        {/* 선택된 로그 보기 모달 */}
        {selectedLog && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>{selectedLog.title}</h2>
              <p>{selectedLog.content}</p>
            </div>
          </div>
        )}
        </div>
    </div>
  );
};

export default DailyLog;
