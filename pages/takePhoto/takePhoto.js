Page({
  data: {
    device: true,
    tempImagePath: "", // 拍照的临时图片地址
    camera: true,
    ctx: {}
  },
  onLoad() {
    this.setData({
      ctx: wx.createCameraContext()
    })
  },
  // 切换相机前后置摄像头
  devicePosition() {
    this.setData({
      device: !this.data.device,
    })
    console.log("当前相机摄像头为:", this.data.device ? "后置" : "前置");
  },
  camera() {
    let ctx = this.data.ctx;
    ctx.takePhoto({
      quality: "high",
      success: (res) => {
        // console.log(res);
        this.setData({
          tempImagePath: res.tempImagePath,
          camera: false,
        });
      },
      fail: (e) => {
        console.log(e);
      }
    })
  },
  // 打开模拟的相机界面
  open() {
    console.log("拍照");
    this.setData({
      camera: true
    })
  },
  // 关闭模拟的相机界面
  close() {
    wx.navigateBack({//返回
      delta: 1
    })
  },
  // 使用照片
  usePhoto() {
    var pages = getCurrentPages();
    //上一个页面
    var prevPage = pages[pages.length - 2];
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      tempImagePath: this.data.tempImagePath,
    })
    // 上传文件
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
    //   filePath: this.data.tempImagePath,
    //   name: 'file',
    //   formData: {
    //     'user': 'test'
    //   },
    //   success (res){
    //     const data = res.data
    //     //do something
    //   }
    // })
    wx.navigateBack({//返回
      delta: 1
    })
  }
})