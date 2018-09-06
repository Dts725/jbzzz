<template>
  <div class="form-easy-container">
    <!-- 弹出框 -->
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <!--<el-row :gutter="20">-->

        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item label="组织名称" prop="organization_name">-->
              <!--<el-input v-model="addForm.organization_name"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item label="牵头部门" prop="organization_part">-->
              <!--<el-input v-model="addForm.organization_part"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->

        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item label="书记名称" prop="organization_secretary_name">-->
              <!--<el-input v-model="addForm.organization_secretary_name"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item label="书记电话" prop="organization_secretary_phone">-->
              <!--<el-input v-model="addForm.organization_secretary_phone"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->

        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item label="联系人" prop="organization_contact_name">-->
              <!--<el-input v-model="addForm.organization_contact_name"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item label="联系人电话" prop="organization_contact_phone">-->
              <!--<el-input v-model="addForm.organization_contact_phone"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="副书记" prop="organization_deputy_secretary_name">
              <el-input v-model="addForm.organization_deputy_secretary_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成立时间" prop="organization_date">
              <!--<el-input v-model="addForm.organization_date"></el-input>-->
              <el-date-picker
                v-model="addForm.organization_date"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!--<el-row>-->
          <!--<el-col :span="24">-->
            <!--<el-form-item label="委员" prop="organization_commissioner">-->
              <!--<el-input v-model="addForm.organization_commissioner"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->


        <!--<el-form-item label="设置社区" prop="communitySelect" v-if="username=='admin'">-->
        <!--<el-select v-model="addForm.communitySelect" placeholder="请选择社区">-->
        <!--<el-option v-for="com in communityList" :key="com.id" :label="com.community_name"-->
        <!--:value="com.id">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->

        <el-form-item>
          <el-button type="primary" @click="submitAddForm('addForm', dialogType)">确定</el-button>
          <el-button @click="resetAddForm('addForm')">取消</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
  import axios from 'axios'

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
      // 手动更新数据，每次接收 +1 的值 如：传 update++
      update: {
        type: Number,
        default: 0
      },
      // 列表头部的功能区
      topBar: {
        type: [Object, String],
        default: () => {
          return {
            // useNewBtn: {btnName: '新增', btnClass: '', btnType: 'success', fun: '' },
            // useSearch: {key: 'name', btnName: '搜索', searchTipCon: '请输入搜索内容'}
          }
        }
      },
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
      }
    },
    data() {
      return {
        listLoading: true,  // 加载中
        showGoBack: false, // 是否显示返回按钮
        searchCon: '',  // 搜索的内容
        res: '',  // 包含页码的总数据
        current_page: 0, // 当前页
        // 不含页码的总数据
        list: [
          // {id: 1, role: '街道管理员', date_time: 1533195311304},
          // {id: 2, role: '社区管理员', date_time: 1533195382959},
          // {id: 3, role: '办公职员', date_time: 1533195391971}
        ],
        memoryPage: [1], // 记忆当前的页码，供返回使用

      }
    },
    activated() {
      this._getList(this.url);
    },
    watch: {
      'update': function (o, n) {
        this._getList(this.url);
      }
    },
    methods: {
      /** 获取列表数据 **/
      _getList(url) {
        this.listLoading = true;
        axios({
          method: 'GET',
          url: url
        }).then(res => {
          console.log(res);
          this.listLoading = false
          if (res.status == 200 && res.data.code == 0) {
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
        this._getList(`${this.url}${/\?/.test(this.url) ? '&' : '?'}${this.topBar.useSearch.key}=${this.searchCon}`);
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
        this._getList(`${this.url}${/\?/.test(this.url) ? '&' : '?'}page=${val}&${this.topBar.useSearch.key}=${this.searchCon}`);
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
      width: 20%;
    }
  }

  .pagination {
    text-align: right;
    margin-top: 2rem;
  }
</style>
