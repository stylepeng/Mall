<template>
  <div class="myAddress">
    <NavBar background-color="lightskyblue">
      <template #left>
        <span @click="$router.go(-1)">返回</span>
      </template>
      <template #center>
        <span>我的地址</span>
      </template>
    </NavBar>

    <UserInfo :userInfo="info" @btnClick="btnClick" @click="deleteUser"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import UserInfo from "@/view/userAddress/UserInfo";

//请求
import {userAddress,deleteAddress} from "@/network/userAddress";
export default {
  name: "MyAddress",
  data(){
    return{
      info:{}
    }
  },
  components:{
    NavBar,
    UserInfo
  },
  created() {
    console.log('aa');
  },
  beforeRouteEnter(to,from,next){
    next(vm => {
      vm.userInfo()
    })
  },
  methods:{
    /*
    *事件
     */
    //编辑用户信息
    btnClick(item){
      this.$router.push({
        path:'/addAddress',
        query:{
          addressInfo:item
        }
      })
    },


    //网络请求
    //用户信息
    userInfo(){
      userAddress().then(res=>{
        this.info=res.data;
        console.log(this.info);
      })
    },

    //删除用户的信息
    deleteUser(id){
      deleteAddress(id).then(res=>{
        this.info=res.data;
      })
    }
  },
}
</script>
<style scoped>

</style>
