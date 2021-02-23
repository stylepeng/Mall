<template>
  <div class="order">
      <OrderRecommend :recommend="recommend"/>
    <OrderCategory :category="category"/>
    <GoodsInfo ref="goodsInfo"/>
    <Cart @btnClick="cancelCartInfo"/>
  </div>
</template>

<script>
//组件的导入
import OrderRecommend from "@/view/shop/children/orderChildren/OrderRecommend";
import OrderCategory from "@/view/shop/children/orderChildren/OrderCategory";
import Cart from "@/view/shop/children/orderChildren/Cart";
import GoodsInfo from "@/view/shop/children/orderChildren/GoodsInfo";
//网络请求的导入
import {orderInfo} from "@/network/order";
export default {
  name: "Order",
  data(){
    return{
      recommend:{}, //推荐数据
      category:{},  //分类数据
    }
  },
  created() {
    this.orderInfo()
  },
  components:{
    OrderRecommend,
    OrderCategory,
    GoodsInfo,
    Cart
  },
  methods:{
    /*
    * 事件
    * */

    //隐藏购物车信息
    cancelCartInfo(){
      this.$refs.goodsInfo.cancelInfo();
    },

    /*
    * 网络请求
    * */
    orderInfo(){
      orderInfo().then(res=>{
        //储存推荐列表的数据
        this.recommend=res.data.recommend;

        //分类数据
        this.category=res.data.menu;
      })
    }
  },
}
</script>

<style scoped>
.order,.scroll{
  height: 100%;
  width: 100%;
}
</style>
