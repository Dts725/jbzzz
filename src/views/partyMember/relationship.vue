<template>
  <div class="app-container">
    <list :url="URL+url" :update="update" :topBar="topBar" :canSelect="canSelect" :indexBar="indexBar"
          :thead="thead"
          :actionBar="actionBar"></list>

    <!-- 弹出框 -->
    <el-dialog :title="dialogTitle" :dialogType="dialogType" :visible.sync="showDialog" center top="10%" width="850px" @close='closeDialog' custom-class="el-dialog-H">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <p>
          <el-input style="width:25%" v-model="num" placeholder="请输入身份证号" clearable></el-input>
          <!--<el-button size="small" type="primary" @click="_searchCon(num)" icon="el-icon-search">{{topBar.useSearch.btnName}}</el-button>-->
          <el-button size="small" type="primary" @click="_searchCon(num)" icon="el-icon-search">搜索</el-button>
        </p>
        <nav class="nav1">
          <div class="shuju" v-if="isShow==1">
            <span>姓名:</span><span>{{isShow==1?addForm.user_name:''}}</span>
            <span class="sex">性别:</span><span>{{isShow==1?addForm.user_sex:''}}</span>
            <span class="card">身份证号:</span><span>{{isShow==1?addForm.user_card:''}}</span>
            <span class="phone">联系方式:</span><span>{{isShow==1?addForm.user_telephone:''}}</span>
          </div>
          <div :class="isShow==2?'msj':'noShow'">暂无数据</div>
        </nav>
        <div class="nav">
          <div class="now">
            <span class="now-span">现所在党支部</span><span class="now-span1">{{isShow==1?addForm.user_organization_name:''}}</span>
          </div>
          <div class="transfer" v-if="isShowzb == 1">
            <span class="transfer-span">转移到所在支部</span>
            <select class="transfer-se" id="sel">
              <option v-for="item in organizationList" :key="item.organization_id" :value="item.organization_id">{{item.organization_name}}</option>
            </select>
          </div>
          <div class="transfer" v-if="isShowzb == 2">
            <!--<span class="transfer-span">如果确认转移，该党员数据将从数据库中删除</span>-->
            <!-- <select class="transfer-se" id="sel">
              <option v-for="item in organizationList" :key="item.organization_id" :value="item.organization_id">{{item.organization_name}}</option>
            </select> -->
          </div>
        </div>
        <el-form-item class="align-right">
          <el-button type="primary" @click="submitAddForm('addForm', dialogType)">确定</el-button>
          <el-button @click="resetAddForm('addForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import http from "@/api/http";
  import list from "@/components/TableList";
  import { Message, MessageBox } from "element-ui";

  export default {
    components: {
      list
    },
    data() {
      return {
        /** *************** 引用的表格的  start *************** **/
        num: "",
        isShow: 2,
        isShowzb: 1,
        transfer_type: 1,
        listLoading: true,
        // 列表头部的功能区--key为搜索的字段名
        topBar:[
          {name: '组织变更', type: 'success', class: '', fun: this.newRole},
          {name: '离开岗位', type: 'primary', class: '', fun: this.newRole1},
          {name: '搜索', key: 'user_name', searchTipCon: '请输入党员姓名', class: ''},
        ],
        // topBar: {
        //   useNewBtn: {
        //     btnName: "组织变更",
        //     btnClass: "",
        //     btnType: "success",
        //     keys: [],
        //     fun: this.newRole
        //   },
        //   useNewBtn1: {
        //     btnName: "离开岗位",
        //     btnClass: "",
        //     btnType: "primary",
        //     keys: [],
        //     fun: this.newRole1
        //   },
        //   useSearch: {
        //     key: "user_name",
        //     btnName: "搜索",
        //     searchTipCon: "请输入党员姓名"
        //   }
        // },
        // 表格头- 是否可选
        canSelect: false,
        // 表格头- 索引序号
        indexBar: { name: "编号", key: "auto", width: "60" },
        // 表格头 - 字段内容
        thead: [
          { name: "党员姓名", key: "user_name", width:'auto' },
          { name: "联系方式", key: "user_telephone", width:'auto' },
          { name: "所属组织", key: "organization_name", width:'auto' },
          { name: "变更类型", key: "transfer_type", filterCon:[{key:1,value:'组织变更'},{key:2,value:'离开岗位'}], width:'auto' },
          { name: "办理时间", key: "transfer_date", width:'auto', format: 'yyyy - MM - dd' },
        ],
        update: 0, // 手动更新数据，每次接收 +1 的值 如：传 update++
        // 表格头 - 最右边的功能区
        actionBar: [],
        //   actionBar: [{ name: "详情", fun: this.edit, type: "success" }],
        /** *************** 引用的表格的  end *************** **/

        /** *************** 弹窗的  start *************** **/
        showDialog: false, //
        dialogTitle: "", // 弹窗标题
        dialogType: "", // 弹窗类型  用来区分新增或编辑

        // 新增弹出表单
        addForm: {
          id: "", // int(11) NOT NULL,
          user_name: "", // varchar(20) DEFAULT '' COMMENT '姓名',
          user_id: "",
          user_sex: "", // varchar(20) DEFAULT NULL COMMENT '性别',

          user_nation: "", // 民族
          user_birth: "", // varchar(20) DEFAULT NULL COMMENT '出生日期',

          user_card: "", // varchar(20) DEFAULT NULL COMMENT '身份证',
          user_education: "", // varchar(20) DEFAULT NULL COMMENT '学历',

          user_address: "", // 家庭住址
          user_telephone: "", // varchar(20) DEFAULT NULL COMMENT '联系电话',

          user_in_date: "", // varchar(20) DEFAULT NULL COMMENT '入党日期',
          user_become_date: "", // varchar(20) DEFAULT NULL COMMENT '转正日期',

          user_dispatched_unit: "", // varchar(50) DEFAULT NULL COMMENT '派出单位',
          user_origin_unit: "", // varchar(50) DEFAULT NULL COMMENT '原单位',

          user_temp_team: "", // varchar(20) DEFAULT NULL COMMENT '保障组别',
          user_job: "", // varchar(50) DEFAULT NULL COMMENT '党内职务',

          user_origin_organization_id: "", // varchar(11) DEFAULT NULL '原党组织id',
          user_organization_id: "", // varchar(11) DEFAULT NULL COMMENT '现所在临时党组织id',

          // user_temp_job: '',  // varchar(20) DEFAULT NULL COMMENT '保障组职务',
          user_status: "" // varchar(3) DEFAULT '1' COMMENT '1未转出 2已转出',

          //     PRIMARY KEY (`id`)
          // ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='党员表';
        },
        // 表单验证规则
        rules: {
          // 名称
          user_name: [
            { required: true, message: "请输入姓名", trigger: "blur" },
            { min: 2, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
          ],
          // 性别
          user_sex: [
            { required: true, message: "请选择性别", trigger: "change" }
          ],
          // 身份证
          user_card: [
            { required: true, message: "请输入身份证", trigger: "blur" }
          ],
          // 出生日期
          user_birth: [
            { required: true, message: "请选择出生日期", trigger: "blur" }
          ],
          // 学历
          user_education: [
            { required: true, message: "请输入学历", trigger: "blur" }
          ],
          // 联系电话
          user_telephone: [
            { required: true, message: "请输入联系电话", trigger: "blur" }
          ],
          // 入党日期
          user_in_date: [
            { required: true, message: "请选择入党日期", trigger: "blur" }
          ],
          // 转正日期
          user_become_date: [
            { required: true, message: "请选择转正日期", trigger: "blur" }
          ],
          // 派出单位
          user_dispatched_unit: [
            { required: true, message: "请输入派出单位", trigger: "blur" }
          ],
          // 原单位
          user_origin_unit: [
            { required: true, message: "请输入原单位", trigger: "blur" }
          ],
          // 职务
          user_job: [{ required: true, message: "请输入职务", trigger: "blur" }],
          // 原党组织id
          user_origin_organization_id: [
            { required: true, message: "请选择原党组织", trigger: "blur" }
          ],
          // 党组织id
          user_organization_id: [
            { required: true, message: "请选择党组织", trigger: "blur" }
          ],
          // // 保障组职务
          // user_temp_job: [
          //   {required: true, message: '请输入保障组职务', trigger: 'blur'}
          // ],
          // 保障组别
          user_temp_team: [
            { required: true, message: "请输入保障组别", trigger: "blur" }
          ],
          // 转出状态
          user_status: [
            { required: true, message: "请选择转出状态", trigger: "blur" }
          ],
          // 家庭住址
          user_address: [
            { required: true, message: "请输入家庭住址", trigger: "blur" }
          ],
          // 民族
          user_nation: [
            { required: true, message: "请输入民族", trigger: "blur" }
          ]
        },
        // 党组织列表
        organizationList: [{
          organization_id:'',
          organization_name:''
        }],
        // 社区列表
        communityList: [],
        test: {
          user_telephone: 111111111
        },
        /** *************** 弹窗的  end *************** **/
        url: "/transfer",

        // 需要转换为时间戳的日期字段
        dateFonts: ["user_birth", "user_in_date", "user_become_date"],
        // 列表头部的功能区--key为搜索的字段名

        transfer: {
          user_id: "",
          transfer_type: "",
          transfer_date: "",
          organization_id: ""
        }
      };
    },
    created() {
      // this.init();
    },
    activated() {
      // this.init();
    },

    methods: {
      /** 内部转移 **/
      newRole(e, d) {
        this.showDialog = true;
        this.dialogTitle = "组织变更";
        this.dialogType = "new";
        this.isShow = 2;
        this.isShowzb = 1;
        this.transfer_type=1;
        http.get("/organization").then(res => {
          if (res.code == 0) {
            let arr = [];
            res.data.data.forEach((element,index) => {
              arr[index]=({
                organization_id:element.id,
                organization_name:element.organization_name
              })
            });
            this.organizationList = arr;
          }
        });
      },
      newRole1(e, d) {
        this.showDialog = true;
        this.dialogTitle = "离开岗位";
        this.dialogType = "new";
        this.isShowzb = 2;
        this.isShow = 1;
        this.transfer_type= 2;
      },
      _searchCon(e) {
        this.getData(`${this.URL}/user?user_card=${e}`, "", "get", res => {
          if (res.code == 0) {
            // 日期转换为时间戳
            res.data.data = this.dateFontsFiter(this.dateFonts, res.data.data);
            this.addForm = res.data.data[0];
            if (res.data.data.length == 1) {
              this.isShow = 1;
            } else {
              this.isShow = 2;
            }
          } else {
            Message({
              message: `获取详情失败，请刷新浏览器！！！ ${res.status}`,
              // type: 'error',
              duration: 1500
            });
          }
        });
      },
      /** 编辑账号 **/
      edit(e, d) {
        this.getData(`${this.URL}${this.url}/${d.id}`, "", "get", res => {
          if (res.code == 0) {
            // 日期转换为时间戳
            res.data = this.dateFontsFiter(this.dateFonts, res.data);
            this.addForm = res.data;
            this.showDialog = true;
            this.dialogTitle = "信息详情";
            this.dialogType = "edit";
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
      // delete(e, d) {
      //   MessageBox.confirm("您确定删除吗？", "删除", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   }).then(() => {
      //     this.sendData(`${this.url}/${d.id}`, "", "delete", res => {
      //       if (res.code == 0) {
      //         Message({
      //           message: "删除成功！！！",
      //           // type: 'error',
      //           duration: 1500
      //         });
      //         this.update++;
      //       }
      //     });
      //   });
      // },
      /** 取消 **/
      resetAddForm(e, d) {
        this.showDialog = false;
        this.initForm();
        this.organizationList = [];
        this.num = ''
      },
      /**关闭弹框 */
      closeDialog(){
        this.num = '';//清空数据
      },
      /** 初始化表单 **/
      initForm() {
        this.addForm = {
          id: "", // int(11) NOT NULL,
          user_name: "", // varchar(20) DEFAULT '' COMMENT '姓名',
          user_sex: "", // varchar(20) DEFAULT NULL COMMENT '性别',

          user_nation: "", // 民族
          user_birth: "", // varchar(20) DEFAULT NULL COMMENT '出生日期',

          user_card: "", // varchar(20) DEFAULT NULL COMMENT '身份证',
          user_education: "", // varchar(20) DEFAULT NULL COMMENT '学历',

          user_address: "", // 家庭住址
          user_telephone: "", // varchar(20) DEFAULT NULL COMMENT '联系电话',

          user_in_date: "", // varchar(20) DEFAULT NULL COMMENT '入党日期',
          user_become_date: "", // varchar(20) DEFAULT NULL COMMENT '转正日期',

          user_dispatched_unit: "", // varchar(50) DEFAULT NULL COMMENT '派出单位',
          user_origin_unit: "", // varchar(50) DEFAULT NULL COMMENT '原单位',

          user_temp_team: "", // varchar(20) DEFAULT NULL COMMENT '保障组别',
          user_job: "", // varchar(50) DEFAULT NULL COMMENT '党内职务',

          user_origin_organization_id: "", // varchar(11) DEFAULT NULL '原党组织id',
          user_organization_id: "" // varchar(11) DEFAULT NULL COMMENT '党组织id',
        };
      },
      // 确定
      submitAddForm(formName, type) {
        this.num = '';
        let _this = this,
          sendType = "get",
          url = this.url;
        this.transfer.user_id = this.addForm.id;
        this.transfer.transfer_type = this.transfer_type;
        this.transfer.transfer_date = new Date().valueOf();
        var Sel = document.getElementById("sel");
        var index = this.transfer_type==1?Sel.selectedIndex:'';
        this.transfer.organization_id = this.transfer_type==1?Sel.options[index].value:'';
        this.$refs[formName].validate(valid => {
          debugger;
          if (valid) {
            if (type == "new") {
              sendType = "post";
            } else if (type == "edit") {
              sendType = "put";
              url = url + "/" + _this.addForm.id;
            }
            _this.sendData(url, this.transfer, sendType, res => {
              if (res.code == 0) {
                Message({
                  // message: type == "new" ? "组织变更成功！！！" : "离岗成功！！！",
                  message: `${this.dialogTitle}成功！！！`,
                  type: "warning",
                  duration: 1500
                });
                this.showDialog = false;
                this.initForm();
                this.organizationList = [];
                this.update++;
              }
            });
          }
        });
      },
      // 发送数据
      sendData(url, data, type, call) {
        http.http(url, data, type).then(res => {
          if (typeof call == "function") {
            call(res);
          }
        });
      },
      // 获取数据
      getData(url, data, type, call) {
        http.http(url, data, type).then(res => {
          if (typeof call == "function") {
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
          if (typeof tar[tar[i]] !== "number") {
            tar[arr[i]] = this.formatTime(tar[arr[i]]);
          }
        }
        return tar;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .now {
    // float: left;
    display: flex;
  }
  .now-span {
    font-size: 1.1rem;
    font-weight: 600;
    color: #000;
    width: 127px;
  }
  .now-span1 {
    display: inline-block;
    border: 1px solid #000;
    margin-left: 1rem;
    height: 1.5rem;
    width: 15rem;
    line-height: 1.5rem;
    padding-left: 0.7rem;
  }
  .transfer {
    margin-top: 1.5rem;
  }
  .transfer-span {
    font-size: 1.1rem;
    font-weight: 600;
    color: red;
  }
  .transfer-se {
    display: inline-block;
    margin-left: 1rem;
    height: 1.5rem;
    width: 15rem;
    line-height: 1.5rem;
    color: red;
    padding: 0 0 0 0.5rem;
  }
  .align-right {
    margin-top: 80px;
  }
  .nav {
    margin-top: 10%;
    height: 25px;
  }
  .nav1 {
    margin-top: 10%;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    padding: 10px 0;
    .shuju {
      font-size: 20px;
      color: #000;
      span {
        padding-right: 10px;
      }
    }
    .msj {
      text-align: center;
      font-size: 20px;
      color: #000;
    }
    .sex,
    .card,
    .phone {
      margin-left: 20px;
    }
    .noShow {
      display: none;
    }
    .noShow1 {
      display: none !important;
    }
    .el-dialog-H{
      height: 600px;
    }
    .el-dialog-H .el-dialog__body{
      padding: 38px 25px 30px;
    }
  }
</style>
