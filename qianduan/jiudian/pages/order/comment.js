var app = getApp();
var wxb = require('../../utils/wxb.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    detail: [],
    photos: [],
    photos_url: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wxb.that = this;   //正确打开巅峰互联的方式
      wxb.globalData = app.globalData; //正确打开巅峰互联的方式
      wxb.that.setData({
        id: options.id
      });
      if (!wxb.checkAuthLogin(true)) {
        wxb.login();
      }
      wxb.Post('/api/hotelgw.member/orderDetail', {
        order_id: wxb.that.data.id,
        openid: wxb.getOpenId()
      }, function (data) {
        wxb.that.setData({
          detail: data
        });
      });
  },
  onShow:function(){
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
  },
  formSubmit:function(e){
    var params = e.detail.value;
    wx.showLoading({
      title: '正在加载中..',
    });
    wxb.Post('/api/hotelgw.member/comment', {
      order_id: wxb.that.data.id,
      openid: wxb.getOpenId(),
      score: params.score,
      content: params.content, 
      photo: wxb.that.data.photos,
    }, function (data) {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
      });
      wx.redirectTo({
        url: '/pages/order/index',
      })
    });
  },
  delele: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    var photos = that.data.photos;
    var newphotos = [];
    for (var a in photos) {
      if (a != index) {
        newphotos.push(photos[a]);
      }
    }
    var photos_url = that.data.photos_url;
    var newphotos_url = [];
    for (var a in photos_url) {
      if (a != index) {
        newphotos_url.push(photos_url[a]);
      }
    }
    that.setData({
      photos: newphotos,
      photos_url: newphotos_url,
    });
  },
  upload: function () {
    wxb.that = this;   //正确打开巅峰互联的方式
    wxb.globalData = app.globalData; //正确打开巅峰互联的方式
      wxb.fileupload('', function (data) {
        var photos = wxb.that.data.photos;
        var photos_url = wxb.that.data.photos_url;
        console.log(data);
        photos.push(data.img);
        photos_url.push(data.img_url);
        wx.hideLoading();
        wxb.that.setData({
          photos: photos,
          photos_url: photos_url,
        })
      });
  },

})