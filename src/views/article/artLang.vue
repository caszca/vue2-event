<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix box">
        <span>语言分类</span>
        <el-button type="primary" size="mini" @click="showDialog"
          >添加语言</el-button
        >
      </div>
      <el-table :data="form" style="width: 100%" :stripe="true" :border="true">
        <el-table-column type="index" label="序号" width="60px">
        </el-table-column>
        <el-table-column prop="lang_name" label="语言名称"> </el-table-column>
        <el-table-column prop="lang_use" label="语言用途"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="changeCate(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="open(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- @close表示对话框关闭事件 -->
    <el-dialog
      :title="isEdit ? '编辑语言分类' : '添加语言分类'"
      :visible.sync="dialogFormVisible"
      @close="dialogClose"
    >
      <el-form :model="tableData" :rules="rules" ref="form">
        <el-form-item
          label="语言名称"
          :label-width="formLabelWidth"
          prop="lang_name"
        >
          <el-input v-model="tableData.lang_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="语言用途"
          :label-width="formLabelWidth"
          prop="lang_use"
        >
          <el-input v-model="tableData.lang_use" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="addLangCateFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
  <script>
import {
  getLangCate,
  addLangCate,
  getOneLangCate,
  updateLangCate,
  deleteLangCate,
} from "@/api";
export default {
  name: "MyArtCate",
  data() {
    return {
      //对话框数据
      tableData: { lang_name: "", lang_use: "" },
      //接收后台返回日志分类
      form: [],
      dialogFormVisible: false,
      formLabelWidth: "80px",

      isEdit: false,
      rules: {
        lang_name: [
          { required: true, message: "请输入语言名称", trigger: "blur" },
          {
            pattern: /^\S{1,15}$/,
            message: "语言名称必须是1-15位的非空字符",
            trigger: "blur",
          },
        ],
        lang_use: [
          { required: true, message: "请输入语言用途", trigger: "blur" },
          {
            pattern: /^\S{1,30}$/,
            message: "语言用途必须是1-30位的非空字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  async created() {
    this.getCate();
  },

  methods: {
    //获取日志分类情况
    async getCate() {
      //提前获得数据，以便挂载前编译
      const { data } = await getLangCate();
      data.code === 0
        ? (this.form = data.data)
        : this.$message.error(data.message);
      console.log("form", this.form);
    },

    showDialog() {
      this.dialogFormVisible = true;
      this.isEdit = false;
    },

    cancelDialog() {
      this.dialogFormVisible = false;
    },

    //添加日志分类功能
    addLangCateFn() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { data } = this.isEdit
            ? await updateLangCate(this.tableData)
            : await addLangCate(this.tableData);

          if (data.code === 0) {
            this.getCate();
            this.$message.success(data.message);
            this.dialogFormVisible = false;
          } else this.$message.error(data.message);
        } else return false;
      });
    },

    //对话框关闭时回调函数
    dialogClose() {
      this.$refs.form.resetFields();
    },

    //获取单个日志分类详情
    async getOneLangCateFn(id) {
      const { data } = await getOneLangCate(id);

      data.code === 0
        ? (this.tableData = data.data)
        : this.$message.error(data.data.message);
    },

    changeCate({ id }) {
      this.isEdit = true;
      this.dialogFormVisible = true;
      this.getOneLangCateFn(id);
    },

    //删除功能
    open({ id }) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteLangCateFn(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //删除单个日志分类详情
    async deleteLangCateFn(id) {
      const { data } = await deleteLangCate(id);
      data.code === 0
        ? this.$message.success(data.message)
        : this.$message.error(data.message);
      this.getCate();
    },
  },
};
</script>
  
  
  
  
  <style scoped>
.box {
  display: flex;
  justify-content: space-between;
}
</style>