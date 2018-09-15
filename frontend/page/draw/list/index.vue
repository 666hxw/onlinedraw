<template>
  <div class="draw-list">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="画板">
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.createTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.updateTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="edit(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="del(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page.sync="query.page"
      :total="total">
    </el-pagination>
  </div>
</template>
<style lang="scss">
  @import './index';
</style>
<script>
  import vm from './vm';
  export default vm;
</script>