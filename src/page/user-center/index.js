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
  }
};

$(function() {
  page.init();
});