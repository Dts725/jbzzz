<template>
  <div class="titleData">
    <div style="font-size:30px;">
      <img src="../../../../static/logo.png" alt="">
      <span>进博一线党建管理系统</span>
    </div>
    <div class="avatar-wrapper">
      <span v-if="username" style="cursor: default;margin-right:1rem;">
        用户名：{{username}}</span>
      <!--<span style="cursor: default;margin-right:1rem;">{{dateAndWeek}}</span>-->
      <span @click="logout" style="margin-right: 0.5rem;    cursor: pointer;">退出</span>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { getName } from "@/utils/auth";
import http from '@/api/http';

export default {
  data() {
    return {
      dateTime: new Date(),
      username: ""
    };
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    dateAndWeek: {
      get: function() {
        let _this = this;
        let showTime = "",
          showDate = "";
        var week = [
          "星期天",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ];
        var cd = new Date(this.dateTime);
        showTime =
          zeroPadding(cd.getHours(), 2) +
          ":" +
          zeroPadding(cd.getMinutes(), 2) +
          ":" +
          zeroPadding(cd.getSeconds(), 2);
        showDate =
          zeroPadding(cd.getFullYear(), 4) +
          "-" +
          zeroPadding(cd.getMonth() + 1, 2) +
          "-" +
          zeroPadding(cd.getDate(), 2) +
          " " +
          week[cd.getDay()];

        function zeroPadding(num, digit) {
          var zero = "";
          for (var i = 0; i < digit; i++) {
            zero += "0";
          }
          return (zero + num).slice(-digit);
        }

        this.dateTime = showDate + "  " + showTime;
        return this.dateTime;
      }
    }
  },
  mounted() {
    this.getNowTime();
    // this.username = getName("name");
    this.username = JSON.parse(this.storage.getStorage("uinfo")).username;
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.storage.setStorage('uinfo', '');
      http.get(this.urls.withdraw + '?type=2').then(res => {
      });
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    getNowTime() {
      let _this = this;
      setInterval(function() {
        _this.dateTime = new Date();
      }, 1000);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.titleData {
  display: flex;
  justify-content: center;
  padding: 0 20px;
  font-size: 16px;
  align-items: center;
  height: 100%;
  position: relative;
  img{
    height: 50px;
    vertical-align: middle;
  }
}
.avatar-wrapper {
  margin-top: 10px;
  position: absolute;
  right: 0;
}
</style>

