let arr = [
	{id:2,name:'部门B',parentId:0},
  {id:3,name:'部门C',parentId:1},
  {id:1,name:'部门A',parentId:2},
  {id:4,name:'部门D',parentId:1},
  {id:5,name:'部门E',parentId:2},
  {id:6,name:'部门F',parentId:3},
  {id:7,name:'部门G',parentId:2},
  {id:8,name:'部门H',parentId:4}
]

function toTree(arr,parId){
	let len = arr.length
	let loop = (parId) =>{
		let res = []
		for(let i=0;i<len;i++){
			let item = arr[i]
			if(item.parentId == parId){
				item.children = loop(item.id)
				res.push(item)
			}
		}
		return res
	}
	return loop(parId)
}

let result = [
	{
		parentId:0,
		id:2,
		name:'部门B',
		children:[
			{
				parentId:1,
				children:[
					{},
					{}
				]
			},
			{parentId:2,children:[]},
			{parentId:3,children:[]},
			{parentId:4,children:[]},
		]
	}
]

var menu_list = [
	{id: '1',menu_name: '设置',menu_url: 'setting',parent_id: 0}, 
	{id: '1-1',menu_name: '权限设置',menu_url: 'setting.permission',parent_id: '1'}, 
	{id: '1-1-1',menu_name: '用户管理列表',menu_url: 'setting.permission.user_list',parent_id: '1-1'},
  {id: '1-1-2',menu_name: '用户管理新增',menu_url: 'setting.permission.user_add',parent_id: '1-1'}, 
  {id: '1-1-3',menu_name: '角色管理列表',menu_url: 'setting.permission.role_list',parent_id: '1-1'},
  {id: '1-2',menu_name: '菜单设置',menu_url: 'setting.menu',parent_id: '1'},
  {id: '1-2-1',menu_name: '菜单列表',menu_url: 'setting.menu.menu_list',parent_id: '1-2'},
  {id: '1-2-2',menu_name: '菜单添加',menu_url: 'setting.menu.menu_add',parent_id: '1-2'},
  {id: '2',menu_name: '订单',menu_url: 'order',parent_id: 0},
  {id: '2-1',menu_name: '报单审核',menu_url: 'order.orderreview',parent_id: '2'}, 
  {id: '2-2',menu_name: '退款管理',menu_url: 'order.refundmanagement',parent_id: '2'}
]


// JSON
function buildTree(list){
	let temp = {};
	let tree = {};
	for(let i in list){
		temp[list[i].id] = list[i];
	}
	for(let i in temp){
		if(temp[i].parent_id) {
			if(!temp[temp[i].parent_id].children) {
				temp[temp[i].parent_id].children = new Object();
			}
			temp[temp[i].parent_id].children[temp[i].id] = temp[i];
		} else {
			tree[temp[i].id] =  temp[i];
		}
	}
	return tree;
}

// array
function toMenuTree(fromArr,parId,toArr){
	fromArr.forEach(item=>{
		if(item.parent_id === parId){
			let objChlin = {
				children:[]
			}
			toArr.push(Object.assign(item,objChlin))
		}else{
			toArr.forEach(objItem => {
				toMenuTree([item],objItem.id,objItem.children)
			})
		}
	})
	return toArr
}

toMenuTree(menu_list,0,[])

// 基本类型的Type
let isType = function(typeObj){
	let type = upperCase(typeObj)
	let strArr = ['String','Number','Array']
	let typeFlag = strArr.some(item =>{
		return item == type
	})
	if(!typeFlag) return 'input true type'

	return function(obj){
		return Object.prototype.toString.call(obj) === '[object '+ type +']'
	}
}

// 第一个字符大写
function upperCase(str){
	if(Object.prototype.toString.call(str) === '[object String]'){
		let fristStr = str.substr(0,1)
		return str.replace(fristStr,fristStr.toUpperCase())
	} 

	return 'not String'
}

upperCase('string')


// call function prototype
let bar = {
	sex:'man'
}

function foo(age){
	console.log(this.sex,age)
	console.log(this)
}

Function.prototype.myCall = function(context){
	context = context || window
	context.fn = this
	// slice 不改变原数组 splice 改变原数组
	let arg = [...arguments].slice(1)
	let result = context.fn(...arg)
	
	delete context.fn
	return result
}

foo.myCall(bar,10)

// apply
Function.prototype.myApply = function(content){
	content = content || window
	content.fn = this
	let arg = arguments[1] || []
	
	let result = content.fn(...arg)
	
	}

	delete content.fn
	return result
}

// bind
Function.prototype.myBind = function(context){
	let _this = this
	let arg = [...arguments].slice(1)
	return function fn(){
		return _this.apply(content,arg.concat(...arguments))
	}
}

// compose(f,g)

function compose(f,g){
	return function(){
		return f.call(this,g.apply(this,arguments))
	}
}

let square = function(x){
	return x*x
}

let sum = function(x,y){
	return x+y
}

