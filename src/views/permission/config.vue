<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" label-position="left" class="demo-ruleForm">
          <el-form-item label="CPU" required>
            <el-input v-model="ruleForm.cpu" :disabled="!editOn" />
          </el-form-item>
          <el-form-item label="Memory" required>
            <el-input v-model="ruleForm.mem" :disabled="!editOn" />
          </el-form-item>
          <el-form-item label="Disk" required>
            <el-input v-model="ruleForm.disk" :disabled="!editOn" />
          </el-form-item>
          <el-form-item label="Timeout" required>
            <el-input v-model="ruleForm.timeout" :disabled="!editOn" />
          </el-form-item>
          <el-form-item>
            <el-button>重置</el-button>
            <el-button v-if="!editOn" type="primary" @click="editOn = true">编辑</el-button>
            <el-button v-if="editOn" type="primary" @click="editOn = false">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Config',
  data() {
    return {
      editOn: false,
      ruleForm: {
        cpu: 12.3,
        mem: 88.2,
        disk: 57.5,
        timeout: 300
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px;
}
.line {
  text-align: center;
}
</style>
