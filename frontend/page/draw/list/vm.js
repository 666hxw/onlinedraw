export default {
  data() {
    return {
      query: {
        page: 1,
        pageSize: 10,
      },
      tableData: [],
      total: 0,
    };
  },
  methods: {
    getData() {
      const { page, pageSize } = this.query;
      this.$http.get('/api/draw/list', {
        params: {
          page,
          pageSize,
        },
      }).then(({ data }) => {
        if (data.code === 200) {
          data = data.data;
          this.tableData = data.list;
          this.total = data.total;
        } else {
          this.$alert('' || '获取数据失败');
        }
      }).catch((err) => {

      });
    },
    edit(id) {
      this.$router.push({
        path: '/draw/edit',
        query: {
          id,
        }
      });
    }
  },
  mounted() {
    this.getData();
  },
};