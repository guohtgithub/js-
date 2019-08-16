/**
 * 创建一个compose函数,返回函数集 functions 组合后的复合函数, 
 * 也就是一个函数执行完之后把返回的结果再作为参数赋给下一个函数来执行.
 */

var greet = function(name){return 'hi: ' + name}
var exclaim = function(statement){return statement.toUpperCase() + ' ！'}
var welcome = compose(greet,exclaim);
welcome('Tome') // hi: TOM !

var compose = function(fn1,fn2){ // 从右向左执行
  return function(name){
    console.log(fn2(fn1(name)).replace(/(w+:)/,function($1){
      return $1.toUpperCase()
    }))
  }
}

// 另一种实现
function composeTwo(){
  var fns = [].slice.call(arguments)
  return function(initialArg){
    var res = initialArg
    for(var i=fns.length-1;i>-1;i--){
      res = fns[i](res)
    }
    return res
  }
}

function pipe(){
  var fns = [].slice.call(arguments)
  return function(initialArg){
    var res = initialArg
    for(var i=0;i<fns.length;i++){
      res = fns[i](res)
    }
    return res
  }
}

// reduce compose
function composeReduce(...fns){
  return fns.reduce((a,b) => (...args) =>a(b(...args)))
}
// reduce right
var composereduceRight = (...args) => x => args.reduceRight((value,item) =>item(value),x)

function composeRight(...fns){
  return fns.reduceRight((a,b) =>(...args) => a(b(...args)))
}
