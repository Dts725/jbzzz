<template>
  <div class=" contian">

    <div class="pr">
      <div class="pa attend-oval-bg attend-line" el="attendComment"></div>
      <ul class="flex-clounm-between padd20">
        <li>
          <p class="attend-oval-color   attend-oval attend-oval-bg attend-oval-margin attend-oval-pad1">组织部{{propsData.organization_part}}</p>
        </li>
        <li>
          <p class="attend-oval-color   attend-oval attend-oval-bg attend-oval-margin attend-oval-pad1">{{propsData.organization_name}}</p>
        </li>
        <li>
          <p class="attend-oval-color   attend-oval attend-oval-bg attend-oval-margin attend-oval-pad1">党支部书记:{{propsData.organization_secretary.join(",")}}</p>
        </li>
        <li>
          <p class="attend-oval-color   attend-oval attend-oval-bg attend-oval-margin attend-oval-pad1">副书记:{{propsData.organization_deputy_secretary.map(x => x.user_name).join(",")}}</p>
        </li>
        <li>
          <p class="attend-oval-color   attend-oval attend-oval-bg attend-oval-margin attend-oval-pad1">委员:{{propsData.organization_commissioner.map(x => x.user_name).join(",")}}</p>
        </li>
      </ul>

    </div>
    <div class="mg-top30 pr">
            <div class="attend-line-party-border pa "></div>
      <ul class="flex-space-nowarp party padd20  overflow-auto">

        <li v-for="(el ,index) in propsData.organization_partner" :key="index" class="pr flex"  @click="detailsInfo(el)">
        <!-- <li v-for="(el ,index) in data" :key="index" class="pr flex"> -->
          <div class="attend-line-center pa"></div>
          <p class="attend-oval-party attend-oval-color attend-oval">{{el.user_name}}</p>
        </li>
      </ul>
      <slot name="party"></slot>
    </div>



  <div>
      <!-- 弹窗start -->
    <!-- 弹出框 -->
    <el-dialog :title="dialogTitle"  :visible.sync="showDialog" center top="15vh" :modal= false   >
      <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-ruleForm">
        <!--<el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">-->
        <!--<el-row :gutter="20">-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="user_name">
              <el-input size="medium" v-model="addForm.user_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="user_sex">
              <el-radio-group v-model="addForm.user_sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="民族" prop="user_nation">
              <el-input size="medium" v-model="addForm.user_nation"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="user_birth">
              <el-date-picker
                v-model="addForm.user_birth"
                type="datetime"
                size="medium"
                format="yyyy - MM - dd"
                @change="formatTime(addForm.user_birth, 'user_birth')"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证" prop="user_card">
              <el-input size="medium" v-model="addForm.user_card"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历" prop="user_education">
              <el-input size="medium" v-model="addForm.user_education"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="家庭住址" prop="user_address">
              <el-input size="medium" v-model="addForm.user_address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="user_telephone">
              <el-input size="medium" v-model="addForm.user_telephone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="入党日期" prop="user_in_date">
              <el-date-picker
                v-model="addForm.user_in_date"
                type="datetime"
                size="medium"
                format="yyyy - MM - dd"
                @change="formatTime(addForm.user_in_date,'user_in_date')"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="转正日期" prop="user_become_date">
              <el-date-picker
                v-model="addForm.user_become_date"
                type="datetime"
                size="medium"
                format="yyyy - MM - dd"
                @change="formatTime(addForm.user_become_date,'user_become_date')"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="派出单位" prop="user_dispatched_unit">
              <el-input size="medium" v-model="addForm.user_dispatched_unit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原单位" prop="user_origin_unit">
              <el-input size="medium" v-model="addForm.user_origin_unit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="原单位所在党组织" prop="user_origin_organization_name">
              <el-input size="medium" v-model="addForm.user_origin_organization_name"></el-input>
              <!--<el-select size="medium" v-model="addForm.user_origin_organization_name" placeholder="请选择党组织">-->
              <!--<el-option v-for="com in organizationList" :key="com.id" :label="com.organization_name"-->
              <!--:value="String(com.id)">-->
              <!--</el-option>-->
              <!--</el-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保障组别" prop="user_temp_team">
              <el-input size="medium" v-model="addForm.user_temp_team"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="现所在临时党组织" prop="organization_name">
                    <el-input size="medium" v-model="addForm.organization_name"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="党内职务" prop="user_job">
              <el-input size="medium" v-model="addForm.user_job"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <!--<el-form-item label="设置社区" prop="communitySelect" v-if="username=='admin'">-->
        <!--<el-select size="medium" v-model="addForm.communitySelect" placeholder="请选择社区">-->
        <!--<el-option v-for="com in communityList" :key="com.id" :label="com.community_name"-->
        <!--:value="com.id">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->

        <!-- <el-form-item class="align-right">
          <el-button type="primary" @click="submitAddForm('addForm', dialogType)">确定</el-button>
          <el-button @click="resetAddForm('addForm')">取消</el-button>
        </el-form-item> -->
      </el-form>
    </el-dialog>

    <!-- 弹窗end -->
  </div>
  </div>
</template>

<script>
  import http from '@/api/http';
  export default {
    name: "framework",
    props: {
      propsData: {
        type: Object,
        default: null
      },
      // showDialog : {
      //   type : Boolean,
      //   default : false,
      // },
    },
    data() {
      return {
        data : ['党员','党员','党员','党员'],
        dialogTitle : "详细信息",
        showDialog : false,

        // 新增弹出表单
        addForm: {
          id: '',  // int(11) NOT NULL,
          user_name: '',  // varchar(20) DEFAULT '' COMMENT '姓名',
          user_sex: '',  // varchar(20) DEFAULT NULL COMMENT '性别',

          user_nation: '',  // 民族
          user_birth: '',  // varchar(20) DEFAULT NULL COMMENT '出生日期',

          user_card: '',  // varchar(20) DEFAULT NULL COMMENT '身份证',
          user_education: '',  // varchar(20) DEFAULT NULL COMMENT '学历',

          user_address: '',  // 家庭住址
          user_telephone: '',  // varchar(20) DEFAULT NULL COMMENT '联系电话',

          user_in_date: '',  // varchar(20) DEFAULT NULL COMMENT '入党日期',
          user_become_date: '',  // varchar(20) DEFAULT NULL COMMENT '转正日期',

          user_dispatched_unit: '',  // varchar(50) DEFAULT NULL COMMENT '派出单位',
          user_origin_unit: '',  // varchar(50) DEFAULT NULL COMMENT '原单位',

          user_temp_team: '',  // varchar(20) DEFAULT NULL COMMENT '保障组别',
          user_job: '',  // varchar(50) DEFAULT NULL COMMENT '党内职务',

          user_origin_organization_name: '',  // varchar(11) DEFAULT NULL '原党组织id',
          user_organization_id: '',  // varchar(11) DEFAULT NULL COMMENT '现所在临时党组织id',

          // user_temp_job: '',  // varchar(20) DEFAULT NULL COMMENT '保障组职务',
          user_status: '',  // varchar(3) DEFAULT '1' COMMENT '1未转出 2已转出',

          //     PRIMARY KEY (`id`)
          // ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='党员表';
        },
      };
    },
    created() {

    },
    activated() {

    },
    methods : {
      detailsInfo (item) {
        this.showDialog = true;
        this.dialogTitle = item.user_name;
        http.get('/user/' + item.id).then(res =>{
          this.addForm= res.data;
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .padd20 {
    padding: 0 20px 20px;
  }

  .party>li:nth-last-of-type(1)>div {
    width: 0px;
    // margin-left: -0.5rem;
  }
  // .party>li:nth-last-of-type(1)>p {
  //  margin-right: 3rem;
  // }
  .mg-top30 {
    margin-top: 12px;
  }
</style>
