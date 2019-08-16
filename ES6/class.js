 // es5 
 function js(name){
  this.name= name
 }
 js.prototype.getName = function(){
  console.log(this.name)
 }
 const child = new js('guoht')
 child.getName()

 class JS1 {
  constructor(name){
    this.name = name
  }
  getName(){
    console.log(this.name)
  }
  // static 方法只有在类本身能调用，实例不能继承
  static setName(newName){
    this.name = newName
    console.log(this.name)
  }
 }

 const js1 = new JS1('xxl')
 js1.getName() // xxl

 class JsChild extends JS1{
  constructor(name){
    super(name)
  }
 }
 const childjs = new JsChild('guozj')
 childjs.getName() // guozj

// var let const
// 
// var 声明变量，其作用域为该语句所在的函数内，且存在在变量提升现象，后面覆盖前面的
// 
// let 声明变量，其作用域为该语句所在代码块内，不存在变量提升，不能重复声明
// 
// const 声明常量，在后面出现的代码中不能再修改该常量的内存

const a = {
  content:'guoht 28'
}
console.log(a.content,'---')

a.content = 'xxl 29'
console.log(a.content,'======')

a = { // Assignment to constant variable
  content:'guozj 2' 
  // content1:'guozj 2' 也是不行的
}

console.log(a.content,'-----')