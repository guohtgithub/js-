/*
1. 父组件将动态数据传递给子组件，父组件更改数据子组件接到的数据也会变化
注意：父组件和子组件并不是共用同一个数据，而是父组件将自己的数据复制了一份传给子组件，
父组件数据变化时都会重新传值dom也会重新渲染 但子组件不能去直接修改父组件的值

props 得到父组件传递过来的数据
$emit 触发父组件中的事件
$on 绑定子组件事件
2. 父组件将自己的方法传递给子组件，子组件调用方法传数据给父组件

3. 父组件给子组件绑定事件

4. ref通信

5. 使用event bus事件总线 

6.使用$root,$parent,$children

 */