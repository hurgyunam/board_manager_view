// src/types/post.ts

export interface Post {
  id: number;
  boardId: string; // 게시판 ID (예: 'free', 'qna')
  title: string;
  author: string;
  createdAt: string; // ISO 8601 형식 날짜
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
}
