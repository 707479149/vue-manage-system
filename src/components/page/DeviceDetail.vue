<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 设备详情
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <div class="device-info">
            <div class="device-info-list">设备编码IMEI：<span>{{ form.device_no }}</span></div>
            <div class="device-info-list">SN：<span>{{ form.sn }}</span></div>
            <div class="device-info-list">状态：<span>{{ form.state}}</span></div>
            <div class="device-info-list">上报状态：<span>{{form.report_state}}</span></div>
          </div>
          <div class="device-info-report">最新一次上报时间：<span>{{formatDate(form.last_report_time)}}</span></div>
          <div class="device-info-report">最新一次上报内容：<span>{{form.report_content}}</span></div>
            <el-table
                    :data="form.port_detail"
                    border
                    class="table"
                    header-cell-class-name="table-header">
                <el-table-column prop="port_seq" label="端口号" width="100" align="center"></el-table-column>
                <el-table-column prop="state" label="状态" width="150"></el-table-column>
                <el-table-column prop="report_state" label="最新上报状态" width="150"></el-table-column>
                <el-table-column prop="report_content" label="最新上报内容"></el-table-column>
                <el-table-column prop="last_report_time"  :formatter="formatRowDate"  label="最后一次上报时间" width="100"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import { GetDeviceDetail } from '../../api/index';
    export default {
        data() {
            return {
                query: {
                    id: '',
                },
                form:{
                  device_no:"",
                  sn:"",
                  state:"",
                  report_state:"",
                  report_content:"",
                  last_report_time:"",
                  port_detail:[],
                },
            };
        },
        created() {
            this.getData(this.$route.query.id);
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData($device_id) {
                GetDeviceDetail({id: $device_id}).then(res => {
                    console.log(res)
                    this.form = res.data;
                });
            },
          formatRowDate(row){
            return this.formatDate(row.last_report_time)
          },
          formatDate(time) {
              if (time == 0 || time == "") {
                return ""
              }
              let date = new Date(parseInt(time) * 1000);
              let Y = date.getFullYear() + '-';
              let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
              let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
              let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
              let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
              let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
              return Y + M + D + h + m + s;
            }

        }
    }
</script>
<style>
    .device-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px
    }

    .device-info-list {
        width: 60%;
        font-size: 14px;
        color: #8c939d;
        line-height: 25px;
    }
    .device-info-report {
      font-size: 14px;
      color: #8c939d;
      line-height: 25px;
      margin-bottom: 20px;
    }
</style>