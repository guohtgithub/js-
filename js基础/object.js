// 模拟new
function _new(Fn, ...arg) {
  const obj = Object.create(Fn.prototype);
  const obj1 = Fn.apply(obj, arg);
  return obj1 instanceof Object ? obj1 : obj;
}

function fn(name){
  this.name = name
}
fn.prototype.say = function(){
  return 'Hello ' + this.name
}

let newFn = _new(fn,'guoht')
console.log(newFn.say())

// 模拟call 
Function.prototype.myCall = function(context = window){
  context.fn = this
  var args = [...arguments].slice(1)
  var result = context.fn(...args)
  delete context.fn
  return result
}

/*
  bind
  bind(context,arguments) 返回一个函数
  call
  call(context,arg1,arg2...) 指定作用域 同时执行函数
  apply
  apply(context,args) 指定作用域 同时执行函数，后面的参数是数组
*/

// 模拟Apply
Function.prototype.myApply = function(context = window){
  context.fn = this
  var result
  if(arguments[1]){
    result = context.fn(...arguments[1])
  }else{
    result = context.fn()
  }
  delete context.fn
  return result
}

// 模拟 Bind
Function.prototype.myBind = function(context){
  if(typeof this !== 'function'){
    throw new TypeError('error')
  }
  var _this = this
  var arg = [...arguments].slice(1)
  // 返回一个函数
  return function F(){
    if(this instanceof F){
      // 因为返回了一个函数，我们可以 new F()，所以需要判断
      return new _this(...arg,...arguments)
    }
    return _this.apply(context,arg.concat(...arguments))
  }
}

Function.prototype.myBind = function(context,...args){
  return function(){
    return this.apply(context,args)
  }
}

/**
 * 深拷贝
 * 数组clone：Array.from( )
 * 对象clone：JSON.parse(JSON.stringify( ))
 */

// 深度拷贝
function deepCopy(target, source) {
  for (var prop in source) {
    if (typeof source[prop] === 'object') {
      target[prop] = (source[prop].constructor === Array) ? [] : {};
  　　 deepCopy(target[prop], source[prop]);
   　} 
     else {
      target[prop] = source[prop];
    }
  }
  return target; 
}

// 浅拷贝
Object.assign(target, source)

// 阶乘 n!
const factorial = num => {
  if (num > 1) 
    return num * factorial(num - 1)
  return 1
}

console.log(factorial(5))

// 事件委托
window.onload = function(){
  let oUl = document.getElementById('ul');
  let aLi = oUl.getElementsByTagName('li');
  let but = document.getElementById('button');
  let now = 3;
  // 事件源：event对象，不管在哪个事件中，只要你操作的哪个元素就是事件源
  // ie：window.event.srcElement
  // 标准：event.target
  oUl.onmouseover = function(e){
      let ev = e || window.event;
      let target = ev.target || ev.srcElement;
      if(target.nodeName.toLowerCase() == 'li'){
          target.style.background = 'red';
      }
  }
  oUl.onmouseout = function(e){
      let ev = e || window.event;
      let target = ev.target || ev.srcElement;
      if(target.nodeName.toLowerCase() == 'li'){
          target.style.background = '';
      }
  }
  but.onclick = function(){
      now ++;
      let newLi = document.createElement('li');
          newLi.innerHTML = 111111 * now;
          oUl.appendChild(newLi);
  }
}

/* 
this 用法
全局 this 是 window
函数 this 是调用者
构造函数的 this 是 new 之后的新对象
call ，apply ，bind 的 this 是第一个参数
*/

// JSONP
function JSONP(url, params, callback) {
  const script = document.createElement("script");
  script.src = url + parseObjToParams({...params, callback: "jsonpCallback"});
  document.body.appendChild(script);
  window.jsonpCallback = callback;
  script.onload = () => {
    document.body.removeChild(script)
  }
}

JSONP("http://localhost:3019/asd", {name: "vijay"}, (data) => {
  console.log(data);
});