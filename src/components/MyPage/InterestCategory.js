import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

function InterestCategory({ isOpen, onClose, onSelectionChange, initialSelectedItems }) {
  const [secondCategory, setSecondCategory] = useState('프론트');
  const [thirdCategories, setThirdCategories] = useState([]);
  const [thirdCategoryOptions, setThirdCategoryOptions] = useState({
    프론트: [],
    백엔드: [],
    '프로그래밍 언어': []
  });

  useEffect(() => {
    if (isOpen && initialSelectedItems) {
      setThirdCategories(initialSelectedItems);
    }
  }, [isOpen, initialSelectedItems]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/interestList'
        );

        // 2차 카테고리 찾기
        const secondLevelCategories = response.data.filter(item => item.level === 2);
        
        // thirdCategoryOptions 구성
        const options = {};
        secondLevelCategories.forEach(secondCat => {
          const categoryName = secondCat.areaName;
          const thirdLevelItems = response.data
            .filter(item => item.parentId === secondCat.id)
            .map(item => ({
              id: item.id,
              name: item.areaName
            }));
          
          options[categoryName] = thirdLevelItems;
        });

        setThirdCategoryOptions(options);
      } catch (error) {
        console.error('카테고리 데이터 로딩 실패:', error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, initialSelectedItems]);

  const handleSecondCategoryChange = (e) => {
    const newCategory = e.target.value;
    console.log('선택된 2차 카테고리:', newCategory);
    setSecondCategory(newCategory);
  };

  // ... existing code ...

  const handleThirdCategoryChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setThirdCategories((prevCategories) => {
      if (prevCategories.includes(selectedId)) {
        // 이미 선택된 항목이면 제거
        return prevCategories.filter((id) => id !== selectedId);
      } else {
        // 선택되지 않은 항목이면 추가
        return [...prevCategories, selectedId];
      }
    });
  };

  // 체크박스 렌더링 부분 수정
  {thirdCategoryOptions[secondCategory]?.map((option) => (
    <CheckboxButton key={option.id}>
      <input
        type="checkbox"
        name="thirdCategory"
        value={option.id}
        checked={thirdCategories.includes(option.id)}
        onChange={handleThirdCategoryChange}
      />
      {option.name}
    </CheckboxButton>
  ))}

  const resetState = () => {
    setSecondCategory('프론트');
    setThirdCategories([]);
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


  const handleSave = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.put(
        `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/update/interest`,
        {
          "ids": thirdCategories
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );
      onClose();
      if(response.status === 200) {
        console.log("관심분야 업데이트 완료" + response.status);
        console.log("response.data: ", response.data);
        console.log("secondCategory: " + secondCategory);
        console.log("thirdCategories: " + thirdCategories);
        window.location.reload();
      }
    } catch (error) {
      console.error("관심분야 업데이트 실패" + error.response.status);
    }
  };

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
                value="프로그래밍 언어"
                checked={secondCategory === '프로그래밍 언어'}
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
            {thirdCategoryOptions[secondCategory]?.map((option) => (
              <CheckboxButton key={option.id}>
                <input
                  type="checkbox"
                  name="thirdCategory"
                  value={option.id}
                  checked={thirdCategories.includes(option.id)}
                  onChange={handleThirdCategoryChange}
                />
                {option.name}
              </CheckboxButton>
            ))}
          </CategoryOption>
        </CategorySection>
        <ButtonContainer>
          <ModalButton onClick={async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
              const response = await axios.put(
                `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/member/update/interest`,
                {
                  "ids": [] // 빈 배열 전송
                },
                {
                  headers: {
                    'Authorization': `Bearer ${accessToken}`,
                  }
                }
              );
              if(response.status === 200) {
                setThirdCategories([]);
                console.log("관심분야 전체 삭제 완료");
              }
            } catch (error) {
              console.error("관심분야 삭제 실패", error);
            }
          }}>초기화</ModalButton>
          <ModalButton onClick={handleCancel}>취소</ModalButton>
          <ModalButton onClick={handleSave}>저장</ModalButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

export default InterestCategory;
