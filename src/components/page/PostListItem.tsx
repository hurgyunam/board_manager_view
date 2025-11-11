// PostListItem.tsx
import React from "react";
import { Post } from "@/src/types/post"; // 앞서 정의한 Post 타입
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  styled,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Link from "next/link"; // Next.js Link

interface PostItemProps {
  post: Post;
}

const StyledChip = styled(Chip)(({ theme }) => ({
  height: 20,
  fontSize: "0.75rem",
  marginRight: theme.spacing(1),
  "& .MuiChip-icon": {
    fontSize: "0.9rem",
  },
}));

const PostListItem: React.FC<PostItemProps> = ({ post }) => {
  // 게시글 상세 페이지 라우팅 가정: /post/[id]
  const detailHref = `/post/${post.id}`;

  return (
    <Link href={detailHref} passHref style={{ textDecoration: "none" }}>
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          p: 1,
          "&:hover": {
            backgroundColor: "action.hover", // 마우스 오버 시 배경색 변경
            borderColor: "primary.main",
          },
        }}
      >
        <CardContent sx={{ "&:last-child": { pb: 2 } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* 제목 */}
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}
            >
              {post.title}
            </Typography>
            {/* 통계 정보 */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ minWidth: "150px", justifyContent: "flex-end" }}
            >
              <StyledChip
                icon={<FavoriteIcon />}
                label={post.likesCount.toLocaleString()}
                size="small"
                color="error"
              />
              <StyledChip
                icon={<VisibilityIcon />}
                label={post.viewsCount.toLocaleString()}
                size="small"
                color="primary"
              />
              <StyledChip
                icon={<CommentIcon />}
                label={post.commentsCount.toLocaleString()}
                size="small"
              />
            </Stack>
          </Box>

          {/* 작성자 및 날짜 */}
          <Typography variant="body2" color="text.secondary">
            {post.author} | {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostListItem;
