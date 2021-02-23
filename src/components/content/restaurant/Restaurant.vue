<template>
  <div >
    <ImageBox v-for="(item,index) in restaurant" :key="index" class="restaurant">
       <div class="container">
         <!--左侧图片-->
         <div>
           <img :src="item.image_path" alt="" @load="load">
         </div>

         <!--        右侧内容-->
         <div class="context">
           <!--it          第一行-->
           <div>
             <span v-if="item.is_premium" style="background-color: yellow">品牌</span>
             <span>{{item.name}}</span>
           </div>
           <!--          第二行-->
           <div class="second">
             <div>
               <span>{{item.rating}}</span>
               <span>月售{{item.rating_count}}单</span>
             </div>

             <div v-if="item.delivery_mode">
               <span>{{item.delivery_mode.text}}</span>
             </div>
           </div>
           <!--        第三行-->
           <div class="third">
             <div>
               <span>￥{{item.float_minimum_order_amount}}起送</span>
               <span>配送费￥{{item.float_delivery_fee}}</span>
             </div>
             <div>
               <span>{{(item.distance/1000).toFixed(2)}}km</span>
               <span>{{item.order_lead_time}}分钟</span>
             </div>
           </div>
         </div>

       </div>
    </ImageBox>
  </div>
</template>

<script>
import {Loadmore} from 'mint-ui'
import ImageBox from "@/components/content/imgBox/ImageBox";
export default {
  name: "Restaurant",
  props:{
    restaurant:{}
  },
  components:{
    ImageBox
  },
  methods:{
    load(){
      this.$emit('load')
    }
  }
}
</script>

<style scoped>
.restaurant{
  margin-bottom: .1rem;
}
.container{
  display: flex;
}
.context{
  margin-left: .2rem;
  width: 6rem;
}
/*右侧内容*/
.second,.third{
  display: flex;
  justify-content: space-between;
  margin: .2rem 0;
}
.second div:nth-child(2){
  color: white;
  background-color:deepskyblue ;
}
span{
  margin-right: .2rem;
}
</style>
