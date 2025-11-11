import IconSearch from "@/src/components/icons/Search";
import "./lnb.css";
import IconChat from "../icons/Chat";

export default function CommonLnb() {
  return (
    <div className="lnb">
      <div className="menu-item">
        <IconSearch />
        Search
      </div>
      <div className="menu-group">
        <div className="menu-group-header">MENU</div>
        <div className="menu-group-body">
          <div className="menu-item">
            <IconChat />
            Board 1
          </div>
          <div className="menu-item">
            <IconChat />
            Board 2
          </div>
          <div className="menu-item">
            <IconChat />
            Board 3
          </div>
          <div className="menu-item">
            <IconChat />
            Board 4
          </div>
        </div>
      </div>
    </div>
  );
}
