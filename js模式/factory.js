// 工厂模式？
// 定义：创建对象的接口，让子类决定实例化哪个类。工厂方法将类的实例化延迟到子类，
// 而子类可以重写接口方法以便创建的时候指定自己的对象类型

//使用场景 
//需要根据不同参数产生不同实例，这些实例都有相同的行为，这时候我们可以使用工厂模式，
//简化实现过程，同时也可以减少每种对象所需要。工厂模式有利于消除对象间的耦合，提供更大的灵活性

// 代码理解
const productManager = {}
productManager.createProductA = function(){
  console.log('productA');
}
productManager.createProductB = function(){
  console.log('productB');
}
productManager.factory = function(type){
  // 工厂方法将类的实例化延迟到子类
  return new productManager[type];
}

//让子类决定实例化那个类
productManager.factory('createProductA');

//demo 2 Dom 插入元素
var page = page || {}
page.dom = page.dom || {}
// text 处理
page.dom.Text = function(){
  this.insert = function(where){
    var txt = document.createTextNode(this.url)
    where.appendChild(txt);
  }
}

//link
page.dom.link = function(){
  this.insert = function(where){
    var link = document.createElement('a');
    link.href = this.url;
    link.appendChild(document.createTextNode(this.url));
    where.appendChild(link);
  }
}

// img 
page.dom.Image = function(){
  this.insert = function(where){
    var im = document.createElement('img');
    im.src = this.url;
    where.appendChild(im);
  }
}

page.dom.factory = function(type){
  return new page.dom[type]
}

var o = page.dom.factory('link');
o.url = 'http://www.baidu.com';
o.insert(document.body)