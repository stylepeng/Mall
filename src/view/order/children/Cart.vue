<template>
  <div>
    <div class="cart">
      <div @click="sendEvent">
        <svg v-if="showCart">
          <use xlink:href="#icon-che-copy"></use>
        </svg>
        <svg v-else>
          <use xlink:href="#icon-che-copy1"></use>
        </svg>
        <div v-if="$store.getters.goodsList.length===0">未选购商品</div>
        <div v-else>￥{{total_price}}</div>
        <div>另需配送费5元</div>
      </div>
      <div >
        <span v-if="showCart">￥20元起送</span>
        <div class="right"  v-else>
          <span>去结算</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data(){
   return{
     isShow:true,
   }
  },
  computed:{
    //是否显示购物车商品信息
    showCart(){
      return this.$store.getters.goodsList.length===0
    },
    //计算商品的总价格
    total_price(){
      return this.$store.getters.goodsList.reduce((per,item)=>{
        return per+item.count*item.price;
      },0).toFixed(2);
    }
  },
  methods:{
    //向父组件发送事件
    sendEvent(){
      if(this.$store.getters.goodsList.length!==0){
        this.$emit('btnClick');
      }
    }
  }
}
</script>

<style scoped>
.cart{
  height: 1rem;
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 0 .2rem;
  z-index: 7;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  align-items: center;
  background-color: darkgrey;
}
.cart div:nth-child(1){
  margin-left: 1.5rem;
}
svg{
  width: .7rem;
  position: fixed;
  bottom: -.9rem;
  z-index: 8;
  left:.6rem;
}
.right{
  color: white;
  width: 2rem;
  height: .5rem;
  line-height: .5rem;
  background-color: cornflowerblue;
  border-radius:.5rem;
}
</style>
