<template>
  <div class="recommend" v-if="recommend">

    <!--    遮罩层-->
    <div class="shade" @click="cancelShade" v-if="showShade"></div>
<!--    推荐商家顶部导航条-->
      <div class="container">
        <div v-for="(item,index) in recommend.navTab" :key="index" @click="revise(index,item)">
          <span :style="count===index?{color:activeColor}:''">{{item.name}}</span>
        </div>
      </div>
<!--    排序的内容-->
    <div class="sorting">
<!--综合排序-->
      <div class='multiple' v-if="showMultiple">
        <div v-for="(item,index) in recommend.sortBy" :key="index">
          <span :style="sorting===index?{color:activeColor}:''" @click="sortCondition(index,item)">{{item.name}}</span>
        </div>
      </div>

<!--  筛选    -->
      <div v-if="screen" class="screen">
        <div  v-for="(item,index) in recommend.screenBy" :key="index">
          <div>{{item.title}}</div>
            <ul class="screen-container">
              <li v-for="(it,i) in item.data" :key="i" @click="choose(it,item)" :class="{activeClass:it.select}">
                <img v-if="it.icon" :src="it.icon" alt="">
                <span>{{it.name}}</span>
              </li>
            </ul>
        </div>

        <div class="button">
          <div @click="cancel" :disabled="isCancel" >取消</div>
          <div @click="filterOK">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  data(){
    return{
      count:0,  //保存推荐商家顶部导航条的情况
      showShade:false,  //记录是否显示遮罩
      sorting:0,  //综合排序点击的情况
      showMultiple:false, //记录综合排序的内容是否显示
      screen:false,  //记录筛选内容是否显示
      isCancel:true,  //设置取消按钮的禁用状态
    }
  },
  props:{
    recommend:{},
    activeColor: {
      default:'black'
    }
  },
  methods:{
    //设置综合排序的样式
    sortCondition(index,item){
      this.sorting=index;
      this.showMultiple=false;
      this.showShade=false
      //修改顶部导航条的综合排序的内容
      this.recommend.navTab[0].name=item.name;
      this.$emit('update', {condition:item.code});
    },

    //动态设置点击的样式
    revise(index,item){
      this.count=index;
      //向父组件发送事件
      this.$emit('btnClick');
      //根据index,向父组件发送数据更新的请求
      switch (index){
        case 0:
          //遮罩是否显示
          this.showShade=!this.showShade;
          this.showMultiple=!this.showMultiple;
          this.screen=false;
          break;
        case 1:
          this.$emit('update', {condition:this.recommend.navTab[1].condition});
          break;
        case 2:
          this.$emit('update', {condition:this.recommend.navTab[2].condition});
          break;
        case 3:
          //遮罩是否显示
          this.showShade=!this.showShade;
          this.showMultiple=false;
          this.screen=!this.screen;
          break;
      }
    },
    //取消遮罩层
    cancelShade(){
      this.showShade=false;
      this.showMultiple=false;
      this.screen=false;
    },

    //设置筛选的内容
    choose(item,screen){
      if(screen.id==='MPI'){
        item.select=!item.select
      }else{
        screen.data.forEach(it=>{
          it.select=false;
        })
        item.select=!item.select;
      }
      if(item.select) this.isCancel=false;
    },

    //(按钮区域)设置所有的select属性为false
    cancel(){
      this.recommend.screenBy.forEach(screen=>{
        screen.data.forEach(item=>{
          item.select=false;
        })
      })
    },

    //筛选的内容请求
    filterOK(){
      let filter={
        MPI:'',
        offer:'',
        per:''
      }
      let service='';
      this.recommend.screenBy.forEach(screen=>{
        screen.data.forEach(item=>{
          if(item.select){
            if(screen.id!=='MPI'){
              //单选
              filter[screen.id]=item.code;
            }else{
              //多选
              service+=item.code+',';
              filter[screen.id]=service;
            }
          }
        })
      })
      this.$emit('update',{condition:filter})
    }
  },
}
</script>

<style scoped>
.recommend{
  margin-top: .2rem;
}
div{
  color:gray;
}
.shade{
  position: fixed;
  background-color: silver;
  height: 100%;
  width: 100%;
  line-height: 100%;
  top: 0;
  z-index: 2;
}
.container{
  display: flex;
  justify-content: space-between;
  padding-bottom: .2rem;
}
.container,.sorting{
  position: relative;
  z-index: 5;
  background-color: white;
}
.screen-container{
  display: flex;
  flex-wrap: wrap;
}
img{
  height: .2rem;
  margin-right: .1rem;
}
li{
  list-style: none;
  width: 2rem;
  height: .4rem;
  margin: .2rem;
  line-height: .4rem;
  text-align: center;
  background-color:lightgray;
}
.multiple div{
  margin-bottom: .2rem;
}
.activeClass{
  background-color:lightskyblue;
  color:dodgerblue;
}
.button{
  display: flex;
}
.button div{
  flex: 1;
  line-height: .5rem;
  text-align: center;
}
.button div:nth-child(2){
  background-color: lightskyblue;
}
</style>
