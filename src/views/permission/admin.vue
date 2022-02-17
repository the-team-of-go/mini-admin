<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddAdmin">添加管理员</el-button>

    <el-table :data="adminList" style="width: 100%;margin-top:20px;" border>
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Admin Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Admin Email">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑管理员信息':'添加管理员'">
      <el-form ref="adminForm" :model="admin" :rules="rules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="admin.name" placeholder="Admin Name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="admin.email"
            type="email"
            placeholder="Admin Email"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addAdmin, delAdmin, fetchAdminList, updateAdmin } from '@/api/setting'

export default {
  data() {
    return {
      admin: {
        name: 'asa',
        email: 'asa@q.c'
      },
      adminList: [],
      dialogType: 'add',
      dialogVisible: false,

      rules: {
        name: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 3, message: '长度在3个字符以上', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入管理员邮箱地址', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // Mock: get all routes and roles list from server
    this.getAdmins()
  },
  methods: {
    async getAdmins() {
      const res = await fetchAdminList()
      this.adminList = res.data
    },
    handleAddAdmin() {
      this.admin = {}
      this.dialogType = 'add'
      this.dialogVisible = true
    },
    doSave() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        updateAdmin(this.admin).then(res => {
          this.$message.success('修改信息成功')
          this.adminList = res.data
          setTimeout(() => {
            this.dialogVisible = false
          }, 1000)
        })
      } else {
        addAdmin(this.admin).then(res => {
          this.$message.success('添加管理员成功')
          this.adminList = res.data
          setTimeout(() => {
            this.dialogVisible = false
          }, 1000)
        })
      }
    },
    confirmSave() {
      this.$refs['adminForm'].validate((valid) => {
        if (valid) {
          this.doSave()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.admin = scope.row
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除该成员?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          delAdmin(row.id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.adminList = res.data
          })
        })
        .catch(err => { console.error(err) })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }
    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
