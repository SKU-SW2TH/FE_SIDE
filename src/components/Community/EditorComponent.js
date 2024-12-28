// EditorComponent.js
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

function EditorComponent({ content, onEditorChange, handleImageUpload }) {
    return (
        <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            value={content}
            init={{
                height: 500,
                menubar: false,
                branding: false,
                statusbar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar: [
                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify',
                    'bullist numlist outdent indent | image | removeformat | help'
                ].join(' | '),
                images_upload_handler: handleImageUpload,
                automatic_uploads: true,
                file_picker_types: 'image',
                images_file_types: 'jpg,jpeg,png,gif',
                image_uploadtab: true,
                image_dimensions: false,
                image_title: false,
                image_description: false,
                file_picker_callback: function(callback, value, meta) {
                    if (meta.filetype === 'image') {
                        var input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                        input.onchange = function() {
                            var file = this.files[0];
                            var reader = new FileReader();
                            reader.onload = function(e) {
                                callback(e.target.result, {
                                    alt: file.name
                                });
                            };
                            reader.readAsDataURL(file);
                        };
                        input.click();
                    }
                }
            }}
            onEditorChange={onEditorChange}
        />
    );
}

export default EditorComponent;
