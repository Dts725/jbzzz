<template>
  <div>
    <!-- 弹窗start -->
    <!-- 弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="showDialog" center top="15vh" :modal='true' :append-to-body='true'>
      <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-ruleForm disabled">
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
              <el-date-picker v-model="addForm.user_birth" type="datetime" size="medium" format="yyyy - MM - dd" @change="formatTime(addForm.user_birth, 'user_birth')" placeholder="选择日期时间">
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
              <el-date-picker v-model="addForm.user_in_date" type="datetime" size="medium" format="yyyy - MM - dd" @change="formatTime(addForm.user_in_date,'user_in_date')" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="转正日期" prop="user_become_date">
              <el-date-picker v-model="addForm.user_become_date" type="datetime" size="medium" format="yyyy - MM - dd" @change="formatTime(addForm.user_become_date,'user_become_date')" placeholder="选择日期时间">
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
              <el-input size="medium" v-if="addForm.user_job == 1" value="书记"></el-input>
              <el-input size="medium" v-if="addForm.user_job == 2" value="副书记"></el-input>
              <el-input size="medium" v-if="addForm.user_job == 3" value="委员"></el-input>
              <el-input size="medium" v-if="addForm.user_job == 4" value="党员"></el-input>



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
</template>

<script>
export default {
  props: {
    dialogTitle: {
      type: String,
      default: "组织部"
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    addForm: {
      type: Object,
      default: {}
    }
  },
  name: "detailsInfo",
  data() {
    return {};
  },

};
</script>

<style scoped>
.disabled {
  pointer-events: none;
  cursor: default;
  opacity: 0.8;
}
</style>

