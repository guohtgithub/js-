// 中介者模式？
// 用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显示地相互引用，
// 而且可以独立地改变他们之间的交互


// 代码理解
// form表单验证
var mediator = (function(){
  return {
    changed:function(obj){
      if(obj === passwordInput && !nameInput.value){
        return alert('请先输入用户名')
      }
      if(obj === repeatPasswordInput && !passwordInput.value){
        return alert('请先输入密码')
      }
      if(obj === sexInput && !sexInput.value){
        return alert('请先选择性别')
      }
    }
  }
})()

/*
// passwordInput dom
passwordInput.onchange = function(){
  mediator.changed(this)
}
// repeatPasswordInput dom
repeatPasswordInput.onchange = function(){
  mediator.changed(this)
}
// sexInpur dom
sexInput.onchange = function(){
  mediator.changed(this)
}
*/

//聊天室案例
var Participant = function(name){
  this.name = name;
  this.chatroom = null;
}
Participant.prototype = {
  send:function(message,to){
    this.chatroom.send(message,this,to)
  },
  receive:function(message,from){
    log.add(from.name + ' to ' + this.name + ': ' + message);
  }
}

var Chatroom = function(){
  var participants = {};
  return {
    register:function(particepant){
      participants[particepant.name] = particepant;
      particepant.chatroom = this
    },
    send:function(message,from,to){
      if(to){
        to.receive(message,from)
      }else{
        for(key in participants){
          if(participants[key] != from){
            participants[key].receive(message,from);
          }
        }
      }
    }
  }
}

var log = (function(){
  var log = '';
  return {
    add:function(msg){log +=msg +'\n';},
    show:function(){
      console.log(log)
      log=''
    }
  }
})();

function run(){
  var yoko = new Participant('Yoko');
  var john = new Participant('John');
  var paul = new Participant('Paul');
  var ringo = new Participant('Ringo');
  var chatroom = new Chatroom();
  chatroom.register(yoko);
  chatroom.register(john);
  chatroom.register(paul);
  chatroom.register(ringo);

  yoko.send('All you need is love');
  yoko.send('I love you john');
  john.send('Hey, no need to broadcast',yoko);
  paul.send('Ha, I heard that!');
  ringo.send('Paul, what do you think?',paul);
  log.show()
}

run()


// 案列三
function Player(name){
  this.points = 0;
  this.name = name;
}
Player.prototype.play = function(){
  this.points += 1;
  mediator.played();
}
var scoreboard = {
  elem:document.getElementById('results'),
  update:function(score){
    var i,msg = '';
    for(i in score){
      if(score.hasOwnProperty(i)){
        msg += '<p><strong>'+i+'</strong>:';
        msg += score[i];
        msg += '</p>'
      }
    }
    this.elem.innerHTML = msg
  }
}

var mediator = {
  players:{},
  setup:function(){
    var players = this.players;
    players.home = new Player('Home');
    players.guest = new Player('Guest');
  },
  played:function(){
    var players = this.players,
    score = {
      Home:players.home.points,
      Guest:players.guest.points
    }
    scoreboard.update(score);
  },
  keypress:function(e){
    e = e||window.event;
    if(e.which === 49){
      mediator.players.home.play();
      return
    }
    if(e.which === 48){
      mediator.players.guest.play();
      return
    }
  }
}
mediator.setup();

window.onkeypress = mediator.keypress;
setTimeout(function(){
  window.onkeypress = null;
  console.log('Game over!')
},30000)

// 案例四
var mediators = (function(){
  var topics = {},
      subUid = -1;
  var publish = function(topic,args){ // 发布
    if(!topics[topic]){
      return false;
    }
    var subscribers = topics[topic],
        len = subscribers?subscribers.length:0;
    while(len--){
      subscribers[len].func(topic,args)
    }
    return true;
  }
  var subscribe = function(topic,func){ // 订阅
    if(!topics[topic]){
      topics[topic] = []
    }
    var token = (++subUid).toString();
    topics[topic].push({
      token:token,
      func:func
    })
    return token;
  }
  return { // 导出
    publish:publish,
    subscribe:subscribe,
    installTo:function(obj){
      obj.publish = publish;
      obj.subscribe = subscribe;
    }
  }
})()

var mod1 = { //接收者
  runs:function(arg){
    console.log('mod1 received ' + arg);
  }
}

var mod2 = {} // 发布者
var topic = 'MyTopic';
mediators.installTo(mod1);
mediators.installTo(mod2);
mod1.subscribe(topic,function(t,arg){
  mod1.runs(arg)
})

mod2.publish(topic,'data')