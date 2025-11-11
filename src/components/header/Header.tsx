import "./style.css";

export default function Header() {
  return (
    <div className="header">
      <div className="lead">BOARD MANAGER</div>
      <div className="buttons">
        <div className="btn btn-register">Register</div>
        <div className="btn btn-login">Login</div>
      </div>
    </div>
  );
}
