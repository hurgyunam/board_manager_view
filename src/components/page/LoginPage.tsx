"use client";

import Image from "next/image";
import "./register-page.css";
import { TextField } from "@mui/material";
import { TextFieldSx } from "@/src/components/common/TextFieldSx";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onClickLogin = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${API_URL}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const json = await res.json();

    if (json.result === true) {
      location.reload();
    }
  };

  return (
    <div className="register-page">
      <div className="register-content">
        <div className="title">Board Manager</div>
        <div className="description">
          Get more features and priviliges by joining to the most helpful
          community
        </div>
        <div className="input-group">
          <TextField
            label="Username"
            variant="filled"
            sx={TextFieldSx}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            sx={TextFieldSx}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btn btn-login" onClick={onClickLogin}>
            Login
          </div>
        </div>
      </div>
      <Image
        className="side-image"
        src="/register.png"
        width={860}
        height={810}
        alt="register"
      />
    </div>
  );
}
