/*
	new 对象的过程
	1、创建一个薪对象
	2、将构造函数的作用域赋值给新对象（this指向这个新对象）
	3、执行构造函数中的代码（为这个新对象添加属性）
	4、返回新对象
*/

function Person(name){
	this.name = name
}
var p = new Person('guoht')
console.log(p.name) // guoht
console.log(p instanceof Person) // true


// ES3 new()
function _new(){
	let target = {}
	let [constructor,...args] = [...arguments]
	target.__proto__ = constructor.prototype
	let result = constructor.apply(target,args)

	if(result && (typeof result == 'object' || typeof result == 'function')){
		return result
	}
	return target
}

let p1 = _new(Person,'guoht')
console.log(p1.name) // guoht
console.log(p1 instanceof Person) // true

function myNew(fn,...args){
	console.log(fn.prototype,'---')
	const obj = Object.create(fn.prototype)
	const ret = fn.call(obj,...args)
	return ret instanceof Object ? ret : obj
}

let p3 = myNew(Person,'guoht')
console.log(p3.name)
console.log(p3 instanceof Person)

// ES3 call()
Function.prototype.myCall = function (context,...args){
	if(typeof this !== 'function'){
		throw new TypeError('this is not a function')
	}

	console.log(this,context,'context') // [Function max]

	context = context || global || window
	context.fn = this
	const ret = context.fn(...args)
	delete context.fn
	return ret
}

let arr = [1,2,3,44,55,33,222,2221,0]
let MaxNumber = Math.max.myCall(null,...arr)
console.log(MaxNumber)

// ES3 apply
Function.prototype.myApply = function(context,args){
	if(typeof this !== 'function'){
		throw new TypeError('this is not a function')
	}
	context = context || global || window
	context.fn = this
	let ret 
	if(args) ret = context.fn(...args)
	else ret = context.fn()
	delete context.fn
	return ret
}

let MaxNumberApply = Math.max.myApply(null,arr)
console.log(MaxNumberApply)

// ES3 bind
Function.prototype.myBind = function(context,...bindArgs){
	if(typeof this !== 'function'){
		throw new TypeError('this is not a function')
	}
	const _this = this
	return function Fn(...exeArgs){
		const args = bindArgs.concat(exeArgs)
		return _this.call(this instanceof Fn ? this : context,...args)
	}
}

Function.prototype.my_bind = function(context){
	let self = this
	return function(){
		return self.apply(context,arguments)
	}
}

Function.prototype.myBindOther = function(context){
	const args = Array.prototype.slice.call(arguments,1)
	let self = this
	return function(){
		let innerArgs = Array.prototype.slice.call(arguments)
		let finalArgs = args.concat(innerArgs)
		return self.apply(context,finalArgs)
	}
}

//bind返回的函数如果作为构造函数，搭配new关键字出现的话，我们绑定的this就需要被忽略
//处理构造函数场景下的兼容
Function.prototype.bind = Function.prototype.bind || function(context){
    //确保调用bind方法的一定要是一个函数
    if(typeof this !== "function"){
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var args = Array.prototype.slice.call(arguments, 1);
    var self = this;
    var F = function(){};
    F.prototype = this.prototype;
    var bound = function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return self.apply(this instanceof F ? this : context || this, finalArgs);
    }
    bound.prototype = new F();
    return bound;
}


function testBind(m,n,o){
	return this.name + ' ' + m + " " + n + ' ' + o
}

let objBind = {name:'guoht'}
let argArr = [1,2]
console.log(testBind.myBindOther(objBind,...argArr)(9))

function returnBind(){
	return this.name
}

returnBind() // ''

let obj2 = {name:'guoht'}
console.log(returnBind.bind(obj2)())
console.log(returnBind.my_bind(obj2)())
console.log(returnBind.myBind(obj2)())

function list(){
	return Array.prototype.slice.call(arguments)
}

var list1 = [1,2,3,4,5]
let arrlist = list(list1)
console.log(arrlist[0],'--- ')

let alist = list.bind(undefined,10)
console.log(alist())
console.log(alist(1,2,3))