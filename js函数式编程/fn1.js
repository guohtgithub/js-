/*
函数式编程：又称泛函编程，是一种编程范式，它将电脑运算视为数学上的函数计算，
并且避免使用程序状态以及易变对象

1、纯函数
函数在相同的输入值时，总是产生相同的输出，
函数的输出和当前运行环境的上下文状态无关

函数运行过程不影响运行环境，也就是无副作用

因为纯函数相对于非纯函数来说，在可缓存性、可移植性、
可测试性以及并行计算方面都有着巨大的优势。

JavaScript内置函数有不少纯函数，也有不少非纯函数
纯函数：
Array.prototype.slice
Array.prototype.map
String.prototype.toUpperCase

非纯函数：
Math.random
Date.now
Array.prototype.splice
 */

var arr = [1,2,3,4,5,6]
//纯函数
arr.slice(0, 3) // [1,2,3]
arr.slice(2,4)  // [3,4]
arr.slice(0, 3) // [1,2,3]

// 非纯函数
arr.splice(0,3); // [1,2,3]
arr.splice(0,3); // [4,5]
arr.splice(0,5); // []

// 非纯函数改纯函数 变量定义在内部
var checkAge = function(age){
  var minimun = 21;
  return age >= minimun;
}

// 2、函数柯里化 将一个低阶函数转为高阶函数的过程就叫柯里化
// var add = (x,y) => x+y

var add = x => (y => x+y);
var increment = add(1);
var addTen = add(10);

increment(2); // 3
addTen(2); // 12

//柯里化处理非纯函数
var checkage = min => (age => age>min)

var checkage18 = checkage(18);
checkage18(20); // true

// 函数柯里化是一种"预加载"函数的能力，通过传递一到两个参数调用函数，就能
// 得到一个记住了这些参数的新函数。从某种意义上来讲，这是一种对参数的缓存，是一种
// 非常高效的编写函数的方法

var match = (what,str) => str.match(what);
var filter = (f,arr) = arr.filter(f);

// 判断字符串有没有空格
var hasSpace = match(/\s+/g);
hasSpace('hello world');
hasSpace('guoht');

var findSpace = filter(hasSpace);
findSpace(['guoht','guoht xxl guozj'])

//3、 组合函数

var toUpperCase = function(x){return x.toUpperCase()}
var exclaim = function(x){return x+' !'}
var shout = function(x){
  return exclaim(toUpperCase(x));
}

shout('hello world') // HELLO WORLD !

//使用组合函数
var compose = (...args) => x => args.reduceRight((value,item) =>item(value),x)

var toUpperCases = function(x){return x.toUpperCases()}
var exclaims = function(x){return x+' !'}
var shouts = compose(exclaims,toUpperCases);
shouts('hello worlds') // HELLO WORLDS

var head = function(x){return x[0]}
var reverse = reduce(function(acc,x){return [x].concat(acc)},[]);
var last = compose(head,reverse);

last(['guoht','xiongxl','guozj'])

//4 、声明式和命令式代码
// 命令式代码：命令‘机器’如何去做事情，这样不管你想要的是什么，
// 他都会按照你的命令实现
// 
// 声明式代码：告诉‘机器’你想要的是什么，让机器想出如何去做

// 命令式
var makes = []
for(var i=0;i<cars.length;i++){
  makes.push(cars[i].make)
}

// 声明式
var make = car.map(function(car){return car.make})