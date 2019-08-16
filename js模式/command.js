// 命令模式？
// 将一个请求封装成为对象，从而使你可以用不同的请求对客户进行参数化，
// 对请求排队或记录请求日志，以及执行可撤销的操作，命令指的是一个执行
// 某些特定事情的指令

// 适用场景
// 需要向某些对象发送请求，但并不知道请求的接收者是谁，也不知道请求的操作是什么，
// 这时就希望用一种低耦合的方式来设计程序，使得请求者和发送者之间的关系低耦合

//代码理解
//定义一个安装命令的方法

var button1 = document.getElementById('btn')
var button = document.getElementById('btn2')

var setCommand = function(options,command){
  options.onclick = function(){
    command.execute();
  }
} 

// 定义最终执行者
var MenuBar = {
  refresh:function(){
    console.log('refresh menu finish');
  }
}

// 先把这些行为封装在命令类中
var RefreshMenuBarCommand = function(recevier){
  this.recevier = recevier;
}
RefreshMenuBarCommand.prototype.execute = function(){
  this.recevier.refresh();
}

//命令接收者传入到command对象中，并且把command对象安装到button上面
var refreshCommand = new RefreshMenuBarCommand(MenuBar);
setCommand(button1,refreshCommand)

// deom2 撤销操作
var MoveCommand = function(recevier,pos){
  this.recevier = recevier;
  this.pos = pos;
}
MoveCommand.prototype.execute = function(){
  this.recevier.move('left',this.pos);
  this.oldPos = this.recevier.dom.getBoundingClientRect()[this.recevier.prototypeName]
}

MoveCommand.prototype.undo = function(){
  this.recevier.move('left',this.oldPos)
}
var moveCommand = new MoveCommand()
button.onclick = function(){
  moveCommand.execute();
}

// demo3 
var lian = {}
lian.paobing = function(pao_num){
  console.log(pao_num+'门炮准备战斗');
}
lian.bubing = function(bubing_num){
  console.log(bubing_num+'人准备战斗');
}
lian.lianzhang = function(mingling){
  lian[mingling.type][mingling.num]
}

// 命令
lian.lianzhang({
  type:'paobing',
  num:10
});

lian.lianzhang({
  type:'bubing',
  num:100
})