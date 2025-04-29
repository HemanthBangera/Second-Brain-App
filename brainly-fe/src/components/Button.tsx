import { ReactElement } from "react";

interface ButtonProps{
    text:String,
    variants: "primary" | "secondary" | "tertiary",
    staricon?: ReactElement,
    onClick?: () => void,
    size?:"sm" | "md" | "lg",
    loading?:boolean,
    fullWidth?:boolean

}

const variantClasses = {
    "primary": "bg-purple-600 text-white w-40",
    "secondary": "bg-gray-200 text-purple-600 w-40", 
    "tertiary": "bg-gray-300 text-purple-600 font-semibold w-30"
};

const defaultStyles =  "items-center px-4 py-2 rounded-md font-light flex space-between  h-10 justify-around";   

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}

export function Button(props:ButtonProps){
    return (
        <button onClick={props.onClick} className={`${variantClasses[props.variants]} ${defaultStyles} ${props.loading ? "opacity-45" : ""} ${props.fullWidth ? " w-full flex justify-center" : ""}` } disabled={props.loading}>
            {props.staricon && <div>
                {props.staricon}
            </div>}
            <div>
                {props.text}
            </div>
        </button>
    )
}
