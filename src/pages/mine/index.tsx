import { View, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import { AtIcon } from 'taro-ui'
import icon1 from '../../assets/images/icon1.png'
import icon2 from '../../assets/images/icon2.png'
import icon3 from '../../assets/images/icon3.png'
import icon4 from '../../assets/images/icon4.png'
import img1 from '../../assets/images/img1.png'
import img2 from '../../assets/images/img2.png'
import font from '../../assets/images/组 5.png'
import avatar from '../../assets/images/avatar.png'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='mine'>
      <View className='name'>Momo</View>
      <View className='avatar'>
        <Image src={avatar} className='avatarImg'></Image>
      </View>
      <View className='box1'>
        <Image className='img' src={img1}></Image>
        <Image className='img2' src={img2}></Image>
        <Image src={font} className='font'></Image>
      </View>
      <View className='box2'>
        
        <View className='box3'>
          <Image src={icon1} className='icon'></Image>
          <AtIcon className='rightIcon' value='chevron-right' size='20' color='#9F9F9F'></AtIcon>
          <View className='text'>错题复习</View>
        </View>

        <View className='box3'>
          <Image src={icon2} className='icon'></Image>
          <AtIcon className='rightIcon' value='chevron-right' size='20' color='#9F9F9F'></AtIcon>
          <View className='text'>近日已学</View>
        </View>

        <View className='box3'>
          <Image src={icon3} className='icon'></Image>
          <AtIcon className='rightIcon' value='chevron-right' size='20' color='#9F9F9F'></AtIcon>
          <View className='text'>搜索记录</View>
        </View>

        <View className='box3'>
          <Image src={icon4} className='icon'></Image>
          <AtIcon className='rightIcon' value='chevron-right' size='20' color='#9F9F9F'></AtIcon>
          <View className='text'>设置</View>
        </View>
      </View> 
    </View>
  )
}
