import { BrainIcon } from "../icons/brain"
import { TwitterIcon } from "../icons/twitterIcon"
import { YoutubeIcon } from "../icons/youtubeIcon"
import { SideBarItem } from "./SideBarItem"


export function SideBar(){
    return (
            <div className="w-1/4 h-screen bg-white flex-col">
                <div className="flex p-5 mb-5">
                    <BrainIcon/>
                    <h1 className="pl-2">Brainly</h1>
                </div>
                <div className="flex-col ">
                    <SideBarItem icon={<TwitterIcon/>} title={"Twitter"} />
                    <SideBarItem icon={<YoutubeIcon/>} title={"Youtube"} />
                </div>
            </div>
    )
}