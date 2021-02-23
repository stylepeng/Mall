<template>
  <div class="info" v-if="userInfo">
    <div v-for="(item,index) in userInfo.myAddress" :key="index">
      <div>
        <span>
          <strong>{{item.name}}</strong>
        </span>
        <span>{{item.sex}}</span>
        <span>{{item.phone}}</span>
      </div>
      <div class="card-address">
        <span>{{item.tag}}</span>
        <span>{{item.address}}</span>
        <i class="iconfont icon-edit" @click="jump(item)"></i>
        <i class="iconfont icon-delete" @click="click(item._id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props:{
    userInfo:{}
  },
  methods:{
    jump(item){
      this.$emit('btnClick',item);
    },
    click(id){
      this.$emit('click',id);
    }
  }
}
</script>

<style scoped>
.card-address span:nth-child(1){
  border: .01rem solid orange;
  color:orange;
}
div{
  margin-bottom: .1rem;
}
span{
  margin-left: .1rem;
}
</style>
