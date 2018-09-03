export default {
  data() {
    return {
      width: '', // 画布宽度
      height: '', // 画布高度
      lineColor: '#409EFF', // 画笔初始化颜色值
      lineWidth: 1, // 画笔初始化宽度
      canvas: null, // canvas对象
      context: null, // canvas上下文对象
      startDraw: false, // 是否开始绘画标识
      drawHistory: [], // 记录每次绘制历史，用于做撤销 { time: 时间戳, data: base64数据 }
      lineW: {
        min: 1,
        max: 100,
      },
      downloadName: 'canvas.png', // 导出的默认下载名
    };
  },
  methods: {
    // 画布初始化
    init() {
      this.canvas = this.$refs.canvas;
      this.context = this.canvas.getContext('2d');
      this.initSize();
      this.initEvent();
    },
    // 获取屏幕宽高，初始化canva宽高
    initSize() {
      const { canvas, context } = this;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      this.width = screenW - 250 - 40;
      this.height = screenH - 60 - 60 - 60;
      // Get the device pixel ratio, falling back to 1.
      const dpr = context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
      // Get the size of the canvas in CSS pixels.
      // Give the canvas pixel dimensions of their CSS
      // size * the device pixel ratio.
      canvas.width = this.width * dpr;
      canvas.height = this.height * dpr;
      // Scale all drawing operations by the dpr, so you
      // don't have to worry about the difference.
      context.scale(dpr, dpr);
    },
    // 初始化事件绑定
    initEvent() {
      const { canvas, context } = this;
      // 监听鼠标按下，一次绘制开始
      canvas.addEventListener('mousedown', e => {
        this.startDraw = true;
        context.beginPath(); // 开启绘画路径
      });
      // 监听鼠标移动，跟随绘制
      canvas.addEventListener('mousemove', e => {
        if (!this.startDraw) {
          return;
        }
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;
        context.lineTo(x, y);
        context.closePath(); // 关闭绘画路径
        context.strokeStyle = this.lineColor;
        context.lineWidth = this.lineWidth;
        context.stroke();
        context.moveTo(x, y); // 设置画笔起点为当前鼠标位置
      });
      // 监听鼠标释放，结束一次绘制过程
      canvas.addEventListener('mouseup', e => {
        this.startDraw = false;
        this.recordDraw();
      });
    },
    /**
     * 将当前画布导出成二进制或者base64
     * @param {Boolean} isBlob 是否导成二进制数据
     * @return {Blob, String}
     */
    exportImg(isBlob, cb) {
      const canvas = this.canvas;
      if (isBlob) {
        canvas.toBlob(function(blob) {
          cb && cb(blob);
        }, 'image/png');
      } else {
        return canvas.toDataURL();
      }
    },
    /**
     * 记录本次绘制信息
     */
    recordDraw() {
      this.drawHistory.push({
        time: new Date().getTime(),
        data: this.exportImg(),
      });
    },
    /**
     * 清空画布
     */
    clearCanvas() {
      const { canvas, context } = this;
      // context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);
    },
    // 撤销
    undo() {
      this.clearCanvas(); // 清空当前画布
      this.drawHistory.pop(); // 删除最后一个历史记录
      const prev = this.drawHistory[this.drawHistory.length - 1]; // 获取最后一个历史记录
      if (prev) {
        const img = new Image();
        img.onload = () => {
          this.context.drawImage(img, 0, 0); // 绘制新的图片
        };
        img.src = prev.data;
      }
    },
    // 导出画布
    download() {
      const data = this.exportImg();
      // 触发下载行为
      const a = document.createElement('a');
      a.href = data;
      a.download = this.downloadName;
      a.click();
    },
    // 清空画布
    clear() {
      this.$alert('确定清空画布?', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.clearCanvas();
        }
      });
    },
    // 保存画布
    save() {
      this.$http.post('/api/draw/save', {
        id: this.id,
        data: this.exportImg(),
        name: this.name,
      }).then(({ data }) => {
        if (data.code === 200) {
          this.$message.success(data.msg || '保存成功');
        } else {
          this.$message.error(data.msg || '保存失败，请稍后再试');
        }
      });
    },
    // 获取详细信息
    detail() {
      this.$http.get('/api/draw/detail', {
        params: {
          id: this.id,
        }
      }).then(({ data }) => {
        if (data.code === 200) {
          this.data = data.data.data;
          this.name = data.data.name;
          const img = new Image();
          img.onload = () => {
            this.context.drawImage(img, 0, 0); // 绘制新的图片
          };
          img.src = this.data;
        } else {
          this.$message.error(data.msg || '获取信息失败');
        }
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id || '';
    this.init();
    if (this.id) {
      this.detail();
    }
  }
};