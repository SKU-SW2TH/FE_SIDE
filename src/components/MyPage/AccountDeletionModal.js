import React, { useState, useEffect, useRef } from "react";
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
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  outline: none; /* 모달 외곽선 없애기 */
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  cursor: pointer;
  border-radius:10px;
  margin-top: 20px;
  border: 1px solid black;
  background-color: white;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 10px;
  width: calc(100% - 40px); /* 버튼과 동일한 패딩 고려 */
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ccc')}; /* 오류 발생 시 테두리 색상 변경 */
  border-radius: 4px; /* 모서리 둥글게 */
  outline: none; /* 포커스 시 외곽선 없애기 */
  
  &:focus {
    border-color: ${({ hasError }) => (hasError ? 'red' : '#58c079')}; /* 포커스 시 테두리 색상 변경 */
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-left: 22px;
  margin-top:3px;
  text-align: left;
`;

const ButtonContainer = styled.div`
  margin-top: 20px; /* 버튼 위쪽 여백 */
  display: flex;
  justify-content: center; /* 버튼 사이 간격 균등 배분 */
  gap: 40px;
`;


function AccountDeletionModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 추가
  const [hasError, setHasError] = useState(false); // 오류 상태 추가
  const modalRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
    setStep(1);
    setErrorMessage(''); // 모달 열 때 오류 메시지 초기화
    setHasError(false); // 오류 상태 초기화
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPassword('');
    setErrorMessage(''); // 모달 닫을 때 오류 메시지 초기화
    setHasError(false); // 오류 상태 초기화
  };

  const handleYesClick = () => {
    setStep(2);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage(''); // 비밀번호 변경 시 오류 메시지 초기화
    setHasError(false); // 비밀번호 입력 시 오류 상태 초기화
  };

  const handleConfirmClick = () => {
    if (password === 'jong631012@') { // 비밀번호 확인
      setStep(3);
      setHasError(false); // 오류 상태 초기화
    } else {
      setErrorMessage('✗ 비밀번호가 올바르지 않습니다.'); // 오류 메시지 설정
      setHasError(true); // 오류 상태 설정
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      if (step === 1) {
        handleYesClick(); // 첫 번째 단계에서 '예' 클릭
      } else if (step === 2) {
        handleConfirmClick(); // 두 번째 단계에서 '확인' 클릭
      } else if (step === 3) {
        closeModal(); // 세 번째 단계에서 모달 닫기
      }
    } else if (e.key === 'Escape') {
      closeModal(); // Esc 키를 눌러서 모달 닫기
    }
  };

  // 모달이 열릴 때 포커스를 모달에 이동
  useEffect(() => {
    if (isModalOpen) {
      modalRef.current.focus();
    }
  }, [isModalOpen, step]); // step도 의존성에 추가

  return (
    <div>
      <Button onClick={openModal}>탈퇴하기</Button>
      {isModalOpen && (
        <ModalBackground>
          <ModalContainer 
            ref={modalRef} 
            tabIndex={0} 
            onKeyUp={handleKeyUp}
          >
            {step === 1 && (
              <>
                <p>정말 탈퇴하시겠습니까?</p>
                <ButtonContainer>
                  <Button onClick={handleYesClick}>예</Button>
                  <Button onClick={closeModal}>아니요</Button>
                </ButtonContainer>
              </>
            )}
            {step === 2 && (
              <>
                <p>현재 비밀번호를 입력해주세요</p>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyUp={handleKeyUp} // Enter와 Esc 키 이벤트 추가
                  hasError={hasError} // 오류 상태 전달
                />
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} {/* 오류 메시지 표시 */}
                <ButtonContainer>
                  <Button onClick={closeModal}>취소</Button>
                  <Button onClick={handleConfirmClick}>확인</Button>
                </ButtonContainer>
              </>
            )}
            {step === 3 && (
              <>
                <p>탈퇴 완료 되었습니다. 이용해 주셔서 감사합니다.</p>
                <Button onClick={closeModal}>확인</Button>
              </>
            )}
          </ModalContainer>
        </ModalBackground>
      )}
    </div>
  );
}

export default AccountDeletionModal;
