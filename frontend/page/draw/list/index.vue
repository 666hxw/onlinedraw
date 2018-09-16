<template>
  <div class="draw-list">
    <el-container>
      <el-header style="height: 40px;">
        <el-row >
          <el-col :span="2">
            <el-button type="primary" @click="$router.push('/draw/create')">创建画板</el-button>
          </el-col>
          <el-col :span="8" :offset="14">
            <el-input v-model="query.kw" placeholder="输入画板名">
              <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          border
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
                @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer style="height: 40px;">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="query.page"
          :total="total">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>
<style lang="scss">
  @import './index';
</style>
<script>
  import vm from './vm';
  export default vm;
</script>