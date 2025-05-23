// import React, { useEffect, useState } from 'react';
// import { View, Input, Image, Text } from '@tarojs/components';
// import { chooseImage } from '@tarojs/taro';
// import { AtMessage, AtIcon } from 'taro-ui';
// import mic from '../../assets/images/麦克风.png'
// import copyicon from '../../assets/images/复制文件.png'
// import Taro from '@tarojs/taro';
// // import { fetchQiniuToken, fetchToQiniu } from '@/common/api/qiniu';
// import { post, postLogin, postSession } from '@/fetch';
// import { fetchToken } from '@/common/api/smms';

// import "../Chat/index.scss"

// interface Message {
//   id: string;
//   text?: string;
//   sender: 'user' | 'bot';
//   type?: 'text' | 'image'; // 新增消息类型
//   image?: string; // 新增图片URL
// }

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState<string>('');

//   const [isOptionsVisible, setIsOptionsVisible] = useState(false);

//   const handleMessageSend = () => {
//     if (!inputValue.trim()) {
//       return;
//     }
//     const newMessage: Message = {
//       id: Math.random().toString(),
//       text: inputValue,
//       sender: 'user',
//       type: 'text'
//     };
//     setMessages(prevMessages => [...prevMessages, newMessage]);
//     setInputValue('');
//     postSession('/chat/invoke/',{input:inputValue},'c7cbd395-948c-4991-a360-538c28f98165').then((res) => {
//       const botMessage: Message = {
//         id: Math.random().toString(),
//         text: res.answer,
//         sender: 'bot',
//         type: 'text'
//       };
//       setMessages(prevMessages => [...prevMessages, botMessage]);
//     });
//   };

//   const handleShowOptions = () => {
//     setIsOptionsVisible(!isOptionsVisible);
//   };

//   const [imageUrl, setImageUrl] = useState('');

//   const handleChooseImage = async () => {
//     const token = 'oz3eMYWFFRkWYBbJe6PoK5IYeClFR0a7';
    
//     chooseImage({
//       count: 1,
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album'],
//       success: async (res) => {
//         const filePath = res.tempFilePaths[0];
//         uploadImage(filePath, token).then((url) => {
//           setImageUrl(url);
//           postImage(url);
//           const newMessage: Message = {
//             id: Math.random().toString(),
//             sender: 'user',
//             type: 'image',
//             image: url
//           };
//           setMessages(prevMessages => [...prevMessages, newMessage]);
//         });
//       },
//       fail: (err) => {
//         console.error(err);
//       }
//     });
//   };

//   const uploadImage = (filePath: string, token: string) => {
//     return new Promise<string>((resolve, reject) => {
//       Taro.uploadFile({
//         url: `https://sm.ms/api/v2/upload`,
//         filePath,
//         name: 'smfile',
//         header: {
//           'Authorization': `${token}`
//         },
//         success: (uploadRes) => {
//           const data = JSON.parse(uploadRes.data);
//           if (data.images) {
//             resolve(data.images);
//           } else {
//             reject(new Error('上传失败'));
//           }
//         },
//         fail: (uploadErr) => {
//           reject(uploadErr);
//         }
//       });
//     });
//   };

//   const postImage = (url) =>{
//     post('/ocr/invoke',{image:url}).then((res) => {
//       const botMessage: Message = {
//         id: Math.random().toString(),
//         text: res.answer,
//         sender: 'bot',
//         type: 'text'
//       };
//       setMessages(prevMessages => [...prevMessages, botMessage]);
//     });
//   }

//   const handleOpenCamera = async () => {
//     try {
//       const res = await chooseImage({
//         count: 1,
//         sourceType: ['camera'],
//         sizeType: ['original'],
//       });
//       if (res.tempFilePaths) {
//         console.log('拍照成功，图片路径：', res.tempFilePaths[0]);
//       }
//     } catch (error) {
//       console.error('拍照失败或用户取消：', error);
//     }
//   };

//   const handleCopyMessage = (text) => {
//     Taro.setClipboardData({
//       data: text,
//       success: function () {
//         console.log('复制成功');
//       }
//     });
//   };


//   return (
//     <View className="chat-container">
//       <AtMessage />
//       <View className="message-list">
//         {messages.map((message) => (
//           <View
//             key={message.id}
//             className={`message ${message.sender}`}
//           >
//             <View className={`bubble ${message.sender}`}>
//               {message.type === 'text' ? (
//                 <Text className="message-text">{message.text}</Text>
//               ) : (
//                 <Image className="message-image" src={message.image??''} />
//               )}
//               <Image className='copyicon' src={copyicon} onClick={() => handleCopyMessage(message.text)} />
//             </View>
//           </View>
//         ))}
//       </View>
//       <View className='bottom-items'>
//         <View className="input-container">
//           <Image src={mic} className='mic'></Image>
//           <Input
//             className="message-input"
//             type="text"
//             placeholder="告诉我你的问题吧"
//             value={inputValue}
//             onInput={(e) => setInputValue(e.detail.value)}
//             onConfirm={handleMessageSend}
//           />
//           <AtIcon className='add-circle' value='add-circle' size='30' color='#000' onClick={handleShowOptions}></AtIcon>
//         </View>
//         {isOptionsVisible && (
//           <View className="options-container">
//             <View className="button-container" onClick={handleChooseImage}>
//               <AtIcon value='image' size='30' color='#000'></AtIcon>
//               <Text>相册</Text>
//             </View>
//             <View className="button-container" onClick={handleOpenCamera}>
//               <AtIcon value='camera' size='30' color='#000'></AtIcon>
//               <Text>拍摄</Text>
//             </View>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default Chat;

import React, { useEffect, useState } from 'react';
import { View, Input, Image, Text } from '@tarojs/components';
import { chooseImage } from '@tarojs/taro';
import { AtMessage, AtIcon } from 'taro-ui';
import mic from '../../assets/images/麦克风.png';
import copyicon from '../../assets/images/复制文件.png';
import Taro from '@tarojs/taro';
import "../Chat/index.scss";

interface Message {
  id: string;
  text?: string;
  sender: 'user' | 'bot';
  type?: 'text' | 'image'; // 新增消息类型
  image?: string; // 新增图片URL
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0); // 用于跟踪当前返回的回答索引

  // 示例中的问题数组
  const exampleResponses = [
    "让我们先来看看小华最初有多少块巧克力呢？",
    "第一天小华吃了总数的1/4，我们来算算他具体吃了多少块吧？",
    "第一天吃完后，还剩下多少块巧克力呢？",
    "第二天小华吃了剩下的1/3，这次他吃了多少块呢？",
    "第二天吃完后，我们来计算一下剩余的巧克力数量吧？",
    "第三天小华吃了剩下的1/2，这次他吃了多少块巧克力呢？",
    "第三天吃完后，让我们看看最后还剩下多少块吧？",
    '经过逐步计算，我们得出最终答案：小华最后还剩下6块巧克力。想想看，如果他想让剩下的巧克力变成12块，最初该准备多少块呢？'
];

  const handleMessageSend = () => {
    if (!inputValue.trim()) {
      return;
    }
  
    // 添加用户消息
    const newMessage: Message = {
      id: Math.random().toString(),
      text: inputValue,
      sender: 'user',
      type: 'text'
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputValue('');
  
    // 3 秒后模拟返回一条回答
    setTimeout(() => {
      if (responseIndex < exampleResponses.length) {
        const botMessage: Message = {
          id: Math.random().toString(),
          text: exampleResponses[responseIndex],
          sender: 'bot',
          type: 'text'
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        setResponseIndex(responseIndex + 1); // 更新索引
      }
    }, 3000); // 延迟 3 秒
  };

  const handleShowOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const [imageUrl, setImageUrl] = useState('');

  const handleChooseImage = async () => {
    chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: async (res) => {
        const filePath = res.tempFilePaths[0];
        setImageUrl(filePath);
        const newMessage: Message = {
          id: Math.random().toString(),
          sender: 'user',
          type: 'image',
          image: filePath
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
      },
      fail: (err) => {
        console.error(err);
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

  return (
    <View className="chat-container">
      <AtMessage />
      <View className="message-list">
        {messages.map((message) => (
          <View
            key={message.id}
            className={`message ${message.sender}`}
          >
            <View className={`bubble ${message.sender}`}>
              {message.type === 'text' ? (
                <Text className="message-text">{message.text}</Text>
              ) : (
                <Image className="message-image" src={message.image ?? ''} />
              )}
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

export default Chat;