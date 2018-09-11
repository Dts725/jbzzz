<template>
  <div class=" contian">

    <div class="pr">
      <div class="pa attend-oval-bg attend-line "></div>
      <ul class="flex-clounm-between">
        <li v-for="(el,index) in data.name1" :key="index">
          <p class="attend-oval-color   attend-oval attend-oval-bg attend-oval-margin attend-oval-pad1">{{el}}</p>
        </li>
      </ul>

    </div>
    <div>

      <ul class="flex-between party overflow-auto ">
        <li v-for="(el ,index) in data.dangyuang" :key="index" class="pr">
          <div class="attend-line-party-scoped attend-line-party tf-center"></div>
          <p class="attend-oval-color attend-oval-pad2  attend-oval-party attend-oval-party-scoped attend-oval-bg attend-oval-margin">{{el}}</p>
        </li>
        <div class="active">
       <div class="pr">
          <div class="pa attend-oval-bg attend-line attend-line-scoped"></div>
          <ul class="flex-clounm-between">
            <li v-for="(el,index) in test.name1" :key="index">
              <p class="attend-oval-color   attend-oval attend-oval-bg attend-oval-margin attend-oval-pad1">{{el}}</p>
            </li>
          </ul>

        </div>
        <div>
          <ul class="flex-space-nowarp party overflow-auto">
            <li v-for="(el ,index) in test.dangyuang" :key="index" class="pr">
              <div class="attend-line-party  pa"></div>
              <p class="attend-oval-color attend-oval-pad2  attend-oval-party attend-oval-bg attend-oval-margin">{{el}}</p>
            </li>
          </ul>
        </div>
        </div>


      </ul>
      <slot name="party"></slot>
    </div>
  </div>
</template>

<script>
  import framework from "./attendComment";
  export default {
    name: "frameworkThree",
    components: {
      framework
    },
    created() {
      // this.$refs.attendComment.style.transfrom="translate(-50%,0)";
      console.log(this.$refs.attendComment)

    },
    activated() {
      // this.$refs.attendComment.style.transfrom="translate(-50%,0)";
      console.log(this.$refs.attendComment)

    },
    data() {
      return {
        data: {
          name1: ["牵头部门", "党支部党支部党支部", "党支部书记", "副书记", "委员"],
          dangyuang: [
            "党员哈党员哈党员哈党员哈党员哈党员哈党员",
            "党员哈党员哈党员哈党员哈党员哈党员哈党员哈党员哈",
            "党员党员哈党员哈党员哈党员哈2"
          ],

        },
        test: {
          name1: ["部门一", "部门二"],
          dangyuang: [
            "党员哈党",
            "党员哈",
            "党员哈",
            "党员哈",
            "党员哈",
            "党员党"
          ],
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
  ul {
    padding: 0;
  }

  .party>li:nth-last-of-type(2)>div {
    width: 84.5%;
  }

  .party>li:nth-last-of-type(1)>div {
    width: 0;
  }

  .attend-oval-party-scoped {
    border-radius: 100px;
    margin-left: 2rem;
    margin-top: 3rem;
    min-height: 0;
    max-width: 100%;
    padding: 0.5rem 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform: translateX(0%);
    margin-right: 0;
    cursor: pointer;
  }

  .attend-line-party-scoped {
    width: 125%;
  }

  .active {
    transform: translate(-315%, 5rem);
  }

    .attend-line-scoped {
    transform: translate(-50%,0%);
  }
</style>
