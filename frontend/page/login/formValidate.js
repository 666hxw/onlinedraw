export default {
  name: [
    { required: true, message: '请输入登录的用户或邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入登录的密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度在6到16之间', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { length: 6, message: '请输入6位验证码', trigger: 'blur' },
  ],
};