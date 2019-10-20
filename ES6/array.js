/**
 * let的块级别作用域
 * js中数组中map的用法
 */
let score=[19,60,85,99,58];
let result=score.map(item=>item>=60?"Pass":"fail");
console.log(result)
 /**
  * 数组中的reduce函数
  * reduce三个参数a是最终结果,b是临时变量，index是第几次执行
  */
 let  arr=[12,69,180,83];
 let sum=arr.reduce((res, tmp ,index)=>res+tmp)
 console.log(sum)
/**
 *  filter函数
 */
let nums=[1,2,3,9,17];
let filter_res=nums.filter(item=>item%3==0 );
console.log(filter_res)

let clothes=[{title:"shoes",price:100},{title:"tie",price:1000 }];
//返回价格大于100的物品
let expensive=clothes.filter(item=>item.price>100);
console.log(expensive);

/**
 * forEach迭代
 */

 let arrs=[11,22,33,55,100];
 arrs.forEach(item=>console.log(item*2))