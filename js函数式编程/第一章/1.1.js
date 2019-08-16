[1,2,3].forEach(item => {
  console.log(item)
})

// apply
function splat(fun){
  return function(array){
    return fun.apply(null,array)
  }
}

let addArrayElements = splat(function(x,y){return x+y})
let sumArr = addArrayElements([1,2])
console.log(sumArr,'apply')

function unsplat(fun){
  return function(){
    console.log(...arguments,'---')
    return fun.call(null,...arguments)
  }
}
let joinElements = unsplat(function(array){return array.join(' ')})
let joinArr = joinElements([1,2])
console.log(joinArr,'call')

console.log(joinElements(['-','$','/','!','==']))