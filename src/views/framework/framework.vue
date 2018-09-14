<template>
  <div class="framework-container pr" ref="frameworkSelf">


    <div>
      <img src="../../../static/framework_top.png" alt="">
      <p class="tf-center">{{this.$store.state.nav.id.organization_name}}</p>
    </div>


    <!-- <keep-alive> -->
    <div class="childrenRouter">
      <transition

      enter-active-class="animated  bounceInDown"
      >
        <router-view></router-view>
      </transition>
    </div>

    <!-- </keep-alive> -->


  </div>
</template>

<script>
  // import {getList2, getDetail} from '@/api/member';
  import http from '@/api/http';
  import list from '@/components/TableList';
  import tops from './childrenRouter/attendComment'
  import {
    Message,
    MessageBox
  } from 'element-ui'

  export default {

    data() {
      return {
        tar: 1,
        transitionName: 'bounceInLeft',
        data: {
          name1: [],
          dangyuang: ["餐饮服务保证组临时党支部", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员", "党员哈哈哈"]
        }
        /** *************** 引用的表格的  start *************** **/

        /** *************** 引用的表格的  end *************** **/

        /** *************** 弹窗的  start *************** **/

        /** *************** 弹窗的  end *************** **/

      }
    },
    created() {
      this.createdActive()
      // this.onClickLists(1);
    },
    activated() {
      this.createdActive()
      // this.onClickLists(1);

    },

    methods: {
      onClickLists(tar) {
        this.tar = tar;
        switch (tar) {
          case 1:
            this.$router.push('/framework/framework/index');
            break;
          case 2:
            this.$router.push('/framework/framework/frameworkTwo');
            console.log(tar);
            break;

          case 32:
            this.$router.push('/framework/framework/frameworkThree');
            break;
          default:
            break;
        }
      },
      createdActive() {
        this.$store.commit('BREAD_NAV', false)
        let clientHeight, clientWidth;
        this.$store.commit('BREAD_SID_ID', {
          id: 0,
          organization_name: '进博一线党组织'
        });

        try {
          clientHeight = document.body.offsetHeight;
          clientWidth = document.body.offsetWidth;
        } catch (error) {
          clientHeight = document.documentElement.clientHeight
          clientWidth = document.documentElement.clientWidth
        }

        this.$refs.frameworkSelf.style.height = clientHeight - 164 + 'px';
        // this.$refs.frameworkSelf.style.transfrom = 'translateY( 80' + 'px)';
        console.log(clientHeight)
        console.log(clientWidth)
      },
    },


    beforeDestroy() {
      this.$store.commit('BREAD_NAV', true)

    },
    deactivated() {
      this.$store.commit('BREAD_NAV', true)

    },
  }
</script>

<style lang="scss" scoped>
  .framework-container {
    width: 100%;
    height: 100%;
    text-align: center;
    background: url("../../../static/framework_bg.jpg") no-repeat;
    background-size: 100% 100%;
    p {
      font-size: 24px;
      width: 300px;
      position: absolute;
      top: 95px;
      // left: 50%;
      // transform: translateX(-50%);
      color: #f9cc2a;
    }
    img {
      margin-top: 20px;
    }
    .click-box {
      width: 10%;
      height: 40%;
      position: absolute;
      top: 20.5%;
      left: 10%;
      z-index: 100;
      min-height: 20rem;
      div {
        width: 100%;
        height: 30%;
        background-color: #f3e8de;
        cursor: pointer;
        span {
          line-height: 150px;
        }
      }
    }
  }

  .framework-title {
    position: absolute;
    z-index: 101;
    left: 8%;
    top: 26%;
    word-wrap: break-word;
    width: 10px;
    font-size: 1.5rem;
    color: #f9cc2a;
  }

  .borders {
    border: 5px solid #f9cc2a !important;
  }

  .red {
    color: #d40e19;
  }

  .childrenRouter {
    margin: 0 auto;
    // padding-top: 100px;
    width: 80%;
    height: 80%;
    overflow: auto;
    z-index: 101;
  }
</style>
