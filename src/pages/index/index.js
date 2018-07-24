import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
    this.state = {
      codeList: []
    }
  }

  componentWillMount() {
    Taro.request({
      url: 'http://127.0.0.1:7001/postCode',
      method: "POST",
    }).then(res => {
      console.log(res);
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  scanCode() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        const list =  this.state.codeList;
        list.push(res.result);
        this.setState({
          data: list
        })
      }
    })
  }

  deleteCode(index) {
    const list = this.state.codeList;
    list.splice(index,1);
    this.setState({
      codeList: list
    })
  }

  render() {
    const list = this.state.codeList;
    let item;
    if(list.length !== 0) {
      item = list.map((e,index) => 
      <div className='listContainer'>
          <Button onClick={this.deleteCode.bind(this,index)} className='deleteBtn' size="mini" >X</Button>
          <Text>{e}</Text>
        </div>
    );
    }else {
      item = '无'
    }
    return (
      <View className='index'>
        <Button onClick={this.scanCode.bind(this)}>点击扫描二维码</Button>
        <Text>{this.state.data}</Text>

        <Text>------------单号列表----------------</Text>
        {item}
        
      </View>
    )
  }
}

