import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { AtNavBar,AtSearchBar } from 'taro-ui';
import { get } from '@/fetch';
import './index.scss'

interface ResponseItem {
  id: number;
  response: string;
  image_url: string;
  wrong_place: string;
}



const Index = () => {
  const [value,setValue] = useState<string>('');
  const handleChange = (value:string) =>{
    setValue(value)
  }
  const [responses,setResponses] = useState<ResponseItem[]>([])

  useEffect(()=>{
    get('/ocr/history/').then((res)=>{
      setResponses(res)
      console.log(res)
    })
  },[])


  const handleClick = () =>{
    Taro.navigateBack();
  }
  
  return (
    <View className='history'>
      <AtNavBar
        onClickLeftIcon={handleClick}
        color='#000'
        leftIconType={'chevron-left'}
        className='nav'
      >
        <AtSearchBar
          actionName='搜一下'
          value={value}
          onChange={handleChange}
          onActionClick={handleClick}
        />
      </AtNavBar>
      {responses.map((item) => (
        <View className='view' key={item.id}>
          <Image src={`http://121.41.170.32:8000${item.image_url}`} mode="aspectFit" />
        </View>
      ))}
    </View>
  );
};

export default Index;