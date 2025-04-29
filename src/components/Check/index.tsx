import React, { useEffect, useState } from 'react';
import { View, Input, Image, Text } from '@tarojs/components';
import { chooseImage } from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import mic from '../../assets/images/麦克风.png'
import copyicon from '../../assets/images/复制文件.png'
import Taro from '@tarojs/taro';
// import { fetchQiniuToken, fetchToQiniu } from '@/common/api/qiniu';
import { post, postLogin,getToken, postSession } from '@/fetch';
// import { fetchToken } from '@/common/api/smms';

import "./index.scss"

interface CheckProps {
  photoPath: string;
}

interface Message {
  id: string;
  text?: string;
  richText?: React.ReactNode; // 新增属性来存储富文本内容
  sender: 'user' | 'bot';
  type?: 'text' | 'image'; // 新增消息类型
  image?: string; // 新增图片URL
}

const Check: React.FC<CheckProps> = ({ photoPath }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handleMessageSend = () => {
    if (!inputValue.trim()) {
      return;
    }
    const newMessage: Message = {
      id: Math.random().toString(),
      text: inputValue,
      sender: 'user',
      type: 'text'
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputValue('');
    postSession('/chat/invoke/',{input:inputValue},'c7cbd395-948c-4991-a360-538c28f98165').then((res) => {
      const botMessage: Message = {
        id: Math.random().toString(),
        text: res.answer,
        sender: 'bot',
        type: 'text'
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    });
  };

  const handleShowOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const [imageUrl, setImageUrl] = useState('');

  const handleChooseImage = async () => {
    const token = 'oz3eMYWFFRkWYBbJe6PoK5IYeClFR0a7';
    
    chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: async (res) => {
        const filePath = res.tempFilePaths[0];
        // uploadImage(filePath, token).then((url) => {
          setImageUrl(filePath );
          postImage(filePath );
          const newMessage: Message = {
            id: Math.random().toString(),
            sender: 'user',
            type: 'image',
            image: filePath 
          };
          setMessages(prevMessages => [...prevMessages, newMessage]);
        // });
      },
      fail: (err) => {
        console.error(err);
      }
    });
  };

  // const uploadImage = (filePath: string, token: string) => {
  //   return new Promise<string>((resolve, reject) => {
  //     Taro.uploadFile({
  //       url: `https://sm.ms/api/v2/upload`,
  //       filePath,
  //       name: 'smfile',
  //       header: {
  //         'Authorization': `${token}`
  //       },
  //       success: (uploadRes) => {
  //         const data = JSON.parse(uploadRes.data);
  //         if (data.images) {
  //           resolve(data.images);
  //         } else {
  //           reject(new Error('上传失败'));
  //         }
  //       },
  //       fail: (uploadErr) => {
  //         reject(uploadErr);
  //       }
  //     });
  //   });
  // };

  

  
  const postImage = async (filePath: string) => {
    console.log(1);
  //   const data = {
  //     answer: [
  //         {
  //             input: "智慧岛1.小克家养了8只鸡和23只免子,这些动物一共有多少条腿?",
  //             user_answer: "23x4+8x2 (23+8)x2+23) =108(条) =108(年",
  //             response: {
  //                 answer: "小克家养了8只鸡和23只兔子。鸡每只有2条腿，兔子每只有4条腿。\n计算总腿数的方法是：\n(鸡的数量 × 每只鸡的腿数) + (兔子的数量 × 每只兔子的腿数)\n即：8只鸡 × 2条腿/只 + 23只兔子 × 4条腿/只\n= 16条腿 + 92条腿\n= 108条腿\n所以，这些动物一共有108条腿。",
  //                 correct: false,
  //                 wrong_place: 0,
  //                 wrong_length: 0
  //             }
  //         }
  //     ]
  // }
    Taro.uploadFile({
      url: `http://121.41.170.32:8000/ocr/upload-invoke/`,
      filePath,
      name: 'file',
      header: {
        'Authorization': `Bearer ${await getToken()}`
      },
      success: (uploadRes) => {
        const data = JSON.parse(uploadRes.data);
        if (data.answer && data.answer.length > 0) {
          const { input, user_answer, response } = data.answer[0];
          const newMessage: Message = {
            id: Math.random().toString(),
            sender: 'bot',
            type:'text'
          };

          const newUserMessage: Message = {
            id: Math.random().toString(),
            sender: 'user',
            type:'text'
          };

          if (response.correct) {
            newMessage.text = response.answer;
          } else {
            const wrongPart = user_answer.substring(response.wrong_place, response.wrong_place + response.wrong_length);
            // const placeholder = `{{wrongPart}}`;
            const parts = user_answer.split(wrongPart);
            const userAnswerWithHighlight = [
              parts[0],
              <Text key="highlight" style={{ backgroundColor: 'yellow' }}>{wrongPart}</Text>,
              parts.slice(1).join(wrongPart),
            ];
            console.log('wrongPart',wrongPart)

            newUserMessage.richText = (
              <View>
                <View className='title'>
                  作业内容
                </View>
                <View>
                  <View> {input}</View>
                </View>
              </View>
            )

            newMessage.richText = (
              <View>
                <View className='title'>
                  逻辑纠错
                </View>
                <View>
                  <View>你的答案: {userAnswerWithHighlight}</View>
                  <View>正确答案：{response.answer}</View>
                </View>
              </View>
            );
          }
          console.log(data.answer[0])
          setMessages(prevMessages => [...prevMessages, newUserMessage,newMessage]);
        }
      },
      fail: (uploadErr) => {
        console.error('上传失败:', uploadErr);
      }
    });
  };

  const handleOpenCamera = async () => {
    try {
      const res = await chooseImage({
        count: 1,
        sourceType: ['camera'],
        sizeType: ['original'],
      });
      if (res.tempFilePaths) {
        console.log('拍照成功，图片路径：', res.tempFilePaths[0]);
      }
    } catch (error) {
      console.error('拍照失败或用户取消：', error);
    }
  };

  const handleCopyMessage = (text) => {
    Taro.setClipboardData({
      data: text,
      success: function () {
        console.log('复制成功');
      }
    });
  };

  useEffect(()=>{
    if(photoPath){
      console.log('photoPath',photoPath);
      postImage(photoPath);
    }
    
  },[photoPath])

  const handleClick = ()=>{
    Taro.navigateTo({
      url:'/pages/history/index'
    })
  }


  return (
    <View className="chat-container">
      <AtIcon value='clock' size='30' color='black' className='clock' onClick={handleClick}></AtIcon>
      <View className="message-list">
      {messages.map((message) => (
          <View
            key={message.id}
            className={`message ${message.sender}`}
          >
            <View className={`bubble ${message.sender}`}>
            {message.type === 'text' ? (
                message.richText ? (
                  message.richText
                ) : (
                  <Text className="message-text">{message.text}</Text>
                )
              ) : (
                <Image className="message-image" src={message.image ?? ''} />
              )}
              <Image className='copyicon' src={copyicon} onClick={() => handleCopyMessage(message.text)} />
              <Image className='copyicon' src={copyicon} onClick={() => handleCopyMessage(message.text)} />
            </View>
          </View>
        ))}
      </View>
      <View className='bottom-items'>
        <View className="input-container">
          <Image src={mic} className='mic'></Image>
          <Input
            className="message-input"
            type="text"
            placeholder="告诉我你的问题吧"
            value={inputValue}
            onInput={(e) => setInputValue(e.detail.value)}
            onConfirm={handleMessageSend}
          />
          <AtIcon className='add-circle' value='add-circle' size='30' color='#000' onClick={handleShowOptions}></AtIcon>
        </View>
        {isOptionsVisible && (
          <View className="options-container">
            <View className="button-container" onClick={handleChooseImage}>
              <AtIcon value='image' size='30' color='#000'></AtIcon>
              <Text>相册</Text>
            </View>
            <View className="button-container" onClick={handleOpenCamera}>
              <AtIcon value='camera' size='30' color='#000'></AtIcon>
              <Text>拍摄</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Check;