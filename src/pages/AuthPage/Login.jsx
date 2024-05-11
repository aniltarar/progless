import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import useLogin from "../../services/useLogin";
import { Link } from "react-router-dom";

function Login() {
    const {user, setUser, login} = useLogin()

    function handleFormSubmit (event) {
        event.preventDefault();  // Formun submit edildiği zaman sayfanın yenilenmesini engeller

        console.log(user);

        login().then(res => {
            if (res) {
                window.location.href = '/';
            } else {
                alert("Böyle bir kullanıcı bulunamadı");
            }
        });

    }


  function handleInputChange(event) {
    if (event.target.id == "loginUsernameInput") {
      setUser({
        ...user,
        username: event.target.value,
      });
    } else if (event.target.id == "loginPasswordInput") {
      setUser({
        ...user,
        password: event.target.value,
      });
    }
  }


  return (
    <>
      <div
        className="d-flex  align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <div className="row border rounded p-5 shadow col-sm-12 col-md-9 col-lg-6 mx-auto">
            <h1 className="text-center">Giriş Yap</h1>

            <hr />

            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="loginUsernameInput" className="form-label lead">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="loginUsernameInput"
                  placeholder="Kullanıcı Adı Giriniz"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginPasswordInput" className="form-label lead">
                  Parola
                </label>
                <input
                  type="password"
                  className="form-control "
                  id="loginPasswordInput"
                  placeholder="Parola"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-2">
                Giriş Yap
              </button>
            </form>

            <span className="mt-3">
              Hesabınız yok mu?{" "}
              <Link to={"/register"}>Kayıt olmak için tıklayın.</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
