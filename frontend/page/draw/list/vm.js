export default {
  data() {
    return {
      query: {
        kw: '',
        page: 1,
        pageSize: 10,
      },
      tableData: [],
      total: 0,
    };
  },
  methods: {
    getData() {
      const { page, pageSize, kw } = this.query;
      this.$http.get('/api/draw/list', {
        params: {
          kw,
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
    },
    del(id) {
      this.$confirm('确定删除此画板？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/api/draw/del', {
          params: {
            id,
          }
        }).then(({ data }) => {
          if (data.code === 200) {
            this.getData(); // 重新请求当前页
          } else {
            this.$message.error(data.msg || '删除失败');
          }
        }).catch(err => {
          this.$message.error('删除失败');
        });
      });
    }
  },
  mounted() {
    this.getData();
  },
};