import React, { useEffect, useState } from "react";
import RouterButton from "../Buttons/RouterButton";
import { FaMoon, FaRightFromBracket, FaSun } from "react-icons/fa6";
import logOutAccount from "../../helpers/logout";
import "./Header.css";

// Programımızın Header'i
function Header() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme == "dark" ? "theme-dark" : "";
  }, [theme]);

  return (
    <div className="headerDiv d-flex align-items-center justify-content-around w-100">
      <div>
        <a href="/">
          <img id="logo" src="src/assets/images/logo.png" alt="" />
        </a>
      </div>

      <div className="d-flex align-items-center gap-4">
        <RouterButton text={"Ana Sayfa"} url={"/"} />
        <RouterButton text={"Kategori"} url={"/categories"} />
        <RouterButton text={"Görevler"} url={"/tasks"} />
        <RouterButton text={"Süreç Takibi"} />
      </div>

      <div className="d-flex justify-content-around align-items-center gap-3">
        <span className="border rounded p-2 pl-username">
          {JSON.parse(localStorage.getItem("user"))?.username}
        </span>

        {/* <button className="btn btn-outline-secondary">tema</button> */}

        <button
          className={
            "btn btn-outline-secondary rounded-circle d-flex justify-content-center align-items-center me-2 theme-button"
          }
          style={{ width: "40px", height: "40px" }}
          onClick={() => {
            setTheme(theme == "light" ? "dark" : "light");
          }}
        >
          {theme == "light" ? (
            <FaSun style={{ color: "yellow" }} />
          ) : (
            <FaMoon style={{ color: "purple" }} />
          )}
        </button>

        <button
          className="btn btn-outline-danger"
          onClick={() => {
            logOutAccount();
          }}
        >
          Çıkış Yap <FaRightFromBracket />{" "}
        </button>
      </div>
    </div>
  );
}

export default Header;
