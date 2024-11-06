import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  width: 500px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`;

const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const CategorySection = styled.div`
  margin-bottom: 20px;
`;

const CategoryLabel = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: bold;
`;

const CategoryOption = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioButton = styled.label`
  display: block;
  margin-bottom: 8px;
  cursor: pointer;
  input {
    margin-right: 10px;
    accent-color: #58c079; // Change the accent color for radio button
  }
`;

const CheckboxButton = styled.label`
  display: block;
  margin-bottom: 8px;
  cursor: pointer;
  input {
    margin-right: 10px;
    accent-color: #58c079; // Change the accent color for checkbox
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  background-color: #58c079;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #50b06e;
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

function InterestCategory({ isOpen, onClose, onSelectionChange }) {
  const [secondCategory, setSecondCategory] = useState('프론트');
  const [thirdCategories, setThirdCategories] = useState([]);

  const handleSecondCategoryChange = (e) => {
    setSecondCategory(e.target.value);
    setThirdCategories([]); // Reset third categories when changing second category
  };

  const handleThirdCategoryChange = (e) => {
    const value = e.target.value;
    setThirdCategories((prevCategories) => {
      if (prevCategories.includes(value)) {
        return prevCategories.filter((category) => category !== value);
      } else {
        return [...prevCategories, value].slice(0, 10); // Limit to 10 selections
      }
    });
  };

  const resetState = () => {
    setSecondCategory('프론트');
    setThirdCategories([]);
  };

  const handleSave = () => {
    onSelectionChange(secondCategory, thirdCategories);
    onClose();
  };

  const thirdCategoryOptions = {
    프론트: ['React', 'Angular', 'Vue.js', 'Svelte', 'jQuery', 'Backbone.js', 'Preact', 'Ember.js'],
    백엔드: ['Node.js', 'Spring', 'SpringBoot', 'Django', 'Flask', 'Laravel', 'Ruby on Rails', 'CakePHP'],
    프로그래밍언어: ['Java', 'Python', 'C', 'C++', 'Ruby', 'JavaScript', 'Go', 'PHP', 'Kotlin', 'Swift'],
  };

  const handleCancel = () => {
    resetState();
    onClose();
  };

  // Key event handling
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCancel();
      } else if (event.key === 'Enter') {
        handleSave();
      }
    };

    // Attach event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [secondCategory, thirdCategories]); // Add dependencies as needed

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <Header>관심분야 선택</Header>
        <CategorySection>
          <CategoryLabel>1차 분류</CategoryLabel>
          <CategoryOption>
            <RadioButton>
              <input type="radio" name="firstCategory" checked readOnly />
              개발/프로그래밍
            </RadioButton>
          </CategoryOption>
        </CategorySection>
        <CategorySection>
          <CategoryLabel>2차 분류</CategoryLabel>
          <CategoryOption>
            <RadioButton>
              <input
                type="radio"
                name="secondCategory"
                value="프로그래밍언어"
                checked={secondCategory === '프로그래밍언어'}
                onChange={handleSecondCategoryChange}
              />
              프로그래밍언어
            </RadioButton>
            <RadioButton>
              <input
                type="radio"
                name="secondCategory"
                value="프론트"
                checked={secondCategory === '프론트'}
                onChange={handleSecondCategoryChange}
              />
              프론트
            </RadioButton>
            <RadioButton>
              <input
                type="radio"
                name="secondCategory"
                value="백엔드"
                checked={secondCategory === '백엔드'}
                onChange={handleSecondCategoryChange}
              />
              백엔드
            </RadioButton>
          </CategoryOption>
        </CategorySection>
        <CategorySection>
          <CategoryLabel>3차 분류</CategoryLabel>
          <CategoryOption>
            {thirdCategoryOptions[secondCategory].map((option) => (
              <CheckboxButton key={option}>
                <input
                  type="checkbox"
                  name="thirdCategory"
                  value={option}
                  checked={thirdCategories.includes(option)}
                  onChange={handleThirdCategoryChange}
                />
                {option}
              </CheckboxButton>
            ))}
          </CategoryOption>
        </CategorySection>
        <ButtonContainer>
          <ModalButton onClick={handleCancel}>취소</ModalButton>
          <ModalButton onClick={handleSave}>저장</ModalButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

export default InterestCategory;
