<template>
  <div class=" contian">

    <div class="pr">
      <div class="pa attend-oval-bg attend-line" el="attendComment"></div>
      <ul class="flex-clounm-between">
        <li v-for="(el,index) in propsData.name1" :key="index">
          <p class="attend-oval-color   attend-oval attend-oval-bg attend-oval-margin attend-oval-pad1">{{el}}</p>
        </li>
      </ul>

    </div>
    <div>
      <ul class="flex-space-nowarp party attend-line-party-border overflow-auto">

        <li v-for="(el ,index) in propsData.dangyuang" :key="index" class="pr flex">
          <div class="attend-line-center pa"></div>
          <p class="attend-oval-party attend-oval-color attend-oval">{{el}}</p>
        </li>
      </ul>
      <slot name="party"></slot>
    </div>
  </div>
</template>

<script>
  import http from '@/api/http';
  export default {
    name: "framework",
    props: {
      propsData: {
        type: Object,
        default: null
      }
    },
    data() {
      return {};
    },
    activated() {}
  };
</script>

<style lang="scss" scoped>
  ul {
    padding: 0;
  }

  .party>li:nth-last-of-type(1)>div {
    // width: 0;
  }
</style>
