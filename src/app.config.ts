export default defineAppConfig({
  pages: [
    'pages/login/index',
    'pages/menu/index',
    'pages/guidance/index',
    
    'pages/setting/index',
    
    
    
    'pages/history/index',
    
    
    'pages/question/index',
    'pages/mine/index',
    'pages/main/index',
    'pages/check/index',
    'pages/camera/index',
    'pages/abstract/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  // permission: {
  //   'scope.camera': {
  //     desc: '您的应用需要使用您的相机',
  //   },
  // }
  // tabBar: {
  //   backgroundColor:"white",
  //   color:"#707070",
  //   selectedColor:"#191919", 
  //   list: [
  //     {
  //       pagePath: "pages/xiaozhi/index",
  //       text: "小智",
  //       iconPath: "./assets/images/信息_message.png",
  //       selectedIconPath: "./assets/images/信息_message.png"
  //     },
  //     {
  //       pagePath: "pages/main/index",
  //       text: "首页",
  //       iconPath: "./assets/images/IMG_2572@2x.png",
  //       selectedIconPath: "./assets/images/IMG_2572@2x.png"
  //     }
  //     ,
  //     // {
  //     //   pagePath: "pages/main/index",
  //     //   text: "我的",
  //     //   iconPath: "./assets/images/首页_home.png",
  //     //   selectedIconPath: "./assets/images/首页_home.png"
  //     // }
  //   ]
  // }
})
