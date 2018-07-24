import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/home/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount() {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code);
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: "wxa65b857e40095d0e", 
              secret: "40030bc4b3d3af6bafb81ff33c459a50",
              grant_type: "authorization_code",
              js_code: res.code
            },
            method: 'GET',
            success: function(openidRes) {
              console.log(openidRes.data.openid);
              if(openidRes.data.openid === 'oA8kD5sMapEEsXaeESUfVsX5Sgcw') {
                console.log('你是员工');
                wx.redirectTo({
                  url: "../index/index"
                });
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }

  componentDidShow() { }

  componentDidHide() { }

  componentCatchError() { }

  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
