var _ = require('underscore')

function myLen(arr){
  if(_.isEmpty(arr)){
    return 0
  }else{
    return 1+ myLen(_.rest(arr))
  }
}
function cycle(times,arr){
  if(times <= 0){
    return []
  }else{
    return;
  }
}