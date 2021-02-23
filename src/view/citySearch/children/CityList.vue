<template>
  <div class="list" v-if="isShow">
<!--    当前的定位-->
    <BScroll ref="scroll" class="scroll">
      <div>
        <div>当前的定位</div>
        <div>{{$store.getters.address.formatted}}</div>
      </div>
  <!--    热门城市信息-->
        <div>
          <div >热门城市</div>
          <div class="hotCity" ref="alphabet">
            <div v-for="(item,index) in city.hotCities" :key="index" class="hotCityList">
              <span @click="revise(item.name)">{{item.name}}</span>
            </div>
          </div>
        </div>
    <!--    其他城市信息-->
        <div v-for="(item,index) in city.key" :key="index">
          <div class="otherCity" ref="alphabet">{{item}}</div>
          <div v-for="(it,i) in city.allCity[item]" :key="i" class="cityList" >
            <div>{{it.name}}</div>
          </div>
        </div>
    </BScroll>
    <!--    字母表-->
    <div class="alphabet">
      <div  @click="jump(0)">#</div>
      <div v-for="(item,index) in city.key" :key="index" @click="jump(index+1)">
        {{item}}
      </div>
    </div>
    </div>
</template>

<script>
import BScroll from "@/components/common/BScroll/BScroll";
export default {
  name: "CityList",
  data(){
    return{
      isShow:true
    }
  },
  components:{
    BScroll
  },
  props:{
    city:{},
  },
  updated() {
    //重新计算滚动的范围
    if(this.isShow){
      this.$refs.scroll.refresh();
    }

  },
  methods:{
    //跳转到指定的元素
    jump(index){
      this.$refs.scroll.jump(this.$refs.alphabet[index-1],250);
    }
  }
}
</script>

<style scoped>
.hotCity{
  display: flex;
  flex-wrap: wrap;
  line-height: .5rem;
  text-align: center;
}
.hotCityList{
  background-color: silver;
  width: 1rem;
  margin:.2rem .5rem;
}
.otherCity{
  margin-bottom: .2rem;
}
.cityList{
  margin-bottom: .2rem;
  border-bottom: .01rem solid silver;
}
.alphabet{
  position:fixed;
  right: .2rem;
  top: 1.5rem;
  text-align: center;
}
.alphabet div{
  margin-bottom: .05rem;
}
.list,.scroll{
  height: 100%;
}
</style>
