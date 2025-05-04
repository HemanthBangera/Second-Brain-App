
import { useState } from "react"
import { Button } from "../components/Button"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { CreateContentModal } from "../components/CreateContentModal"
import { Card } from "../components/Card"
import { SideBar } from "../components/SideBar"
import Masonry from "react-masonry-css"
import { TwitterIcon } from "../icons/twitterIcon"
import { UseContent } from "../hooks/UseContent"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { FRONTEND_URL } from "../config"

export function Dashboard(){
    const {contents,refresh} = UseContent();
    const [openModal,setopenModal] = useState(false);

    const breakpointColumnsObj = {
        default: 4, // 3 columns for larger screens
        1280:3,
        1024: 2, // 2 columns for medium screens
        768: 1, // 1 column for smaller screens
      };
    return(
        <div className="flex h-screen">  
            <SideBar/>
            <div className="bg-purple-50 w-full">
                <div className="flex w-full justify-end ">
                    <div className="m-2">
                       <Button staricon={<PlusIcon/>} text={"Add Content"} variants="primary" onClick={()=>{setopenModal(true)}}/>
                    </div>
                    <div className="m-2">
                       <Button staricon={<ShareIcon/>} text={"Share Content "} variants="secondary" 
                       onClick={async()=>{
                            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                                share:true
                            },{
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("token") || "" }`
                                }
                            })

                            const shareUrl = `${BACKEND_URL}/api/v1/brain/share/${response.data.hash}`;
                            const frontendUrl = `${FRONTEND_URL}/share/${response.data.hash}`
                            alert(frontendUrl);
                       }}/>
                    </div>
                </div>
                <CreateContentModal open={openModal} onClose={()=>setopenModal(false)}/>
                <div className="h-[calc(80%+80px)] overflow-y-auto">
                <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-4 p-4"
                columnClassName="masonry-column"
                >
                    {contents.map(({_id,type,link,title})=>(
                        <Card key={_id}
                         id={_id}
                         title={title}
                         link={link} 
                        type={type}/>
                    ))}
                </Masonry>
                </div>
            </div>
        </div>
    )
}