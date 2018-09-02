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
            console.log(data);
            if (data.status) {
              this.$router.push('/');
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