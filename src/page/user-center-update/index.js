'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mall = require('util/mall.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
  init: function() {
    this.onLoad();
  },
  bindEvent: function() {
    var _this = this;
    $(document).on('click', '.btn-submit', function() {
      var userInfo = {
        phone : $.trim($('#phone').val()),
        email : $.trim($('#email').val()),
        question : $.trim($('#question').val()),
        answer : $.trim($('#answer').val()),
      };
      var validateResult = _this.validateForm(userInfo);
      if (validateResult.status) {
        _user.updateUserInfo(userInfo, function(res, msg) {
          _mall.successTips(msg);
          window.location.href = './user-center.html';
        }, function(errMsg) {
          _mall.errorTips(errMsg);
        });
      } else {
        _mall.errorTips(validateResult.msg);
      }
    });
  },
  onLoad: function() {
    navSide.init({
      name: 'user-center'
    });
    this.loadUserInfo();
  },
  loadUserInfo: function() {
    var userHtml = '';
    _user.getUserInfo(function(res) {
      userHtml = _mall.renderHtml(templateIndex, res);
      $('.panel-body').html(userHtml);
    }, function(errMsg) {
      _mall.errorTips(errMsg);
    });
  },
  validateForm: function(formData) {
    var result = {
      status: false,
      msg: ''
    };

    if (!_mall.validate(formData.phone, 'phone')) {
      result.msg = "手机号格式错误";
      return result;
    }
    if (!_mall.validate(formData.email, 'email')) {
      result.msg = "邮箱格式错误";
      return result;
    }
    if (!_mall.validate(formData.question, 'require')) {
      result.msg = "密码提示问题不能为空";
      return result;
    }
    if (!_mall.validate(formData.answer, 'require')) {
      result.msg = "密码提示答案不能为空";
      return result;
    }
    result.msg = "验证通过";
    result.status = true;
    return result;
  }
};

$(function() {
  page.init();
});