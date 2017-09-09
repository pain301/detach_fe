'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mall = require('util/mall.js');
var _user = require('service/user-service.js');

var page = {
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  bindEvent: function() {
    var _this = this;
    $(document).on('click', '.btn-submit', function() {
      console.log("hello");
      var userInfo = {
        password : $.trim($('#password').val()),
        passwordNew : $.trim($('#password-new').val()),
        passwordConfirm : $.trim($('#password-confirm').val())
      };
      var validateResult = _this.validateForm(userInfo);
      if (validateResult.status) {
        _user.updatePassword({
          passwordOld: userInfo.password,
          passwordNew: userInfo.passwordNew
        }, function(res, msg) {
          _mall.successTips(msg);
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
      name: 'user-pass-update'
    });
  },
  validateForm: function(formData) {
    var result = {
      status: false,
      msg: ''
    };

    if (!_mall.validate(formData.password, 'require')) {
      result.msg = "原密码不能为空";
      return result;
    }
    if (!formData.passwordNew || formData.passwordNew.length < 6) {
      result.msg = "新密码长度不能少于6位";
      return result;
    }
    if (formData.passwordNew !== formData.passwordConfirm) {
      result.msg = "两次输入的密码不一致";
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