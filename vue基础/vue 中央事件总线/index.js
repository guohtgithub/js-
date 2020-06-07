/*
一般是兄弟组件之间的通信
1、创建Bus.js
import Vue from 'vue'
export default new Vue()

2、在两个要通信的组件中引入Bus.js

import Bus from '../ XXX /Bus.js'

3、传递数据的组件中使用 $.emit(fn,data) 发送事件名称和传递的数据
Bus.$emit('fn',data)

4、接受数据的组件中使用 $.on(fn,data=>{
  console.log(data)
}),监听事件和接受数据
Bus.$on(fn,data=>{
  console.log(data)
})

5、在接受组件中清除事件总线eventBus,
在Vue的beforeDestroy/destroyed中$off方法清除eventBus
beforeDestroy(){
  Bus.$off(fn)
}

 */