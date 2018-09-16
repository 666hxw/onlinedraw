'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 建表
  const DrawSchema = new Schema({
    name: { // drawing  name
      type: String,
    },
    userid: { // drawing's userid
      type: String,
    },
    data: { // 画板内容 base64
      type: String,
    },
    createTime: {
      type: Date,
      default: Date.now,
    },
    updateTime: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('Draw', DrawSchema);
};
