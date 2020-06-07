/*
1、jQuery ajax
 */
$.ajax({
  url: '/path/to/file',
  type: 'default GET (Other values: POST)',
  dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
  data: {param1: 'value1'},
})
.done(function() {
  console.log("success");
})
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
});

/*
缺点：
1、本身是针对MVC的编程，不符合现在的前端MVVM的浪潮
2、基于原生的XHR开发，XHR本身的架构不清晰
3、Jquery整个项目太大，单纯使用Ajax太浪费资源
4、不符合关注分离的原则
5、配置和调用方式非常混乱，而且基于事件的异步模型不友好
 */

/*
MVVM(Model-View-ViewModel),源自于经典的Model-View-Controller(MVC)
模式。MVVM的出现促进了GUI前端开发和后端业务逻辑的分离，极大地提高了前端
开发效率。MVVM的核心是View Model曾，它就像一个中转站(value converter)
负责转换Model中的数据对象来让数据变得更容易管理和使用，该层向上与视图层
进行双向数据绑定，向下与Model层通过接口请求进行数据交互，起承上启下作用。
View层的不是Model层的数据，而是ViewModel的数据，由viewModel负责与Model
层交互，这就完全解耦了View层和Model层，这个解耦是至关重要的，他是前后端
分离方案的重要一环
 */

/*
2、axios
axios 是一个基于Promise用于浏览器和nodejs的HTTP客户端，
本质上也是对原生XHR的封装，只不过它是Promise的实现版本，
符合最新的ES规范，它本身具有以下特性：
1、从浏览器中创建XMLHttpRequest
2、支持Promise API
3、客户端防止CSRF
4、提供了一些并发请求接口
5、从node.js创建http请求
6、拦截请求和响应
7、转换请求和响应数据
8、取消请求
9、自动转换JSON数据
（防止CSRF）就是让你的每个请求都带一个从cookie中拿到的key,
 根据浏览器同源策略，假冒的网站是拿不到你cookie中得key的，这样，
后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，
从而采取正确的策略
 */
axios({
  method:'post',
  url:url,
  data:param
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

/*
3、fetch
Fetch是基于promise设计的。Fetch的代码结构比Ajax简单，参数类似Jquery ajax
但是，Fetch不是Ajax的进一步封装，而是原生js,没有使用XMLHttpRequest对象

优点：
语法简单，更加语义化
基于标准Promise实现，支持async/await
同构方便，使用【isomorphic-fetch】
更加底层，提供的API丰富
脱离了XRH，是ES规范里新的实现方式

缺点：
fetch只对网络请求报错，对400，500都当做成功的请求
fetch默认不会带cookie，需要添加配置项
fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的
实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
4）fetch没有办法原生监测请求的进度，而XHR可以

 */
