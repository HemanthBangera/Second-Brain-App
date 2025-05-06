import { BrainIcon } from "../icons/brain"
import { TwitterIcon } from "../icons/twitterIcon"
import { YoutubeIcon } from "../icons/youtubeIcon"
import { SideBarItem } from "./SideBarItem"
import { RedditIcon } from "../icons/reddit"
interface SideBarProps {
    setSelectedItems: React.Dispatch<React.SetStateAction<String | null>>; // Optional prop
  }


export function SideBar({setSelectedItems}:SideBarProps){
    return (
            <div className="w-1/4 h-screen bg-white flex-col">
                <div className="flex p-5 mb-5">
                    <BrainIcon/>
                    <h1 className="pl-2">Brainly</h1>
                </div>
                <div className="flex-col ">
                    <SideBarItem title={"All posts"} onClick={()=>setSelectedItems(null)}/>
                    <SideBarItem icon={<TwitterIcon/>} title={"Twitter"} onClick={()=>setSelectedItems("twitter")}/>
                    <SideBarItem icon={<YoutubeIcon/>} title={"Youtube"} onClick={()=>setSelectedItems("youtube")}/>
                    <SideBarItem icon={<RedditIcon/>} title={"Reddit"} onClick={()=>setSelectedItems("reddit")}/>
                </div>
            </div>
    )
}