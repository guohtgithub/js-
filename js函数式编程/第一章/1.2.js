let _ = require('underscore')

function isString(str){
  return str instanceof String || typeof str == 'string'
}

function fail(thing){
  throw new Error(thing)
}

function warn(thing){
  console.log(['Warning: ',thing].join(' '))
}

function note(thing){
  console.log(['Note : ',thing].join(' '))
}

function parseAge(age){
  if(!isString(age)) fail('Expecting a string')
  let a
  note('Attempting to parse an age')
  a = parseInt(age,10);
  if(isNaN(a)){
    warn(['Could not parse age: ',age].join(' '))
    a = 0
  } 
  console.log(a,'parseAge')
  return a
}
parseAge('42') // 42
// parseAge(42) // Error
parseAge('guoht') // 0

function isIndexed(data){
  return Array.isArray(data) || isString(data)
}
function naiveNth(arr,index){
  if(isNaN(index)) fail('Expecting a number as the index')
  if(!isIndexed(arr)) fail('Not supported on non-indexed type')
  if((index<0)||index>arr.length-1){
    fail('Index value is out of bounds')
  }
  console.log(arr[index],'index')
  return arr[index]
}
let letters = ['a','b','c']
naiveNth(letters,2)
naiveNth('abcd',3)

function second(data){
  return naiveNth(data,1)
}

// sort 1,2,3,4,5,10
function compareArr(x,y){
  if(x<y) return -1
  if(x>y) return 1
  return 0
}

// sort 10,9,8,7
function lessOrEqual(x,y){
  return x<=y
}

function comparator(pred){
  return function(x,y){
    if(truthy(pred(x,y)))
      return -1
    else if(truthy(pred(x,y)))
      return 1
    else
      return 0
  }
}

// 数据抽象
let sortArr = [2,3,4,1,-5,0,1,20,10].sort(compareArr)
console.log(sortArr,'sort---')
sortArr = [2,3,4,1,-5,0,1,20,10].sort(lessOrEqual)
console.log(sortArr,'lessOrEqual--')

function lameCSV(str){
  return _.reduce(str.split('\n'),function(table,row){
    table.push(_.map(row.split(','),function(c){return c.trim()}))
    return table
  },[])
}
var peopleTable = lameCSV('name,age,hair\nMerble,35,red\nBod,64,blonde')
console.log(peopleTable,'---')

function selectNames(table){
  return _.rest(_.map(table,_.first))
}
function selectAges(table){
  return _.rest(_.map(table,second))
}
// function selectHairColor(table){
//   return _.rest(_.map(table,function(row){
//     return _.nth(row,2)
//   }))
// }
var mergeResults = _.zip
let names = selectNames(peopleTable)
let ages = selectAges(peopleTable)
// selectHairColor(peopleTable)
let newCSV = mergeResults(names,ages)
console.log(newCSV,'--')

// existy()
function existy(x){
  return x != null
}

console.log(existy(null))

function truthy(x){
  return (x !== false)&& existy(x)
}
console.log(truthy(false))
console.log(truthy(0))


function doWhen(cond,action){
  if(truthy(cond)){
    return action()
  }else{
    return undefined
  }
}

function executeIfHasField(target,name){
  return doWhen(existy(target[name]),function(){
    var result = _.result(target,name)
    console.log(['The result is ',result].join(' '))
    return result
  })
}

executeIfHasField([1,2,3],'reverse')
executeIfHasField({foo:32},'foo')
executeIfHasField([1,2,3],'notHere')
