'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mall = require('util/mall.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
  data: {
    productId: _mall.getUrlParam('productId') || '',
  },
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    if (!this.data.productId) {
      _mall.goHome();
    }
    this.loadDetail();
  },
  bindEvent: function() {
    var _this = this;
    $(document).on('mouseenter', '.p-img-item', function() {
      var imageUrl = $(this).find('.p-img').attr('src');
      $('.main-img').attr('src', imageUrl);
    });
    $(document).on('click', '.p-count-btn', function() {
      var type = $(this).hasClass('plus') ? 'plus' : 'minus';
      var $pCount = $('.p-count');
      var curCount = parseInt($pCount.val());
      var minCount = 1;
      var maxCount = _this.data.detailInfo.stock || 1;
      if ('plus' === type) {
        $pCount.val(curCount < maxCount ? curCount + 1 : maxCount);
      } else if ('minux' === type) {
        $pCount.val(curCount > minCount ? curCount - 1 : minCount);
      }
    });
    $(document).on('click', '.cart-add', function() {
      _cart.addToCart({
        productId: _this.data.productId,
        count: $('.p-count').val()
      }, function(res) {
        window.location.href = "./result.html?type=cart-add";
      }, function(errMsg) {
        _mall.errorTips(errMsg);
      });
    });
  },
  loadDetail: function() {
    var _this = this;
    var html = '';
    var $pageWrap = $('.page-wrap');
    $pageWrap.html('<div class="loading"></div>')
    _product.getProductDetail(this.data.productId, function(res) {
      _this.filter(res);
      _this.data.detailInfo = res;
      html = _mall.renderHtml(templateIndex, res);
      $pageWrap.html(html);
    }, function(errMsg) {
      $pageWrap.html('<p class="err-tip">此商品找不到了</p>');
    });

  },
  filter: function(data) {
    data.subImages = data.subImages.split(',');
  }
};

$(function() {
  page.init();
});