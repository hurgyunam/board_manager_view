"use client";

import "./post-edit-page.css";

import { TextField } from "@mui/material";
import { TextFieldSx } from "@/src/components/common/TextFieldSx";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import IconImage from "@/src/components/icons/Image";
import IconPublish from "@/src/components/icons/Publish";
import { Image } from "@tiptap/extension-image";

export default function PostEditPage() {
  const editor = useEditor({
    // 사용할 확장 기능 목록
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Image.configure({
        // 이 속성은 이미지를 업로드할 때 drag and drop 또는 파일 붙여넣기를 활성화합니다.
        inline: true,
        allowBase64: true, // 이미지 URL 대신 Base64 인코딩된 데이터를 사용할 수 있게 합니다 (테스트용, 프로덕션 환경 비추천)
      }),
    ],
    // 초기 콘텐츠 (선택 사항)
    content: "<p>안녕하세요, Tiptap 에디터입니다!</p>",
    // 에디터가 활성화된 요소 (HTML 컨테이너)
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "editor-area prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none",
      },
    },
  });

  return (
    <div className="post-edit-page">
      <div className="white-card">
        <TextField label="Title" variant="filled" sx={TextFieldSx} />
        {/* 실제 에디터 콘텐츠가 렌더링되는 부분 */}
        <div className="editor-container">
          <EditorContent editor={editor} />
        </div>
        <div className="buttons">
          <div className="lead">
            <div className="btn btn-image">
              <IconImage />
              Add Image
            </div>
          </div>
          <div className="save">
            <div className="btn btn-draft">Save As Draft</div>
            <div className="btn btn-publish">
              <IconPublish />
              Publish
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
