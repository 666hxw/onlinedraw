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
    }
  });

  return mongoose.model('Draw', DrawSchema);
};
