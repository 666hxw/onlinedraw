<template>
  <div class="draw-container">
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
        <i class="el-icon-back" @click="undo"></i>
      </el-col>
      <!-- 清空画布 -->
      <el-col :span="1">
        <i class="el-icon-delete" @click="clear"></i>
      </el-col>
      <!-- 保存画布 -->
      <el-col :span="1">
        <i class="el-icon-download" @click="download"></i>
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