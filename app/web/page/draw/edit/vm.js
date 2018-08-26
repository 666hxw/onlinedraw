export default {
  data() {
    return {
      width: '', // 画布宽度
      height: '', // 画布高度
      color: '#409EFF', // 拾色器初始化颜色值
      canvas: null, // canvas对象
      context: null, // canvas上下文对象
      startDraw: false, // 是否开始绘画标识
      drawHistory: [], // 记录每次绘制历史，用于做撤销，具体数据存什么格式还未设计好，目前想法是将一次绘制导出base64存在这里，但是内存开销太大了
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
        console.log('mouse down');
        this.startDraw = true;
        context.beginPath(); // 开启绘画路径
      });
      // 监听鼠标移动，跟随绘制
      canvas.addEventListener('mousemove', e => {
        if (!this.startDraw) {
          return;
        }
        console.log('mouse move');
        console.log(e.clientX, e.clientY, canvas.offsetLeft, canvas.offsetTop);
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;
        context.lineTo(x, y);
        context.strokeStyle = this.color;
        context.stroke();
      });
      // 监听鼠标释放，结束一次绘制过程
      canvas.addEventListener('mouseup', e => {
        console.log('mouse up');
        this.startDraw = false;
        context.closePath(); // 关闭绘画路径
      });
    }
  },
  mounted() {
    this.init();
  }
};