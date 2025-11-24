"use client";

import "./post-list-page.css";
import { useEffect, useState } from "react";
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

export default function PostListPage({ boardId }: { boardId: string }) {
  const [posts, setPosts] = useState<IPostListItem[]>([]);

  const fetchData = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const searchParams = new URLSearchParams();
    searchParams.append("boardId", boardId);
    searchParams.append("pageNo", "1");
    searchParams.append("pagePostCount", "20");

    const res = await fetch(`${API_URL}/api/v1/posts?${searchParams}`, {
      credentials: "include",
    });

    const json = await res.json();

    if (json.result) {
      const items: IPostListItem[] = json.data.content;
      setPosts(
        items.map((item) => {
          return {
            id: item.id,
            title: item.title,
            createdDate: item.createdDate,
            writerName: item.writerName,
            viewCount: 0,
            commentCount: 0,
          };
        })
      );
    }

    // createdDate
    // id
    // title
    // writerName
    // json.data.content

    console.log("json", json);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
