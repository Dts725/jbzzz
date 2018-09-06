<template>
  <div class="app-container">
    <list :url="URL+url" :update="update" :topBar="topBar" :canSelect="canSelect" :indexBar="indexBar"
          :thead="thead" :actionBarWidth="actionBarWidth" @cellClick="cellClick"
          :actionBar="actionBar"></list>

    <!-- 弹出框 -->
    <el-dialog :title="dialogTitle" :dialogType="dialogType" :visible.sync="showDialog" center>
      <!--<el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">-->
      <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-ruleForm">
        <!--<el-row :gutter="20">-->
        <el-row>
          <el-col :span="12">
            <el-row>
              <!--<el-col :span="12">-->
              <el-form-item label="姓名" prop="organization_name">
                <el-input v-model="addForm.contacts_name"></el-input>
              </el-form-item>
              <!--</el-col>-->

            </el-row>
            <el-row>
              <!--<el-col :span="12">-->
              <el-form-item label="性别" prop="organization_part">
                <!--<el-input v-model="addForm.organization_part"></el-input>-->
                <el-radio-group v-model="addForm.contacts_sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <!--</el-col>-->
            </el-row>

            <el-row>
              <!--<el-col :span="12">-->
              <el-form-item label="联系人电话" prop="organization_contact_phone">
                <el-input v-model="addForm.contacts_phone"></el-input>
              </el-form-item>
              <!--</el-col>-->
            </el-row>

            <el-row>
              <!--<el-col :span="12">-->
              <el-form-item label="邮箱" prop="organization_contact_name">
                <el-input v-model="addForm.contacts_email"></el-input>
              </el-form-item>
              <!--</el-col>-->
            </el-row>

            <el-row>
              <!--<el-col :span="12">-->
              <el-form-item label="工作岗位" prop="organization_deputy_secretary_name">
                <el-input v-model="addForm.contacts_job"></el-input>
              </el-form-item>
              <!--</el-col>-->
            </el-row>

            <el-row>
              <!--<el-col :span="12">-->
              <el-form-item label="政治面貌" prop="contacts_politics">
                <el-input v-model="addForm.contacts_politics"></el-input>
              </el-form-item>
              <!--</el-col>-->
            </el-row>
          </el-col>


          <el-col :span="12">
            <el-form-item label="照片" prop="organization_commissioner">
              <el-upload
                class="avatar-uploader"
                name="file"
                :action="uploadURL"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="addForm.contacts_photo" :src="imgUrl+addForm.contacts_photo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <!--&lt;!&ndash;<el-input v-model="addForm.organization_commissioner"></el-input>&ndash;&gt;-->
              <!--<div class="allPics">-->
              <!--&lt;!&ndash;v-bind:class="{allPics:imgList.length>0}" &ndash;&gt;-->
              <!--<input type="file" name="file" multiple @change="uploadPic" class="imgInput">-->
              <!--<div style="position:relative;border:1px solid #ddd;min-width: 4rem;min-height: 5rem;">-->
              <!--<img :src="imgUrl+addForm.contacts_job" alt="" class="addPic">-->
              <!--&lt;!&ndash;<i class="el-icon-circle-close"&ndash;&gt;-->
              <!--&lt;!&ndash;style="position:absolute;top: 1px;left: 144px;color:blue;cursor:pointer;"&ndash;&gt;-->
              <!--&lt;!&ndash;@click="delImgList"></i>&ndash;&gt;-->
              <!--</div>-->
              <!--&lt;!&ndash;<div v-for="(data,i) in addForm.contacts_job" :key="i" style="position:relative;">&ndash;&gt;-->
              <!--&lt;!&ndash;<img :src="imgUrl+imgList[i]" alt="" class="addPic">&ndash;&gt;-->
              <!--&lt;!&ndash;<i class="el-icon-circle-close"&ndash;&gt;-->
              <!--&lt;!&ndash;style="position:absolute;top: 1px;left: 144px;color:blue;cursor:pointer;"&ndash;&gt;-->
              <!--&lt;!&ndash;@click="delImgList(i)"></i>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--</div>-->
            </el-form-item>
          </el-col>
        </el-row>


        <el-form-item class="align-right">
          <el-button type="primary" @click="submitAddForm('addForm', dialogType)">确定</el-button>
          <el-button @click="resetAddForm('addForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 弹窗 党员表 -->
    <el-dialog :title="memberDialogTitle" :visible.sync="showMemberDialog" center :top="memberDialogTop">
      <el-table :data="memberDialogList" style="width: 100%">
        <el-table-column prop="user_name" label="姓名" align="center" width="120"></el-table-column>
        <el-table-column prop="user_sex" label="性别" align="center" width="60"></el-table-column>
        <el-table-column prop="user_telephone" label="联系电话" align="center" width="auto"></el-table-column>
        <el-table-column prop="user_temp_team" label="保障组别" align="center" width="auto"></el-table-column>
        <el-table-column prop="user_job" label="党内职务" align="center" width="auto"></el-table-column>
        <el-table-column prop="user_organization_name" label="所在临时党组织" align="center" width="150"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
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
          {name: '搜索', key: 'organization_name', searchTipCon: '请输入名称', class: ''},
        ],
        // topBar: {
        //   useNewBtn: {btnName: '新增', btnClass: '', btnType: 'success', keys: [], fun: this.newRole},
        //   useSearch: {key: 'organization_name', btnName: '搜索', searchTipCon: '请输入名称'}
        // },
        // 表格头- 是否可选
        canSelect: false,
        // 表格头- 索引序号
        indexBar: {name: '序号', key: 'auto', width: '60'},
        // 表格头 - 字段内容
        thead: [
          // {name: "照片", key: 'contacts_photo', width: '110'},
          {name: "姓名", key: 'contacts_name', width: 'auto'},
          {name: "性别", key: 'contacts_sex', width: '110'},
          {name: "联系电话", key: 'contacts_phone', width: 'auto'},
          {name: "邮箱", key: 'contacts_email', width: 'auto'},
          {name: "工作岗位", key: 'contacts_job', width: 'auto'},
          {name: "政治面貌", key: 'contacts_politics', width: '110'},
          {name: "创建日期", key: 'contacts_date', width: '120', format: 'yyyy - MM - dd'},
        ],
        update: 0, // 手动更新数据，每次接收 +1 的值 如：传 update++
        // 表格头 - 最右边的功能区
        actionBar: [
          {name: '编辑', fun: this.edit, type: 'success'},
          {name: '删除', fun: this.delete, type: 'danger'},
          // {name: '支部', fun: this.branch, type: 'primary'},
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
          // CREATE TABLE `contacts` (
          id: '', // int(11) NOT NULL AUTO_INCREMENT COMMENT '考评id',
          contacts_name: '', // varchar(20) DEFAULT NULL COMMENT '姓名',
          contacts_sex: '', // varchar(20) DEFAULT NULL COMMENT '性别',
          contacts_phone: '', // varchar(20) DEFAULT NULL COMMENT '联系方式',
          contacts_email: '', // varchar(50) DEFAULT NULL COMMENT '邮箱',
          contacts_photo: '', // varchar(255) DEFAULT NULL COMMENT '照片',
          contacts_job: '', // varchar(50) DEFAULT NULL COMMENT '工作岗位',
          contacts_politics: '', // varchar(20) DEFAULT NULL COMMENT '政治面貌',
          contacts_date: '', // varchar(20) DEFAULT NULL COMMENT '成立日期',
          //   PRIMARY KEY (`id`)
          // ) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COMMENT='指挥部联系人表';
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
        },

        /** *************** 弹窗的  end *************** **/
        url: '/contacts',

        // 需要转换为时间戳的日期字段
        dateFonts: ['contacts_date'],
        /** *************** 党组织下的党员表-弹窗  start *************** **/
        memberDialogTitle: '',
        showMemberDialog: false,
        memberDialogList: [],
        memberDialogTop: '1vh',
        /** *************** 党组织下的党员表-弹窗  end *************** **/


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
      	
        // // 获取角色列表
        // http.get('/role').then(res => {
        //   if (res.code == 0) {
        //     this.roleList = res.data.data;
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
      /** 单元格点击事件 **/
      cellClick(obj) {
        let tar = obj.event.target.innerText;
        if (tar.length > 0 && tar.length < 11 && Number(tar)) {
          this.memberDialogTitle = obj.row.organization_name;
          http.get(`/user?user_organization_id=${obj.row.id}`).then(res => {
            if (res.code == 0) {
              this.memberDialogList = res.data.data;
              if (res.data.data.length > 10) {
                this.memberDialogTop = '1vh';
              } else {
                this.memberDialogTop = '15vh';
              }
              this.showMemberDialog = true;
            }
          });
        } else {
          return;
        }
      },
      /** 新建 **/
      newRole(e, d) {
        this.showDialog = true;
        this.dialogTitle = '新增联系人';
        this.dialogType = 'new';
        this.initForm();
       //console.log('fgfg')
      // console.log(JSON.parse(this.storage.getStorage('uinfo')).username)
      },
      /** 支部 **/
      branch(e, d) {
        this.$router.push({name: 'branch', params: {id: d.id}});
      },
      /** 编辑 **/
      edit(e, d) {
      	//debugger;
      	// console.log('fgfg')
        this.getData(`${this.URL}${this.url}/${d.id}`, '', 'get', res => {
          if (res.code == 0) {
            // 日期转换为时间戳
            res.data = this.dateFontsFiter(this.dateFonts, res.data);
            // res.data.organization_date = this.dateformat.format(new Date(Number(res.data.organization_date)));
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
        // this.showMemberDialog = false;
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
          id: '', // int(11) NOT NULL AUTO_INCREMENT COMMENT '考评id',
          contacts_name: '', // varchar(20) DEFAULT NULL COMMENT '姓名',
          contacts_sex: '', // varchar(20) DEFAULT NULL COMMENT '性别',
          contacts_phone: '', // varchar(20) DEFAULT NULL COMMENT '联系方式',
          contacts_email: '', // varchar(50) DEFAULT NULL COMMENT '邮箱',
          contacts_photo: '', // varchar(255) DEFAULT NULL COMMENT '照片',
          contacts_job: '', // varchar(50) DEFAULT NULL COMMENT '工作岗位',
          contacts_politics: '', // varchar(20) DEFAULT NULL COMMENT '政治面貌',
          contacts_date: '', // varchar(20) DEFAULT NULL COMMENT '成立日期',
        }
      },
      // 确定
      submitAddForm(formName, type) {
        let _this = this, sendType = 'get', url = this.urls.contacts;

        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (type == 'new') {
              sendType = 'post';
              delete _this.addForm.id;
              delete _this.addForm.pid;
              // url = '/account';
            } else if (type == 'edit') {
              sendType = 'put';
              url = url + '/' + _this.addForm.id;
            }
            delete _this.addForm.child;
            // 日期转换为时间戳
            this.addForm = this.dateFontsFiter(this.dateFonts, this.addForm);
            if (!this.addForm.contacts_date) {
              this.addForm.contacts_date = new Date().getTime();
            }
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
      uploadPic(e) {
        console.log(e);
        let type = e.target.files[0],
          file = "",
          param = "",
          lis = e.target.files;
        for (let i = 0; i < lis.length; i++) {
          if (this.beforeAvatarUpload(lis[i])) {
            file = lis[i];
            param = new FormData(); // 创建form对象
            param.append("file", file, file.name); // 通过append向form对象添加数据
            let config = {
              headers: {"Content-Type": "multipart/form-data"}
            }; // 添加请求头

            $axios.post(this.uploadURL, param, config).then(response => {
              this.handlePictureListPreview(response.data);
            });
          }
        }
      },
      //上传多张图片
      handlePictureListPreview(res, file, fileList) {
        this.imgList.push(res.data.store_result);
        console.log(this.imgList);
      },
      //删除单张图片
      delImgList(i) {
        this.$confirm("确定删除图片吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.imgList.splice(i, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },

      handleAvatarSuccess(res, file) {
        // this.addForm.contacts_photo = URL.createObjectURL(file.raw);
        if (res.code == 0) {
          this.addForm.contacts_photo = res.data.store_result;
        } else {
          Message({
            message: `上传失败！！！ ${res.status}`,
            type: 'warning',
            duration: 1500
          });
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 20;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },


    }
  }
</script>
<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .header {
    .el-input {
      width: 20%;
    }
  }

  .pagination {
    text-align: right;
    margin-top: 2rem;
  }

  /* 新增图片 */
  .imgInput {
    background: url(../../../static/add.png) no-repeat;
    border: none;
    text-indent: -2000px;
    width: 100px;
    height: 100px;
    background-size: cover;
    color: white;
    cursor: pointer;
    margin-top: 10px;
    margin-right: 50px;
  }

  .allPics {
    border: 1px solid #ccc;
    padding: 18px 15px 10px 20px;
    width: auto;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
  }

  .addPic {
    width: 160px;
    height: 120px;
    // border: 1px dashed #6fb6ff;
    margin-right: 5%;
  }
</style>
