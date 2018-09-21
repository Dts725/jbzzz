<template>
  <div>
    <framework :props-data="data" :show-party="true"></framework>
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
        data: null,
        showDialog: false

      }
    },
    created() {
      this.init();
    },
    activated() {
      this.init();
    },
    deactivated() {
      this.showDialog = false

    },
    beforeDestroy() {
      this.showDialog = false

    },
    methods: {
      init() {
        http.get('/organization/' + this.$store.state.nav.id.id).then(res => {
          this.data = res.data;
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

//   .attend-oval-party {
//   border-radius: 100px;
//   margin-left: 2rem;
//   background-color: #d40e19;
//   padding:01.2rem 0.6rem;
//   margin-top: 3rem;
//   cursor: pointer;
// }
</style>


