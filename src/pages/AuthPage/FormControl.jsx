function FormControl() {
  const inputControl = (event) => {
    if (event.target.id == "registerNameInput") {
      console.log(event.target.value);
      setFormData({
        ...formData,
        name: event.target.value,
      });
      if (event.target.value.length < 2)
        event.target.className = "form-control is-invalid";
      else {
        event.target.className = "form-control is-valid";
        setAllFieldValidSituation({
          ...allFieldValidSituation,
          name: true,
        });
      }
    } else if (event.target.id == "registerSurNameInput") {
      console.log(event.target.value);
      setFormData({
        ...formData,
        surname: event.target.value,
      });
      if (event.target.value.length < 2)
        event.target.className = "form-control is-invalid";
      else {
        event.target.className = "form-control is-valid";
        setAllFieldValidSituation({
          ...allFieldValidSituation,
          surname: true,
        });
      }
    } else if (event.target.id == "registerUsernameInput") {
      console.log(event.target.value);
      setFormData({
        ...formData,
        username: event.target.value,
      });
      if (event.target.value.length < 5)
        event.target.className = "form-control is-invalid";
      else {
        event.target.className = "form-control is-valid";
        setAllFieldValidSituation({
          ...allFieldValidSituation,
          username: true,
        });
      }
    } else if (event.target.id == "registerEmailInput") {
      console.log(event.target.value);
      setFormData({
        ...formData,
        email: event.target.value,
      });

      const emailParts = event.target.value.split("@");

      if (emailParts.length === 2 && emailParts[0] !== "") {
        const domainParts = emailParts[1].split(".");
        if (domainParts[1].length >= 2) {
          event.target.className = "form-control is-valid";
          setAllFieldValidSituation({
            ...allFieldValidSituation,
            email: true,
          });
        } else {
          event.target.className = "form-control is-invalid";
          console.log("Mail formatı yanlış");
        }
      } else {
        event.target.className = "form-control is-invalid";
        console.log("Mail formatı yanlış");
      }
    } else if (event.target.id == "registerPasswordInput") {
      console.log(event.target.value);
      setFormData({
        ...formData,
        password: event.target.value,
      });
      if (event.target.value != formData.passwordRepeat) {
        setIsPassworEqual(false);
      } else {
        setIsPassworEqual(true);
      }
      if (!validatePassword(event.target.value)) {
        event.target.className = "form-control is-invalid";
        console.log("Şifre formatı yanlış");
      } else {
        event.target.className = "form-control is-valid";
        setAllFieldValidSituation({
          ...allFieldValidSituation,
          password: true,
        });
      }
    } else if (event.target.id == "registerPasswordRepeatInput") {
      console.log(event.target.value);
      if (formData.password != event.target.value) {
        setIsPassworEqual(false);
        event.target.className = "form-control is-invalid";
      } else {
        setIsPassworEqual(true);
        event.target.className = "form-control is-valid";
        setAllFieldValidSituation({
          ...allFieldValidSituation,
          passwordRepeat: true,
        });
      }
      setFormData({
        ...formData,
        passwordRepeat: event.target.value,
      });
    }
  };

  return { inputControl };
}

export default FormControl;
