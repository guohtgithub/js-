let a = 10
const b = 20
// 相当于
(function(){
  var a = 10
  var b = 20
})()
// scope作用域链

for(var i=0;i<10;i++){
  setTimeout(() => {
    console.log(i)
  },1000)
}

// 10 个 10

for(let i=0;i<10;i++){
  setTimeout(()=>{
    console.log(i)
  },1000)
}
// 1,2,3,....,9

// 闭包
for(var i=0;i<10;i++){
  (i =>{
    setTimeout(()=>{
      console.log(i)
    },1000)
  })(i)
}
// 1,2,3,...,9


for (var i = 0; i< 10; i++){
   setTimeout((i) => {
   console.log(i);
   }, 1000,i)
}

for (var i = 0; i < 10; i++) {
    setTimeout(((i) => {
        console.log(i);
    })(i), 1000)
}