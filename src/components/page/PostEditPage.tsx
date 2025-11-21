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
import IconPublish from "@/src/components/icons/Publish";
import { Image } from "@tiptap/extension-image";
import ImageButton from "@/src/components/common/ImageButton";
import ImageResize from "tiptap-extension-resize-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { TextAlign } from "@tiptap/extension-text-align";
import { useState } from "react";

export default function PostEditPage() {
  const [title, setTitle] = useState<string>("");
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
        allowBase64: false, // 이미지 URL 대신 Base64 인코딩된 데이터를 사용할 수 있게 합니다 (테스트용, 프로덕션 환경 비추천)
      }),
      ImageResize,
      TextStyle,
      TextAlign,
    ],
    // 초기 콘텐츠 (선택 사항)
    content: "",
    // 에디터가 활성화된 요소 (HTML 컨테이너)
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "editor-area prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none",
      },
    },
  });

  const publish = async () => {
    if (editor) {
      const content = editor.getJSON();

      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

      const res = await fetch(`${API_URL}/api/v1/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          content: JSON.stringify(content),
          boardId: 1,
        }),
      });

      const json = await res.json();

      if (json.result) {
        alert("게시글이 등록되었습니다.");
      }
    }
  };

  const insertImage = (fileDir: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: fileDir }).run();
    }
  };

  return (
    <div className="post-edit-page">
      <div className="white-card">
        <TextField
          label="Title"
          variant="filled"
          sx={TextFieldSx}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* 실제 에디터 콘텐츠가 렌더링되는 부분 */}
        <div className="editor-container">
          <EditorContent editor={editor} />
        </div>
        <div className="buttons">
          <div className="lead">
            <ImageButton insertImage={insertImage} />
          </div>
          <div className="save">
            <div className="btn btn-draft">Save As Draft</div>
            <div className="btn btn-publish" onClick={publish}>
              <IconPublish />
              Publish
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
