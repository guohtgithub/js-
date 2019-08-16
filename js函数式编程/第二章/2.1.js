var _ = require('underscore')

function weirdAdd(n,f){
  return n+f()
}

console.log(weirdAdd(42,function(){return 42}))

_.each(['whiskey','tango','foxtrot'],function(word){
  console.log(word.charAt(0).toUpperCase() + word.substr(1))
})

var a = {
  name:'a',
  fun:function(){return this}
}
console.log(a.fun())

var bFun = function() {return this}
var b = {name:'b',fun:bFun}
console.log(b.fun())

function point2D(x,y){
  this._x = x;
  this._y = y;
}
function point3D(x,y,z){
  point2D.call(this,x,y)
  this._z = z
}