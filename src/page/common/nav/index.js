'use strict';

require('./index.css');

var _mall = require('util/mall.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
  init: function() {
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartCount();
    return this;
  },
  bindEvent: function() {
    // 登录点击事件
    $('.js-login').click(function() {
      _mall.login();
    });
    // 注册点击事件
    $('.js-register').click(function() {
      window.location.href = './user-register.html';
    });
    // 退出事件
    $('.js-logout').click(function() {
      _user.logout(function(res) {
        window.location.reload();
      }, function(err) {
        _mall.errorTips(err);
      });
    });
  },

  // 加载用户信息
  loadUserInfo: function() {
    _user.checkLogin(function(res) {
      $('.user.not-login').hide()
        .siblings('.user.login').show()
        .find('.username').text(res.username);
    }, function(res) {
      // nothing
    });
  },

  // 加载购物车数量
  loadCartCount: function() {
    _cart.getCartCount(function(res) {
      $('.nav .cart-count').text(res || 0);
    }, function(res) {
      $('.nav .cart-count').text(0);
    });
  }
};

module.exports = nav.init();