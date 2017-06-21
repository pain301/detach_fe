'use strict';

var _mall = require('util/mall.js');

var _user = {
  // 登出
  logout: function(resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/user/logout'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  checkLogin: function(resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/user/get_user_info'),
      success: resolve,
      error: reject
    });
  }
};

module.exports = _user;