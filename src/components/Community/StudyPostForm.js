// FreePostForm.js
import React, { useState } from 'react';
import CommunityStudySideNav from './CommunityStudySideNav';
import '../../styles/FreePostForm.css';
import EditorComponent from './EditorComponent';
import axios from 'axios';
import CommunityCategoryModal from './CommunityCategoryModal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ErrorModal from './ErrorModal';

// 새로운 스타일 컴포넌트 추가
const InterestsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const InterestTag = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const InterestIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const InterestLabel = styled.span`
  margin-right: 8px;
`;

const RemoveButton = styled.span`
  color: #666;
  cursor: pointer;
  font-size: 18px;
  
  &:hover {
    color: black;
  }
`;

function QuestionPostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [interests, setInterests] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleEditorChange = (content, editor) => {
        setContent(content);
    };

    const handleImageUpload = (blobInfo) => {
        return new Promise((resolve, reject) => {
            try {
                const file = blobInfo.blob();
                const fileName = blobInfo.filename();
                
                // 파일 타입 검사
                if (!file.type.startsWith('image/')) {
                    reject('이미지 파일만 업로드 가능합니다.');
                    return;
                }

                // 이미지 파일 객체 생성
                const imageFile = new File([file], fileName, { type: file.type });
                
                // imageFiles 상태 업데이트
                setImageFiles(prev => [...prev, imageFile]);
                
                // 미리보기 URL 생성 및 반환
                const imageUrl = URL.createObjectURL(imageFile);
                resolve(imageUrl);
            } catch (error) {
                reject('이미지 업로드 중 오류가 발생했습니다.');
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 입력 검증
        if (!title.trim()) {
            setErrorMessage('제목을 입력해주세요.');
            return;
        }
        if (!content.trim()) {
            setErrorMessage('내용을 입력해주세요.');
            return;
        }
        if (interests.length === 0) {
            setErrorMessage('최소 1개 이상의 관심분야를 선택해주세요.');
            return;
        }

        const formData = new FormData();
        
        // 이미지 파일을 'files'라는 이름으로 FormData에 추가하고 타입 명시
        imageFiles.forEach((file) => {
            // 파일 이름과 타입을 명시적으로 지정
            const blob = new Blob([file], { type: 'image/png' });  // 또는 file.type 사용
            formData.append('files', blob, file.name);
        });

        try {
            const queryParams = new URLSearchParams({
                title: title,
                content: content,
                category: 'STUDY'
            });
            
            interests.forEach(interest => {
                queryParams.append('area', interest);
            });

            // 요청 내용 확인용 로그
            console.log('전송되는 파일:', [...formData.getAll('files')].map(f => ({name: f.name, type: f.type})));

            const response = await axios.post(
                `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post?${queryParams.toString()}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'multipart/form-data',
                        'accept': '*/*'  // curl 명령어에 있던 헤더 추가
                    }
                }
            );

            if (response.status === 201) {
                console.log("성공 응답:", response.data);
                setTitle('');
                setContent('');
                setInterests([]);
                setImageFiles([]);
                console.log("게시글 작성 완료");
                navigate('/study');
            }
        } catch (error) {
            console.error('게시글 작성 실패:', error.response?.data || error.message);
        }
    };

    const handleInterestChange = (selectedItems) => {
        setInterests(selectedItems);
    };

    // interestData 객체 추가
    const interestData = {
        5: { name: 'React', icon: require('../../assets/images/react.svg').default },
        6: { name: 'Angular', icon: require('../../assets/images/angular.svg').default },
        7: { name: 'Vue.js', icon: require('../../assets/images/vuedotjs.svg').default },
        8: { name: 'Svelte', icon: require('../../assets/images/svelte.svg').default },
        9: { name: 'jQuery', icon: require('../../assets/images/jquery.svg').default },
        10: { name: 'Backbone.js', icon: require('../../assets/images/backbonedotjs.svg').default },
        11: { name: 'Preact', icon: require('../../assets/images/preact.svg').default },
        12: { name: 'Ember.js', icon: require('../../assets/images/emberdotjs.svg').default },
        13: { name: 'Node.js', icon: require('../../assets/images/nodedotjs.svg').default },
        14: { name: 'Spring', icon: require('../../assets/images/spring.svg').default },
        15: { name: 'Spring-Boot', icon: require('../../assets/images/springboot.svg').default },
        16: { name: 'Django', icon: require('../../assets/images/django.svg').default },
        17: { name: 'Flask', icon: require('../../assets/images/flask.svg').default },
        18: { name: 'Laravel', icon: require('../../assets/images/laravel.svg').default },
        19: { name: 'Ruby on Rails', icon: require('../../assets/images/rubyonrails.svg').default },
        20: { name: 'CakePHP', icon: require('../../assets/images/cakephp.svg').default },
        21: { name: 'Java', icon: require('../../assets/images/java.svg').default },
        22: { name: 'Python', icon: require('../../assets/images/python.svg').default },
        23: { name: 'C', icon: require('../../assets/images/c.svg').default },
        24: { name: 'C++', icon: require('../../assets/images/cplusplus.svg').default },
        25: { name: 'JavaScript', icon: require('../../assets/images/javascript.svg').default },
        26: { name: 'Go', icon: require('../../assets/images/go.svg').default },
        27: { name: 'PHP', icon: require('../../assets/images/php.svg').default },
        28: { name: 'Ruby', icon: require('../../assets/images/ruby.svg').default },
        29: { name: 'Kotlin', icon: require('../../assets/images/kotlin.svg').default },
        30: { name: 'Swift', icon: require('../../assets/images/swift.svg').default }
      };
    // interests 배열에서 관심분야 제거하는 함수
    const removeInterest = (interestToRemove) => {
        setInterests(interests.filter(interest => interest !== interestToRemove));
    };

    return (
        <div className="container">
            <CommunityStudySideNav/>
            <div className="post-form-container">
                <p className="free-post-title">스터디 게시글 작성</p>
                <form onSubmit={handleSubmit} className="post-form">
                    <div className="form-group">
                        <label htmlFor="title">제목</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                            required
                        />
                    </div>
                    <div className="form-group-under">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(true)}
                            className="interest-select-button"
                        >
                            관심분야 선택
                        </button>
                        <InterestsContainer>
                            {interests.map((interest, index) => {
                                const interestItem = Object.values(interestData).find(item => item.name === interest);
                                return (
                                    <InterestTag key={index}>
                                        {interestItem && (
                                            <InterestIcon 
                                                src={interestItem.icon} 
                                                alt={interest} 
                                            />
                                        )}
                                        <InterestLabel>{interest}</InterestLabel>
                                        <RemoveButton onClick={() => removeInterest(interest)}>×</RemoveButton>
                                    </InterestTag>
                                );
                            })}
                        </InterestsContainer>
                    </div>
                    <div className="form-group-under" style={{ width: '1300px' }}>
                        <label htmlFor="content">내용</label>
                        <EditorComponent
                            content={content}
                            onEditorChange={handleEditorChange}
                            handleImageUpload={handleImageUpload}
                        />
                    </div>

                    <div className="button-group">
                        <button type="button" className="post-cancel-button" onClick={() => window.history.back()}>
                            취소
                        </button>
                        <button type="submit" className="post-submit-button">
                            등록
                        </button>
                    </div>

                {/* CommunityCategoryModal 컴포넌트 수정 */}
                <CommunityCategoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelectionChange={handleInterestChange}
                />
                </form>
            </div>
            {errorMessage && (
                <ErrorModal 
                    message={errorMessage} 
                    onClose={() => setErrorMessage('')}
                />
            )}
        </div>
    );
}

export default QuestionPostForm;
