'use strict';

require('./index.css');

var _mall = require('util/mall.js');
var tmplate = require('./index.string');

var navSide = {
  option: {
    name: '',
    navList: [
      {name: 'user-center', desc: '个人中心', href: './user-center.html'},
      {name: 'order-list', desc: '我的订单', href: './order-list.html'},
      {name: 'user-pass-update', desc: '修改密码', href: './user-pass-update.html'},
      {name: 'about', desc: '关于 MALL', href: './about.html'}
    ]
  },
  init: function(option) {
    // 合并选项
    $.extend(this.option, option);
    this.renderNav();
  },
  renderNav: function() {
    for (var i = 0, len = this.option.navList.length; i < len ; ++i) {
      if (this.option.navList[i].name === this.option.name) {
        this.option.navList[i].isActive = true;
      }
      var navHtml = _mall.renderHtml(tmplate, {navList : this.option.navList});
      $('.nav-side').html(navHtml);
    }
  }
};

module.exports = navSide;