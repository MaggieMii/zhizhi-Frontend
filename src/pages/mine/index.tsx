import { View, Image, Input, Button  } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'
import Taro from '@tarojs/taro'
import { AtIcon,AtModal,AtModalContent,AtModalAction,AtInput } from 'taro-ui'
import icon1 from '../../assets/images/icon1.png'
import icon2 from '../../assets/images/icon2.png'
import icon3 from '../../assets/images/icon3.png'
import icon4 from '../../assets/images/icon4.png'
import img1 from '../../assets/images/img1.png'
import img2 from '../../assets/images/img2.png'
import font from '../../assets/images/组 5.png'
import {get,getToken} from '@/fetch'

interface User {
  id: number;
  email: string;
  nickname?: string | null; // nickname可以是string或者null
  incorrect_num: number;
  avatar_data?: string | null; // avatar_data可以是string或者null
}

export default function Index() {

  const [userInfo, setUserInfo] = useState<User>({
    id: 0,
    email: "1234567@qq.com",
    nickname: null,
    incorrect_num: 0,
    avatar_data: null
  })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('')

   // 弹窗提交事件
   const handleModalSubmit = async () => {
    // 在这里实现上传逻辑
    // 上传成功后，更新userInfo状态
    // ...
    Taro.uploadFile({
      url: 'http://121.41.170.32:8000/submit-info/', // 你的服务器上传接口
      filePath: userInfo.avatar_data || '', // 要上传文件资源的路径
      name: 'avatar', // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
      header: {
        'Authorization': `Bearer ${await getToken()}`
      },
      formData: {
        'nickname': nickname, // 这里是你的字符串参数
        // 其他需要的表单数据...
      },
      success (uploadRes){
        const data = uploadRes.data;
        // 处理上传成功的数据
        setIsModalOpen(false);
      },
      fail (uploadErr){
        // 处理上传失败的情况
      }
    })
    
  };

  // 弹窗关闭事件
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useLoad(() => {
    console.log('Page loaded.');
    // 假设get('/get-info')返回的是上面的userInfo对象
    // 这里直接使用useState设置的userInfo作为示例
    if(userInfo)
    if (!userInfo.nickname || !userInfo.avatar_data) {
      // 如果没有昵称或头像，弹出上传窗口
      setIsModalOpen(true);
    }
  });

  useLoad(() => {
    console.log('Page loaded.')
    get('/get-info').then((res)=>{
      console.log(res);
      // const {avatar_data} = res;
      // const newUserInfo = {...res,avatar_data:'http://121.41.170.32:8000'+avatar_data}
      // setUserInfo(newUserInfo);
      setUserInfo(res)
    })
  })

  const handleNicknameChange = (value:string) => {
    console.log(value)
    setNickname(value);
  };

  

  return (
    <View className='mine'>
      {!userInfo.nickname || !userInfo.avatar_data ? (
        <AtModal
          isOpened={isModalOpen}
          onClose={handleModalClose}
          closeOnClickOverlay={false}
          // title="完善资料"
        >
          <AtModalContent>
            <AtInput
              name='value'
              placeholder="请输入昵称"
              value={nickname}
              onChange={handleNicknameChange}
              title='昵称'
              type='text'
            />
            <Button
              onClick={() => {
                // 调用微信小程序的chooseImage来选择图片
                Taro.chooseImage({
                  count: 1,
                  sizeType: ['compressed'],
                  sourceType: ['album', 'camera'],
                  success: (res) => {
                    // 处理图片，例如上传到服务器
                    // 假设上传后返回的URL存储在avatarUrl中
                    const avatarUrl = res.tempFilePaths[0];
                    setUserInfo({ ...userInfo, avatar_data: avatarUrl });
                  }
                });
              }}
            >
              上传头像
            </Button>
          </AtModalContent>
          <AtModalAction> <Button>取消</Button> <Button onClick={handleModalSubmit}>确定</Button> </AtModalAction>
        </AtModal>
      ) :(
        <>
      <View className='name'>{userInfo.nickname}</View>
      <View className='avatar'>
        <Image src={`http://121.41.170.32:8000${userInfo.avatar_data}`} className='avatarImg'></Image>
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
      </View></> )}
    </View>
  )
}
