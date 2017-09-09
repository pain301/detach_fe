'use strict';

var _mall = require('util/mall.js');

var _product = {
  getProductList: function(listParam, resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/product/list'),
      data: listParam,
      success: resolve,
      error: reject
    });
  },
  getProductDetail: function(productId, resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/product/detail'),
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
    });
  },
};

module.exports = _product;