<template>
      <div id="fileExport" style="visibility: hidden;">
        <!--<div class="review-title">-->
        <!--<div class="review-left">-->
        <!--<i class="fa fa-id-card"></i>-->
        <!--<span>基本情况</span>-->
        <!--</div>-->
        <!--<div class="review-right">-->
        <!--&lt;!&ndash;<i class="fa fa-plus" @click="EventAdd"></i>&ndash;&gt;-->
        <!--</div>-->
        <!--</div>-->
        <!--<strong>姓名:</strong>{{addForm.user_name}}-->
        <table style="border-collapse: collapse; text-align:center;width:100%;" >
          <tr>
            <td style="border:1px solid #666; padding:0.5rem; color:#f00;background-color:#f3d19e;" colspan="4"><strong>党员综合评价表</strong>
            </td>
          </tr>
          <tr>
            <td style="border:1px solid #666; padding:0.5rem; width:300px;"><strong>姓名</strong></td>
            <td style="border:1px solid #666; padding:0.5rem;width:500px;">{{detailData.user_name}}</td>
            <td style="border:1px solid #666; padding:0.5rem; width:300px;"><strong>姓别</strong></td>
            <td style="border:1px solid #666; padding:0.5rem;width:500px;">{{detailData.user_sex}}</td>
          </tr>
          <tr>
            <td style="border:1px solid #666; padding:0.5rem; width:300px;"><strong>原单位</strong></td>
            <td style="border:1px solid #666; padding:0.5rem;width:500px;">{{detailData.user_origin_unit}}</td>
            <td style="border:1px solid #666; padding:0.5rem; width:300px;"><strong>出生日期</strong></td>
            <!--<td style="border:1px solid #666; padding:0.5rem;width:500px;" >{{detailData.user_birth}}</td>-->
            <td style="border:1px solid #666; padding:0.5rem;width:500px;">
              {{detailData.user_birth&&detailData.user_birth.length>9?dateformat.format(new
              Date(isNaN(Number(detailData.user_birth))?detailData.user_birth:Number(detailData.user_birth)),
              'yyyy-MM-dd'):''}}
            </td>
          </tr>
          <tr>
            <td style="border:1px solid #666; padding:0.5rem; width:300px;"><strong>派出单位</strong></td>
            <td style="border:1px solid #666; padding:0.5rem;width:500px;">{{detailData.user_dispatched_unit}}</td>
            <td style="border:1px solid #666; padding:0.5rem; width:300px;"><strong>党内职务</strong></td>
            <td style="border:1px solid #666; padding:0.5rem;width:500px;">{{detailData.user_job}}</td>
          </tr>
          <tr>
            <td style="border:1px solid #666; padding:0.5rem; width:300px;"><strong>原单位所在党组织</strong></td>
            <td style="border:1px solid #666; padding:0.5rem;width:500px;">
              {{detailData.user_origin_organization_name}}
            </td>
            <td style="border:1px solid #666; padding:0.5rem; width:300px;"><strong>保障组别</strong></td>
            <td style="border:1px solid #666; padding:0.5rem;width:500px;">{{detailData.user_temp_team}}</td>
          </tr>
          <tr>
            <td style="border:1px solid #666; padding:0.5rem; width:300px;"><strong>现所在临时党组织</strong></td>
            <td style="border:1px solid #666; padding:0.5rem;width:500px;">{{detailData.organization_name}}</td>
            <td style="border:1px solid #666; padding:0.5rem; width:300px;"><strong>进保障组时间</strong></td>
            <td style="border:1px solid #666; padding:0.5rem;width:500px;">
              {{detailData.user_temp_in_date&&detailData.user_temp_in_date.length>9?dateformat.format(new
              Date(Number(detailData.user_temp_in_date)), 'yyyy-MM-dd'):''}}
            </td>
          </tr>
          <tr>
            <td style="border:1px solid #666; padding:0.5rem; width:300px;"><strong>出保障组时间</strong></td>
            <td style="border:1px solid #666; padding:0.5rem;width:500px;">
              {{detailData.user_temp_out_date&&detailData.user_temp_out_date.length>9?dateformat.format(new
              Date(Number(detailData.user_temp_out_date)), 'yyyy-MM-dd'):''}}
            </td>
            <td style="border:1px solid #666; padding:0.5rem; width:300px;"><strong>考评日期</strong></td>
            <td style="border:1px solid #666; padding:0.5rem;width:500px;">
              {{detailData.examine_date&&detailData.examine_date.length>9?dateformat.format(new
              Date(Number(detailData.examine_date)), 'yyyy-MM-dd'):''}}
            </td>
          </tr>

          <tr>
            <td style="border:1px solid #666; padding:0.5rem;color:#f00;background-color:#f3d19e;" colspan="4"><strong>关键事件记录</strong>
            </td>
          </tr>
          <!--<tr>-->
          <!--<td style="border:1px solid #666; padding:0.5rem;width:300px;" ><strong>时间</strong></td>-->
          <!--<td style="border:1px solid #666; padding:0.5rem;width:300px;" ><strong>记录人</strong></td>-->
          <!--<td style="border:1px solid #666; padding:0.5rem;width:500px;" colspan="2"><strong>事件</strong></td>-->
          <!--</tr>-->
          <!--<tr v-for="(hs,idx) in EventTempInfo.history" :key="hs.id" v-if="EventTempInfo.history.length>0">-->
          <!--<td style="border:1px solid #666; padding:0.5rem;width:300px;" >{{dateformat.format(new Date(hs.date), 'yyyy - MM - dd')}}</td>-->
          <!--<td style="border:1px solid #666; padding:0.5rem;width:300px;" >{{hs.author}}</td>-->
          <!--<td style="border:1px solid #666; padding:0.5rem;width:500px;text-align:left;" colspan="2">{{hs.event}}</td>-->
          <!--</tr>-->
          <tr v-for="(hs,idx) in EventTempInfo.history" :key="hs.id" v-if="EventTempInfo.history.length>0">
            <td style="border:1px solid #666; padding:0.5rem;width:500px; text-align:left;" colspan="4">
              <div style="margin-bottom:10px;"><strong>时间：</strong>{{dateformat.format(new Date(hs.date),
                'yyyy-MM-dd')}} <strong style="margin-left:30px;">记录人：</strong>{{hs.author}}
              </div>
              <div>{{hs.event}}</div>
            </td>
          </tr>
          <tr v-else>
            <td style="border:1px solid #666; padding:0.5rem;" colspan="4">暂无</td>
          </tr>

          <tr>
            <td style="border:1px solid #666; padding:0.5rem; color:#f00;background-color:#f3d19e;" colspan="4"><strong>个人小结</strong>
            </td>
          </tr>
          <tr>
            <td style="border:1px solid #666; padding:0.5rem;width:500px; text-align:left;" colspan="4">
              {{detailData.examine_summarize}}
            </td>
          </tr>

          <tr>
            <td style="border:1px solid #666; padding:0.5rem; color:#f00;background-color:#f3d19e;" colspan="4"><strong>评价</strong>
            </td>
          </tr>
          <tr>
            <td style="border:1px solid #666; padding:0.5rem;width:500px; text-align:left;" colspan="4">
              {{detailData.examine_assess}}
            </td>
          </tr>
        </table>
      </div>

</template>

<script>
export default {
  data () {
    
  }
}
</script>

<style>

</style>

