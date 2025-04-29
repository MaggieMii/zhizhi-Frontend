import { View, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import NavigationBar from '../../components/NavigationBar';
import Taro from '@tarojs/taro'
import './index.scss'
import knowledge from  '../../assets/images/知识网络.png'
import homeworkcheck from '../../assets/images/作业检查.png'
import question from '../../assets/images/题目引导.png'
import {post} from '@/fetch'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
    post('/auth/login/',{
      email: "1350383261@qq.com",
      password: "123456"
    },false).then((res) => {
      const token = res.access_token
      Taro.setStorage({
      key: 'token',
      data: token.toString(),
      success: () => {
        console.log('Token 设置成功');
        // 方便看情况 log 出 longToken 后期上线之前删除掉这个
        // console.log(token);
      },
    });
    });
  })

  

  const handleBtnClick = (num) =>{

    if(num == 2){
      Taro.navigateTo({
        url: '/pages/camera/index'
      });
    }
    if(num == 3){
      Taro.navigateTo({
        url: '/pages/guidance/index'
      });
    }
  }

  return (
    <View className='menu'>
      <NavigationBar />
      <View className='button top'>
        <Image className='btimage topimg' src={knowledge} ></Image>
        <View className='ltitle'>学习情况</View>
        <View className='stitle'>{'温故而知新, \n积跬步而致千里'}</View>
      </View>
      <View className='button center' onClick={()=>handleBtnClick(2)}>
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
