'use strict';

exports.validateName = (str) => {
  return /^[a-zA-Z0-9\-_]+$/i.test(str);
};

exports.isIgnorePath = (str) => {
  const ignorePath = [ /^\/login/, /^\/register/, /^\/api\/user\/signIn/, /api\/user\/reigster/ ];
  const isIgnorePath = (path) => {
    return ignorePath.some(item => {
      return item === path || item.test(path);
    });
  };
};
