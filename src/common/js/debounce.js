export function debounce(fn,time){
    let timer=null;
    let self=this;
    let arg=arguments;
    return ()=>{
        if(timer) clearTimeout(timer);
        timer=setTimeout(()=>{
            fn.apply(self,arg);
        },time)
    }
}
