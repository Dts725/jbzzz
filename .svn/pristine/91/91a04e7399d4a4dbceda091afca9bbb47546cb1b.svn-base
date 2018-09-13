<template>
  <div class="framework-container pr" ref="frameworkSelf">


    <div>
      <p class="fz25">{{this.$store.state.nav.id.organization_name}}</p>
      <img src="../../../static/framework_top.png" alt="">
    </div>
      <!-- <div class="childrenRouter">
           <tops  :props-data="data"></tops>
      </div> -->
    <div  class="childrenRouter">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

    </div>
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
    components: {
      list,
      tops
    },
    data() {
      return {
        tar: 1,
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

          case 3:
            this.$router.push('/framework/framework/frameworkThree');
            break;
          default:
            break;
        }
      },
      createdActive() {
        this.$store.commit('BREAD_NAV', false)
        let clientHeight, clientWidth;
          this.$store.commit('BREAD_SID_ID',{
          id: 0,
          organization_name : '组织部'});

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
    p{
      position: absolute;
      top: 8.5%;
      left: 46%;

       color: #f9cc2a;
      z-index: 101;
    }
    img {
      position: absolute;
      top: 3.8%;
      left: 42%;
      transform: translateX(-28%)
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


    .framework-title{
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
    position: absolute;
    top :18%;
    left: 10%;
    width: 80%;
    height: 80%;
    z-index: 101;
  }

</style>
