'use strict'

require('./index.css');
require('page/common/nav-simple/index.js');

var _mall = require('util/mall.js');
var _user = require('service/user-service.js');

var formError = {
  show: function(errMsg) {
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide: function() {
    $('.error-item').hide().find('.err-msg').text('');
  }
}

var page = {
  init: function() {
    this.bindEvent();
  },
  bindEvent: function() {
    var _this = this;
    $('#submit').click(function() {
      _this.submit();
    });
    $('.user-content').keyup(function(e) {
      if (13 === e.keyCode) {
        _this.submit();
      }
    });
  },
  submit: function() {
    var formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val())
    };
    var validateResult = this.formValidate(formData);
    if (validateResult.status) {
      _user.login(formData, function(res) {
        window.location.href = _mall.getUrlParam('redirect') || './index.html';
      }, function(errMsg) {
        formError.show(errMsg);
      });
    } else {
      formError.show(validateResult.msg);
    }
  },
  formValidate: function(formData) {
    var result = {
      status: false,
      msg: ''
    };

    if (!_mall.validate(formData.username, 'require')) {
      result.msg = "用户名不能为空";
      return result;
    }
    if (!_mall.validate(formData.password, 'require')) {
      result.msg = "密码不能为空";
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