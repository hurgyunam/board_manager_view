import { TextField } from "@mui/material";
import "./register-page.css";
import Image from "next/image";
import { TextFieldSx } from "@/src/components/common/TextFieldSx";

export default function RegisterPage() {
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
          <TextField label="Email" variant="filled" sx={TextFieldSx} />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            sx={TextFieldSx}
          />
          <TextField
            label="Repeat Password"
            type="password"
            variant="filled"
            sx={TextFieldSx}
          />
          <div className="btn btn-register">REGISTER</div>
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
