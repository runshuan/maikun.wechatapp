var address = [];
Page({

  /*页面的初始数据*/
  data: {
    realname:'',
    mobile:'',
    area:'',
    detail:''
  },
  // 联系人名字input
  bindname:function(e){
    var that = this;
    this.setData({
      realname: e.detail.value
    })
  },
  // 电话input
  bindphone: function (e) {
    var that = this;
    this.setData({
      mobile: e.detail.value
    })
  },
  // 详细地址inpu
  bindaddress: function (e) {
    var that = this;
    this.setData({
      detail: e.detail.value
    })
  },
  // 添加
  addto:function(e){
    var realname = '', mobile = '', detail='', addres = '';
    // var form = e.detail.value;
    var item = { 'realname': this.data.realname, 'mobile': this.data.mobile, 'detail': this.data.detail, 'addres': this.data.addres};
    address.push(item);
    this.setData({
      address: address
    });
    wx.setStorage({
      key: 'addto',
      data: address
    });
    if (this.data.realname.length != '' & this.data.mobile.length != '' & this.data.detail.length != ''){
      wx.redirectTo({url: '../../address/list/list',})
    } 
    if (this.data.realname.length == ''){wx.showModal({ title: '请填写收件人姓名', showCancel: false });
      return;
    }
    if (this.data.mobile.length == ''){wx.showModal({ title: '请填写正确手机号码', showCancel: false });
      return;
    }
    if (this.data.detail.length == ''){wx.showModal({ title: '请填写详细地址', showCancel: false });
      return;
    }
      // wx.setStorage({
      //   key: 'addto',
      //   data: {
      //     realname: this.data.realname,
      //     gender: this.data.gender,
      //     mobile: this.data.mobile,
      //     detail: this.data.detail,
      //     addres: this.data.addres
      //   },
      // })
    
  },
  //  跳转地址
  selectAddress: function () {
    wx.navigateTo({
      url: '../search/search'
    });
  },

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'addres',
      success: function(res) {
        that.setData({
          addres: res.data
        })
      },
    })
    if (options.objectId) {
      that.loadAddress(options.objectId);
      that.setData({
        isEdit: true
      });
      wx.setNavigationBarTitle({
        title: '编辑地址'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '添加地址'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})