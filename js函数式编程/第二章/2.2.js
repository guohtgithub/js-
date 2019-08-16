var _ = require('underscore')
var nums = [1,2,3,4,5]
function doubleAll(array){
  return _.map(array,function(n){return n*2})
}
console.log(doubleAll(nums))

function average(array){
  var sum = _.reduce(array,function(a,b){
    return a+b
  })
  return sum / _.size(array);
}

console.log(average(nums))

function onlyEven(array){
  return _.filter(array,function(n){
    return n%2 === 0
  })
}

console.log(onlyEven(nums))

console.log(_.map({a:1,b:2},_.identity))

console.log(_.map({a:1,b:2},function(v,k){
  return [k,v];
}));

console.log(_.map({a:1,b:2},function(v,k,coll){
  return [k,v,_.keys(coll)];
}));

var nums = [100,2,25]
function div(x,y){return x/y}
console.log(_.reduce(nums,div))
console.log(_.reduceRight(nums,div))

function allOf(){
  return _.reduceRight(arguments,function(truth,f){
    return truth && f()
  },true)
}

function anyOf(){
  return _.reduceRight(arguments,function(truth,f){
    return truth || f()
  },false)
}

function T(){return true}
function F(){return false}
console.log(allOf())
console.log(allOf(T,T))
console.log(allOf(T,T,F))
console.log(anyOf(T,T,F))
console.log(anyOf(F))

let arr = ['a','b','c',3]
let find = _.find(arr,_.isNumber)
console.log(find)

let reject = _.reject(arr,_.isNumber)
console.log(reject)

function complement(pred){
  return function(){
    return !pred.apply(null,_.toArray(arguments))
  }
}

let complements = _.filter(arr,complement(_.isNumber))
console.log(complements)

let all = _.all(nums,_.isNumber)
console.log(all)
let any = _.any(arr,_.isString)
console.log(any)

let people = [{name:'Rick',age:30},{name:'Jack',age:23}]
let sort = _.sortBy(people,item => {return item.age})
console.log(sort)
let albums = [
  {title:'guoht',genre:'metal'},
  {title:'xxl',genre:'Dub'},
  {title:'gzj',genre:'metal'}
]
let group = _.groupBy(albums,item => {return item.genre})
console.log(group)

function existy(x){
  return x != null
}

function cat(){
  let head = _.first(arguments)
  if(existy(head)){
    return head.concat.apply(head,_.rest(arguments))
  }else{
    return []
  }
}
console.log(cat([1,2,3],[4,5,6]))

function constuct(head,tail){
  return cat([head],_.toArray(tail))
}
console.log(constuct(42,[1,2,3,4]))

function mapcat(fun,coll){
  return cat.apply(null,_.map(coll,fun))
}
console.log(mapcat((e)=>{return constuct(e,[','])},[1,2,3]))