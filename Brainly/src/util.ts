export function linkstring(num:number){
    let ans=""
    let options = "QWERTYUIOPasdfghjklZXCVBNM1234567890"
    let length = options.length
    for(let i=0;i<num;i++){
        ans+=options[Math.floor(Math.random()*length)]
    }
    return ans;
}