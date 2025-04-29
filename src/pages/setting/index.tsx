// import React from 'react'
import { AtList, AtListItem } from "taro-ui"
import'./index.scss'
import Taro from "@tarojs/taro"

export default function index() {
  return (
    <AtList className="setList">
        <AtListItem title='注销' note='注销后无法恢复，请谨慎操作' extraText='注销' arrow='right'/>
        <AtListItem title='隐私' arrow='right' extraText='设置'/>
        <AtListItem title='隐私政策摘要'  arrow='right' onClick={()=>Taro.navigateTo({url:'/pages/abstract/index'})}/>
        <AtListItem title='联系客服'  arrow='right'/>
        <AtListItem title='关于我们'  arrow='right'/>
        <AtListItem title='投诉与建议'  arrow='right'/>
        <AtListItem title='条款与规则'  arrow='right'/>
    </AtList>
  )
}
