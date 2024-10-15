import React, { useState } from 'react'; // useState 추가
import '../../styles/ChatWindow.css'; // 채팅 창 관련 CSS

function ChatWindow({ selectedChannel }) {  // selectedChannel prop 추가
    const [messages, setMessages] = useState([
        {
            author: '김성현',
            time: '2024년 9월 25일',
            text: '먼저 다 풀으신 분들은 각자 공부하시면 될 것 같습니다',
            edited: true
        },
        {
            author: '정승기',
            time: '2024년 9월 25일',
            text: 'OOO',
            edited: false
        }
    ]);

    const [inputValue, setInputValue] = useState('');

    // 메시지 전송 함수
    const handleSendMessage = (e) => {
        e.preventDefault(); // 기본 동작(페이지 리프레시) 방지
        if (inputValue.trim()) { // 입력 값이 비어있지 않은 경우
            const newMessage = {
                author: '사용자', // 실제 사용자 이름으로 변경할 수 있음
                time: new Date().toLocaleString(), // 현재 시간으로 설정
                text: inputValue,
                edited: false
            };
            setMessages([...messages, newMessage]); // 새로운 메시지를 추가
            setInputValue(''); // 입력 필드 초기화
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div>
                    <h2>SW 프로젝트팀</h2>
                    <h3>{selectedChannel}</h3>  {/* 선택된 채널 표시 */}
                </div>
            </div>
            <div className="chat-messages-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div className="message" key={index}>
                            <div className="message-info">
                                <span className="message-author">{message.author}</span>
                                <span className="message-time">{message.time}</span>
                                {message.edited && <span className="message-edited">수정됨</span>}
                            </div>
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <form onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            placeholder={`${selectedChannel}에 메시지 보내기`}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit">전송</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;
