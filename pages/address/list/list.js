// var CacheAddress = [];
Page({
  /*页面的初始数据*/
  data: {
    // address:[],
    addressList:[]
  },
  add:function(){
    var that = this;
    // 存储订单页所需要的数据
    wx.navigateTo({
      url: '../../address/add/add',
      })
  },
  CacheAddress: function (e){
    // 缓存地址
    // var tha = this;
    // var addr = this.data.address;
    // wx.setStorage({
    //   key: 'CacheAddress',
    //   data: addr,
    // });
    // wx.navigateTo({
    //   // url: '../../checkout/checkout?index=' + this.data.address[index].index
    //   url: '../../checkout/checkout'       
    // })

    // 收货地址
    var selectIndex = e.currentTarget.dataset.index;
    getApp().globalData.otherAddressInfo = this.data.addressList[selectIndex];
    wx.navigateBack({
      delta: 1 // 回退前 delta(默认为1) 页面
    })
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
  //   var that= this;
  //   var address = wx.getStorageSync('addto') || '';
  //   this.setData({
  //     address: address
  //   })
  //   console.log(address)
  },

  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},
  /* 生命周期函数--监听页面显示*/
  onShow: function () {
    
    this.setData({
      addressList: wx.getStorageSync('addto'),
    });
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