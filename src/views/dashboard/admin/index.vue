<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">机器状态分布</span>
        <div style="float: right">
          <el-button-group>
            <el-button type="primary" size="mini">昨天</el-button>
            <el-button type="primary" size="mini">今天</el-button>
            <el-button type="primary" size="mini">最近7天</el-button>
            <el-button type="primary" size="mini">最近30天</el-button>
            <el-button type="primary" size="mini">自定义</el-button>
          </el-button-group>
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
          <bar-chart />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card chart-wrapper">
          <div slot="header" class="clearfix">
            <span class="title">最小值状态分布</span>
          </div>
          <bar-chart />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card chart-wrapper">
          <div slot="header" class="clearfix">
            <span class="title">平均值状态分布</span>
          </div>
          <bar-chart />
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'

const lineChartData = {
  newVisitis: {
    cpuData: [100, 120, 161, 134, 105, 160, 165],
    memData: [120, 82, 91, 154, 162, 140, 145],
    diskData: [201, 95, 132, 98, 43, 120, 185]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    BarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>
<style>
  .el-card__header{
    padding: 0 0 10px !important;
  }
</style>
<style lang="scss" scoped>
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
