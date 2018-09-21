import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '查询界面'
  }

  constructor(props) {
    super(props)
    this.state = {
      code: '',
      information: [],
      
    }
  }

  componentWillMount() {

  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onInput(e) {
    // console.log(e.target.value);
    this.setState({
      code: e.target.value
    })
  }
  search() {
    const that = this;
    const code = this.state.code;
    Taro.request({
      // url: 'http://127.0.0.1:7001/postSearchCode',
      url: 'https://www.jnmum.cn/postSearchCode',
      method: "POST",
      data: {
        code: code
      }
    }).then(res => {
      if (res.data.length != 0) {
        that.setState({
          information: res.data
        })
      } else {
        this.setState({
          code: '',
          information: res.data
        })
        wx.showModal({
          title: '提示',
          content: '数据库中无此快递单号，请仔细审核单号后查询',
          showCancel: false
        })
      }
    })
  }
  callPhone(phone) {
    console.log(phone);
    const phoneStr = String(phone);
    wx.makePhoneCall({
      phoneNumber: phoneStr
    })
  }

  render() {
    const information = this.state.information;
    let item;
    const informationKeyArr = Object.keys(information);
    if (informationKeyArr.length !== 0) {
      item = information.map((e, index) => {
        //将时间格式化
        const date = new Date(e.createdAt);
        const localDate = date.toLocaleDateString();
        const localTime = date.toLocaleTimeString();
        return (
          <div className='informationItem'>
            <View>{e.name}负责配送</View>
            <View onClick={this.callPhone.bind(this,e.phone)}>联系电话：<span className='specialText'>{e.phone}</span></View>
            {e.isQuestion ? <View>在给您派件时打电话没打通</View> : null}
            <View>{localDate}</View>
            <View>{localTime}</View>
          </div>
        )
      }
      )
    } else {
      item = <View></View>;
    }
    return (
      <View className='index'>
        <Input className='codeInput' type='text' placeholder='请输入查询的快递单号' value={this.state.code} onInput={this.onInput.bind(this)} />
        <Button className='searchBtn' onClick={this.search.bind(this)}>点击查询</Button>
        <div className="informationBox">
          {item}

        </div>
      </View>
    )
  }
}

