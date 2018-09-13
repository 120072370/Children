//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    bgUrl:'/images/my_bg.png',
    userInfo: {},
    logged: false,
    avataricon: '/image/zan.jpeg',
        routers: [
            {
                name: '加法练习',
                url: '/pages/add/add',
                icon: '/images/zan.jpeg',
                codeID: '0'
            },
            {
                name: '减法练习',
                url: '/pages/reduction/reduction',
                icon: '/images/zan.jpeg',
                codeID: '1'
            },
            {
                name: '乘法练习',
                url: '/pages/take/take',
                icon: '/images/zan.jpeg',
                codeID: '2'
            },
            {
                name: '除法练习(开发中)',
                icon: '/images/zan.jpeg',
                codeID: '3'
            },
            {
                name: '加乘练习(开发中)',
                url: '/pages/Course/course',
                icon: '/images/zan.jpeg',
                codeID: '4'
            },
            {
                name: '减除练习(开发中)',
                icon: '/images/zan.jpeg',
                codeID: '5'
            },
            {
                name: 'DouBai666',
                url: '/pages/Course/course',
                icon: '/images/zan.jpeg',
                codeID: '6'
            },
            {
                name: 'WX<合作联系>QQ',
                icon: '/images/zan.jpeg',
                codeID: '7'
            },
            {
                name: '120072370',
                url: '/pages/Course/course',
                icon: '/images/zan.jpeg',
                codeID: '8'
            }
        ],

        routerss: [
            {
                name: '我的记录',
                url: '/pages/add/add',
                icon: '/images/zan.jpeg',
                codeID: '0'
            },
            {
                name: '我的记录',
                url: '/pages/reduction/reduction',
                icon: '/images/zan.jpeg',
                codeID: '1'
            },
            {
                name: '我的记录',
                url: '/pages/take/take',
                icon: '/images/zan.jpeg',
                codeID: '2'
            }
        ]

  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },


  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
