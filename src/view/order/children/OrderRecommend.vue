<template>
  <div class="recommend" ref="recommend" v-if="recommend.length===1">
    <div>{{recommend[0].name}}</div>
      <div class="container">
        <div v-for="(item,index) in recommend[0].items" :key="index">
          <!--        商品图-->
          <div>
            <img :src="item.image_path" alt="" >
          </div>
          <!--        商品名-->
          <div class="goods-title">
            <span >{{item.name}}</span>
          </div>
          <!--        销售情况-->
          <div  class="sale-info">
            <span>月售{{item.month_sales}}</span>
            <span>好评率{{item.satisfy_rate}}%</span>
          </div>
          <!--        商品价格-->
          <div class="goods-price">
            <div>￥{{item.activity.fixed_price}}</div>
            <Button @click.native="addCart(item)" class="button"/>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Button from "@/components/content/button/Button";
//导入混入
import {orderMixins} from "@/content/mixins/order/order";

export default {
  name: "OrderRecommend",
  props:{
    recommend:{}
  },
  components:{
    Button,
  },
  mixins:[orderMixins],
}
</script>

<style scoped>
.container{
  text-align: center;
  display: flex;
  padding: 0 .1rem;
  overflow: hidden;
}
img{
  width: 2.5rem;
}

/*销售情况*/
.sale-info{
  text-align:left;
  color:lightgrey;
}
.sale-info span:nth-child(1){
  margin-right: .1rem;
}
/*商品价格*/
.goods-price{
  color:crimson;
  display: flex;
  justify-content: space-between;
}
.button{
  padding-right: .1rem;
}

</style>
