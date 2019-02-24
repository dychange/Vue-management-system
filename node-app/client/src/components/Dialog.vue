<template>
  <div class="Dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :modal-append-to-body="true"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          status-icon
          :rules="form_rules"
          label-width="80px"
          style="margin:10px;width:auto"
        >
          <el-form-item label="收支类型" prop="type">
            <el-select v-model="formData.type" placeholder="收支类型">
              <el-option
                v-for="(item, index) in type_List"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="收支描述" prop="descript">
            <el-input v-model="formData.descript"></el-input>
          </el-form-item>

          <el-form-item label="收入" prop="income">
            <el-input v-model="formData.income"></el-input>
          </el-form-item>

          <el-form-item label="支出" prop="expend">
            <el-input v-model="formData.expend"></el-input>
          </el-form-item>

          <el-form-item label="账户现金" prop="cash">
            <el-input v-model="formData.cash"></el-input>
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取消</el-button>
            <el-button type="primary" @click='submit("form")'>提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addProfile} from '../api/addprofile.js'
import {editProfile} from '../api/ediprofile.js'
export default {
  data() {
    return {
      type_List: ["提现", "提现手续费", "充值", "优惠券", "充值礼券", "转账"],
      form_rules: {
        descript: [
          {
            required: true,
            message: "收支描述不能为空",
            trigger: "blur"
          }
        ],
        income: [
          {
            required: true,
            message: "收入不能为空",
            trigger: "blur"
          },
          {
            pattern: "^[0-9]",
            message: '请输入正确的值',
            trigger: "blur"
          }
        ],
        expend: [
          {
            required: true,
            message: "支出不能为空",
            trigger: "blur"
          },
          {
            pattern: "^[0-9]",
            message: '请输入正确的值',
            trigger: "blur"
          }
        ],
        cash: [
          {
            required: true,
            message: "现金不能为空",
            trigger: "blur"
          },
          {
            pattern: "^[0-9]",
            message: '请输入正确的值',
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "备注不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    dialog: Object,
    formData: Object
  },
  methods: {
    submit(form) {
      this.$refs[form].validate(valid => {
        if(valid){
          // 添加
          if(this.dialog.option === 'add') {
            addProfile(this.formData).then(res => {
              this.$message({
                  message: "保存成功！",
                  type: "success"
              })
              this.dialog.show = false
              this.$refs[form].resetFields()  // 重置表单
              this.$emit('update')  //给父组件触发一个更新事件
            })
          } else {
            // 编辑
            editProfile(this.formData ,this.formData.id).then(res => {
              this.$message({
                  message: "修改成功！！",
                  type: "success"
              })
              this.dialog.show = false
              this.$emit('update')
            })
          }
            
        } else {
            return this.$message.error("请将表单填写完整！");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
