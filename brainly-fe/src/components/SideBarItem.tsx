
import { TwitterIcon } from "../icons/twitterIcon"
interface itemProps{
    icon?:any,
    title:string
    onClick?:()=>void
}

export function SideBarItem(props:itemProps){
    return(
        <>
            <div className="flex mb-4 items-center text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-45 pl-4 transition-all duration-150" onClick={props.onClick}>
                <div className="pr-2 pl-2">
                    {props.icon}
                </div>
                <div className="ml-6">{props.title}</div>
            </div>
        </>
    )
}