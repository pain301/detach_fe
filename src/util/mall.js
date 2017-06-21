'use strict'

var conf = {
  serverHost: ''
}

var hogan = require('hogan');

var _mall = {
  request: function(param) {
    var _this = this;
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success: function(res) {
        if (0 === res.status) {
          typeof param.success === 'function' && param.success(res.data, res.msg);
        } else if (10 === res.status) {
          _this.login();
        } else if (1 === res.status) {
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      error: function(err) {
        typeof param.error === 'function' && param.error(err.statusText);
      }
    });
  },
  getServerUrl: function(path) {
    return conf.serverHost + path;
  },
  getUrlParam: function(key) {
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  renderHtml: function(htmlTemplate, data) {
    var template = hogan.compile(htmlTemplate);
    var result = template.render(data);
    return result;
  },
  login: function() {
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  goHome: function() {
    window.location.href = './index.html';
  },
  successTips: function(msg) {
    alert(msg || '操作成功');
  },
  errorTips: function(msg) {
    alert(msg || '操作失败');
  },
  validate: function(type, value) {
    var value = $.trim(value);
    if ('require' === type) {
      return !!value;
    }
    if ('phone' == type) {
      return /^1\d{10}$/.test(value);
    }
    if ('email' == type) {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }
  }
}

module.exports = _mall;