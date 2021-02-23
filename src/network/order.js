import {request} from "@/network/request";

//订餐页面的数据
export function orderInfo(){
    return request({
        url:"/api/profile/batch_shop"
    })
}
