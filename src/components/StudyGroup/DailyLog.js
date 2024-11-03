import React, { useState } from 'react';
import { useSelectedChannel } from '../../SelectedChannelContext';
import '../../styles/DailyLog.css'; // 스타일을 위한 CSS 파일

const DailyLog = () => {
  const { selectedChannel } = useSelectedChannel();
  const [logs, setLogs] = useState({});
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    const seoulDate = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // 한국 표준시에 맞춘 현재 시간 설정
    return seoulDate;
  });
  const [title, setTitle] = useState('');  
  const [content, setContent] = useState('');  
  const [selectedLog, setSelectedLog] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const changeDate = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + direction);
      return newDate;
    });
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setCurrentDate(selectedDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateString = currentDate.toISOString().split('T')[0];
    if (dateString && title && content) {
      const newLog = { title, content };
      setLogs((prevLogs) => ({
        ...prevLogs,
        [dateString]: [...(prevLogs[dateString] || []), newLog],
      }));
      setTitle('');  
      setContent('');
      setIsModalOpen(false);
    }
  };

  const handleCardClick = (log) => {
    setSelectedLog(log);
  };

  const closeModal = () => {
    setSelectedLog(null);
  };

  const getPreviewTitle = (title) => {
    const maxLength = 10;  
    return title.length > maxLength ? title.substring(0, maxLength) + '..' : title;
  };

  const getPreviewContent = (content) => {
    const maxLength = 50;  
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <div className="dailyLog">
      <div className="dailyLog-header">
        <div>
          <h2>SW 프로젝트팀</h2>
          <h3>{selectedChannel}</h3>
        </div>
      </div>
      <div className="daily-log-container">
        <div className="date-navigation">
          <button onClick={() => changeDate(-1)}>◀</button>
          <input 
            name="date"
            type="date" 
            value={currentDate.toISOString().split('T')[0]}
            onChange={handleDateChange} 
          />
          <button onClick={() => changeDate(1)}>▶</button>
        </div>

        <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>로그 남기기</button>

        <div className="log-card-container">
          {Object.entries(logs)
            .filter(([date]) => date === currentDate.toISOString().split('T')[0])
            .flatMap(([date, logsByDate]) => 
              logsByDate.map((log, index) => (
                <div className="log-card" key={`${date}-${index}`} onClick={() => handleCardClick(log)}>
                  <strong>{getPreviewTitle(log.title)}</strong>
                  <p>{getPreviewContent(log.content)}</p>
                </div>
              ))
            )}
        </div>

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
