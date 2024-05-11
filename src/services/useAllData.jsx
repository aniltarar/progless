import { useEffect, useState } from "react";
import requestUtil from "../utils/requestUtil"

function useAllData() {
    const [allData, setAllData] = useState();

    useEffect(() => {
        getAllData();
    }, []);
    
    const getAllData = async () => {
        const _getAllData = (await requestUtil().get(`/users/${JSON.parse(localStorage.getItem("user")).id}`)).data;
        setAllData(_getAllData)
    }

    return { allData, getAllData }
}

export default useAllData
