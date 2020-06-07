class guoht{}
console.log(typeof guoht)
console.log(guoht === guoht.prototype.constructor)

class B{}
let b = new B()
console.log(b.constructor === B.prototype.constructor)

class Point{
  constructor(){

  }
  toString(){

  }
  toValue(){

  }
}

// 等同于
Point.prototype = {
  constructor(){},
  toString(){},
  toValue(){}
}

Object.assign(Point.prototype,{
  toValue(){},
  toString(){}
})

//ES6的类，内部定义的方法，都是不可枚举的

console.log(Object.keys(Point.prototype)) // []
console.log(Object.getOwnPropertyNames(Point.prototype)) // ["constructor","toString"]

// 静态方法不会继承
// 静态方法包含this关键字，这个this指的是类，而不是实例
class Foo{
  static fn(){
    console.log('fn static')
    return 'fn hello'
  }
  static bar(){
    this.fn()
  }
  fn(){
    console.log('fn function')
  }
}
let bar = Foo.bar()
console.log(Foo.fn())
console.log(bar)

let foo = new Foo()

foo.fn() // not a function