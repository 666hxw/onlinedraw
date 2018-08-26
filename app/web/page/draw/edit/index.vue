<template>
  <div class="draw-container">
    <!-- 绘画工具 -->
    <el-row class="draw-tools">
      <el-col :span="3">
        <el-tooltip content="拾色器" placement="bottom">
          <el-color-picker v-model="color"></el-color-picker>
        </el-tooltip>
      </el-col>
      <el-col :span="3">
        <el-tooltip content="画笔大小" placement="top">
          <div></div>
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