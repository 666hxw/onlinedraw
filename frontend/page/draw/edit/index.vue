<template>
  <div class="draw-container">
    <el-row style="margin-bottom: 10px;">
      <el-col :span="12">
        <el-input v-model="draw.name">
          <template slot="prepend">画板名</template>
          <el-button slot="append" icon="el-icon-edit" @click="saveName"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 绘画工具 -->
    <el-row class="draw-tools">
      <el-col :span="1">
        <el-tooltip content="画笔颜色" placement="bottom">
          <el-color-picker v-model="lineColor"></el-color-picker>
        </el-tooltip>
      </el-col>
      <el-col :span="1">
        <el-popover
          placement="bottom"
          width="200"
          trigger="click">
          <el-slider v-model="lineWidth" :min="lineW.min" :max="lineW.max"></el-slider>
          <el-tooltip content="画笔宽度" placement="bottom" slot="reference">
            <div class="draw-tools-util draw-tools-line-width">
              <div class="draw-tools-until" :style="{ 'background-color': lineColor,
                'width': (lineWidth / 100 * 32) + 'px',
                'height': (lineWidth / 100 * 32) + 'px',
                'left': ((40 - lineWidth / 100 * 32) / 2) + 'px',
                'top': ((40 - lineWidth / 100 * 32) / 2) + 'px',
              }"></div>
            </div>
          </el-tooltip>
        </el-popover>
      </el-col>
      <!-- 撤销 -->
      <el-col :span="1">
        <el-tooltip content="撤销" placement="bottom">
          <el-button type="info" icon="el-icon-back" circle @click="undo"></el-button>
        </el-tooltip>
      </el-col>
      <!-- 导出画布 -->
      <el-col :span="1">
        <el-tooltip content="导出画板" placement="bottom">
          <el-button type="success" icon="el-icon-picture" circle @click="download"></el-button>
        </el-tooltip>
      </el-col>
      <!-- 保存画布 -->
      <el-col :span="1">
        <el-tooltip content="保存画板" placement="bottom">
          <el-button type="primary" icon="el-icon-refresh" circle @click="save"></el-button>
        </el-tooltip>
      </el-col>
      <!-- 清空画布 -->
      <el-col :span="1">
        <el-tooltip content="清空画板" placement="bottom">
          <el-button type="danger" icon="el-icon-delete" circle @click="clear"></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <!-- 画布 -->
    <div class="canvas">
      <canvas id="canvas" ref="canvas"></canvas>
    </div>
  </div>
</template>
<style lang="scss">
  @import './index';
</style>
<script>
  import vm from './vm';
  export default vm;
</script>