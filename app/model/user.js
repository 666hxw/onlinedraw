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
    },
    updateTime: {
      type: Date,
    },
  });

  UserSchema.pre('save', function(next) {
    this.createTime = new Date();
    this.updateTime = new Date();
    next();
  });

  UserSchema.pre('update', function(next) {
    this.updateTime = new Date();
    next();
  });

  // 这里的 User 是 cxt.model 的对象名
  return mongoose.model('User', UserSchema);
};
