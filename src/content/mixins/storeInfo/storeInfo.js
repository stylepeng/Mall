import {recommend, store} from "@/network/home";

export const storeMixins={
    updated() {
        this.$refs.scroll.refresh();
    },
    data(){
        return{
            recommendValue:{},  //储存推荐列表数据
            restaurant:{
                page:0,
                size:5,
                info:[],  //店铺的数据
            },  //分页请
        }
    },
    methods:{
        recommend(){
            //推荐列表数据的请求
            recommend().then(res=>{
                this.recommendValue=res.data;
            })
        },
        //店铺数据的请求
        store(){
            this.restaurant.page++;
            store(this.restaurant.page,this.restaurant.size).then(res=>{
                res.data.forEach(item=>{
                    this.restaurant.info.push(item.restaurant)
                })
            })
            console.log(this.restaurant.info);
        },
    }
}
