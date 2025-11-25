import LoginPage from "@/src/components/page/LoginPage";
import Header from "@/src/components/common/Header";

export default function Login() {
  return (
    <div className="main-layout">
      <Header />
      <div className="content-layout">
        <LoginPage />
      </div>
    </div>
  );
}
