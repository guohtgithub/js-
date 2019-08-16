// 原型链？继承？
// 每一个构造函数都有一个原型对象
// 每一个原型对象都包含一个指向构造函数的指针
// 每一个实例都包含一个指向原型对象的指针
// 查找方式是一层层向上查找至顶层Object.prototype 顶层空对象{}


// 实现继承的方式常用的有
// 1、原型链继承
// 2、借用构造函数（call、apply）
// 3、组合继承（原型链+构造函数）
// 4、原型式继承
// 5、寄生式组合式继承
// 6、es6 class

// 原型链
function Person(name,age){
  this.name = name
  this.age = age
  this.play = [1,2,3]
  this.setName = function(){}
}

Person.prototype.setAge = function(){}

function Student(price){
  this.price = price
  this.setScore = function(){}
}

// Student.prototype.sayHello = function(){} 
// 在这里写子类的原型方法和属性式无效的
// 因为会改变原型的指向，所以应该放到重新指定之后

Student.prototype = new Person()
Student.prototype.sayHello = function(){}
var s1 = new Student(1000)
var s2 = new Student(1500)
console.log(s1,s2)
s1.play.push(4)
console.log(s1.play,s2.play) // all [1,2,3,4]

// 优：
// 
// 父类新增原型方法/属性，子类都能访问到
// 简单、易于实现


// 缺：
// 
// 无法实现多继承
// 来自原型对象的所有属性被所有实例共享
// 创建子类实例时，无法向父类构造函数传参
// 想要为子类新增属性和方法，必须要在 Student.prototype = new Person() 之后执行，不能放到构造器中


// 借用构造函数继承

function Person2(name,age){
  this.name = name
  this.age = age
  this.setName = function(){}
}

Person2.prototype.setAge = function(){}

function Sutdent2(name,age,price){
  Person2.call(this,name,age) // 相当于 this.Person2(name,age)

  this.price = price
}

var s2_1 = new Sutdent2('guoht',28,1500)

// 这种方式只是实现部分的继承，如果父类的原型还有方法和属性，
// 子类是拿不到这些方法和属性的

// console.log(s2_1.setAge()) setAge is not function

// 优：
// 
// 解决了原型链继承中子类实例共享父类引用属性的问题
// 创建子类实例时，可以向父类传递参数
// 可以实现多继承（call多个父类对象）


// 缺：
// 
// 实例并不是父类的实例，只是子类的实例
// 只能继承父类的实例属性和方法，不能继承原型属性和方法
// 无法实现函数复用，每个子类多有父类实例函数的副本，影响性能


// 3、原型链+借用构造函数的组合继承

function Person3(name,age){
  this.name = name
  this.age = age
  this.setName = function(){}
}

Person3.prototype.setAge = function(){
  console.log('111')
}

function Student3(name,age,price){
  Person3.call(this,name,age)

  this.price = price
  this.setScore = function(){}
}

Student3.prototype = new Person3()
Student3.prototype.sayHello = function(){}
var s3_1 = new Student3('guoht',28,1500)
var s3_2 = new Student3('xxl',29,1000)

var p3 = new Person3('guozj',2)

console.log(s3_1,'-----')
console.log(s3_2.constructor) // Person3
console.log(p3.constructor) //Person3

// 优：
//
// 可以继承实例属性/方法，也可以继承原型属性/方法
// 不存在引用属性共享问题
// 可传参
// 函数可复用


// 缺：
// 调用了两次父类构造函数，生成了两份实例



// 4、组合继承优化1

function Person4(name,age){
  this.name = name
  this.age = age
  this.setName = function(){}
}
Person4.prototype.setAge = function(){}

function Student4(name,age,price){
  Person4.call(this,name,age)
  this.price = price
  this.setScore = function(){}
}
Student4.prototype = Person4.prototype
Student4.prototype.sayHello = function(){}

var s4_1 = new Student4('guozj',2,1500)
console.log(s4_1,'=====')

// 优：
// 不会初始化两次实例方法/属性，避免组合继承的缺点


// 缺：
// 没办法辨别实例是子类还是父类创建的，子类和父类的构造函数指向是同一个


// 5、组合继承优化2

function Person5(name,age){
  this.name = name 
  this.age = age
  this.setName = function(){}
}
Person5.prototype.setAge = function(){}

function Student5(name,age,price){
  Person5.call(this,name,age)
  this.price = price
  this.setScore = function(){}
}

Student5.prototype = Object.create(Person5.prototype)
Student5.prototype.constructor = Student5

var s5_1 = new Student5('guoht',28,1500)
console.log(s5_1 instanceof Student5,s5_1 instanceof Person5)
console.log(s5_1.constructor)
console.log(s5_1)

// 6、ES6中class 的继承

class Person6{
  constructor(name,age){
    this.name = name
    this.age = age
  }
  setName(){
    console.log('get person fun')
    console.log(this.name,this.age)
  }
}

let p6 = new Person6('xxl',29)
console.log(p6,'----')

class Student6 extends Person6{
  constructor(name,age,salary){
    super(name,age)
    this.salary = salary
  }
  setName(){
    console.log('get stu fun')
    console.log(this.name,this.age,this.salary)
  }
}

let s6 = new Student6('xxl',29,150000)
console.log(s6)
s6.setName()