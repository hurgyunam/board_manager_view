import CommonLnb from "@/src/components/common/Lnb";

export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="content-layout">
      <CommonLnb />
      <div className="content">{children}</div>
    </div>
  );
}
