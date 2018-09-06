<template>
  <div class="app-container">
    <list :url="URL+url" :update="update" :topBar="topBar" :canSelect="canSelect" :indexBar="indexBar"
          :thead="thead"
          :actionBar="actionBar"></list>
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
          {name: '搜索', key: 'organization_name', searchTipCon: '请输入党组织', class: ''},
        ],
        // 表格头- 是否可选
        canSelect: false,
        // 表格头- 索引序号
        indexBar: { name: "编号", key: "auto", width: "60" },
        // 表格头 - 字段内容
        thead: [
//        { name: "党员姓名", key: "user_name", width:'auto' },
//        { name: "联系方式", key: "user_telephone", width:'auto' },
//        { name: "所属组织", key: "organization_name", width:'auto' },
//        { name: "变更类型", key: "transfer_type", filterCon:[{key:1,value:'组织变更'},{key:2,value:'离开岗位'}], width:'auto' },
//        { name: "办理时间", key: "transfer_date", width:'auto', format: 'yyyy - MM - dd' },
					{ name: "新组织名称", key: "organization_name", width:'auto' },
          { name: "旧组织名称", key: "organization_old_name", width:'auto' },
          { name: "变更类型", key: "organization_record_type", filterCon:[{key:1,value:'名称变更'},{key:2,value:'组织解散'}], width:'auto' },
          { name: "办理时间", key: "date_time", width:'auto', format: 'yyyy - MM - dd' },
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
        url: "/organization_record",

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
