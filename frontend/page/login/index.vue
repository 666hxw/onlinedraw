<template>
  <el-form ref="loginForm" :model="form" :rules="formValidate" label-width="120px" class="login-form">
    <el-form-item label="用户名/邮箱" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss">
  @import './index';
</style>
<script>
  import vm from './vm';
  export default vm;
</script>