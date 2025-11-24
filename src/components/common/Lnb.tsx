"use client";

import IconSearch from "@/src/components/icons/Search";
import "./lnb.css";
import IconChat from "@/src/components/icons/Chat";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/store/useAuth";
import Link from "next/link";

export interface IBoardResponse {
  id: number;
  name: string;
}

export interface IMenuItem {
  id: number;
  name: string;
  isActive: boolean;
}

export default function CommonLnb({ boardId }: { boardId: string }) {
  const { data: auth } = useAuth();
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
          isActive: item.id.toString() === boardId,
        }))
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <Link
              className={`menu-item ${menuItem.isActive && "active"}`}
              key={`common-lnb-${menuItem.id}`}
              href={`/board/${menuItem.id}`}
            >
              {menuItem.isActive && <div className="active-line"></div>}
              <IconChat stroke={menuItem.isActive ? "primary2" : undefined} />
              {menuItem.name}
            </Link>
          ))}
        </div>
      </div>
      {auth?.role === "ADMIN" && (
        <div className="btn btn-add" onClick={onClickAddBoard}>
          Add Board
        </div>
      )}
    </div>
  );
}
