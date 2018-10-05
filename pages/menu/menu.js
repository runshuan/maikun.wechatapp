var app = getApp();
Page({
  /* 页面的初始数据*/
  data: {
    // 头部
    takeawayHead: { shopLogo: '/image/surface.png', shopName: '好好好吃', noticePic: '/image/notice.png',       noticeText: '尊敬的新老客户！本店于11点开始配送外卖', shopOffer: '￥8起送 | 30送达 | 商家配送（6公里内）' },
    // 新用户
    takeawayNew: { npic: '/image/new.png', newText: "新用户下单立减2.00(不与其他活动同享)", dpic: '/image/option.png' },
    // 顶部导航
    topNav: ['外卖', '评价', '详情'],
    currentTab: 0,
    // 跑马灯
    marqueePace: 1,//滚动速度
    marqueeDistance: 140,//初始滚动距离
    orientation: 'left',//滚动方向
    interval: 20, 
    size: 14, // 时间间隔
    // 菜单栏
    goods: {
      1: { id: 1, name: '果盘3', pic: '/image/new.png', sold: 1014, price: 120, oldprice: 150 },
      2: { id: 2, name: '龙舌兰', pic: '/image/new.png', sold: 1029, price: 100, oldprice: 150 },
      3: { id: 3, name: '方便面', pic: '/image/new.png', sold: 1030, price: 5, oldprice: 10 },
      4: { id: 4, name: '粉丝', pic: '/image/new.png', sold: 1059, price: 5, oldprice: 10 },
      5: { id: 5, name: '果盘1', pic: '/image/new.png', sold: 1029, price: 130, oldprice: 150 },
      6: { id: 6, name: '果盘2', pic: '/image/new.png', sold: 1064, price: 150, oldprice: 180 },
      7: { id: 7, name: '锐澳', pic: '/image/new.png', sold: 814, price: 200, oldprice: 230 },
      8: { id: 8, name: '尊尼获加', pic: '/image/new.png', sold: 124, price: 220, oldprice: 250 },
      9: { id: 9, name: '芝士华', pic: '/image/new.png', sold: 102, price: 300, oldprice: 320 }
    },
    goodsList: [{ id: 'hot', classifyName: '热销', goods: [1, 2, 3, 4, 5] },
    { id: 'new', classifyName: '美味双拼', goods: [1, 3] },
    { id: 'vegetable', classifyName: '名炉烧味', goods: [1, 6, 5] },
    { id: 'mushroom', classifyName: '人气超值套餐', goods: [1, 7, 8, 9] },
    { id: 'food', classifyName: '开心加料', goods: [3, 4] },
    { id: 'new', classifyName: '最新推荐', goods: [3, 4] },
    { id: 'soup', classifyName: '老火汤', goods: [3, 4] }
    ], 
    classifySeleted:'',
    animation: true,
    goodsH: 0,
    goodsNumArr: [0],//记录了每个类型商品占用的高度
    shoppingCart: {},//购物车物品id映射数量
    shoppingCartGoodsId: [],//购物车里面的物品的id
    goodMap: {},//所有物品的列表
    chooseGoodArr: [],//购物车的物品列表
    totalNum: 0,//总数量
    totalPay: 0,//总价
    showShopCart: false,//购物列表是否展示
    hide_good_box: true,
  },
  // 顶部导航绑定事件
  hdNavbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.hd
    })
  },
  // 新用户绑定事件
  newOffer: function () {
    wx.showModal({
      title: '新用户下单立减2.00(不与其他活动同享)',
      duration: 2000,
    })
  },
  //菜单联动
  tapClassify: function (e) {
    var id = e.currentTarget.id;
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


  //添加商品到购物车
  addGoodToCartFn: function (e) {
    let shoppingCart = JSON.parse(JSON.stringify(this.data.shoppingCart));
    let shoppingCartGoodsId = [];
    let _id = e.target.id.split('_')[1];
    let _index = -1;
    console.log(e)
    if (this.data.shoppingCartGoodsId.length > 0) {
      for (let i = 0; i < this.data.shoppingCartGoodsId.length; i++) {
        shoppingCartGoodsId.push(this.data.shoppingCartGoodsId[i])
        if (_id == this.data.shoppingCartGoodsId[i]) {
          _index = i;
        }
      }
    }

    if (_index > -1) {//已经存在购物车，只是数量变化
      shoppingCart[_id] = Number(shoppingCart[_id]) + 1;
    } else {//新增  
      shoppingCartGoodsId.push(_id);
      shoppingCart[_id] = 1;
    }

    //抛物线的动画
    //this.ballDrop(e);
    //this.touchOnGoods(e);

    this.setData({
      shoppingCart: shoppingCart,
      shoppingCartGoodsId: shoppingCartGoodsId
    });

    this._resetTotalNum();
  },
  touchOnGoods: function (e) {
    this.finger = {}; var topPoint = {};
    this.finger['x'] = e.touches["0"].clientX;//点击的位置
    this.finger['y'] = e.touches["0"].clientY;
    if (this.finger['y'] < this.busPos['y']) {
      topPoint['y'] = this.finger['y'] - 150;
    } else {
      topPoint['y'] = this.busPos['y'] - 150;
    }
    topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;

    if (this.finger['x'] > this.busPos['x']) {
      topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
    } else {
      topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
    }
    this.linePos = app.bezier([this.busPos, topPoint, this.finger], 30);
    this.startAnimation(e);
  },
  startAnimation: function (e) {
    var index = 0, that = this,
      bezier_points = that.linePos['bezier_points'];
    this.setData({
      hide_good_box: false,
      bus_x: that.finger['x'],
      bus_y: that.finger['y']
    })
    var len = bezier_points.length;
    index = len
    this.timer = setInterval(function () {
      for (let i = index - 1; i > -1; i--) {
        that.setData({
          bus_x: bezier_points[i]['x'],
          bus_y: bezier_points[i]['y']
        })

        if (i < 1) {
          clearInterval(that.timer);
          that.addGoodToCartFn(e);
          that.setData({
            hide_good_box: true
          })
        }
      }
    }, 25);
  },


  //移除商品的事件
  decreaseGoodToCartFn: function (e) {
    let shoppingCart = JSON.parse(JSON.stringify(this.data.shoppingCart));
    let shoppingCartGoodsId = [];
    let _id = e.target.id.split('_')[1];
    let _index = -1;
    if (this.data.shoppingCartGoodsId.length > 0) {
      for (let i = 0; i < this.data.shoppingCartGoodsId.length; i++) {
        shoppingCartGoodsId.push(this.data.shoppingCartGoodsId[i]);
        if (_id == this.data.shoppingCartGoodsId[i]) {
          _index = i;
        }
      }
    }

    if (_index > -1) {//已经存在购物车，只是数量变化
      shoppingCart[_id] = Number(shoppingCart[_id]) - 1;
      if (shoppingCart[_id] <= 0) {
        shoppingCartGoodsId.splice(_index, 1);
      }
    }

    this.setData({
      shoppingCart: shoppingCart,
      shoppingCartGoodsId: shoppingCartGoodsId
    });

    this._resetTotalNum();
  },
  //重新计算选择的商品的总数和总价
  _resetTotalNum: function () {
    let shoppingCartGoodsId = this.data.shoppingCartGoodsId,
      totalNum = 0,
      totalPay = 0,
      chooseGoodArr = [];

    if (shoppingCartGoodsId) {
      for (let i = 0; i < shoppingCartGoodsId.length; i++) {
        let goodNum = Number(this.data.shoppingCart[shoppingCartGoodsId[i]]);
        totalNum += Number(goodNum);
        totalPay += Number(this.data.goodMap[shoppingCartGoodsId[i]].price) * goodNum;
        chooseGoodArr.push(this.data.goodMap[shoppingCartGoodsId[i]]);
      }
    }

    this.setData({
      totalNum: totalNum,
      totalPay: totalPay.toFixed(2),
      chooseGoodArr: chooseGoodArr
    });
  },
  //电器购物车，购物列表切换隐藏或者现实
  showShopCartFn: function (e) {
    if (this.data.totalPay > 0) {
      this.setData({
        showShopCart: !this.data.showShopCart
      });
    }
  },
  //清空购物车
  clearShopCartFn: function (e) {
    this.setData({
      shoppingCartGoodsId: [],
      totalNum: 0,
      totalPay: 0,
      chooseGoodArr: [],
      shoppingCart: {}
    });
  },
  //结算
  goPayFn: function (e) {
    let goodsIds = "",
      quantitys = "",
      _that = this;

    for (let i = 0; i < this.data.shoppingCartGoodsId.length; i++) {
      goodsIds += this.data.shoppingCartGoodsId[i] + ",";
      quantitys += this.data.shoppingCart[this.data.shoppingCartGoodsId[i]] + ","
    }

    goodsIds = goodsIds.substring(0, goodsIds.length - 1);
    quantitys = quantitys.substring(0, quantitys.length - 1);
  },


  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    let systemInfo = wx.getStorageSync('systemInfo');
    let mechine = options;//wx.getStorageSync('mechine');
    let _that = this;

    this.busPos = {};
    this.busPos['x'] = 45;//购物车的位置
    this.busPos['y'] = app.globalData.hh - 56;

    this.setData({
      mechine: mechine,
      systemInfo: systemInfo,
      goodsH: systemInfo.windowHeight - 245 - 48
    });
    //存下项目下的产品个数
    for (let i = 0; i < _that.data.goodsList.length; i++) {
      _that.data.goodsNumArr.push(_that.data.goodsList[i].goodsList.length);
      let goodss = _that.data.goodsList[i].goodsList;
      if (goodss.length > 0) {
        for (let j = 0; j < goodss.length; j++) {
          //console.log(goodss[j].id)
          _that.data.goodMap[goodss[j].id] = goodss[j];
        }
      }
    }
    let HArr = [];
    for (let j = 0; j < _that.data.goodsNumArr.length; j++) {
      if (j == 0) {
        HArr.push(0);
      } else {
        HArr.push(_that.data.goodsNumArr[j] * 98 + HArr[j - 1]);
      }
    }
    _that.data.goodsNumArr = HArr;
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},
  /*生命周期函数--监听页面显示*/
  onShow: function () {
    // 跑马灯
    var vm = this;
    var length = vm.data.takeawayHead.noticeText.length * vm.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    vm.setData({
      length: length,
      windowWidth: windowWidth,
    });
    vm.run1();// 水平一行字滚动完了再按照原来的方向滚动
  },
  // 跑马灯
  run1: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (-vm.data.marqueeDistance < vm.data.length) {
        vm.setData({
          marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
        });
      } else {
        clearInterval(interval);
        vm.setData({
          marqueeDistance: vm.data.windowWidth
        });
        vm.run1();
      }
    }, vm.data.interval);
  },
  /*生命周期函数--监听页面隐藏*/
  onHide: function () {},
  /*生命周期函数--监听页面卸载*/
  onUnload: function () {},
  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},
  /*页面上拉触底事件的处理函数*/
  onReachBottom: function () {},
  /*用户点击右上角分享*/
  onShareAppMessage: function () {}
})