import requestUtil from "../utils/requestUtil";

const user = JSON.parse(localStorage.getItem('user'));

function logOutAccount() {
    requestUtil().post(`/auth/signout?id=${user.id}`).then((data) => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
    });
}

export default logOutAccount