var vm = new Vue({
  el:'#app',
  data:{
    message:'Hello',
  },
  computed:{
    reversedMessage:funciton(){
      return this.message.split('').reverse().join()
    }
  }
})

export funciton initState(vm:Component){
  vm._watchers = []
  const opts = vm.$options
  if(opts.props) initProps(vm,opts.props)
  if(opts.methods) initMethods(vm,opts.methods)

  if(opts.data){
    initData(vm)
  }else{
    observe(vm._data = {},true)
  }
  if(opts.computed) initComputed(vm,opts.computed)
  if(opts.watch &&opts.watch !== nativeWatch)
    initWatch(vm,opts.watch)
}

function initData(vm:Component){
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data,vm)
    : data || {}

  observe(data,true)
}

export function observe(value:any,asRootData:?boolean):Observer|void{
  if(!isObject(value)){
    return
  }
  let ob:Observer|void
  ob = new Observer(value)
  if(asRootData && ob){
    ob.vmCount++
  }
  return ob
}

export class Observer{
  value:any;
  dep:Dep;
  vmCount:number;
  constructor(value:any){
    this.value = value
    this.dep = new Dep()
    this.vmCount =0
    def(value,'__ob__',this)

    this.walk(value)
  }
  walk(obj:Object){
    const keys = Object.keys(obj)
    for(let i=0;i<keys.length;i++){
      defineReactive(obj,keys[i],obj[keys[i]])
    }
  }
}

export function defineReactive(
  obj:Object,
  key:string,
  val:any,
  customSetter?: ?Function,
  shallow? :boolean
){
  const dep = new Dep()
  const property = Object.getOwnPropertyDescriptor(obj,key)
  if(property && property.configurable === false)
    return

  const getter = property && property.get
  const setter = property && property.set

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj,key,{
    enumerable:true,
    configurable:true,
    get:function reactiveGetter(){
      const value = getter ? getter.call(obj) :val
      if(Dep.target){
        dep.depend()
        if(childOb){
          childOb.dep.depend()
        }
        if(Array.isArray(value)){
          dependArray(value)
        }
      }
      return value
    },
    set:function reactiveSetter(newVal){
      const value = getter ? getter.call(obj):val
      if(newVal === value || (newVal !== newVal && value !== value))
        return
      if(setter)
        setter.call(obj,newVal)
      else
        val = newVal
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}

export default class Dep{
  static target:?Watcher;
  id:number;
  subs:Array<Watcher>;
  constructor(){
    this.id = uid++
    this.subs = []
  }
  addSub(sub:Watcher){
    this.subs.push(sub)
  }
  removeSub(sub:Watcher){
    remove(this.subs,sub)
  }
  depend(){
    if(Dep.target){
      Dep.target.addDep(this)
    }
  }
  notify(){
    const subs = this.subs.slice()
    for(let i=0,l=subs.length;i<l;i++){
      subs[i].update()
    }
  }
}

Dep.target = null
const targetStack = []

export function pushTarget(_target,Watcher){
  if(Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}
export function popTarget(){
  Dep.target = targetStack.pop()
}

const computedWatcherOptions = {lazy:true}
function initComputed(vm:Component,computed:Object){
  const watchers = vm._computedWatchers = Object.create(null)
  const isSSR = isServerRendering()
  for(const key in computed){
    const userDep = computed[key]
    const getter = typeof userDep === 'function'?userDep:userDep.get
    if(!isSSR){
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }
    if(!(key in vm)){
      defineComputed(vm,key,userDep)
    }
  }
}

export default class Watcher{
  constructor(
    vm:Component,
    expOrFn:string|Function,
    cb:Function,
    options?:Object
  ){
    this.vm = vm
    vm._watchers.push(this)
    if(options){
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
    }else{
      this.deep = this.user = tis.lazy = this.sync = true
    }
    this.cb = cb
    this.id = ++uid
    this.active = true
    this.dirty = this.lazy
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.getter = expOrFn
    this.value = this.lazy
      ? undefined
      : this.get()
  }
}

function CreateComputedGetter(key){
  return function computedGetter(){
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if(watcher){
      if(watcher.dirty){
        watcher.evaluate()
      }
      if(Dep.target){
        watcher.depend()
      }
      return watcer.value
    }
  }
}

evaluate(){
  this.value = this.get()
  this.dirty = false
}
get(){
  pushTarget(this)
  let value
  const vm = this.vm
  try{
    value = this.getter.call(vm,vm)
  }catch(e){

  }finally{
    popTarget()
  }
  return value
}