<template>
  <div class="framework-container">
    <!--<h3 class="framework-title">进博一线党组织</h3>-->
    <div class="click-box">
      <div @click="onClickLists(1)"></div>
      <div @click="onClickLists(2)"></div>
      <div @click="onClickLists(3)"></div>
    </div>
    <img src="../../../static/jiagou01.jpg" alt="" v-show="tar==1">
    <img src="../../../static/jiagou02.jpg" alt="" v-show="tar==2">
    <img src="../../../static/jiagou03.jpg" alt="" v-show="tar==3">
  </div>
</template>

<script>
  // import {getList2, getDetail} from '@/api/member';
  import http from '@/api/http';
  import list from '@/components/TableList';
  import {Message, MessageBox} from 'element-ui'

  export default {
    components: {
      list
    },
    data() {
      return {
        tar: 1,
        /** *************** 引用的表格的  start *************** **/

        /** *************** 引用的表格的  end *************** **/

        /** *************** 弹窗的  start *************** **/

        /** *************** 弹窗的  end *************** **/

      }
    },
    created() {
    },
    activated() {
    },

    methods: {
      onClickLists(tar) {
        this.tar = tar;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .framework-container {
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
   	/*background: url(../../../static/login_bj.jpg) no-repeat fixed left top;*/
    img {
      width: 100%;
      height:100% ;
      position: absolute;
      top: 0;
      left:0;
    }
    .click-box {
      width: 12%;
      height: 46%;
      position: absolute;
      top: 20.5%;
      left: 8%;
      z-index: 100;
      min-height: 20rem;
      div {
        width: 100%;
        height: 33.3%;
        /*border: 1px solid #0000ff;*/
        cursor: pointer;
      }
    }
    /*.framework-title{*/
      /*position: absolute;*/
      /*z-index: 101;*/
      /*left: 3%;*/
      /*top: 26%;*/
      /*word-wrap: break-word;*/
      /*width: 10px;*/
      /*font-size: 1.5rem;*/
      /*color: #d40f19;*/
    /*}*/
  }

</style>
