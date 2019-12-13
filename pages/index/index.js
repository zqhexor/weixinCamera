//index.js
//获取应用实例
let util = require('./../../utils/util.js');
const app = getApp()

Page({
  data: {
    visitingDate: '请选择访问日期',
    startDate: util.formatDate(new Date()),
    endDate: util.formatDate(new Date(new Date().setMonth(new Date().getMonth() + 36, 1))),
    startTime: '开始时间',
    endTime: '结束时间',
    endTimeStart: '09:00',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tempImagePath: "", // 拍照的临时图片地址
    personDisabled: false, // 人员
    carDisabled: true, // 车辆
  },
  // 事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 日期选择器函数
  bindDateChange: function (e) {
    this.setData({visitingDate: e.detail.value});
  },
  // 开始时间选择器函数
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value,
      endTimeStart: e.detail.value,
    });
  },
  // 结束选择器函数
  bindEndTimeChange: function (e) {
    this.setData({endTime: e.detail.value});
  },
  // 生命周期方法，加载
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 类型radio选择事件
  chooseTypeEvent: function (e) {
    console.log(e)
    if(e.detail.value == "0"){ // 人员
      this.setData({
        personDisabled: false,
        carDisabled: true
      })
    }else{// 车辆
      this.setData({
        personDisabled: true,
        carDisabled: false
      })
    }
  },
  // 获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 拍照上传按钮点击事件
  takePhotoEvent: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/takePhoto/takePhoto',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  // 识别按钮点击事件
  launchIdentEvent: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/identifyIdCard/identifyIdCard',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  // 图片点击事件
  imgPreview: function (e) {
    var that=this;
    var src = that.data.tempImagePath;//获取data-src
    var imgList = [that.data.tempImagePath];//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  // 预约
  reserve: function () {
    let url = "";
    let data = {};
    wx.showLoading({
      title: "预约中",
    })
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      success: function (res) {
        console.log(res)
        wx.hideLoading();
        // do something
      },
      fail: function (err) {
        console.log(err)
        wx.hideLoading();
        wx.showToast({
          title: '加载数据失败',
          icon: 'none'
        })
      },
      complete: function (res) {

      }
    });
  }
})
