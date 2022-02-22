<template>
  <div class="dashboard-editor-container">

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <span style="color: rgba(0, 0, 0, 0.45); margin-right: 10px">Machine</span>
        <el-select v-model="machine" style="width: 140px" placeholder="设备ID" class="filter-item" @change="handleMachineChange">
          <el-option v-for="item in machineOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-col>
    </el-row>

    <panel-group :machine-status="machineStatus" />

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">机器状态分布</span>
        <div style="float: right">
          <el-radio-group v-model="timeRange" size="mini" @change="handleTimeRangeChange">
            <el-radio-button label="昨天" />
            <el-radio-button label="今天" />
            <el-radio-button label="最近7天" />
            <el-radio-button label="最近30天" />
          </el-radio-group>
        </div>
      </div>
      <line-chart :chart-data="lineChartData" />
    </el-card>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card chart-wrapper">
          <div slot="header" class="clearfix">
            <span class="title">最大值状态分布</span>
          </div>
          <mini-line-chart :chart-data="maxChartData" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card chart-wrapper">
          <div slot="header" class="clearfix">
            <span class="title">最小值状态分布</span>
          </div>
          <mini-line-chart :chart-data="minChartData" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card chart-wrapper">
          <div slot="header" class="clearfix">
            <span class="title">平均值状态分布</span>
          </div>
          <mini-line-chart :chart-data="avgChartData" />
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import { fetchMachineInfoList, fetchMachineList, fetchMachineStatus } from '@/api/machine'
import MiniLineChart from '@/views/dashboard/admin/components/MiniLineChart'
import date from '@/utils/date'

export default {
  name: 'DashboardAdmin',
  components: {
    MiniLineChart,
    PanelGroup,
    LineChart
  },
  data() {
    return {
      timeRange: '今天',
      lineChartData: {},
      maxChartData: {},
      minChartData: {},
      avgChartData: {},
      machine: null,
      machineOptions: [1, 2, 3, 4, 5],
      // 当前状态
      machineStatus: {
        CpuUsed: 0,
        MemUsed: 0,
        DiskUsed: 0,
        Status: ''
      },
      // 时间
      start: null,
      end: null
    }
  },
  mounted() {
    this.getMachineList().then(() => {
      if (this.machineOptions.length === 0) {
        return
      }
      this.machine = this.machineOptions[0]
      this.updateMachineData()
      this.keepQryMachineInfo()
    })
  },
  methods: {
    async getMachineList() {
      await fetchMachineList().then(res => {
        this.machineOptions = res.data
      })
    },
    keepQryMachineInfo() {
      setInterval(() => {
        this.updateMachineData()
      }, 10000)
    },
    handleMachineChange() {
      this.updateMachineData()
    },
    handleTimeRangeChange(label) {
      const curTimestamp = new Date().getTime()
      const ONEDAY = 86400000
      switch (label) {
        case '昨天':
          this.start = curTimestamp - (2 * ONEDAY)
          this.end = curTimestamp - ONEDAY
          break
        case '今天':
          this.start = curTimestamp - ONEDAY
          this.end = curTimestamp
          break
        case '最近7天':
          this.start = curTimestamp - 7 * ONEDAY
          this.end = curTimestamp
          break
        case '最近30天':
          this.start = curTimestamp - 30 * ONEDAY
          this.end = curTimestamp
          break
      }
      console.log(this.start)
      console.log(this.end)
      this.updateMachineData()
    },
    updateMachineData() {
      this.getMachineInfoList()
      this.getMachineStatus()
    },
    getMachineStatus() {
      const id = this.machine
      fetchMachineStatus(id).then(res => {
        this.machineStatus = res.data
        console.log(this.machineStatus)
      })
    },
    getMachineInfoList() {
      const query = {
        id: this.machine,
        start: this.start,
        end: this.end
      }
      fetchMachineInfoList(query, 'basic').then(res => {
        this.lineChartData = this.parseChartData(res.data)
      })
      fetchMachineInfoList(query, 'max').then(res => {
        this.maxChartData = this.parseChartData(res.data)
      })
      fetchMachineInfoList(query, 'min').then(res => {
        this.minChartData = this.parseChartData(res.data)
      })
      fetchMachineInfoList(query, 'avg').then(res => {
        this.avgChartData = this.parseChartData(res.data)
      })
    },
    parseChartData(rawData) {
      const chartData = {
        cpuData: [],
        memData: [],
        diskData: [],
        xaxis: []
      }
      if (!rawData) {
        return chartData
      }
      for (const data of rawData) {
        chartData.cpuData.push(data.cpu.toFixed(2))
        chartData.memData.push(data.mem.toFixed(2))
        chartData.diskData.push(data.disk.toFixed(2))

        const time = date('Y-m-d H:i:s', data.timeout / 1000)
        console.log(time)
        chartData.xaxis.push(time)
      }
      return chartData
    }
  }
}
</script>
<style>
  .box-card .el-card__header{
    padding: 0 0 10px !important;
  }
  .box-card .el-card__body {
    padding: 20px 0;
  }
</style>
<style lang="scss" scoped>
.btn-active {
  background: #eeeeee;
  color: #1f2d3d;
}

.box-card {
  box-shadow: none;
  border-radius: 0px;
  border: none;
  background:#fff;
  padding:16px 16px 0;
  margin-bottom:32px;
  .title {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 28px;
  }
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
