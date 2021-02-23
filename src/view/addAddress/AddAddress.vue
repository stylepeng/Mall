<template>
  <div class="add_address">
      <NavBar background-color="lightskyblue">
        <template #left>
          <span>返回</span>
        </template>
        <template #center>
          <span>{{title}}</span>
        </template>
      </NavBar>
    <div v-if="isShow">
      <Input label="联系人" placeholder="姓名" v-model="addressInfo.name"/>
      <div class="tag sex">
        <div>
          <strong></strong>
        </div>
        <Tag :tag="sex1" :select-item="addressInfo.sex" @btnClick="getSex" v-model="addressInfo.sex"/>
      </div>
      <Input label="电话" placeholder="手机号码" v-model="addressInfo.phone"/>
      <Textarea label="地址" placeholder="小区/学校/写字楼等" v-model="addressInfo.address" @click.native="isShow=false"/>
      <Textarea label="门牌号" placeholder="10号楼五层506房" v-model="addressInfo.bottom"/>
      <div class="tag">
        <div>
          <strong>标签</strong>
        </div>
        <Tag :tag="tag1" :select-item="addressInfo.tag" @btnClick="btnClick" v-model="addressInfo.tag"/>
      </div>

      <!--确定按钮-->
      <AddressButton @click.native="saveInfo"/>
    </div>

<!--    搜索框-->
    <div class="search" v-else>
      <AddressSearch :is-show="false" :cancel="true" @btnClick="chooseAddress" @click="cancel"/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Input from "@/components/content/Input/Input";
import Textarea from '@/components/content/textarea/Textarea'
import Tag from "@/components/content/tag/Tag";
import AddressSearch from "@/components/content/addressSearch/AddressSearch";
import AddressButton from "@/view/myAddress/AddressButton";

//网络
import {addAddress,editAddress} from "@/network/userAddress";

export default {
  name: "AddAddress",
  data(){
    return{
      addressInfo:{
        name:'',
        phone:"",
        address:"",
        bottom:"",
        sex:"",
        tag:'',
      },
      sex1:['男士','女士'],
      tag1:['家','学校','公司'],
      isShow:true,
      title:'添加地址'
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm => {
      vm.addressInfo=to.query.addressInfo
      vm.title='编辑地址'
    })
  },
  components:{
    NavBar,
    Input,
    Textarea,
    Tag,
    AddressSearch,
    AddressButton
  },
  methods:{
    //动态决定标签的颜色
    btnClick(item){
      this.selectItem=item;
      this.addressInfo.tag=item;
    },

    //获取用户的性别
    getSex(item){
      this.selectItem=item;
      this.addressInfo.sex=item;
    },

    //设置搜索框隐藏
    cancel(){
      this.isShow=true;
    },

    //用户地址的选择
    chooseAddress(data){
      this.addressInfo.address=data;
      this.isShow=true;
      console.log(data);
    },

    //用户地址的信息
    saveInfo(){
      if(this.title==='编辑地址'){
        //编辑地址
        editAddress(this.addressInfo._id,this.addressInfo).then(res=>{
          this.$router.push('/myAddress')
        })
      }else{
        //添加地址
        addAddress(this.addressInfo).then(res=>{
          if(this.addressInfo){
            this.$router.push('/myAddress')
          }
        })
      }
    },
  }
}
</script>

<style scoped>
.sex{
  margin-top: .2rem;
}
.tag{
  display: flex;
  line-height: .8rem;
  align-items: center;
  padding: 0 .2rem;
}
.tag div:nth-child(1){
  width: 1rem;
}
/*搜索*/

</style>
