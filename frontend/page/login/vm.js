import formValidate from './formValidate';

export default {
  data() {
    return {
      formValidate,
      form: {
        name: '',
        password: '',
        code: '',
      },
    };
  },
  methods: {
    login() {
      const { name, password, code } = this.form;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$http.post('/api/user/signIn', {
            name,
            password,
            code,
          }).then(({ data }) => {
            if (data.code === 200) {
              localStorage.setItem('token', data.data.token);
              this.$router.push('/');
            } else {
              this.$alert(data.msg || '登录失败');
            }
          });
        }
      });
    },
    getCode() {

    },
  },
  mounted() {
    this.getCode();
  },
};