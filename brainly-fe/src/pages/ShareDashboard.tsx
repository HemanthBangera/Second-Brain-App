
import { useState } from "react"
import { Button } from "../components/Button"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { CreateContentModal } from "../components/CreateContentModal"
import { Card } from "../components/Card"
import { SideBar } from "../components/SideBar"
import Masonry from "react-masonry-css"
import { useParams } from "react-router-dom"
import { TwitterIcon } from "../icons/twitterIcon"
import { UseContentShare } from "../hooks/UseContentShare"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { FRONTEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export function ShareDashboard(){
    const { sharelink } = useParams<{ sharelink: string }>();
    const navigate = useNavigate();

    if (!sharelink) {
     return <div>Second Brain not found!</div>; 
    }

    const { contents, refresh } = UseContentShare({sharelink});

    const [openModal,setopenModal] = useState(false);

    const breakpointColumnsObj = {
        default: 4, // 3 columns for larger screens
        1280:3,
        1024: 2, // 2 columns for medium screens
        768: 1, // 1 column for smaller screens
      };
    return(
        <div className="flex">  
            <SideBar/>
            <div className="bg-purple-50 w-full">
                
                <CreateContentModal open={openModal} onClose={()=>setopenModal(false)}/>
                <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-4 p-4"
                columnClassName="masonry-column"
                >
                    {contents.map(({type,link,title})=>(
                        <Card title={title}
                         link={link} 
                        type={type}/>
                    ))}
                </Masonry>
            </div>
        </div>
    )
}