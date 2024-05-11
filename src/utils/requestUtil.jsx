import axios from "axios"

import definitons from './definitons.json'

// axios.post("url", {}, {headers: { Authorization: "Bearer ${token}" }}) yerine aşağıdaki requestUtil'i kullanıyoruz.
/** İskeğin Header bölümüne Authorization token ekler ve isteği gönderir.
 * @returns axios instance
 */
const requestUtil = () => {
    const instance = axios.create({
        baseURL: definitons.BACKEND_URL,  // her isteğin başına daha  önce tanımlanmış olan backend url'si eklendi
        timeout: 10000,  // 10 saniye içinde cevap gelmezse timeout'a düşer
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }  // header a kullanıcının session token i ekleniyor
    });

    // gönderilen istekten sonra gelen cevabı işler
    instance.interceptors.response.use(response => {
        return response;  // herhangi bir hata yoksa aynı cevabı döndürür
    }, error => {  // hata varsa
        // 401 hatası alındığında (401 hatası: Unauthorized)
        if (error.response && error.response.status === 401) {
            if (localStorage.getItem("user")) {
                let refreshToken = JSON.parse(localStorage.getItem("user"))["refreshToken"];
                axios.post(`${definitons.BACKEND_URL}/auth/refreshtoken`, { refreshToken: refreshToken }).then(res => {
                    localStorage.setItem("token", JSON.parse(res)["accessToken"]);
                    // Bu durumda aynı isteği tekrar gönder
                    const originalRequest = error.config;
                    return instance(originalRequest);
                });
            } else {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    });

    return instance
}

export default requestUtil