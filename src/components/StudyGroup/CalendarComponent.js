import React, { useState } from 'react';
import '../../styles/CalendarComponent.css';

const App = () => {
  const today = new Date();
  const [events, setEvents] = useState([
    { id: 1, title: '1차 면접', start: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-04T10:00`, end: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-04T11:00`, color: '#FFDDC1', details: '세부내용 예시' },
    { id: 2, title: '미팅', start: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-10T10:00`, end: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-10T11:00`, color: '#FFABAB' },
    { id: 3, title: '미팅', start: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-16T11:00`, end: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-18T12:00`, color: '#FFC3A0' },
    { id: 4, title: '2차 면접', start: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-17T13:30`, end: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-18T14:30`, color: '#D5AAFF' },
    { id: 5, title: '디자인 회의', start: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-21T15:00`, end: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-21T16:00`, color: '#85E3FF' },
    { id: 6, title: '마케팅 회의', start: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-28T15:00`, end: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-28T16:00`, color: '#B9FBC0' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ title: '', start: '', end: '', details: '', color: '#FFFFFF' });
  const [showForm, setShowForm] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 현재 월 (0부터 시작)
  const [currentYear, setCurrentYear] = useState(today.getFullYear()); // 현재 년도

  const changeMonth = (direction) => {
    const newMonth = currentMonth + direction;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const changeYear = (direction) => {
    setCurrentYear(currentYear + direction);
  };

  const handleAddEvent = () => {
    setEvents([...events, { ...formData, id: Date.now() }]);
    setFormData({ title: '', start: '', end: '', details: '', color: '#FFFFFF' });
    setShowForm(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 해당 월의 마지막 날
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 해당 월의 첫 번째 날의 요일

  const renderEvent = (event, isFirstDay) => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    const startDay = eventStart.getDate();
    const endDay = eventEnd.getDate();
    const startColumn = startDay + firstDay; // 그리드에서의 시작 열
    const endColumn = endDay + firstDay + 1; // 그리드에서의 종료 열

    return (
      <div
        key={event.id}
        className="event"
        onClick={() => handleEventClick(event)}
        style={{
          gridColumn: `${startColumn} / ${endColumn}`, // 시작일과 종료일에 따라 설정
          backgroundColor: event.color, // 이벤트 색상
          gridRow: 'span 1',
        }}
      >
        {isFirstDay ? (
          <>
            <strong>{event.title}</strong>
            <br />
          </>
        ) : (
          <div style={{ visibility: 'hidden' }}>.</div> // 글자가 없지만 공간 차지
        )}
      </div>
    );
  };

  return (
    <div className="calendar">
      <h1>일정 관리 캘린더</h1>
      <div className="calendar-header">
        <button onClick={() => changeYear(-1)}>&lt;&lt;</button> {/* 이전 년도 */}
        <button onClick={() => changeMonth(-1)}>&lt;</button> {/* 이전 월 */}
        <h2>{`${currentYear}년 ${currentMonth + 1}월`}</h2>
        <button onClick={() => changeMonth(1)}>&gt;</button> {/* 다음 월 */}
        <button onClick={() => changeYear(1)}>&gt;&gt;</button> {/* 다음 년도 */}
      </div>
      <div className="calendar-date">
        <div className="calendar-weekday red">Sun</div>
        <div className="calendar-weekday">Mon</div>
        <div className="calendar-weekday">Tue</div>
        <div className="calendar-weekday">Wed</div>
        <div className="calendar-weekday">Thu</div>
        <div className="calendar-weekday">Fri</div>
        <div className="calendar-weekday">Sat</div>
      </div>
      <div className="calendar-grid">
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

          // 현재 날짜가 일요일인지 확인
          const isSunday = (firstDay + day - 1) % 7 === 0;

          // 필터링된 이벤트
          const filteredEvents = events.filter(event => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            return (eventStart.getFullYear() === currentYear && eventStart.getMonth() === currentMonth &&
              eventStart.getDate() <= day && eventEnd.getDate() >= day);
          });

          return (
            <div key={day} className={`calendar-day ${isSunday ? 'red' : ''}`}>
              <div className="day-number">{day}</div>
              {filteredEvents.map((event) => {
                const eventStart = new Date(event.start);
                return renderEvent(event, eventStart.getDate() === day);
              })}
            </div>
          );
        })}
        <button className="add-event" onClick={() => setShowForm(true)}>+</button>
      </div>

      {showForm && (
        <div className="modal"> {/* 모달로 감싸기 */}
          <div className="modal-scheduleadd">
            <span className="close" onClick={() => setShowForm(false)}>&times;</span>
            <h2>일정 추가</h2>
            <input name="title" placeholder="제목" value={formData.title} onChange={handleChange} />
            <input name="start" type="datetime-local" value={formData.start} onChange={handleChange} />
            <input name="end" type="datetime-local" value={formData.end} onChange={handleChange} />
            <input name="color" type="color" value={formData.color} onChange={handleChange} />
            <textarea name="details" placeholder="세부내용" value={formData.details} onChange={handleChange}></textarea>
            <div className="button-container">
              <button onClick={handleAddEvent}>일정 추가</button>
              <button onClick={() => setShowForm(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>{selectedEvent.title}</h2>
            <p>시작: {new Date(selectedEvent.start).toLocaleString()}</p>
            <p>종료: {new Date(selectedEvent.end).toLocaleString()}</p>
            <p>세부내용: {selectedEvent.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
