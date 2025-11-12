"use client";

import "./post-list-page.css";
import { useState } from "react";
// 먼저, next/image에서 Image 컴포넌트를 가져와야 합니다.
import Image from "next/image";
import IconEye from "@/src/components/icons/Eye";
import IconComment from "@/src/components/icons/Comment";

export interface IPostListItem {
  id: number;
  title: string;
  viewCount: number;
  commentCount: number;
  writerName: string;
  createdDate: string;
}

export default function PostListPage() {
  const [posts, setPosts] = useState<IPostListItem[]>([
    {
      id: 1,
      title: "테스트",
      viewCount: 244,
      commentCount: 2,
      writerName: "허규남",
      createdDate: "한달 전",
    },
    {
      id: 2,
      title: "테스트",
      viewCount: 244,
      commentCount: 2,
      writerName: "허규남",
      createdDate: "한달 전",
    },
    {
      id: 3,
      title: "테스트",
      viewCount: 244,
      commentCount: 2,
      writerName: "허규남",
      createdDate: "한달 전",
    },
    {
      id: 4,
      title: "테스트",
      viewCount: 244,
      commentCount: 2,
      writerName: "허규남",
      createdDate: "한달 전",
    },
  ]);
  return (
    <div className="post-list-page">
      {posts.map((post) => (
        <div className="post-item" key={`post-${post.id}`}>
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
          <div className="title">{post.title}</div>
          <div className="bottom">
            <div className="item">
              <IconEye />
              {post.viewCount}
            </div>
            <div className="item">
              <IconComment />
              {post.commentCount}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
