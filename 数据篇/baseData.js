// 1.请简述Js中有哪些数据类型?
// Js中每一个值都属于某一种数据类型, 根据最新的语言标准，一共有8种类型

Boolean
Null
Undefined
Number
BigInt
String
Symbol
Object

// BigInt 
// 要创建BigInt，只需在整数的末尾追加n即可。BigInt(10)
//Symbol也很好理解，在Js中表示独一无二的值

// 2. null 跟 undefined 的区别，分别在什么场景使用
Undefined 类型表示未定义，它的类型只有一个值，就是 undefined。
任何变量在赋值前是 Undefined 类型
Null 类型也只有一个值，就是 null，它的语义表示空值
与 undefined 不同，null 是 JavaScript 关键字
在语义上，Null 表示的是：定义了但是为空。所以，在实际编程时，
我们一般不会把变量赋值为 undefined

// 3.数组常用方法有哪些?

// 判断
Array.isArray() // 是否是数组
Array.includes() // 是否包含指定值
Array.some() // 是否有元素通过测试
Array.ervey() // 是否都通过测试

// 查找
Array.find() // 返回满足条件的第一个元素
Array.findIndex() // 返回满足条件的第一个索引
Array.indexOf() // 返回元素索引，没有返回-1
Array.lastIndexOf() // 返回指定元素最后一个索引，没有返回 -1
Array.filter() // 过滤函数，返回所有符合条件的元素数组

// 增删改
Array.pop() // 删除最后一个元素并返回值
Array.push() // 在数组末尾添加一个或多个元素，并返回数组长度
Array.shift() // 从数组中删除第一个元素，并返回值
Array.slice() // 返回某个位置到结尾的数组
Array.splice() // 添加删除数组，返回被删除元素
Array.unshift() // 一个或多个添加到开头，返回长度
Array.fill() // 填充数组元素

// 其他
Array.concat() // 合并返回新数组
Array.join() // 返回所有元素并用某符号隔断的字符串
Array.reverse() // 反转数组
Array.sort() // 按字母顺序排序
Array.sort(sortNumber) // 按数值大小排序
Array.toString() // 以字符串形式返回数组
Array.length // 返回或设置数组个数，截取数组
Array.forEach() // 遍历每个元素

Array.from() //
Array.copyWithin(target,start,end)
Array.of()
Array.map()
Array.reduce()
Array.reduceRight()

//4.字符串常用方法有哪些?
String.concat() // 合并返回新字符串
String.indexOf() // 返回第一个索引，没有返回 -1
String.lastIndexOf() // 返回最后一个索引，没有返回 -1
String.search() // 查找返回索引，没有返回 -1

String.match() // 字符串匹配并返回字符串，没有返回null
String.replace() // 替换字符串

String.split() // 把字符串分割为字符串数组
String.length() // 返回字符串长度
String.toLowerCase() // 转小写
String.toUpperCase() // 转大写

String.charAt(index) // 返回指定位置字符
String.substring(a,b) // 提取字符串中两个指定的索引号之间的字符。
String.substr() // 从起始索引号提取字符串中指定数目的字符。
String.slice() // 提取字符串的片断，并在新的字符串中返回被提取的部分。

// 5.Js中如何去判断一个值的类型?
//typeof 在判断除Object类型的对象时比较方便

console.log(typeof  123);   //number
console.log(typeof  '123');  //string
console.log(typeof  true);   //boolean
console.log(typeof  undefined);  //undefined
console.log(typeof  null);  //object
console.log(typeof  []);   //object
console.log(typeof  {});//object
console.log(typeof  new Date());  //object
console.log(typeof  /\d/);  //object
console.log(typeof  function(){});//function

// instanceof 
// instanceof运算符返回一个布尔值，表示指定对象是否为某个构造函数的实例
const js = []
js instanceof Array // true
js instanceof Object // true

// toString()
Object.prototype.toString.call(null) // [object Null]
Object.prototype.toString.call([]);  //  "[object Array]"
Object.prototype.toString.call({}); // [object Object]
Object.prototype.toString.call(123); // [object Number]
Object.prototype.toString.call('123'); // [object String]
Object.prototype.toString.call(false) // [object Boolean]
Object.prototype.toString.call(undefined) // [object Undefined]

// 6.你是如何理解Js中类型转换机制?
// 在 Js 中通常将它们统称为强制类型转换，
// 我个人则倾向于用“隐式强制类型转换”(implicit coercion)和
// “显式强制类型转换”(explicit coercion)来区分


// 显式类型转换
var a = 123
var b =String(a)

var c = '2.1'
var d = Number(c)
var e = []
var f = Boolean(e)

// 隐式强制类型转换
// 触发 JS 隐式转换是需要先决条件的, 当使用 ==、&&、|| 
// 等逻辑操作符进行判断时, 或使用 + - * / 四则运算符进行操作时

// == 与 ===的区别
// “== 允许在相等比较中进行强制类型转换，而 === 不允许。”