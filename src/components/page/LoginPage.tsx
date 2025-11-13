import Image from "next/image";
import "./register-page.css";
import { TextField } from "@mui/material";
import { TextFieldSx } from "@/src/components/common/TextFieldSx";

export default function LoginPage() {
  return (
    <div className="register-page">
      <div className="register-content">
        <div className="title">Board Manager</div>
        <div className="description">
          Get more features and priviliges by joining to the most helpful
          community
        </div>
        <div className="input-group">
          <TextField label="Username" variant="filled" sx={TextFieldSx} />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            sx={TextFieldSx}
          />
          <div className="btn btn-login">Login</div>
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
