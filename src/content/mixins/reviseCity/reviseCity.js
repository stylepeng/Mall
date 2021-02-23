export const reviseCity={
    methods:{
        //修改vuex用户地址的信息，并返回上一级
        revise(item){
            this.$store.dispatch('reviseCity',item)
            this.$router.go(-1);
        },
    },
}
