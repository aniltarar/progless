import React from "react";
import "./Header.css";
import RouterButton from "../Buttons/RouterButton";
import { FaRightFromBracket } from "react-icons/fa6";
import logOutAccount from "../../helpers/logout";

// Programımızın Header'i
function Header() {
  return (
    <div className="headerDiv d-flex align-items-center justify-content-around w-100">
      <div>
        <a href="/">
          <img id="logo" src="src/assets/images/logo.png" alt="" />
        </a>
      </div>

      <div className="d-flex align-items-center gap-5">
        <RouterButton text={"Ana Sayfa"} url={"/"} />
        <RouterButton text={"Kategori"} url={"/categories"} />
        <RouterButton text={"Görevler"} url={"/tasks"} />
        <RouterButton text={"Süreç Takibi"} />
      </div>

      <div className="d-flex justify-content-around align-items-center gap-3">
        <span className="border rounded p-2 pl-username">{JSON.parse(localStorage.getItem('user')).username}</span>
        <button className="btn btn-outline-secondary">tema</button>
        <button className="btn btn-outline-danger" onClick={() => {
          logOutAccount();
        }}>Çıkış Yap <FaRightFromBracket /> </button>
      </div>
    </div>
  );
}

export default Header;
