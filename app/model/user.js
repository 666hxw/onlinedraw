'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // 建表
  const UserSchema = new Schema({
    email: { // login email
      type: String,
    },
    name: { // username
      type: String,
    },
    password: { // user passwd
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

  // 这里的 User 是 cxt.model 的对象名
  return mongoose.model('User', UserSchema);
};
