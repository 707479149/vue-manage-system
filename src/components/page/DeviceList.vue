<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 设备列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.keyword" placeholder="IMEI/SN/备注" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary"  @click="handleAdd">添加</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="device_no" label="设备编号IMEI"></el-table-column>
                <el-table-column prop="sn" label="SN"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column prop="total_ports" label="总端口号"></el-table-column>
                <el-table-column prop="state" label="状态"></el-table-column>
                <el-table-column prop="report_state" label="设备上报状态"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                @click= "$router.push({path: 'device-detail',query:{id:scope.row.id}})"
                        >详情</el-button>
                    </template>
                </el-table-column>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="35%">
            <el-form ref="form" :model="form" label-width="70px">
<!--                <el-form-item label="设备编号">-->
<!--                    <el-input v-model="form.device_no"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="SN">
                    <el-input v-model="form.sn"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加"  :visible.sync="addVisible"  width="35%">
            <el-form ref="form" :model="addForm" label-width="70px">
                <el-form-item label="SN">
                    <el-input v-model="addForm.sn"></el-input>
                </el-form-item>
<!--                <el-form-item label="状态">-->
<!--                    <el-input v-model.number ="addForm.state"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="单价">-->
<!--                    <el-input v-model.number ="addForm.cal_fee_per"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="端口数量">-->
<!--                    <el-input v-model.number ="addForm.total_ports"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="备注">
                    <el-input v-model="addForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchData, UpdateDevice, AddDevice } from '../../api/index';
    export default {
        name: 'basetable',
        data() {
            return {
                query: {
                    keyword: '',
                    page_index: 1,
                    page_size: 10
                },
                tableData: [],
                delList: [],
                editVisible: false,
                addVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1,
                addForm:{
                    "device_no":"",
                    "sn":"",
                    "total_ports":"",
                    "remark":"",
                    "state":"",
                    "cal_fee_per":""
                }
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                fetchData(this.query).then(res => {
                    console.log(res);
                    this.tableData = res.data.list;
                    this.pageTotal = res.data.count;
                });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },

            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                UpdateDevice(this.form).then(res => {
                  if (res.errorcode != 0) {
                    this.$message.error(res.data)
                  } else {
                    this.$message.success(`成功`);
                  }
                    this.$set(this.tableData, this.idx, this.form);
                })
            },
            // 编辑操作
            handleAdd() {
                this.addVisible = true;
            },
            saveAdd()
            {
                this.addVisible = false;
                AddDevice(this.addForm).then(res => {
                  if (res.errorcode != 0) {
                    this.$message.error(res.data)
                  } else {
                    this.$message.success(`成功`);
                  }
                })
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
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
