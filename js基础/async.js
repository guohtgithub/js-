// js 异步的几种方式
// 1、 回调函数
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
export default function getMethods(url){
  return new Promise(function(resolve,reject){
    axios.get(url).then(res =>{
      resolve(res)
    }).catch(err =>{
      reject(err)
    })
  })
}