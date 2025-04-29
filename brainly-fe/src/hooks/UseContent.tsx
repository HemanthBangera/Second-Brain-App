import {useState,useEffect} from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export function UseContent(){
    const [contents,setContents] = useState([]);

    async function refresh(){
        await axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token") || "" }`
            }
        })
        .then((response) => setContents(response.data.content))
        .catch((Error) => console.log(Error))
    }

    useEffect(()=>{
        refresh();

        let interval = setInterval(()=>{
            refresh()},10*1000
         )

        return(()=>clearInterval(interval))
    },[]);

    return {contents,refresh};


}