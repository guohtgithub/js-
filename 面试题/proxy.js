let str = (obj,setBind,getLogger) => {
    let handel ={
        get(target,perty,receiver) {
            getLogger(target,perty);
            return Reflect.get(target,perty,receiver)
        },
        set(target,perty,value,receiver) {
            setBind(value,perty)
            return Reflect.set(target,perty,value);
        }
    }
    return new Proxy(obj,handel)
}
let obj = {age:21};
let q = str(
    obj,
    (v,perty) => {
        console.log(`监听到属性${perty}改变为${v}`)
    },
    (target,perty) => {
        console.log(`'${perty}' = ${target[perty]}`)
    }
)
q.a = 2;
console.log(q.a)


const obj = {
    'name': 'null'
};

// <!-- 设置该对象的属性不可写 -->
Object.defineProperty(obj, 'name', {
    writable: false
});

const handler = {
    /*
        1、目标对象
        2、属性名
        3、属性值
        4、Proxy实例本身 （可选）
    */
    set: function (obj, prop, value, receiver) {
        Reflect.set(obj, prop, value);
    }
};

const proxy = new Proxy(obj, handler);
proxy.name = '我是空智';
console.log(proxy.name); // 打印的是 null