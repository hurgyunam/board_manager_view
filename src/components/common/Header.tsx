"use client";

import IconsRegister from "@/src/components/icons/Register";
import "./header.css";
import Link from "next/link";
import { useEffect } from "react";

export default function Header() {
  const fetchData = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${API_URL}/api/v1/users/me`, {
      credentials: "include",
    });

    const json = await res.json();

    console.log("header", json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="header">
      <div className="lead">BOARD MANAGER</div>
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
    </div>
  );
}
