// 职责链模式？
//  使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，
//  将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止
  
//  代码场景:  假设我们正在开发一个电商网站，某一个商品正在进行预定活动，活动规则如下
//  500 元定金会收到200 优惠劵 200 元定金会收到100 优惠劵 没有预定的用户只能普通购买

// 代码理解
const Chain = function(fn){
  this.fn = fn;
  this.successor = null
}

Chain.prototype.setNextSuccessor = function(successor){
  return this.successor = successor;
}

Chain.prototype.passRequest = function(){
  let ret = this.fn.apply(this,arguments);
  if(ret === 'nextSuccessor'){
    return this.successor && 
      this.successor.passRequest.apply(this.successor,arguments)
  }
}
Chain.prototype.next = function(){
  return this.successor &&
    this.successor.passRequest.apply(this.successor,arguments)
}

// 优惠卷职责链
let order500 = function(orderType,pay,stock){
  if(orderType == 1 && pay == true){
    console.log('500 元定金会收到100 优惠价')
  }else{
    return 'nextSuccessor'
  }
}

let order200 = function(orderType,pay,stock){
  if(orderType == 2 && pay == true){
    console.log('200 元定金会收到50 优惠价')
  }else{
    return 'nextSuccessor'
  }
}

let orderNormal = function(orderType,pay,stock){
  if(stock > 0){
    console.log('普通购买，无优惠卷')
  }else{
    console.log('手机库存不足');
  }
}

let chainOrder500 = new Chain(order500);
let chainOrder200 = new Chain(order200);
let chainorderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainorderNormal)

chainOrder500.passRequest(1,true,500);
chainOrder500.passRequest(2,true,500);
chainOrder500.passRequest(3,true,500);
chainOrder500.passRequest(1,false,0);

// AOP 实现职责链
Function.prototype.after = function(fn){
  let _this = this;
  return function(){
    let ret = _this.apply(this,arguments);
    if(ret === 'nextSuccessor'){
      return fn.apply(this,arguments)
    }
    return ret;
  }
}

let order = order500.after(order200).after(orderNormal);
order(1,true,500)
order(2,true,500)
order(1,false,500)

// 商店打折职责链
function BookHandler(){
  this.calcPrice = function(price){
    if(199 > price){
      console.log('原价是：'+price)
    }else{
      this.successor.calcPrice(price)
    }
  }
  this.setSuccessor = function(_successor){
    this.successor = _successor
  }
}

function BookCalc9Handler(_successor){
  this.calcPrice = function(price){
    if(199<=price && price<399){
      console.log('原价是：'+price+';打9折后：'+(price*0.9))
    }else{
      this.successor.calcPrice(price)
    }
  }
  this.setSuccessor = function(_successor){
    this.successor = _successor;
  }
}

function BookCalc8Handler(){
  this.calcPrice = function(price){
    if(399<=price && price<599){
      console.log('原价是：'+price+';打8折后：'+(price*0.8))
    }else{
      this.successor.calcPrice(price)
    }
  }
  this.setSuccessor = function(_successor){
    this.successor = _successor;
  }
}

function BookCalc7Handler(){
  this.calcPrice = function(price){
    if(599<price){
      console.log('原价是：'+price+';打7折后：'+(price*0.7))
    }else{
      this.successor.calcPrice(price);
    }
  }
  this.setSuccessor = function(_successor){
    this.successor = _successor;
  }
}

var price = 400;
var bookHandler = new BookHandler();
var bookCalc9Handler = new BookCalc9Handler();
var bookCalc8Handler = new BookCalc8Handler();
var bookCalc7Handler = new BookCalc7Handler();
 
 
bookHandler.setSuccessor(bookCalc9Handler);
bookCalc9Handler.setSuccessor(bookCalc8Handler);
bookCalc8Handler.setSuccessor(bookCalc7Handler);
bookHandler.calcPrice(price);

// 异步职责链
let fn1 = new Chain(function(){
  console.log(1);
  return 'nextSuccessor'
})

let fn2 = new Chain(function(){
  console.log(2);
  var self = this;
  setTimeout(function(){
    self.next()
  },1000)
})

let fn3 = new Chain(function(){
  console.log(3)
})

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();