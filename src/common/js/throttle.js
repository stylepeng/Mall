export function throttle(fn,time){
    let nowTime=Date.now();
    let offset=0;
    let self=this;
    let arg=arguments;
    return ()=>{
        if(nowTime-offset>time){
            fn.apply(self,arg);
            offset=nowTime;
        }
    }
}
