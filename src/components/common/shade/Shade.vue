<template>
  <div class="shade" :style="{top:top}" :disabled="disabled"></div>
</template>

<script>
export default {
  name: "Shade",
  props:{
    top:{
      default:0
    },
    disabled:{
      type:Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.shade{
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(128,128,128,.4);
}
</style>
