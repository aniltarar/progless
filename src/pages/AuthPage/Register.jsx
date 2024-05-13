import React from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import useRegister from "../../services/useRegister";
// import { inputControl } from "./FormControl";
import "./AuthPage.css";
import "react-phone-number-input/style.css";

function Register() {
  const { user, setUser, register } = useRegister();

  function handleFormSubmit(event) {
    event.preventDefault(); // Formun submit edildiği zaman sayfanın yenilenmesini engeller

    if (user.password != user.retypePassword) {
      alert("Şifreler uyuşmuyor.");
      return;
    }

    let tempuser = user;
    setUser({...tempuser, phoneNumber: tempuser.phoneNumber.slice(2)})

    register().then((res) => {
      if (res) {
        alert("Kayıt başarılı.");
        window.location.href = "/";
      } else {
        alert(`Kayıt olma başarısız`);
      }
    });
  }

  function handlePhoneChange(phoneValue) {
    setUser({
      ...user,
      phoneNumber: phoneValue?.toString(),
    });
  }

  function handleInputChange(event) {
    if (event.target.id == "registerUsernameInput") {
      setUser({
        ...user,
        username: event.target.value,
      });
      if (event.target.value.length < 5)
        event.target.className = "form-control is-invalid";
      else event.target.className = "form-control is-valid";
    } else if (event.target.id == "registerEmailInput") {
      setUser({
        ...user,
        email: event.target.value,
      });

      let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      if (!regex.test(event.target.value))
        event.target.className = "form-control is-invalid";
      else event.target.className = "form-control is-valid";
    } else if (event.target.id == "registerNameInput") {
      setUser({
        ...user,
        name: event.target.value,
      });
      if (event.target.value.length < 3)
        event.target.className = "form-control is-invalid";
      else event.target.className = "form-control is-valid";
    } else if (event.target.id == "registerSurnameInput") {
      setUser({
        ...user,
        surname: event.target.value,
      });
      if (event.target.value.length < 2)
        event.target.className = "form-control is-invalid";
      else event.target.className = "form-control is-valid";
    } else if (event.target.id == "registerPhoneInput") {
      setUser({
        ...user,
        phoneNumber: event.target.value?.toString(),
      });
      if (event.target.value.length < 5)
        event.target.className = "form-control is-invalid";
      else event.target.className = "form-control is-valid";
    } else if (event.target.id == "registerPasswordInput") {
      setUser({
        ...user,
        password: event.target.value,
      });
      if (event.target.value.length < 5)
        event.target.className = "form-control is-invalid";
      else event.target.className = "form-control is-valid";
    } else if (event.target.id == "registerRetypePasswordInput") {
      setUser({
        ...user,
        retypePassword: event.target.value,
      });
      if (event.target.value != user.password)
        event.target.className = "form-control is-invalid";
      else event.target.className = "form-control is-valid";
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
            <h1 className="text-center">Kayıt Ol</h1>

            <hr />

            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="registerUsernameInput"
                  className="form-label lead"
                >
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="registerUsernameInput"
                  placeholder="Kullanıcı Adı"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="registerEmailInput" className="form-label lead">
                  E-Posta
                </label>
                <input
                  type="email"
                  className="form-control "
                  id="registerEmailInput"
                  placeholder="E-Posta"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="registerNameInput" className="form-label lead">
                  Ad
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="registerNameInput"
                  placeholder="Ad"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="registerSurnameInput"
                  className="form-label lead"
                >
                  Soyad
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="registerSurnameInput"
                  placeholder="Soyad"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="registerPhoneInput" className="form-label lead">
                  Telefon
                </label>
                <PhoneInput
                  className="phoneInput"
                  id="registerPhoneInput"
                  limitMaxLength={true}
                  placeholder="(555) 555 55 55"
                  defaultCountry="TR"
                  value={user?.phone}
                  onChange={handlePhoneChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="registerPasswordInput"
                  className="form-label lead"
                >
                  Parola
                </label>
                <input
                  type="password"
                  className="form-control "
                  id="registerPasswordInput"
                  placeholder="Parola"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="registerRetypePasswordInput"
                  className="form-label lead"
                >
                  Parola tekrarı
                </label>
                <input
                  type="password"
                  className="form-control "
                  id="registerRetypePasswordInput"
                  placeholder="Parola tekrarı"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-2">
                Kayıt ol
              </button>
            </form>

            <span className="mt-3">
              Zaten bir hesabın var mı?{" "}
              <Link to={"/login"}>Giriş yapmak için tıklayın.</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
