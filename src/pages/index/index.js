import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import codeIcon from "../../assets/img/code.png";
import questionIcon from "../../assets/img/question.png";
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '员工界面'
  }

  constructor(props) {
    super(props)
    this.state = {
      codeList: [],
      openid: '',
      inputCode: ''
    }
  }

  componentWillMount() {
    const that = this;
    wx.login({
      success: function (res) {
        if (res.code) {

          //注意微信登录获取openid是隐秘行为，不能再前端进行
          //在前端获取到code之后将code发送到后端再请求获取openid

          const code = res.code;
          Taro.request({
            // url: 'http://127.0.0.1:7001/getOpenid',
            url: 'https://www.jnmum.cn/getOpenid',
            method: 'POST',
            data: {
              code: code
            }
          }).then(res => {
            // console.log(res.data);
            const openid = res.data;
            that.setState({
              openid: openid
            })
            if (openid === 'oA8kD5sMapEEsXaeESUfVsX5Sgcw' || openid === 'oA8kD5gSIbE4dTZ896XOUGAjEutY' || openid === 'oA8kD5uS_GbKJqR5sTuc8CSQcEoA' || openid === 'oA8kD5knAxOz7RVq9yAqBkZO4poo' || openid === 'oA8kD5qtkBK48qaPmZnsimQaBpzE' || openid === 'oA8kD5p1wiA5pxFnpi3ifx3i_6Kk' || openid === 'oA8kD5v03_kdX88XR6h3hli_q4ws') {
              console.log('你是员工');
            } else {
              console.log('你是用户');
              wx.redirectTo({
                url: "../home/index"
              });
            }
          })

          //发起网络请求
          // console.log(res.code);
          // wx.request({
          //   url: 'https://api.weixin.qq.com/sns/jscode2session',
          //   data: {
          //     appid: "wxa65b857e40095d0e",
          //     secret: "40030bc4b3d3af6bafb81ff33c459a50",
          //     grant_type: "authorization_code",
          //     js_code: res.code
          //   },
          //   method: 'GET',
          //   success: function (openidRes) {
          //     // console.log(openidRes.data.openid);
          //     that.setState({
          //       openid: openidRes.data.openid
          //     })

          //     //临时注释

          // if (openidRes.data.openid === 'oA8kD5sMapEEsXaeESUfVsX5Sgcw' || openidRes.data.openid === 'oA8kD5gSIbE4dTZ896XOUGAjEutY' || openidRes.data.openid === 'oA8kD5uS_GbKJqR5sTuc8CSQcEoA' || openidRes.data.openid === 'oA8kD5knAxOz7RVq9yAqBkZO4poo' || openidRes.data.openid === 'oA8kD5qtkBK48qaPmZnsimQaBpzE' || openidRes.data.openid === 'oA8kD5p1wiA5pxFnpi3ifx3i_6Kk' || openidRes.data.openid === 'oA8kD5v03_kdX88XR6h3hli_q4ws') {
          //   console.log('你是员工');
          // } else {
          //   console.log('你是用户');
          //   wx.redirectTo({
          //     url: "../home/index"
          //   });
          // }
          //   }
          // })
        } else {
          // console.log('登录失败！' + res.errMsg);
          wx.showModal({
            title: '提示',
            content: '登录失败！' + res.errMsg,
            showCancel: false
          })
        }
      }
    });
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  scanCode() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        // console.log(res)
        const list = this.state.codeList;
        let haveCode = false;
        list.map((e, index) => {
          if (e === res.result) {
            haveCode = true;
          }
        })
        //判断是否重复扫码

        if (!haveCode) {
          list.push(res.result);
          this.setState({
            data: list
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '该条形码已扫描过，请勿重复扫描',
            showCancel: false
          })
        }
      }
    })
  }

  deleteCode(index) {
    const list = this.state.codeList;
    list.splice(index, 1);
    this.setState({
      codeList: list
    })
  }

  submit() {
    // console.log('提交');
    const codeList = this.state.codeList;
    const openid = this.state.openid;

    Taro.request({
      // url: 'http://127.0.0.1:7001/postCode',
      url: 'https://www.jnmum.cn/postCode',
      method: "POST",
      data: {
        codeList: codeList,
        openid: openid
      }
    }).then(res => {
      // console.log(res);
      if (res.data === 'ok') {
        this.setState({
          codeList: []
        })
      }
    })
  }

  gotoQuestion() {
    //此处遇到路由指向问题查到官方issue解决
    Taro.redirectTo({
      url: '/pages/question/index'
    })
  }

  inputCodeChange(e) {
    this.setState({
      inputCode: e.target.value
    })
  }
  inputCodeSubmit() {
    const code = this.state.inputCode;
    const list = this.state.codeList;
    let haveCode = false;
    if (code === '') {
      wx.showModal({
        title: '提示',
        content: '订单号不能为空',
        showCancel: false
      })
    } else {
      list.map((e, index) => {
        if (e === code) {
          haveCode = true;
        }
      })
      //判断是否重复扫码

      if (!haveCode) {
        list.push(code);
        this.setState({
          data: list,
          inputCode: ''
        })
      } else {
        this.setState({
          inputCode: ''
        })
        wx.showModal({
          title: '提示',
          content: '该取件码已在列表，请勿重复添加',
          showCancel: false
        })
      }
    }

  }

  render() {
    const list = this.state.codeList;
    let item;
    if (list.length !== 0) {
      item = list.map((e, index) =>
        <div className='listContainer'>
          <Button onClick={this.deleteCode.bind(this, index)} className='deleteBtn' size="mini" >X</Button>
          <Text className="codeListText">{e}</Text>
        </div>
      );
    } else {
      item = '无'
    }
    return (
      <View className='index'>
        <View className="list">
          <Text>{this.state.data}</Text>
          <View className="title">单号列表</View>
          <View className='scrollBox'>
            {item}
          </View>
          <View className='inputCodeContainer'>
            <Input className='inputCodeBox' onInput={this.inputCodeChange.bind(this)} value={this.state.inputCode} type='text' placeholder='手动输入订单号' />
            <Button onClick={this.inputCodeSubmit.bind(this)} inputCodeBtn>提交</Button>
          </View>
          <Button className='submitBtn' onClick={this.submit.bind(this)}>上传</Button>
        </View>
        <View className="functionBtn">
          <View onClick={this.gotoQuestion.bind(this)} className="gotoQuestion">
            <Image
              className="icon"
              src={questionIcon}
            />
            <text className="functionText">
              问题件界面
            </text>
          </View>
          <View className='scanCode' onClick={this.scanCode.bind(this)}>
            <Image
              className="icon"
              src={codeIcon}
            />
            <text className="functionText">
              点击扫描二维码
            </text>
          </View>
        </View>

      </View>
    )
  }
}

