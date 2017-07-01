'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var _mall = require('util/mall.js');
var templateBanner = require('./banner.string');

$(function() {
  var bannerHtml = _mall.renderHtml(templateBanner);
  $('.banner-con').html(bannerHtml);
  var $slider = $('.banner').unslider({
    dots: true
  });

  $('.banner-con .banner-arrow').click(function() {
    var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    $slider.data('unslider')[forward]();
  });
});