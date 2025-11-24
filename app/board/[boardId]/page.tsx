import PostListPage from "@/src/components/page/PostListPage";
import Header from "@/src/components/common/Header";
import CommonLnb from "@/src/components/common/Lnb";

export default async function Home({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;

  return (
    <div className="main-layout">
      <Header />
      <div className="content-layout">
        <CommonLnb boardId={boardId} />
        <div className="content">
          <PostListPage boardId={boardId} />
        </div>
      </div>
    </div>
  );
}
