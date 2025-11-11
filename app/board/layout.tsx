import Header from "@/src/components/common/Header";
import CommonLnb from "@/src/components/common/Lnb";
import "./layout.css";

export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="main-layout">
      <Header />
      <div className="content-layout">
        <CommonLnb />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
