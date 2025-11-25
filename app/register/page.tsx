import RegisterPage from "@/src/components/page/RegisterPage";
import Header from "@/src/components/common/Header";

export default function Register() {
  return (
    <div className="main-layout">
      <Header />
      <div className="content-layout">
        <RegisterPage />
      </div>
    </div>
  );
}
