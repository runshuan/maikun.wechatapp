var markersData = [];
var amapFile = require('../../../amap-wx.js');
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
  },
  // 定位
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function () {
    // 定位
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '60e60751795f6c5e6f9631193f9fc2d4' });
    myAmapFun.getPoiAround({
      success: function (data) {
        markersData = data.markers;
        that.setData({
          markers: markersData
        });
        that.setData({
          latitude: markersData[0].latitude
        });
        that.setData({
          longitude: markersData[0].longitude
        });
        that.showMarkerInfo(markersData, 0);
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },
  // 定位
  showMarkerInfo: function (data, i) {
    var name = '', desc = '';
    this.data.textData.name = name;
    this.data.textData.desc = desc;    
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
    // 存储订单页所需要的数据
    wx.setStorage({
      key: 'addres',
      data: {
        name: this.data.textData.name,
        desc: this.data.textData.desc
      },
      // success: function () {
      //   console.log('写入value1成功')
      // },
      // fail: function () {
      //   console.log('写入value1发生错误')
      // }
    })
  },
  geoTapped: function(){
    wx.redirectTo({
      url: '../../address/add/add',
    })

  }
  
})