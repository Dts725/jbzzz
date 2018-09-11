<template>
  <div class="pr">
    <div class="top-center pa ">

    </div>
    <div class="body">
      <ul class="flex-space-nowarp party attend-line-party-border overflow-auto">

        <li v-for="(el ,index) in data" :key="index" class="pr flex" @click="router(el.id,el.child.length)">
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
      data: {
        name1: [],
        dangyuang: [
          "工程项目组临时支部",
          "工程项目组临时支部",
          "工程项目组临时支部",
          "工程项目组临时支部",
          "工程项目组临时支部",
          "工程项目组临时支部",
          "工程项目组临时支部",
          "工程项目组临时支部"
        ]
      },
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
      if(flag) {
        this.$router.push({path :"/framework/framework/frameworkThree",query : {partyId : id}});
      } else {
        this.$router.push({path:'/framework/framework/frameworkFirst',query : {partyId : id}});
      }

    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
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

// .party>li:nth-last-of-type(1)>div {
//   width: 0;
// }
</style>
