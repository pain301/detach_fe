'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mall = require('util/mall.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
  data: {
    listParam: {
      keyword: _mall.getUrlParam('keyword') || '',
      categoryId: _mall.getUrlParam('categoryId') || '',
      orderBy: _mall.getUrlParam('orderBy') || 'default',
      pageNum: _mall.getUrlParam('pageNum') || 1,
      pageSize: _mall.getUrlParam('pageSize') || 20
    }
  },
  init: function() {
    this.onLoad();
    this.bindEvent();
  },
  onLoad: function() {
    this.loadList();
  },
  bindEvent: function() {
    var _this = this;
    $('.sort-item').click(function() {
      var $this = $(this);
      _this.data.listParam.pageNum = 1;
      if ($this.data('type') === 'default') {
        if ($this.hasClass('active')) {
          return ;
        } else {
          $this.addClass('active')
            .siblings('.sort-item').removeClass('active asc desc');
          _this.data.listParam.orderBy = 'default';
        }
      } else if ($this.data('type') === 'price') {
        if ($this.hasClass('active')) {
          return ;
        } else {
          $this.addClass('active')
              .siblings('.sort-item').removeClass('active asc desc');
          if (!$this.hasClass('asc')) {
            $this.addClass('asc').removeClass('desc');
            _this.data.listParam.orderBy = 'price_asc';
          } else {
            $this.addClass('desc').removeClass('asc');
            _this.data.listParam.orderBy = 'price_desc';
          }
        }
      }
      _this.loadList();
    });
  },
  loadList: function() {
    var listParam = this.data.listParam;
    var listHtml = '';
    var _this = this;
    var $pListCon = $('.p-list-con');
    $pListCon.html('<div class="loading"></div>')
    listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
    _product.getProductList(listParam, function(res) {
      listHtml = _mall.renderHtml(templateIndex, {
        list: res.list
      });
      $('.p-list-con').html(listHtml);
      _this.loadPagination({
        hasPreviousPage: res.hasPreviousPage,
        prePage: res.prePage,
        hasNextPage: res.hasNextPage,
        nextPage: res.nextPage,
        pageNum: res.pageNum,
        pages: res.pages
      });
    }, function(errMsg) {
      _mall.errorTips(errMsg);
    });
  },
  loadPagination: function(pageInfo) {
    var _this = this;
    this.pagination ? '' : (this.pagination = new Pagination());
    this.pagination.render($.extend({}, pageInfo, {
      container: $('.pagination'),
      onSelectPage: function(pageNum) {
        _this.data.listParam.pageNum = pageNum;
        _this.loadList();
      }
    }));
  }
};

$(function() {
  page.init();
});