import { CrossIcon } from "../icons/CrossIcon"
import { Input } from "./Input"
import { useState, useRef } from "react"
import { Button } from "./Button"
import axios from "axios"
import { BACKEND_URL } from "../config"


interface createContentProps{
    open?:boolean,
    onClose?:()=>void
}

enum ContentType{
    Youtube="youtube",
    Twitter="twitter",
    Reddit="reddit",
}


export function CreateContentModal(props:createContentProps){
    const titleref = useRef<HTMLInputElement>(null);
    const linkref = useRef<HTMLInputElement>(null);
    const [type,setType] =  useState(ContentType.Youtube)

    async function addContent(){
        const title = titleref.current?.value;
        const link = linkref.current?.value;

        const message =await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            type,
            title
        },{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token") || "" }`
            }
        })

        if (props.onClose) {
            props.onClose();
        }    }

    return (                   
        <>
        {props.open && 
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 bg-opacity-65" onClick={props.onClose}>
                <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <span className="bg-white opacity-100 p-5 rounded fixed" onClick={(e) => e.stopPropagation()} >
                            <div className=" flex justify-end items-center">
                                <div onClick={props.onClose} className="cursor-pointer">
                                    <CrossIcon/>
                                </div>
                            </div>
                            <div>
                                <Input placeholder="Title" reference={titleref}/>
                                <Input placeholder="Paste your link here" reference={linkref}/>
                            </div>
                            <div>
                                    <div className="pl-2 pt-2 text-purple-400">
                                        <h2>Select content type:</h2>
                                    </div>
                                <div className="flex gap-1 justify-center p-2">
                                    <Button variants={type === ContentType.Youtube?"primary":"secondary"} text={"Youtube"} onClick={()=>setType(ContentType.Youtube)}/>
                                    <Button variants={type === ContentType.Twitter?"primary":"secondary"} text={"Twitter"} onClick={()=>setType(ContentType.Twitter)}/>
                                    <Button variants={type === ContentType.Reddit?"primary":"secondary"} text={"Reddit"} onClick={()=>setType(ContentType.Reddit)}/>
                                </div>
                                <div className="flex justify-center">
                                    <Button text={"Submit"} variants="tertiary" onClick={addContent}/>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            

        }
        </>
    )

}