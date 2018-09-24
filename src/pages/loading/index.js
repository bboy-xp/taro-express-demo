import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: 'Loading...'
  }

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  async componentWillMount() {
    await wx.login({
      success: function (res) {
        if (res.code) {

          //注意微信登录获取openid是隐秘行为，不能再前端进行
          //在前端获取到code之后将code发送到后端再请求获取openid

          const code = res.code;
          Taro.request({
            url: 'https://www.jnmum.cn/getOpenid',
            method: 'POST',
            data: {
              code: code
            }
          }).then(res => {
            const openid = res.data;
            if (openid === 'oA8kD5sMapEEsXaeESUfVsX5Sgcw' || openid === 'oA8kD5gSIbE4dTZ896XOUGAjEutY' || openid === 'oA8kD5uS_GbKJqR5sTuc8CSQcEoA' || openid === 'oA8kD5knAxOz7RVq9yAqBkZO4poo' || openid === 'oA8kD5qtkBK48qaPmZnsimQaBpzE' || openid === 'oA8kD5p1wiA5pxFnpi3ifx3i_6Kk' || openid === 'oA8kD5v03_kdX88XR6h3hli_q4ws') {

              // setTimeout(() => {
              //   wx.redirectTo({
              //     url: `../index/index?openid=${openid}`
              //   })
              // }, 500);
              wx.redirectTo({
                url: `../index/index?openid=${openid}`
              })
            } else {
              setTimeout(() => {
                wx.redirectTo({
                  url: "../home/index"
                });
              }, 500)
            }
          })

        } else {
          wx.showModal({
            title: '提示',
            content: '登录失败！' + res.errMsg,
            showCancel: false
          })
        }
      }
    });
  }

  render() {

    return (
      <View className='loadingContent'>
        <AtIcon className="loadingIcon" value='loading-3' size='80' color='#7ca7fa'></AtIcon>
        <View className="loadingText">
          <Text className="text1">小栾</Text>
          <Text className="text2">正在</Text>
          <Text className="text1">拼命</Text>
          <Text className="text2">加载</Text>
          <Text className="text1">中</Text>
          <Text>.....</Text>
        </View>
      </View>
    )
  }
}

