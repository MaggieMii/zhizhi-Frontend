// import Taro from '@tarojs/taro'
import { View, Text,Image,Input } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
// import { AtIcon, AtSearchBar } from 'taro-ui'
import './index.scss'
// import { useState } from 'react'
import search from '../../assets/images/search.png'
import img1 from '../../assets/images/组 8.png'
import img2 from '../../assets/images/组 9.png'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })




  return (
    <View className='question'>
      <Image className='img1' src={img1}></Image>
      <Image className='img2' src={img2}></Image>
      <Image className='img3' src={img1}></Image>
      <Image className='search' src={search}></Image>
    </View>
  )
}
