// js 异步的几种方式
// 1、 回调函数
/*
1.回调函数 （callback）
缺点：回调地狱，不能用 try catch 捕获错误，不能 return`
回调地狱的根本问题在于
缺乏顺序性： 回调地狱导致的调试困难，和大脑的思维方式不符
嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身，
即（控制反转,嵌套函数过多的多话，很难处理错误

优点：解决了同步的问题（只要有一个任务耗时很长，
后面的任务都必须排队等着，会拖延整个程序的执行。）
 */
setTimeout(()=>{
  // todo...
},1000)

ajax('XXX1', () => {
    // callback 函数体
    ajax('XXX2', () => {
        // callback 函数体
        ajax('XXX3', () => {
            // callback 函数体
        })
    })
})


function f1(fn){
  setTimeout(function(){
    console.log('先执行 f1');
  },1000)
  fn();
}
function f2(){
  console.log('在执行 f2');
}

f1(f2);

// 2、事件监听
// jquery ready()
setTimeout(() =>{
  console.log('一秒后执行')
},2000)

// 3、 async
/*
async、await 是异步的终极解决方案
优点是：代码清晰，不用像 Promise 写一大堆 then 链，
处理了回调地狱的问题

缺点：await 将异步代码改造成同步代码，
如果多个异步操作没有依赖性而使用 await 会导致性能上的降低

 */

async function test() {
    // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
    // 如果有依赖性的话，其实就是解决回调地狱的例子了
    await fetch('XXX1')
    await fetch('XXX2')
    await fetch('XXX3')
}


async function demo(){
  try{
    await new Promise(function(resolve,reject){

    });
  }catch(err){
    console.log(err)
  }
}
demo().then(data =>{
  console.log(data)
})

// 4、 promise
/*
Promise就是为了解决callback的问题而产生的
Promise 实现了链式调用，也就是说每次 then 后返回的都是一个全新 Promise
如果我们在 then 中 return ，return 的结果会被Promise.resolve() 包装

优点：解决了回调地狱的问题

缺点：无法取消 Promise ，错误需要通过回调函数来捕获
 */
ajax('XXX1')
    .then(res => {
        // 操作逻辑
        return ajax('XXX2')
    }).then(res => {
        // 操作逻辑
        return ajax('XXX3')
    }).then(res => {
        // 操作逻辑
        })

export default function getMethods(url){
  return new Promise(function(resolve,reject){
    axios.get(url).then(res =>{
      resolve(res)
    }).catch(err =>{
      reject(err)
    })
  })
}

const promise = new Promise((resolve, reject) => {
    console.log(1)
    resolve()
    console.log(2)
})

promise.then(() => {
    console.log(3)
})

console.log(4)
// 1 2 4 3


//5. Generator
/*
特点：可以控制函数的执行，可以配合 co 函数库使用
 */

function* fetch() {
    yield ajax('XXX1', () => { })
    yield ajax('XXX2', () => { })
    yield ajax('XXX3', () => { })
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
