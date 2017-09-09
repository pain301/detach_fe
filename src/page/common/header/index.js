'use strict';

require('./index.css');

var _mall = require('util/mall.js');

var header = {
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  /* 回显 */
  onLoad: function() {
    var keyword = _mall.getUrlParam('keyword');
    if (keyword) {
      $('#search-input').val(keyword);
    }
  },
  bindEvent: function() {
    var _this = this;
    $('#search-btn').click(function() {
      _this.searchSubmit();
    });
    $('#search-input').click(function(e) {
      if (e.keyCode === 13) {
        _this.searchSubmit();
      }
    });
  },
  searchSubmit: function() {
    var keyword = $.trim($('#search-input').val());
    if (keyword) {
      window.location.href = './list?keyword=' + keyword;
    } else {
      _mall.goHome();
    }
  }
};

header.init();