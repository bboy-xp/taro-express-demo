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
      information: []
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
    console.log(111);
    const code = this.state.code;
    console.log(code);
    Taro.request({
      // url: 'http://127.0.0.1:7001/postSearchCode',
      url: 'http://sxp.topsxp.top:7001/postSearchCode',
      method: "POST",
      data: {
        code: code
      }
    }).then(res => {
      console.log(res.data);
      if (res.data.length != 0) {
        that.setState({
          information: res.data
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '数据库中无此快递单号，请仔细审核单号后查询',
          showCancel: false
        })
      }
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
            <View>xxx负责配送</View>
            <View>联系电话：xxxxxxxxxxxx</View>
            <View>{localDate}</View>
            <View>{localTime}</View>
          </div>
        )
      }
      )
    }
    return (
      <View className='index'>
        <Input className='codeInput' type='text' placeholder='请输入查询的快递单号' value={this.state.value} onInput={this.onInput.bind(this)} />
        <Button className='searchBtn' onClick={this.search.bind(this)}>点击查询</Button>
        <div className="informationBox">
          {item}
        </div>
      </View>
    )
  }
}

