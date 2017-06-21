'use strict';

var _mall = require('util/mall.js');

var _cart = {
  getCartCount: function(resolve, reject) {
    _mall.request({
      url: _mall.getServerUrl('/cart/get_cart_product_count'),
      success: resolve,
      error: reject
    });
  }
};

module.exports = _cart;