/*
栈(stack)和堆（heap）

stack为自动分配的内存空间，它由系统自动释放；
而heap则是动态分配的内存，大小也不一定会自动释放
 */

/*
基本数据类型 （存放在栈中）
es5
undefined、null、布尔值（Boolean）、字符串（String）、
数值（Number）
es6 
Symbol

基本数据类型是指存放在栈中的简单数据段，数据大小确定，
内存空间大小可以分配，它们是直接按值存放的，所以可以直接按值访问
 */

var a = 10;
var b = a;
b = 20;
console.log(a); // 10值
console.log(b); // 20值

/*
引用类型 （存放在堆内存中的对象，每个空间大小不一样，要根据情况进行特定的配置）
对象（Object）
在JS中除了基本数据类型以外的都是对象，数据是对象，函数是对象，正则表达式是对象
 */

var obj1 = new Object();

var obj2 = obj1;

obj2.name = "我有名字了";

console.log(obj1.name); // 我有名字了

var a = [1,2,3,4,5];
var b = a;//传址 ,对象中传给变量的数据是引用类型的，会存储在堆中；
var c = a[0];//传值，把对象中的属性/数组中的数组项赋值给变量，这时变量C是基本数据类型，存储在栈内存中；改变栈中的数据不会影响堆中的数据
alert(b);//1,2,3,4,5
alert(c);//1
//改变数值 
b[4] = 6;
c = 7;
alert(a[4]);//6
alert(a[0]);//1

/* 
浅拷贝
在定义一个对象或数组时，变量存放的往往只是一个地址
当我们使用对象拷贝时，如果属性是对象或数组时，
这时候我们传递的也只是一个地址。因此子对象在访问该属性时，
会根据地址回溯到父对象指向的堆内存中，
即父子对象发生了关联，两者的属性值会指向同一内存空间。
*/

var a={key1:"11111"}
function Copy(p){
   var c ={};
   for (var i in p){
      c[i]=p[i]
   }    
   return c;
}
a.key2 = ["小辉","小辉"]
var b = Copy(a);
b.key3 = "33333"
alert(b.key1)//11111
alert(b.key3)//33333
alert(a.key3);//undefined
b.key2.push('大辉')
alert(a.key2) // 小辉，小辉，大辉

// es6 
var a = {name:'guoht'}
var b = Object.assign({},a)
b.age = 30
console.log(a.age) // undefined

/*
深拷贝
我们不希望父子对象之间产生关联，那么这时候可以用到深拷贝
既然属性值类型是数组和或象时只会传址，那么我们就用递归来解决这个问题，
把父对象中所有属于对象的属性类型都遍历赋给子对象即可
 */

var a = {key1:'111'}
function Copy(p,c){
  var c = c || {}
  for (var i in p){
    if(typeof p[i] === 'object'){
      c[i] =(p[i].constructor === Array)?[]:{}
      Copy(p[i],c[i])
    }else{
      c[i] = p[i]
    }
  }
  return c
}
a.key2 = ["小辉","小辉"]
var b = {}
b = Copy(a,b); 
b.key2.push("大辉");
b.key2//小辉，小辉，大辉
a.key2//小辉，小辉  