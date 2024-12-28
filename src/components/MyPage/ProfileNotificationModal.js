// components/NotificationModal.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 화면 위에 표시되도록 설정 */
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #58c079;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a066;
  }
`;

function NotificationModal({ content, onClose }) {
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();  // 모달 닫기 상태 업데이트
      };

    return(
        <ModalBackground onClick={handleClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <p>{content}</p>
                <Button onClick={handleClose}>확인</Button>
            </ModalContainer>
        </ModalBackground>
    );
}

export default NotificationModal;
