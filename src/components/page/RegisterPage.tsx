"use client";

import { TextField } from "@mui/material";
import "./register-page.css";
import Image from "next/image";
import { TextFieldSx } from "@/src/components/common/TextFieldSx";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ValidationErrors {
  username?: string;
  password?: string;
  email?: string;
  nickname?: string;
  form?: string; // 전체 폼 에러
}

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  const router = useRouter();

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (username.length < 4 || !/^[a-zA-Z0-9]+$/.test(username)) {
      newErrors.username = "아이디는 4자 이상의 영문/숫자이어야 합니다.";
      isValid = false;
    }
    if (nickname.length < 2) {
      newErrors.nickname = "닉네임은 2자 이상이어야 합니다.";
      isValid = false;
    }
    if (password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다.";
      isValid = false;
    }
    if (password !== passwordRepeat) {
      newErrors.password = "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
      isValid = false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onClickRegisterButton = async () => {
    if (!validate()) {
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${API_URL}/api/v1/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        nickname,
      }),
    });

    const json = await res.json();

    if (json.result === true) {
      alert("회원가입이 성공했습니다!");
      router.push(`/login`);
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
            error={!!errors.username}
            helperText={errors.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            variant="filled"
            sx={TextFieldSx}
            value={email}
            error={!!errors.email}
            helperText={errors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Nickname"
            variant="filled"
            sx={TextFieldSx}
            value={nickname}
            error={!!errors.nickname}
            helperText={errors.nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            sx={TextFieldSx}
            value={password}
            error={!!errors.password}
            helperText={errors.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Repeat Password"
            type="password"
            variant="filled"
            sx={TextFieldSx}
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
          <div className="btn btn-register" onClick={onClickRegisterButton}>
            REGISTER
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
