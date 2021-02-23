<template>
  <div v-if="category" class="cate" >
    <div class="category" >
      <!--    左侧分类栏-->
      <BScroll class="scroll">
        <div class="left-category" ref="control">
          <div @click="jump(index)" v-for="(item,index) in category" :key="index" :class="count===index?'active':''">
            <img v-if="item.icon_url" :src="item.icon_url" alt="">
            <span>{{item.name}}</span>
          </div>
        </div>
      </BScroll >
      <!--    右侧内容-->
      <BScroll class="scroll" ref="scroll" :probe-type="3" @scroll="scrollPosition">
        <div class="title">
          <div v-for="(it,i) in category" :key="i">
        <span ref="category">
          <strong ref="title" >{{it.name}}</strong>
        </span>
            <span>{{it.description}}</span>
            <div v-for="(item,index) in it.foods" :key="index" >
              <div class="right-category"  >
                <!--          图片-->
                <div>
                  <ImageBox>
                    <img :src="item.image_path" alt="" @load="loadChange" @click="jumpDetail(item.item_id)">
                  </ImageBox>
                </div>
                <!--          内部内容区域-->
                <div class="container">
                  <div >{{item.name}}</div>
                  <p>{{item.description}}</p>
                  <p>
                    <span>月售{{item.month_sales}}份</span>
                    <span>好评率{{item.satisfy_rate}}%</span>
                  </p>
                  <div class="sell-price">
                    <div>￥{{item.specfoods[0].price}}</div>
                    <Button @click.native="addCart(item)"></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BScroll>
    </div>

  </div>
</template>

<script>
//组件
import ImageBox from "@/components/content/imgBox/ImageBox";
import Button from "@/components/content/button/Button";
import BScroll from "@/components/common/BScroll/BScroll";
//混入
import {orderMixins} from "@/content/mixins/order/order";

export default {
  name: "OrderCategory",
  data(){
    return{
      isShow:false,
      title:['点餐','评价','商家'],
      offset:Number,
      leftHeight:[],  //左侧分类栏各个高度
      count:0
    }
  },
  props:{
    category:{}
  },
  mixins:[orderMixins],
  components:{
    ImageBox,
    Button,
    BScroll,
  },
  updated() {
    this.$refs.scroll.refresh();
  },
  watch:{
    category(){
      this.$nextTick(()=>{
        this.leftCategory();
      })
    }
  },
  methods: {
    loadChange() {
      this.$refs.scroll.refresh();
    },

    //右侧内容12个标题的位置
    leftCategory(){
      let categoryList=this.$refs.category;
      for(let i=0;i<categoryList.length;i++){
        let height=categoryList[i].offsetTop-categoryList[0].offsetTop;
        this.leftHeight.push(height);
      }
      this.leftHeight.push(Number.MAX_VALUE )
    },

    //跳转到指定的位置
    jump(index){
      this.$refs.scroll.jump(this.$refs.title[index],200)
    },

    //获取滚动的位置
    scrollPosition(position){
      for(let i=0;i<this.leftHeight.length;i++){
        if(position<this.leftHeight[i+1]&&position>=this.leftHeight[i]){
          this.count=i;
        }
      }
    },

    //跳转到详情页
    jumpDetail(id){
      this.$router.push({
        path:'/detail',
        query:{id}
      })
    },
  }
}
</script>

<style scoped>
.category{
  display: flex;
  overflow-y: hidden;
}
/*左侧分类*/
.left-category{
  line-height: .8rem;
  width: 1.2rem;
  margin-left: .1rem;
  background-color: seashell;
}
.left-category div{
  margin: .1rem 0;
}
.left-category img{
  width: .2rem;
}
.active{
  background-color: #9a6e3a;
}
/*右侧标题*/
.title{
  width: 6rem;
  margin-left: .2rem;
}
.title span:nth-child(2){
  color:lightgrey;
  margin-left: .1rem;
}
/*内部内容区域*/
.container p{
  color:lightgrey;
}
.right-category{
  display: flex;
}
.sell-price{
  width: 4.8rem;
  color:crimson;
  display: flex;
  justify-content: space-between;
}
/*设置滚动的范围*/
.category,.cate,.scroll{
  height: calc(100% - .4rem)
}
/*选项卡*/
.tab-control{
  left: 0;
  right: 0;
  z-index:9;
  top:0;
  display: inherit;
  position: sticky;
  background-color: white;
}
</style>
