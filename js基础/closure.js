/*

闭包：闭包，其实是一种语言特性，它是指的是程序设计语言中，允许将函数看作对象，然后能像在对象中的操作搬在函数中定义实例（局部）变量，而这些变量能在函数中保存到函数的实例对象销毁为止，
其它代码块能通过某种方式获取这些实例（局部）变量的值并进行应用扩展。

闭包是允许函数访问局部作用域之外的数据。
即使外部函数已经退出，外部函数的变量仍可以被内部函数访问到。

作用：有时候我们需要一个模块中定义这样一个变量：
希望这个变量一直保存在内存中但又不会“污染”全局的变量，
这个时候，我们就可以用闭包来定义这个模块。
*/

function a(){
  var x = 0;
  return function(y){
    x +=y;
    console.log(x);
  }
}
var b = a();
b(1); // 1
b(2); // 2

/*
但是你只需要知道应用的两种情况即可——函数作为返回值，函数作为参数传递。
 */

function fn(){
 var max = 10;
 return function bar(x){
  if(x>max){
    console.log(x)
  }
 }
}

var f1 = fn();
var max = 100;
f1(15); // 15

/*
闭包与变量
闭包只能取得包含函数中任何变量的最后一个值,闭包所保存的是整个变量对象，而不是某个特殊变量。
 */

function createFunc(){
  let result = new Array();
  for(var i=0;i<10;i++){
    result[i] = function(x){
      return function(){
        return x
      }
    }(i)
  }
  return result;
}

var func = createFunc(); // func 返回的数组，数组的元素是函数
for (var i = func.length - 1; i >= 0; i--) { // 
  console.log(func[i]())
}

/*
函数按值传递
函数传参就两个类型，基本类型和引用类型，大家纠结的都是引用类型的传递。
 */

//demo1
function setName(obj){
  obj.name = 'aaa'; // 改变参数obj 的name 属性
  var obj = new Object(); // 新建obj
  obj.name = 'ccc'; // 定义新obj的name属性
  return obj; // 返回新的obj
}
var person = new Object();
person.name = 'bbb';
var newPerson = setName(person);
console.log(person.name,'----',newPerson.name); // aaa, ----, ccc

//demo 2
var a = {
  num :1
}
var b = {
  num:3
}
function change(obj){
  obj.num = 9; // 改变参数obj的num属性
  obj = b; // obj 重新赋值
  return obj.num; // 返回新赋值的Obj 属性 num
}
var newObj = change(a);
console.log(newObj,'---',a.num) // 3，--- ，9

/*
 闭包中使用this对象
his对象是在运行时基于函数的执行环境绑定的：全局函数中，this等于window;
当函数被作用某个对象的方法调用时，this等于那个对象。

但在匿名函数中，由于匿名函数的执行环境具有全局性，
因此this对象通常指向window(在通过call或apply函数改变函数执行环境的情况下，会指向其他对象)。
 */
var name = 'The Window'
var object = {
  name:'My Object',
  getNameFunc:function(){
    return function(){
      return this.name
    }
  }
}

console.log(object.getNameFunc()()) // The Window

// 变量声明提前
var scope = 'global';
function scopeTest(){
  console.log(scope);
  var scope = 'local'
}
scopeTest(); // undefined

// 没有块级作用域
function fns(){
  var scope =  {}
  if(scope instanceof Object){
    var j = 1;
    for(var i=0;i<10;i++){
      console.log(i,'i--in');
    }
    console.log(i,'i--out')
  }
  console.log(j,'j--out')
}
fns();

//在javascript中变量的作用范围是函数级的,声明提前、全局变量优先级低于局部变量
function getscope(){
  var scope;
  console.log(scope) // undefined
  scope = 'no';
  console.log(scope) // no
}

// 点击事件绑定在ul上，点击每个li触发不同的事件
function onClickUl(){
  var li = document.getElementsByTagName('li');
  for(var i=0;i<li.length;i--){
    li[i].onclick = function(){
      alert(i); // i为同一个数
    }

    // 解决方法一  声明匿名函数
    (function(arg){
      li[i].onclick=function(){
        alert(arg)
      }
    })(i)

    // 解决方法二 数组对象属性处理
    li[i].i = i;
    li[i].onclick = function(){
      console.log(this.i); // 属性对象 i
    }

    // 解决方法三 点击事件声明一个匿名函数
    li[i].onclick = (function(arg){
      return function(){
        console.log(arg);
      }
    })(i)

    //解决方法四 匿名函数中定义临时变量
    (function(){
      var temp = i;
      li[i].onclick = function(){
        console.log(temp)
      }
    })()

    //解决方法五 点击事件声明一个匿名函数，在匿名函数中声明临时变量
    li[i].onclick = (function(){
      var temp = i;
      return function(){
        console.log(temp)
      }
    })()

    // 解决方法六 函数属性处理 使用arguments.callen
    (li[i].onclick = function(){
      console.log(arguments.callen.i)
    }).i = i;


    /*
    其实此处 new 与不 new 只是的区别在于:
    使用了 new 即 Function 函数充当构造器,由 JS 解析器生产一个新的对象,
    构造器内的 this 指向该新对象;
    不实用 new 即 Function 函数依旧是函数,由函数内部自己生产一个实例返回.
     */ 
    // 解决方法七 new Function() 构造函数
    li[i].onclick = new Function('console.log('+i+')');

    // 解决方法八 Function() 
    li【[i].onclick = Function('console.log('+i+')')

    //解决方法九
    let j = i;
    li[i].onclick = function(){
      console.log(j);
    }
  }
}

// 闭包深一点的写法
(function(document){
  var viewPort;
  var obj = {
    init:function(id){
      viewPort = document.querySelector('#'+id)
    },
    addChild:function(child){
      viewPort.appendChild(child)
    },
    removeChild:function(child){
      viewPort.removeChild(child);
    }
  }
  window.jView = obj;
})(document)

// Dom元素 事件
function DomWithEvent(dom,methodName){
  return (function(e){
    e = e || window.event;
    return dom[methodName](e,this);
  })
}

function getElementWith(el){
  return document.querySelector(el)
}

function DomObj(elem){
  var el = getElementWith(elem); // 获取元素
  if(el){
    el.onclick = DomWithEvent(this,'doOnclick');
    el.momouseover = DomWithEvent(this,'doMouseOver');
    el.onmouseout = DomWithEvent(this,'doMouseOut');
  }
}
DomObj.prototype.doOnclick = function(event,elem){
  // doto
}
DomObj.prototype.doMouseOver = function(event,elem){
  // doto
}
DomObj.prototype.doMouseOut = function(event,elem){
  // doto
}
