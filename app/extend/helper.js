'use strict';

exports.validateName = (str) => {
  return /^[a-zA-Z0-9\-_]+$/i.test(str);
};
