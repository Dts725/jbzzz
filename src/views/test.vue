<template>
  <div class="app-container">
    <h1>测试组件专用</h1>
    <!--<echarts-show style="border:1px solid #f00;"></echarts-show>-->
    <form-easy></form-easy>
  </div>
</template>

<script>
  import EchartsShow from '@/components/EchartsShow'
  import FormEasy from '@/components/FormEasy'

  export default {
    components: {
      EchartsShow,
      FormEasy
    },
    data() {
      return {}
    },
    created() {
    },
    activated() {
    },
    methods: {}

  }
</script>
<style lang="scss" scoped>
  .header {
    .el-input {
      width: 20%;
    }
  }

  .pagination {
    text-align: right;
    margin-top: 2rem;
  }
</style>
