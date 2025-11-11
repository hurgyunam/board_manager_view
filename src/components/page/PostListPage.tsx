"use client";

// PostListPage.tsx (가정: /board/[boardId])
import React from "react";
import {
  Typography,
  Container,
  Button,
  Box,
  Pagination,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostListItem from "./PostListItem";
import SearchComponent from "./SearchComponent";
import { Post } from "@/src/types/post";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// 데이터 Mockup (실제로는 Spring Boot API 호출로 대체되어야 합니다)
const mockPosts: Post[] = [
  {
    id: 10,
    boardId: "free",
    title: "MUI로 퍼블리싱 성공했어요!",
    author: "개발자A",
    createdAt: "2025-11-10",
    viewsCount: 1240,
    likesCount: 45,
    commentsCount: 12,
  },
  {
    id: 9,
    boardId: "free",
    title: "Spring Boot API 연동 시 CORS 문제 해결 팁",
    author: "테스터B",
    createdAt: "2025-11-09",
    viewsCount: 880,
    likesCount: 22,
    commentsCount: 5,
  },
  // ... 게시글 데이터
];

const PostListPage: React.FC = () => {
  const searchParams = useSearchParams(); // ★ 변경된 부분 ★

  // URL에서 특정 쿼리 파라미터 값(예: page)을 가져옵니다.
  const boardId = searchParams.get("boardId");

  const handleSearch = (query: string) => {
    console.log(`Searching for: ${query} in board: ${boardId}`);
    // 실제 구현: Next.js 라우터로 검색 쿼리를 포함하여 이동하거나, SWR/React Query로 데이터 fetch
  };

  const currentBoardName = boardId
    ? `${boardId.toString().toUpperCase()} 게시판`
    : "게시판";

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* 현재 게시판 제목 */}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        {currentBoardName}
      </Typography>

      {/* 검색 및 글쓰기 버튼 영역 */}
      <Stack
        direction="row" // 가로 정렬 (flex-direction: row)
        spacing={2} // 요소 간 간격 (gap: 16px)
        alignItems="center"
        mb={3} // 하단 마진 (mb: 3)
      >
        {/* 1. 검색 컴포넌트 (남은 공간 모두 사용) */}
        <Box sx={{ flexGrow: 1 }}>
          <SearchComponent onSearch={handleSearch} />
        </Box>

        {/* 2. 글쓰기 버튼 */}
        <Link href={`/write?boardId=${boardId}`} passHref legacyBehavior>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="large"
            // Next.js Link와 MUI Button을 함께 사용할 때 발생하는
            // hydration 오류를 피하기 위해 legacyBehavior를 추가합니다.
          >
            글쓰기
          </Button>
        </Link>
      </Stack>

      {/* 게시글 목록 */}
      <Box>
        {mockPosts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </Box>

      {/* 페이지네이션 (실제 count 값 필요) */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination count={10} page={1} color="primary" />
      </Box>
    </Container>
  );
};

export default PostListPage;
