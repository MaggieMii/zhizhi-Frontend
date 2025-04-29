import { useState,useEffect } from 'react'
import { View } from '@tarojs/components'
import Chat from '../../components/Chat'
import Loading from '../../components/Loading' // 确保已创建Loading组件

const Index = () => {
  const [showLoading, setShowLoading] = useState(true) // 默认显示loading

  // 模拟数据加载完成（实际使用时替换为你的真实逻辑）
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 2000) // 2秒后隐藏loading

    return () => clearTimeout(timer)
  }, [])

  return (
    <View className="index">
      {showLoading ? <Loading /> : <Chat />}
    </View>
  )
}

export default Index