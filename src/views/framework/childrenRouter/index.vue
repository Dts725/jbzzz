<template>
  <div class="pr">
    <div class="top-center pa ">

    </div>
    <div class="body pr">
      <div class="attend-line-party-border pa"></div>
      <ul class="flex-space-nowarp party  padd20 overflow-auto">
        <li v-for="(el ,index) in data" :key="index" class="pr flex" @click="router(el,el.child.length)">
          <div class="attend-line-center pa"></div>
          <p class="attend-oval-party attend-oval-color attend-oval">{{el.organization_name}}</p>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import framework from "./attendComment";
import http from "@/api/http";

export default {
  name: "index",
  components: {
    framework
  },
  data() {
    return {
      data: null,
      datas: null
    };
  },
  created() {
    this.init();
  },
  activated() {
    this.init();
  },

  methods: {
    init() {
      http.get("/organization").then(res => {
        this.data = res.data.data;
      });
    },

    //点击跳转路由
    router(id,flag) {

      this.$store.commit('BREAD_SID_ID',id)
      if(flag) {
        this.$router.push("/framework/framework/frameworkThree");
      } else {
        this.$router.push('/framework/framework/frameworkFirst');
      }

    }
  }
};
</script>

<style lang="scss" scoped>
  .padd20 {
    padding: 0 20px 20px;
  }

.top-center {
  width: 2px;
  height: 2rem;
  top: -2rem;
  left: 50%;
  transform: translate(-1px);
  background-color: #d40e19;
}
.body {
  margin-top: 100px;
}

 .party>li:nth-last-of-type(1)>div {
    width: 0px;
    // margin-left: 0;
  }


</style>
