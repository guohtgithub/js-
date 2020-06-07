var _ = require('underscore')
function dispatch(){
  var funs = _.toArray(arguments)
  var size = funs.length
  return function(target){
    var ret = undefined
    var args = _.rest(argumnets)
    for(var funIndex =0;funIndex<size;funIndex++){
      var fun = funs[funIndex]
      ret = fun.apply(fun,construct(target,args))

      if(existy(ret)) return ret
    }
  return ret
  }
}
function existy(x){
  return x != null
}

