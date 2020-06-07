/*
1.
 */

function sayHi(){
  console.log(name) // undefined
  console.log(age) // ReferenceError
  var name = 'guoht'
  let age = 28
}

sayHi()

// 变量的赋值分为三部分
// 创建变量，在内存中开辟空间
// 初始化变量，将变量初始化为undefined
// 真正赋值

// 关于 let var 和 function
// let 的创建过程被提升了，但是初始化没有提升
// var 的创建和初始化都被提升了
// function 的创建、初始化和赋值都被提升了

/*
2.
 */
for(var i=0;i<3;i++){
  setTimeout(() => console.log(i),1)
}
// 3 3 3

for(let i=0;i<3;i++){
  setTimeout(() => console.log(i),1)
}
// 0,1,2

/*
3.
 */
const shape = {
  radius:10,
  diameter(){
    return this.radius *2
  },
  perimeter:()=>2*Math.PI * this.radius
}

shape.diameter() // 20
shape.perimeter() // NAN this --> window / golbals

/*
4.
 */
+true // 1
!'guoht' // false

/*
5.
 */
const bird = {
  size:'small'
}
const mouse = {
  name:'Mickey',
  small:true
}

mouse[bird.size] // true
mouse[bird['size']] // true

/*
6.
 */
let c = {greeting:'Hey!'}
let d 
d = c 
c.greeting = 'Hello'
console.log(d.greeting) // 'Hello'

/*
7.
 */
let a = 3;
let b = new Number(3)
let c = 3
console.log(a == b) // true
console.log(a === b) // false
console.log(b === c) // false

/*
8.
 */
class Chameleon{
  static colorChange(newColor){
    this.newColor = newColor
  }

  constructor({newColor='green'} = {}){
    this.newColor = newColor
  }
}
const freddie = new Chameleon({newColor:'purple'})
freddie.colorChange('orange') // TypeError  colorChange 静态方法 不能传递给任何子级

/*
9.
 */
let greeting 
greeting = {}
console.log(greeting) // {}

/*
10
 */
function bark(){
  console.log('woof!')
}
bark.animal = 'dog'

// 函数也是对象！
// 函数是一种特殊类型的对象，您自己编写的代码并不是实际的函数，
// 该函数是具有属性的对象，此对象是可调用的

/*
11.
 */
function Person(firstName,lastName){
  this.firstName = firstName
  this.lastName = lastName
}
// 单个对象调用
const member = new Person('guo','ht')
member.getFullName = function(){return this.firstName + this.lastName}
console.log(member.getFullName()) // typeError

// 所有对象调用
Person.prototype.getFullName = function(){
  return `${this.firstName} ${this.lastName}`
}

/*
12
 */
const guoht = new Person('guo','ht')
const xxl = Person('xiong','xl')
console.log(guoht) // {firstName:'guo',lastName:'ht'}
console.log(xxl) // undefined

// 使用 new 时，它指向的是我们创建的新空对象
// 没有使用new 它指向的时全局对象

/*
13. 事件传播的三个阶段
捕捉 --> 目标 --> 冒泡

除基础对象外,所有对象都有原型
注：基础对象指原型链终点的对象。基础对象的原型是null。

 */

/*
14.
 */
function sum(a,b){
  return a+b
}
sum(1,'2') // 12

/*
15.
 */
let number = 0
console.log(number++) // 0
console.log(++number) // 2
console.log(number) // 2


/*
16.
 */
function getPersonInfo(one,two,three){
  console.log(one)
  console.log(two)
  console.log(three)
}
const person = 'guoht'
const age = 28
getPersonInfo`${person} is ${age} years old`;
//如果使用标记的模板字符串，则第一个参数的值始终是字符串值的数组。 
//其余参数获取传递到模板字符串中的表达式的值！

/*
17.
 */
function checkAge(data){
  if(data == {a:1}){
    console.log(1)
  }else if(data === {a:1}){
    console.log(2)
  }else{
    console.log(3)
  }
}
checkAge({a:1}) // 3

/*
18.
 */
function getAge(...args){
  console.log(typeof args)
}
getAge(21) // object

/*
19.
 */
function getAge1(){
  'use strict' //严谨写法
  age = 21
  console.log(age)
}
getAge1() // ReferenceError

/*
20.
 */
const sums = eval('10*10+5') // 105

/*
21.
sessionStorage  临时缓存，页面关闭，缓存清除
localStorage 不主动清除，一直存在，或localStorage.clear()
 */

/*
22
 */
var num = 9
var num = 10
console.log(num) // 10

// 不能使用let const 来实现这一点，因为他们是块作用域

/*
23
 */
const obj = {1:'b',2:'2',3:'3'}
const set = new Set([1,2,3,4])
obj.hasOwnProperty('1') // true
obj.hasOwnProperty(1) // true
set.has('1') // false
set.has(1) // true 

/*
24
 */
const obj1 = {a:'1',b:2,a:4}
console.log(obj1) // {a:4,b:2}

/*
25.JavaScript全局执行上下文为你创建了两个东西:全局对象和this关键字.
*/

/*
26.
 */
for(let i=1;i<5;i++){
  if(i === 3) continue
  console.log(i) // 1,2,4
}

/*
27
 */
String.prototype.giveLydiaPizza = () => {
  return 'just give lydia pizza aleady!'
}
const name = 'lydia'
name.giveLydiaPizza() // just give lydia pizza aleady!

/*
28.
 */
const a = {}
const b = {key:'b'}
const c = {key:'c'}
a[b] = 123 // a['Object object']
a[c] = 234 // a['Object object']
console.log(a[b]) // a['Object object'] = 234 

/*
29
 */
const foo = () => console.log('1')
const bar = () => setTimeout(() => console.log('2'))
const baz = () => console.log('3')

bar()
foo()
baz()

// 1,3,2

/*
30
 */
<div onclick='console.log("div 1")'>
  <div onclick='console.log("div 2")'>
    <button onclick='console.log("button")'>
      click!
    </button>
  </div>
</div>

event.target --> button

/*
31
 */
<div onclick='console.log("div")'>
  <p onclick='console.log("p")'>
    click me
  </p>
</div>
click --> p div

/*
32
 */
const person = {name:'guoht'}
function sayHi(age){
  console.log(`${this.name} is ${age}`)
}
sayHi.call(person,28) // guoht is 28
sayHi.bind(person,21) // function

/*
33
 */
functio sayHi(){
  return (()=>0)()
}
typeof sayHi() // number

// 7种内置类
// null undefined boolean number string object symbol
// function 不是一个类型，因为函数是对象，他的类型是object

/*
34
 */
0 // false
new Number(0) // true
('') // false
(' ') // true
new Boolean(false) // true
undefined // false

// JavaScript 中只有6个假值
// undefined null NaN 0 ''(empty string) false

/*
35
 */
console.log(typeof typeof 1) // string

/*
36
 */
const numbers = [1,2,3]
numbers[11] = 10
console.log(numbers) // [1,2,3,7*empty,11]

/*
37
 */
(() => {
  let x,y
  try{
    throw new Error()
  }catch(x){
    (x=1),(y=2)
    console.log(x) // 1
  }
  console.log(x) // undefined
  console.log(y) // 2
})()

/*
38.JavaScript中的所有内容都是原始或对象
原始类型是：boolean null undefined bigint number string symbol
 */

/*
39
 */
[[1,2],[2,3]].reduce((acc,cur)=>{
  return acc.concat(cur)
},[1,0])
// [1,0,1,2,2,3]


var  arr = [1, 2, 3, 4];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
}，0) //注意这里设置了初始值
console.log(arr, sum);

// 0 1 0
// 1 2 1
// 3 3 2
// 6 4 3
// [1,2,3,4] 10

/*
40
 */
!!null // false
!!'' // false
!!1 // true

/*
41.setInterval f方法的返回值是一个唯一的id
 */

/*
42. 
 */
[...'guot']
// ['g','u','o','t']