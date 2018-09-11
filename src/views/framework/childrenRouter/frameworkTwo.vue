<template>
    <div>
        <framework :props-data ="data" ></framework>

    </div>
</template>

<script>
import framework from './attendComment'
  export default {
    name : "frameworkTwo",
    components : {
      framework
    },
    data () {
      return  {
         data : {
            name1 : ["牵头部门","党支部","党支部书记","副书记","委员"],
             dangyuang : ["党员哈哈哈哈","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员","党员2"]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
