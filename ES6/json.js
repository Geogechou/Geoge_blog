let json={count:10, title:"shoes"};
//将json对象字符串化，变为`{"count":10,"title":"shoes"}`
let para=JSON.stringify(json);
//JSON.parse()方法
let obj=JSON.parse('{"count":10,"title":"shoes"}');
console.log(obj.title)
let a=10,b=12;
/**
 * 当value和key相同时，可以简写
 */
let json1= { a, b };
console.log(json1)
/**
 * 在Object中添加方法
 */
let person={
    name:"george",
    age:21,
    showInfo(){
        console.log("my name is:", this.name);
    }
};
person.showInfo();