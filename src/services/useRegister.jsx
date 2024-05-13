import axios from 'axios';
import React, { useState } from 'react'
import definitions from '../utils/definitons.json'

function useRegister() {
    const [user, setUser] = useState();

    const register = async () => {
        const result = await axios.post(`${definitions.BACKEND_URL}/auth/signup`, user)
        try {
            if (result.status != 200) return false;
        } catch(error) {
            console.log("error", error);
            return false;
        }
        return true;
    };

    return { user, setUser, register }
}

export default useRegister