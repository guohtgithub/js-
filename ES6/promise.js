'use strict'

function callback(){
	console.log('Done')
}
console.log('before setTimeout()')
setTimeout(callback,1000)
console.log('after setTimeout')

// before setTimeout
// after setTimeout
// Done

new Promise(function(){})

function test(resolve,reject){
	let timeOut = Math.random()*2
	console.log('set timeout to: '+timeOut+' seconds')
	setTimeout(function(){
		if(timeOut < 1){
			log('call resolve()...')
			resolve('200 OK')
		}else{
			log('call reject()...')
			reject('timeOut in '+timeOut+' seconds.')
		}
	})
}

function log(str){
	console.log(str)
}
/*
	var p1 = new Promise(test)
	var p2 = p1.then(function(result){
		console.log('成功：'+result)
	})
	var p3 = p2.catch(function(reason){
		console.log('失败：'+reason)
	})
*/

// 等价于
new Promise(test).then(res =>{
	console.log('成功：'+res)
}).catch(err => {
	console.log('失败：'+err)
})

let p = new Promise((resolve,reject) =>{
	log('start new Promise...')
	resolve(123)
})

function multiply(input){
	return new Promise((resolve,reject) =>{
		log('calculating '+input+ ' x ' + input + '...')
		setTimeout(resolve,500,input*input)
	})
}
function add(input){
	return new Promise((resolve,reject) => {
		log('calculating '+ input +' + '+input+'...')
		setTimeout(resolve,500,input+input)
	})
}

p.then(multiply)
 .then(add)
 .then(multiply)
 .then(add)
 .then(result => {
 	log('Got value: '+result)
 })

 function ajax(method,url,data){
 	let request = new XMLHttpRequest()
 	return new Promise((resolve,reject)=>{
 		request.onreadystatechange= ()=>{
 			if(request.readyState === 4){
 				if(request.state === 200){
 					resolve(request.responseText)
 				}else{
 					reject(request.status)
 				}
 			}
 		}
 		request.open(method,url)
 		request.send(data)
 	})
 }

 // let ajaxFn = ajax('GET','/api/categories')
 // ajaxFn.then(res=>{
 // 	log('成功：'+res)
 // }).catch(err =>{
 // 	log('err: '+err)
 // })

 let onePromise = new Promise((resolve,reject)=>{
 	setTimeout(resolve,500,'p1')
 })

 let otherPromise = new Promise((resolve,reject) => {
 	setTimeout(resolve,500,'p2')
 })

 Promise.all([onePromise,otherPromise]).then(resArr => {
 	log(resArr)
 })

 Promise.race([onePromise,otherPromise]).then(res => {
 	log(res)
 })

let promise = new Promise((resolve,reject) => resolve(123))
console.log(promise,'0---')

//Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的。
let promiselog = new Promise((resolve,reject) => {
	console.log(1)
	resolve()
	console.log(2)
})

promiselog.then(() => {
	console.log(3)
})
console.log(4)

// 1 2 4 3

let promise1 = new Promise((resolve,reject) => {
	setTimeout(() =>{
		resolve('success')
	},1000)
})
let promise2 = promise1.then(() =>{
	throw new Error('error!')
})

console.log('promise1',promise1)
console.log('promise2',promise2)

setTimeout(()=>{
	console.log('promise1',promise1)
	console.log('promise2',promise2)
},2000)

// pending
// pending
// error
// fulfiled success
// rejected

let returnPromise = new Promise((resolve,reject) =>{
	resolve(123)
})

let resultPromise = returnPromise.then((res)=>{
	return res
})

// returnOther() 返回一个promise 对象
let returnOther = () => Promise.resolve('args')

function promiseAll(promises){
  return new Promise(function(resolve,reject){
    if(!Array.isArray(promises)){
     	return reject(new TypeError("argument must be anarray"))
    }
    var countNum=0;
    var promiseNum=promises.length;
    var resolvedvalue=new Array(promiseNum);
    for(var i=0;i<promiseNum;i++){
      (function(i){
        Promise.resolve(promises[i]).then(function(value){
            countNum++;
            resolvedvalue[i]=value;
          if(countNum===promiseNum){
            return resolve(resolvedvalue)
          }
        },function(reason){
          return reject(reason)
        })
     	})(i)
    }
	})
}
var p1=Promise.resolve(1),
p2=Promise.resolve(2),
p3=Promise.resolve(3);
promiseAll([p1,p2,p3]).then(function(value){
console.log(value)