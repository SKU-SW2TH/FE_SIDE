import axios from 'axios';
import {useState, useEffect } from 'react'

export default function useFetch(URL){
    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get(URL).then((res)=>setData(res))
    },[URL])
    
    return data
}