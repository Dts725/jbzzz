<template>
  <div class="table-container">
    <!------------------------ 顶部功能区 ------------------------>
    <el-header class="header">
      <!--<el-button v-for="btn in actionBar" :key="btn.name" size="mini" :type="btn.type?btn.type:''"-->
      <!--@click="btn.fun(scope.$index, scope.row)">-->
      <!--{{btn.name}}-->
      <!--</el-button>-->
      <div class="top-bars" v-for="btn in topBar" :key="btn.name">
        <!-- 搜索框 -->
        <p v-if="btn.name.indexOf('搜索')>=0 && btn.key" style="width:355px;" :class="btn.class"
           :style="btn.style?btn.style:''">
          <el-input v-model="searchCon" :placeholder="btn.searchTipCon" clearable></el-input>
          <el-button size="small" type="primary" @click="_searchCon()" icon="el-icon-search">
            {{btn.name}}
          </el-button>
          <!--<el-button size="small" type="success" @click="searchCon='',_searchCon()" v-show="searchCon">返回</el-button>-->
          <el-button size="small" type="success" @click="searchCon='',_goBack()" v-show="showGoBack">返回</el-button>
        </p>
        <!-- 上传按钮 -->
        <el-upload v-if="btn.isUpLoad" class="top-bars-upload"
                   :class="btn.class" :style="btn.style?btn.style:''"
                   :action="btn.url" :limit="btn.limit" multiple
                   :on-success="unLoadSuccess"
                   :on-preview="handlePreview" :on-remove="handleRemove"
                   :before-remove="beforeRemove" :on-exceed="handleExceed"
                   :show-file-list="btn.showList" :file-list="upLoadList">
          <el-button size="small" type="primary" @click="setUpLoadCallBack(btn.fun)">{{btn.name}}</el-button>
          <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
        <!--<p>-->


        <!-- 级联选择 -->
        <el-cascader v-if="btn.plugType=='cascader'" :options="cascaderList" v-model="cascaderSelected"
                     :placeholder="btn.searchTipCon"
                     @change="EventCascadeChange">
        </el-cascader>

        <!-- 下拉选择 -->
        <!--<el-select v-if="btn.plugType=='select'"-->
        <!--v-model="selected"-->
        <!--placeholder="请选择">-->
        <!--<el-option v-for="item in btn.selectList && btn.selectList.length>0?btn.selectList:selectList"-->
        <!--:key="item.value" :label="item.label" :value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->

        <!-- 普通按钮 -->
        <el-button v-if="btn.name.indexOf('搜索')<0 && !btn.isUpLoad && (!btn.plugType || btn.plugType=='auto')"
                   size="small"
                   :type="btn.type" @click="btn.fun"
                   icon="el-icon-plus" :class="btn.class" :style="btn.style?btn.style:''">
          {{btn.name}}
        </el-button>
        <!--</p>-->
        <!--<el-button v-else size="small" :type="btn.type"-->
        <!--@click="btn.fun"-->
        <!--:class="btn.class" icon="el-icon-back" style="position: absolute; right:15px;">-->
        <!--{{btn.btnName}}-->
        <!--</el-button>-->
      </div>
      <!--<el-button v-if="topBar.useNewBtn" size="small" :type="topBar.useNewBtn.btnType" @click="topBar.useNewBtn.fun"-->
      <!--:class="topBar.useNewBtn.btnClass" icon="el-icon-plus">{{topBar.useNewBtn.btnName}}-->
      <!--</el-button>-->
      <!--<el-button v-if="topBar.useNewBtn1" size="small" :type="topBar.useNewBtn1.btnType" @click="topBar.useNewBtn1.fun"-->
      <!--:class="topBar.useNewBtn1.btnClass" icon="el-icon-plus">{{topBar.useNewBtn1.btnName}}-->
      <!--</el-button>-->

      <!--<el-button v-if="topBar.useBackBtn" size="small" :type="topBar.useBackBtn.btnType" @click="topBar.useBackBtn.fun"-->
      <!--:class="topBar.useBackBtn.btnClass" icon="el-icon-back" style="position: absolute; right:15px;">-->
      <!--{{topBar.useBackBtn.btnName}}-->
      <!--</el-button>-->
      <!--<el-button v-if="topBar.useNewBtn" size="small" :type="topBar.useNewBtn.btnType" @click="topBar.useNewBtn.fun"-->
      <!--:class="topBar.useNewBtn.btnClass" icon="el-icon-plus">{{topBar.useNewBtn.btnName}}-->
      <!--</el-button>-->
      <!--<el-button v-if="topBar.useNewBtn1" size="small" :type="topBar.useNewBtn1.btnType" @click="topBar.useNewBtn1.fun"-->
      <!--:class="topBar.useNewBtn1.btnClass" icon="el-icon-plus">{{topBar.useNewBtn1.btnName}}-->
      <!--</el-button>-->
      <!--<p v-if="topBar.useSearch">-->
      <!--<el-input v-model="searchCon" :placeholder="topBar.useSearch.searchTipCon" clearable></el-input>-->
      <!--<el-button size="small" type="primary" @click="_searchCon()" icon="el-icon-search">-->
      <!--{{topBar.useSearch.btnName}}-->
      <!--</el-button>-->
      <!--&lt;!&ndash;<el-button size="small" type="success" @click="searchCon='',_searchCon()" v-show="searchCon">返回</el-button>&ndash;&gt;-->
      <!--<el-button size="small" type="success" @click="searchCon='',_goBack()" v-show="showGoBack">返回</el-button>-->
      <!--</p>-->
    </el-header>
    <!------------------------ 表格列表区 ------------------------>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
              @cell-click="_cellClick" @row-click="_rowClick">
      <!-- 选择 -->
      <el-table-column v-if="canSelect" type="selection" width="55" align="center"></el-table-column>
      <!-- 序号 -->
      <el-table-column v-if="indexBar&& indexBar.name" align="center" :label='indexBar.name'
                       :width="indexBar.width?indexBar.width:'auto'">
        <template slot-scope="scope">
          {{indexBar.key && indexBar.key=='auto' ? (res.per_page?((current_page-1)* res.per_page +
          scope.$index+1):scope.$index+1):
          scope.row[indexBar.key]}}
        </template>
      </el-table-column>

      <!-- 中间内容 -->
      <el-table-column v-for="li in thead" :key="li.name" align="center" :label='li.name'
                       :width="li.width?li.width:'auto'" class="hoverStyle">
        <template slot-scope="scope">
          {{_listContent(li,scope.row)}}
        </template>
      </el-table-column>

      <!---------------------- 右边的操作按钮 ---------------------->
      <el-table-column label="操作" :width="actionBarWidth?actionBarWidth:'auto'" align="center"
                       v-if="actionBar&& actionBar.length>0">
        <template slot-scope="scope">
          <el-button-group>
            <el-button v-for="btn in actionBar" :key="btn.name" size="mini" :type="btn.type?btn.type:''"
                       @click="btn.fun(scope.$index, scope.row)">
              {{btn.name}}
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>

    </el-table>
    <!----------------------- 分页 ----------------------->
    <el-pagination ref="pagination" class="pagination" @current-change="_pageChange" @prev-click="_pageChange"
                   @next-click="_pageChange" :current-page.sync="current_page" background
                   layout="prev, pager, next" :page-size="this.res.per_page" :total="this.res.total">
    </el-pagination>


  </div>
</template>

<script>
  import axios from 'axios'
  import dateformat from '../utils/W.dateformat'
  import {Message, MessageBox} from 'element-ui'

  export default {
    components: {
      axios
    },
    props: {
      // 请求接口的地址
      url: {
        type: String,
        default: ''
      },
      // 请求到的数据的字段名字
      dataKey: {
        type: String,
        default: 'data'
      },
      // 手动更新数据，每次接收 +1 的值 如：传 update++
      update: {
        type: Number,
        default: 0
      },
      // 列表头部的功能区
      topBar: {
        type: [Array, Object],
        default: () => [
          //   useNewBtn: {btnName: '新增', btnClass: '', btnType: 'success', keys: [], fun: this.newRole},
          //   useSearch: {key: 'user_name', btnName: '搜索', searchTipCon: '请输入名字'}
        ]
      },
      // // 列表头部的功能区
      // topBar: {
      //   type: [Array, Object],
      //   default: () => {
      //     return {
      //       // useNewBtn: {btnName: '新增', btnClass: '', btnType: 'success', fun: '' },
      //       // useSearch: {key: 'name', btnName: '搜索', searchTipCon: '请输入搜索内容'}
      //     }
      //   }
      // },
      // 表格头- 是否可选
      canSelect: {
        type: Boolean,
        default: false
      },
      // 表格头- 索引序号 - {name: '序号', key: 'auto', width: '60'}
      indexBar: {
        type: [Object, String],
        default: {}
      },
      // 表格头 - 字段内容
      thead: {
        type: Array,
        default: [
          // {name: '角色名称', key: 'name', width: ''}
        ]
      },

      // 表格头 - 最右边的功能区
      actionBar: {
        type: Array,
        default: [
          // {name: '编辑', fun: this.edit, type: 'success'},
          // {name: '删除', fun: this.delete, type: 'danger'}
        ]
      },
      // 表格头 - 最右边的功能区的宽度
      actionBarWidth: {
        type: [Number, String],
        default: 'auto'
      },
      // 表格绑定的事件
      // tableEvents: {
      //   type: Object,
      //   default: {}
      // },

    },
    data() {
      return {
        listLoading: true,  // 加载中
        showGoBack: false, // 是否显示返回按钮
        searchKey: '',  // 搜索的字段名
        searchCon: '',  // 搜索的内容
        upLoadList: [],  // 上传的文件列表
        upLoadCallBack: '', // 上传控件的回调函数
        res: '',  // 包含页码的总数据
        current_page: 0, // 当前页
        // 不含页码的总数据
        list: [
          // {id: 1, role: '街道管理员', date_time: 1533195311304},
          // {id: 2, role: '社区管理员', date_time: 1533195382959},
          // {id: 3, role: '办公职员', date_time: 1533195391971}
        ],
        memoryPage: [1], // 记忆当前的页码，供返回使用

        selectList: [], // 顶部功能区的下拉选择按钮的数据
        selected: '',  // 顶部功能区的下拉选择按钮--选中的
        cascaderList: [], // 顶部功能区的级联选择
        cascaderSelected: [],  // 顶部功能区的级联选择--选中的
        cascaderKey: '', // 顶部功能区的级联选择搜索的字段名

      }
    },
    mounted() {
      let _this = this;
      // if (/undefined/.test(this.url)) {
      //   Message({
      //     message: `请求地址错误，自动返回上一页！！！`,
      //     // type: 'error',
      //     duration: 1500
      //   });
      // this.listLoading = true;
      if (!this.searchKey) {
        if (this.topBar.length == 0) {
          return;
        }
        for (let btn of this.topBar) {
          if (btn.name.indexOf('搜索') >= 0 && btn.key) {
            this.searchKey = btn.key;
          }
          if (btn.plugType == 'select') {
            this._getSelectList(btn.dataUrl);
          } else if (btn.plugType == 'cascader') {
            this._getCascaderList(btn.dataUrl);
            this.cascaderKey = btn.key;
          }
        }
      }
      setTimeout(() => {
        // this.$router.go(-1);
        this._getList(this.url);
      }, 100)
      // }

    },
    activated() {
      // this.listLoading = true;
      // if (/undefined/.test(this.url)) {
      //   Message({
      //     message: `请求地址错误，自动返回上一页！！！`,
      //     // type: 'error',
      //     duration: 1500
      //   });
      if (!this.searchKey) {
        if (this.topBar.length == 0) {
          return;
        }
        for (let btn of this.topBar) {
          if (btn.name.indexOf('搜索') >= 0 && btn.key) {
            this.searchKey = btn.key;
          }
          if (btn.plugType == 'select') {
            this._getSelectList(btn.dataUrl);
          } else if (btn.plugType == 'cascader') {
            this._getCascaderList(btn.dataUrl);
            this.cascaderKey = btn.key;
          }
        }
      }
      setTimeout(() => {
        // this.$router.go(-1);
        this._getList(this.url);
      }, 100)
      // }
    },
    watch: {
      'update': function (o, n) {
        this._getList(this.url);
      }
    },
    methods: {
      /** 空方法 **/
      fun(row, column, cell, event) {
        console.log(row, column, cell, event);
      },
      /** 根据字段返回指定的内容 **/
      _listContent(obj, row) {
        let str = '';
        //  格式化数据--根据数值返回名字
        if (obj.filterCon && Array.isArray(obj.filterCon) && obj.filterCon.length > 0) {
          obj.filterCon.forEach(ele => {
            if (ele.key == row[obj.key]) {
              str = ele.value;
              return;
            }
          });
        } else if (/date|time/.test(obj.key) || obj.format) {
          //  格式化时间
          str = this.formatTime(row[obj.key], obj.format);
        } else {
          str = row[obj.key];
        }
        return str;
      },
      /** 获取列表数据 **/
      _getList(url) {
        let _this = this;
        this.listLoading = true;
        axios({
          method: 'GET',
          url: url
        }).then(res => {
          let key = this.dataKey ? this.dataKey : 'data';
          this.listLoading = false;
          if (res.status == 200 && res.data.code == 0) {
            // 如果接收了特殊的key
            if (this.dataKey !== 'data') {
              if (Array.isArray(res.data.data[_this.dataKey])) {
                this.list = res.data.data[_this.dataKey];
              }
            } else {
              // 不带分页的
              if (Array.isArray(res.data.data)) {
                this.list = res.data.data;
                this.current_page = '';
                this.res = res.data;
              } else if (Array.isArray(res.data.data.data)) { // 带分页的
                this.list = res.data.data.data;
                this.current_page = res.data.data.current_page;
                this.res = res.data.data;
              }
            }
          }
        }).catch(err => {
          console.log(err);
          this.listLoading = false;
        });
        // axios({
        //   method: 'GET',
        //   url: url,
        //   data: JSON.stringify(data)
        // }).then(response => {
        //   resolve(response.data);
        // }).catch(err => {
        //   reject(err);
        // });
      },
      /** 搜索 **/
      _searchCon() {
        if (!this.searchCon) {
          return;
        }
        // 保存搜索前的页码
        this.memoryPage.length = 0;
        this.memoryPage.push(this.current_page);
        // 设置页码
        // this.$refs.pagination.internalCurrentPage = 1;
        // this.current_page = 1;
        this.showGoBack = true;
        this._getList(`${this.url}${/\?/.test(this.url) ? '&' : '?'}${this.searchKey}=${this.searchCon}`);
      },
      /** 返回 **/
      _goBack() {
        // this.$refs.pagination.internalCurrentPage = this.memoryPage[0];
        // this.current_page = this.memoryPage[0];
        this._getList(`${this.url}${/\?/.test(this.url) ? '&' : '?'}page=${this.memoryPage[0]}`);
        this.showGoBack = false;
      },

      /** 页码变化 **/
      _pageChange(val) {
        console.log('当前的页码为：：：', val);
        this.current_page = val;
        // this.fetchData(this.searchCon, val)
        this._getList(`${this.url}${/\?/.test(this.url) ? '&' : '?'}page=${val}&${this.searchKey}=${this.searchCon}`);
      },

      /** 格式化时间 **/
      formatTime(time, format) {
        format = format ? format : '';
        let t = /^\d+$/.test(time) ? dateformat.format(new Date(Number(time)), format) : time;
        return t;
      },

      /******************* 表格绑定的事件 *******************/
      /** 表格-单元格点击事件 **/
      _rowClick(row, column, cell, event) {
        this.$emit('rowClick', {
          row: row,
          column: column,
          cell: cell,
          event: event
        });
      },
      /** 表格-单元格点击事件 **/
      _cellClick(row, column, cell, event) {
        this.$emit('cellClick', {
          row: row,
          column: column,
          cell: cell,
          event: event
        });
      },

      /******************* 上传文件相关的 *******************/
      /** 设置上传控件的回调函数 **/
      setUpLoadCallBack(fun) {
        if (typeof fun == 'function') {
          this.upLoadCallBack = fun;
        }
      },
      unLoadSuccess(res, file, fileList) {
        // console.log(res, file, fileList);
        if (res.code == 0) {
          if (typeof this.upLoadCallBack !== 'function') {
            return;
          }
          this.upLoadCallBack(res);
        } else {
          Message({
            message: `上传失败，请重试 ！！！`,
            type: 'warning',
            duration: 1500
          });
        }
      },
      handleRemove(file, upLoadList) {
        console.log(file, upLoadList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, upLoadList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + upLoadList.length} 个文件`);
      },
      beforeRemove(file, upLoadList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

      /******************* 顶部功能区相关的 *******************/
      _getSelectList(url) {
        let _this = this;
        // this.listLoading = true;
        axios({
          method: 'GET',
          url: url
        }).then(res => {
          debugger;
          // let key = this.dataKey ? this.dataKey : 'data';
          // this.listLoading = false;
          if (res.status == 200 && res.data.code == 0) {
            // 如果接收了特殊的key
            // if (this.dataKey !== 'data') {
            //   if (Array.isArray(res.data.data[_this.dataKey])) {
            //     this.list = res.data.data[_this.dataKey];
            //   }
            // } else {
            //   // 不带分页的
            //   if (Array.isArray(res.data.data)) {
            //     this.list = res.data.data;
            //     this.current_page = '';
            //     this.res = res.data;
            //   } else if (Array.isArray(res.data.data.data)) { // 带分页的
            //     this.list = res.data.data.data;
            //     this.current_page = res.data.data.current_page;
            //     this.res = res.data.data;
            //   }
            // }
          }
        }).catch(err => {
          console.log(err);
          // this.listLoading = false;
        });
      },
      _getCascaderList(url) {
        let _this = this;
        // this.listLoading = true;
        axios({
          method: 'GET',
          url: url
        }).then(res => {
          if (res.status == 200 && res.data.code == 0) {
            let arr = [];
            for (let i = 0; i < res.data.data.data.length; i++) {
              arr.push({
                value: res.data.data.data[i].id,
                label: res.data.data.data[i].organization_name,
                children: []
              });
              if (res.data.data.data[i].child && res.data.data.data[i].child.length > 0) {
                for (let chd of res.data.data.data[i].child) {
                  arr[i].children.push({
                    value: chd.id,
                    label: chd.organization_name
                  });
                }
              } else {
                delete arr[i].children;
              }
            }
            arr.unshift({
              value: '',
              label: '请选择'
            });
            this.cascaderList = arr;
          }
        }).catch(err => {
          console.log(err);
          // this.listLoading = false;
        });
      },
      EventCascadeChange(arr) {
        this._getList(`${this.url}${/\?/.test(this.url) ? '&' : '?'}${this.cascaderKey}=${arr[arr.length - 1]}`);
      },

    }
  }
</script>
<style lang="scss" scoped>
  .header {
    height: 44px !important;
    align-items: flex-start;
    p {
      width: 100%;
      margin: 0;
    }
    .el-input {
      width: calc(100% - 200px);
    }
  }

  .pagination {
    text-align: right;
    margin-top: 2rem;
  }

  .hoverStyle {
    cursor: pointer;
    color: #f00;
  }
</style>
