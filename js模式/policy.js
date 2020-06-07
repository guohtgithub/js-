// 策略模式

// 比如公司的年终奖是根据员工的工资和绩效来考核的，
// 绩效为A的人，年终奖为工资的4倍，绩效为B的人，
// 年终奖为工资的3倍，绩效为C的人，年终奖为工资的2倍；
// 现在我们使用一般的编码方式会如下这样编写代码：

// 一般代码
var calculateBouns = function(salary,level){
  if(level === 'A'){
    return salary*4
  }
  if(level === 'B'){
    return salary *3
  }
  if(level === 'C'){
    return salary * 2
  }
  if(level === 'D'){
    return salary
  }
}
console.log(calculateBouns(4000,'A'))
console.log(calculateBouns(2000,'B'))

// 使用组合函数重构代码
var performanceA = function(salary){
  return salary *4
}

var performanceB = function(salary){
  return salary *3
}
var performanceC = function(salary){
  return salary *2
}
var performanceD = function(salary){
  return salary
}

var calculateBouns2 = function(level,salary){
  if(level === 'A'){
    return performanceA(salary)
  }
  if(level === 'B'){
    return performanceB(salary)
  }
  if(level === 'C'){
    return performanceC(salary)
  }
  if(level === 'D'){
    return performanceD(salary)
  }
}
console.log(calculateBouns2('A',4999))


// 使用策略模式
var performanceA1 = function(){}
performanceA1.prototype.calculate = function(salary){
  return salary *4
}

var performanceB1 = function(){}
performanceB1.prototype.calculate = function(salary){
  return salary *3
}

var performanceC1 = function(){}
performanceC1.prototype.calculate = function(salary){
  return salary *2
}

var performanceD1 = function(){}
performanceD1.prototype.calculate = function(salary){
  return salary
}

var Bouns = function(){
  this.salary = null
  this.levelObj = null
}

Bouns.prototype.setSalary = function(salary){
  this.salary = salary
}
Bouns.prototype.setlevelObj = function(levelObj){
  this.levelObj = levelObj
}

Bouns.prototype.getBouns = function(){
  return this.levelObj.calculate(this.salary)
}
var bouns = new Bouns()

bouns.setSalary(1000)
bouns.setlevelObj(new performanceA1())
console.log(bouns.getBouns())

bouns.setlevelObj(new performanceB1())
console.log(bouns.getBouns())

//进阶版
var obj = {
  'A':function(salary){
    return salary *4
  },
  'B':function(salary){
    return salary*3
  },
  'C':function(salary){
    return salary *2
  }
}

var calculateBouns3 = function(level,salary){
  return obj[level](salary)
}

console.log(calculateBouns3('A',1000))

//form表单验证
var strategys = {
  isNotEmpty:function(value,errorMsg){
    if(value === ''){
      return errorMsg
    }
  },
  minLength:function(value,length,errorMsg){
    if(value.length < length){
      return errorMsg
    }
  },
  mobileFormat:function(value,errorMsg){
    if(!/(^1[0-9]{10}$)/.test(value)){
      return errorMsg
    }
  }
}

var Validarot = function (){
  this.cache = []
}
Validarot.prototype.add = function(dom,rule,errorMsg){
  var str = rule.split(':')
  this.cache.push(function(){
    var strategy = str.shift()
    str.unshift(dom.value)
    str.push(errorMsg)
    return strategys[strategy].apply(dome,str)
  })
}
Validarot.prototype.start = function(){
  for(var i=0,validatotFunc;validatotFunc=this.cache[i++];){
    var msg = validatotFunc()
    if(msg){
      return msg
    }
  }
}

var validateFunc = function(){
  var validatot = new Validarot()
  validatot.add('userName','isNotEmpty','用户名不能为空')
  validatot.add('password','minLength:6','密码不能小于6位')
  validatot.add('phone','mobileFormat','手机格式不正确')

  var errorMsg = validatot.start()
  return errorMsg
}

// validator.add(registerForm.userName,[
// {strategy:’isNotEmpty’,errorMsg:’用户名不能为空’}，
// {strategy: 'minLength:6',errorMsg:'用户名长度不能小于6位'}])
// 

Validarot.prototype.add = function(dom,rules){
  var self = this
  for(var i=0,rule;rule=rules[i++];){
    (function(rule){
      var strategyAry = rule.strategy.split(':')
      var errorMsg = rule.errorMsg
      self.cache.push(function(){
        var strategy = strategyAry.shif();
        strategyAry.unshift(dom.value);
        strategyAry.push(errorMsg)
        return strategys[strategy].apply(dom,strategyAry)
      })(rule)
    })
  }
}