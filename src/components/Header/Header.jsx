import React from "react";
import "./Header.css";
import RouterButton from "../Buttons/RouterButton";

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
        <RouterButton text={"Görevler"} />
        <RouterButton text={"Süreç Takibi"} />
      </div>

      <div className="d-flex justify-content-around align-items-center gap-5">
        <span>username</span>
        <button className="btn btn-outline-secondary">tema</button>
        <button className="btn btn-outline-danger">cıkıs yap</button>
      </div>
    </div>
  );
}

export default Header;
