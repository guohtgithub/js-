// 递归理解

// 阶乘  
// arguments.callee 是一个指向正在执行的函数的指针
// 严格模式下，不能通过脚本来访问arguments.callee
function test(num){
  if(num<=1){
    return num;
  }else{
    return num*arguments.callee(num-1)
  }
}

let num = test(5)
console.log(num)

// 严格模式处理
let fs = (function test(num){
  if(num<=1){
    return num;
  }else{
    return num * test(num-1)
  }
})

console.log(fs(3))

// 二分法
function quickSort(arr){
  if(arr.length<=1) return arr;
  var leftArr = [];
  var rightArr = [];
  var pivot = Math.random(arr.length/2);
  var baseNum = arr.splice(pivot,1)

  arr.forEach(function(num){
    if(num < baseNum){
      leftArr.push(num);
    }else{
      rightArr.push(num);
    }
  });
  return quickSort(leftArr).concat(baseNum,quickSort(rightArr))
}

console.log(quickSort([1,3,4,2,12,33,2,6,7,8,9,3,42,123,5]))

// 汉诺塔
let hannouta = function(n,src,aux,dest){
  if(n>0){
    hannouta(n-1,src,dest,aux);
    console.log('移动第'+n+'个圆盘从' +src+'到'+dest);
    hannouta(n-1,aux,src,dest)
  }
}
hannouta(3,'a','b','c')

//斐波那契数列
let fibomacci = function(n){
  if(n<=0) return 0;
  if(n<=2) return 1;
  return arguments.callee(n-1) + arguments.callee(n-2);
}

console.log(fibomacci(21))

//最大公约数
let getNum = function(a,b){
  if(a === b)return a;
  return arguments.callee(Math.abs(a-b),Math.min(a,b));
}

console.log(getNum(12,9))

// 细胞分裂
let afib = function(n){
  if(n === 0)return 1;
  return afib(n-1)+bfib(n-1)+cfib(n-1)
}
let bfib = function(n){
  if(n===0) return 0;
  return afib(n-1)
}
let cfib = function(n){
  if(n===0||n===1)return 0;
  return bfib(n-1);
}

let time = 3;
console.log(afib(time)+bfib(time)+cfib(time))