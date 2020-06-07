// String 对象
let str = 'guoht guozj xxl'

// String 对象方法

// 1 charAt() 返回在指定位置的字符。
console.log(str.charAt(9))

// 2 charCodeAt() 返回在指定的位置的字符的 Unicode 编码。
console.log(str.charCodeAt(9))

// 3 concat() 连接两个或更多字符串，并返回新的字符串。
let str1 = 'abc' ,str2 = 'cdf'
console.log(str1.concat(str2),str1,str2)

// 4 fromCharCode() 将 Unicode 编码转为字符。
console.log(String.fromCharCode(65)) // A
console.log(String.fromCharCode(72,69,76,76,79))// HELLO

// 5 indexOf() 返回某个指定的字符串值在字符串中首次出现的位置。
console.log(str.indexOf('xxl'))

// 6 lastIndexOf() 从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置
console.log(str.lastIndexOf('guoht'))

// 7 includes() 查找字符串中是否包含指定的子字符串。
console.log(str.includes('guozj')) // true

// 8 match() 查找找到一个或多个正则表达式的匹配。
console.log(str.match(/g/g)) // ['g','g']

// 9 repeat() 复制字符串指定次数，并将它们连接在一起返回。
console.log(str.repeat(2))
console.log(str,'repeat')

// 10 replace() 在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串
console.log(str.replace('guozj','guozijun'))
console.log(str.replace(/g/g,'G'))

// 11 search() 查找与正则表达式相匹配的值。
console.log(str.search('guoht'))

// 12 slice() 提取字符串的片断，并在新的字符串中返回被提取的部分
console.log(str.slice(1,5),str)

// 13 split() 把字符串分割为字符串数组
console.log(str.split(' '),str)
console.log(str,'split')

// 14 startsWith() 查看字符串是否以指定的子字符串开头。
console.log(str.startsWith('g'))

// 15 substr() 从起始索引号提取字符串中指定数目的字符。
console.log(str.substr(3,7)) // ht guoz

// 16 substring() 提取字符串中两个指定的索引号之间的字符。
console.log(str.substring(3,7)) // ht g

// 17 toLowerCase() 把字符串转换为小写。
let strUp = 'GUOHT'
console.log(strUp.toLowerCase(),strUp)

// 18 toUpperCase() 把字符串转换为大写。
console.log(str1.toUpperCase(),str1)

// 19 trim() 去除字符串两边的空白
let strTrim = '   00099  '
console.log(strTrim.trim(),strTrim)

// 20 toLocaleLowerCase() 根据本地主机的语言环境把字符串转换为小写
// toLowerCase() 类似
console.log(strUp.toLocaleLowerCase())

// 21 toLocaleUpperCase() 根据本地主机的语言环境把字符串转换为大写
// toUpperCase()
console.log(str1.toLocaleUpperCase())

// 22 valueOf() 返回某个字符串对象的原始值
console.log(str.valueOf())

// 23 toString() 返回一个字符串。
console.log(str.toString())

// String HTML 包装方法

// 1 anchor() 创建 HTML 锚。
let txt = 'anchor html'
let anchor = txt.anchor('html')
console.log(anchor,'anchor')

// 2 big() 用大号字体显示字符串。
console.log(txt.big())

// 3 blink() 显示闪动字符串。
console.log(txt.blink())

// 4 bold() 使用粗体显示字符串
console.log(txt.bold())

// 5 fixed() 以打字机文本显示字符串。
console.log(txt.fixed())

// 6 fontcolor() 使用指定的颜色来显示字符串。
console.log(txt.fontcolor("green"))

// 7 fontsize() 使用指定的尺寸来显示字符串 1- 7
console.log(txt.fontsize(4))

// 8 italics() 使用斜体显示字符串。
console.log(txt.italics())

// 9 link() 将字符串显示为链接。
console.log(txt.link('www.baidu.com'))

// 10 small()   使用小字号来显示字符串。
console.log(txt.small())

// 11 strike() 用于显示加删除线的字符串。
console.log(txt.strike())

// 12 sub() 把字符串显示为下标。
console.log(txt.sub())

// 13 sup() 把字符串显示为上标。
console.log(txt.sup())


// 大小写互换
function processString(s){
  let arr = s.split('')
  return arr.map(item => 
    item === item.toUpperCase() ? item.toLowerCase() : item.toUpperCase()
  ).join('')
  // return new_arr
}

console.log(processString('ABcdDEFfjDjDj'))

function transfer(str){
  return str.replace(/[a-zA-Z]/g,item => 
    /[a-z]/.test(item)?item.toUpperCase():item.toLowerCase()
  )
}

// 字符串查找某个字符串的位置
const find = (S,R) => {
  if(S.length < R.length) return -1
  for(let i=0;i<S.length;i++){
    if(S.slice(i, i+R.length) === R) return i
  }
  return -1
}

const goodFind = (S,R) =>{
  if(S.length < R.length) return -1
  for(let i=0;i<S.length-R.length;i++){
    if(S.substr(i, R.length) === R) return i
  }
  return -1
}

const findIndexOf = (S,T) => S.indexOf(T)

const findMatched = (S, T) => {
  const matched = S.match(T) 
  return matched ? matched.index : -1 
}

// 查找1
function findOne(n){
  if(typeof n != 'number') return
  let count = 0;
  for(let i=0;i<=n;i++){
    count += String(i).split('').filter(item =>item==='1').length

    // i.toString().match(/[1]/g)
  }
  return count
}

function findOneOther(n){ // n = 55
  let factor = 1
  let count = 0
  let next = parseInt(n/factor) // 55
  while(next !==0){
    let lower = n-next*factor // 0 5
    let curr = next % 10  // 5 5
    let high = parseInt(n / (10*factor))  // 5 0
    if(curr ===0){
      count += high * factor 
    }else if(curr === 1){
      count += high *factor + lower + 1 
    }else{
      count += (high+1) *factor // 6 16
    }

    factor *= 10 // 10
    next = parseInt(n/factor) // 5
  }
  return count
}

function howManyOnes(n){ // 445 
  if(n<1) return 0
  if(n<10) return 1
  const str = String(n)
  const rest = Number(str.slice(1)) // 去除最高位的数 // 45 5 9 0
  const power = 10 ** (str.length -1) // 10的 n 次方 // 100 10 10  1
  const head = Number(str.slice(0,1)) // 最高位的数 // 4 4 9 
  if(head === 1){
    return howManyOnes(rest) + howManyOnes(power -1) + rest + 1
  } else{
    return howManyOnes(rest) + power + howManyOnes(power -1)*head
  }
}

// f(45) + 100 + f(99)*4
//  f(5) + 10 + f(9)* 4 + 100 + (f(9) + 10 + f(9)*9)*4
//  1+10+1*4+100+(1+10+9)*4 = 195


// 去所有空格
var trim = function(str){
  // str.split(' ').join('')
  return str.replace(/\s*/g,'')
}

//str.replace(/\s*/g,""); // 去除字符串内所有的空格
//str.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
//str.replace(/^\s*/,""); //去除字符串内左侧的空格
//str.replace(/(\s*$)/g,""); //去除字符串内右侧的空格

function del(str, n) {
  str = [...str]
  const idx = str.lastIndexOf(n);
  return str.splice(idx, 1).join('');
}

function delLast(str, target) {
  return str.split('').reverse().join('').replace(target, '').split('').reverse().join('');
}

const str = delLast('asdfghhj', 'h')

console.log(str) // asdfghj 

// 大小字符串切换
// fn1
function testStr(str){
  return str.replace(/([a-z])([A-Z])/g,(m,s1,s2) =>{
    return ${s1.toUpperCase()}${s2.toLowerCase()}
  })
}

// fn2
function test2Str(str){
  let arr = []
  for(let x of str){
    if(x === x.toUpperCase()){
      x = x.toLowerCase()
    }else{
      x = x.toUpperCase
    }
    arr.push(x)
  }
  return arr.join('')
}

/**
 * \f  匹配换页字符。
 * \n  匹配换行字符。
 * \r  匹配回车符字符。
 * \t  匹配制表字符。
 * \v  匹配垂直制表符。
 * @param str
 * @returns {void | string}
 */
const removeEmpty = (str) => str.replace(/[\t\n\v\r\f]/g, "");

console.log(removeEmpty(`|
  
   
|`))


// 某字符串在一个字符串中出现的个数
function repeat(str,parentStr){ // 有缺陷
  return parentStr.split(str).length -1
}

function countStr(str,param){ // 有缺陷
  const reg = new RegExp(param,'g')
  return str.match(reg).length
}

function strCount(str,target){
  var count = 0;
  if(!target) return 0;
  while(str.match(target)){
    count++
    str = str.substr(str.indexOf(target)+1)
  }

  return count
}

// url param
function params() {
  const search = window.location.search;
  search = search.substr(1, search.length);
  const res = {};
  if (!search) return res;
  search.split('&').map(item => {
    const [key, value] = item.split('=');
    res[key] = decodeURIComponent(value);
  });
  return res;
}

function urlParam(){
  const param = {};
  location.search.replace(/([^&=?]+)=([^&]+)/g,(m,$1,$2)=> param[$1] = $2);
  return param;
}

// 去空格
function trim(str) {
  var reg = /\s+/g;
  if (typeof str === 'string') {
      return str.replace(reg,'');
  }
  return str
}

var trim = function(str){
  // str.replace(/\s*/g,""); //去除字符串内所有的空格
  // str.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
  // str.replace(/^\s*/,""); //去除字符串内左侧的空格
  // str.replace(/(\s*$)/g,""); //去除字符串内右侧的空格
  
  return str.replace(/\s*/g,"");
}


const str = '  s t  r  '

const POSITION = Object.freeze({
  left: Symbol(),
  right: Symbol(),
  both: Symbol(),
  center: Symbol(),
  all: Symbol(),
})

function trim(str, position = POSITION.both) {
  if (!!POSITION[position]) throw new Error('unexpected position value')
  
  switch(position) {
    case(POSITION.left):
      str = str.replace(/^\s+/, '')
      break;
    case(POSITION.right):
      str = str.replace(/\s+$/, '')
      break;
    case(POSITION.both):
      str = str.replace(/^\s+/, '').replace(/\s+$/, '')
      break;
    case(POSITION.center):
      while (str.match(/\w\s+\w/)) {
        str = str.replace(/(\w)(\s+)(\w)/, `$1$3`)
      }
      break;
    case(POSITION.all):
      str = str.replace(/\s/g, '')
      break;
    default: 
  }
  
  return str
}

const result = trim(str)

console.log(`|${result}|`) //  |s t  r| 

// 验证身份证
/*
    一般型:
    前 6 位区号 \d{6}
    中间年份 \d{4} 可以增加年份判断
    月份 01-12 月 0[1-9]|1[0-2]
    日期 01-31 日 0[1-9]|[12][0-9]|3[01]
    顺序码 \d{3}
    校验码 [\dXx] 其实有校验算法，可以根据算法再做一次检查 https://zhuanlan.zhihu.com/p/21286417

 */
const isValidIdentity = (id) => {
  if (
    /^\d{6}\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{3}[\dXx]$/.test(id)
  ) {
    return true;
  } else {
    return false;
  }
};

// 验证中文
function isChinese(str) {
  const re = /^[\u4e00-\u9fa5]+$/;
  return re.test(str);
}

// 回文字符
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  if (s.length === 1) return true
  const str = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
  const strReverse = str.split('').reverse().join('')
  return str === strReverse
}