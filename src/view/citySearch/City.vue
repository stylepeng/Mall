<template>
  <div class="address" >
    <CitySearch :city="searchList" @load="hidden"/>
      <CityList :city="cityList" ref="cityList"/>
  </div>
</template>

<script>
import CitySearch from "@/view/address/children/CitySearch";
import CityList from "@/view/address/children/CityList";

import {address,City} from "@/network/address";
export default {
  name: "Address",
  data(){
    return{
      cityList:{},  //储存城市列表信息
      searchList:{}
    }
  },
  components:{
    CitySearch,
    CityList,
  },
  created() {
    this.address();
  },
  methods:{
    //搜索框有内容时隐藏cityList组件
    hidden(value){
      if(value){
        this.$refs.cityList.isShow=false;
      }else{
        this.$refs.cityList.isShow=true;
      }
    },
    //网络请求
    address(){
      address().then(res=>{
        //储存城市列表信息
        this.cityList=new City(res.data);
        this.searchList=new City(res.data)
      })
    }
  },
}
</script>

<style scoped>
.address{
  height: 100%;
}
.address{
  margin:0 0.2rem;
}
</style>
