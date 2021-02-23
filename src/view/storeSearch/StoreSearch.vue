<template>
  <div class="store-search">
    <NavBar background-color="cornflowerblue">
      <template #left>
        <span @click="$router.go(-1)">返回</span>
      </template>
      <template #center>
        <span>搜索</span>
      </template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "StoreSearch",
  components:{
    NavBar
  }
}
</script>

<style scoped>

</style>
