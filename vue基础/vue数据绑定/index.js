// 1. let vm = new Vue({data:{obj:{a:1}}},created:function(){console.log(this.obj)})

// 2. 实现原理
// Vue 数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的
// 1）数据劫持、Vue是通过Object.defineProperty()来现实数据劫持，其中会有getter()
// 和setter() 方法；当读取属性值时，就会触发getter()方法，在view中如果数据发生了变化，
// 就会通过Object.defineProperty() 对属性设置一个setter函数，当数据改变了就会来触发这个函数

/*
3.实现Observer
1).实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
2).实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。
3).实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。
 */

// 1 监听器 Observer
function observer(data){
  if(!data || typeof data !== 'object')
    return

  Object.keys(data).forEach(key => {
    defineReactive(data,key,data[key])
  })
}

function defineReactive(data,key,val){
  var dep = new Dep()
  observer(val)
  Object.defineProperty(data,key,{
    enumerable:true,
    configurable:false,
    get:function(){
      Dep.target && dep.addSub(Dep.target)
      return val
    },
    set:function(newVal){
      if(val === newVal) return
      console.log('new value',val,'--->',newVal)
      val = newVal
      dep.notify()
    }
  })
}


function Dep(){
  this.subs = []
}
Dep.prototype = {
  addSub:function(sub){
    this.subs.push(sub)
  },
  notify:function(){
    this.subs.forEach(sub =>{
      sub.update()
    })
  }
}
Dep.target = null

// 2.订阅者
function Watcher(vm,exp,cb){
  this.vm = vm
  this.exp = exp
  this.cb = cb
  this.value = this.get()
}
Watcher.prototype = {
  update:function(){
    this.run()
  },
  run:function(){
    var value = this.vm.data[this.exp]
    var oldVal = this.value
    if(value !== oldVal){
      this.value = value
      this.cb.call(this.vm,value,oldVal)
    }
  },
  get:function(){
    Dep.target = this
    var value = this.vm.data[this.exp]
    Dep.target = null
    return value
  }
}

function selfVue(options){
  var self = this
  this.data = options.data
  Object.keys(this.data).forEach(key => {
    self.proxyKeys(key)
  })
  observer(options.data)
  // el.innerHTML = this.data[exp]
  // new Watcher(this,exp,function(value){
  //   el.innerHTML = value
  // })
  // return this
  new Compile(options.el,this)
  options.mounted.call(this)
}

selfVue.prototype = {
  proxyKeys:function(key){
    var self = this
    Object.defineProperty(this,key,{
      enumerable:false,
      configurable:true,
      get:function proxyGetters(){
        return self.data[key]
      },
      set:function proxySetter(newVal){
        self.data[key] = newVal
      }
    })
  },
}
function Compile(node, vm) {
  if(node) {
    this.$frag = this.nodeToFragment(node, vm);
    return this.$frag;
  } 
}
Compile.prototype = {
  // 3解析器 compile
  nodeToFragment:function(el){
    var fragment = document.createDocumentFragment()
    var child = el.firstChild
    while(child){
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  },
  //遍历各个节点,对含有相关指定的节点进行特殊处理
  compileElement:function(el) {
    var childNodes = el.childNodes;   //childNodes属性返回节点的子节点集合，以 NodeList 对象。
    var self = this;
    //slice() 方法可从已有的数组中返回选定的元素。
    [].slice.call(childNodes).forEach(function(node) {
      var reg = /\{\{(.*)\}\}/;
      var text = node.textContent;  //textContent 属性设置或返回指定节点的文本内容
      if(self.isTextNode(node) && reg.test(text)) {      //判断是否符合{{}}的指令
        //exec() 方法用于检索字符串中的正则表达式的匹配。
        //返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。
        self.compileText(node,reg.exec(text)[1]);
      }
      if(node.childNodes && node.childNodes.length) {
        self.compileElement(node);    //继续递归遍历子节点
      }
    });
  },
  compileText:function(node,exp) {
    var self = this;
    var initText = this.vm[exp];
    this.updateText(node,initText);    // 将初始化的数据初始化到视图中
    new Watcher(this.vm,exp,function(value) {
      self.updateText(node,value);
    });

  },
  updateText:function(node,value) {
    node.textContent = typeof value == 'undefined' ? '': value;
  },
  compile:function(node) {
    var nodeAttrs = node.attributes;   //attributes 属性返回指定节点的属性集合，即 NamedNodeMap。
    var self = this;
    //Array.prototype属性表示Array构造函数的原型，并允许为所有Array对象添加新的属性和方法。
    //Array.prototype本身就是一个Array
    Array.prototype.forEach.call(nodeAttrs,function(attr) {
      var attrName = attr.name;      //添加事件的方法名和前缀:v-on:click="onClick" ,则attrName = 'v-on:click' id="app" attrname= 'id'
      if(self.isDirective(attrName)) {     
        var exp = attr.value;      //添加事件的方法名和前缀:v-on:click="onClick" ,exp = 'onClick'

        //substring() 方法用于提取字符串中介于两个指定下标之间的字符。返回值为一个新的字符串
        //dir = 'on:click'
        var dir = attrName.substring(2);  
        if(self.isEventDirective(dir)) {   //事件指令
          self.compileEvent(node,self.vm,exp,dir);
        }else {          //v-model指令
          self.compileModel(node,self.vm,exp,dir);
        }

        node.removeAttribute(attrName);
      }
    });
  }
}