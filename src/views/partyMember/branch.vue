<template>
  <div class="app-container">
    <list :url="URL+url" dataKey="child" :update="update" :topBar="topBar" :canSelect="canSelect" :indexBar="indexBar"
          :thead="thead" :actionBarWidth="actionBarWidth"
          :actionBar="actionBar"></list>

    <!-- 弹出框 -->
    <el-dialog :title="dialogTitle" :dialogType="dialogType" :visible.sync="showDialog" center top="10%">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <!--<el-row :gutter="20">-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="支部名称" prop="organization_name">
              <el-input v-model="addForm.organization_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="牵头部门" prop="organization_part">
              <el-input v-model="addForm.organization_part"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="书记名称" prop="organization_secretary_name">
              <el-input v-model="addForm.organization_secretary_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="书记电话" prop="organization_secretary_phone">
              <el-input v-model="addForm.organization_secretary_phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人" prop="organization_contact_name">
              <el-input v-model="addForm.organization_contact_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="organization_contact_phone">
              <el-input v-model="addForm.organization_contact_phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
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
                @change="formatTime"
                format="yyyy - MM - dd"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="委员" prop="organization_commissioner">
              <el-input v-model="addForm.organization_commissioner"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item class="align-right">
          <el-button type="primary" @click="submitAddForm('addForm', dialogType)">确定</el-button>
          <el-button @click="resetAddForm('addForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        /** *************** 引用的表格的  start *************** **/
        listLoading: true,
        // 列表头部的功能区--key为搜索的字段名
        topBar:[
          {name: '新增', type: 'success', class: '', fun: this.newRole},
          {name: '返回', type: 'primary', class: 'go-back', fun: this.goBack, style:'position: absolute;right:1rem;'},
          {name: '搜索', key: 'organization_name', searchTipCon: '请输入搜索内容', class: ''},
        ],
        // topBar: {
        //   useBackBtn: {btnName: '返回', btnClass: '', btnType: 'primary', keys: [], fun: this.goBack},
        //   useNewBtn: {btnName: '新增', btnClass: '', btnType: 'success', keys: [], fun: this.newRole},
        //   useSearch: {key: 'organization_name', btnName: '搜索', searchTipCon: '请输入搜索内容'}
        // },
        // 表格头- 是否可选
        canSelect: false,
        // 表格头- 索引序号
        indexBar: {name: '序号', key: 'auto', width: '60'},
        // 表格头 - 字段内容
        thead: [
          {name: "支部名称", key: 'organization_name', width: 'auto'},
          {name: "书记名称", key: 'organization_secretary_name', width: '110'},
          {name: "书记电话", key: 'organization_secretary_phone', width: 'auto'},
          {name: "联系人", key: 'organization_contact_name', width: '110'},
          {name: "联系电话", key: 'organization_contact_phone', width: 'auto'},
          {name: "成立日期", key: 'organization_date', width: '120', format: 'yyyy - MM - dd'},
          {name: "党员人数", key: 'aaaaaa', width: '90'},
        ],
        update: 0, // 手动更新数据，每次接收 +1 的值 如：传 update++
        // 表格头 - 最右边的功能区
        actionBar: [
          {name: '编辑', fun: this.edit, type: 'success'},
          // {name: '删除', fun: this.delete, type: 'danger'},
          // {name: '支部详情', fun: this.branchDetail, type: 'success'}
        ],
        // 表格头 - 最右边的功能区的宽度
        actionBarWidth: 200,
        /** *************** 引用的表格的  end *************** **/

        /** *************** 弹窗的  start *************** **/
        showDialog: false, //
        dialogTitle: '', // 弹窗标题
        dialogType: '', // 弹窗类型  用来区分新增或编辑

        // 新增弹出表单
        addForm: {
          // CREATE TABLE `organization` (
          id: '',  // int(11) NOT NULL COMMENT '组织id',
          pid: '',  // int(11) DEFAULT NULL COMMENT '组织父id',
          organization_name: '',  // varchar(50) DEFAULT NULL COMMENT '组织名称',
          organization_part: '',  // varchar(50) DEFAULT NULL COMMENT '牵头部门',
          organization_secretary_name: '',  // varchar(50) DEFAULT NULL COMMENT '书记',
          organization_secretary_phone: '',  // varchar(50) DEFAULT NULL COMMENT '书记电话',
          organization_deputy_secretary_name: '',  // varchar(50) DEFAULT NULL COMMENT '副书记',
          organization_contact_name: '',  // varchar(50) DEFAULT NULL COMMENT '联系人',
          organization_contact_phone: '',  // varchar(50) DEFAULT NULL COMMENT '联系人电话',
          organization_commissioner: '',  // varchar(255) DEFAULT NULL COMMENT '委员',
          organization_date: '',  // varchar(20) DEFAULT NULL COMMENT '成立时间',
          //     PRIMARY KEY (`id`)
          // ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='党组织表';
        },
        // 表单验证规则
        rules: {
          organization_name: [
            {required: true, message: '请输党组织名字', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
          ],
          organization_part: [
            {required: true, message: '请输入牵头部门', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
          ],
          organization_secretary_name: [
            {required: true, message: '请输入书记名字', trigger: 'blur'}
          ],
          organization_deputy_secretary_name: [
            {required: true, message: '请输入副书记名字', trigger: 'blur'}
          ],
          organization_contact_name: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          organization_contact_phone: [
            {required: true, message: '请输入联系人电话', trigger: 'blur'}
          ],
          organization_secretary_phone: [
            {required: true, message: '请输入书记电话', trigger: 'blur'}
          ],
          organization_commissioner: [
            {required: true, message: '请输入委员', trigger: 'blur'}
          ],
          organization_date: [
            {required: true, message: '请输入成立时间', trigger: 'change'}
          ]
        },

        /** *************** 弹窗的  end *************** **/
        url: `/organization`,
        pid: '',

        // 需要转换为时间戳的日期字段
        dateFonts: ['organization_date'],

      }
    },
    created() {
      this.init();
    },
    activated() {
      this.init();
    },

    methods: {
      init() {
        this.pid = this.$route.params.id;
        this.url = `/organization/${this.pid}`;

        // 获取角色列表
        // http.get(this.url).then(res => {
        //   if (res.code == 0) {
        //     this.organizationList = res.data.data;
        //   }
        // });
        // // 获取社区列表
        // http.get('/community').then(res => {
        //   if (res.code == 0) {
        //     this.communityList = res.data;
        //   }
        // });
        // if (this.storage.getStorage('uinfo').length > 1) {
        //   this.community_id = JSON.parse(this.storage.getStorage('uinfo')).community_id;
        //   // this.addForm.communitySelect = this.community_id;
        //   this.username = JSON.parse(this.storage.getStorage('uinfo')).username;
        // } else {
        //   this.community_id = -1;
        //   this.disableComm = false;
        // }
        // this.url = this.username == 'admin' ? '/account?type=1' : `/account?type=1&community_id=${this.community_id}`;
      },
      goBack() {
        this.$router.go(-1);
      },
      /** 新建 **/
      newRole(e, d) {
        this.showDialog = true;
        this.dialogTitle = '新增党支部';
        this.dialogType = 'new';
        this.initForm();
      },
      /** 支部 **/
      branch(e, d) {
        this.$router.push({name: 'branch', params: {id: d.id}});
      },
      /** 编辑 **/
      edit(e, d) {
        // this.getData(`${this.URL}${this.url}/${d.id}`, '', 'get', res => {
        this.getData(`${this.URL}${this.url.replace(/\/\d+$/, '')}/${d.id}`, '', 'get', res => {
          if (res.code == 0) {
            // 日期转换为时间戳
            res.data = this.dateFontsFiter(this.dateFonts, res.data);
            this.addForm = res.data;
            this.showDialog = true;
            this.dialogTitle = '编辑信息';
            this.dialogType = 'edit';
          } else {
            Message({
              message: `获取详情失败，请刷新浏览器！！！ ${res.status}`,
              // type: 'error',
              duration: 1500
            });
          }
        });
      },
      /** 删除 **/
      delete(e, d) {
        MessageBox.confirm('您确定删除吗？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sendData(`${this.url}/${d.id}`, '', 'delete', res => {
            if (res.code == 0) {
              Message({
                message: '删除成功！！！',
                // type: 'error',
                duration: 1500
              });
              this.update++;
            }
          });
        })
      },
      /** 取消 **/
      resetAddForm(e, d) {
        this.showDialog = false;
        this.initForm();
      },
      /** 初始化表单 **/
      initForm() {
        this.addForm = {
          id: '',  // int(11) NOT NULL COMMENT '组织id',
          pid: '',  // int(11) DEFAULT NULL COMMENT '组织父id',
          organization_name: '',  // varchar(50) DEFAULT NULL COMMENT '组织名称',
          organization_part: '',  // varchar(50) DEFAULT NULL COMMENT '牵头部门',
          organization_secretary_name: '',  // varchar(50) DEFAULT NULL COMMENT '书记',
          organization_secretary_phone: '',  // varchar(50) DEFAULT NULL COMMENT '书记电话',
          organization_deputy_secretary_name: '',  // varchar(50) DEFAULT NULL COMMENT '副书记',
          organization_contact_name: '',  // varchar(50) DEFAULT NULL COMMENT '联系人',
          organization_contact_phone: '',  // varchar(50) DEFAULT NULL COMMENT '联系人电话',
          organization_commissioner: '',  // varchar(255) DEFAULT NULL COMMENT '委员',
          organization_date: '',  // varchar(20) DEFAULT NULL COMMENT '成立时间',
        }
      },
      // 确定
      submitAddForm(formName, type) {
        let _this = this, sendType = 'get', url = this.urls.organization;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.validates.validatPhone(this.addForm.organization_contact_phone) ||
              !this.validates.validatPhone(this.addForm.organization_secretary_phone)
            ) {
              Message({
                message: '请填写正确的手机号 ！！！',
                type: 'err',
                duration: 1500
              });
              return false;
            }
            if (type == 'new') {
              sendType = 'post';
              delete _this.addForm.id;
              _this.addForm.pid = _this.$route.params.id;
              // delete _this.addForm.pid;
              // url = '/account';
            } else if (type == 'edit') {
              sendType = 'put';
              url = url + '/' + _this.addForm.id;
            }
            delete _this.addForm.child;
            // 日期转换为时间戳
            this.addForm = this.dateFontsFiter(this.dateFonts, this.addForm);
            _this.sendData(url, this.addForm, sendType, res => {
              if (res.code == 0) {
                Message({
                  message: type == 'new' ? '新增成功！！！' : '修改成功！！！',
                  type: 'success',
                  duration: 1500
                });
                this.showDialog = false;
                this.initForm();
                this.update++;
              }
            });
          }

        });
      },
      // 发送数据
      sendData(url, data, type, call) {
        http.http(url, data, type).then(res => {
          if (typeof(call) == 'function') {
            call(res);
          }
        });
      },
      // 获取数据
      getData(url, data, type, call) {
        http.http(url, data, type).then(res => {
          if (typeof(call) == 'function') {
            call(res);
          }
        });
      },
      /** 时间 转为13位时间戳 **/
      formatTime(time, tar) {
        let t = this.dateformat.timeStamp(time, 13);
        if (tar) {
          this.addForm[tar] = t;
        }
        return t;
      },
      /** 将指定的日期转为时间戳
       * 接收字段名 和 总数据
       * **/
      dateFontsFiter(arr, tar) {
        for (let i in arr) {
          if (typeof(tar[tar[i]]) !== 'number') {
            tar[arr[i]] = this.formatTime(tar[arr[i]]);
          }
        }
        return tar;
      },
    }
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
