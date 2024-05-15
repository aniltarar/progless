import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import useLogin from "../../services/useLogin";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import useGoogleLogin from "../../services/useGoogleLogin";

function Login() {
  const { user, setUser, login } = useLogin();
  const { googleLogin } = useGoogleLogin();

  function handleFormSubmit(event) {
    event.preventDefault(); // Formun submit edildiği zaman sayfanın yenilenmesini engeller.

    login().then((res) => {
      if (res) {
        window.location.href = "/";
      } else {
        alert("Böyle bir kullanıcı bulunamadı");
      }
    }); // Kullanıcı bulunmazsa gösterilecek alert.
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

  
  const onSuccess = (response) => {
    console.log(response.profileObj);
    googleLogin(response.profileObj).then(() => {
      window.location.href = "/";
    });
  };
  
  const onFailure = (response) => {
    console.log("FAILED", response);
  };
  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "27535760035-gqnrlpu4a1rbfp36o8gb4odufpab0t4j.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  
  return (
    <>
      <div
        className="d-flex  align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <div className="row border rounded p-5 shadow col-sm-12 col-md-9 col-lg-6 mx-auto">
            <img src="src/assets/images/logo.png" width="100px"  alt="Progles Gelişim Takip Uygulaması" />
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
              <GoogleLogin
                clientId={
                  "27535760035-gqnrlpu4a1rbfp36o8gb4odufpab0t4j.apps.googleusercontent.com"
                }
                className="w-100 mt-3 text-center border border-1 rounded"
                onSuccess={onSuccess}
                onFailure={onFailure}
              />
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
