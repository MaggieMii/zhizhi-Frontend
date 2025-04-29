import Taro from '@tarojs/taro';
import { View, Input, Button} from '@tarojs/components';
import { useState } from 'react';
import {post} from '@/fetch'
import './index.scss'

const Login = () => {
  const [loginMode, setLoginMode] = useState(true); // true 为登录模式，false 为注册模式
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLogin = () => {
    // 登录逻辑
    // console.log('登录', { email: loginEmail, password: loginPassword });
    // 这里应该调用后端 API 进行登录
    post('/auth/login/',{
        email: loginEmail,
        password: loginPassword
      },false).then((res) => {
        const token = res.access_token
        Taro.setStorage({
        key: 'token',
        data: token.toString(),
        success: () => {
          console.log('Token 设置成功');
          Taro.navigateTo({
            url:'/pages/menu/index'
          })
          // 方便看情况 log 出 longToken 后期上线之前删除掉这个
          // console.log(token);
        },
      });
      });
  };

  const handleRegister = () => {
    // 注册逻辑
    console.log('注册', { email: registerEmail, password: registerPassword });
    // 这里应该调用后端 API 进行注册
    post('/auth/register/',{
        email: loginEmail,
        password: loginPassword
      },false).then((res) => {
        const token = res.access_token
        Taro.setStorage({
        key: 'token',
        data: token.toString(),
        success: () => {
          console.log('Token 设置成功');
          setLoginMode(true)
          // 方便看情况 log 出 longToken 后期上线之前删除掉这个
          // console.log(token);
        },
      });
      });
  };

  return (
    <View className='login-container'>
    <View className='form-box'>
      <View className='form-title'>登录 / 注册</View>
      {loginMode ? (
        <>
          <Input
            type="text"
            placeholder='邮箱'
            value={loginEmail}
            onInput={(e) => setLoginEmail(e.detail.value)}
          />
          <Input
            type="text"
            password={true}
            placeholder="密码"
            value={loginPassword}
            onInput={(e) => setLoginPassword(e.detail.value)}
            />
          <Button onClick={handleLogin}>登录</Button>
          <Button onClick={() => setLoginMode(false)}>注册</Button>
        </>
      ) : (
        <>
          <Input
            type="text"
            placeholder='邮箱'
            value={registerEmail}
            onInput={(e) => setRegisterEmail(e.detail.value)}
          />
          <Input
            type="text"
            password={true}
            placeholder='密码'
            value={registerPassword}
            onInput={(e) => setRegisterPassword(e.detail.value)}
          />
          <Button onClick={handleRegister}>注册</Button>
          <Button onClick={() => setLoginMode(true)}>返回登录</Button>
        </>
      )}
      </View>
    </View>
  );
};

export default Login;