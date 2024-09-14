import Taro from '@tarojs/taro'
import { View, Text,Image,Input } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { AtIcon, AtSearchBar } from 'taro-ui'
import './index.scss'
import { useState } from 'react'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  const [value,setValue] = useState('');

  const searchChange = (value) =>{
    setValue(value);
  }

  const onActionClick = () =>{
    console.log('开始搜索')
  }

  const handleBack = () => {
    // 返回上一页
    Taro.navigateBack()
  }



  return (
    <View className='index'>
      <View className='navbar'>

      <AtIcon value='chevron-left' size='24' onClick={handleBack} />
      
      <View className='search-bar-container'>
        <AtSearchBar
          value={value}
          onChange={searchChange}
          onActionClick={onActionClick}
        />
      </View>
      </View>
      
      <Text>Hello world!</Text>
    </View>
  )
}
