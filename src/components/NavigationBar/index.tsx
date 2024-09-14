import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import './index.scss'; // 引入样式文件
import Taro from '@tarojs/taro';
import zhizhi from '../../assets/images/IMG_2572.png'

// 导航栏组件
const NavigationBar: React.FC = () => {
  return (
    <View className="navigation-bar">
      {/* 图片按钮 */}
      <View className="left-button" onClick={() => console.log('点击了图片按钮')}>
        <Image className="left-icon" src={zhizhi} mode="aspectFit" />
      </View>
      {/* 标题 */}
      <View className="title-container">
        <Text className="title">智知</Text>
      </View>
      {/* 右侧内容，可以根据需要添加 */}
    </View>
  );
};

export default NavigationBar;