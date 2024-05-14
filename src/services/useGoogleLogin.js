import useLogin from "./useLogin";
import useRegister from "./useRegister";

function useGoogleLogin() {
  const _useLogin = useLogin();
  const _useRegister = useRegister();

  const googleLogin = async (googleData) => {
    let _loginData = false;
    console.log(_useLogin.user);
    try {
      _loginData = await _useLogin.login({
        username: googleData.email.toString().split("@")[0],
        password: googleData.email.toString().split("@")[0]
      });
    } catch(e) {
    }

    if (_loginData) {
      return;
    }

    let _registerData = false;
    _registerData = await _useRegister.register({
      name: googleData.givenData ?? googleData.email.split("@")[0],
      surname: googleData.familyName ?? googleData.email.split("@")[0],
      email: googleData.email.toString(),
      username: googleData.email.split("@")[0],
      password: googleData.email.toString().split("@")[0],
      phoneNumber: googleData.googleId.slice(0, 11)
    });

    await _useLogin.login({
      username: googleData.email.toString().split("@")[0],
      password: googleData.email.toString().split("@")[0]
    });
  };

  return { googleLogin };
}

export default useGoogleLogin;
