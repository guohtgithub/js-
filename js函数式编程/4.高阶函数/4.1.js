var _ = require('underscore')
// MAX
console.log(_.max([1,2,3,4,5]))
console.log(_.max([1,2,3,4.44,5.2]))

var people =[
  {name:'guoht',age:29},
  {name:'xxl',age:30}
]
console.log(_.max(people,function(p){return p.age}))

function finder(valueFn,bestFn,coll){
  return _.reduce(coll,function(best,current){
    var bestValue = valueFn(best)
    var currentValue = valueFn(current)

    return (bestValue === bestFn(bestValue,currentValue)) ? best : current
  })
}

console.log(finder(_.identity,Math.max,[1,2,3,4,5]))

function plucker(FIELD){
  return function(obj){
    return (obj && obj[FIELD])
  }
}

let best1 = finder(plucker('age'),Math.max,people)
console.log(best1)

let best2 = finder(plucker('name'),function(x,y){
  return (x.charAt(0) === 'g'?x:y)
},people)
console.log(best2,'2')

function best(fn,coll){
  return _.reduce(coll,function(x,y){
    return fn(x,y)?x:y
  })
}
let best3 = best(function(x,y){return x>y},[1,2,3,4,5])
console.log(best3,3)

function repeat(times,value){
  return _.map(_.range(times),function(){
    return value
  })
}

let repeatArr = repeat(4,'guoht')
console.log(repeatArr)

function repeatedly(times,fun){
  return _.map(_.range(times),fun)
}
let randomArr = repeatedly(3,function(){
  return Math.floor((Math.random()*10)+1)
})
console.log(randomArr,'random')

let ConstVar = repeatedly(3,function(){
  return 'Odelay!'
})
console.log(ConstVar,'Const Var')

let idsArr = repeatedly(3,function(n){
  var id = 'id'+n
  return id
})
console.log(idsArr,'id Arr')

function iterateUntil(fun,check,init){
  var ret = []
  var result = fun(init)
  while(check(result)){
    ret.push(result)
    result = fun(result)
  }
  return ret
}

// 2的n次方在2到1024内
let iterate = iterateUntil(
    function(n){return n+n},
    function(n){return n<=1024},
    1
  )
console.log(iterate,'---2')

let iterate2 = repeatedly(10,function(exp){return Math.pow(2,exp+1)})
console.log(iterate2,'----2')

function always(value){
  return function(){
    return value
  }
}
var f = always(function(){})

console.log(f() === f(),'---always true')

var g = always(function(){})
console.log(g() === f(),'---always false')

let alwaysArr = repeatedly(3,always('xxl'))
console.log(alwaysArr,'xxl arr')

function existy(x){
  return x != null
}
function fail(thing){
  throw new Error(thing)
}
function truthy(x){
  return (x !== false)&& existy(x)
}
function doWhen(cond,action){
  if(truthy(cond)){
    return action()
  }else{
    return undefined
  }
}

function invoker(name,method){
  return function(target/* args...*/){
    if(!existy(target)) fail('Must provide a target')
    var targetMethod = target[name]
    var args = _.rest(arguments)
    return doWhen((existy(targetMethod) && 
        method === targetMethod),function(){
      return targetMethod.apply(target,args)
    })
  }
}

var rev = invoker('reverse',Array.prototype.reverse)
console.log(_.map([[1,2,3],[9,8,7]],rev))

function uniqueString(len){
  return Math.random().toString(36).substr(2,len)
}
let uniqueStr = uniqueString(10)
console.log(uniqueStr,'--- unique str')

function uniqueString2(prefix){
  return [prefix,new Date().getTime()].join('')
}
let uniqueStr2 = uniqueString2("guoht")
console.log(uniqueStr2,'guoht prefix')

function makeUniqueStrFn(start){
  var counter = start
  return function(prefix){
    return [prefix,counter++].join('')
  }
}
var uniqueStr3 = makeUniqueStrFn(0)
console.log(uniqueStr3('guoht'))
console.log(uniqueStr3('guoht'))
console.log(uniqueStr3('guoht'))

var generator = {
  count:0,
  uniqueString:function(prefix){
    return [prefix,this.count++].join('')
  }
}
console.log(generator.uniqueString('xxl'))
console.log(generator.uniqueString('xxl'))
console.log(generator.uniqueString('xxl'))
generator.count = 'guozj'
console.log(generator.uniqueString('xxl'))
console.log(generator.uniqueString.call({count:22},'guozj'))

var omgenerator = (function(init){
  var counter = init
  return {
    uniqueString:function(prefix){
      return [prefix,counter++].join('')
    }
  }
})(0)
console.log(omgenerator.uniqueString('xxl-'))

var nums = [1,2,3,null,8,9]
let sum = _.reduce(nums,function(total,n){
  return total*n
})
console.log(sum,'----')

function fnull(fun){
  var defaults = _.rest(arguments);
  return function(){
    var args = _.map(arguments,function(e,i){
      return existy(e)?e:defaults[i]
    })
    return fun.apply(null,args)
  }
}

var safeMult = fnull(function(total,n){return total*n},1,1)
var sum2 = _.reduce(nums,safeMult)
console.log(sum2,'fnull')

function defaults(d){
  return function(o,k){
    var val = fnull(_.identity,d[k]);
    return o && val(o[k])
  }
}

function doSomeThing(config){
  var lookup = defaults({critical:108})
  return lookup(config,'critical')
}
let dosome = doSomeThing({critical:9})
let dosome2 = doSomeThing({})
console.log(dosome,dosome2)

function checker(){
  var validators = _.toArray(arguments)
  return function(obj){
    return _.reduce(validators,function(errs,check){
      if(check(obj))
        return errs
      else 
        return _.chain(errs).push(check.message).value
    },[])
  }
}
var alwaysPass = checker(always(true),always(true))
console.log(alwaysPass({}))
var fails = always(false)
fails.message = 'a fail in life'
var alwaysFails = checker(fails)
console.log(alwaysFails({}))

function validator(msg,fun){
  var f = function(){
    return fun.apply(fun,arguments)
  }
  f['msg'] = msg
  return f
}

var gonnaFail = checker(validator('Zone',always(false)))
console.log(gonnaFail(100))

function aMap(obj){
  return _.isObject(obj) 
}
function hasKeys(){
  var KEYS = _.toArray(arguments)
  var  fun = function(obj){
    return _.every(KEYS,function(k){
      return _.has(obj,k)
    })
  }
  fun.message = ['Must have values for Keys:',KEYS].join(' ')
  return fun
}