// FreePostForm.js
import React, { useState } from 'react';
import CommunitySideNav from './CommunitySideNav';
import '../../styles/FreePostForm.css';
import EditorComponent from './EditorComponent';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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

function EditForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { postId } = useParams();
    const handleEditorChange = (content, editor) => {
        setContent(content);
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

        const formData = new FormData();

        try {
            // 요청 내용 확인용 로그
            console.log('전송되는 파일:', [...formData.getAll('files')].map(f => ({name: f.name, type: f.type})));

            const response = await axios.patch(
                `http://ec2-3-39-85-170.ap-northeast-2.compute.amazonaws.com:8080/api/post/${postId}/edit`,
                {
                    title: title,
                    content: content
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',  // JSON 형식으로 변경
                        'accept': '*/*'
                    }
                }
            );

            if (response.status === 200) {
                console.log("성공 응답:", response.data);
                setTitle('');
                setContent('');
                console.log("게시글 작성 완료");
                navigate('/free');
            }
        } catch (error) {
            console.error('게시글 작성 실패:', error.response?.data || error.message);
        }
    };

    return (
        <div className="container">
            <CommunitySideNav/>
            <div className="post-form-container">
                <p className="free-post-title">게시글 수정</p>
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
                    <div className="form-group-under" style={{ width: '1300px' }}>
                        <label htmlFor="content">내용</label>
                        <EditorComponent
                            content={content}
                            onEditorChange={handleEditorChange}
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

export default EditForm;
