<template>
  <div class="search">
<!--    搜索框-->
    <SearchBox>
      <div class="search-box">
        <span @click="$router.push('/city')">{{$store.getters.address.city}}</span>
        <span> |</span>
        <input type="text" placeholder="小区/学校/地名" v-model="place">
      </div>
    </SearchBox>
<!--    当前的定位-->
    <div class="current">
      <div>当前的定位</div>
      <div class="currentPosition">
        <span>{{$store.getters.address.street}}</span>
        <span style="color: cornflowerblue" @click="userPosition">重新定位</span>
      </div>
    </div>
<!--    搜索提示的内容-->
    <div v-if="searchResult" class="tips-container">
      <div v-for="(item,index) in searchResult" :key="index" class="tips" @click="jump(item)">
        <div><strong>{{item.name}}</strong></div>
        <div>{{item.district}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import SearchBox from "@/components/common/searchBox/SearchBox";

import {mapMixins,place} from "@/common/mixins/map/map";

export default {
  name: "AddressSearch",
  data(){
    return{
      place:'',
      searchResult:{
      }
    }
  },
  mixins:[mapMixins,place],
  components:{
    SearchBox
  },
  methods:{
    //修改vuex里面的数据，并且返回上一个路径
    jump(item){
      let data=item.district+item.name
      this.$store.dispatch('revise',data)
      this.$router.go(-1);
    }
  },
}
</script>

<style scoped>
.search-box{
  border: none;
  outline: none;
  margin-top: .1rem;
  background-color:lavender;
  width: 6rem;
  height: .7rem;
  border-radius: .3rem;
}
.current div:nth-child(1){
  color: silver;
}
.current div{
  margin-top: .1rem;
}
.currentPosition{
  display: flex;
  justify-content: space-between;
  padding-bottom: .1rem;
}
.tips{
  border-bottom: 1px solid silver;
}
.tips,.tips div{
  margin-top: .1rem;
}
.tips div:nth-child(2){
  border-bottom: .1rem;
}
</style>
