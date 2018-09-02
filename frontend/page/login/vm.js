import formValidate from './formValidate';

export default {
  data() {
    return {
      formValidate,
      form: {
        username: '',
        password: '',
        code: '',
      },
    };
  },
  methods: {
    login() {
      const { username, password, code } = this.form;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$http.post('/api/loign/signIn', {
            username,
            password,
            code,
          }).then((res) => {
            this.$router.push('/');
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