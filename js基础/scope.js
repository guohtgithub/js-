// 主要是理解es5 

// 1、JavaScript 中无块级作用域
function main(){
  if(1 == 1){
    var name = 'guoht'
  }
  console.log(name);
}

main(); // guoht

// 2、JavaScript采用函数作用域
function scope(){
  var innerValue = 'guoht'
}
scope();
// console.log(innerValue) // not defined err

// 3、javaScript 的作用域链
var out = 'sjsj';
function Func(){
  var out = 'jdkdj';
  function inner(){
    var out = 'ddjdjs';
    console.log(out)
  }
  inner()
}

Func(); // ddjdjs

//4、JavaScript 的作用域链执行前已创建
var str = 'string';
function funcStr(){
  var str = 'out string';
  function inner(){
    console.log(str);
  }
  return inner;
}

var ret = funcStr()
ret() // out string

function funcStr1(){
  var str = 'out string';
  function inner(){
    console.log(str);
  }
  str = 'other string'
  return inner
}

var ret1 = funcStr1()
ret1() // other string

function Bar(){
  console.log(str);
}
function funcStr2(){
  var str = 'second string';
  return Bar;
}
var ret2 = funcStr2();
ret2(); // string

//5 、声明提前

console.log(xxx)

var xxx;

function foo(){
  console.log(strs);
  var strs = 'guoht'
}
foo() // undefined