"use client";

import IconSearch from "@/src/components/icons/Search";
import "./lnb.css";
import IconChat from "@/src/components/icons/Chat";
import { useState } from "react";

export interface IMenuItem {
  id: number;
  name: string;
  isActive: boolean;
}

export default function CommonLnb() {
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([
    { id: 1, name: "Board 1", isActive: false },
    { id: 2, name: "Board 2", isActive: false },
    { id: 3, name: "Board 3", isActive: true },
    { id: 4, name: "Board 4", isActive: false },
    { id: 5, name: "Board 5", isActive: false },
    { id: 6, name: "Board 6", isActive: false },
  ]);

  const onClickMenuItem = (id: number) => {
    setMenuItems(
      menuItems.map((menuItem) => {
        if (menuItem.id === id) {
          return {
            ...menuItem,
            isActive: true,
          };
        } else {
          return {
            ...menuItem,
            isActive: false,
          };
        }
      })
    );
  };

  return (
    <div className="lnb">
      <div className="menu-item">
        <IconSearch />
        Search
      </div>
      <div className="menu-group">
        <div className="menu-group-header">MENU</div>
        <div className="menu-group-body">
          {menuItems.map((menuItem) => (
            <div
              className={`menu-item ${menuItem.isActive && "active"}`}
              onClick={() => onClickMenuItem(menuItem.id)}
              key={`common-lnb-${menuItem.id}`}
            >
              {menuItem.isActive && <div className="active-line"></div>}
              <IconChat />
              {menuItem.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
