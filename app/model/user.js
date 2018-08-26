'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // 建表
  const UserSchema = new Schema({
    name: { // username
      type: String,
    },
    password: { // user passwd
      type: String,
    },
  });

  // 这里的 User 是 cxt.model 的对象名
  return mongoose.model('User', UserSchema);
};
