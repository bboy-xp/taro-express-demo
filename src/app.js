import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import './app.scss'

class App extends Component {
  config = {
    pages: [
      'pages/loading/index',
      'pages/home/index',
      'pages/index/index',
      'pages/question/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount() {
    
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
