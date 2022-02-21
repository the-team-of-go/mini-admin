<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="ruleForm" :model="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
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
            <el-button v-if="editOn" type="primary" @click="updateConfig">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchSetting, updateSetting } from '@/api/setting'

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
      },
      rules: {
        cpu: [
          { required: true, message: '请输入预警值', trigger: 'blur' },
          { min: 0, message: '预警值范围有误(0 ~ 100)', trigger: 'blur' },
          { max: 100, message: '预警值范围有误(0 ~ 100)', trigger: 'blur' }
        ],
        mem: [
          { required: true, message: '请输入预警值', trigger: 'blur' },
          { min: 0, message: '预警值范围有误(0 ~ 100)', trigger: 'blur' },
          { max: 100, message: '预警值范围有误(0 ~ 100)', trigger: 'blur' }
        ],
        disk: [
          { required: true, message: '请输入预警值', trigger: 'blur' },
          { min: 0, message: '预警值范围有误(0 ~ 100)', trigger: 'blur' },
          { max: 100, message: '预警值范围有误(0 ~ 100)', trigger: 'blur' }
        ],
        timeout: [
          { required: true, message: '请输入聚合时间间隔(s)', trigger: 'blur' },
          { min: 0, message: '时间间隔不合法', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      fetchSetting().then(res => {
        this.parseConfig(res.data)
      })
    },
    updateConfig() {
      updateSetting({
        maxvaluecpu: parseFloat(this.ruleForm.cpu),
        maxvaluemem: parseFloat(this.ruleForm.mem),
        maxValueDis: parseFloat(this.ruleForm.disk),
        periodtime: parseFloat(this.ruleForm.timeout)
      }).then(res => {
        this.$message.success('修改配置成功！')
        this.parseConfig(res.data)
      })
      this.editOn = false
    },
    parseConfig(rawConfig) {
      const { maxvaluecpu, maxvaluemem, maxValueDis, periodtime } = rawConfig
      this.ruleForm.cpu = maxvaluecpu
      this.ruleForm.mem = maxvaluemem
      this.ruleForm.disk = maxValueDis
      this.ruleForm.timeout = periodtime
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
