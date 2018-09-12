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
        data: null,

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
        http.get('/organization/'+ this.$store.state.nav.id.id).then(res => {
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
</style>
