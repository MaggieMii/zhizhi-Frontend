import { View, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { AtNavBar,AtSearchBar,AtIcon } from 'taro-ui'
import NavigationBar from '../../components/NavigationBar';
import Taro from '@tarojs/taro'
import './index.scss'
import knowledge from  '../../assets/images/知识网络.png'
import homeworkcheck from '../../assets/images/作业检查.png'
import question from '../../assets/images/题目引导.png'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  const handleClick = () =>{
    Taro.navigateBack();
  }

  const handleBtnClick = (num) =>{
    if(num == 3){
      Taro.navigateTo({
        url: '/pages/guidance/index'
      });
    }
  }

  return (
    <View className='menu'>
      {/* <AtNavBar
        onClickRgIconSt={handleClick}
        onClickRgIconNd={handleClick}
        onClickLeftIcon={handleClick}
        color='#000'
        title='NavBar 导航栏示例'
        leftText='返回'
        rightFirstIconType='bullet-list'
        rightSecondIconType='user'
      /> */}
      <NavigationBar />
      <View className='button top'>
        <Image className='btimage topimg' src={knowledge} ></Image>
        <View className='ltitle'>学习情况</View>
        <View className='stitle'>{'温故而知新, \n积跬步而致千里'}</View>
      </View>
      <View className='button center'>
        <Image className='btimage centerimg' src={homeworkcheck} ></Image>
        <View className='ltitle'>作业检查</View>
      </View>
      <View className='button bottom' onClick={()=>handleBtnClick(3)}>
        <Image className='btimage bottomimg' src={question} ></Image>
        <View className='ltitle' >题目引导</View>
      </View>
    </View>
  )
}
