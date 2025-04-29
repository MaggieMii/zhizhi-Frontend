import React, { useState } from 'react';
import { View,  Image, Camera } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';
import album from '../../assets/images/photoalbum.png'
import pencil from '../../assets/images/penci;.png'

const Index: React.FC = () => {
  // const [photoPath, setPhotoPath] = useState('');
  // const [showBg, setShowBg] = useState(true);
  const [devicePosition, setDevicePosition] = useState<'front' | 'back'>('back');

  const takePhoto = async () => {
    const ctx = Taro.createCameraContext();
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        // setPhotoPath(res.tempImagePath);
        redirectToCheckPage(res.tempImagePath);
      },
      fail: (err) => {
        Taro.showToast({
          title: '拍照失败',
          icon: 'none'
        });
        console.log(err);
      }
    });
  };



  const openAlbum = async () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: (res) => {
        // setPhotoPath(res.tempFilePaths[0]);
        redirectToCheckPage(res.tempFilePaths[0]);
      },
      fail: (err) => {
        Taro.showToast({
          title: '选择图片失败',
          icon: 'none'
        });
        console.log(err);
      }
    });
    
  };

  const redirectToCheckPage = (path: string) => {
    Taro.navigateTo({
      url: `/pages/check/index?photoPath=${encodeURIComponent(path)}`
    });
  };

  return (
    <View className='index'>
      <View className='camera-container'>
        <Camera
          devicePosition={devicePosition}
          frameSize='medium'
          flash='off'
          className='camera'
        />
      </View>
      
      <View className='camera-button'>
        {/* {<View onClick={openAlbum}>从相册选择</View>} */}
        <Image src={album} onClick={openAlbum}></Image>
        <View onClick={takePhoto}></View>
        <Image src={pencil}></Image>
        {/* <View onClick={() => setDevicePosition(devicePosition === 'front' ? 'back' : 'front')}>切换前后置</View> */}
      </View>
      {/* {showBg ? <View className='bg'></View> : <Image className='camera-path' src={photoPath} />} */}
    </View>
  );
};

export default Index;