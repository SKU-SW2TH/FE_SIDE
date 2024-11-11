// FreePostForm.js
import React, { useState } from 'react';
import CommunitySideNav from './CommunitySideNav';
import '../../styles/FreePostForm.css';
import EditorComponent from './EditorComponent';

function FreePostForm({ addPost }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 부모 컴포넌트로 Markdown 데이터를 전달하는 함수
    const handleContentChange = (markdown) => {
        setContent(markdown);  // 작성된 Markdown을 state에 저장
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            addPost({ title, content });
            setTitle('');
            setContent('');
        } else {
            alert('제목과 내용을 입력하세요.');
        }
    };

    // 이미지 업로드 로직 (로컬 파일 사용 예시)
    const getImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        // 실제 서버와 연결된 경우, URL을 반환
        return URL.createObjectURL(file);  // 로컬에서만 사용할 경우
    };

    return (
        <div className="container">
            <CommunitySideNav userName="박범준" profileImage="img/image.png" />
            <div className="post-form-container">
                <p className="free-post-title">자유 게시글 작성</p>
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
                    <div className="form-group" style={{ width: '1300px' }}>
                        <label htmlFor="content">내용</label>
                        <EditorComponent handleImageUpload={getImage} onSave={handleContentChange} />
                    </div>
                </form>
                <div>
                    <h3>Markdown Preview:</h3>
                    <pre>{content}</pre>  {/* Markdown 내용 출력 */}
                </div>
            </div>
        </div>
    );
}

export default FreePostForm;
