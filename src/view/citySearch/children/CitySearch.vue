<template>
  <div class="city-search">
      <div class="city">{{$store.getters.address.city}}</div>
      <div><input v-model='search' type="text" placeholder="请输出城市名"></div>

    <div class="result" v-if="search">
      <div v-for="(item,index) in showCityList" :key="index">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CitySearch",
  data(){
    return{
      search:'',
      allCity:[],
      showCityList:[]
    }
  },
  props:{
    city:{}
  },
  watch:{
    //查询符合条件的城市
    search() {
      this.city.key.forEach(it=>{
        this.city.allCity[it].forEach(item=>{
          this.allCity.push(item.name)
        })
      })
      this.showCityList=this.allCity.filter(items=>{
        return items.indexOf(this.search)!==-1;
      })
      this.$emit('load',this.search)
    }
  }
}
</script>

<style scoped>
.city-search{
  margin-top: .2rem;
  width: 7rem;
  align-items: center;
  display: flex;
  height: .6rem;
}
input,.city-search{
  background-color: silver;
  border-radius: .3rem;
  outline: none;
  border: none;
}
input{
  width: 5rem;
}
.result{
  position: absolute;
  top: 1rem;
  width: 7.1rem;
}
.result div{
  border-bottom: 1px solid silver;

}
</style>
