import PostDetailPage from "@/src/components/page/PostDetailPage";
import Header from "@/src/components/common/Header";
import CommonLnb from "@/src/components/common/Lnb";

export default async function BoardDetail({
  params,
}: {
  params: Promise<{ boardId: string; postId: string }>;
}) {
  const { boardId, postId } = await params;

  return (
    <div className="main-layout">
      <Header />
      <div className="content-layout">
        <CommonLnb boardId={boardId} />
        <div className="content">
          <PostDetailPage boardId={boardId} postId={postId} />
        </div>
      </div>
    </div>
  );
}
