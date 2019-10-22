/**
 * generator函数, 在函数前加一个`*`号
 * 中间用yield关键字控制
 * 用函数返回值的next()方法来进行控制
 * 需要注意的是，调用函数时，第一次也需要用next()方法
 */
function    *show(){
    console.log("start");
    console.log("yield");
    //暂停往下执行
    yield;
    console.log("end");
}

let s=show()
s.next();

/**
 * yield可以传参数
 * yield也可以返回中间结果
 */
function *gen1(){
    console.log("start");
    //此时传参是第二次next()方法传参数据
    //yield后面跟着的值，是第一次next()返回的值
    let v=yield 1000;
    console.log("yield value:",v);
    console.log("end");
    return -1;
}
let g1=gen1();
let tmp1=g1.next()
console.log(tmp1)
let res=g1.next(11);
console.log("res",res)