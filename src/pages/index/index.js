import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import codeIcon from "../../assets/img/code.png";
import questionIcon from "../../assets/img/question.png";
import { AtToast } from 'taro-ui'
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
    this.setState({
      openid: this.$router.params.openid
    })
  }

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

    if (codeList.length === 0) {
      Taro.showToast({
        title: '无内容',
        icon: 'none',
        duration: 900
      });
    } else {
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
          });
          Taro.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 900
          });
        }
      })
    }
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

