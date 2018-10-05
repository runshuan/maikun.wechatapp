// pages/sear/sear.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    inputsearch: '',
    job: [],
    history: [],
  },
  search: function (e) {
    var that = this;
    var sear = this.data.inputsearch;
    var jobs = this.data.job;
    var input = new RegExp(sear);
    var temp = [];
    if (sear == '') {
      wx.showToast({
        title: '请输入要搜索信息',
        icon: "none",
        duration: 1000
      });
      return false;
    } else {
      this.data.history.unshift(sear);
      wx.setStorage({
        key: 'history',
        data: that.data.history,
        success: function (res) {
          that.setData({
            history: that.data.history,
            status: true
          })
          console.log(res.data);
        },
      })
      for (let i = 0; i < jobs.length; i++) {
        if (input.test(jobs[i].job) || input.test(jobs[i].company) || input.test(jobs[i].address)) {

          temp.push(jobs[i]);
          var detail = temp;
          app.globalData.details = detail;
        }
      }
      if (temp == '') {
        wx.showToast({
          title: '暂无此信息',
          icon: "none",
          duration: 1000

        });
        this.setData({
          inputsearch: ''
        })
      } else if (temp) {
        wx.navigateTo({
          url: '../about/about'
        })
        this.setData({
          inputsearch: ''
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'history',
      success: function (res) {
        that.setData({
          history: res.data,
        })
      },
      fail: function (res) {
        console.log(res + 'aaaaa')
      }
    });

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