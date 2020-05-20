//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    info:[
      {time:'0:00:11',second:11},
      {time:'2:20:47',second:8447}
    ],
    inteval:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  formatSeconds(value) { 
    var theTime = parseInt(value);// 需要转换的时间秒 
    var theTime1 = 0;// 分 
    var theTime2 = 0;// 小时 
    var theTime3 = 0;// 天
    var timeZero = ''
    var time1Zero = ''

    if(theTime > 60) { 
     theTime1 = parseInt(theTime/60); 
     theTime = parseInt(theTime%60); 
     if(theTime1 > 60) { 
      theTime2 = parseInt(theTime1/60); 
      theTime1 = parseInt(theTime1%60); 
      if(theTime2 > 24){
       //大于24小时
       theTime3 = parseInt(theTime2/24);
       theTime2 = parseInt(theTime2%24);
      }
     } 
    } 
    var result = '';
    if(theTime > 0){  //秒
      if(theTime <10){
        timeZero = "0"
      }
     result = "" + timeZero +parseInt(theTime);
    }else{
      result = "00";
    }


    if(theTime1 > 0) {   //分
      if(theTime1 <10){
        time1Zero = "0"
      }
     result = "" + time1Zero+parseInt(theTime1)+":"+result; 
    }else{
      result = "00" +":"+result
    } 


    if(theTime2 > 0) {   //小时
     result = ""+parseInt(theTime2)+":"+result; 
    }else{
      result = "0" + ':' +result
    } 


    // if(theTime3 > 0) {   //天
    //  result = ""+parseInt(theTime3)+":"+result; 
    // }
    console.log(result)
    return result; 
   },
  onLoad: function () {
    wx.hideTabBar({
      animation: false,
    })
    var that = this;
    var info = that.data.info;
    this.data.inteval = setInterval(function(){
      for(var i=0;i<info.length;i++){
        info[i].second = info[i].second-1
        var times = that.formatSeconds(info[i].second)
        info[i].time = times;
        that.setData({
          info:info
        })
      }
    },1000)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
