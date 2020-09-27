<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 订单列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.keyword" placeholder="SN/点位名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
          :data="tableData"
          border
          class="table"
          header-cell-class-name="table-header"
      >
        <el-table-column label="序号" type="index" width="55" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="device_sn" label="设备SN"></el-table-column>
        <el-table-column prop="device_port_seq" label="端口号" width="70"></el-table-column>
        <el-table-column prop="device_position_name" label="点位名称"></el-table-column>
        <el-table-column prop="begin_time" label="开始时间"></el-table-column>
        <el-table-column prop="end_time" label="结束时间"></el-table-column>
        <el-table-column prop="charger_time" label="充电时长(分钟)"></el-table-column>
        <el-table-column prop="state" label="状态" :formatter="formatState" width="100"></el-table-column>
        <el-table-column prop="user_phone" label="用户"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.page_index"
            :page-size="query.page_size"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '../../api/index';
export default {
  name: 'basetable',
  data() {
    return {
      query: {
        keyword: '',
        page_index: 1,
        page_size: 50
      },
      tableData: [],
      pageTotal: 0,
      id: -1,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      getOrderList(this.query).then(res => {
        console.log(res);
        this.tableData = res.data.list;
        this.pageTotal = res.data.count;
      });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'page_index', 1);
      this.getData();
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'page_index', val);
      this.getData();v
    },
    formatState(row){
      if (row.state == 1) {
        return "进行中"
      }
      if (row.state == 2) {
        return "已完成"
      }
      if (row.state == 3) {
        return "已取消"
      }
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
</style>
