interface inputProps{
    reference?:any,
    placeholder:string,
}

export function Input(props:inputProps){
    return(
        <div className="flex justify-center">
            <input type="text" placeholder={props.placeholder} ref={props.reference} className="w-full px-4 py-2 border rounded m-2"/>
        </div>
    )

}
