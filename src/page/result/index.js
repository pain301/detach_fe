'use strict'

require('./index.css');
require('page/common/nav-simple/index.js');

var _mall = require('util/mall.js');

$(function() {

  var type = _mall.getUrlParam('type') || 'default';
  var $element = $('.' + type + '-success');
  $element.show();
})