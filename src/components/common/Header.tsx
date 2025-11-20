"use client";

import IconsRegister from "@/src/components/icons/Register";
import "./header.css";
import Link from "next/link";
import { useAuth, useAuthActions } from "@/src/store/useAuth";

export default function Header() {
  const { data: auth } = useAuth();
  const { logout } = useAuthActions(); // 인증 액션 사용

  return (
    <div className="header">
      <div className="lead">BOARD MANAGER</div>
      {auth ? (
        <div className="buttons">
          <div className="btn btn-login" onClick={logout}>
            Logout
          </div>
        </div>
      ) : (
        <div className="buttons">
          <Link href="/register">
            <div className="btn btn-register">
              <IconsRegister /> Register
            </div>
          </Link>
          <Link href="/login">
            <div className="btn btn-login">Login</div>
          </Link>
        </div>
      )}
    </div>
  );
}
