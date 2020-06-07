var foo = function(){}
var bar = foo;

console.log(foo === bar) //true

/*--------------------------------------*/

var foo = function(){}
var bar = function(callback1,callback2){
    console.log(callback1 === callback2)  //true
}

bar(foo,foo)

/*--------------------------------------*/

var foo = function(){}
var bar = function(){}

console.log(foo === bar) //false    //两个函数，不在同一内存地址中，所以返回了false



/*-------------------------------------*/

var foo = function(){}
var fooBind = foo.bind()

console.log(foo === fooBind) // false

/*--------------------------------------*/

var foo = function(){}
var fooBind = foo.bind()

var bar = function(callback1,callback2){
    console.log(callback1 === callback2)  //false
}

bar(foo,fooBind) 
//其实是将foo拷贝了一份，他们两个已经没有了任何关系，也就是说foo和fooBind已经不在同一个内存地址中了，所以返回了false。


/*------------------------------------*/
var foo = function(){}
var fooBind1 = foo.bind()
var fooBind2 = foo.bind()

console.log(fooBind1 === fooBind2) //false 拷贝 对立的内存

/*----------------------------------*/
var obj = {key:"value"}
var foo = function(){
    return this;
}
var fooBind1 = foo.bind(obj)
var fooBind2 = foo.bind(obj)

console.log(  fooBind1() === fooBind2 ()   )    //true   他们都指向了同一个obj
console.log(  fooBind1 === fooBind2         )    //false  他们分别是存在两个不同内存地址中的，与函数中的this无关，所以返回了false

/*---------------------------*/
var obj = {key:"value"}
var foo = function(){
    console.log(this)    //obj
}.bind(obj)

foo()

/*--------------------------------------*/

var obj = {key:"value"}
var foo = function(){
    console.log(this)    //obj
}

foo.bind(obj)()         //也可以这样

/*-------------------------------------*/

/*----------simple demo----------------*/
var obj = {

    method:function(){

        setTimeout(function(){

            console.log(this)    //obj     注意：function(){console.log(this)}.bind(this) 返回值是一个函数

        }.bind(this),1000)
    }
}

obj.method()

/*--------------------------------------*/

var obj = {
    method:function(){

        var arg = function(){
              console.log(this)     //obj
        }

        var argBind = arg.bind(this)    //返回来的argBind函数与arg函数完全没有任何关系。

        setTimeout(argBind,1000)      //与上面的写法完全相等
    }
}

obj.method()