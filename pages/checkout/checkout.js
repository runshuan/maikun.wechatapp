var postData = require('../../utils/jsdata.js');

Page({
  /*页面的初始数据*/
  data: {
    arr:[],
    CacheAddress:[],
    isHaveAddress: false,
    addressInfo: null,
    // readlist : {}
  },
  selectAddress:function(){
    wx.navigateTo({
      url: '../../pages/address/list/list',
    })
    wx.removeStorage({
      key: 'CacheAddress'
    })
  },
  CacheAddress:function(e){
    // console.log(e)
    // listid = e.currentTarget.dataset.id;
  },
  aaa:function(e){
    console.log(e)
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    this.setData({
      goods: postData.postList,
      goodsList: postData.postgoodsList,
      takeawayHead: postData.takeawayHead,
      takeawayNew: postData.takeawayNew,
    });
    // 获取订单
    var that = this;
    var arr = wx.getStorageSync('orderList') || '';
    this.setData({
      arr:arr 
    })
    // console.log(arr);
    // 获取地址
    // var CacheAddress = wx.getStorageSync('CacheAddress') || '';
    // this.setData({
    //   CacheAddress: CacheAddress
    // })
    // console.log(CacheAddress);
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},
  /*生命周期函数--监听页面显示*/
  onShow: function () {
    // 页面显示
    var otherAddressInfo = getApp().globalData.otherAddressInfo;
    if (otherAddressInfo == null) {
      var addressList = wx.getStorageSync('addto');
      for (var key in addressList) {
        if (addressList[key].isDefult) {
          this.setData({
            addressInfo: addressList[key],
            isHaveAddress: true,
          });
        }
      }
      if (this.data.addressInfo == null && addressList.length > 0) {
        this.setData({
          addressInfo: addressList[0],
          isHaveAddress: true,
        });
      }
    } else {
      this.setData({
        addressInfo: otherAddressInfo,
        isHaveAddress: true,
      });
    }
  },
  /*生命周期函数--监听页面隐藏*/
  onHide: function () {},
  /*生命周期函数--监听页面卸载*/
  onUnload: function () {
    getApp().globalData.otherAddressInfo = null;
  },
  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},
  /*页面上拉触底事件的处理函数 */
  onReachBottom: function () {},
  /*用户点击右上角分享*/
  onShareAppMessage: function () {}
})