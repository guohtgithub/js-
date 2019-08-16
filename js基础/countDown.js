function countDownFn(time){
  let day,hour,minute,second
  if(time > 0){
    day = parseInt(time/3600/24)
    hour = parseInt(time/3600%24) 
    minute = parseInt(time/60%60)
    second = parseInt(time%60)
    day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0'+hour : hour
    minute = minute < 10 ? '0'+minute : minute
    second = second < 10 ? '0'+second : second
  }else{
    day = hour = minute = second = '00'
  }
  return [day,hour,minute,second]
}

let timer = null
let orderList = [
  {
    countDown:36
  },{
    countDown:72
  },{
    countDown:108
  }
]
function timerFn(timer,obj){
  timer = setInterval(() =>{
    obj.forEach((item,index) =>{
      item.dayTime = countDownFn(item.countDown)
      item.countDown--
    })
    console.log(obj)
  },1000)
}

timerFn(timer,orderList)
