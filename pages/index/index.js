var postData = require('../../utils/jsdata.js');
var arr = [];
Page({
  /*页面的初始数据*/
  data: {
    // 顶部导航
    topNav: ['外卖', '评价', '详情'],
    currentTab: 0,
    // 菜单栏
    goods: {
      1: { id: 1, name: '果盘1', icon: '../../image/new.png', sold: 1014, price: 120, oldprice: 150 },
      2: { id: 2, name: '果盘2', icon: '../../image/new.png', sold: 1029, price: 100, oldprice: 150 },
      3: { id: 3, name: '果盘3', icon: '../../image/new.png', sold: 1030, price: 5, oldprice: 10 },
      4: { id: 4, name: '果盘4', icon: '../../image/new.png', sold: 1059, price: 5, oldprice: 10 },
      5: { id: 5, name: '果盘5', icon: '../../image/new.png', sold: 1029, price: 130, oldprice: 150 },
      6: { id: 6, name: '果盘6', icon: '../../image/new.png', sold: 1064, price: 150, oldprice: 180 },
      7: { id: 7, name: '果盘7', icon: '../../image/new.png', sold: 814, price: 200, oldprice: 230 },
      8: { id: 8, name: '果盘8', icon: '../../image/new.png', sold: 124, price: 220, oldprice: 250 },
      9: { id: 9, name: '果盘9', icon: '../../image/new.png', sold: 102, price: 300, oldprice: 320 }
    },
    goodsList: [{ id: 'hot', classifyName: '热销', goods: [1, 2, 3, 4, 5] },
    { id: 'new', classifyName: '美味双拼', goods: [1, 3] },
    { id: 'vegetable', classifyName: '名炉烧味', goods: [1, 6, 5] },
    { id: 'mushroom', classifyName: '人气超值套餐', goods: [1, 7, 8, 9] },
    { id: 'food', classifyName: '开心加料', goods: [3, 4] },
    { id: 'new', classifyName: '最新推荐', goods: [3, 4] },
    { id: 'soup', classifyName: '老火汤', goods: [3, 4] }
    ],
    cart: {
      icon: '',
      name: '',
      count: 0,
      total: 0,
      list: {}
    },
    cartList: {},
    showCartDetail: false,
  },
  // 顶部导航绑定事件
  hdNavbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.hd
    })
  },
  // 新用户绑定事件
  newOffer: function() {
    wx.showModal({
      title: '新用户下单立减2.00(不与其他活动同享)',
      duration: 2000,
    })
  },
  checkOrderSame: function (name) {
    var list = this.data.goods;
    for (var index in list) {
      if (list[index].name === name) {
        return index;
      }
    }
    return false;
  },
  tapAddCart: function (e) {
    this.addCart(e.target.dataset.id);
    // for(var i;i){

    // }
  },
  tapReduceCart: function (e) {
    this.reduceCart(e.target.dataset.id);
  },
  addCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    this.data.cart.list[id] = num + 1;
    this.countCart();
    var price = this.data.goods[id].price;
    var name = this.data.goods[id].name;
    var img = this.data.goods[id].icon;
    var list = this.data.cartList;
    var sortedList = [];
    var index;
    if (index = this.checkOrderSame(name)) {
      sortedList = list[index];
      var num = this.data.cart.list[id] || 0;
      num = num + 1;
    }
    else {
      var order = {
        "price": price,
        "num": 1,
        "name": name,
        'img': img,
        "shopId": this.data.shopId,
        "shopName": this.data.shop.restaurant_name,
        "pay": 0,
      }
      list.push(order);
      sortedList = order;
    }
    this.setData({
      cartList: list,
    });
  },
  reduceCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    if (num <= 1) {
      delete this.data.cart.list[id];
    } else {
      this.data.cart.list[id] = num - 1;
    }
    this.countCart();
  },
  countCart: function (index, list) {
    var id = 0, icon = '',name = '', count = 0,
      total = 0;
    var goods;
    for (var id in this.data.cart.list) {
      goods = this.data.goods[id];
      id = this.data.goods[id].id;
      icon = this.data.goods[id].icon;
      name = this.data.goods[id].name;
      count += this.data.cart.list[id];
      total += goods.price * this.data.cart.list[id];
    }
    this.data.goods[id].id = id,
    this.data.goods[id].icon = icon,
    this.data.goods[id].name = name,
    this.data.cart.count = count;
    this.data.cart.total = total;
    this.setData({
      cart: this.data.cart
    });
    
    var item = { 'id': this.data.goods[id].id, 'icon': this.data.goods[id].icon, 'name': this.data.goods[id].name, 'count': this.data.cart.count, 'total': this.data.cart.total};
    arr.push(item);
    this.setData({
      arr: arr,
    });
    wx.setStorage({
      key: 'orderList',
      data: arr
    });
    // 存储订单页所需要的数据
    // wx.setStorage({
    //   key: 'orderList',
    //   data: {
    //     id: this.data.goods[id].id,
    //     icon: this.data.goods[id].icon,
    //     name: this.data.goods[id].name,
    //     count: this.data.cart.count,
    //     total: this.data.cart.total,
    //   },
    // });
  },
  follow: function () {
    this.setData({
      followed: !this.data.followed
    });
  },
  onGoodsScroll: function (e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }
    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.goodsList.length;
    this.data.goodsList.forEach(function (classify, i) {
      var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },
  tapClassify: function (e) {
    var id = e.target.dataset.id;
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        classifySeleted: id
      });
    }, 100);
  },
  // 弹窗
  showCartDetail: function (e) {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  hideCartDetail: function (e) {
    this.setData({
      showCartDetail: false
    });
  },
// 立即结算跳转
  bindCheckout: function () {
    wx.navigateTo({
      url: '/pages/checkout/checkout'
    })
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function(options) {
    this.setData({
    //   goods: postData.postList,
    //   goodsList: postData.postgoodsList,
      takeawayHead: postData. takeawayHead,
      takeawayNew: postData. takeawayNew,
      details: postData.details
    });
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function() {},
  /*生命周期函数--监听页面显示*/
  onShow: function() {
    this.setData({
      classifySeleted: this.data.goodsList[0].id
    });
  },
  /*生命周期函数--监听页面隐藏*/
  onHide: function() {},
  /*生命周期函数--监听页面卸载*/
  onUnload: function() {},
  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function() {},
  /*页面上拉触底事件的处理函数*/
  onReachBottom: function() {},
  /*用户点击右上角分享*/
  onShareAppMessage: function() {},
})