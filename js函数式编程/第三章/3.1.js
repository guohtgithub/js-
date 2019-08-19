var _ = require('underscore')
function whatWasTheLocal(){
  var CAPTURED = 'Oh hai'
  return function(){
    return 'The local was: '+CAPTURED
  }
}

var reportLocal = whatWasTheLocal()
console.log(reportLocal())

function createScaleFunction(FACTOR){
  return function(v){
    return _.map(v,function(n){
      return (n*FACTOR)
    })
  }
}

var scale10 = createScaleFunction(10)
console.log(scale10([1,2,3]))

function createScaleFunction2(FACTOR){
  return function(v){
    this['FACTOR'] = FACTOR
    var captures  = this
    return _.map(v,_.bind(function(n){
      return (n*this['FACTOR']);
    },captures))
  }
}

var scale20 = createScaleFunction2(20)
console.log(scale20.call({},[3,2,1]))

function makeAdder(CAPTURED){
  return function(free){
    return free + CAPTURED
  }
}

var add10 = makeAdder(10)
console.log(add10(30))

var add1024 = makeAdder(1024)
console.log(add1024(1024))
console.log(add10(100))

function average(array){
  var sum = _.reduce(array,function(a,b){
    return a+b
  })
  return sum / _.size(array);
}

function averageDamp(fun){
  return function(n){
    return average([n,fun(n)])
  }
}

var averageSq = averageDamp(function(n){
  return n*n
})
console.log(averageSq(10))

var shadowed = 0
function argShadow(shadowed){
  var shadowed = 1024
  return ['Value is',shadowed].join(' ')
}
console.log(argShadow(108))
console.log(argShadow())

function captrueShadow(SHADOWED){
  return function(SHADOWED){
    return SHADOWED+1
  }
}

var closureShadow = captrueShadow(108)
console.log(closureShadow(3))

function complement(PRED){
  return function(){
    return !PRED.apply(null,_.toArray(arguments))
  }
}
function isEven(n){return (n%2)===0}
var isOdd = complement(isEven)
console.log(isOdd(2))
console.log(isOdd(223))

function showObject(obj){
  return function(){
    return obj
  }
}

var obj = {a:56}
var showObj = showObject(obj)
obj.b = 9
console.log(showObj())


var pingpong = (function(){
  var PRIVATE = 0
  return {
    inc:function(n){
      return PRIVATE += n
    },
    dec:function(n){
      return PRIVATE -= n
    }
  }
})()

console.log(pingpong.inc(8))
console.log(pingpong.dec(4))

pingpong.div = function(n){return 10/n} // PRIVATE id not defined
console.log(pingpong.div(8))

function plucker(FIELD){
  return function(obj){
    return (obj && obj[FIELD])
  }
}

var best = {
  title:'guoht',
  age:29
}

var getTitle = plucker('title')
console.log(getTitle(best))

var books = [
  {title:'guoht'},
  {age:29},
  {title:'xxl'}
]
var third = plucker(2)
console.log(third(books))

console.log(_.filter(books,getTitle))