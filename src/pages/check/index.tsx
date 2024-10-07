import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import Check from '../../components/Check';
import Taro from '@tarojs/taro';
import { post } from '@/fetch';

const Index = () => {

    useEffect(()=>{
      // Taro.getStorage({
      //   key: "token",
      //   success: (res) => {
      //     const token = res.data;
      //     if (token) {
      //       resolve(token); // 如果token存在，解析Promise
      //     } else {
      //       reject(new Error("No token found")); // 如果没有token，拒绝Promise
      //       Taro.navigateTo({ url: "/pages/login/index" }); // 导航到登录页面
      //     }
      //   },
      //   fail: (err) => {
      //     reject(new Error(`Failed to get token: ${err}`)); // 存储操作失败时拒绝Promise
      //   }
      // });
      // post('/auth/login/', {
      //   studentId: "1350383261@qq.com",
      //   password: "123456",
      // }).then((res) => {
      //   Taro.setStorage({ key: 'token', data: res.data.access_token });
      //   console.log('登录成功');
      // });
    })
  return (
    <View className="index">
      <Check />
    </View>
  );
};

export default Index;
