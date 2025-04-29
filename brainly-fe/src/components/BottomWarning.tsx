import {Link} from "react-router-dom"

interface Interface{
    label:string,
    buttontext:string,
    to:any
}

export function BottomWarning({label,buttontext,to}:Interface){
    return (
        <div className="flex justify-center py-2 text-sm ">
            <div>
                {label}
            </div>
            <Link to={to} className="underline pl-1 cursor-pointer">
            {buttontext}
            </Link>

        </div>
    )
}