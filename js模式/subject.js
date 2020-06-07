// 观察者模式
// 观察者模式就好像 个体奶农和个人的关系。奶农负责统计有多少人订了产品，
// 所以个人都会有一个相同拿牛奶的方法。奶农有新奶了就负责调用这个方法。
var subject = { // 主体
  observers:[],
  notify(){
    this.observers.forEach(observer => {
      observer.update()
    })
  },
  attach(observer){
    this.observers.push(observer)
  }
}

var observer = { // 观察者
  update(){
    console.log('update')
  }
}

subject.attach(observer)
subject.notify()

// 订阅发布模式
// 发布-订阅模式就好像报社， 邮局和个人的关系，
// 报纸的订阅和分发是由邮局来完成的。报社只负责将报纸发送给邮局。
var publisher = { // 发布者
  publish(pubsub){
    pubsub.publish()
  }
}

var pubsub = {
  subscribes:[],
  publish(){
    this.subscribes.forEach(subscribe => {
      subscribe.update()
    })
  },
  subscribe(sub){
    this.subscribes.push(sub)
  }
}

var subscribe = { // 订阅者
  update(){
    console.log('update')
  },
  subscribe(pubsub){
    pubsub.subscribe(this)
  }
}

subscribe.subscribe(pubsub)
publisher.publish(pubsub)