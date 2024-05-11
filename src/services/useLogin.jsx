import { useState } from 'react'
import axios from 'axios';
import definitons from '../utils/definitons.json'

function useLogin() {
    const [user, setUser] = useState({ username: '', password: '' });

    const login = async () => {
        const result = await axios.post(`${definitons.BACKEND_URL}/auth/signin`, user)
        try {
            if (result.status == 401) return false;
            localStorage.setItem("token", result.headers["authorization"])
            localStorage.setItem("user", JSON.stringify(result.data))
        } catch(error) {
            console.log("error", error);
            return false;
        }
        return true;
    };

    return { user, setUser, login }
}

export default useLogin