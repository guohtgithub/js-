const Dep = function(){
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

const Watcher = function(vm,node,name){
  Dep.target = this;
  this.name = name
  this.node = node
  this.vm = vm
  this.update()
  Dep.target = null
}

Watcher.prototype = {
  update:function(){
    this.get();
    this.node.nodeValue = this.value
  },
  get:function(){
    this.value = this.vm[this.name]
  }
}

const compile = function(node,vm){
  if(node.nodeType == 1){
    let attr = node.attributes
    for(let i=0;i<attr.length;i++){
      if(attr[i].nodeName === 'v-model'){
        let name = attr[i].nodeValue
        node.addEventListener('input',e =>{
          vm[name] = node.value
        })
        node.value = vm[name]
        node.removeAttribute('v-model')
      }
    }
  }

  // text 节点类型
  if(node.nodeType === 3){
    if(/\{\{(.*)\}\}/.test(node.nodeValue)){
      let name = RegExp.$1
      name = name.trim();
      node.nodeValue = vm[name];
      new Watcher(vm,node,name)
    }
  }
}

const observe = data => {
  if(!data || typeof data !== 'object') return 3333
  Object.keys(data).forEach(key => defineReactive(data,key,data[key]))
}

const defineReactive = (data,key,value) => {
  const dep = new Dep()
  observe(value)
  Object.defineProperty(data,key,{
    get:()=>{
      if(Dep.target) dep.addSub(Dep.target)
      return value
    },
    set:(newvalue) => {
      console.log(`数据已经发生变化，新的值为${newvalue}`)
      value = newvalue;
      dep.notify()
    }
  })
}

function nodeToFragment(node,vm){
  let flag = document.createDocumnetFragmet()
  let child
  while((child = node.firstChild)){
    compile(child,vm)
    flag.appendChild(child)
  }
  return flag
}

function Vue(options){
  let data = this.data = options.data
  observe(data,this)
  let id = options.el
  let dom = nodeToFragment(document.getElementById(id),data)
  document.getElementById(id).appendChild(dom)
}

let vm = new Vue({
  el:'app',
  data:{
    text:'example text'
  }
})