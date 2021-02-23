import {request} from "@/network/request";

export function addAddress(address){
    return request({
        url:`/api/user/add_address/${localStorage.token}`,
        data:address,
        method:'post'
    })
}
