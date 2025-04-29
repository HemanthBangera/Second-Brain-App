import {useState,useEffect} from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

interface props{
    sharelink:string
}
export function UseContentShare(props:props){
    const [contents,setContents] = useState([]);

    async function refresh(){
        await axios.get(`${BACKEND_URL}/api/v1/brain/${props.sharelink}`,)
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