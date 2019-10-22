let p=new Promise(function(resolve,reject){
    $.ajax({
        url: "es6.js",
        success(data){
            resolve(dara);
        },
        error(err){
            reject(err);
        }
    });
});
//注册成功的函数和失败的函数
p.then(function(data){
    console.log("返回成功");
},
 function(err){
    console.log("调用失败");
});
/**
 * Promise.all()
 */
Promise.all([
    $.ajax({url:"https:1"}),
    $.ajax({url:"https:2"}),
]).then(results=>{
    console.log("all success");
},error=>{
    console.log("all error");
})