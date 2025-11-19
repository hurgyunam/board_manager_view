"use client";

import IconSearch from "@/src/components/icons/Search";
import "./lnb.css";
import IconChat from "@/src/components/icons/Chat";
import { useEffect, useState } from "react";

export interface IBoardResponse {
  id: number;
  name: string;
}

export interface IMenuItem {
  id: number;
  name: string;
  isActive: boolean;
}

export default function CommonLnb() {
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

  const fetchData = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${API_URL}/api/v1/board`, {
      credentials: "include",
    });

    const json = await res.json();

    if (json.result) {
      setMenuItems(
        json.data.map((item: IBoardResponse) => ({
          ...item,
          isActive: false,
        }))
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const onClickAddBoard = async () => {
    const boardName = prompt("이름을 정해주세요", "");

    console.log(boardName);
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${API_URL}/api/v1/board`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        boardName,
      }),
    });

    const json = await res.json();

    if (json.result) {
      fetchData();
    }
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
              <IconChat stroke={menuItem.isActive ? "primary2" : undefined} />
              {menuItem.name}
            </div>
          ))}
        </div>
      </div>
      <div className="btn btn-add" onClick={onClickAddBoard}>
        Add Board
      </div>
    </div>
  );
}
