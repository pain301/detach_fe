'use strict';

var _mall = require('util/mall.js');

var _user = {
  checkUsername: function(username, resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/user/check_valid'),
      data: {
        type: 'username',
        str: username
      },
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  register: function(userInfo, resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/user/register'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  // 登录
  login: function(userInfo, resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/user/login'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
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
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  getQuestion: function(username, resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/user/forget_get_question'),
      data: {
        username: username
      },
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  checkAnswer: function(answer, resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/user/forget_check_answer'),
      data: {
        answer: answer
      },
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  resetPassword: function(password, resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/user/forget_reset_password'),
      data: {
        password: password
      },
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  getUserInfo: function(resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/user/get_information'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  updateUserInfo: function(userInfo, resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/user/update_information'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  updatePassword: function(userInfo, resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/user/reset_password'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    });
  }
};

module.exports = _user;