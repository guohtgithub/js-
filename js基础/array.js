// Array 对象

var cars = ['Saab','Volvo','BMW']

// Array 方法

// 1. concat() 连接两个或更多的数组，并返回结果
var hege = ['guoht','xxl','guozj']
var stale = ['Email','Phone']
var kai = ['Robin']

var children = hege.concat(stale,kai)
console.log(children)

// 2. copyWithin(target,start,end) 从数组的指定位置拷贝元素到数组的另一个指定位置
// target 必选 复制到指定目录索引位置
// start 可选 元素复制的起始位置
// end 可选 停止复制的索引位置（默认 array.length）。如果为负数，表示倒数
var fruits = ['Banana','Orange','Apple','Mango']
fruits.copyWithin(0,2)
console.log(fruits)

//3. entries() 返回数组的可迭代对象
let entries = fruits.entries()
console.log(fruits)

// entries.next().value 调用

//4. every() 检查数组元素的每一个元素是否符合条件
// 注意： every() 不会对空数组进行检测。
// 注意： every() 不会改变原始数组。
var age = [12,23,14,16]
let flag = age.every(item=>{return item > 18})
console.log(flag)

//5. fill(target,start,end) 使用一个固定值来填充数组
// target 必选 复制到指定目录索引位置
// start 可选 元素复制的起始位置
// end 可选 停止复制的索引位置（默认 array.length)
let fillArray = fruits.fill('guoht')
console.log(fillArray)
console.log(fruits) // 改变原数组

//6. filter() 检测数值元素，并返回符合条件所有元素的数组
// 注意： filter() 不会对空数组进行检测。
// 注意： filter() 不会改变原始数组。
let filterArray = age.filter(item=>item>15)
console.log(filterArray)

//7. find() 返回符合传入测试（函数）条件的数组元素 顺序 第一个
// 注意： find() 不会对空数组进行检测。
// 注意： find() 不会改变原始数组。
let findArray = age.find(item =>item > 12)
console.log(findArray)

//8. findIndex() 返回符合传入测试（函数）条件的数组元素索引 顺序 第一个
// 注意： findIndex() 不会对空数组进行检测。
// 注意： findIndex() 不会改变原始数组。
let findIndexArray = age.findIndex(item => item>15)
console.log(findIndexArray)

//9. forEach() 每个数组元素都执行一次回调函数
var number = [4,5,6,7]
number.forEach(item =>  item*2)
console.log(number)

//10. from() 通过给定的对象中创建一个数组。
var myArr = Array.from('guoh')
console.log(myArr)
var setObj = new Set(['a','b','c','d'])
var objArr = Array.from(setObj)
console.log(objArr[1] == 'b')
var arr = Array.from([1,2,3],x=>x*10)
console.log(arr)

//11. includes(target,index) 判断数组是否有指定的值
//target 必选 查找元素
//index 可选 起始位置查找，负数array.length + index 处开始查找
let site = ['ruuoob','google','taobao']
console.log(site.includes('taobao'))
console.log(site.includes('guoht'))

// 12. indexOf() 搜索数组中的元素，并返回它所在的位置。
 var index = site.indexOf('taobao')
 console.log(index) // 2

// 13 Array.isArray() 判断对象是否为数组。
 let isArray = Array.isArray(site)
 console.log(isArray) // true

 // 14 join() 把数组的所有元素放入一个字符串。
var energy = fruits.join('-')
console.log(energy)

// 15 keys() 返回数组的可迭代对象，包含原始数组的键(key)。
var arrFruits = ['Banana','Orange','Apple','Mango']
console.log(arrFruits.keys())

// 16 lastIndexOf()   搜索数组中的元素，并返回它最后出现的位置。
console.log(arrFruits.lastIndexOf('Apple')) // 2

// 17 map() 通过指定函数处理数组的每个元素，并返回处理后的数组。
var num = [4,9,16,25]
let numSqrt = num.map(item => {
  return Math.sqrt(item)
})
console.log(numSqrt,num)

// 18 pop()删除数组的最后一个元素并返回删除的元素。
// 注意：此方法改变数组的长度！
console.log(num.pop(),num)

// 19 push() 向数组的末尾添加一个或更多元素，并返回新的长度。
// 注意： 新元素将添加在数组的末尾。
// 注意： 此方法改变数组的长度。
console.log(num.push(25),num)

// 20 reduce() 将数组元素计算为一个值（从左到右）
let sum = num.reduce((total=0,item) => {
  // let total += item
  return total+item
})
console.log(sum,'reduce')

//21 reduceRight() 将数组元素计算为一个值（从右到左）
let sunRight = num.reduceRight((total=0,item) =>{
  return total + item
})
console.log(sunRight,'reduceRight')

// 22 reverse() 反转数组的元素顺序
console.log(num.reverse(),'reverse')

//23 shift() 删除并返回数组的第一个元素。
//注意： 此方法改变数组的长度
console.log(arrFruits.shift(),arrFruits)

// 24 slice() 选取数组的的一部分，并返回一个新数组
// 注意： slice() 方法不会改变原始数组。
console.log(arrFruits.slice(0,1),arrFruits)

//25 some() 检测数组元素中是否有元素符合指定条件。
let someFlag = numSqrt.some(item =>{
  return item >4
})
console.log(someFlag)

// 26 sort() 对数组的元素进行排序。
console.log(arrFruits.sort())

let points = [40,100,2,5,10,25]
points.sort((a,b) => {return a-b}) // 升序
console.log(points)
points.sort((a,b) => {return b-a}) // 降序
console.log(points)

// 27 splice() 从数组中添加或删除元素。
// 注意：这种方法会改变原始数组。
points.splice(2,0,88,8)
console.log(points)
let spliceArr = points.splice(2,1)
console.log(points,'splice',spliceArr)

// 28 toString() 把数组转换为字符串，并返回结果。
// 注意： 返回结果之间用逗号分隔。
let stringArr = points.toString()
console.log(stringArr,points,'toString')

// 29 unshift() 向数组的开头添加一个或更多元素，并返回新的长度。
points.unshift(30,3)
console.log(points,'unshift')

// 30 valueOf()   返回数组对象的原始值。
console.log(points.valueOf())

//数组判断是否是数组

// Object.prototype.toString.call() instanceof Array.isArray() constructor
/* 
  1、Object.prototype.toString.call()
 每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，
 会返回 [Object type]，其中 type 为对象的类型。
 常用于判断浏览器内置对象时。
*/
Object.prototype.toString.call([]) // [object Array]
Object.prototype.toString.call('string') // [object String]
Object.prototype.toString.call(Symbol(1)) // [object Symbol]
Object.prototype.toString.call(1) // [object Number]
Object.prototype.toString.call(null) // [object Null]
Object.prototype.toString.call(undefined) // [object Undefined]
Object.prototype.toString.call(function(){}) // [object Function]
Object.prototype.toString.call({}) // [object Object]

// 获取数据类型
function getDataType(data){
  const type = Object.prototype.toString.call(data)
  return /^\[object (.*)\]$/.exec(str)[1]
}

/*
2、instanceof 
instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype
用来检测引用类型是Array/Function/Object，无法检测基本类型
 */

console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true    
console.log(undefined instanceof Undefined);// 报错
console.log(null instanceof Null);//报错

/*
3.Array.isArray()
用来判断对象是否为数组
当检测Array实例时，Array.isArray 优于 instanceof ，
因为 Array.isArray 可以检测出 iframe
 */
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true
Object.prototype.toString.call(arr); // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false

// Array.isArray() 不存在时
if(!Array.isArray){
  Array.isArray = function(arg){
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
}

// constuctor 
console.log((2).constructor === Number); //true
console.log((true).constructor === Boolean); //true
console.log(('str').constructor === String); //true
console.log(([]).constructor === Array); //true
console.log((function() {}).constructor === Function); //true
console.log(({}).constructor === Object); //true

// 但是如果创建的对象更改了原型，是无法检测到最初的类型
function Fn(){}; //原来是方法
Fn.prototype=new Array(); //改变原型为数组
var f=new Fn();
console.log(f.constructor===Fn);    // false
console.log(f.constructor===Array); // true

// typeof 
// 用来检测： undefined、string、number、boolean、symbol、object、function

let a1 =  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
let a = ['A','B','C','D']
let a2 = ['A', 'B', 'C', 'D'].map((item) => {
  return item + 3
})

let a3 = [...a1, ...a2].sort().map((item) => {
  if(item.includes('3')){
    return item.split('')[0]
  }
  return item
})

// codePointAt() startsWith()

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

// random number function
function gerRandomNum(min,max){
  return Math.floor(Math.random()*(max-min+1)) +min
}
let randomArr = []
for(let i=0;i<20;i++){
  randomArr.push(Math.floor(Math.random()*100))
}
randomArr.sort((a,b) => a-b)
randomArr = [...(new Set([...randomArr]))]
let subArr = []
let map = {}
randomArr.forEach(item=>{
  let key = Math.floor(item/10)
  if(!map[key]){
    map[key] = []
  }
  map[key].push(item)
})
for(let key in map){
  subArr.push(map[key])
}
console.log(subArr)

// arr 抽奖
// 1、抽中的在数组中去除
var arr = []
for(let i=0;i<1000;i++){
  arr.push(i+1)
}
var result = [];
var randomNum = 100;
for(var i = 0;i < randomNum;i++) {
   var luckyDog = Math.floor(Math.random() * (arr.length - i));
   result.push(arr[luckyDog]);
   arr[luckyDog] = arr[arr.length - i - 1];
}

// 2、new Set()
function randomWithSet(max,acount){
  let set = new Set()
  while(true){
    if(set.size > max -1) break;
    let temp = parseInt(Math.random()*acount,10)
    if(set.has(temp)) continue
    set.add(temp)
  }
  return Array.from(set)
}

// 获取一个大数组
let origninArr = Array.from({length:len},(v,i) => i)

// 递归
function addNum(resultSet,origninArr){
  let len = origninArr.length
  let luckyDog = Math.floor(Math.random()*(len-1))
  if(!resultSet.has(origninArr[luckyDog]))
    resultSet.add(origninArr[luckyDog])
  else 
    addNum()

  return Array.from(resultSet)
}

// 3、洗牌法
function shuffle(arr,size){
  let result = []
  let len = arr.length-1
  for(let i=0;i<size;i++){
    const randomIndex = Math.floor(Math.random * (len+1-i))
    const item = arr[randomIndex]
    result.push(item)
    arr[randomIndex] = arr[len -i]
    arr[len -i] = item
  }
  return result
}

var arrRandom = []
var randomNums = 2+ Math.floor(Math.random() * 30)
var setArr = function(num){
  if(arrRandom.length === 5) return console.log(arrRandom)
  if(arr.every(v => v !== num)) arrRandom.push(num)
  setArr(Math.floor(Math.random()*31 + 2))
}

setArr(randomNums)

function insertArr(arr,i=0,min = 2,max=32){
  const num = Math.max(min,Math.ceil(Math.random() * max))
  if(!arr[arr.length -1]){
    if(!arr.includes(num)){
      arr[i++] = num
    }
    return insertArr(arr,i)
  }
  return arr
}

const arrRan = new Array(5)
const resultArr = insertArr(arrRan)
console.log(resultArr)

var arr = new Array(5)
function insertRandom(n){
  if(n<0) return 
  let tmp = Math.floor(Math.random() * 31 +2)
  if(arr.indexOf(tmp) !== -1) return insertRandom(n)
  arr[n] = tmp
  return insertRandom(n - 1)
}
insertRandom(arr.length - 1)

function foo(arr){
  arr = arr || []
  if(arr.length >= 5) return arr
  var n = 2 + Math.floor(Math.random() * 31)
  if(arr.indexOf(n) == -1) arr.push(n)

  return foo(arr)
}

function returnRandomArr(max, min, length, arr = []) {
  arr.push(Math.floor(Math.random() * (max - min)) + min);
  arr = Array.from(new Set(arr))
  return arr.length < length ? returnRandomArr(max, min, length, arr) : arr
}
let arr = returnRandomArr(32, 2, 5)
console.log(arr)

function randomArrs(count,arr = []){
  if(count ===0 ) return arr;
  let num = Math.floor(Math.random() *31) +2
  if(!arr.includes(num)){
    arr.push(num);
    count--
  }
  return randomArrs(count,arr)
}
console.log(randomArrs(5))

// random Array
let arr = [1,2,3,4,5,6,7,8,9,0,11,12,13,14,15]
arr.sort(function(a,b){return Math.random() > 0.5 ? 1 :-1})
console.log(arr,'---')

Array.prototype.shuffle = function(){
  let input = this;
  for(let i=input.length -1; i>=0;i--){
    let randomIndex = Math.floor(Math.random()*(i+1))
    let itemAtIndex = input[randomIndex]
    input[randomIndex] = input[i]
    input[i] = itemAtIndex
  }
  return input
}

let tempArr = [1,2,3,4,5,6,7,8,9,0]
tempArr.shuffle()
console.log(tempArr)

function shuffle (arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    let j = Math.floor(Math.random() * len)
    if (i !== j) [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

console.log(shuffle([1,2,3,4,5,6,7,8,9,0]))

const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
};

// 获取数组的最大值和最小值
Array.prototype.max = function(){
  return Math.max.apply(null,this)
}

Array.prototype.min = function(){
  return Math.min.apply(null,this)
}


// es6
Math.max(...array)
Math.min(...array)

Math.max.apply(Array,arr)
Math.min.apply(Array,arr)

function sortArr(arr,flag){
  let arrtemp = flag?arr.sort((a,b) => b-a):arr.sort((a,b) => a-b)
  return arrtemp[0]
}

// 多维数组转一维数组
const newArr = function(arr){
  return arr.reduce((pre,cur) => pre.concat(Array.isArray(cur)?newArr(cur):cur),[])
}

// 数字数组最大差值
function getMaxDiff(arr) {
  let minNum = Math.min(...arr);
  let maxNum = Math.max(...arr);

  return maxNum - minNum;
}