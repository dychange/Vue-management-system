<template>
  <div class="fillContainer">
    <div class="table_btn">
      <el-form :inline="true" ref="add_data">
        <el-form-item class="pickerLeft">
          <el-date-picker
            v-model="allTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="filterTime">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight" v-if="user.identity === 'manager'">
          <el-button type="primary" size="small" icon="view" @click="onAddMoney()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table v-if="tableData.length > 0" :data="tableData" style="width: 100%" max-height="450">
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>

        <el-table-column label="创建时间" width="230" prop="date" align="center">
          <!-- <template slot-scope="scope">
            {{scope.row.date }}
          </template>-->
        </el-table-column>

        <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>

        <el-table-column prop="descript" label="收支描述" align="center" width="180"></el-table-column>

        <el-table-column prop="income" label="收入" align="center" width="120"></el-table-column>

        <el-table-column prop="expend" label="支出" align="center" width="120"></el-table-column>

        <el-table-column prop="cash" label="账户现金" align="center" width="120"></el-table-column>

        <el-table-column prop="remark" label="备注" align="center" width="150"></el-table-column>

        <el-table-column
          label="操作"
          prop="operation"
          width="180px"
          align="left"
          v-if="user.identity === 'manager'"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="paginations.currentPage"
            :page-sizes="paginations.pageSizes"
            :page-size="paginations.pageSize"
            :layout="paginations.layout"
            :total="paginations.total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- 显示添加资金弹框 -->
    <Dialog :dialog="dialog" @update="updateMessage" :formData="formData"></Dialog>
  </div>
</template>

<script>
import { getProfile } from "../api/getprofile.js";
import { deleteProfile } from "../api/delprofile.js";
import Dialog from "../components/Dialog";
export default {
  data() {
    return {
      formData: {
        id: "",
        type: "",
        descript: "",
        income: "",
        expend: "",
        cash: "",
        remark: ""
      },
      tableData: [],  //每页显示的数据
      totalData: [],  //总数据
      filterTimeData: [], //时间过滤的数据
      dialog: {
        show: false,
        title: "",
        option: ""
      },
      paginations: {
        total: 0,
        currentPage: 1,
        pageSizes: [5, 10, 15, 20],
        pageSize: 5,
        layout: "total, sizes, prev, pager, next, jumper"
      },
      allTime: ''
    };
  },
  created() {
    this.updateMessage();
  },
  computed: {
    user(){
      return this.$store.getters.user
    } 
  },
  methods: {
    //  获取所有数据
    updateMessage() {
      getProfile().then(res => {
        console.log(res);
        this.totalData = res.data.msg;
        this.filterTimeData = res.data.msg
        this.setPagination();
      });
    },
    //  编辑
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "编辑资金信息",
        option: "edit"
      };
      this.formData = {
        id: row.id,
        type: row.type,
        descript: row.descript,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark
      };
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("是否删除此数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteProfile(row.id).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.updateMessage();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 添加
    onAddMoney() {
      this.dialog = {
        show: true,
        title: "增加资金信息",
        option: "add"
      };
    },
    setPagination() {
      //  默认 当前页为1，  5条/页
      this.paginations.total = this.totalData.length;
      this.paginations.currentPage = 1;
      this.paginations.pageSize = 5;
      // 设置每页显示的数据
      this.tableData = this.totalData.filter((item, index) => {
        return index < this.paginations.pageSize;
      });
    },
    // 一页显示多少条
    handleSizeChange(val) {
      console.log(val);
      // 默认 当前页为1，  val条/页
      this.paginations.currentPage = 1;
      this.paginations.pageSize = val;

      // 设置每页显示的数据
      this.tableData = this.totalData.filter((item, index) => {
        return index < val;
      });
    },
    // 改变当前页时显示的数据
    handleCurrentChange(val) {
      //  1. 首先先获取跳转到的那页之前的所有数据条数 current
      //  2. 与总条数相比较，返回大于current的所有数据存在table中
      //  3. 再用tableData与table相比较，返回 每页有多少条数据

      //  或者，先求出大于当前页的所有数据，  然后在求当前页显示的数据
      let current = this.paginations.pageSize * (val - 1);
      let table = this.totalData.filter((item, index) => {
        return index >= current;
      });
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.pageSize;
      });
    },
    //  按时间筛选
    filterTime() {
      if(!this.allTime) {
        return this.$message({
          message: '请将筛选信息填写完整',
          type: 'warning'
        })
      }
      let startTime = new Date(this.allTime[0])
      let endTime = new Date(this.allTime[1]) 
      let stime = startTime.getTime()
      let eTime = endTime.getTime()
      
      this.totalData = this.filterTimeData.filter((item,index) => {
        let date = new Date(item.date)
        let time = date.getTime()
        return time >= stime && time <= eTime
      })
      this.setPagination()
    }
  },
  components: {
    Dialog
  }
};
</script>

<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  overflow: auto;
}
.btnRight {
  float: right;
  margin-right: 50px;
}
.pagination {
  text-align: right;
  margin-top: 10px;
  margin-right: 20px;
}
</style>
