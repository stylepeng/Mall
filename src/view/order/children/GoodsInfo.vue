<template>
  <div class="info" v-if="isShow">
    <NavBar>
      <template #left>
        <span>已选的商品</span>
      </template>
      <template #right>
        <span @click="clearGoods">清空</span>
      </template>
    </NavBar>
    <NavBar v-for="(item,index) in $store.getters.goodsList" :key="index">
      <template #left>
        <span>{{item.name}}</span>
      </template>
      <template #center>
        <span>￥{{(item.price*item.count).toFixed(2)}}</span>
      </template>
      <template #right>
        <Button :disabled="item.count===1" @click.native="deleteCount(item)" symbol="-"/>
        <span>{{item.count}}</span>
        <Button @click.native="addCount(item)"/>
      </template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Button from "@/components/content/button/Button";

export default {
  name: "GoodsInfo",
  data(){
    return{
      isShow:false
    }
  },
  components:{
    NavBar,
    Button
  },
  deactivated() {
    this.isShow=false;
  },
  methods:{

    //增加商品的数量
    addCount(item){
      this.$store.dispatch('addCount',item)
    },

    //减少商品的数量
    deleteCount(item){
      this.$store.dispatch('deleteCount',item)
    },

    //清空所有的商品
    clearGoods(){
      this.$store.dispatch('clearGoods')
      this.isShow=false;
    },

    //设置商品信息的隐藏
    cancelInfo(){
      this.isShow=!this.isShow;
    }
  }
}
</script>

<style scoped>
.info{
  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;
}
span{
  margin: 0 .1rem;
}
</style>
