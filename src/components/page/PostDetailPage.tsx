"use client";

import "./post-edit-page.css";
import "./post-detail-page.css";
import Image from "next/image";
import { useState } from "react";
import { IPostListItem } from "./PostListPage";
import { EditorContent, useEditor } from "@tiptap/react";
import { Image as TiptapImage } from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import IconUp from "@/src/components/icons/Up";
import { TextField } from "@mui/material";
import IconComment from "@/src/components/icons/Comment";
import IconThumbUp from "@/src/components/icons/ThumbUp";
import IconAccordionHide from "@/src/components/icons/AccordionHide";

export default function PostDetailPage() {
  const [post, setPost] = useState<IPostListItem>({
    id: 1,
    title: "테스트",
    viewCount: 244,
    commentCount: 2,
    writerName: "허규남",
    createdDate: "한달 전",
  });

  const content = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "안녕하세요, Tiptap 에디터입니다!" }],
      },
    ],
  };

  const editor = useEditor({
    // 사용할 확장 기능 목록
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      TiptapImage.configure({
        // 이 속성은 이미지를 업로드할 때 drag and drop 또는 파일 붙여넣기를 활성화합니다.
        inline: true,
        allowBase64: true, // 이미지 URL 대신 Base64 인코딩된 데이터를 사용할 수 있게 합니다 (테스트용, 프로덕션 환경 비추천)
      }),
    ],
    // 초기 콘텐츠 (선택 사항)
    content,
    editable: false,
    immediatelyRender: false,
  });

  return (
    <div className="post-detail-page">
      <div className="white-card">
        <div className="head">
          <div className="lead">
            <Image
              src="/default_profile.svg" // public 폴더 안의 경로 사용
              alt="설명 텍스트"
              width={40} // 필수 속성
              height={40} // 필수 속성
            />
            <div className="detail">
              <div className="writer">{post.writerName}</div>
              <div className="post-time">{post.createdDate}</div>
            </div>
          </div>
        </div>
        <div className="body">
          <EditorContent editor={editor} />
        </div>
        <div className="buttons buttons-end">
          <div className="btn btn-vote">
            <IconUp />
            Vote
          </div>
        </div>
      </div>
      <div className="white-card">
        <TextField placeholder="Type here your wise suggestion" />
        <div className="buttons buttons-end">
          <div className="btn btn-cancel">Cancel</div>
          <div className="btn btn-comment">
            <IconComment stroke="white" />
            Comment
          </div>
        </div>
      </div>
      <div className="white-card comment-item">
        <div className="primary-line"></div>
        <div className="head">
          <div className="lead">
            <Image
              src="/default_profile.svg" // public 폴더 안의 경로 사용
              alt="설명 텍스트"
              width={40} // 필수 속성
              height={40} // 필수 속성
            />
            <div className="detail">
              <div className="writer">{post.writerName}</div>
              <div className="post-time">{post.createdDate}</div>
            </div>
          </div>
        </div>
        <div className="editor-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum
          amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.
          Placerat ut adipiscing nulla lectus vulputate massa, scelerisque.
          Netus nisl nulla placerat dignissim ipsum arcu.
        </div>
        <div className="buttons">
          <div className="left">
            <div className="btn-up">
              <IconThumbUp /> 12
            </div>
          </div>
          <div className="right">
            <div className="btn-hide">
              <IconAccordionHide /> Hide All Replies
            </div>
          </div>
        </div>
      </div>
      <div className="white-card comment-item">
        <div className="sub-line"></div>
        <div className="editor-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum
          amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.
          Placerat ut adipiscing nulla lectus vulputate massa, scelerisque.
          Netus nisl nulla placerat dignissim ipsum arcu.
        </div>
        <div className="buttons">
          <div className="left">By @lazyReplyer</div>
          <div className="right"></div>
        </div>
      </div>
      <div className="white-card comment-item">
        <div className="sub-line"></div>
        <div className="editor-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum
          amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.
          Placerat ut adipiscing nulla lectus vulputate massa, scelerisque.
          Netus nisl nulla placerat dignissim ipsum arcu.
        </div>
        <div className="buttons">
          <div className="left">By @lazyReplyer</div>
          <div className="right"></div>
        </div>
      </div>
      <div className="white-card comment-item">
        <div className="primary-line"></div>
        <div className="head">
          <div className="lead">
            <Image
              src="/default_profile.svg" // public 폴더 안의 경로 사용
              alt="설명 텍스트"
              width={40} // 필수 속성
              height={40} // 필수 속성
            />
            <div className="detail">
              <div className="writer">{post.writerName}</div>
              <div className="post-time">{post.createdDate}</div>
            </div>
          </div>
        </div>
        <div className="editor-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum
          amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.
          Placerat ut adipiscing nulla lectus vulputate massa, scelerisque.
          Netus nisl nulla placerat dignissim ipsum arcu.
        </div>
        <div className="buttons">
          <div className="left">
            <div className="btn-up">
              <IconThumbUp /> 12
            </div>
          </div>
          <div className="right">
            <div className="btn-hide">
              <IconAccordionHide /> Hide All Replies
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
