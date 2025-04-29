import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Loading() {
  return (
    <View className='loading-container'>
      <View className='loading-spinner'></View>
      <Text className='loading-text'>加载中...</Text>
    </View>
  )
}