import React, { useState } from 'react';
import styled from "styled-components";
import MyPageSideNav from "./MyPageSideNav"; 
import InterestCategory from './InterestCategory'; 
import SelectedInterest from './SelectedInterest'; // SelectedInterest import

const PageContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 7fr;
    gap: 100px;
`;

const MainTitle = styled.p`
    margin: 30px 0;
    font-weight: bold;
    font-size: 20px;
`;

const SubTitleContainer = styled.div`
    display: flex;
    align-items: flex-start; /* 정렬을 상단으로 설정 */
    margin-top: 80px; /* 간격 추가 */
`;

const SubTitleContainer01 = styled.div`
    display: flex;
    align-items: flex-start; /* 정렬을 상단으로 설정 */
    margin-top: 20px; /* 간격 추가 */
`;

const SubTitle = styled.p`
    margin-right: 10px;
    font-weight: 500;
    font-size: 17px;
    margin-bottom: 3px; /* 아래쪽 마진 추가 */
`;

const Divider01 = styled.hr`
    width: 1150px; /* hr의 너비 설정 */
    margin-top: 8px; /* hr 태그의 위쪽 마진 추가 */
    border: 0.5px solid #ccc; /* hr의 테두리 스타일 추가 (필요시 조정) */
`;

const Divider02 = styled.hr`
    width: 1179px; /* hr의 너비 설정 */
    margin-top: 8px; /* hr 태그의 위쪽 마진 추가 */
    border: 0.5px solid #ccc; /* hr의 테두리 스타일 추가 (필요시 조정) */
`;

const FloatingAddButton = styled.button`
    background-color: #58c079;
    color: white;
    border: none; /* 기본 경계 없앰 */
    border-radius: 50px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;

    &:hover {
        background-color: #50b06e; 
    }

    &:focus {
        outline: none; /* 포커스 시 테두리 없앰 */
    }
`;


const AddCategoryButton = styled.div`
    margin-top: 200px;
    margin-left: 1500px;
`;

function Interest() {
    const [selectedItems, setSelectedItems] = useState({
        프론트: [],
        백엔드: [],
        프로그래밍언어: [],
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCategorySelection = (category, items) => {
        setSelectedItems((prevState) => ({
            ...prevState,
            [category]: items,
        }));
    };

    const handleRemoveInterest = (interest) => {
        setSelectedItems((prevState) => {
            const updatedItems = { ...prevState };
            Object.keys(updatedItems).forEach((key) => {
                updatedItems[key] = updatedItems[key].filter(item => item !== interest);
            });
            return updatedItems;
        });
    };

    return (
        <div>
            <PageContainer>
                <MyPageSideNav />
                <div>
                    <MainTitle>관심분야</MainTitle>
                    <SubTitleContainer01>
                        <SubTitle>프로그래밍 언어</SubTitle>
                        <Divider01 />
                    </SubTitleContainer01>
                    <SelectedInterest 
                        selectedInterests={selectedItems.프로그래밍언어} 
                        onRemoveInterest={handleRemoveInterest} 
                    />
                    <SubTitleContainer>
                        <SubTitle>프론트엔드 개발</SubTitle>
                        <Divider01 />
                    </SubTitleContainer>
                    <SelectedInterest 
                        selectedInterests={selectedItems.프론트} 
                        onRemoveInterest={handleRemoveInterest} 
                    />
                    <SubTitleContainer>
                        <SubTitle>백엔드 개발</SubTitle>
                        <Divider02 />
                    </SubTitleContainer>
                    <SelectedInterest 
                        selectedInterests={selectedItems.백엔드} 
                        onRemoveInterest={handleRemoveInterest} 
                    />
                </div>
            </PageContainer>
            <AddCategoryButton>
                <InterestCategory
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSelectionChange={handleCategorySelection} 
                />
                <FloatingAddButton onClick={openModal}>추가하기</FloatingAddButton>
            </AddCategoryButton>
        </div>
    );
}

export default Interest;
