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
                <div class="device-info-list">
                    上次登录时间：
                    <span>2019-11-01</span>
                </div>
                <div class="device-info-list">
                    上次登录地点：
                    <span>东莞</span>
                </div>
                <div class="device-info-list">
                    登录时间：
                    <span>2019-11-01</span>
                </div>
                <div class="device-info-list">
                    地点：
                    <span>东莞</span>
                </div>
            </div>
            <el-table
                    :data="form.port_detail"
                    border
                    class="table"
                    header-cell-class-name="table-header">
                <el-table-column prop="port_seq" label="端口号" width="100" align="center"></el-table-column>
                <el-table-column prop="state" label="状态"></el-table-column>
                <el-table-column prop="report_state" label="最新上报状态"></el-table-column>
                <el-table-column prop="report_content" label="最新上报内容"></el-table-column>
                <el-table-column prop="last_report_time"  :formatter="dateFormat"  label="最后一次上报时间"></el-table-column>
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
                form:{},
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
            dateFormat:function(row,column){
                var date = row[column.property];
                if (date === undefined) {
                    return "";
                }
                var moment = require("moment");
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
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
        color: #999;
        line-height: 25px;
    }
</style>