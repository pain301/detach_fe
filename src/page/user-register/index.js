// 复用 login 样式与逻辑

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
    $('#username').blur(function() {
      var username = $.trim($(this).val());
      console.log("username: " + username);
      if (!username) {
        return;
      }
      _user.checkUsername(username, function(res) {
        formError.hide();
      }, function(errMsg) {
        formError.show(errMsg);
      });
    });
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
      password: $.trim($('#password').val()),
      passwordConfirm: $.trim($('#password-confirm').val()),
      phone: $.trim($('#phone').val()),
      email: $.trim($('#email').val()),
      question: $.trim($('#question').val()),
      answer: $.trim($('#answer').val())
    };
    var validateResult = this.formValidate(formData);
    if (validateResult.status) {
      _user.register(formData, function(res) {
        window.location.href = './result.html?type=register';
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
    if (formData.password.length < 6) {
      result.msg = "密码长度不能少于6位";
      return result;
    }
    if (formData.password !== formData.passwordConfirm) {
      result.msg = "两次输入的密码不一致";
      return result;
    }
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