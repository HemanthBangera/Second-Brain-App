import {useState,useEffect} from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export interface ContentItem {
    _id: string;
    title: string;
    type: string;
    link: string;
}

export function UseContent(){
    const [contents,setContents] = useState<ContentItem[]>([]);

    async function refresh(){
        await axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token") || "" }`
            }
        })
        .then((response) => {
            console.log(response)
            setContents(response.data.content)
        })
        .catch((Error) => console.log(Error))
    }

    useEffect(()=>{
        refresh();

        let interval = setInterval(()=>{
            refresh()},10*1000
         )
        return(()=>clearInterval(interval))
    },[]);

    return {contents,refresh,setContents};


}