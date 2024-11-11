// EditorComponent.js
import React, { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';

const EditorComponent = ({ handleImageUpload, onSave }) => {
    const editorRef = useRef(null);

    // Markdown을 부모 컴포넌트로 전달하는 함수
    const handleSave = () => {
        if (!editorRef.current) return;
        const markdown = editorRef.current.getInstance().getMarkdown();
        onSave(markdown);  // 부모 컴포넌트로 Markdown 데이터 전달
    };

    return (
        <div>
            <Editor
                ref={editorRef}
                initialValue="Welcome to Toast UI Editor"
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                hideModeSwitch={true}
                plugins={[colorSyntax]}
                hooks={{
                    addImageBlobHook: async (file, callback) => {
                        const imageUrl = await handleImageUpload(file);
                        callback(imageUrl, 'alt text'); // 이미지 URL 삽입
                    },
                }}
            />
            <div>
                <button type="button" className="submit-button" onClick={handleSave}>게시글 작성</button>
            </div>
        </div>
    );
};

export default EditorComponent;
