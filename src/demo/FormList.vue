<template>
  <div class="price-container">
    <div class="price-wrp">
      <div class="price-header">表单列表</div>
      <cus-dialog
        :visible="previewVisible"
        @on-close="previewVisible = false"
        ref="widgetPreview"
        @on-submit="handleTest"
        width="1000px"
        form
      >
        <generate-form
          insite="true"
          v-if="previewVisible"
          :data="widgetForm"
          :value="widgetModels"
          ref="generateForm"
        >
          <template v-slot:blank="scope">
            宽度：
            <el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>高度：
            <el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
          </template>
        </generate-form>
      </cus-dialog>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column prop="createTime" :formatter="dateFormat" label="日期" width="150"></el-table-column>
        <el-table-column prop="name" label="表单名称" width="180"></el-table-column>
        <el-table-column prop="sortNum" label="排序" width="120"></el-table-column>
        <el-table-column prop="type" label="类型" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handlePreview(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button @click="handleModifyStatus(scope.row)" type="text" size="small">设计</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float:right;   margin-top: 30px;">
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CusDialog from "../components/CusDialog";
// import WidgetForm from "../components/WidgetForm";
import GenerateForm from "../components/GenerateForm";
import Pagination from "@/components/Pagination";
import moment from "moment";
import ElInput from "element-ui/packages/input/src/input";
import { getFormList, deleteFormById } from "../api/index";
export default {
  components: { Pagination, ElInput, CusDialog, GenerateForm },
  data() {
    return {
      widgetModels: {},
      previewVisible: false,
      tableKey: 0,
      list: null,
      total: 0,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: "top",
          size: "small"
        }
      },
      widgetFormSelect: null,
      listLoading: true,
      listQuery: {
        pageNumber: 1,
        pageSize: 20
      }
    };
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.listLoading = false;
      getFormList(this.listQuery).then(response => {
        if (response.success == true) {
          this.list = response.result.records;
          this.total = response.result.total;
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handlePreview(row) {
      console.log(row.tableJson);
      let json = JSON.parse(row.tableJson);
      console.log("json:" + json);
      this.widgetForm = json;
      console.log(json.list);
      if (json.list.length > 0) {
        this.widgetFormSelect = json.list[0];
      }
      this.previewVisible = true;
    },
    handleFilter() {
      this.listQuery.pageNumber = 1;
      this.getList();
    },
    handleModifyStatus(row) {
      this.$router.push({
        path: "/",
        query: {
          id: row.id
        }
      });
    },
    handleTest() {
      this.$refs.generateForm
        .getData()
        .then(data => {
          this.$alert(data, "").catch(e => {});
          this.$refs.widgetPreview.end();
        })
        .catch(e => {
          this.$refs.widgetPreview.end();
        });
    },
    handleDelete(row) {
      deleteFormById(row.id).then(response => {
        if (response.success == true) {
          this.getList();
        }
      });
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    }
  },
  created() {
    this.getList();
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function(val) {
        console.log(this.$refs.widgetForm);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.price-container {
  padding: 20px;
  .price-wrp {
    width: 85%;
    margin: 0 auto;
    background: #fff;
    padding: 30px;

    .price-header {
      font-size: 24px;
    }

    .price-description {
      margin: 10px 0;
    }

    .price-table {
      width: 100%;
      margin-top: 20px;
      border-spacing: 0;
      border-collapse: collapse;

      th {
        width: 33%;
        color: #fff;
        border: 1px solid #ccc;
        padding: 10px 20px;
      }

      td {
        border: 1px solid #ccc;
        padding: 10px 20px;

        .price {
          color: red;

          i {
            text-decoration: line-through;
            margin-left: 10px;
            color: #999;
          }
        }
      }
    }

    .price-footer {
      margin: 30px 0;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
