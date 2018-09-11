<template>
  <div>
    <framework :props-data="data"></framework>
  </div>
</template>

<script>
  import framework from './attendComment'
  import http from "@/api/http";

  export default {
    name: "frameworkFirst",
    components: {
      framework
    },
    data() {
      return {
        data: {
          name1: ["牵头部门", "党支部", "党支部书记", "副书记", "委员"],
          dangyuang: ["党员哈哈哈", "党员不吗哈哈哈m", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员哈哈哈"]
        }
      }
    },
    created() {
      this.init();
    },
    activated() {
      this.init();
    },

    methods : {
      init () {
        http.get('/organization?id='+ this.$route.query.partyId).then(res => {
          console.log(res)
          console.log("111111111111111111111111111111")
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  ul {
    padding: 0;
  }

  .contian {
    // background-color: yellow;
  }

  .party>li:nth-last-of-type(1)>div {
    width: 0;
  }
</style>
