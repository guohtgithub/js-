// 单例模式

var Singleton = function(name){
  this.name = name
}
Singleton.prototype.getName = function(){
  alert(this.name)
}

Singleton.getInstance = (function()){
  var instance = null
  return function(name){
    if(!instance){
      instance = new Singleton(name)
    }
    return instance
  }
}

//闭包实现一个单例 高耦合
var createDiv = (function(){
  var instance;
  var createDiv = function(html){
    if(instance){
      return instance
    }
    this.html = html;
    this.init();
    return instance = this
  }
  createDiv.prototype.init = function(){
    var div = document.createElement('div')
    div.innerHtml = this.html;
    document.body.appendChild(div)
  };
  return createDiv
})() 

// 低耦合
var CreateDiv = function(html){
  this.html = html
  this.init()
}
CreateDiv.prototype.init = function(){
  var div = document.createElement('div')
  div.innerHtml = this.html
  document.body.appendChild(div)
}

var proxySingletonCreateDiv = (function(){
  var instance
  return function(html){
    if(!instance){
      instance = new CreateDiv(html)
    }
    return instance
  }
})()

// 惰性单例
var getSingle = function(fn){
  var result
  return function(){
    return result || (result = fn.apply(this,arguments))
  }
}