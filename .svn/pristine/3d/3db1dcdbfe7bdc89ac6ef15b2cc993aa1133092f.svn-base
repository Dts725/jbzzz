<template>
  <div class="echarts-container">
    <h3 class="title" v-if="echartsData.title">{{echartsData.title}}</h3>
    <!--<div class="echarts" id="echarts"></div>-->
    <div class="echarts" :id="echartsData.id?'charts'+echartsData.id:chartsId"></div>
  </div>
</template>

<script>
  // import axios from 'axios'
  import echarts from 'echarts'

  export default {
    components: {
      // axios
      echarts
    },
    props: {
      // 请求接口的地址
      url: {
        type: String,
        default: ''
      },
      // echarts图的类型
      type: {
        // 类型有：  饼图：Pie，环形图：PieDoughnut，柱状图：Bar
        type: String,
        default: 'Pie'
      },
      // echarts图的数据
      echartsData: {
        type: Object,
        default: () => {
          return {
            // /** 圆环图案例 **/
            // id: 1,
            // title: '圆环图案例', // 标题
            // type: 'PieDoughnut',
            // tipsName: '您选择的是：', // 提示的标题
            // data: [
            //   {name: '直接访问', value: 335},
            //   {name: '邮件营销', value: 310},
            //   {name: '联盟广告', value: 234},
            //   {name: '视频广告', value: 135},
            //   {name: '搜索引擎', value: 1548}
            // ]

            // /** 柱状图案例 **/
            // id: 2,
            // title: '柱状图案例', // 标题
            // type: 'Bar',
            // tipsName: '您选择的是：', // 提示的标题
            // data: [
            //   {name: '直接访问', value: 335},
            //   {name: '邮件营销', value: 310},
            //   {name: '联盟广告', value: 234},
            //   {name: '视频广告', value: 135},
            //   {name: '搜索引擎', value: 805}
            // ]
            // /** 饼状图案例 **/
            // id: 3,
            // title: '饼状图案例', // 标题
            // type: 'Pie',
            // tipsName: '您选择的是：', // 提示的标题
            // data: [
            //   {name: '直接访问', value: 335},
            //   {name: '邮件营销', value: 310},
            //   {name: '联盟广告', value: 234},
            //   {name: '视频广告', value: 135},
            //   {name: '搜索引擎', value: 805}
            // ]
          }
        }
      },

    },
    data() {
      return {
        chartsId: '',
        /** 默认配置 **/
        Config: {
          // 饼图
          Pie: {
            title: {
              // text: '某站点用户访问来源',
              text: '',
              // subtext: '纯属虚构',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              data: []
            },
            series: [
              {
                // name: '访问来源',
                name: '',
                type: 'pie',
                radius: '55%',
                minAngle: 10,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
                avoidLabelOverlap: true,   //是否启用防止标签重叠策略
                center: ['50%', '60%'],
                data: [
                  // {value: 335, name: '直接访问'},
                  // {value: 310, name: '邮件营销'},
                  // {value: 234, name: '联盟广告'},
                  // {value: 135, name: '视频广告'},
                  // {value: 1548, name: '搜索引擎'}
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          },
          // 环形图
          PieDoughnut: {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
              // formatter : function (params){return (params.percent - 0) + '%';},
              // textStyle: {
              //   color: '#000'
              // }
            },
            legend: {
              // orient: 'vertical',
              // x: 'left',
              y: 'bottom',
              bottom: 10,
              // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              data: []
            },
            color: ['#06a7fb', '#e062ae', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            series: [
              {
                name: '',
                type: 'pie',
                // clickable: true,　　　　　　 //是否开启点击
                minAngle: 10,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
                avoidLabelOverlap: true,   //是否启用防止标签重叠策略
                // hoverAnimation:true,　　  //是否开启 hover 在扇区上的放大动画效果。
                // silent: false,　　　　　　　　//图形是否不响应和触发鼠标事件
                radius: ['40%', '60%'],
                // avoidLabelOverlap: false,
                label: {
                  position: 'outer',
                  // 默认显示的字体
                  normal: {
                    show: true,
                    position: 'bottom',
                    formatter: "{c} ({d}%)",
                    // position: ['5', '5']
                    distance: 1,
                    style: {
                      offset: 100
                    }
                  },
                  // 鼠标悬浮
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '20',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                },
                data: [
                  // {value: 335, name: '直接访问'},
                  // {value: 310, name: '邮件营销'},
                  // {value: 234, name: '联盟广告'},
                  // {value: 135, name: '视频广告'},
                  // {value: 1548, name: '搜索引擎'}
                ]
              }
            ]
          },
          /** 柱状图 **/
          Bar: {
            // color: ['#3398DB'],
            color: ['#06a7fb', '#e062ae', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'value',
                boundaryGap: [0, 0.01]
              }
            ],
            yAxis: [
              {
                type: 'category',
                // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                data: [],
                // axisTick: {
                //   alignWithLabel: true
                // },
                // axisLabel: {
                //   rotate: 85
                // }
              }
            ],
            // xAxis: [
            //   {
            //     type: 'category',
            //     // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            //     data: [],
            //     axisTick: {
            //       alignWithLabel: true
            //     },
            //     axisLabel: {
            //       rotate: 85
            //     }
            //   }
            // ],
            // yAxis: [
            //   {
            //     type: 'value'
            //   }
            // ],
            series: [
              {
                // name: '直接访问',
                name: '',
                type: 'bar',
                barWidth: '60%',
                label: {
                  normal: {
                    show: true,
                    // position: 'top',
                    position: 'right',
                    textStyle: {
                      color: '#333'
                    },
                    // rotate: 30
                  }
                },
                // data: [10, 52, 200, 334, 390, 330, 220]
                data: []
              }
            ]
          }
        },
        // echarts的实例对象
        myChart: {},
      }
    },
    mounted() {
      this.chartsId = this.echartsData.id ? ('charts' + this.echartsData.id) : ('charts' + new Date().getTime());
      // 绘制图表
      setTimeout(() => {
        this.initData(this.echartsData);
      }, 200);
    },
    watch: {},
    methods: {
      /** 初始化图表 **/
      initData(data) {
        switch (data.type) {
          case 'Pie':
            this.Config.Pie.legend.data = this.getItemNames(data.data, 'name');
            this.Config.Pie.series[0].data = data.data;
            this.Config.Pie.title.text = data.title;
            this.echartsData.title = '';
            break;
          case 'PieDoughnut':
            this.Config.PieDoughnut.legend.data = this.getItemNames(data.data, 'name');
            this.Config.PieDoughnut.series[0].data = data.data;
            break;
          case 'Bar':
            // 横向显示：即y轴显示名字，x轴显示数值
            if (this.echartsData.direction == 'row') {
              this.Config.Bar.xAxis = [
                {
                  type: 'value',
                  boundaryGap: [0, 0.01]
                }
              ];
              this.Config.Bar.yAxis = [
                {
                  type: 'category',
                  // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  data: [],
                }
              ];
              this.Config.Bar.yAxis[0].data = this.getItemNames(data.data, 'name');
              this.Config.Bar.series[0].data = this.getItemNames(data.data, 'value');
            } else {
              // 正常纵向显示：即y轴显示数值, x轴显示名字
              this.Config.Bar.xAxis = [
                {
                  type: 'category',
                  // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  data: [],
                  axisTick: {
                    alignWithLabel: true
                  },
                  axisLabel: {
                    rotate: 85
                  }
                }
              ];
              this.Config.Bar.yAxis = [
                {
                  type: 'value'
                }
              ];
              this.Config.Bar.xAxis[0].data = this.getItemNames(data.data, 'name');
              this.Config.Bar.series[0].data = this.getItemNames(data.data, 'value');
            }
            break;

        }
        this.Config[data.type].series[0].name = data.tipsName ? data.tipsName : '您选择的是：';

        this.drawEcharts(this.Config[data.type]);
      },
      /** 开始绘制图表 **/
      drawEcharts(data) {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById(this.chartsId));
        // this.myChart = echarts.init(document.querySelector('.echarts-container .echarts'));
        // this.myChart.showLoading();
        // setTimeout(() => {
        // this.myChart.hideLoading();
        this.myChart.setOption(data);
        // }, 2000);
      },

      /** 二级数组转一级数组，用来获取 指示标题名字 **/
      getItemNames(arr, key) {
        return arr.map(obj => {
          return obj[key];
        })
      },


      // /** 获取列表数据 **/
      // _getList(url) {
      //   this.listLoading = true;
      //   axios({
      //     method: 'GET',
      //     url: url
      //   }).then(res => {
      //     console.log(res);
      //     this.listLoading = false
      //     if (res.status == 200 && res.data.code == 0) {
      //       // 不带分页的
      //       if (Array.isArray(res.data.data)) {
      //         this.list = res.data.data;
      //         this.current_page = '';
      //         this.res = res.data;
      //       } else if (Array.isArray(res.data.data.data)) { // 带分页的
      //         this.list = res.data.data.data;
      //         this.current_page = res.data.data.current_page;
      //         this.res = res.data.data;
      //       }
      //     }
      //   }).catch(err => {
      //     console.log(err);
      //     this.listLoading = false;
      //   });
      //   // axios({
      //   //   method: 'GET',
      //   //   url: url,
      //   //   data: JSON.stringify(data)
      //   // }).then(response => {
      //   //   resolve(response.data);
      //   // }).catch(err => {
      //   //   reject(err);
      //   // });
      // },
      // /** 搜索 **/
      // _searchCon() {
      //   if (!this.searchCon) {
      //     return;
      //   }
      //   // 保存搜索前的页码
      //   this.memoryPage.length = 0;
      //   this.memoryPage.push(this.current_page);
      //   // 设置页码
      //   // this.$refs.pagination.internalCurrentPage = 1;
      //   // this.current_page = 1;
      //   this.showGoBack = true;
      //   this._getList(`${this.url}${/\?/.test(this.url) ? '&' : '?'}${this.topBar.useSearch.key}=${this.searchCon}`);
      // },
      // /** 返回 **/
      // _goBack() {
      //   // this.$refs.pagination.internalCurrentPage = this.memoryPage[0];
      //   // this.current_page = this.memoryPage[0];
      //   this._getList(`${this.url}${/\?/.test(this.url) ? '&' : '?'}page=${this.memoryPage[0]}`);
      //   this.showGoBack = false;
      // },
      //
      // /** 页码变化 **/
      // _pageChange(val) {
      //   console.log('当前的页码为：：：', val);
      //   this.current_page = val;
      //   // this.fetchData(this.searchCon, val)
      //   this._getList(`${this.url}${/\?/.test(this.url) ? '&' : '?'}page=${val}&${this.topBar.useSearch.key}=${this.searchCon}`);
      // },

    }
  }
</script>
<style lang="scss" scoped>
  .echarts-container {
    box-sizing: border-box;
    min-height: 260px;
    min-width: 300px;
    width: 600px;
    height: 400px;
    /*width: 450px;*/
    /*height: 350px;*/
    position: relative;
    padding: 1rem;
    .title {
      margin: 0;
      /*padding:0;*/
      text-align: center;
      position: absolute;
      width: 100%;
      /*padding: 0.5rem;*/
    }
    .echarts {
      width: 100%;
      height: 100%;
    }
  }

  /*.echarts-container {*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*.echarts {*/
  /*min-height: 300px;*/
  /*min-width: 300px;*/
  /*width: 40%;*/
  /*}*/
  /*}*/
</style>
