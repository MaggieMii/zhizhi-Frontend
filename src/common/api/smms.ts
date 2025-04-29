
import Taro from '@tarojs/taro';
import {postLogin} from '@/fetch'



export const fetchToken = async () => {
  try {
    const response = await postLogin('/token',{
        username: '1350383261@qq.com',
        password: 'maggie1029'
    },false);
    const token = response.data.token;
    Taro.setStorageSync('token', token);
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};