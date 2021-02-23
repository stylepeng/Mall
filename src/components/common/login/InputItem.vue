<template>
  <div class="input">
    <input :type="type"  :class="{cancel:isCancel}" @input="$emit('input',$event.target.value)" :placeholder="placeholder">
    <button v-if="isShow" :disabled="disabled" @click="$emit('btnClick')">{{title}}</button>
<!--    错误的提醒-->
    <div>
      <span v-if="error">{{error}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputItem",
  props:{
    title:String,
    disabled:{
      type:Boolean
    },
    placeholder:String,
    isShow:{
      default:true,
      type:Boolean
    },
    error:String,
    type:{
      default:'text'
    },
    isCancel:{
      default:false
    }
  },
}
</script>

<style scoped>
input{
  width: 6rem;
  height: .5rem;
}
button{
  position: absolute;
  left: 4.55rem;
  top: .65rem;
  outline: none;
  border: none;
}
.cancel{
  outline: none;
  border: none;
}
.input{
  margin-bottom: .2rem;
}
.errorColor{
  border: .01rem crimson solid;
}
</style>
