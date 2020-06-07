/* 防抖 */
// 触发高频事件后n秒内函数只会执行一次，
// 如果n秒内高频事件再次被触发，则重新计算时间
// 每次触发事件时都取消之前的延时调用方法
function dou(fn, wait) {
    var time = null;
    return function () {
        clearTimeout(time)
        // time = setTimeout(function () {
        //  console.log(this)//window 
        //  fn.apply(this, arguments)//这样的话 this为window和直接 fn()调用是一样的效果，因为他们的this都是window
        // }, wait);
        time = setTimeout(() => {
            // console.log(this)//div
            fn.apply(this, arguments)//确保dou函数的this（上下文还是div）
        }, wait);
    }
}
function demo() {
    console.log('防抖啦')
}
// 用句柄事件绑定调用dou事件，所以this为div节点对象
document.querySelector('div').addEventListener('scroll', dou(demo, 1000))


/* 节流 */
//高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
//每次触发事件时都判断当前是否有等待执行的延时函数
function throttle(func, wait) {
    var previous = 0;
    return function () {
        var now = +new Date();
        if (now - previous > wait) {
            func.apply(this, arguments);
            previous = now;
        }
    }
}
function getUserAction() {
    console.log(`每秒1秒内打印一次`)
}
document.querySelector('div').addEventListener('click', throttle(getUserAction, 1000))


// map parseInt
['1','2','3'].map(parseInt) // [1,NaN,NaN]

['1','2','3'].map((item,index) => {
    return parseInt(item,index)
})

// parseInt(item,index) // 2-36 

let arrMore = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

function flat(originArr,arrJoin=[]){
    originArr.forEach(items=>{
        if(Array.isArray(items)){
           flat(items,arrJoin)
        }else{
            arrJoin.push(items)
        }
    })

    let set = new Set(arrJoin)
    let newArr = Array.from(set)
    
    // let newArr = []
    // arrJoin.forEach(item => {
    //     if(!newArr.includes(item)) newArr.push(item)
    // })
    return newArr.sort((a,b)=>a-b)
}

let newArrJoin = flat(arrMore)
